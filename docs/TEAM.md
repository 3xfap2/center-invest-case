# Team status

Updated at each check-in: 18:00, 21:00, 09:00, 12:00. Code freeze 14:00 on 22 Nov, presentations 15:30.

| Area | Owner | Doing now | Done | Blocked by |
|---|---|---|---|---|
| GLITCH (`games/glitch`) | friend's Claude Code | | | |
| Чужое имя (`games/chuzhoe-imya`) | Codex | | | |
| Site + save + backend (`web`, `server`) | Claude | waiting for PR review, then integration of real game builds | site shell: landing, start, game select, iframe host + bridge, local saves + API sync, results, mock game; 40 unit + 11 e2e tests; Go server (players, saves, runs, leaderboard, stats), Docker image, CI | real game builds for integration |
| Presentation | — | not started | | |

## Rules

- `git pull` on `main` first. Work on your own branch (`claude/...`, `codex/...`) and merge through a pull request.
- Don't edit another game's folder.
- No secrets in the repo.
