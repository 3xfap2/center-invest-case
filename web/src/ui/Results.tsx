import { useEffect, useState } from 'react';
import { api, type LeaderRow } from '../api/client';
import { useSync } from '../api/sync';
import type { Game } from '../games/catalog';
import { navigate } from '../router';
import { lastRun } from '../state/logic';
import { useStore } from '../state/store';
import { DIFFICULTY, Link, Stars, TopBar, btnPrimary, btnSecondary, fmtTime } from './parts';

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
      <div className="min-h-dvh">
        <TopBar />
        <main className="mx-auto max-w-3xl px-5 py-16 md:px-12">
          <h1 className="font-display text-h2 font-bold uppercase">Здесь пока пусто</h1>
          <p className="mt-4 text-text-2">Пройди главу до конца, и здесь появится результат.</p>
          <Link to="/games" className={`${btnPrimary} mt-8`}>
            К играм
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="screen-in min-h-dvh">
      <TopBar />
      <main className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-6 md:grid-cols-12 md:px-12 md:pt-12">
        <section className="md:col-span-7" data-testid="results">
          <p className="font-mono text-label uppercase tracking-[0.18em] text-ci-green">
            {game.title} · глава пройдена
          </p>
          <h1 className="mt-4 font-display text-hero-sm font-bold uppercase md:text-hero" data-testid="ending">
            {game.endingName(run.ending)}
          </h1>
          <div className="mt-6 text-h1">
            <Stars n={run.stars} animate />
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 border-y border-line font-mono">
            {[
              ['время', fmtTime(run.durationSec)],
              ['очки', String(run.score)],
              ['сложность', DIFFICULTY[run.difficulty].label.toLowerCase()],
            ].map(([k, v]) => (
              <div key={k} className="py-4">
                <dt className="text-caption uppercase tracking-widest text-muted">{k}</dt>
                <dd className="mt-1 text-lead text-text">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-h3 font-semibold uppercase">Достижения</h2>
          {owned.length === 0 ? (
            <p className="mt-3 text-text-2">Пока ни одного. В следующий раз попробуй другие решения.</p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2">
              {owned.map((a) => {
                const fresh = run.earned.includes(a);
                return (
                  <li
                    key={a}
                    className={`rounded-sm border px-3 py-1.5 font-mono text-small ${fresh ? 'border-ci-green text-text' : 'border-line text-text-2'}`}
                  >
                    {game.achievementName(a)}
                    {fresh && <span className="ml-2 text-caption uppercase text-ci-green">новое</span>}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <button
              className={btnPrimary}
              onClick={() => {
                resetGame(game.id);
                navigate(`/play/${game.id}`);
              }}
            >
              Сыграть ещё
            </button>
            <Link to="/games" className={btnSecondary}>
              Другая игра
            </Link>
          </div>
        </section>

        <aside className="md:col-span-5" aria-label="Лучшие результаты">
          <h2 className="font-display text-h3 font-semibold uppercase">Лучшие результаты</h2>
          {board === null ? (
            <p className="mt-3 text-small text-muted">
              {online ? 'Загружаем…' : 'Таблица появится, когда сервер будет доступен. Твой результат сохранён на этом устройстве.'}
            </p>
          ) : board.length === 0 ? (
            <p className="mt-3 text-small text-muted">Ты можешь стать первым.</p>
          ) : (
            <ol className="mt-4 font-mono text-small" data-testid="leaderboard">
              {board.map((r, i) => (
                <li key={`${r.nickname}-${i}`} className={`board-row flex items-center gap-4 py-2.5 ${r.nickname === nickname ? 'text-ci-green' : 'text-text-2'}`}>
                  <span className="w-6 text-muted">{i + 1}</span>
                  <span className="flex-1 truncate">{r.nickname}</span>
                  <span>{r.score}</span>
                  <Stars n={r.stars} />
                </li>
              ))}
            </ol>
          )}
        </aside>
      </main>
    </div>
  );
}
