package main

import (
	"regexp"
	"strings"
	"testing"
)

var keyFormat = regexp.MustCompile(`^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$`)

func register(t *testing.T, e *testEnv, nick string) (token, key string) {
	t.Helper()
	code, v, _ := e.do("POST", "/api/v1/players", "", `{"nickname":"`+nick+`"}`)
	if code != 201 {
		t.Fatalf("register: %d %v", code, v)
	}
	m := v.(map[string]any)
	return m["token"].(string), m["key"].(string)
}

func TestEveryPlayerGetsAUniqueKey(t *testing.T) {
	e := newEnv(t, Config{})
	seen := map[string]bool{}
	for _, nick := range []string{"Аня", "Боря", "Вера", "Гоша", "Даня"} {
		_, key := register(t, e, nick)
		if !keyFormat.MatchString(key) || len(key) != 14 {
			t.Fatalf("key %q", key)
		}
		if seen[key] {
			t.Fatalf("duplicate key %q", key)
		}
		seen[key] = true
	}
}

func TestSignInWithKeyOnAnotherDevice(t *testing.T) {
	e := newEnv(t, Config{Logins: 1000})
	tok, key := register(t, e, "Аня")
	e.do("PUT", "/api/v1/saves/glitch", tok, `{"data":{"v":1,"room":7},"flags":{}}`)

	// Written down by hand: lower case, spaces instead of dashes, Russian look-alike letters.
	typed := strings.ToLower(strings.ReplaceAll(key, "-", " "))
	typed = strings.NewReplacer("a", "а", "e", "е", "k", "к", "m", "м", "p", "р", "c", "с", "x", "х").Replace(typed)
	code, v, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"`+typed+`"}`)
	if code != 200 {
		t.Fatalf("login with %q: %d %v", typed, code, v)
	}
	m := v.(map[string]any)
	if m["nickname"] != "Аня" || m["key"] != key || m["hasPassword"] != false {
		t.Fatalf("login response: %v", m)
	}
	if code, v, _ := e.do("GET", "/api/v1/saves/glitch", m["token"].(string), ""); code != 200 || v.(map[string]any)["data"].(map[string]any)["room"] != 7.0 {
		t.Fatalf("progress on the new device: %d %v", code, v)
	}
	// The key works again and again (it isn't a one-time code), and both devices stay in.
	if code, _, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"`+key+`"}`); code != 200 {
		t.Fatalf("second login: %d", code)
	}
	if code, _, _ := e.do("GET", "/api/v1/players/me", tok, ""); code != 200 {
		t.Fatalf("first device: %d", code)
	}
}

func TestWrongKeysAndANewKey(t *testing.T) {
	e := newEnv(t, Config{Logins: 1000})
	tok, key := register(t, e, "Боря")
	for name, k := range map[string]string{
		"empty":         "",
		"too short":     key[:9],
		"too long":      key + "A",
		"symbols":       "K7MX-2QPA-9RT!",
		"no such key":   "2222-3333-4444",
		"o is not zero": strings.Replace(key, key[:1], "O", 1),
	} {
		t.Run(name, func(t *testing.T) {
			if code, v, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"`+k+`"}`); code != 401 || errCode(v) != "bad_key" {
				t.Fatalf("%q: %d %v", k, code, v)
			}
		})
	}

	// A lost key is replaced from a device that is still signed in; the old key stops working.
	if code, _, _ := e.do("POST", "/api/v1/players/me/key", "", ""); code != 401 {
		t.Fatalf("new key without a session: %d", code)
	}
	code, v, _ := e.do("POST", "/api/v1/players/me/key", tok, "")
	newKey := v.(map[string]any)["key"].(string)
	if code != 200 || !keyFormat.MatchString(newKey) || newKey == key {
		t.Fatalf("new key: %d %v", code, v)
	}
	if code, _, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"`+key+`"}`); code != 401 {
		t.Fatalf("old key after replacing: %d", code)
	}
	if code, _, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"`+newKey+`"}`); code != 200 {
		t.Fatalf("new key: %d", code)
	}
}

func TestKeyLoginSharesTheLoginRateLimit(t *testing.T) {
	e := newEnv(t, Config{Logins: 2})
	e.do("POST", "/api/v1/login/key", "", `{"key":"2222-3333-4444"}`)
	e.do("POST", "/api/v1/login", "", `{"nickname":"x","password":"yyyyyy"}`)
	if code, _, _ := e.do("POST", "/api/v1/login/key", "", `{"key":"2222-3333-4444"}`); code != 429 {
		t.Fatalf("3rd attempt: %d", code)
	}
}
