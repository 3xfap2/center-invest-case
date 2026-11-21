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
