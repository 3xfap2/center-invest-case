import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject, PointerEvent as ReactPointer } from 'react';
import { axisById, camp, roomById } from '../camp/content';
import { activity, labels, occupants } from '../camp/game';
import type { CampState } from '../camp/game';
import { portrait } from './illustration';
import { World } from './world';

export const marks = { nature: '✿', tech: '⚙', people: '♥', signs: '⌘', art: '✦' };

interface Drag { teen: string; x: number; y: number; moved: boolean; originX: number; originY: number }
interface MapProps {
  state: CampState; paused: boolean; focus: string | null; selected: string; armed: string | null;
  world: MutableRefObject<World | null>; onLoaded: () => void;
  setFocus: (room: string | null) => void; inspect: (teen: string) => void;
  assign: (teen: string, room: string) => void;
  drag: Drag | null; dragLive: MutableRefObject<Drag | null>; setDrag: (drag: Drag | null) => void;
}

export const getDrag = (teen: string, e: ReactPointer): Drag => ({
  teen, x: e.clientX, y: e.clientY, originX: e.clientX, originY: e.clientY, moved: false,
});

export function CampMap(props: MapProps) {
  const { state, paused, focus, selected, armed, world, onLoaded, setFocus, inspect, assign, drag, dragLive, setDrag } = props;
  const node = useRef<HTMLDivElement>(null);
  const right = useRef<number | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [fallback, setFallback] = useState(false);
  const live = useRef(props);
  live.current = props;

  useEffect(() => {
    const element = node.current!;
    let scene: World | undefined;
    try {
      scene = new World(element, { state, paused, focus, hover, dragging: !!drag }, onLoaded);
      world.current = scene;
    } catch {
      setFallback(true);
      onLoaded();
    }
    const scroll = (e: WheelEvent) => {
      e.preventDefault();
      if (!live.current.paused) scene?.scroll(e.deltaY);
    };
    element.addEventListener('wheel', scroll, { passive: false });
    return () => {
      element.removeEventListener('wheel', scroll);
      world.current = null;
      scene?.dispose();
    };
  }, []);

  useEffect(() => {
    world.current?.set({ state, paused, focus, hover, dragging: !!drag });
  }, [state, paused, focus, hover, drag, world]);

  useEffect(() => {
    const roomAt = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-room-label]');
      return target?.dataset.roomLabel ?? world.current?.pick(x, y, 'room') ?? null;
    };
    const move = (e: PointerEvent) => {
      if (live.current.paused) return;
      if (right.current !== null) {
        world.current?.rotate(e.clientX - right.current);
        right.current = e.clientX;
      }
      const current = dragLive.current;
      if (!current) return;
      const moved = current.moved || Math.hypot(e.clientX - current.originX, e.clientY - current.originY) > 6;
      if (!moved) return;
      const next = { ...current, moved, x: e.clientX, y: e.clientY };
      setDrag(next);
      setHover(roomAt(e.clientX, e.clientY));
    };
    const up = (e: PointerEvent) => {
      if (e.button === 2 || e.pointerType === 'touch') right.current = null;
      const current = dragLive.current;
      if (!current || e.button !== 0) return;
      if (!live.current.paused && current.moved) {
        const target = roomAt(e.clientX, e.clientY);
        if (target) live.current.assign(current.teen, target);
      }
      // Preserve the completed drag until the click from this pointerup has been dispatched.
      requestAnimationFrame(() => setDrag(null));
      setHover(null);
    };
    const cancel = () => {
      right.current = null; setDrag(null); setHover(null);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('blur', cancel);
    };
  }, [world, setDrag]);

  const active = state.phase === 'plan' || state.phase === 'watch' || state.phase === 'review';
  const night = !active;
  const inside = state.phase !== 'plan';
  const pickRoom = (id: string) => {
    if (dragLive.current?.moved || paused) return;
    if (state.phase === 'plan' && armed) assign(armed, id);
    setFocus(focus === id ? null : id);
  };
  const pickCanvas = (e: ReactPointer<HTMLDivElement>) => {
    if (paused) return;
    if (e.button === 2) {
      e.preventDefault();
      right.current = e.clientX;
    }
    if (e.button === 0 && state.phase === 'plan' && e.target instanceof HTMLCanvasElement) {
      const id = world.current?.pick(e.clientX, e.clientY, 'teen');
      if (id) { setDrag(getDrag(id, e)); return; }
    }
    // A touch screen has no right button: a one-finger drag on the empty map turns the camp.
    if (e.pointerType === 'touch' && e.button === 0 && e.target instanceof HTMLCanvasElement) right.current = e.clientX;
  };

  const title = inside ? [state.slot === 2 ? 'Золотой час' : 'Мастерские открыты', focus ? roomById.get(focus)?.name : 'Лагерь на Дону'] :
    [state.day === 0 ? 'Лагерь на Дону' : camp.days[state.day].title, 'Компас'];

  return <div className={'map ' + (night ? 'night ' : '') + (fallback ? 'fallback' : '')} ref={node}
    onContextMenu={e => e.preventDefault()} onPointerDown={pickCanvas}
    onClick={e => {
      if (!active || paused || dragLive.current?.moved || !(e.target instanceof HTMLCanvasElement)) return;
      const teen = world.current?.pick(e.clientX, e.clientY, 'teen');
      const room = world.current?.pick(e.clientX, e.clientY, 'room');
      if (teen) inspect(teen);
      else if (room) pickRoom(room);
    }}>
    <div className="map-paper" />
    <div className="map-copy">
      <div className="map-eyebrow"><span className="sun-mark">{state.slot === 2 || night ? '☾' : '☼'}</span> {state.slot === 2 || night ? 'Вечер у реки' : state.slot === 1 ? 'День у реки' : 'Летнее утро'}</div>
      <h1>{title[1]}</h1>
      <p>{title[0]}</p>
    </div>
    <div className="map-north" aria-hidden="true"><b>С</b><span>✧</span></div>
    {active && <div className="map-anchors">
      {camp.workshops.map((room, index) => <button key={room.id} data-room-label={room.id} data-testid={'room-' + room.id}
        className={'room-pin ' + (hover === room.id || focus === room.id ? 'pin-on' : '')}
        style={{ '--accent': axisById[room.type].color, '--fallback-i': index } as React.CSSProperties}
        onClick={() => pickRoom(room.id)} title={room.program?.[state.day] ?? room.task}>
        <span>{marks[room.type]}</span>{room.name}{state.phase === 'plan' && <small>{occupants(state, room.id).length}/{room.capacity}</small>}
      </button>)}
      {inside && camp.teens.map((teen, index) => {
        const signal = activity(state, teen);
        return <button className={'teen-pin ' + (selected === teen.id ? 'pin-on' : '')} key={teen.id} data-teen-label={teen.id}
          title={signal?.active ? (state.difficulty === 'hard' ? teen.name : labels[signal.emote]) : teen.name}
          style={{ '--accent': teen.color, '--fallback-i': index } as React.CSSProperties}
          onClick={() => inspect(teen.id)}>{teen.name}</button>;
      })}
    </div>}
    <div className="map-controls">
      <button title="Приблизить" aria-label="Приблизить" onClick={() => world.current?.scroll(-220)}>＋</button>
      <button title="Отдалить" aria-label="Отдалить" onClick={() => world.current?.scroll(220)}>−</button>
      <button title="Весь лагерь" aria-label="Весь лагерь" onClick={() => { setFocus(null); world.current?.reset(); }}>⌖</button>
    </div>
    {fallback && <div className="map-fallback">Карта без 3D · мастерские доступны</div>}
    <div className="map-foot"><span>ПКМ вращать <i /> Колесо масштаб</span><span><b>≈</b> Берег Дона</span></div>
  </div>;
}

export function Roster({ state, selected, inspect, setDrag }: Pick<MapProps, 'state' | 'selected' | 'inspect' | 'setDrag'>) {
  return <section className="roster" aria-label="Участники">
    <div className="roster-caption"><span>Участники</span><small>{state.phase === 'plan' ? 'Перетащи в мастерскую' : 'Выбери для наблюдения'}</small></div>
    <div className="roster-list">
      {camp.teens.map(teen => {
        const room = roomById.get(state.assignments[teen.id]);
        return <button key={teen.id} className={'roster-teen ' + (selected === teen.id ? 'selected' : '')} data-testid={'teen-' + teen.id}
          style={{ '--accent': teen.color } as React.CSSProperties}
          onPointerDown={e => { if (state.phase === 'plan' && e.button === 0) { e.preventDefault(); setDrag(getDrag(teen.id, e)); } }}
          onClick={() => inspect(teen.id)}>
          <img src={portrait(teen)} alt="" draggable={false} />
          <span><strong>{teen.name}</strong><small>{room?.name ?? teen.age + ' лет'}</small></span>
          {state.phase === 'plan' && <i aria-hidden="true">⠿</i>}
        </button>;
      })}
    </div>
  </section>;
}

export function DragGhost({ drag }: { drag: Drag | null }) {
  if (!drag?.moved) return null;
  const teen = camp.teens.find(teen => teen.id === drag.teen);
  if (!teen) return null;
  return <div className="drag-ghost" style={{ left: drag.x + 13, top: drag.y + 12 }}><img src={portrait(teen)} alt="" />{teen.name}</div>;
}

export type { Drag };
