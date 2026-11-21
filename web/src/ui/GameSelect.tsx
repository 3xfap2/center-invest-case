import { publicGames } from '../games/catalog';
import { isDev, navigate } from '../router';
import { useStore } from '../state/store';
import { GameTitle } from './GameArt';
import { TopBar, btnPrimary, btnSecondary } from './parts';

export function GameSelect() {
  const games = publicGames(isDev());
  const saves = useStore((s) => s.games);
  const resetGame = useStore((s) => s.resetGame);

  return (
    <div className="screen-in min-h-dvh">
      <TopBar />
      <main className="mx-auto max-w-6xl px-5 pb-20 pt-6 md:px-12 md:pt-12">
        <h1 className="font-display text-h1 font-bold uppercase">Выбери профессию</h1>
        <ul className="mt-10">
          {games.map((g) => {
            const save = saves[g.id];
            const started = !!save?.data;
            const percent = save?.progress?.percent ?? 0;
            return (
              <li key={g.id} className="grid items-center gap-6 border-t border-line py-8 md:grid-cols-12" data-testid={`select-${g.id}`}>
                <div className="md:col-span-7">
                  <p className="font-mono text-label uppercase tracking-[0.16em] text-ci-green">{g.profession}</p>
                  <h2 className="mt-2 font-display text-h2 font-bold uppercase">
                    <GameTitle game={g} />
                  </h2>
                  <p className="mt-3 max-w-xl text-body text-text-2">{g.hook}</p>
                  <p className="mt-3 font-mono text-small text-muted">
                    {g.minutes}
                    {save?.achievements.length ? ` · достижений: ${save.achievements.length}` : ''}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
                  {!g.available ? (
                    <span className="font-display uppercase tracking-wide text-muted">скоро</span>
                  ) : started ? (
                    <>
                      <span className="w-full font-mono text-small text-text-2 md:text-right">пройдено {Math.round(percent)}%</span>
                      <button className={btnPrimary} onClick={() => navigate(`/play/${g.id}`)}>
                        Продолжить
                      </button>
                      <button
                        className={btnSecondary}
                        onClick={() => {
                          resetGame(g.id);
                          navigate(`/play/${g.id}`);
                        }}
                      >
                        Начать заново
                      </button>
                    </>
                  ) : (
                    <button className={btnPrimary} onClick={() => navigate(`/play/${g.id}`)}>
                      Играть
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
