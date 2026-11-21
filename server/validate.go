package main

import (
	"bytes"
	"crypto/rand"
	"encoding/json"
	"math"
	"math/big"
	"regexp"
	"strings"
	"unicode/utf8"
)

const (
	maxBodyBytes    = 80 << 10 // a 64 KB save plus its flags
	maxSaveBytes    = 64 << 10
	maxChoicesBytes = 16 << 10
	maxFlags        = 200
)

var knownGames = map[string]bool{"glitch": true, "chuzhoe-imya": true, "kompas": true, "dym": true, "mock": true}

// Each game may only grant achievements with its own prefix (docs/GAME_CONTRACT.md).
var achievementPrefix = map[string]string{"glitch": "gl_", "chuzhoe-imya": "ci_", "kompas": "km_", "dym": "dm_", "mock": "mk_"}

var achievementRe = regexp.MustCompile(`^[a-z0-9_]{1,64}$`)

func validAchievement(a Achievement) bool {
	p, ok := achievementPrefix[a.GameID]
	return ok && achievementRe.MatchString(a.ID) && strings.HasPrefix(a.ID, p)
}

// ---- secret login keys: «K7MX-2QPA-9RTD» ----

// No 0/O, 1/I/L: nothing a teen can misread when writing the key down. 31 symbols × 12 = about 59 bits.
const keyAlphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"
const keyLen = 12

// Russian-layout letters that look like Latin ones are read as Latin, so a key typed on a Russian keyboard still works.
var cyrToLat = strings.NewReplacer("А", "A", "В", "B", "Е", "E", "К", "K", "М", "M", "Н", "H", "Р", "P", "С", "C", "Т", "T", "У", "Y", "Х", "X")

func newKey() (string, error) {
	b := make([]byte, keyLen)
	for i := range b {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(keyAlphabet))))
		if err != nil {
			return "", err
		}
		b[i] = keyAlphabet[n.Int64()]
	}
	return string(b), nil
}

// normalizeKey accepts any case, spaces, dashes and Cyrillic look-alikes. "" if it can't be a key.
func normalizeKey(s string) string {
	if len(s) > 100 {
		return ""
	}
	var out strings.Builder
	for _, r := range cyrToLat.Replace(strings.ToUpper(s)) {
		if strings.ContainsRune(keyAlphabet, r) {
			out.WriteRune(r)
		} else if r != ' ' && r != '-' {
			return ""
		}
	}
	if out.Len() != keyLen {
		return ""
	}
	return out.String()
}

// formatKey shows a key in three groups of four: «K7MX-2QPA-9RTD».
func formatKey(k string) string { return k[0:4] + "-" + k[4:8] + "-" + k[8:12] }

// loginKey makes nickname logins case-insensitive: «Аня», «аня» and «АНЯ» are one account; «ё» = «е».
func loginKey(nickname string) string {
	return strings.ReplaceAll(strings.ToLower(strings.TrimSpace(nickname)), "ё", "е")
}

// validPassword: 6–64 characters, at most 72 bytes (the bcrypt limit), not only spaces.
func validPassword(p string) bool {
	n := utf8.RuneCountInString(p)
	return n >= 6 && n <= 64 && len(p) <= 72 && strings.TrimSpace(p) != ""
}

var (
	nicknameRe = regexp.MustCompile(`^[\p{L}\p{N} _-]{2,20}$`)
	endingRe   = regexp.MustCompile(`^[A-Za-z0-9_-]{1,64}$`)
	flagKeyRe  = regexp.MustCompile(`^[A-Za-z0-9_.:-]{1,64}$`)
)

// Roots of common Russian and English swear words. Nicknames are checked after lowercasing,
// removing spaces, "_" and "-", and replacing look-alike Latin letters and digits with Cyrillic ones.
var badRoots = []string{
	"хуй", "хуе", "хуё", "хуи", "пизд", "ебат", "ебан", "ебал", "еблан", "ёб", "бля", "сука", "суки", "мудак", "мудил",
	"пидор", "пидар", "гандон", "шлюх", "залуп", "дроч", "манда",
	"fuck", "shit", "bitch", "cunt", "dick", "nigger", "nigga", "whore", "slut", "porn", "sex",
}

var lookAlike = strings.NewReplacer(
	"a", "а", "e", "е", "o", "о", "p", "р", "c", "с", "y", "у", "x", "х", "k", "к", "m", "м", "t", "т", "b", "б", "h", "н",
	"3", "з", "0", "о", "6", "б", "ё", "е",
)

// cleanNickname trims the nickname and reports whether it is allowed.
func cleanNickname(raw string) (string, bool) {
	n := strings.TrimSpace(raw)
	if !nicknameRe.MatchString(n) || utf8.RuneCountInString(strings.ReplaceAll(n, " ", "")) < 2 {
		return "", false
	}
	flat := strings.NewReplacer(" ", "", "_", "", "-", "").Replace(strings.ToLower(n))
	for _, form := range []string{flat, lookAlike.Replace(flat)} {
		for _, bad := range badRoots {
			if strings.Contains(form, bad) || strings.Contains(form, lookAlike.Replace(bad)) {
				return "", false
			}
		}
	}
	return n, true
}

// validSaveData accepts null or a JSON object with "v": 1, at most 64 KB.
func validSaveData(raw json.RawMessage) bool {
	t := bytes.TrimSpace(raw)
	if len(t) == 0 || bytes.Equal(t, []byte("null")) {
		return true
	}
	if len(t) > maxSaveBytes || t[0] != '{' {
		return false
	}
	var obj map[string]json.RawMessage
	if json.Unmarshal(t, &obj) != nil {
		return false
	}
	var v float64
	return json.Unmarshal(obj["v"], &v) == nil && v == 1
}

// validFlags accepts an object of up to 200 keys with string, number, boolean or null values.
func validFlags(raw json.RawMessage) bool {
	t := bytes.TrimSpace(raw)
	if len(t) == 0 || bytes.Equal(t, []byte("null")) {
		return true
	}
	var obj map[string]any
	if json.Unmarshal(t, &obj) != nil || len(obj) > maxFlags {
		return false
	}
	for k, v := range obj {
		if !flagKeyRe.MatchString(k) {
			return false
		}
		switch x := v.(type) {
		case nil, bool, float64:
		case string:
			if utf8.RuneCountInString(x) > 200 {
				return false
			}
		default:
			return false
		}
	}
	return true
}

type runInput struct {
	GameID      string          `json:"gameId"`
	Ending      string          `json:"ending"`
	Stars       *float64        `json:"stars"`
	Score       *float64        `json:"score"`
	DurationSec *float64        `json:"durationSec"`
	Difficulty  string          `json:"difficulty"`
	Choices     json.RawMessage `json:"choices"`
}

func isInt(f *float64, lo, hi float64) bool {
	return f != nil && *f == math.Trunc(*f) && *f >= lo && *f <= hi
}

// validateRun returns the error code for a bad run, or "" when it's fine.
// Impossible values are rejected so the leaderboard stays believable.
func validateRun(in runInput) string {
	switch {
	case !endingRe.MatchString(in.Ending):
		return "bad_ending"
	case !isInt(in.Stars, 0, 3):
		return "bad_stars"
	case !isInt(in.Score, 0, 1_000_000):
		return "bad_score"
	case in.DurationSec == nil || *in.DurationSec < 30 || *in.DurationSec > 21_600:
		return "bad_duration"
	case in.Difficulty != "easy" && in.Difficulty != "normal" && in.Difficulty != "hard":
		return "bad_difficulty"
	}
	c := bytes.TrimSpace(in.Choices)
	var arr []json.RawMessage
	if len(c) == 0 || len(c) > maxChoicesBytes || json.Unmarshal(c, &arr) != nil || len(arr) > 200 {
		return "bad_choices"
	}
	return ""
}
