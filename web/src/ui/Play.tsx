import { useEffect, useRef, useState } from 'react';
import { postToGame, useGameHost } from '../bridge/useGameHost';
import type { Game } from '../games/catalog';
import { navigate } from '../router';
import { useStore } from '../state/store';
import { Link, SaveStatus, btnPrimary, btnSecondary } from './parts';

export function Play({ game }: { game: Game }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const muted = useStore((s) => s.muted);
  const toggleMute = useStore((s) => s.toggleMute);

  const { state, percent } = useGameHost(game.id, frame, {
    end: () => navigate(`/results/${game.id}`),
    exit: () => navigate('/games'),
    achievement: (id) => setToast(game.achievementName(id)),
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  function onMute() {
    toggleMute();
    postToGame(frame.current, { type: 'mute', muted: !muted });
    frame.current?.focus();
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-bg-deep">
      <header className="relative flex h-11 shrink-0 items-center gap-4 border-b border-line px-4">
        <Link to="/games" className="font-mono text-small text-text-2 no-underline hover:text-text" data-testid="back">
          ← К играм
        </Link>
        <span className="truncate font-display text-small uppercase tracking-wide text-text">{game.title}</span>
        <span className="ml-auto" />
        <SaveStatus />
        <button onClick={onMute} className="font-mono text-small text-text-2 hover:text-text" aria-pressed={muted} data-testid="mute">
          {muted ? 'звук выкл' : 'звук вкл'}
        </button>
        {percent !== null && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-line" aria-hidden>
            <span className="block h-full bg-ci-green transition-[width] duration-500" style={{ width: `${percent}%` }} />
          </span>
        )}
      </header>

      <div className="relative min-h-0 flex-1">
        <iframe
          ref={frame}
          src={`/games/${game.id}/${game.entry}`}
          title={game.title}
          allow="autoplay; fullscreen"
          onLoad={() => setLoaded(true)}
          className="size-full border-0 bg-bg-deep"
          data-testid="game-frame"
        />

        {!loaded && state !== 'stalled' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-deep">
            <span className="font-mono text-label uppercase tracking-[0.18em] text-ci-green">{game.profession}</span>
            <span className="font-display text-h1 font-bold uppercase">{game.title}</span>
            <span className="relative h-0.5 w-56 overflow-hidden bg-line">
              <span className="load-bar absolute inset-y-0 w-1/3 bg-ci-green" />
            </span>
          </div>
        )}

        {state === 'stalled' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-bg-deep/95 px-5 text-center" role="alert">
            <span className="font-display text-h2 font-bold uppercase">Игра не отвечает</span>
            <span className="max-w-md text-text-2">Прогресс сохранён. Попробуй загрузить игру ещё раз.</span>
            <div className="flex gap-3">
              <button className={btnPrimary} onClick={() => location.reload()}>
                Ещё раз
              </button>
              <Link to="/games" className={btnSecondary}>
                К играм
              </Link>
            </div>
          </div>
        )}

        {toast && (
          <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
            <div className="toast rounded-md border border-ci-green bg-surface px-5 py-3" role="status" data-testid="toast">
              <span className="font-mono text-caption uppercase tracking-widest text-ci-green">достижение</span>
              <span className="ml-3 font-display uppercase">{toast}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
