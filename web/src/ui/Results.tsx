import { useEffect, useState } from 'react';
import { api, type LeaderRow } from '../api/client';
import { useSync } from '../api/sync';
import type { Game } from '../games/catalog';
import { navigate } from '../router';
import { lastRun } from '../state/logic';
import { useStore } from '../state/store';
import { Badge, DIFFICULTY, Link, Stars, TopBar, fmtNum, fmtTime } from './parts';
import { EmptyState } from './NotFound';

export function Results({ game }: { game: Game }) {
  const run = useStore((s) => lastRun(s, game.id));
  const owned = useStore((s) => s.games[game.id]?.achievements ?? []);
  const resetGame = useStore((s) => s.resetGame);
  const nickname = useStore((s) => s.player?.nickname);
  const online = useSync((s) => s.status === 'online');
  const [board, setBoard] = useState<LeaderRow[] | null>(null);

  useEffect(() => {
    if (!online) return;
    let live = true;
    // Give the run a moment to reach the server first.
    const t = setTimeout(() => {
      api.leaderboard(game.id, 10).then((rows) => live && setBoard(rows)).catch(() => live && setBoard(null));
    }, 600);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [online, game.id]);

  if (!run) {
    return (
      <EmptyState
        icon="stars"
        title="Здесь пока пусто"
        text="Пройди любую главу, и итоги появятся здесь."
        action={
          <Link to="/games" className="pn-btn pn-btn--green pn-btn--lg">
            К играм <span className="pn-arrow" aria-hidden="true">→</span>
          </Link>
        }
      />
    );
  }

  return (
    <div className="pn-screen" style={{ position: 'relative' }}>
      <TopBar />
      <main className="pn-wrap" style={{ position: 'relative', zIndex: 2, paddingTop: 64, paddingBottom: 88 }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 72 }} data-testid="results">
          <p className="pn-label pn-label--acc">{game.title} · глава пройдена</p>
          <h1 className="pn-ending" data-testid="ending">
            {game.endingName(run.ending)}
          </h1>
          <Stars n={run.stars} />
          <dl className="pn-facts">
            {[
              ['время', fmtTime(run.durationSec)],
              ['очки', fmtNum(run.score)],
              ['сложность', DIFFICULTY[run.difficulty].label.toLowerCase()],
            ].map(([k, v]) => (
              <div key={k} className="pn-fact">
                <dt className="pn-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="pn-actions" style={{ marginTop: 10 }}>
            <button
              className="pn-btn pn-btn--accent pn-btn--lg"
              type="button"
              onClick={() => {
                resetGame(game.id);
                navigate(`/play/${game.id}`);
              }}
            >
              Сыграть ещё
            </button>
            <Link to="/games" className="pn-btn pn-btn--ghost pn-btn--lg">
              Другая игра
            </Link>
          </div>
        </section>

        <div className="pn-results-grid">
          <section aria-labelledby="ach-h" data-testid="achievements">
            <h2 id="ach-h" className="pn-h2" style={{ fontSize: 28, marginBottom: 18 }}>
              Достижения
            </h2>
            {owned.length === 0 ? (
              <p className="pn-empty-note" style={{ margin: 0 }}>
                Пока ни одного. В следующий раз попробуй другие решения.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {owned.map((a) => {
                  const fresh = run.earned.includes(a);
                  return (
                    <li key={a} className="pn-ach">
                      <Badge color={fresh ? 'var(--accent)' : 'var(--pn-green)'} />
                      <p style={{ margin: 0, fontWeight: 600, color: 'var(--pn-text)', minWidth: 0 }}>{game.achievementName(a)}</p>
                      {fresh ? <span className="pn-new">новое</span> : <span />}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section aria-labelledby="lb-h">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
              <h2 id="lb-h" className="pn-h2" style={{ fontSize: 28 }}>
                Лучшие результаты
              </h2>
              <span className="pn-label">топ-10 · {game.title}</span>
            </div>
            {board === null ? (
              <div className="pn-empty-note" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span className={`pn-dot ${online ? '' : 'pn-dot--warn'}`} style={{ marginTop: 8 }} />
                <p style={{ margin: 0 }}>
                  {online ? 'Загружаем таблицу…' : 'Таблица появится, когда сервер будет доступен. Твой результат сохранён на этом устройстве.'}
                </p>
              </div>
            ) : board.length === 0 ? (
              <p className="pn-empty-note" style={{ margin: 0 }}>
                Ты можешь стать первым.
              </p>
            ) : (
              <div className="pn-table-box">
                <table className="pn-table" data-testid="leaderboard">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: 56 }}>
                        место
                      </th>
                      <th scope="col">ник</th>
                      <th scope="col" style={{ textAlign: 'right' }}>
                        очки
                      </th>
                      <th scope="col" style={{ textAlign: 'right' }}>
                        звёзды
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.map((r, i) => (
                      <tr key={`${r.nickname}-${i}`} className={r.nickname === nickname ? 'is-me' : ''}>
                        <td className="num">{i + 1}</td>
                        <td>{r.nickname}</td>
                        <td className="num" style={{ textAlign: 'right' }}>
                          {fmtNum(r.score)}
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                          <span aria-hidden="true">{'★'.repeat(r.stars) + '☆'.repeat(Math.max(0, 3 - r.stars))}</span>
                          <span className="sr-only">{r.stars} из 3</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
