package main

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

type testEnv struct {
	t   *testing.T
	srv *httptest.Server
}

func newEnv(t *testing.T, cfg Config) *testEnv {
	t.Helper()
	store, err := OpenStore(filepath.Join(t.TempDir(), "test.db"))
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { store.Close() })
	if cfg.Reads == 0 {
		cfg.Reads, cfg.Writes = 10_000, 10_000
	}
	if cfg.StaticDir == "" {
		cfg.StaticDir = t.TempDir()
	}
	cfg.Version = "test"
	srv := httptest.NewServer(NewHandler(cfg, store, slog.New(slog.NewTextHandler(io.Discard, nil))))
	t.Cleanup(srv.Close)
	return &testEnv{t: t, srv: srv}
}

// do sends a request and decodes a JSON response into a generic value.
func (e *testEnv) do(method, path, token, body string) (int, any, http.Header) {
	e.t.Helper()
	req, _ := http.NewRequest(method, e.srv.URL+path, strings.NewReader(body))
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		e.t.Fatal(err)
	}
	defer res.Body.Close()
	raw, _ := io.ReadAll(res.Body)
	var v any
	_ = json.Unmarshal(raw, &v)
	return res.StatusCode, v, res.Header
}

func (e *testEnv) player(nick string) string {
	e.t.Helper()
	code, v, _ := e.do("POST", "/api/v1/players", "", `{"nickname":"`+nick+`"}`)
	if code != 201 {
		e.t.Fatalf("create player: %d %v", code, v)
	}
	return v.(map[string]any)["token"].(string)
}

func errCode(v any) string {
	m, _ := v.(map[string]any)
	e, _ := m["error"].(map[string]any)
	s, _ := e["code"].(string)
	return s
}

func TestHealth(t *testing.T) {
	e := newEnv(t, Config{})
	code, v, h := e.do("GET", "/api/v1/health", "", "")
	if code != 200 || v.(map[string]any)["ok"] != true || v.(map[string]any)["version"] != "test" {
		t.Fatalf("got %d %v", code, v)
	}
	for _, k := range []string{"X-Content-Type-Options", "X-Frame-Options", "Content-Security-Policy", "Referrer-Policy"} {
		if h.Get(k) == "" {
			t.Errorf("missing header %s", k)
		}
	}
}

func TestCreatePlayer(t *testing.T) {
	e := newEnv(t, Config{})
	cases := []struct {
		name, body string
		want       int
		code       string
	}{
		{"cyrillic", `{"nickname":"Аня_15"}`, 201, ""},
		{"trimmed", `{"nickname":"  Max  "}`, 201, ""},
		{"space and dash", `{"nickname":"Иван Петров-2"}`, 201, ""},
		{"too short", `{"nickname":"a"}`, 400, "bad_nickname"},
		{"too long", `{"nickname":"` + strings.Repeat("я", 21) + `"}`, 400, "bad_nickname"},
		{"html", `{"nickname":"<script>"}`, 400, "bad_nickname"},
		{"emoji", `{"nickname":"кот😀"}`, 400, "bad_nickname"},
		{"swear word", `{"nickname":"сука_123"}`, 400, "bad_nickname"},
		{"swear in latin look-alikes", `{"nickname":"cyka"}`, 400, "bad_nickname"},
		{"swear with separators", `{"nickname":"f_u-c k"}`, 400, "bad_nickname"},
		{"missing", `{}`, 400, "bad_nickname"},
		{"not json", `nickname=Аня`, 400, "bad_json"},
		{"too large", `{"nickname":"` + strings.Repeat("a", 90_000) + `"}`, 413, "too_large"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			code, v, _ := e.do("POST", "/api/v1/players", "", c.body)
			if code != c.want || (c.code != "" && errCode(v) != c.code) {
				t.Fatalf("got %d %v", code, v)
			}
			if code == 201 {
				m := v.(map[string]any)
				if len(m["token"].(string)) != 43 || m["playerId"] == "" {
					t.Fatalf("bad token or id: %v", m)
				}
			}
		})
	}
}

func TestMeAndAuth(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Аня")
	code, v, _ := e.do("GET", "/api/v1/players/me", tok, "")
	if code != 200 || v.(map[string]any)["nickname"] != "Аня" {
		t.Fatalf("me: %d %v", code, v)
	}
	for name, token := range map[string]string{"missing": "", "short": "abc", "unknown": strings.Repeat("x", 43)} {
		t.Run(name, func(t *testing.T) {
			if code, v, _ := e.do("GET", "/api/v1/players/me", token, ""); code != 401 || errCode(v) != "unauthorized" {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}
}

func TestSaves(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Аня")
	other := e.player("Боря")

	if code, _, _ := e.do("GET", "/api/v1/saves/glitch", tok, ""); code != 404 {
		t.Fatalf("empty save: %d", code)
	}
	cases := []struct {
		name, game, body string
		want             int
	}{
		{"ok", "glitch", `{"data":{"v":1,"room":2},"flags":{"gl_helped":true,"n":3,"s":"x","z":null}}`, 200},
		{"null data", "mock", `{"data":null,"flags":{}}`, 200},
		{"unknown game", "minecraft", `{"data":{"v":1},"flags":{}}`, 404},
		{"no v", "glitch", `{"data":{"room":2},"flags":{}}`, 400},
		{"v is 2", "glitch", `{"data":{"v":2},"flags":{}}`, 400},
		{"array data", "glitch", `{"data":[1],"flags":{}}`, 400},
		{"nested flag", "glitch", `{"data":{"v":1},"flags":{"a":{"b":1}}}`, 400},
		{"bad flag key", "glitch", `{"data":{"v":1},"flags":{"a b":1}}`, 400},
		{"save over 64 KB", "glitch", `{"data":{"v":1,"x":"` + strings.Repeat("a", 66_000) + `"},"flags":{}}`, 413},
		{"body over 80 KB", "glitch", `{"data":{"v":1},"flags":{"x":"` + strings.Repeat("a", 90_000) + `"}}`, 413},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			if code, v, _ := e.do("PUT", "/api/v1/saves/"+c.game, tok, c.body); code != c.want {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}

	code, v, _ := e.do("GET", "/api/v1/saves/glitch", tok, "")
	m := v.(map[string]any)
	if code != 200 || m["data"].(map[string]any)["room"] != 2.0 || m["flags"].(map[string]any)["gl_helped"] != true || m["updatedAt"] == "" {
		t.Fatalf("read back: %d %v", code, v)
	}
	// Players can't see each other's saves.
	if code, _, _ := e.do("GET", "/api/v1/saves/glitch", other, ""); code != 404 {
		t.Fatalf("other player sees the save: %d", code)
	}
	if code, _, _ := e.do("PUT", "/api/v1/saves/glitch", "", `{"data":null}`); code != 401 {
		t.Fatalf("no token: %d", code)
	}
}

const goodRun = `{"gameId":"glitch","ending":"good","stars":3,"score":900,"durationSec":1200,"difficulty":"hard","choices":["a",{"id":2}]}`

func TestRuns(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Аня")
	cases := []struct {
		name, body string
		want       int
		code       string
	}{
		{"ok", goodRun, 201, ""},
		{"unknown game", strings.Replace(goodRun, `"glitch"`, `"tetris"`, 1), 404, "unknown_game"},
		{"4 stars", strings.Replace(goodRun, `"stars":3`, `"stars":4`, 1), 400, "bad_stars"},
		{"fractional stars", strings.Replace(goodRun, `"stars":3`, `"stars":1.5`, 1), 400, "bad_stars"},
		{"negative score", strings.Replace(goodRun, `"score":900`, `"score":-5`, 1), 400, "bad_score"},
		{"huge score", strings.Replace(goodRun, `"score":900`, `"score":99999999`, 1), 400, "bad_score"},
		{"too fast", strings.Replace(goodRun, `"durationSec":1200`, `"durationSec":12`, 1), 400, "bad_duration"},
		{"bad difficulty", strings.Replace(goodRun, `"hard"`, `"god"`, 1), 400, "bad_difficulty"},
		{"bad ending", strings.Replace(goodRun, `"good"`, `"<b>"`, 1), 400, "bad_ending"},
		{"choices not array", strings.Replace(goodRun, `["a",{"id":2}]`, `"a"`, 1), 400, "bad_choices"},
		{"missing score", `{"gameId":"glitch","ending":"good","stars":1,"durationSec":60,"difficulty":"easy","choices":[]}`, 400, "bad_score"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			code, v, _ := e.do("POST", "/api/v1/runs", tok, c.body)
			if code != c.want || (c.code != "" && errCode(v) != c.code) {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}
	if code, _, _ := e.do("POST", "/api/v1/runs", "", goodRun); code != 401 {
		t.Fatalf("no token: %d", code)
	}
}

func TestLeaderboardAndStats(t *testing.T) {
	e := newEnv(t, Config{})
	anya, borya := e.player("Аня"), e.player("Боря")
	post := func(tok string, score, dur int, ending string) {
		body := strings.NewReplacer(`"score":900`, `"score":`+itoa(score), `"durationSec":1200`, `"durationSec":`+itoa(dur), `"good"`, `"`+ending+`"`).Replace(goodRun)
		if code, v, _ := e.do("POST", "/api/v1/runs", tok, body); code != 201 {
			t.Fatalf("post run: %d %v", code, v)
		}
	}
	post(anya, 500, 600, "good")
	post(anya, 800, 900, "good") // Аня's best
	post(anya, 800, 1000, "bad") // same score, slower: not better
	post(borya, 700, 300, "bad")

	code, v, _ := e.do("GET", "/api/v1/leaderboard?gameId=glitch&limit=10", "", "")
	rows := v.([]any)
	if code != 200 || len(rows) != 2 {
		t.Fatalf("one row per player expected: %d %v", code, v)
	}
	first := rows[0].(map[string]any)
	if first["nickname"] != "Аня" || first["score"] != 800.0 || first["durationSec"] != 900.0 {
		t.Fatalf("best run first: %v", first)
	}

	for q, want := range map[string]int{"?gameId=glitch&limit=0": 400, "?gameId=glitch&limit=51": 400, "?gameId=glitch&limit=x": 400, "?gameId=nope": 404, "": 404} {
		if code, _, _ := e.do("GET", "/api/v1/leaderboard"+q, "", ""); code != want {
			t.Errorf("%s: got %d, want %d", q, code, want)
		}
	}
	if code, v, _ := e.do("GET", "/api/v1/leaderboard?gameId=mock", "", ""); code != 200 || len(v.([]any)) != 0 {
		t.Fatalf("empty board must be []: %d %v", code, v)
	}

	code, v, _ = e.do("GET", "/api/v1/stats?gameId=glitch", "", "")
	st := v.(map[string]any)
	if code != 200 || st["runs"] != 4.0 || st["endings"].(map[string]any)["bad"] != 2.0 || st["avgDurationSec"] != 700.0 {
		t.Fatalf("stats: %d %v", code, v)
	}
}

func itoa(n int) string { b, _ := json.Marshal(n); return string(b) }

func TestRateLimit(t *testing.T) {
	e := newEnv(t, Config{Reads: 3, Writes: 2})
	for i := 0; i < 3; i++ {
		if code, _, _ := e.do("GET", "/api/v1/health", "", ""); code != 200 {
			t.Fatalf("read %d: %d", i, code)
		}
	}
	code, v, h := e.do("GET", "/api/v1/health", "", "")
	if code != 429 || errCode(v) != "rate_limited" || h.Get("Retry-After") == "" {
		t.Fatalf("4th read: %d %v", code, v)
	}
	// Writes have their own budget.
	e.do("POST", "/api/v1/players", "", `{"nickname":"Аня"}`)
	e.do("POST", "/api/v1/players", "", `{"nickname":"Аня"}`)
	if code, _, _ := e.do("POST", "/api/v1/players", "", `{"nickname":"Аня"}`); code != 429 {
		t.Fatalf("3rd write: %d", code)
	}
}

func TestUnknownAPIPathIsJSON404(t *testing.T) {
	e := newEnv(t, Config{})
	if code, v, _ := e.do("GET", "/api/v1/admin", "", ""); code != 404 || errCode(v) != "not_found" {
		t.Fatalf("got %d %v", code, v)
	}
}

func TestStatic(t *testing.T) {
	dir := t.TempDir()
	write := func(p, s string) {
		full := filepath.Join(dir, filepath.FromSlash(p))
		_ = os.MkdirAll(filepath.Dir(full), 0o755)
		if err := os.WriteFile(full, []byte(s), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	write("index.html", "SITE")
	write("assets/app-abc123.js", "JS")
	write("games/glitch/index.html", "GAME")
	write("games/glitch/assets/x-1.js", "GJS")
	_ = os.MkdirAll(filepath.Join(dir, "empty"), 0o755)
	e := newEnv(t, Config{StaticDir: dir})

	get := func(p string) (int, string, http.Header) {
		res, err := http.Get(e.srv.URL + p)
		if err != nil {
			t.Fatal(err)
		}
		defer res.Body.Close()
		b, _ := io.ReadAll(res.Body)
		return res.StatusCode, string(b), res.Header
	}
	cases := []struct {
		path, body, cache string
		code              int
	}{
		{"/", "SITE", "no-cache", 200},
		{"/play/glitch", "SITE", "no-cache", 200}, // SPA route
		{"/results/mock", "SITE", "no-cache", 200},
		{"/assets/app-abc123.js", "JS", "immutable", 200},
		{"/games/glitch/", "GAME", "no-cache", 200},
		{"/games/glitch/assets/x-1.js", "GJS", "immutable", 200},
		{"/games/nope/index.html", "", "", 404}, // a missing game is a real 404, not the site
		{"/games/nope", "", "", 404},
		{"/missing.png", "", "", 404},
		{"/empty/", "", "", 404},                       // no directory listing
		{"/../../etc/passwd", "SITE", "no-cache", 200}, // cleaned to /etc/passwd → the site page, never a file outside STATIC_DIR
	}
	for _, c := range cases {
		t.Run(c.path, func(t *testing.T) {
			code, body, h := get(c.path)
			if code != c.code || (c.body != "" && body != c.body) || !strings.Contains(h.Get("Cache-Control"), c.cache) {
				t.Fatalf("got %d %q cache=%q", code, body, h.Get("Cache-Control"))
			}
		})
	}
}

func TestCleanNicknameKeepsNormalNames(t *testing.T) {
	for _, n := range []string{"Аня", "Max", "Сергей", "Хакер_2010", "Kate", "Тимур-Пчелкин", "Саша Б", "Mike", "Ника"} {
		if _, ok := cleanNickname(n); !ok {
			t.Errorf("%q should be allowed", n)
		}
	}
}

func TestMigrationsAreIdempotent(t *testing.T) {
	p := filepath.Join(t.TempDir(), "m.db")
	for i := 0; i < 2; i++ {
		s, err := OpenStore(p)
		if err != nil {
			t.Fatal(err)
		}
		s.Close()
	}
}
