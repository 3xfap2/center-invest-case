# ПрофНавигатор server

Go + SQLite. Serves the API (`/api/v1`, see [docs/API.md](../docs/API.md)) and the built site with its games.

## Run locally

```sh
cd web && npm run build          # the site, into web/dist
cd ../server && go run .         # http://localhost:8080 (site + API)
```

For development, run `npm run dev` in `web/` at the same time: Vite proxies `/api` to `:8080`.

On Windows with Smart App Control, Go can't run natively. Use Docker instead:

```sh
docker build -t profnav . && docker run -p 8080:8080 -v profnav-data:/data profnav
```

## Tests

```sh
make test         # go vet + go test -race
make docker-test  # the same inside Docker
```

## Settings (environment variables)

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `8080` | HTTP port |
| `DB_PATH` | `data/profnav.db` | SQLite file |
| `STATIC_DIR` | `../web/dist` | the built site to serve |
| `ALLOWED_ORIGIN` | — | dev only: a site on another origin that may call the API |
| `TRUST_PROXY` | — | `1` behind a proxy: take the client IP from `X-Forwarded-For` |
| `RATE_READS` / `RATE_WRITES` | `60` / `20` | requests per IP per minute |
