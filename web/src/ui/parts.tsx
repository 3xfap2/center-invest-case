import type { ReactNode } from 'react';
import { useSync } from '../api/sync';
import type { Difficulty } from '../bridge/messages';
import { navigate } from '../router';
import { useStore } from '../state/store';

export const DIFFICULTY: Record<Difficulty, { label: string; note: string }> = {
  easy: { label: 'Лёгкий', note: 'больше времени и подсказки' },
  normal: { label: 'Обычный', note: 'как задумано авторами' },
  hard: { label: 'Сложный', note: 'меньше времени, без подсказок' },
};

/** An <a> that routes inside the site without a page reload. */
export function Link({ to, className, children, ...rest }: { to: string; className?: string; children: ReactNode; 'data-testid'?: string }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export const btnPrimary =
  'cta inline-flex items-center justify-center gap-2 rounded-md bg-ci-green px-6 py-3 font-display text-lead font-semibold uppercase tracking-wide text-on-accent no-underline hover:text-on-accent';
export const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-5 py-3 font-display text-body uppercase tracking-wide text-text no-underline transition-colors hover:border-text hover:text-text';

export function Wordmark() {
  return (
    <Link to="/" className="font-display text-lead font-bold uppercase tracking-[0.08em] text-text no-underline hover:text-text">
      Проф<span className="text-ci-green">/</span>Навигатор
    </Link>
  );
}

export function TopBar() {
  const player = useStore((s) => s.player);
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-12">
      <Wordmark />
      {player ? (
        <Link to="/start" className="font-mono text-small text-text-2 no-underline hover:text-text" data-testid="player-chip">
          {player.nickname} · {DIFFICULTY[player.difficulty].label.toLowerCase()}
        </Link>
      ) : (
        <span className="hidden font-mono text-caption uppercase tracking-wider text-muted sm:inline">кейс «Центр-инвест» · Cyber Garden School 2026</span>
      )}
    </header>
  );
}

export function SaveStatus() {
  const { status, lastSaved } = useSync();
  if (!lastSaved) return null;
  const server = status === 'online' && lastSaved === 'server';
  return (
    <span className="inline-flex items-center gap-2 font-mono text-caption text-muted" data-testid="save-status">
      <span className={`size-1.5 rounded-full ${server ? 'bg-ci-green' : 'bg-ai'}`} aria-hidden />
      {server ? 'Сохранено' : 'Сохранено на этом устройстве'}
    </span>
  );
}

export function Notice() {
  const notice = useStore((s) => s.notice);
  const dismiss = useStore((s) => s.dismissNotice);
  if (!notice) return null;
  return (
    <div role="status" className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-4 bg-ai px-4 py-2 text-small text-on-accent">
      {notice}
      <button onClick={dismiss} className="rounded-sm border border-on-accent/40 px-2 py-0.5 font-mono text-caption">
        понятно
      </button>
    </div>
  );
}

export function Stars({ n, animate = false }: { n: number; animate?: boolean }) {
  return (
    <span aria-label={`${n} из 3 звёзд`} className="font-display tracking-[0.15em]">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`${animate ? 'star-in' : ''} ${i < n ? 'text-ai' : 'text-line-strong'}`} style={{ animationDelay: `${0.15 + i * 0.18}s` }}>
          ★
        </span>
      ))}
    </span>
  );
}

export const fmtTime = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, '0')}`;
