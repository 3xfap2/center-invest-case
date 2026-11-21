# One image: the games, the site and the Go server, served from one origin.
# docker build -t profnav . && docker run -p 8080:8080 -v profnav-data:/data profnav

# 1. Games and site
FROM node:24-alpine AS web
WORKDIR /repo
COPY games ./games
COPY web ./web
# Each game's build writes into web/public/games/<id>/ (docs/GAME_CONTRACT.md).
# A game whose finished build is already committed is used as is; only games without one are built here.
RUN for d in games/*/; do \
      id=$(basename "$d"); \
      if [ -f "web/public/games/$id/index.html" ]; then echo "using committed build of $id"; \
      elif [ -f "$d/package.json" ]; then echo "building $id" && (cd "$d" && npm ci && npm run build) || exit 1; fi; \
    done
RUN cd web && npm ci && npm run build

# 2. Server (pure Go, no CGO)
FROM golang:1.27 AS server
ARG VERSION=dev
WORKDIR /src
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server/ ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags "-s -w -X main.version=${VERSION}" -o /out/server . && mkdir -p /out/data

# 3. Small runtime image, no shell, non-root user
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=server /out/server /app/server
COPY --from=web /repo/web/dist /app/web
COPY --from=server --chown=65532:65532 /out/data /data
ENV STATIC_DIR=/app/web DB_PATH=/data/profnav.db PORT=8080
VOLUME /data
EXPOSE 8080
ENTRYPOINT ["/app/server"]
