import { useSyncExternalStore } from 'react';

/** A five-route site doesn't need a router library: the History API and one hook are enough. */

const listeners = new Set<() => void>();
const subscribe = (f: () => void) => {
  listeners.add(f);
  window.addEventListener('popstate', f);
  return () => {
    listeners.delete(f);
    window.removeEventListener('popstate', f);
  };
};
const snapshot = () => location.pathname + location.search;

const LEAVE_MS = 160;
let leaving: ReturnType<typeof setTimeout> | null = null;
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function go(to: string, replace: boolean) {
  history[replace ? 'replaceState' : 'pushState'](null, '', to);
  window.scrollTo({ top: 0, behavior: 'instant' });
  listeners.forEach((f) => f());
}

/** Changes the page. A user navigation first fades the old page out (160 ms); redirects (replace) are instant. */
export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (to === snapshot()) return;
  if (leaving) clearTimeout(leaving);
  if (opts.replace || reducedMotion()) {
    document.documentElement.removeAttribute('data-leaving');
    go(to, !!opts.replace);
    return;
  }
  document.documentElement.setAttribute('data-leaving', '');
  leaving = setTimeout(() => {
    leaving = null;
    go(to, false);
    document.documentElement.removeAttribute('data-leaving');
  }, LEAVE_MS);
}

export type Route =
  | { name: 'landing' }
  | { name: 'start'; game: string | null }
  | { name: 'games' }
  | { name: 'play'; id: string }
  | { name: 'results'; id: string }
  | { name: 'notFound' };

export function parseRoute(pathname: string, search: string): Route {
  const q = new URLSearchParams(search);
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts.length === 0) return { name: 'landing' };
  if (parts[0] === 'start' && parts.length === 1) return { name: 'start', game: q.get('game') };
  if (parts[0] === 'games' && parts.length === 1) return { name: 'games' };
  if (parts[0] === 'play' && parts.length === 2) return { name: 'play', id: parts[1] };
  if (parts[0] === 'results' && parts.length === 2) return { name: 'results', id: parts[1] };
  return { name: 'notFound' };
}

export function useRoute(): Route {
  const s = useSyncExternalStore(subscribe, snapshot);
  const i = s.indexOf('?');
  return parseRoute(i < 0 ? s : s.slice(0, i), i < 0 ? '' : s.slice(i));
}

/** ?dev=1 shows the mock game. It sticks for the session so it survives navigation. */
export function isDev(): boolean {
  try {
    if (new URLSearchParams(location.search).get('dev') === '1') sessionStorage.setItem('profnav-dev', '1');
    return sessionStorage.getItem('profnav-dev') === '1';
  } catch {
    return false;
  }
}
