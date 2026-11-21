# API v1

The contract between the site (`web/`) and the Go server (`server/`). Changes need the team's agreement in a pull request.

- **One origin in production:** the Go server serves the built site (`web/dist`, including `web/dist/games/*`) and the API under `/api/v1`. No CORS.
- **Development:** the Vite dev server proxies `/api` to `http://localhost:8080`.
- JSON everywhere. Errors: `{"error":{"code":"…","message":"…"}}` with status 400 / 401 / 404 / 405 / 413 / 429 / 500.
- **No personal data:** a nickname only. No email, phone or IP stored with player records.
- **Auth:** `POST /players` returns a random token (32 bytes, base64url). The server stores only its SHA-256 hash. The client sends `Authorization: Bearer <token>`.
- **Known games:** `glitch`, `chuzhoe-imya`, `mock`. Any other `gameId` → 404.
- **Times** are RFC 3339 strings in UTC.

| Method | Path | Body / query | Response |
|---|---|---|---|
| POST | `/api/v1/players` | `{ "nickname": "Аня_15" }` | `201 { "playerId", "token", "nickname" }` |
| GET | `/api/v1/players/me` | Bearer | `200 { "playerId", "nickname", "createdAt" }` |
| GET | `/api/v1/saves/{gameId}` | Bearer | `200 { "data", "flags", "updatedAt" }` or `404` |
| PUT | `/api/v1/saves/{gameId}` | Bearer; `{ "data": {…} \| null, "flags": {…} }` | `200 { "updatedAt" }` |
| POST | `/api/v1/runs` | Bearer; `{ "gameId", "ending", "stars", "score", "durationSec", "difficulty", "choices": [] }` | `201 { "runId" }` |
| GET | `/api/v1/leaderboard` | `?gameId=glitch&limit=20` | `200 [ { "nickname", "score", "stars", "ending", "durationSec", "at" } ]` |
| GET | `/api/v1/stats` | `?gameId=…` | `200 { "runs", "endings": { "<ending>": n }, "avgDurationSec" }` |
| GET | `/api/v1/health` | — | `200 { "ok": true, "version" }` |

## Validation

| Field | Rule |
|---|---|
| `nickname` | 2–20 characters after trimming: letters (any alphabet, incl. Cyrillic), digits, space, `_`, `-`. A basic bad-word filter. |
| request body | at most 80 KB (a 64 KB save plus its flags); larger → 413 |
| save `data` | a JSON object with `"v": 1`, or `null`; at most 64 KB |
| save `flags` | an object, at most 200 keys; key 1–64 of `A-Z a-z 0-9 _ . : -`; value string (≤ 200), number, boolean or null |
| `ending` | 1–64 of `A-Z a-z 0-9 _ -` |
| `stars` | integer 0–3 |
| `score` | integer 0–1 000 000 |
| `durationSec` | 30–21 600 (a chapter can't be finished in under 30 s) |
| `difficulty` | `easy`, `normal` or `hard` |
| `choices` | an array, at most 200 items, at most 16 KB |
| `limit` | 1–50, default 20 |

## Leaderboard

One row per player per game: their best run (highest score, then shortest time). Ties: the earlier run first.

## Rate limits

Per IP address, per minute: 60 reads (`GET`) and 20 writes (`POST`, `PUT`). Over the limit → 429 with a `Retry-After` header.

## Optional accounts and achievements (v1.1)

Playing never needs a password: a nickname is enough. A player **may** later protect their progress with a password; the nickname then becomes their login (case-insensitive, «ё» = «е»), so the same progress opens on another device. Each device has its own session token.

| Method | Path | Body / query | Response |
|---|---|---|---|
| POST | `/api/v1/players/me/password` | Bearer; `{ "password" }` (6–64 characters) | `200 { "hasPassword": true }`; `409 nickname_taken` if another account has this nickname |
| POST | `/api/v1/login` | `{ "nickname", "password" }` | `200 { "playerId", "token", "nickname", "hasPassword": true }`; `401 bad_login` (same answer for a wrong nickname or password) |
| POST | `/api/v1/logout` | Bearer | `204`; ends this device's session only |
| GET | `/api/v1/saves` | Bearer | `200 { "<gameId>": { "data", "flags", "updatedAt" } }`: all saves, to restore after a login |
| POST | `/api/v1/achievements` | Bearer; `{ "items": [ { "gameId", "id" } ] }` (1–200; `id` must use the game's prefix) | `200 { "added": n }`; repeats are ignored |
| GET | `/api/v1/achievements/me` | Bearer | `200 [ { "gameId", "id" } ]` |
| GET | `/api/v1/leaderboard/achievements` | `?limit=20` (max 50) | `200 [ { "nickname", "achievements", "games", "lastAt" } ]`: players by number of achievements; ties go to whoever got there first; the test game doesn't count |

`GET /api/v1/players/me` also returns `"hasPassword"`. Known games now include `kompas` and `dym`.

**Passwords:** stored only as bcrypt hashes (cost 10). Login has its own rate limit: 10 attempts per IP per minute. A login for a nickname that doesn't exist takes as long as a wrong password, so the timing doesn't reveal which nicknames have accounts.

## Unique nicknames (v1.2)

- **Every nickname is unique**, case-insensitive, «ё» = «е». `POST /api/v1/players` answers `409 nickname_taken` for a nickname that's already registered.
- `GET /api/v1/players/check?nickname=…` → `200 { "valid": bool, "available": bool }`: the start screen uses it to say «свободен» or «занят» while the player types.
- **Coming back on the same device** needs nothing: the browser keeps the session token after the browser is closed or the computer is turned off.
- **Another device:** the nickname alone isn't enough (otherwise anyone could play as anyone); the player logs in with the optional password.
- Upgrading an older database: duplicate nicknames are renamed (the password account, then the oldest player, keeps the nickname; others get «-2», «-3»…).

## Secret login key (v1.3)

Every player gets a **secret login key** when the nickname is registered: 12 characters in three groups, like `K7MX-2QPA-9RTD`. The nickname is public (leaderboards); the key is not. With the key alone, the player signs in on any device.

| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/api/v1/players` | `{ "nickname" }` | `201` now also returns `"key"` (shown to the player once by the server; the site keeps it on this device) |
| POST | `/api/v1/login/key` | `{ "key" }` | `200 { "playerId", "token", "nickname", "hasPassword", "key" }`; `401 bad_key` |
| POST | `/api/v1/players/me/key` | Bearer | `200 { "key" }`: a new key for a lost one; the old key stops working |

- **Alphabet:** `23456789ABCDEFGHJKMNPQRSTUVWXYZ` (no 0/O, 1/I/L, so a handwritten key can't be misread). 31¹² ≈ 2⁵⁹ keys.
- **Typing is forgiving:** any case, spaces or dashes, and Russian look-alike letters (А, В, Е, К, М, Н, Р, С, Т, У, Х) are accepted.
- **Stored as a SHA-256 hash** with a unique index. Key login shares the login rate limit (10 attempts per IP per minute).
