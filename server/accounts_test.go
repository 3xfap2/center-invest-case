package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"net/url"
	"path/filepath"
	"strings"
	"testing"
)

func TestPasswordAndLogin(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Аня")

	for name, c := range map[string]struct {
		body string
		want int
	}{
		"too short":   {`{"password":"12345"}`, 400},
		"only spaces": {`{"password":"       "}`, 400},
		"too long":    {`{"password":"` + strings.Repeat("я", 65) + `"}`, 400},
		"missing":     {`{}`, 400},
	} {
		t.Run(name, func(t *testing.T) {
			if code, v, _ := e.do("POST", "/api/v1/players/me/password", tok, c.body); code != c.want {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}
	if code, _, _ := e.do("POST", "/api/v1/players/me/password", "", `{"password":"secret1"}`); code != 401 {
		t.Fatalf("no token: %d", code)
	}
	if code, v, _ := e.do("POST", "/api/v1/players/me/password", tok, `{"password":"secret1"}`); code != 200 {
		t.Fatalf("set password: %d %v", code, v)
	}
	if _, v, _ := e.do("GET", "/api/v1/players/me", tok, ""); v.(map[string]any)["hasPassword"] != true {
		t.Fatalf("me: %v", v)
	}

	// Nobody else can register the same nickname (any case).
	if code, v, _ := e.do("POST", "/api/v1/players", "", `{"nickname":"АНЯ"}`); code != 409 || errCode(v) != "nickname_taken" {
		t.Fatalf("taken: %d %v", code, v)
	}

	for name, body := range map[string]string{
		"wrong password":   `{"nickname":"Аня","password":"secret2"}`,
		"unknown nickname": `{"nickname":"Никто","password":"secret1"}`,
		"huge password":    `{"nickname":"Аня","password":"` + strings.Repeat("x", 100) + `"}`,
	} {
		t.Run(name, func(t *testing.T) {
			if code, v, _ := e.do("POST", "/api/v1/login", "", body); code != 401 || errCode(v) != "bad_login" {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}

	// Login from a second device: a new token, the old one keeps working.
	code, v, _ := e.do("POST", "/api/v1/login", "", `{"nickname":"  аня ","password":"secret1"}`)
	if code != 200 {
		t.Fatalf("login: %d %v", code, v)
	}
	tok2 := v.(map[string]any)["token"].(string)
	if tok2 == tok || v.(map[string]any)["nickname"] != "Аня" {
		t.Fatalf("login response: %v", v)
	}
	for _, tk := range []string{tok, tok2} {
		if code, _, _ := e.do("GET", "/api/v1/players/me", tk, ""); code != 200 {
			t.Fatalf("session %q: %d", tk[:6], code)
		}
	}

	// Logout ends only that device's session.
	if code, _, _ := e.do("POST", "/api/v1/logout", tok2, ""); code != 204 {
		t.Fatalf("logout: %d", code)
	}
	if code, _, _ := e.do("GET", "/api/v1/players/me", tok2, ""); code != 401 {
		t.Fatalf("token after logout: %d", code)
	}
	if code, _, _ := e.do("GET", "/api/v1/players/me", tok, ""); code != 200 {
		t.Fatalf("other device after logout: %d", code)
	}
}

func TestLoginRestoresSaves(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Боря")
	e.do("POST", "/api/v1/players/me/password", tok, `{"password":"secret1"}`)
	e.do("PUT", "/api/v1/saves/glitch", tok, `{"data":{"v":1,"room":3},"flags":{"gl_a":true}}`)
	e.do("POST", "/api/v1/achievements", tok, `{"items":[{"gameId":"glitch","id":"gl_first"}]}`)

	_, v, _ := e.do("POST", "/api/v1/login", "", `{"nickname":"Боря","password":"secret1"}`)
	tok2 := v.(map[string]any)["token"].(string)
	code, v, _ := e.do("GET", "/api/v1/saves", tok2, "")
	g := v.(map[string]any)["glitch"].(map[string]any)
	if code != 200 || g["data"].(map[string]any)["room"] != 3.0 || g["flags"].(map[string]any)["gl_a"] != true {
		t.Fatalf("all saves: %d %v", code, v)
	}
	code, v, _ = e.do("GET", "/api/v1/achievements/me", tok2, "")
	if list := v.([]any); code != 200 || len(list) != 1 || list[0].(map[string]any)["id"] != "gl_first" {
		t.Fatalf("my achievements: %d %v", code, v)
	}
}

func TestAchievements(t *testing.T) {
	e := newEnv(t, Config{})
	anya, borya, vera := e.player("Аня"), e.player("Боря"), e.player("Вера")
	cases := []struct {
		name, body string
		want       int
	}{
		{"ok", `{"items":[{"gameId":"glitch","id":"gl_a"},{"gameId":"chuzhoe-imya","id":"ci_b"}]}`, 200},
		{"empty", `{"items":[]}`, 400},
		{"wrong prefix", `{"items":[{"gameId":"glitch","id":"ci_b"}]}`, 400},
		{"unknown game", `{"items":[{"gameId":"tetris","id":"gl_a"}]}`, 400},
		{"bad id", `{"items":[{"gameId":"glitch","id":"gl A!"}]}`, 400},
		{"too many", `{"items":[` + strings.TrimSuffix(strings.Repeat(`{"gameId":"glitch","id":"gl_x"},`, 201), ",") + `]}`, 400},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			if code, v, _ := e.do("POST", "/api/v1/achievements", anya, c.body); code != c.want {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}
	// Repeats are ignored.
	if _, v, _ := e.do("POST", "/api/v1/achievements", anya, `{"items":[{"gameId":"glitch","id":"gl_a"},{"gameId":"glitch","id":"gl_c"}]}`); v.(map[string]any)["added"] != 1.0 {
		t.Fatalf("idempotent: %v", v)
	}
	if code, _, _ := e.do("POST", "/api/v1/achievements", "", `{"items":[{"gameId":"glitch","id":"gl_a"}]}`); code != 401 {
		t.Fatalf("no token: %d", code)
	}
	e.do("POST", "/api/v1/achievements", borya, `{"items":[{"gameId":"glitch","id":"gl_a"}]}`)
	// The test game doesn't count on the board.
	e.do("POST", "/api/v1/achievements", vera, `{"items":[{"gameId":"mock","id":"mk_1"},{"gameId":"mock","id":"mk_2"},{"gameId":"mock","id":"mk_3"},{"gameId":"mock","id":"mk_4"}]}`)

	code, v, _ := e.do("GET", "/api/v1/leaderboard/achievements?limit=10", "", "")
	rows := v.([]any)
	if code != 200 || len(rows) != 2 {
		t.Fatalf("board: %d %v", code, v)
	}
	first := rows[0].(map[string]any)
	if first["nickname"] != "Аня" || first["achievements"] != 3.0 || first["games"] != 2.0 || first["lastAt"] == "" {
		t.Fatalf("first row: %v", first)
	}
	if code, _, _ := e.do("GET", "/api/v1/leaderboard/achievements?limit=99", "", ""); code != 400 {
		t.Fatalf("limit: %d", code)
	}
}

func TestLoginRateLimit(t *testing.T) {
	e := newEnv(t, Config{Logins: 3})
	for i := 0; i < 3; i++ {
		e.do("POST", "/api/v1/login", "", `{"nickname":"x","password":"yyyyyy"}`)
	}
	if code, _, _ := e.do("POST", "/api/v1/login", "", `{"nickname":"x","password":"yyyyyy"}`); code != 429 {
		t.Fatalf("4th login: %d", code)
	}
}

func TestMigrationFromV1KeepsPlayersLoggedIn(t *testing.T) {
	// A database from the first version (no sessions table) with one player in it.
	path := filepath.Join(t.TempDir(), "v1.db")
	db, err := sql.Open("sqlite", "file:"+path)
	if err != nil {
		t.Fatal(err)
	}
	token := "old-device-token-0123456789abcdef"
	for _, q := range []string{sqlMigrations[0], `PRAGMA user_version = 1`} {
		if _, err := db.Exec(q); err != nil {
			t.Fatal(err)
		}
	}
	if _, err := db.Exec(`INSERT INTO players (id, nickname, token_hash, created_at) VALUES ('p1', 'Старый', ?, '2026-11-21T10:00:00Z')`, hashToken(token)); err != nil {
		t.Fatal(err)
	}
	db.Close()

	// Upgrading moves the token into sessions, so the player stays logged in.
	s, err := OpenStore(path)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	p, err := s.PlayerByTokenHash(context.Background(), hashToken(token))
	if err != nil || p.Nickname != "Старый" || p.HasPassword {
		t.Fatalf("after upgrade: %+v %v", p, err)
	}
}

func TestNicknamesAreUnique(t *testing.T) {
	e := newEnv(t, Config{})
	e.player("Ёжик")
	for _, nick := range []string{"Ёжик", "ёжик", "ЕЖИК", "  ежик "} {
		if code, v, _ := e.do("POST", "/api/v1/players", "", `{"nickname":"`+nick+`"}`); code != 409 || errCode(v) != "nickname_taken" {
			t.Fatalf("%q: %d %v", nick, code, v)
		}
	}
	cases := []struct {
		nick             string
		valid, available bool
	}{
		{"ежик", true, false},
		{"Ёжик_2", true, true},
		{"a", false, false},
		{"сука", false, false},
	}
	for _, c := range cases {
		_, v, _ := e.do("GET", "/api/v1/players/check?nickname="+url.QueryEscape(c.nick), "", "")
		m := v.(map[string]any)
		if m["valid"] != c.valid || m["available"] != c.available {
			t.Errorf("%q: %v", c.nick, m)
		}
	}
}

func TestUpgradeRenamesDuplicateNicknames(t *testing.T) {
	path := filepath.Join(t.TempDir(), "dupes.db")
	db, err := sql.Open("sqlite", "file:"+path)
	if err != nil {
		t.Fatal(err)
	}
	for _, q := range []string{sqlMigrations[0], sqlMigrations[1], `PRAGMA user_version = 2`} {
		if _, err := db.Exec(q); err != nil {
			t.Fatal(err)
		}
	}
	// Three players called «Аня» in different cases, created in this order; the second one has a password.
	for i, nick := range []string{"Аня", "АНЯ", "аня"} {
		tok := hashToken(fmt.Sprintf("token-%d-0123456789abcdef", i))
		if _, err := db.Exec(`INSERT INTO players (id, nickname, token_hash, created_at) VALUES (?, ?, ?, ?)`, fmt.Sprint("p", i), nick, tok, fmt.Sprintf("2026-11-21T10:0%d:00Z", i)); err != nil {
			t.Fatal(err)
		}
		if _, err := db.Exec(`INSERT INTO sessions (token_hash, player_id, created_at) VALUES (?, ?, '2026-11-21T10:00:00Z')`, tok, fmt.Sprint("p", i)); err != nil {
			t.Fatal(err)
		}
	}
	if _, err := db.Exec(`UPDATE players SET password_hash = 'x', login_key = 'аня' WHERE id = 'p1'`); err != nil {
		t.Fatal(err)
	}
	db.Close()

	s, err := OpenStore(path)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	got := map[string]string{}
	for i := 0; i < 3; i++ {
		p, err := s.PlayerByTokenHash(context.Background(), hashToken(fmt.Sprintf("token-%d-0123456789abcdef", i)))
		if err != nil {
			t.Fatal(err)
		}
		got[p.ID] = p.Nickname
	}
	// The password account keeps its nickname; the others get numbered, oldest first.
	want := map[string]string{"p1": "АНЯ", "p0": "Аня-2", "p2": "аня-3"}
	for id, nick := range want {
		if got[id] != nick {
			t.Fatalf("after upgrade: %v, want %v", got, want)
		}
	}
	if _, err := s.CreatePlayer(context.Background(), "p9", "аня", hashToken("new-token-0123456789")); !errors.Is(err, errTaken) {
		t.Fatalf("duplicate after upgrade: %v", err)
	}
}
