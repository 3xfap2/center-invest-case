package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "modernc.org/sqlite" // pure Go SQLite driver, no CGO
)

// Store is the only code that talks to the database.
type Store struct{ db *sql.DB }

var errNotFound = errors.New("not found")

// migrations run in order, each in its own transaction; PRAGMA user_version remembers how many have been applied.
type migration func(tx *sql.Tx) error

var migrations = []migration{sqlStep(sqlMigrations[0]), sqlStep(sqlMigrations[1]), uniqueNicknames, sqlStep(transferCodes)}

// 4: one-time codes to move a player to another device without a password.
const transferCodes = `CREATE TABLE transfer_codes (
	player_id   TEXT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
	code_hash   BLOB NOT NULL,
	expires_at  TEXT NOT NULL,
	attempts    INTEGER NOT NULL DEFAULT 0
);`

// MaxCodeAttempts wrong tries end a transfer code.
const MaxCodeAttempts = 5

// SetTransferCode gives the player one active code (a new one replaces the old).
func (s *Store) SetTransferCode(ctx context.Context, playerID string, codeHash []byte, expiresAt string) error {
	_, err := s.db.ExecContext(ctx, `INSERT INTO transfer_codes (player_id, code_hash, expires_at, attempts) VALUES (?, ?, ?, 0)
		ON CONFLICT (player_id) DO UPDATE SET code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0`,
		playerID, codeHash, expiresAt)
	return err
}

type Transfer struct {
	PlayerID, Nickname, ExpiresAt string
	CodeHash                      []byte
	Attempts                      int
	HasPassword                   bool
}

func (s *Store) TransferByLogin(ctx context.Context, loginKey string) (Transfer, error) {
	var t Transfer
	err := s.db.QueryRowContext(ctx, `SELECT p.id, p.nickname, c.code_hash, c.expires_at, c.attempts, p.password_hash IS NOT NULL
		FROM players p JOIN transfer_codes c ON c.player_id = p.id WHERE p.login_key = ?`, loginKey).
		Scan(&t.PlayerID, &t.Nickname, &t.CodeHash, &t.ExpiresAt, &t.Attempts, &t.HasPassword)
	if errors.Is(err, sql.ErrNoRows) {
		return t, errNotFound
	}
	return t, err
}

// FailTransfer counts a wrong code; the code is deleted after MaxCodeAttempts.
func (s *Store) FailTransfer(ctx context.Context, playerID string) error {
	if _, err := s.db.ExecContext(ctx, `UPDATE transfer_codes SET attempts = attempts + 1 WHERE player_id = ?`, playerID); err != nil {
		return err
	}
	_, err := s.db.ExecContext(ctx, `DELETE FROM transfer_codes WHERE player_id = ? AND attempts >= ?`, playerID, MaxCodeAttempts)
	return err
}

// DeleteTransfer ends a code: after it was used, or when it expired.
func (s *Store) DeleteTransfer(ctx context.Context, playerID string) error {
	_, err := s.db.ExecContext(ctx, `DELETE FROM transfer_codes WHERE player_id = ?`, playerID)
	return err
}

func sqlStep(q string) migration {
	return func(tx *sql.Tx) error { _, err := tx.Exec(q); return err }
}

// 3: every nickname is unique (case-insensitive, «ё» = «е»), not only those with a password.
// Older databases may hold duplicates: the oldest player keeps the nickname, later ones get «-2», «-3»…
func uniqueNicknames(tx *sql.Tx) error {
	type row struct {
		id, nick string
		key      sql.NullString
	}
	rows, err := tx.Query(`SELECT id, nickname, login_key FROM players ORDER BY login_key IS NULL, created_at, id`)
	if err != nil {
		return err
	}
	var all []row
	for rows.Next() {
		var r row
		if err := rows.Scan(&r.id, &r.nick, &r.key); err != nil {
			rows.Close()
			return err
		}
		all = append(all, r)
	}
	rows.Close()
	used := map[string]bool{}
	for _, r := range all {
		if r.key.Valid { // password accounts already own their keys
			used[r.key.String] = true
			continue
		}
		nick := r.nick
		for i := 2; used[loginKey(nick)]; i++ {
			suffix := fmt.Sprintf("-%d", i)
			base := []rune(r.nick)
			if len(base)+len([]rune(suffix)) > 20 {
				base = base[:20-len([]rune(suffix))]
			}
			nick = string(base) + suffix
		}
		used[loginKey(nick)] = true
		if _, err := tx.Exec(`UPDATE players SET nickname = ?, login_key = ? WHERE id = ?`, nick, loginKey(nick), r.id); err != nil {
			return err
		}
	}
	_, err = tx.Exec(`DROP INDEX players_login; CREATE UNIQUE INDEX players_login ON players (login_key);`)
	return err
}

var sqlMigrations = []string{
	`CREATE TABLE players (
		id          TEXT PRIMARY KEY,
		nickname    TEXT NOT NULL,
		token_hash  BLOB NOT NULL UNIQUE,
		created_at  TEXT NOT NULL
	);
	CREATE TABLE saves (
		player_id   TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
		game_id     TEXT NOT NULL,
		data        TEXT NOT NULL,
		flags       TEXT NOT NULL,
		updated_at  TEXT NOT NULL,
		PRIMARY KEY (player_id, game_id)
	);
	CREATE TABLE runs (
		id           INTEGER PRIMARY KEY AUTOINCREMENT,
		player_id    TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
		game_id      TEXT NOT NULL,
		ending       TEXT NOT NULL,
		stars        INTEGER NOT NULL,
		score        INTEGER NOT NULL,
		duration_sec INTEGER NOT NULL,
		difficulty   TEXT NOT NULL,
		choices      TEXT NOT NULL,
		created_at   TEXT NOT NULL
	);
	CREATE INDEX runs_game_score ON runs (game_id, score DESC, duration_sec ASC);`,

	// 2: optional password accounts, one session per device, achievements on the server.
	`ALTER TABLE players ADD COLUMN password_hash TEXT;
	ALTER TABLE players ADD COLUMN login_key TEXT;
	CREATE UNIQUE INDEX players_login ON players (login_key) WHERE login_key IS NOT NULL;
	CREATE TABLE sessions (
		token_hash  BLOB PRIMARY KEY,
		player_id   TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
		created_at  TEXT NOT NULL
	);
	INSERT INTO sessions (token_hash, player_id, created_at) SELECT token_hash, id, created_at FROM players;
	CREATE TABLE achievements (
		player_id       TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
		game_id         TEXT NOT NULL,
		achievement_id  TEXT NOT NULL,
		earned_at       TEXT NOT NULL,
		PRIMARY KEY (player_id, game_id, achievement_id)
	);`,
}

var errTaken = errors.New("taken")

func OpenStore(path string) (*Store, error) {
	if path != ":memory:" {
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			return nil, err
		}
	}
	db, err := sql.Open("sqlite", "file:"+path+"?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)&_pragma=foreign_keys(1)")
	if err != nil {
		return nil, err
	}
	// One writer connection: SQLite allows one writer anyway, and this rules out SQLITE_BUSY.
	db.SetMaxOpenConns(1)
	s := &Store{db: db}
	if err := s.migrate(); err != nil {
		db.Close()
		return nil, err
	}
	return s, nil
}

func (s *Store) Close() error { return s.db.Close() }

func (s *Store) migrate() error {
	var v int
	if err := s.db.QueryRow(`PRAGMA user_version`).Scan(&v); err != nil {
		return err
	}
	for i := v; i < len(migrations); i++ {
		tx, err := s.db.Begin()
		if err != nil {
			return err
		}
		if err := migrations[i](tx); err != nil {
			tx.Rollback()
			return fmt.Errorf("migration %d: %w", i+1, err)
		}
		if _, err := tx.Exec(fmt.Sprintf(`PRAGMA user_version = %d`, i+1)); err != nil {
			tx.Rollback()
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
	}
	return nil
}

func now() string { return time.Now().UTC().Format(time.RFC3339) }

type Player struct {
	ID, Nickname, CreatedAt string
	TokenHash               []byte // the session token used for this request
	HasPassword             bool
}

// CreatePlayer registers a nickname (no password) with its first session. errTaken if the nickname is in use.
func (s *Store) CreatePlayer(ctx context.Context, id, nickname string, tokenHash []byte) (Player, error) {
	p := Player{ID: id, Nickname: nickname, TokenHash: tokenHash, CreatedAt: now()}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return p, err
	}
	defer tx.Rollback()
	if _, err := tx.ExecContext(ctx, `INSERT INTO players (id, nickname, login_key, token_hash, created_at) VALUES (?, ?, ?, ?, ?)`,
		p.ID, p.Nickname, loginKey(p.Nickname), p.TokenHash, p.CreatedAt); err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed: players.login_key") {
			return p, errTaken
		}
		return p, err
	}
	if _, err := tx.ExecContext(ctx, `INSERT INTO sessions (token_hash, player_id, created_at) VALUES (?, ?, ?)`, p.TokenHash, p.ID, p.CreatedAt); err != nil {
		return p, err
	}
	return p, tx.Commit()
}

func (s *Store) PlayerByTokenHash(ctx context.Context, h []byte) (Player, error) {
	var p Player
	err := s.db.QueryRowContext(ctx, `SELECT p.id, p.nickname, s.token_hash, p.created_at, p.password_hash IS NOT NULL
		FROM sessions s JOIN players p ON p.id = s.player_id WHERE s.token_hash = ?`, h).
		Scan(&p.ID, &p.Nickname, &p.TokenHash, &p.CreatedAt, &p.HasPassword)
	if errors.Is(err, sql.ErrNoRows) {
		return p, errNotFound
	}
	return p, err
}

// SetPassword protects a player with a password. The nickname becomes their login: errTaken if another account has it.
func (s *Store) SetPassword(ctx context.Context, playerID, loginKey, hash string) error {
	_, err := s.db.ExecContext(ctx, `UPDATE players SET password_hash = ?, login_key = ? WHERE id = ?`, hash, loginKey, playerID)
	if err != nil && strings.Contains(err.Error(), "UNIQUE constraint failed") {
		return errTaken
	}
	return err
}

// Login returns the account with this login key and its password hash.
func (s *Store) Login(ctx context.Context, loginKey string) (id, nickname, hash string, err error) {
	err = s.db.QueryRowContext(ctx, `SELECT id, nickname, password_hash FROM players WHERE login_key = ? AND password_hash IS NOT NULL`, loginKey).
		Scan(&id, &nickname, &hash)
	if errors.Is(err, sql.ErrNoRows) {
		err = errNotFound
	}
	return
}

// NicknameTaken reports whether any player already uses this nickname (case-insensitive).
func (s *Store) NicknameTaken(ctx context.Context, loginKey string) (bool, error) {
	var n int
	err := s.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM players WHERE login_key = ?`, loginKey).Scan(&n)
	return n > 0, err
}

func (s *Store) AddSession(ctx context.Context, playerID string, tokenHash []byte) error {
	_, err := s.db.ExecContext(ctx, `INSERT INTO sessions (token_hash, player_id, created_at) VALUES (?, ?, ?)`, tokenHash, playerID, now())
	return err
}

func (s *Store) DeleteSession(ctx context.Context, tokenHash []byte) error {
	_, err := s.db.ExecContext(ctx, `DELETE FROM sessions WHERE token_hash = ?`, tokenHash)
	return err
}

type Achievement struct {
	GameID string `json:"gameId"`
	ID     string `json:"id"`
}

// AddAchievements stores achievements once each; repeats are ignored. Returns how many were new.
func (s *Store) AddAchievements(ctx context.Context, playerID string, items []Achievement) (int, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback()
	t, added := now(), 0
	for _, a := range items {
		res, err := tx.ExecContext(ctx, `INSERT OR IGNORE INTO achievements (player_id, game_id, achievement_id, earned_at) VALUES (?, ?, ?, ?)`, playerID, a.GameID, a.ID, t)
		if err != nil {
			return 0, err
		}
		n, _ := res.RowsAffected()
		added += int(n)
	}
	return added, tx.Commit()
}

func (s *Store) PlayerAchievements(ctx context.Context, playerID string) ([]Achievement, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT game_id, achievement_id FROM achievements WHERE player_id = ? ORDER BY earned_at, game_id, achievement_id`, playerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []Achievement{}
	for rows.Next() {
		var a Achievement
		if err := rows.Scan(&a.GameID, &a.ID); err != nil {
			return nil, err
		}
		out = append(out, a)
	}
	return out, rows.Err()
}

type AchievementRow struct {
	Nickname     string `json:"nickname"`
	Achievements int    `json:"achievements"`
	Games        int    `json:"games"`
	LastAt       string `json:"lastAt"`
}

// AchievementBoard ranks players by achievements across all games (the test game doesn't count).
// Ties: whoever reached the count first.
func (s *Store) AchievementBoard(ctx context.Context, limit int) ([]AchievementRow, error) {
	rows, err := s.db.QueryContext(ctx, `
		SELECT p.nickname, COUNT(*) AS n, COUNT(DISTINCT a.game_id), MAX(a.earned_at) AS last
		FROM achievements a JOIN players p ON p.id = a.player_id
		WHERE a.game_id <> 'mock'
		GROUP BY a.player_id
		ORDER BY n DESC, last ASC, p.nickname ASC
		LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []AchievementRow{}
	for rows.Next() {
		var r AchievementRow
		if err := rows.Scan(&r.Nickname, &r.Achievements, &r.Games, &r.LastAt); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

// AllSaves returns every save of a player, by game, for restoring progress after a login.
func (s *Store) AllSaves(ctx context.Context, playerID string) (map[string]Save, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT game_id, data, flags, updated_at FROM saves WHERE player_id = ?`, playerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := map[string]Save{}
	for rows.Next() {
		var g string
		var sv Save
		if err := rows.Scan(&g, &sv.Data, &sv.Flags, &sv.UpdatedAt); err != nil {
			return nil, err
		}
		out[g] = sv
	}
	return out, rows.Err()
}

type Save struct{ Data, Flags, UpdatedAt string }

func (s *Store) GetSave(ctx context.Context, playerID, gameID string) (Save, error) {
	var sv Save
	err := s.db.QueryRowContext(ctx, `SELECT data, flags, updated_at FROM saves WHERE player_id = ? AND game_id = ?`, playerID, gameID).
		Scan(&sv.Data, &sv.Flags, &sv.UpdatedAt)
	if errors.Is(err, sql.ErrNoRows) {
		return sv, errNotFound
	}
	return sv, err
}

func (s *Store) PutSave(ctx context.Context, playerID, gameID, data, flags string) (string, error) {
	t := now()
	_, err := s.db.ExecContext(ctx, `INSERT INTO saves (player_id, game_id, data, flags, updated_at) VALUES (?, ?, ?, ?, ?)
		ON CONFLICT (player_id, game_id) DO UPDATE SET data = excluded.data, flags = excluded.flags, updated_at = excluded.updated_at`,
		playerID, gameID, data, flags, t)
	return t, err
}

type Run struct {
	GameID, Ending, Difficulty, Choices string
	Stars, Score, DurationSec           int
}

func (s *Store) AddRun(ctx context.Context, playerID string, r Run) (int64, error) {
	res, err := s.db.ExecContext(ctx, `INSERT INTO runs (player_id, game_id, ending, stars, score, duration_sec, difficulty, choices, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, playerID, r.GameID, r.Ending, r.Stars, r.Score, r.DurationSec, r.Difficulty, r.Choices, now())
	if err != nil {
		return 0, err
	}
	return res.LastInsertId()
}

type LeaderRow struct {
	Nickname    string `json:"nickname"`
	Score       int    `json:"score"`
	Stars       int    `json:"stars"`
	Ending      string `json:"ending"`
	DurationSec int    `json:"durationSec"`
	At          string `json:"at"`
}

// Leaderboard returns each player's best run only, so one player can't fill the table.
func (s *Store) Leaderboard(ctx context.Context, gameID string, limit int) ([]LeaderRow, error) {
	rows, err := s.db.QueryContext(ctx, `
		WITH best AS (
			SELECT r.*, ROW_NUMBER() OVER (PARTITION BY r.player_id ORDER BY r.score DESC, r.duration_sec ASC, r.id ASC) AS rn
			FROM runs r WHERE r.game_id = ?
		)
		SELECT p.nickname, b.score, b.stars, b.ending, b.duration_sec, b.created_at
		FROM best b JOIN players p ON p.id = b.player_id
		WHERE b.rn = 1
		ORDER BY b.score DESC, b.duration_sec ASC, b.id ASC
		LIMIT ?`, gameID, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []LeaderRow{}
	for rows.Next() {
		var r LeaderRow
		if err := rows.Scan(&r.Nickname, &r.Score, &r.Stars, &r.Ending, &r.DurationSec, &r.At); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

type Stats struct {
	Runs           int            `json:"runs"`
	Endings        map[string]int `json:"endings"`
	AvgDurationSec int            `json:"avgDurationSec"`
}

func (s *Store) Stats(ctx context.Context, gameID string) (Stats, error) {
	st := Stats{Endings: map[string]int{}}
	var avg sql.NullFloat64
	if err := s.db.QueryRowContext(ctx, `SELECT COUNT(*), AVG(duration_sec) FROM runs WHERE game_id = ?`, gameID).Scan(&st.Runs, &avg); err != nil {
		return st, err
	}
	st.AvgDurationSec = int(avg.Float64 + 0.5)
	rows, err := s.db.QueryContext(ctx, `SELECT ending, COUNT(*) FROM runs WHERE game_id = ? GROUP BY ending`, gameID)
	if err != nil {
		return st, err
	}
	defer rows.Close()
	for rows.Next() {
		var e string
		var n int
		if err := rows.Scan(&e, &n); err != nil {
			return st, err
		}
		st.Endings[e] = n
	}
	return st, rows.Err()
}

func (s *Store) Ping(ctx context.Context) error { return s.db.PingContext(ctx) }
