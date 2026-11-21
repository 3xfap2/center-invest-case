// Command server is the ПрофНавигатор backend: players, saves, runs, leaderboard,
// and the built site with its games, all from one origin.
package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"
)

var version = "dev" // set at build time: -ldflags "-X main.version=…"

func env(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func envInt(key string, def int) int {
	if n, err := strconv.Atoi(os.Getenv(key)); err == nil && n > 0 {
		return n
	}
	return def
}

func main() {
	log := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	if err := run(log); err != nil {
		log.Error("server stopped", "err", err)
		os.Exit(1)
	}
}

func run(log *slog.Logger) error {
	cfg := Config{
		Version:       version,
		StaticDir:     env("STATIC_DIR", "../web/dist"),
		AllowedOrigin: os.Getenv("ALLOWED_ORIGIN"),
		TrustProxy:    os.Getenv("TRUST_PROXY") == "1",
		Reads:         envInt("RATE_READS", 60),
		Writes:        envInt("RATE_WRITES", 20),
	}
	store, err := OpenStore(env("DB_PATH", "data/profnav.db"))
	if err != nil {
		return err
	}
	defer store.Close()

	srv := &http.Server{
		Addr:              ":" + env("PORT", "8080"),
		Handler:           NewHandler(cfg, store, log),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
		MaxHeaderBytes:    16 << 10,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	errc := make(chan error, 1)
	go func() {
		log.Info("listening", "addr", srv.Addr, "static", cfg.StaticDir, "version", cfg.Version)
		errc <- srv.ListenAndServe()
	}()

	select {
	case err := <-errc:
		if !errors.Is(err, http.ErrServerClosed) {
			return err
		}
	case <-ctx.Done():
		log.Info("shutting down")
		shutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return srv.Shutdown(shutdown) // finishes requests in flight, then the deferred store.Close runs
	}
	return nil
}
