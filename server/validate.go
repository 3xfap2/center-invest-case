package main

import (
	"bytes"
	"encoding/json"
	"math"
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

var knownGames = map[string]bool{"glitch": true, "chuzhoe-imya": true, "mock": true}

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
