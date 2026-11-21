package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite" // pure Go SQLite driver, no CGO
)

// Store is the only code that talks to the database.
type Store struct{ db *sql.DB }

var errNotFound = errors.New("not found")

// migrations run in order; PRAGMA user_version remembers how many have been applied.
var migrations = []string{
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
}

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
		if _, err := tx.Exec(migrations[i]); err != nil {
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
	TokenHash               []byte
}

func (s *Store) CreatePlayer(ctx context.Context, id, nickname string, tokenHash []byte) (Player, error) {
	p := Player{ID: id, Nickname: nickname, TokenHash: tokenHash, CreatedAt: now()}
	_, err := s.db.ExecContext(ctx, `INSERT INTO players (id, nickname, token_hash, created_at) VALUES (?, ?, ?, ?)`, p.ID, p.Nickname, p.TokenHash, p.CreatedAt)
	return p, err
}

func (s *Store) PlayerByTokenHash(ctx context.Context, h []byte) (Player, error) {
	var p Player
	err := s.db.QueryRowContext(ctx, `SELECT id, nickname, token_hash, created_at FROM players WHERE token_hash = ?`, h).
		Scan(&p.ID, &p.Nickname, &p.TokenHash, &p.CreatedAt)
	if errors.Is(err, sql.ErrNoRows) {
		return p, errNotFound
	}
	return p, err
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
