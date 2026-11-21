import { useEffect, useState } from 'react';
import { connect } from '../api/sync';
import { GREEN, gameById } from '../games/catalog';
import { navigate, useRoute, type Route } from '../router';
import { useStore } from '../state/store';
import { useUi } from '../state/ui';
import { GameSelect } from './GameSelect';
import { Landing } from './Landing';
import { NotFound } from './NotFound';
import { Notice } from './parts';
import { Play } from './Play';
import { Results } from './Results';
import { Scene, type SceneId } from './Scene';
import { Start } from './Start';

function Redirect({ to }: { to: string }) {
  useEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}

type StageMode = 'landing' | 'start' | 'results' | 'none';

/**
 * The scene stack is mounted once, outside the pages, so it never reloads.
 * It crossfades between games and between modes (landing 100 %, start 50 %, results 55 %, else hidden).
 */
function Stage({ scene, mode }: { scene: SceneId | null; mode: StageMode }) {
  const [shown, setShown] = useState<SceneId[]>(scene ? [scene] : []);
  useEffect(() => {
    if (scene && !shown.includes(scene)) setShown((s) => [...s, scene]);
  }, [scene, shown]);
  return (
    <div className="pn-stage" data-mode={mode} aria-hidden="true">
      <div className="pn-scene-stack">
        {shown.map((id) => (
          <div key={id} className={`pn-scene-layer ${id === scene && mode !== 'none' ? 'is-active' : ''}`}>
            <div className="pn-kb">
              <Scene id={id} />
            </div>
          </div>
        ))}
        <div className="pn-scrim" />
        <div className="pn-scrim pn-scrim--soft" />
        <div className="pn-grain" />
      </div>
    </div>
  );
}

/** Which game colours the page (accent) and which scene sits behind it. */
function look(route: Route, selected: string): { accent: string; scene: SceneId | null; mode: StageMode } {
  const sel = gameById(selected);
  switch (route.name) {
    case 'landing':
      return { accent: sel?.accent ?? GREEN, scene: sel?.scene ?? null, mode: 'landing' };
    case 'start': {
      const g = (route.game && gameById(route.game)) || sel;
      return { accent: g?.accent ?? GREEN, scene: g?.scene ?? null, mode: g?.scene ? 'start' : 'none' };
    }
    case 'play':
    case 'results': {
      const g = gameById(route.id);
      return { accent: g?.accent ?? GREEN, scene: g?.scene ?? null, mode: route.name === 'results' && g?.scene ? 'results' : 'none' };
    }
    default:
      return { accent: GREEN, scene: sel?.scene ?? null, mode: 'none' };
  }
}

export function App() {
  const route = useRoute();
  const hasPlayer = useStore((s) => s.player !== null);
  const selected = useUi((s) => s.selected);
  const select = useUi((s) => s.select);

  useEffect(() => {
    void connect();
  }, []);

  // Opening a game page makes it the selected one, so the landing shows it when you come back.
  const routeGame = route.name === 'play' || route.name === 'results' ? route.id : route.name === 'start' ? route.game : null;
  useEffect(() => {
    const g = routeGame && gameById(routeGame);
    if (g && !g.devOnly) select(g.id);
  }, [routeGame, select]);

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

  const { accent, scene, mode } = look(route, selected);
  const pageKey = route.name === 'play' || route.name === 'results' ? `${route.name}/${route.id}` : route.name;

  return (
    <div className="pn-root" style={{ '--accent': accent } as React.CSSProperties}>
      <Stage scene={scene} mode={mode} />
      <Notice />
      <div className="pn-page" key={pageKey}>
        {page}
      </div>
    </div>
  );
}
