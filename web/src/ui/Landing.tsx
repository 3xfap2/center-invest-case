import { useEffect, useRef } from 'react';
import { publicGames, type Game } from '../games/catalog';
import { isDev, navigate } from '../router';
import { useStore } from '../state/store';
import { useUi } from '../state/ui';
import { AchievementBoard } from './AchievementBoard';
import { Scene } from './Scene';
import { GameTitle, Logo, PlayIcon } from './parts';

const STEPS = [
  { n: '01', title: 'Ник вместо регистрации', text: 'Придумай ник и выбери сложность. Ни почты, ни пароля.' },
  { n: '02', title: 'Одна полная глава', text: 'Целая история от начала до финала, прямо в браузере. Прогресс сохраняется сам.' },
  { n: '03', title: 'Как в жизни', text: 'В конце карточка профессии: чем занимается специалист и где этому учиться в Ростовской области.' },
];

const HOVER_SELECT_MS = 220;
const stories = (n: number) => `${n} ${n === 1 ? 'история' : n < 5 ? 'истории' : 'историй'}`;

export function Landing() {
  const games = publicGames(isDev());
  const selected = useUi((s) => s.selected);
  const select = useUi((s) => s.select);
  const hasPlayer = useStore((s) => s.player !== null);
  const game = games.find((g) => g.id === selected) ?? games[0];
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // A click or focus selects at once and cancels a pending hover selection (it would jump back later).
  const pick = (id: string) => {
    clearTimeout(hoverTimer.current);
    select(id);
  };

  const startPath = (g?: Game) => (hasPlayer ? (g ? `/play/${g.id}` : '/games') : g ? `/start?game=${g.id}` : '/start');

  function onShelfKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    clearTimeout(hoverTimer.current); // a key press wins over a pending hover selection
    e.preventDefault();
    const i = games.findIndex((g) => g.id === game.id);
    const j = (i + (e.key === 'ArrowRight' ? 1 : -1) + games.length) % games.length;
    e.currentTarget.querySelectorAll<HTMLButtonElement>('button.pn-poster')[j]?.focus();
    select(games[j].id);
  }

  return (
    <div className="pn-screen">
      <section className="pn-hero" aria-label="Фильмотека">
        <header className="pn-topbar pn-topbar--over pn-wrap" style={{ margin: '0 auto' }}>
          <Logo />
          <nav className="pn-nav" aria-label="Главное меню">
            <a className="pn-nav-link" href="#how">
              Как это устроено
            </a>
            <a className="pn-nav-link" href="#board">
              Табло профессий
            </a>
            <a
              className="pn-btn pn-btn--ghost pn-btn--sm"
              href={startPath()}
              style={{ marginLeft: 8 }}
              data-testid="nav-start"
              onClick={(e) => {
                e.preventDefault();
                navigate(startPath());
              }}
            >
              Начать
            </a>
          </nav>
        </header>

        <div className="pn-wrap pn-hero-inner">
          {/* Keyed by game, so the label → title → hook → button stagger plays on every switch */}
          <div className="pn-hero-copy" aria-live="polite" key={game.id} data-testid="hero">
            <p className="pn-label pn-label--acc pn-swap-1" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="pn-dot pn-dot--acc" />
              Профессия · {game.profession.toLowerCase()}
            </p>
            <h1 className="pn-hero-title pn-swap-2">
              <GameTitle game={game} />
            </h1>
            <p className="pn-hook pn-swap-3">{game.hook}</p>
            <ul className="pn-meta pn-swap-3">
              <li>{game.minutes} мин</li>
              <li>{game.controls}</li>
              <li>{game.place}</li>
            </ul>
            <div className="pn-cta pn-swap-4">
              {game.available ? (
                <>
                  <a
                    className="pn-btn pn-btn--accent pn-btn--lg"
                    href={startPath(game)}
                    data-testid="cta-play"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(startPath(game));
                    }}
                  >
                    <PlayIcon />
                    Играть
                  </a>
                  <span className="pn-cta-note">Без регистрации. Нужен только ник.</span>
                </>
              ) : (
                <>
                  <button className="pn-btn pn-btn--lg" type="button" disabled>
                    Скоро
                  </button>
                  <span className="pn-cta-note">Глава в работе. Следи за табло ниже.</span>
                </>
              )}
            </div>
          </div>

          <div className="pn-shelf">
            <div className="pn-shelf-head">
              <p className="pn-label pn-label--text">Фильмотека · {stories(games.length)}</p>
              <p className="pn-label pn-shelf-hint">Tab или ← → чтобы выбрать</p>
            </div>
            <div className="pn-posters" role="group" aria-label="Игры" onKeyDown={onShelfKey}>
              {games.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`pn-poster ${g.id === game.id ? 'is-selected' : ''} ${g.available ? '' : 'is-soon'}`}
                  aria-pressed={g.id === game.id}
                  style={{ '--p-acc': g.accent } as React.CSSProperties}
                  onClick={() => pick(g.id)}
                  onFocus={() => pick(g.id)}
                  onMouseEnter={() => {
                    clearTimeout(hoverTimer.current);
                    hoverTimer.current = setTimeout(() => select(g.id), HOVER_SELECT_MS);
                  }}
                  onMouseLeave={() => clearTimeout(hoverTimer.current)}
                  data-testid={`game-${g.id}`}
                >
                  <span className="pn-poster-art">
                    <Scene id={g.scene} />
                  </span>
                  <span className="pn-poster-shade" />
                  <span className="pn-poster-mark">сейчас</span>
                  <span className="pn-poster-body">
                    <span className="pn-poster-prof">{g.prof}</span>
                    <span className="pn-poster-title">
                      <GameTitle game={g} sub={false} />
                    </span>
                    <span className="pn-poster-status">
                      <span className={`pn-dot ${g.available ? 'pn-live' : 'pn-dot--off'}`} />
                      {g.available ? `посадка · ${g.minutes} мин` : 'скоро'}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="pn-wrap">
        <div className="pn-info">
          <section id="how" aria-labelledby="how-h">
            <h2 id="how-h" className="pn-h2" style={{ marginBottom: 28 }}>
              Как это устроено
            </h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {STEPS.map((s) => (
                <li key={s.n} className="pn-step">
                  <span className="pn-step-num" aria-hidden="true">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="pn-step-title">{s.title}</h3>
                    <p className="pn-step-text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="board" className="pn-board" aria-labelledby="board-h">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
              <h2 id="board-h" className="pn-label pn-label--text" style={{ fontSize: 13 }}>
                Профессии · отправление
              </h2>
              <span className="pn-label">одна за другой</span>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {games.map((g, i) => (
                <li key={g.id} className="pn-board-row">
                  <span className="pn-flap">{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ color: 'var(--pn-text)', fontSize: 15 }}>{g.profession}</span>
                    <span style={{ color: 'var(--pn-text-3)', fontSize: 12 }}>{g.title}</span>
                  </span>
                  <span className="pn-board-status" style={{ color: g.available ? 'var(--pn-green)' : 'var(--pn-text-3)' }}>
                    <span className={`pn-dot ${g.available ? 'pn-live' : 'pn-dot--off'}`} />
                    {g.available ? 'посадка' : 'скоро'}
                  </span>
                </li>
              ))}
              <li className="pn-board-row" style={{ color: 'var(--pn-text-3)' }}>
                <span className="pn-flap" style={{ color: 'var(--pn-text-3)' }}>
                  ··
                </span>
                <span style={{ fontSize: 15 }}>Следующая профессия</span>
                <span className="pn-board-status">по плану</span>
              </li>
            </ul>
          </section>
        </div>
        <div style={{ paddingBottom: 96 }}>
          <AchievementBoard />
        </div>
        <footer className="pn-footer">
          <span>ПрофНавигатор · кейс банка «Центр-инвест» «ПрофНавигатор: выбери профессию будущего»</span>
          <span>Cyber Garden School 2026</span>
        </footer>
      </main>
    </div>
  );
}
