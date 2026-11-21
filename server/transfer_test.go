package main

import (
	"context"
	"regexp"
	"testing"
	"time"
)

func newCode(t *testing.T, e *testEnv, tok string) string {
	t.Helper()
	code, v, _ := e.do("POST", "/api/v1/players/me/transfer", tok, "")
	if code != 201 {
		t.Fatalf("transfer: %d %v", code, v)
	}
	c := v.(map[string]any)["code"].(string)
	if !regexp.MustCompile(`^[0-9]{6}$`).MatchString(c) {
		t.Fatalf("code %q", c)
	}
	return c
}

func TestTransferCodeMovesPlayerToAnotherDevice(t *testing.T) {
	e := newEnv(t, Config{})
	tok := e.player("Аня")
	e.do("PUT", "/api/v1/saves/glitch", tok, `{"data":{"v":1,"room":2},"flags":{}}`)
	if code, _, _ := e.do("POST", "/api/v1/players/me/transfer", "", ""); code != 401 {
		t.Fatalf("no token: %d", code)
	}
	c := newCode(t, e, tok)

	// The other device: nickname (any case) + code, spaces allowed.
	code, v, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"аня","code":"`+c[:3]+" "+c[3:]+`"}`)
	if code != 200 || v.(map[string]any)["nickname"] != "Аня" || v.(map[string]any)["hasPassword"] != false {
		t.Fatalf("login with code: %d %v", code, v)
	}
	tok2 := v.(map[string]any)["token"].(string)
	if code, v, _ := e.do("GET", "/api/v1/saves/glitch", tok2, ""); code != 200 || v.(map[string]any)["data"].(map[string]any)["room"] != 2.0 {
		t.Fatalf("progress on the new device: %d %v", code, v)
	}
	// Both devices stay logged in.
	if code, _, _ := e.do("GET", "/api/v1/players/me", tok, ""); code != 200 {
		t.Fatalf("old device: %d", code)
	}
	// One use only.
	if code, _, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"Аня","code":"`+c+`"}`); code != 401 {
		t.Fatalf("second use: %d", code)
	}
}

func TestTransferCodeRules(t *testing.T) {
	e := newEnv(t, Config{Logins: 1000})
	tok := e.player("Боря")
	c := newCode(t, e, tok)
	wrong := "000000"
	if c == wrong {
		wrong = "111111"
	}
	for name, body := range map[string]string{
		"wrong nickname": `{"nickname":"Вера","code":"` + c + `"}`,
		"not 6 digits":   `{"nickname":"Боря","code":"12345"}`,
		"letters":        `{"nickname":"Боря","code":"abcdef"}`,
	} {
		t.Run(name, func(t *testing.T) {
			if code, v, _ := e.do("POST", "/api/v1/login/code", "", body); code != 401 || errCode(v) != "bad_code" {
				t.Fatalf("got %d %v", code, v)
			}
		})
	}

	// A new code replaces the old one.
	c2 := newCode(t, e, tok)
	if c2 != c {
		if code, _, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"Боря","code":"`+c+`"}`); code != 401 {
			t.Fatalf("old code still works: %d", code)
		}
	}

	// Five wrong tries end the code, even the right one fails afterwards.
	c3 := newCode(t, e, tok)
	for i := 0; i < MaxCodeAttempts; i++ {
		w := wrong
		if w == c3 {
			w = "222222"
		}
		e.do("POST", "/api/v1/login/code", "", `{"nickname":"Боря","code":"`+w+`"}`)
	}
	if code, _, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"Боря","code":"`+c3+`"}`); code != 401 {
		t.Fatalf("code after 5 wrong tries: %d", code)
	}

	// An expired code doesn't work.
	c4 := newCode(t, e, tok)
	_, v, _ := e.do("GET", "/api/v1/players/me", tok, "")
	past := time.Now().UTC().Add(-time.Minute).Format(time.RFC3339)
	if err := e.store.SetTransferCode(context.Background(), v.(map[string]any)["playerId"].(string), hashToken(c4), past); err != nil {
		t.Fatal(err)
	}
	if code, _, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"Боря","code":"`+c4+`"}`); code != 401 {
		t.Fatalf("expired code: %d", code)
	}
}

func TestCodeLoginSharesTheLoginRateLimit(t *testing.T) {
	e := newEnv(t, Config{Logins: 2})
	e.do("POST", "/api/v1/login/code", "", `{"nickname":"x","code":"123456"}`)
	e.do("POST", "/api/v1/login", "", `{"nickname":"x","password":"yyyyyy"}`)
	if code, _, _ := e.do("POST", "/api/v1/login/code", "", `{"nickname":"x","code":"123456"}`); code != 429 {
		t.Fatalf("3rd attempt: %d", code)
	}
}
