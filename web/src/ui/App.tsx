import { useEffect } from 'react';
import { connect } from '../api/sync';
import { gameById } from '../games/catalog';
import { navigate, useRoute } from '../router';
import { useStore } from '../state/store';
import { GameSelect } from './GameSelect';
import { Landing } from './Landing';
import { Notice, TopBar, Link, btnPrimary } from './parts';
import { Play } from './Play';
import { Results } from './Results';
import { Start } from './Start';

function Redirect({ to }: { to: string }) {
  useEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}

function NotFound() {
  return (
    <div className="min-h-dvh">
      <TopBar />
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-12">
        <h1 className="font-display text-h1 font-bold uppercase">Такой страницы нет</h1>
        <Link to="/" className={`${btnPrimary} mt-8`}>
          На главную
        </Link>
      </main>
    </div>
  );
}

export function App() {
  const route = useRoute();
  const hasPlayer = useStore((s) => s.player !== null);

  useEffect(() => {
    void connect();
  }, []);

  let page;
  switch (route.name) {
    case 'landing':
      page = <Landing />;
      break;
    case 'start':
      page = <Start game={route.game} />;
      break;
    case 'games':
      page = hasPlayer ? <GameSelect /> : <Redirect to="/start" />;
      break;
    case 'play': {
      const game = gameById(route.id);
      if (!game || !game.available) page = <Redirect to="/games" />;
      else if (!hasPlayer) page = <Redirect to={`/start?game=${game.id}`} />;
      else page = <Play key={game.id} game={game} />;
      break;
    }
    case 'results': {
      const game = gameById(route.id);
      page = game ? <Results game={game} /> : <NotFound />;
      break;
    }
    default:
      page = <NotFound />;
  }

  return (
    <>
      <Notice />
      {page}
    </>
  );
}
