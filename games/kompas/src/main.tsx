import { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import meta from '../game.json';
import { camp, endings, levels, roomById, teenById } from './camp/content';
import type { Difficulty, Ending } from './camp/content';
import {
  activity, afterSlot, answerPicture, assign, chooseRanking, createGame, demoEnding, fromSave, observe, outcome,
  playerRadar, presentPaths, recommend, signalBeatSeconds, slotsPerDay, spreadAssignments, startSlot, talk, tick, toSave, totalSlots, visitSchool,
} from './camp/game';
import type { CampState } from './camp/game';
import { CampAudio } from './view/audio';
import { CampMap, DragGhost, Roster } from './view/CampMap';
import type { Drag } from './view/CampMap';
import { CompassLogo, Dialog, EndingScreen, Evening, levelLabels, Paths, SchoolVisit, SelfQuiz, SelfResult, Sidebar, slotNames } from './view/panels';
import type { World } from './view/world';
import './style.css';

interface Init {
  nickname?: string;
  difficulty?: string;
  save?: unknown;
  muted?: boolean;
}
interface Bridge {
  standalone: boolean;
  onInit: ((event: Init) => void) | null;
  pause?: () => void;
  resume?: () => void;
  mute?: (event: { muted?: boolean }) => void;
  ready: (id: string, version: string) => void;
  progress: (step: number, percent: number) => void;
  save: (data: CampState) => void;
  flag: (key: string, value: string | boolean) => void;
  achievement: (id: string) => void;
  end: (result: { ending: Ending; stars: number; score: number; durationSec: number; choices: Record<string, string | boolean> }) => void;
  exit: () => void;
}
declare global { interface Window { NS?: Bridge } }

const debug = new URLSearchParams(location.search).get('debug') === '1';
const ns = window.NS;
const standalone = ns?.standalone ?? true;
const localKey = 'kompas.save.v1';

function readLocal(): { nickname: string; save: unknown; muted: boolean } | null {
  if (!standalone) return null;
  try { return JSON.parse(localStorage.getItem(localKey) ?? 'null'); }
  catch { return null; }
}

function App() {
  const [state, setState] = useState(createGame);
  const latest = useRef(state);
  const [selected, setSelected] = useState(camp.teens[0].id);
  const [armed, setArmed] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const focusRef = useRef(focus);
  focusRef.current = focus;
  const [status, setStatus] = useState('');
  const [nickname, setNickname] = useState('');
  const nicknameRef = useRef(nickname);
  nicknameRef.current = nickname;
  const [muted, setMuted] = useState(true);
  const muteRef = useRef(muted);
  muteRef.current = muted;
  const [paused, setPaused] = useState(false);
  const [sitePaused, setSitePaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [exited, setExited] = useState(false);
  const [settings, setSettings] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [debugMenu, setDebugMenu] = useState(debug);
  const [revealed, setRevealed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [drag, setDragState] = useState<Drag | null>(null);
  const dragLive = useRef<Drag | null>(null);
  const setDrag = useCallback((value: Drag | null) => {
    dragLive.current = value;
    setDragState(value);
  }, []);
  const world = useRef<World | null>(null);
  const audio = useRef(new CampAudio());
  const blocked = paused || sitePaused || hidden || exited || settings || schoolOpen || debugMenu || !sceneReady || !initialized;
  const blockedRef = useRef(blocked);
  blockedRef.current = blocked;
  const ended = useRef(false);
  const flagsSent = useRef(false);
  const achieved = useRef(new Set<string>());

  const loaded = useCallback(() => setSceneReady(true), []);

  const persist = useCallback((next: CampState) => {
    const save = toSave(next);
    if (standalone) {
      try { localStorage.setItem(localKey, JSON.stringify({ nickname: nicknameRef.current, save, muted: muteRef.current })); }
      catch { /* Private browsing can disable local persistence. */ }
    } else ns?.save(save);
  }, []);

  const apply = useCallback((next: CampState, options: { save?: boolean } = {}) => {
    const previous = latest.current;
    if (previous === next) return;
    latest.current = next;
    setState(next);
    if (next.completed > previous.completed) {
      ns?.progress(next.completed, Math.round(next.completed / totalSlots * 100));
      audio.current.play('chime');
    }
    if (options.save || next.completed > previous.completed || next.phase !== previous.phase) persist(next);
    for (const id of next.earned) {
      if (achieved.current.has(id)) continue;
      achieved.current.add(id);
      ns?.achievement(id);
    }
    if (next.ending && !ended.current) {
      ended.current = true;
      const score = Math.round(camp.teens.reduce((sum, teen) => sum + outcome(next, teen).points, 0) / camp.teens.length);
      ns?.flag('km_ranked_kids', next.ranked ?? false);
      ns?.end({ ending: next.ending, stars: next.ending === 'good' ? 3 : next.ending === 'mixed' ? 2 : 1,
        score, durationSec: Math.round(next.durationSec), choices: { ...next.paths, ranked: next.ranked ?? false } });
    }
    if (next.phase === 'result' && !flagsSent.current) {
      flagsSent.current = true;
      const { top } = playerRadar(next);
      ns?.flag('km_top1', top[0]);
      ns?.flag('km_top2', top[1]);
    }
  }, [persist]);

  useEffect(() => {
    const init = (event: Init) => {
      const savedLocal = readLocal();
      const difficulty = (levels as readonly string[]).includes(event.difficulty ?? '') ? event.difficulty as Difficulty : 'normal';
      const next = fromSave(savedLocal?.save ?? event.save) ?? createGame(difficulty);
      const name = (savedLocal?.nickname ?? (standalone ? '' : event.nickname) ?? '').slice(0, 24);
      const soundMuted = savedLocal?.muted ?? !!event.muted;
      nicknameRef.current = name;
      muteRef.current = soundMuted;
      setNickname(name);
      setMuted(soundMuted);
      ended.current = !!next.ending;
      flagsSent.current = next.phase === 'result';
      achieved.current = new Set(next.earned);
      latest.current = next;
      setState(next);
      ns?.progress(next.completed, Math.round(next.completed / totalSlots * 100));
      setInitialized(true);
    };
    if (ns) {
      ns.onInit = init;
      ns.pause = () => setSitePaused(true);
      ns.resume = () => setSitePaused(false);
      ns.mute = event => setMuted(event.muted ?? true);
      ns.ready(meta.id, meta.version);
    } else init({});
    const visibility = () => setHidden(document.hidden);
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.repeat) { e.preventDefault(); setPaused(value => !value); }
    };
    const unlock = () => void audio.current.unlock();
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('keydown', key);
    document.addEventListener('pointerup', unlock);
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerup', unlock);
    };
  }, []);

  useEffect(() => {
    audio.current.configure(muted, blocked);
  }, [muted, blocked]);

  useEffect(() => {
    let last = performance.now();
    let lastEmote = 0;
    const interval = window.setInterval(() => {
      const time = performance.now();
      const delta = Math.min((time - last) / 1000, 0.45);
      last = time;
      const active = latest.current;
      if (blockedRef.current || active.phase !== 'watch') return;
      apply(tick(active, delta, focusRef.current));
      const beat = Math.floor(active.elapsed / signalBeatSeconds);
      if (beat > lastEmote || (beat === 0 && lastEmote > 0)) {
        lastEmote = beat;
        audio.current.play('emote');
      }
    }, 175);
    return () => window.clearInterval(interval);
  }, [apply]);

  const select = (id: string) => {
    setSelected(id);
    setStatus('');
  };

  const inspect = (id: string) => {
    select(id);
    const game = latest.current;
    if (game.phase !== 'watch' || blockedRef.current) return;
    setFocus(game.assignments[id] ?? null);
    const next = observe(game, id);
    if (next !== game) {
      audio.current.play('note');
      apply(next);
      setStatus(next.observations.at(-1)!.text);
    } else if (game.observations.some(note => note.teen === id && note.slot === game.day * slotsPerDay + game.slot)) {
      setStatus('Уже в дневнике. Посмотри на другого участника.');
    } else if (game.points < 1) setStatus('Очки наблюдения вернутся утром.');
    else if (!activity(game, teenById.get(id)!)?.active) setStatus('Этот момент прошёл. Подожди нового знака.');
  };

  const place = (id: string, room: string) => {
    const active = latest.current;
    const next = assign(active, id, room);
    setArmed(null);
    setSelected(id);
    if (next !== active) {
      setStatus('');
      audio.current.play('drop');
      apply(next);
    } else if (active.assignments[id] !== room) {
      setStatus('В мастерской «' + roomById.get(room)?.name + '» больше нет мест.');
    }
  };

  const next = () => {
    setArmed(null);
    setStatus('');
    setFocus(null);
    const game = latest.current;
    apply(game.phase === 'review' ? afterSlot(game) : startSlot(game));
  };

  const openSchool = () => {
    setArmed(null);
    setStatus('');
    setFocus(camp.school.id);
    setSchoolOpen(true);
  };

  const finishSchool = () => {
    apply(visitSchool(latest.current), { save: true });
    setSchoolOpen(false);
    setFocus(null);
  };

  const changeScene = (nextState: CampState) => {
    setSchoolOpen(false);
    setArmed(null);
    setFocus(null);
    setStatus('');
    apply(nextState);
  };

  const restart = () => {
    ended.current = false;
    flagsSent.current = false;
    setRevealed(false);
    setExited(false);
    setPaused(false);
    setSitePaused(false);
    world.current?.reset();
    changeScene(createGame(latest.current.difficulty, Math.floor(Math.random() * 2147483647)));
    ns?.progress(0, 0);
  };

  const exit = () => {
    persist(latest.current);
    ns?.exit();
    setPaused(false);
    setExited(true);
  };

  const toggleMute = () => {
    const nextMute = !muteRef.current;
    muteRef.current = nextMute;
    setMuted(nextMute);
    audio.current.configure(nextMute, blockedRef.current);
    if (!nextMute) void audio.current.unlock();
    if (standalone) persist(latest.current);
  };

  const demoSlot = (day: number, slot: number) => {
    ended.current = false;
    flagsSent.current = false;
    const next = { ...createGame(latest.current.difficulty), day, slot, completed: day * slotsPerDay + slot,
      assignments: spreadAssignments(day + slot), schoolVisited: day + slot > 0 };
    changeScene(next);
    setDebugMenu(false);
  };

  const demoEnd = (key: Ending) => {
    ended.current = false;
    flagsSent.current = false;
    changeScene(demoEnding(latest.current, key));
    setDebugMenu(false);
  };

  const teen = teenById.get(selected) ?? camp.teens[0];
  const showPause = paused || (sitePaused && !hidden);
  const main = state.phase === 'plan' || state.phase === 'watch' || state.phase === 'review';
  return <>
    <header className="topbar">
      <div className="brand"><CompassLogo/><div><strong>Компас</strong><small>ЛЕТНЯЯ СМЕНА</small></div></div>
      <div className="top-title"><span /> Профессия · педагог-психолог</div>
      <div className="top-tools">
        {debug && <button onClick={() => setDebugMenu(true)} className="debug-button">Отладка</button>}
        {standalone ? <button className="mode-button" onClick={() => setSettings(true)}>{nickname || levelLabels[state.difficulty]}</button> :
          <span className="mode-button">{nickname || levelLabels[state.difficulty]}</span>}
        <button className="tool" aria-label={muted ? 'Включить звук' : 'Выключить звук'} title="Звук" onClick={toggleMute}>{muted ? '♩' : '♫'}</button>
        <button className="tool" aria-label="Пауза" title="Пауза" onClick={() => setPaused(true)}>Ⅱ</button>
      </div>
    </header>
    <main className="workspace">
      <div className="field">
        <CampMap state={state} paused={blocked} selected={selected} armed={armed} focus={focus} setFocus={setFocus} world={world}
          inspect={inspect} onLoaded={loaded} assign={place} drag={drag} dragLive={dragLive} setDrag={setDrag} />
        <Roster state={state} selected={selected} inspect={id => {
          if (dragLive.current?.moved) return;
          inspect(id);
          if (state.phase === 'plan') {
            setArmed(id);
            setStatus('Щёлкни по мастерской, чтобы отправить участника.');
          }
        }} setDrag={setDrag} />
      </div>
      <Sidebar state={state} selected={teen} revealed={revealed} status={status} focus={focus} next={next} openSchool={openSchool} />
    </main>
    <DragGhost drag={drag} />
    {!(initialized && sceneReady) && <div className="boot"><b>Компас</b><p>Педагог-психолог · профконсультант</p><progress max="100" value={sceneReady ? 85 : initialized ? 60 : 35} aria-label="Загрузка" /></div>}
    {schoolOpen && !exited && <SchoolVisit finish={finishSchool} close={() => setSchoolOpen(false)} />}
    {initialized && !main && !exited && <>
      {state.phase === 'talk' && <Evening state={state} selected={teen} pick={select} ask={(id, q) => {
        audio.current.play('note'); apply(talk(latest.current, id, q), { save: true });
      }} next={changeScene} />}
      {state.phase === 'paths' && <Paths state={state} selected={teen} pick={select} change={(id, path) => {
        apply(recommend(latest.current, id, path), { save: true }); audio.current.play('drop');
      }} next={() => changeScene(presentPaths(latest.current))} />}
      {state.phase === 'rank' && <Dialog title="Таблица для родителей" sub="ДИРЕКТОР ЛАГЕРЯ">
        <p>«Поставьте ребят по местам. Родители хотят знать, кто показал лучший результат».</p>
        <div className="choices">
          <button onClick={() => changeScene(chooseRanking(latest.current, true))}><b>↧</b>Показать места</button>
          <button onClick={() => changeScene(chooseRanking(latest.current, false))}><b>✦</b>Обсудить личные маршруты</button>
        </div>
      </Dialog>}
      {state.phase === 'epilogue' && <EndingScreen state={state} next={() => changeScene({ ...latest.current, phase: 'quiz' })} />}
      {state.phase === 'quiz' && <SelfQuiz state={state} answer={axis => {
        audio.current.play('drop'); apply(answerPicture(latest.current, axis), { save: true });
      }} />}
      {state.phase === 'result' && <SelfResult state={state} exit={exit} restart={restart} />}
    </>}
    {settings && <Dialog title="Твоя смена" className="settings">
      <label>Имя или ник <input value={nickname} placeholder="Можно оставить пустым" maxLength={24} onChange={e => {
        nicknameRef.current = e.target.value; setNickname(e.target.value);
      }}/></label>
      <div className="difficulty-select" aria-label="Сложность">{levels.map(level => <button key={level} aria-pressed={state.difficulty === level}
        disabled={state.completed > 0 || state.phase !== 'plan'} onClick={() => {
          const start = createGame(level, state.seed);
          apply({ ...start, assignments: state.assignments, schoolVisited: state.schoolVisited }, { save: true });
        }}>{levelLabels[level]}</button>)}</div>
      <button className="primary" onClick={() => { persist(latest.current); setSettings(false); }}>К лагерю</button>
    </Dialog>}
    {debugMenu && initialized && <Dialog title="Отладка" className="wide debug-dialog">
      <div className="debug-grid">{camp.days.map((day, i) => <section key={day.title}><h3>День {i + 1}</h3>
        {slotNames.map((name, slot) => <button key={name} className="secondary" onClick={() => demoSlot(i, slot)}>{name}</button>)}</section>)}</div>
      <div className="debug-grid">{endings.map(ending => <button key={ending} data-testid={'ending-' + ending} className="secondary" onClick={() => demoEnd(ending)}>{meta.endings[ending]}</button>)}</div>
      <div className="dialog-actions"><button className="secondary" onClick={() => { setRevealed(!revealed); setDebugMenu(false); }}>{revealed ? 'Скрыть профили' : 'Раскрыть профили'}</button>
        <button className="primary" onClick={() => setDebugMenu(false)}>Закрыть</button></div>
    </Dialog>}
    {showPause && !exited && <Dialog title="Пауза" className="pause">
      <button className="primary" onClick={() => { setPaused(false); setSitePaused(false); }}>Продолжить</button>
      <button className="secondary sound-button" aria-label="Звук" aria-pressed={!muted} onClick={toggleMute}>Звук <span>{muted ? 'Выкл.' : 'Вкл.'}</span></button>
      <button className="secondary" onClick={exit}>Выйти в меню</button>
    </Dialog>}
    {exited && <Dialog title="Компас" sub="ЛЕТНЯЯ СМЕНА" className="pause">
      <button className="primary" onClick={() => setExited(false)}>Продолжить смену</button>
      <button className="secondary" onClick={restart}>Начать заново</button>
    </Dialog>}
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
