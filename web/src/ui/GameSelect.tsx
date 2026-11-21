import { publicGames } from '../games/catalog';
import { isDev, navigate } from '../router';
import { useStore } from '../state/store';
import { Scene } from './Scene';
import { useSync } from '../api/sync';
import { AchievementBoard } from './AchievementBoard';
import { GameTitle, Link, PlayIcon, TopBar } from './parts';

export function GameSelect() {
  const games = publicGames(isDev());
  const saves = useStore((s) => s.games);
  const resetGame = useStore((s) => s.resetGame);
  const hasPassword = useStore((s) => s.player?.hasPassword ?? false);
  const online = useSync((s) => s.status === 'online');

  return (
    <div className="pn-screen" style={{ position: 'relative' }}>
      <div className="pn-grid-bg" aria-hidden="true" />
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 28, paddingBottom: 72 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px 32px', flexWrap: 'wrap', marginBottom: 36 }}>
          <div>
            <p className="pn-label pn-label--acc" style={{ marginBottom: 14 }}>
              Фильмотека
            </p>
            <h1 className="pn-h1">Выбери профессию</h1>
          </div>
          <p className="pn-hint" style={{ maxWidth: '38ch' }}>
            Одна профессия, одна полная глава. Начатая игра продолжится с того же места.
          </p>
        </div>

        {!hasPassword && online && (
          <div className="pn-empty-note" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px 24px', flexWrap: 'wrap', marginBottom: 28 }} data-testid="protect-nudge">
            <span>Прогресс привязан к этому браузеру. Защити ник паролем, чтобы играть с любого устройства.</span>
            <Link to="/account" className="pn-btn pn-btn--ghost pn-btn--sm">
              Защитить
            </Link>
          </div>
        )}
        <div className="pn-select-grid">
          {games.map((g) => {
            const save = saves[g.id];
            const started = g.available && !!save?.data;
            const percent = Math.round(save?.progress?.percent ?? 0);
            const ach = save?.achievements.length ?? 0;
            return (
              <article
                key={g.id}
                className={`pn-game ${g.available ? '' : 'is-soon'}`}
                style={{ '--p-acc': g.accent, '--accent': g.accent } as React.CSSProperties}
                aria-label={g.title}
                data-testid={`select-${g.id}`}
              >
                <div className="pn-game-art">
                  <span className="pn-poster-art">
                    <Scene id={g.scene} />
                  </span>
                  <span className="pn-poster-shade" />
                  <div className="pn-game-over">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <span className="pn-tag">{g.prof}</span>
                      <span className="pn-tag" style={{ color: !g.available ? 'var(--pn-text-3)' : ach > 0 ? g.accent : 'var(--pn-text-2)' }}>
                        {g.available ? `достижений: ${ach}` : 'скоро'}
                      </span>
                    </div>
                    <h2 className="pn-game-title">
                      <GameTitle game={g} subSize="0.4em" />
                    </h2>
                  </div>
                </div>
                <div className="pn-game-body">
                  <p style={{ margin: 0, color: 'var(--pn-text-2)', fontSize: 17, lineHeight: 1.45 }}>{g.hook}</p>
                  <ul className="pn-meta">
                    <li>{g.minutes} мин</li>
                    <li>{g.controls}</li>
                  </ul>
                  {started && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span className="pn-label pn-label--text">пройдено {percent}%</span>
                      <div className="pn-bar" role="progressbar" aria-label="Прогресс главы" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                        <span style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="pn-actions">
                    {!g.available ? (
                      <>
                        <button className="pn-btn" type="button" disabled>
                          скоро
                        </button>
                        <span className="pn-hint">Глава в работе.</span>
                      </>
                    ) : started ? (
                      <>
                        <button className="pn-btn pn-btn--accent" type="button" onClick={() => navigate(`/play/${g.id}`)}>
                          Продолжить <span className="pn-arrow" aria-hidden="true">→</span>
                        </button>
                        <button
                          className="pn-btn pn-btn--ghost"
                          type="button"
                          onClick={() => {
                            resetGame(g.id);
                            navigate(`/play/${g.id}`);
                          }}
                        >
                          Начать заново
                        </button>
                      </>
                    ) : (
                      <button className="pn-btn pn-btn--accent" type="button" onClick={() => navigate(`/play/${g.id}`)}>
                        <PlayIcon size={14} />
                        Играть
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div style={{ marginTop: 56 }}>
          <AchievementBoard />
        </div>
      </main>
    </div>
  );
}
