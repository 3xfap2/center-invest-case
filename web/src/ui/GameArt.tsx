import type { Game } from '../games/catalog';

// Real frames from the games: drop src/assets/frames/<id>.webp and it shows up here.
const frames = import.meta.glob<string>('../assets/frames/*.{webp,png,jpg}', { eager: true, query: '?url', import: 'default' });
const frameOf = (id: string) => Object.entries(frames).find(([p]) => p.includes(`/frames/${id}.`))?.[1] ?? null;

/** The game title with its own typographic signature. */
export function GameTitle({ game, live = false }: { game: Game; live?: boolean }) {
  if (game.id === 'glitch') {
    const [head, ...tail] = game.title.split(':');
    return (
      <>
        <span className={`title-glitch inline-block ${live ? 'title-glitch-live' : ''}`}>{head}</span>
        {tail.length > 0 && <span className="block text-[0.55em] text-text-2">{tail.join(':').trim()}</span>}
      </>
    );
  }
  if (game.id === 'chuzhoe-imya') {
    const [first, ...rest] = game.title.split(' ');
    return (
      <>
        {first} <span className="redact">{rest.join(' ')}</span>
      </>
    );
  }
  return <>{game.title}</>;
}

/** A real frame when we have one, otherwise a typographic poster (never a grey box). */
export function GameFrame({ game, className = '' }: { game: Game; className?: string }) {
  const src = frameOf(game.id);
  return (
    <div className={`grain relative aspect-video overflow-hidden rounded-lg border border-line bg-bg-deep ${className}`}>
      {src ? (
        <img src={src} alt={`Кадр из игры «${game.title}»`} className="size-full object-cover" loading="lazy" />
      ) : (
        <div className="flex size-full flex-col justify-between p-5 md:p-7">
          <span className="font-mono text-caption uppercase tracking-widest text-muted">{game.profession}</span>
          <span className="font-display text-h1 font-bold uppercase leading-none text-text/90 md:text-[4.5rem]">
            <GameTitle game={game} />
          </span>
        </div>
      )}
    </div>
  );
}
