package main

import (
	"io/fs"
	"net/http"
	"os"
	"path"
	"strings"
)

// staticHandler serves the built site (web/dist) and the game builds inside it (web/dist/games/<id>/).
//   - /assets/ and /games/<id>/assets/ have hashed names → cached for a year.
//   - everything else (index.html, game.json, …) → revalidated every time, so a new deploy shows at once.
//   - a site route like /play/glitch that is not a file → index.html (the React app handles it).
//   - /api and /games are never sent to index.html: a missing game file is a real 404.
func staticHandler(dir string) http.Handler {
	fsys := os.DirFS(dir)
	files := http.FileServerFS(fsys)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		p := strings.TrimPrefix(path.Clean("/"+r.URL.Path), "/")
		if p == "" {
			p = "index.html"
		}
		info, err := fs.Stat(fsys, p)
		if err == nil && info.IsDir() {
			// No directory listings: a folder without an index.html is treated as missing.
			// So /games (the site's game select page) reaches index.html, although web/dist/games/ exists.
			if _, ierr := fs.Stat(fsys, path.Join(p, "index.html")); ierr != nil {
				err = fs.ErrNotExist
			}
		}
		if err != nil {
			if strings.HasPrefix(p, "games/") || strings.HasPrefix(p, "api/") || path.Ext(p) != "" {
				http.NotFound(w, r)
				return
			}
			serveIndex(w, r, fsys)
			return
		}
		if strings.Contains("/"+p, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		// http.FileServer answers ".../index.html" with a 301 to ".../". Games are loaded as
		// /games/<id>/index.html, so ask for the folder instead and skip the extra round trip.
		if path.Base(p) == "index.html" {
			r = r.Clone(r.Context())
			r.URL.Path = "/" + strings.TrimSuffix(p, "index.html")
		}
		files.ServeHTTP(w, r)
	})
}

func serveIndex(w http.ResponseWriter, r *http.Request, fsys fs.FS) {
	b, err := fs.ReadFile(fsys, "index.html")
	if err != nil {
		http.Error(w, "site is not built: run npm run build in web/", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	if r.Method == http.MethodHead {
		return
	}
	_, _ = w.Write(b)
}
