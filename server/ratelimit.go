package main

import (
	"net"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Limiter is a fixed-window counter per IP and per kind (read / write). Small and good enough
// for one instance; with several instances this would move to Redis or the load balancer.
type Limiter struct {
	mu     sync.Mutex
	window time.Duration
	limits map[string]int // kind → requests per window
	hits   map[string]*bucket
	clock  func() time.Time
}

type bucket struct {
	start time.Time
	n     int
}

func NewLimiter(reads, writes int, window time.Duration) *Limiter {
	return &Limiter{window: window, limits: map[string]int{"read": reads, "write": writes}, hits: map[string]*bucket{}, clock: time.Now}
}

// Allow reports whether the request may go on, and if not, how long to wait.
func (l *Limiter) Allow(ip, kind string) (bool, time.Duration) {
	l.mu.Lock()
	defer l.mu.Unlock()
	t := l.clock()
	key := kind + "|" + ip
	b := l.hits[key]
	if b == nil || t.Sub(b.start) >= l.window {
		if len(l.hits) > 100_000 { // forget old windows so memory stays bounded
			for k, v := range l.hits {
				if t.Sub(v.start) >= l.window {
					delete(l.hits, k)
				}
			}
		}
		b = &bucket{start: t}
		l.hits[key] = b
	}
	if b.n >= l.limits[kind] {
		return false, b.start.Add(l.window).Sub(t)
	}
	b.n++
	return true, 0
}

// clientIP uses X-Forwarded-For only when the server sits behind a trusted proxy (TRUST_PROXY=1).
func clientIP(r *http.Request, trustProxy bool) string {
	if trustProxy {
		if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
			return strings.TrimSpace(strings.Split(xff, ",")[0])
		}
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
