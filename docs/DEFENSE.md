# Defence notes: short answers to jury questions

For the team, before the pitch. Each answer fits in about 20 seconds. The backend part is added by the server work.

## Site (`web/`)

### Architecture in one picture

```
Browser
├── Site (React SPA, web/)                    ← owns the player, saves, results
│   ├── Zustand store ── localStorage (Zod-checked)
│   ├── sync ── /api/v1 (Go server, optional)
│   └── /play/<id>: <iframe src="/games/<id>/index.html">
│                         │  postMessage, same origin, { ns: 1, type, … }
└── Game (Three.js, games/<id>/ → web/public/games/<id>/)
        └── ns-bridge.js: ready · save · flag · progress · achievement · end · exit
```

### Why an iframe and a bridge?
- **Two teams, two engines, one site.** Each game is a separate Vite build. An iframe keeps its code, CSS and WebGL context apart from the site and from the other game. One game crashing can't break the site.
- **One small contract** (`docs/GAME_CONTRACT.md`, 8 message types, a 20-line `ns-bridge.js`). A new profession game only has to follow it; the site doesn't change. That's how the platform grows.
- **Each game also runs alone** (`index.html` opened directly gets default values), so it can be tested without the site.

### How is the bridge kept safe?
- The site accepts a message only if: it comes from **our own origin**, from **this iframe's window**, has `ns: 1`, and **passes a Zod schema** for its type. Anything else is ignored.
- Limits: a save must have `"v": 1` and be ≤ 64 KB; stars 0–3; flag values are only strings, numbers, booleans; achievement ids must use the game's own prefix (`gl_`, `ci_`).
- Tested: the mock game sends broken messages and the Playwright test checks that nothing changes.

### How do saves work?
- **Local first.** Every `save`, `flag`, `progress`, `achievement` goes straight into a Zustand store persisted to `localStorage`.
- When the site loads a save, **Zod checks it**. A broken or edited save is removed, the player sees a notice, and the site starts fresh. It never crashes.
- **Flags are shared between games**, so a choice in one story can matter in another.
- **When the server is reachable** (`GET /api/v1/health`): the player is created once (nickname → token), saves are copied to the server 1.5 s after the last change, finished runs go to the leaderboard. A run made offline is sent later.
- **When the server is down**, everything still works. The status says «Сохранено на этом устройстве» instead of «Сохранено». Tested with the API aborted and with the API returning 503.

### What do we store about a player (a minor)?
- **Only a nickname** (2–20 characters, no real name needed), a random player id, the chosen difficulty and game progress.
- No email, phone, age, location or registration. The server token is a random string, not a password.

### Why no router library?
- Five routes. 30 lines with the History API (`src/router.ts`) instead of another dependency.

### How is it tested?
- **Unit (Vitest):** every bridge message (valid and invalid), save logic, broken/blocked storage, sync rules (offline, 400 vs 500, expired token), routes.
- **End-to-end (Playwright, production build):** a mock game in `web/public/games/mock/` presses every bridge button. Tests: `ready → init` with the right nickname and difficulty; a save survives a reload; `end` shows results; `exit` returns to the menu; bad messages are ignored; pause/resume on tab switch; API up, API down, API errors. **Every test fails on any console error.**

### Load time
- Site: about 107 KB JS gzipped + self-hosted fonts (no Google Fonts, no CDN). The game loads only when you press «Играть».

## Server (`server/`)

### Why Go?
- **One small binary** (about 15 MB) that serves the site, the games and the API. Starts in milliseconds, uses about 20 MB of memory.
- **Standard library only** for HTTP (`net/http` with Go 1.22 routing), `log/slog` for logs. The one dependency is the SQLite driver (`modernc.org/sqlite`, pure Go, no C compiler needed).
- Strong typing and `go test -race` catch concurrency bugs before the demo.

### Request flow

```
Browser ──► Go server :8080
             ├─ security headers (nosniff, frame-ancestors 'self', no-referrer)
             ├─ request log (method, path, status, ms; never nickname, token or IP)
             ├─ /api/v1/* ─► rate limit per IP (60 reads, 20 writes / min)
             │                ├─ Bearer token ─► SHA-256 ─► players.token_hash (constant-time compare)
             │                ├─ validate input (nickname, gameId, stars, sizes)
             │                └─ SQLite (WAL) ─► JSON
             └─ everything else ─► web/dist: /assets cached 1 year, pages no-cache,
                                    site routes → index.html, missing /games/* → 404
```

### What do we store about minors?
- **A nickname only** (2–20 characters, bad-word filter), a random player id, and the SHA-256 hash of the token. No email, phone, age, real name. No IP address with player records or in logs.
- If the database leaks, the tokens can't be used: only hashes are stored.
- One table each: `players`, `saves`, `runs`. Deleting a player deletes their saves and runs (`ON DELETE CASCADE`).

### How is cheating on the leaderboard limited?
- Every value is checked: stars 0–3, score 0–1 000 000 (whole numbers), duration 30 s – 6 h, known games and difficulties only.
- **One row per player** in the table: their best run, so one player can't fill it.
- Rate limits stop scripts that create many players or send many runs.
- Honest limit: the game runs in the player's browser, so a determined player can still send a fake but plausible result. For a school leaderboard that is acceptable; the next step would be signed results checked against the save.

### What if the server is down?
- The site works fully without it: saves stay in the browser, the status says «Сохранено на этом устройстве», finished runs are sent later. Tested in Playwright with the API aborted and returning 503.

### How does it scale?
- Today: one container, SQLite in WAL mode. Thousands of players a day is fine for this.
- Next: the store is one file (`store.go`) behind plain methods, so moving to PostgreSQL is a change in one place. The static site can move to a CDN. With several server instances, the rate limiter moves to Redis or the load balancer.

### How is it tested?
- `go test -race`: table tests with `httptest` for every endpoint: success, bad input, missing or wrong token, too-large body (413), rate limit (429), one-best-run leaderboard, stats, static files (cache headers, SPA fallback, no directory listing, no path traversal), migrations run twice safely. About 77 % statement coverage.
- `go vet` and `gofmt` in CI (GitHub Actions) on every pull request, next to the site's unit and Playwright tests.
- A real end-to-end smoke test: the Docker image, the real site, the mock game, the real API: save → «Сохранено» → end → the player appears in the leaderboard.

### "Saves in the browser are a bad idea." What do we do?
- The browser copy is only the **offline fallback**. Whenever the server is reachable, every save, finished run and achievement also goes to the server's SQLite database.
- **Optional password:** after playing, a player can protect their nickname with a password and then log in from any device. Their saves, flags and achievements are restored from the server.
- **Why optional:** the case requires «без регистрации (можно ник)». A teen starts with a nickname in seconds; the password is an extra they choose, not a gate.
- **What we store:** nickname, a bcrypt hash of the password (never the password itself), session token hashes (one per device). No email, phone, age or IP.
- **Attacks we handle:** password guessing (bcrypt + 10 login attempts per IP per minute), finding out which nicknames have accounts (nicknames are public on the leaderboard, but the same answer and the same timing for "no password on this nickname" and "wrong password"), a stolen database (only hashes), one device logging out the others (separate sessions).

### Achievements leaderboard
- Games report achievements through the bridge; the site checks the game's prefix and sends them to `POST /api/v1/achievements` (repeats are ignored).
- `GET /api/v1/leaderboard/achievements` ranks players by the number of achievements across all games; ties go to whoever reached the number first. The test game doesn't count.

### "Who is the user, if there's no registration?"
- **The nickname is the identity, and it's unique.** The database refuses a nickname that already exists (case-insensitive, «ё» = «е»), and the start screen shows «свободен» / «занят» while typing.
- **Coming back is automatic on the same device:** the browser keeps a random session token, so closing the browser or turning off the computer doesn't lose the player.
- **Why not "type the nickname on any computer and you're in"?** Then any classmate could type your nickname and play as you. For another device there's the optional password; without it, the nickname only works where it was created.
