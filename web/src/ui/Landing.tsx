import { publicGames } from '../games/catalog';
import { isDev } from '../router';
import { useStore } from '../state/store';
import { GameFrame, GameTitle } from './GameArt';
import { Link, TopBar, btnPrimary } from './parts';

const STEPS = [
  { n: '01', title: 'Ник вместо регистрации', text: 'Ни почты, ни телефона. Придумай имя и начинай.' },
  { n: '02', title: 'Одна полная глава', text: 'Герои, которые помнят твои решения, и финал, который зависит от тебя.' },
  { n: '03', title: 'Как в жизни', text: 'В конце карточка профессии: чем занимается специалист и где этому учат в Ростовской области.' },
];

export function Landing() {
  const games = publicGames(isDev());
  const hasPlayer = useStore((s) => s.player !== null);
  const start = (id?: string) => (hasPlayer ? (id ? `/play/${id}` : '/games') : id ? `/start?game=${id}` : '/start');

  return (
    <div className="screen-in">
      <div className="relative">
        <div className="nav-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <TopBar />

        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-10 md:grid-cols-12 md:px-12 md:pt-20">
          <div className="md:col-span-7">
            <p className="font-mono text-label uppercase tracking-[0.18em] text-ci-green">Сюжетные игры о профессиях · 12–15 лет</p>
            <h1 className="mt-5 font-display text-hero-sm font-bold uppercase md:text-[5.25rem] md:leading-[0.95]">
              Попробуй профессию до&nbsp;того, как выбрать
            </h1>
            <p className="mt-7 max-w-xl text-lead-lg text-text-2">
              В каждой игре одна полная глава: живые герои, трудные решения и настоящая работа специалиста. Прямо в браузере, без регистрации.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to={start()} className={btnPrimary} data-testid="cta-play">
                Играть
              </Link>
              <span className="font-mono text-small text-muted">нужен только ник</span>
            </div>
          </div>

          {/* Departure board: the platform grows one profession at a time */}
          <aside className="self-end md:col-span-5" aria-label="Профессии на платформе">
            <p className="mb-3 font-mono text-caption uppercase tracking-[0.2em] text-muted">Профессии · отправление</p>
            <ul className="font-mono text-small">
              {games.map((g) => (
                <li key={g.id} className="board-row flex items-center justify-between gap-4 py-3">
                  <span className="text-text">{g.profession}</span>
                  <span className={`flex shrink-0 items-center gap-2 uppercase ${g.available ? 'text-ci-green' : 'text-ai'}`}>
                    {g.available && <span className="live-dot size-1.5 rounded-full bg-ci-green" aria-hidden />}
                    {g.available ? 'посадка' : 'скоро'}
                  </span>
                </li>
              ))}
              <li className="board-row flex items-center justify-between gap-4 py-3 text-muted">
                <span>Следующая профессия</span>
                <span className="uppercase">по плану</span>
              </li>
            </ul>
          </aside>
        </section>
      </div>

      {/* Games as an editorial index */}
      <section className="mx-auto max-w-6xl px-5 md:px-12" aria-label="Игры">
        {games.map((g, i) => (
          <article key={g.id} className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-10" data-testid={`game-${g.id}`}>
            <div className="font-display text-h1 font-bold text-line-strong md:col-span-1">{String(i + 1).padStart(2, '0')}</div>
            <div className="md:col-span-5">
              <p className="font-mono text-label uppercase tracking-[0.16em] text-ci-green">{g.profession}</p>
              <h2 className="mt-3 font-display text-h1 font-bold uppercase leading-none">
                <GameTitle game={g} live />
              </h2>
              <p className="mt-5 max-w-md text-lead text-text-2">{g.hook}</p>
              <p className="mt-5 font-mono text-small text-muted">
                {g.minutes}
                {g.controls ? ` · ${g.controls}` : ''}
              </p>
              <div className="mt-7">
                {g.available ? (
                  <Link to={start(g.id)} className={btnPrimary}>
                    Играть
                  </Link>
                ) : (
                  <span className="inline-flex rounded-md border border-dashed border-line-strong px-5 py-3 font-display uppercase tracking-wide text-muted">
                    скоро
                  </span>
                )}
              </div>
            </div>
            <GameFrame game={g} className="md:col-span-6" />
          </article>
        ))}
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 md:px-12">
        <div className="border-t border-line py-16">
        <h2 className="font-display text-h2 font-bold uppercase">Как это устроено</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-l-2 border-ci-green pl-5">
              <span className="font-mono text-small text-ci-green">{s.n}</span>
              <h3 className="mt-2 font-display text-h3 font-semibold uppercase">{s.title}</h3>
              <p className="mt-3 text-body text-text-2">{s.text}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      <footer className="border-t border-line bg-bg-deep">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 font-mono text-caption text-muted md:px-12">
          <span>ПрофНавигатор · кейс банка «Центр-инвест» «ПрофНавигатор: выбери профессию будущего»</span>
          <span>Cyber Garden School 2026</span>
        </div>
      </footer>
    </div>
  );
}
