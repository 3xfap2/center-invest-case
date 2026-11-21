import { useEffect, useRef, useState } from 'react';
import { postToGame, useGameHost } from '../bridge/useGameHost';
import type { Game } from '../games/catalog';
import { navigate } from '../router';
import { useStore } from '../state/store';
import { Scene } from './Scene';
import { Badge, GameTitle, Link, SaveStatus } from './parts';

const TOAST_MS = 3200;

export function Play({ game }: { game: Game }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState<{ label: string; name: string; n: number } | null>(null);
  // A finished chapter is recorded at once, but the player stays in the game: games with several chapters
  // (or content after the ending) continue on their own. The results open from the bar or on leaving the game.
  const [ended, setEnded] = useState(false);
  const endedRef = useRef(false);
  const muted = useStore((s) => s.muted);
  const toggleMute = useStore((s) => s.toggleMute);
  const results = `/results/${game.id}`;

  const { state, percent } = useGameHost(game.id, frame, {
    end: (run) => {
      endedRef.current = true;
      setEnded(true);
      setToast((t) => ({ label: 'глава пройдена', name: `${'★'.repeat(run.stars)}${'☆'.repeat(3 - run.stars)} · ${game.endingName(run.ending)}`, n: (t?.n ?? 0) + 1 }));
    },
    exit: () => navigate(endedRef.current ? results : '/games'),
    achievement: (id) => setToast((t) => ({ label: 'достижение', name: game.achievementName(id), n: (t?.n ?? 0) + 1 })),
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), TOAST_MS);
    return () => clearTimeout(t);
  }, [toast]);

  function onMute() {
    toggleMute();
    postToGame(frame.current, { type: 'mute', muted: !muted });
    frame.current?.focus();
  }

  return (
    <div className="pn-play pn-play-fixed" style={{ '--accent': game.accent } as React.CSSProperties} data-host-state={state} data-testid="game-host">
      <iframe
        ref={frame}
        src={`/games/${game.id}/${game.entry}`}
        title={game.title}
        allow="autoplay; fullscreen"
        onLoad={() => setLoaded(true)}
        className="pn-frame"
        data-testid="game-frame"
      />

      <header className="pn-gamebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <Link to="/games" className="pn-gamebar-btn" data-testid="back">
            <span aria-hidden="true">←</span> К играм
          </Link>
          <span aria-hidden="true" style={{ width: 1, height: 20, background: 'var(--pn-line)' }} />
          <span style={{ padding: '0 12px', font: "700 17px/1 var(--pn-font-display)", fontStretch: '85%', color: 'var(--pn-text)', whiteSpace: 'nowrap' }}>
            <GameTitle game={game} sub={false} />
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {ended && (
            <Link to={results} className="pn-btn pn-btn--accent pn-btn--sm" data-testid="results-link">
              Итоги главы <span className="pn-arrow" aria-hidden="true">→</span>
            </Link>
          )}
          <SaveStatus />
          <button className="pn-gamebar-btn" type="button" aria-pressed={!muted} onClick={onMute} data-testid="mute">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2.5 6.5h3l4-3.5v12l-4-3.5h-3z" fill="currentColor" />
              {muted ? (
                <path d="M12.2 6.5l4 5M16.2 6.5l-4 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M12 6.2a4 4 0 0 1 0 5.6M14.2 4a7 7 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
            {muted ? 'звук выкл' : 'звук вкл'}
          </button>
        </div>
        {percent !== null && (
          <>
            <div className="pn-progress">
              <span style={{ width: `${percent}%` }} />
            </div>
            <span className="sr-only">Пройдено {Math.round(percent)}%</span>
          </>
        )}
      </header>

      {!loaded && state !== 'stalled' && (
        <div className="pn-overlay pn-overlay--solid">
          <div className="pn-scene-stack" aria-hidden="true" style={{ opacity: 0.35 }}>
            <div className="pn-scene-layer is-active">
              <div className="pn-kb">
                <Scene id={game.scene} />
              </div>
            </div>
            <div className="pn-scrim pn-scrim--soft" />
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center', padding: '0 24px' }}>
            <p className="pn-label pn-label--acc">{game.profession}</p>
            <p className="pn-hero-title" style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}>
              <GameTitle game={game} sub={false} />
            </p>
            <div className="pn-loadbar" role="progressbar" aria-label="Загрузка игры" style={{ marginTop: 10 }}>
              <span />
            </div>
            <p className="pn-hint">Загружаем главу</p>
          </div>
        </div>
      )}

      {state === 'stalled' && (
        <div className="pn-overlay">
          <div className="pn-dialog" role="alertdialog" aria-labelledby="err-h" aria-describedby="err-t">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
              <rect x="3" y="7" width="38" height="26" rx="4" fill="none" stroke="#F2B544" strokeWidth="2.2" />
              <path d="M15 39h14M22 33v6" stroke="#F2B544" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M17 15l10 10M27 15L17 25" stroke="#F2B544" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <h2 id="err-h" className="pn-h2" style={{ fontSize: 32, marginTop: 6 }}>
              Игра не отвечает
            </h2>
            <p id="err-t" style={{ margin: 0, color: 'var(--pn-text-2)', fontSize: 17 }}>
              Прогресс сохранён. Попробуй загрузить игру ещё раз.
            </p>
            <div className="pn-actions" style={{ marginTop: 12 }}>
              <button className="pn-btn pn-btn--accent" type="button" onClick={() => location.reload()}>
                Ещё раз
              </button>
              <Link to="/games" className="pn-btn pn-btn--ghost">
                К играм
              </Link>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="pn-toast" role="status" key={toast.n} data-testid="toast">
          <Badge />
          <div>
            <p className="pn-label pn-label--acc">{toast.label}</p>
            <p style={{ margin: '3px 0 0', fontSize: 16, fontWeight: 600, color: 'var(--pn-text)' }}>{toast.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
