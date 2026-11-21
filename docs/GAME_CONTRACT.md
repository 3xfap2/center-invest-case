# Game Contract (both games)

How a game plugs into the site. Both games follow it exactly. Changes need the team's agreement, proposed in a pull request.

| Game | id | Folder | Achievement prefix | Flags listed in |
|---|---|---|---|---|
| GLITCH: Последний билд | `glitch` | `games/glitch/` | `gl_` | `games/glitch/docs/FLAGS.md` |
| Чужое имя | `chuzhoe-imya` | `games/chuzhoe-imya/` | `ci_` | `games/chuzhoe-imya/docs/FLAGS.md` |

## 1. Folders and build

- Source: `games/<id>/`, with its own `package.json`.
- `npm run build` writes to `web/public/games/<id>/`, entry `index.html`. Build output is not committed (see `.gitignore`).
- `games/<id>/game.json`:

```json
{ "id": "<id>", "title": "…", "profession": "…", "version": "0.1.0", "entry": "index.html",
  "approxSizeMB": 12, "minutes": 20, "controls": "WASD + мышь, E — действие", "credits": "CREDITS.md" }
```

## 2. How it runs

- In an `<iframe>` on the same origin as the site.
- Also **standalone**: opening `index.html` directly works with default values, for development and tests.
- Chapters (if any) are handled inside the game. The save says where the player is.

## 3. The bridge

Use `games/shared/ns-bridge.js` (copy it into the build, don't change it). Messages are `{ ns: 1, type, ...payload }` via `window.parent.postMessage`.

| Direction | type | payload | when |
|---|---|---|---|
| game → site | `ready` | `{ gameId, version }` | loaded and able to start |
| site → game | `init` | `{ playerId, nickname, difficulty: "easy"\|"normal"\|"hard", save: object\|null, flags: object, muted: boolean }` | after `ready` |
| game → site | `save` | `{ data }` (≤ 64 KB JSON with `"v": 1`) | at every checkpoint |
| game → site | `flag` | `{ key, value }` | important choices a later chapter reacts to |
| game → site | `progress` | `{ step, percent }` | at each story beat |
| game → site | `achievement` | `{ id }` | with the game's prefix |
| game → site | `end` | `{ ending, stars: 0–3, score, durationSec, choices: [] }` | the chapter is finished |
| game → site | `exit` | `{}` | the player chose «Выйти в меню» |
| site → game | `pause` / `resume` / `mute` | `{}` / `{}` / `{ muted }` | tab hidden, menu opened, sound toggled |

The game never calls the backend directly. The site saves: in the browser always, on the server when it's available.

## 4. Platform consistency (the same in both games)

- **Difficulty:** `easy` = more time + hints, `normal`, `hard` = less time, no hints. It changes real gameplay numbers.
- **Pause menu on `Esc`:** «Продолжить», «Звук», «Выйти в меню» (sends `exit`).
- **Loading screen:** game title, profession, progress bar. Interactive in ≤ 5 s on a normal laptop.
- **Final screen:**
  1. what happened to each character;
  2. a career card from `content/career.json`: what the professional really does, the skills used, where to study in the Rostov region, sources (links). Only facts with a real, current source.
- **Text:** Russian, short lines for ages 12–15; no profanity or gore; fictional people and companies; no long dash «—».
- **Testing:** `?debug=1` debug menu (jump to scenes, reach any ending); zero browser console errors; `npm run build` and `npm test` pass before every pull request.
