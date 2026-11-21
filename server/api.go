package main

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type Config struct {
	Version       string
	StaticDir     string
	AllowedOrigin string // dev only: lets a site on another origin call the API
	TrustProxy    bool
	Reads, Writes int // per IP per minute
	Logins        int // login attempts per IP per minute (default 10)
}

type API struct {
	cfg     Config
	store   *Store
	limiter *Limiter
	log     *slog.Logger
}

// Handler builds the whole server: API routes, static site, and the middleware around them.
func NewHandler(cfg Config, store *Store, log *slog.Logger) http.Handler {
	a := &API{cfg: cfg, store: store, limiter: NewLimiter(cfg.Reads, cfg.Writes, time.Minute), log: log}
	if cfg.Logins <= 0 {
		cfg.Logins = 10
	}
	a.limiter.limits["login"] = cfg.Logins
	api := http.NewServeMux()
	api.HandleFunc("GET /api/v1/health", a.health)
	api.HandleFunc("POST /api/v1/players", a.createPlayer)
	api.HandleFunc("GET /api/v1/players/me", a.auth(a.me))
	api.HandleFunc("GET /api/v1/players/check", a.checkNickname)
	api.HandleFunc("POST /api/v1/players/me/password", a.auth(a.setPassword))
	api.HandleFunc("POST /api/v1/login", a.login)
	api.HandleFunc("POST /api/v1/logout", a.auth(a.logout))
	api.HandleFunc("GET /api/v1/saves", a.auth(a.allSaves))
	api.HandleFunc("POST /api/v1/achievements", a.auth(a.addAchievements))
	api.HandleFunc("GET /api/v1/achievements/me", a.auth(a.myAchievements))
	api.HandleFunc("GET /api/v1/leaderboard/achievements", a.achievementBoard)
	api.HandleFunc("GET /api/v1/saves/{gameId}", a.auth(a.getSave))
	api.HandleFunc("PUT /api/v1/saves/{gameId}", a.auth(a.putSave))
	api.HandleFunc("POST /api/v1/runs", a.auth(a.createRun))
	api.HandleFunc("GET /api/v1/leaderboard", a.leaderboard)
	api.HandleFunc("GET /api/v1/stats", a.stats)
	api.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		fail(w, 404, "not_found", "Нет такого адреса API")
	})

	root := http.NewServeMux()
	root.Handle("/api/", a.limit(a.cors(api)))
	root.Handle("/", staticHandler(cfg.StaticDir))
	return a.logRequests(securityHeaders(root))
}

// ---- helpers ----

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func fail(w http.ResponseWriter, status int, code, msg string) {
	writeJSON(w, status, map[string]any{"error": map[string]string{"code": code, "message": msg}})
}

// readJSON decodes a body of at most maxBodyBytes. It writes the error response itself and returns false on failure.
func readJSON(w http.ResponseWriter, r *http.Request, dst any) bool {
	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)
	dec := json.NewDecoder(r.Body)
	if err := dec.Decode(dst); err != nil {
		var tooBig *http.MaxBytesError
		if errors.As(err, &tooBig) {
			fail(w, 413, "too_large", "Слишком большой запрос")
		} else {
			fail(w, 400, "bad_json", "Неверный JSON")
		}
		return false
	}
	return true
}

func hashToken(t string) []byte {
	h := sha256.Sum256([]byte(t))
	return h[:]
}

func randomString(n int) string {
	b := make([]byte, n)
	_, _ = rand.Read(b) // crypto/rand never fails on supported platforms (Go 1.24+)
	return base64.RawURLEncoding.EncodeToString(b)
}

func (a *API) internal(w http.ResponseWriter, where string, err error) {
	a.log.Error("internal error", "where", where, "err", err)
	fail(w, 500, "internal", "Ошибка сервера")
}

// ---- middleware ----

func (a *API) auth(next func(http.ResponseWriter, *http.Request, Player)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tok, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
		if !ok || len(tok) < 20 || len(tok) > 200 {
			fail(w, 401, "unauthorized", "Нужен токен игрока")
			return
		}
		h := hashToken(tok)
		p, err := a.store.PlayerByTokenHash(r.Context(), h)
		if errors.Is(err, errNotFound) || (err == nil && subtle.ConstantTimeCompare(p.TokenHash, h) != 1) {
			fail(w, 401, "unauthorized", "Неизвестный токен")
			return
		}
		if err != nil {
			a.internal(w, "auth", err)
			return
		}
		next(w, r, p)
	}
}

func (a *API) limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		kind := "write"
		if r.Method == http.MethodGet || r.Method == http.MethodHead || r.Method == http.MethodOptions {
			kind = "read"
		}
		if r.URL.Path == "/api/v1/login" {
			kind = "login" // its own, smaller budget against password guessing
		}
		if ok, wait := a.limiter.Allow(clientIP(r, a.cfg.TrustProxy), kind); !ok {
			w.Header().Set("Retry-After", strconv.Itoa(int(wait.Seconds())+1))
			fail(w, 429, "rate_limited", "Слишком много запросов, подожди минуту")
			return
		}
		next.ServeHTTP(w, r)
	})
}

func (a *API) cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if a.cfg.AllowedOrigin != "" && r.Header.Get("Origin") == a.cfg.AllowedOrigin {
			w.Header().Set("Access-Control-Allow-Origin", a.cfg.AllowedOrigin)
			w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
			w.Header().Set("Vary", "Origin")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h := w.Header()
		h.Set("X-Content-Type-Options", "nosniff")
		h.Set("Referrer-Policy", "no-referrer")
		// Games run in an iframe of our own site; nobody else may frame us.
		h.Set("X-Frame-Options", "SAMEORIGIN")
		h.Set("Content-Security-Policy", "frame-ancestors 'self'; object-src 'none'; base-uri 'self'")
		h.Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
		next.ServeHTTP(w, r)
	})
}

type statusWriter struct {
	http.ResponseWriter
	status int
}

func (s *statusWriter) WriteHeader(c int) {
	s.status = c
	s.ResponseWriter.WriteHeader(c)
}

// logRequests logs method, path, status and time. Never nicknames, tokens or IP addresses.
func (a *API) logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sw := &statusWriter{ResponseWriter: w, status: 200}
		next.ServeHTTP(sw, r)
		if strings.HasPrefix(r.URL.Path, "/api/") {
			a.log.Info("request", "method", r.Method, "path", r.URL.Path, "status", sw.status, "ms", time.Since(start).Milliseconds())
		}
	})
}

// ---- handlers ----

func (a *API) health(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()
	if err := a.store.Ping(ctx); err != nil {
		a.internal(w, "health", err)
		return
	}
	writeJSON(w, 200, map[string]any{"ok": true, "version": a.cfg.Version})
}

func (a *API) createPlayer(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Nickname string `json:"nickname"`
	}
	if !readJSON(w, r, &in) {
		return
	}
	nick, ok := cleanNickname(in.Nickname)
	if !ok {
		fail(w, 400, "bad_nickname", "Ник: 2–20 символов, буквы, цифры, пробел, «_» и «-», без грубых слов")
		return
	}
	token := randomString(32)
	id, err := randomID()
	if err != nil {
		a.internal(w, "player id", err)
		return
	}
	p, err := a.store.CreatePlayer(r.Context(), id, nick, hashToken(token))
	if errors.Is(err, errTaken) {
		fail(w, 409, "nickname_taken", "Этот ник уже занят")
		return
	}
	if err != nil {
		a.internal(w, "create player", err)
		return
	}
	writeJSON(w, 201, map[string]string{"playerId": p.ID, "token": token, "nickname": p.Nickname})
}

func randomID() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// checkNickname lets the start screen say «свободен» or «занят» while the player types.
func (a *API) checkNickname(w http.ResponseWriter, r *http.Request) {
	nick, ok := cleanNickname(r.URL.Query().Get("nickname"))
	if !ok {
		writeJSON(w, 200, map[string]bool{"valid": false, "available": false})
		return
	}
	taken, err := a.store.NicknameTaken(r.Context(), loginKey(nick))
	if err != nil {
		a.internal(w, "check nickname", err)
		return
	}
	writeJSON(w, 200, map[string]bool{"valid": true, "available": !taken})
}

func (a *API) me(w http.ResponseWriter, _ *http.Request, p Player) {
	writeJSON(w, 200, map[string]any{"playerId": p.ID, "nickname": p.Nickname, "createdAt": p.CreatedAt, "hasPassword": p.HasPassword})
}

// ---- optional accounts ----
// Playing never needs a password. A player may add one later, so the same progress opens on another device.

// A real bcrypt hash of a random string: comparing against it when a nickname doesn't exist
// takes as long as a real check, so response time doesn't reveal which nicknames have accounts.
var dummyHash, _ = bcrypt.GenerateFromPassword([]byte("profnav-no-such-account"), bcrypt.DefaultCost)

func (a *API) setPassword(w http.ResponseWriter, r *http.Request, p Player) {
	var in struct {
		Password string `json:"password"`
	}
	if !readJSON(w, r, &in) {
		return
	}
	if !validPassword(in.Password) {
		fail(w, 400, "bad_password", "Пароль: от 6 до 64 символов")
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		a.internal(w, "hash password", err)
		return
	}
	switch err := a.store.SetPassword(r.Context(), p.ID, loginKey(p.Nickname), string(hash)); {
	case errors.Is(err, errTaken):
		fail(w, 409, "nickname_taken", "Этот ник уже защищён паролем другого игрока")
	case err != nil:
		a.internal(w, "set password", err)
	default:
		writeJSON(w, 200, map[string]bool{"hasPassword": true})
	}
}

func (a *API) login(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Nickname string `json:"nickname"`
		Password string `json:"password"`
	}
	if !readJSON(w, r, &in) {
		return
	}
	if len(in.Password) > 72 || len(in.Nickname) > 80 {
		fail(w, 401, "bad_login", "Неверный ник или пароль")
		return
	}
	id, nick, hash, err := a.store.Login(r.Context(), loginKey(in.Nickname))
	if err != nil && !errors.Is(err, errNotFound) {
		a.internal(w, "login", err)
		return
	}
	if errors.Is(err, errNotFound) {
		_ = bcrypt.CompareHashAndPassword(dummyHash, []byte(in.Password))
		fail(w, 401, "bad_login", "Неверный ник или пароль")
		return
	}
	if bcrypt.CompareHashAndPassword([]byte(hash), []byte(in.Password)) != nil {
		fail(w, 401, "bad_login", "Неверный ник или пароль")
		return
	}
	token := randomString(32)
	if err := a.store.AddSession(r.Context(), id, hashToken(token)); err != nil {
		a.internal(w, "add session", err)
		return
	}
	writeJSON(w, 200, map[string]any{"playerId": id, "token": token, "nickname": nick, "hasPassword": true})
}

func (a *API) logout(w http.ResponseWriter, r *http.Request, p Player) {
	if err := a.store.DeleteSession(r.Context(), p.TokenHash); err != nil {
		a.internal(w, "logout", err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (a *API) allSaves(w http.ResponseWriter, r *http.Request, p Player) {
	saves, err := a.store.AllSaves(r.Context(), p.ID)
	if err != nil {
		a.internal(w, "all saves", err)
		return
	}
	out := map[string]any{}
	for g, sv := range saves {
		out[g] = map[string]any{"data": json.RawMessage(sv.Data), "flags": json.RawMessage(sv.Flags), "updatedAt": sv.UpdatedAt}
	}
	writeJSON(w, 200, out)
}

// ---- achievements ----

func (a *API) addAchievements(w http.ResponseWriter, r *http.Request, p Player) {
	var in struct {
		Items []Achievement `json:"items"`
	}
	if !readJSON(w, r, &in) {
		return
	}
	if len(in.Items) == 0 || len(in.Items) > 200 {
		fail(w, 400, "bad_items", "От 1 до 200 достижений за раз")
		return
	}
	for _, it := range in.Items {
		if !validAchievement(it) {
			fail(w, 400, "bad_achievement", "Неверное достижение: "+it.GameID+" / "+it.ID)
			return
		}
	}
	added, err := a.store.AddAchievements(r.Context(), p.ID, in.Items)
	if err != nil {
		a.internal(w, "add achievements", err)
		return
	}
	writeJSON(w, 200, map[string]int{"added": added})
}

func (a *API) myAchievements(w http.ResponseWriter, r *http.Request, p Player) {
	list, err := a.store.PlayerAchievements(r.Context(), p.ID)
	if err != nil {
		a.internal(w, "my achievements", err)
		return
	}
	writeJSON(w, 200, list)
}

func (a *API) achievementBoard(w http.ResponseWriter, r *http.Request) {
	limit, ok := parseLimit(w, r)
	if !ok {
		return
	}
	rows, err := a.store.AchievementBoard(r.Context(), limit)
	if err != nil {
		a.internal(w, "achievement board", err)
		return
	}
	writeJSON(w, 200, rows)
}

func parseLimit(w http.ResponseWriter, r *http.Request) (int, bool) {
	limit := 20
	if s := r.URL.Query().Get("limit"); s != "" {
		n, err := strconv.Atoi(s)
		if err != nil || n < 1 || n > 50 {
			fail(w, 400, "bad_limit", "limit: от 1 до 50")
			return 0, false
		}
		limit = n
	}
	return limit, true
}

func gameFromPath(w http.ResponseWriter, r *http.Request) (string, bool) {
	g := r.PathValue("gameId")
	if !knownGames[g] {
		fail(w, 404, "unknown_game", "Нет такой игры")
		return "", false
	}
	return g, true
}

func (a *API) getSave(w http.ResponseWriter, r *http.Request, p Player) {
	g, ok := gameFromPath(w, r)
	if !ok {
		return
	}
	sv, err := a.store.GetSave(r.Context(), p.ID, g)
	if errors.Is(err, errNotFound) {
		fail(w, 404, "no_save", "Сохранения нет")
		return
	}
	if err != nil {
		a.internal(w, "get save", err)
		return
	}
	writeJSON(w, 200, map[string]any{"data": json.RawMessage(sv.Data), "flags": json.RawMessage(sv.Flags), "updatedAt": sv.UpdatedAt})
}

func (a *API) putSave(w http.ResponseWriter, r *http.Request, p Player) {
	g, ok := gameFromPath(w, r)
	if !ok {
		return
	}
	var in struct {
		Data  json.RawMessage `json:"data"`
		Flags json.RawMessage `json:"flags"`
	}
	if !readJSON(w, r, &in) {
		return
	}
	if len(in.Data) > maxSaveBytes {
		fail(w, 413, "too_large", "Сохранение больше 64 КБ")
		return
	}
	if !validSaveData(in.Data) {
		fail(w, 400, "bad_save", "Сохранение должно быть объектом с \"v\": 1")
		return
	}
	if !validFlags(in.Flags) {
		fail(w, 400, "bad_flags", "Неверные флаги")
		return
	}
	data, flags := orNull(in.Data), orEmpty(in.Flags)
	t, err := a.store.PutSave(r.Context(), p.ID, g, data, flags)
	if err != nil {
		a.internal(w, "put save", err)
		return
	}
	writeJSON(w, 200, map[string]string{"updatedAt": t})
}

func orNull(b json.RawMessage) string {
	if len(b) == 0 {
		return "null"
	}
	return string(b)
}

func orEmpty(b json.RawMessage) string {
	if len(b) == 0 || string(b) == "null" {
		return "{}"
	}
	return string(b)
}

func (a *API) createRun(w http.ResponseWriter, r *http.Request, p Player) {
	var in runInput
	if !readJSON(w, r, &in) {
		return
	}
	if !knownGames[in.GameID] {
		fail(w, 404, "unknown_game", "Нет такой игры")
		return
	}
	if code := validateRun(in); code != "" {
		fail(w, 400, code, "Неверный результат")
		return
	}
	id, err := a.store.AddRun(r.Context(), p.ID, Run{
		GameID: in.GameID, Ending: in.Ending, Difficulty: in.Difficulty, Choices: string(in.Choices),
		Stars: int(*in.Stars), Score: int(*in.Score), DurationSec: int(*in.DurationSec),
	})
	if err != nil {
		a.internal(w, "add run", err)
		return
	}
	writeJSON(w, 201, map[string]int64{"runId": id})
}

func gameFromQuery(w http.ResponseWriter, r *http.Request) (string, bool) {
	g := r.URL.Query().Get("gameId")
	if !knownGames[g] {
		fail(w, 404, "unknown_game", "Нет такой игры")
		return "", false
	}
	return g, true
}

func (a *API) leaderboard(w http.ResponseWriter, r *http.Request) {
	g, ok := gameFromQuery(w, r)
	if !ok {
		return
	}
	limit, ok := parseLimit(w, r)
	if !ok {
		return
	}
	rows, err := a.store.Leaderboard(r.Context(), g, limit)
	if err != nil {
		a.internal(w, "leaderboard", err)
		return
	}
	writeJSON(w, 200, rows)
}

func (a *API) stats(w http.ResponseWriter, r *http.Request) {
	g, ok := gameFromQuery(w, r)
	if !ok {
		return
	}
	st, err := a.store.Stats(r.Context(), g)
	if err != nil {
		a.internal(w, "stats", err)
		return
	}
	writeJSON(w, 200, st)
}
