import * as THREE from 'three';
import { bus } from './core/events.js';
import { initInput, input, isTouch } from './core/input.js';
import { Player } from './core/player.js';
import { Interactor } from './core/interact.js';
import { game, newGame, restoreGame, loadLocalSave, clearLocalSave, save, unlock, diff } from './core/state.js';
import { platform } from './core/platform.js';
import { unlockAudio, setAmbience, setMuted, isMuted, suspendAudio } from './core/audio.js';
import { createHud } from './ui/hud.js';
import { createDialogue } from './ui/dialogue.js';
import { createScreens } from './ui/screens.js';
import { createTablet } from './ui/tablet.js';
import { createOffice } from './world/office.js';
import { createStation } from './world/station.js';
import { createChapter1, DEBUG_PRESETS, applyPreset } from './game/chapter1.js';
import { ENDINGS } from './content/meta.js';
import { createIntro } from './world/intro.js';
import { playIntro } from './game/introCutscene.js';
import career from './content/career.json';

const canvas = document.getElementById('view');
const uiRoot = document.getElementById('ui');
const DEBUG = new URLSearchParams(location.search).get('debug') === '1';

// ---------- Рендер ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isTouch, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.25 : 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const camera = new THREE.PerspectiveCamera(72, 1, 0.05, 300); // дальность 300 м: небо станции висит в 100 м, звёзды в 120 м
camera.rotation.order = 'YXZ';

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = w < h ? 85 : 72;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// ---------- Системы ----------
initInput(canvas);
const player = new Player(camera);
const interactor = new Interactor(camera);
const hud = createHud(uiRoot);
const dialogue = createDialogue(uiRoot);
const screens = createScreens(uiRoot);
hud.show(false);

// Блокировки управления: меню, диалог, планшет, катсцена, пауза, пауза от сайта.
const blockers = new Set(['menu']);
function block(name, on) {
  if (on) blockers.add(name);
  else blockers.delete(name);
  const free = blockers.size === 0;
  if (free !== input.enabled) {
    input.setEnabled(free);
    if (free && !isTouch) {
      try {
        canvas.requestPointerLock?.()?.catch?.(() => {});
      } catch {
        /* без жеста игрока захват не дадут: игрок кликнет сам */
      }
    }
  }
}
bus.on('dialogue:open', () => block('dialogue', true));
bus.on('dialogue:close', () => block('dialogue', false));
bus.on('tablet:open', () => block('tablet', true));
bus.on('tablet:close', () => block('tablet', false));

// ---------- Мир ----------
const worlds = {};
let world = null;
let sceneName = null;

// Освободить память видеокарты старой сцены. Общие геометрии и материалы
// после dispose() просто загрузятся заново при следующей отрисовке.
function disposeWorld(w) {
  if (!w) return;
  w.scene.traverse((o) => {
    o.geometry?.dispose?.();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      m.map?.dispose?.();
      m.dispose?.();
    }
  });
}

function buildWorlds() {
  disposeWorld(worlds.office);
  disposeWorld(worlds.station);
  worlds.office = createOffice();
  worlds.station = createStation();
}

function loadScene(name) {
  world = worlds[name];
  sceneName = name;
  world.scene.add(camera);
  player.colliders = world.colliders;
  interactor.setSlots(world.slots);
  game.state.scene = name;
  setAmbience(name);
  return world;
}

// ---------- Сценарий ----------
let chapter = null;
let tablet = null;
let playing = false;

const CALLBACKS = ['onReplay', 'onSubmitReport', 'onDocCheck', 'onHint', 'canHint', 'onCompare', 'onPlayRecording', 'onSaveEvidence', 'getReplayResult', 'isDocChecked'];
const tabletCallbacks = Object.fromEntries(CALLBACKS.map((k) => [k, (...a) => chapter?.tabletCallbacks?.[k]?.(...a)]));

const ctx = {
  camera,
  player,
  interactor,
  hud,
  dialogue,
  screens,
  block,
  loadScene,
  get world() {
    return world;
  },
  get sceneName() {
    return sceneName;
  },
  get tablet() {
    return tablet;
  },
  cutscene: false,
  finishChapter: () => endChapter(),
};

// ---------- Данные от сайта ----------
const session = { nickname: 'Тест', difficulty: 'normal', save: null };

function applyInit(data) {
  const nick = String(data?.nickname || '').trim().slice(0, 16);
  session.nickname = nick || 'Тест';
  session.difficulty = ['easy', 'normal', 'hard'].includes(data?.difficulty) ? data.difficulty : 'normal';
  game.platformFlags = data?.flags || {};
  setMuted(!!data?.muted);
  let s = data?.save || null;
  if (!s && platform.standalone) s = loadLocalSave();
  session.save = s && s.v === 1 && s.chapter === 1 && !s.flags?.chapter_done ? s : null;
}

platform.onCommand({
  pause: () => {
    block('external', true);
    suspendAudio(true);
  },
  resume: () => {
    block('external', false);
    suspendAudio(false);
  },
  mute: (m) => setMuted(m),
});

// ---------- Пауза (Esc): ровно три кнопки ----------
let paused = false;
async function openPause() {
  if (!playing || paused || blockers.has('menu') || blockers.has('cutscene')) return;
  if (dialogue.isOpen() || tablet?.isOpen()) return;
  paused = true;
  block('pause', true);
  const a = await screens.pause({
    muted: isMuted(),
    onSound: () => {
      setMuted(!isMuted());
      return isMuted();
    },
  });
  screens.close();
  paused = false;
  if (a === 'exit') {
    exitToMenu();
    return;
  }
  block('pause', false);
}
bus.on('input:pause', openPause);
document.addEventListener('pointerlockchange', () => {
  // Захват пришёл, когда ввод уже выключен (окно или меню успело открыться): отпускаем мышь.
  if (document.pointerLockElement && !input.enabled) {
    document.exitPointerLock();
    return;
  }
  // Esc в браузере снимает захват мыши без keydown: считаем это паузой.
  if (!document.pointerLockElement && input.enabled && !isTouch) openPause();
});
bus.on('input:tablet', () => {
  if (!tablet || tablet.isOpen() || blockers.size > 0) return;
  tablet.open(chapter?.preferredTab?.());
});

// ---------- Поток игры ----------
function stopChapter() {
  playing = false;
  chapter?.dispose?.();
  chapter = null;
  tablet?.close?.();
  setAmbience(null);
  hud.show(false);
  hud.setTimer(null);
  screens.clearFade();
  world = null;
}

// Номер текущего «потока» запуска: меню отладки или выход прерывают ролик, и старый поток не должен запускать главу.
let flowId = 0;
let introRun = null;

// Вступительный ролик о герое (только для новой игры). Возвращает false, если его прервали извне.
async function runIntro() {
  const my = flowId;
  const intro = createIntro();
  world = intro;
  sceneName = 'intro';
  intro.scene.add(camera);
  interactor.setSlots([]);
  ctx.cutscene = true;
  setAmbience(null);
  introRun = playIntro({ intro, camera, root: uiRoot, name: game.state.name, fade: () => screens.fadeOut() });
  await introRun.done;
  introRun = null;
  if (my !== flowId) return false;
  ctx.cutscene = false;
  world = null;
  disposeWorld(intro);
  return true;
}

async function showStart() {
  flowId += 1;
  const my = flowId;
  introRun?.skip();
  stopChapter();
  blockers.clear();
  block('menu', true);
  const load = screens.loading();
  load.setProgress(1);
  let fresh = false;
  for (;;) {
    const a = await load.askStart({ canContinue: !!session.save, name: session.nickname });
    if (a === 'continue') {
      restoreGame(session.save, session.nickname, session.difficulty);
    } else {
      clearLocalSave();
      newGame(session.nickname, session.difficulty);
      fresh = true;
    }
    break;
  }
  if (my !== flowId) return; // пока ждали кнопку, игру запустили из меню отладки
  screens.close();
  // Ролик о герое только при новой игре (при «Продолжить» его уже видели).
  if (fresh && !game.state.flags.intro_seen) {
    unlockAudio();
    const ok = await runIntro();
    if (!ok || my !== flowId) return; // ролик прервали меню отладки или выход
    game.state.flags.intro_seen = true;
  }
  await startChapter();
}

async function startChapter(rebuild = false) {
  unlockAudio();
  if (rebuild) buildWorlds();
  ctx.cutscene = false; // прошлая глава могла закрыться посреди катсцены (вступление, меню отладки)
  chapter = createChapter1(ctx);
  if (!tablet) tablet = createTablet(uiRoot, tabletCallbacks);
  tablet.refresh?.();
  hud.show(true);
  playing = true;
  await chapter.start();
  block('menu', false);
}

function exitToMenu() {
  if (game.state && world && !ctx.cutscene) game.state.pos = player.snapshot();
  if (game.state) {
    save(false);
    platform.saveNow(game.state);
    session.save = game.state.flags?.chapter_done ? null : JSON.parse(JSON.stringify(game.state));
  }
  platform.exit();
  stopChapter();
  buildWorlds(); // чистые сцены: при «Продолжить» состояние восстановится из сохранения
  showStart();
}

async function endChapter(forceEnding) {
  block('menu', true);
  playing = false;
  hud.show(false);
  hud.setTimer(null);
  const r = chapter.result(forceEnding);
  unlock('gl_chapter1');
  if ((game.state.hintsUsed || 0) === 0) unlock('gl_no_hints');
  game.state.flags.chapter_done = true;
  game.state.ending = r.ending;
  save(false);
  platform.saveNow(game.state);
  platform.end({ ending: r.ending, stars: r.stars, score: r.score, durationSec: r.durationSec, choices: r.choices });
  const a = await screens.chapterEnd({ ...r, career });
  screens.close();
  session.save = null;
  if (a === 'restart') {
    stopChapter();
    clearLocalSave();
    newGame(session.nickname, session.difficulty);
    await startChapter(true);
  } else {
    platform.exit();
    buildWorlds();
    showStart();
  }
}

// ---------- Цикл ----------
const clock = new THREE.Clock();
let saveTimer = 0;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  input.update();
  const frozen = blockers.has('external');
  if (world && !frozen) {
    if (!ctx.cutscene) player.update(dt);
    world.update(dt, t, player.pos);
    chapter?.update(dt, t);
    interactor.update();
    if (playing && !paused && game.state) game.state.playTime = (game.state.playTime || 0) + dt;
    saveTimer += dt;
    if (saveTimer > 4 && game.state && !ctx.cutscene) {
      saveTimer = 0;
      game.state.pos = player.snapshot();
      save(false);
    }
  }
  if (world) renderer.render(world.scene, camera);
  else renderer.clear();
  requestAnimationFrame(frame);
}

// Сайт может закрыть iframe без «Выйти в меню»: при скрытии страницы сразу отправляем сохранение.
function flushSave() {
  if (!game.state || !playing) return;
  if (world && !ctx.cutscene) game.state.pos = player.snapshot();
  save(false);
  platform.saveNow(game.state);
}
window.addEventListener('pagehide', flushSave);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushSave();
});

// ---------- Загрузка ----------
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

async function boot() {
  const load = screens.loading();
  load.setProgress(0.15, 'Загружаем движок…');
  await nextFrame();
  worlds.office = createOffice();
  load.setProgress(0.45, 'Строим офис студии…');
  await nextFrame();
  worlds.station = createStation();
  load.setProgress(0.75, 'Строим станцию…');
  await nextFrame();
  // Заранее компилируем шейдеры, чтобы не было рывка при входе в сцену.
  for (const w of Object.values(worlds)) {
    w.scene.add(camera);
    renderer.compile(w.scene, camera);
  }
  load.setProgress(0.95, 'Подключаемся…');
  requestAnimationFrame(frame);
  const init = await platform.waitInit();
  applyInit(init);
  load.setProgress(1);
  if (DEBUG) mountDebug();
  await showStart();
}

// ---------- Меню отладки (?debug=1) ----------
function debugNewState(preset) {
  flowId += 1;
  introRun?.skip();
  stopChapter();
  screens.close();
  blockers.clear();
  block('menu', true);
  buildWorlds();
  clearLocalSave();
  newGame(session.nickname, session.difficulty);
  applyPreset(game.state, preset);
}

function mountDebug() {
  const el = document.createElement('div');
  el.className = 'debug-menu';
  el.innerHTML = `<button data-t>DEBUG (F2)</button><div class="debug-panel hidden">
    <b>Перейти к сцене</b>
    ${DEBUG_PRESETS.map(([id, label]) => `<button data-p="${id}">${label}</button>`).join('')}
    <b>Получить концовку</b>
    ${Object.entries(ENDINGS)
      .map(([id, e]) => `<button data-e="${id}">${e.title} (${id})</button>`)
      .join('')}
    <b>Сложность</b>
    ${['easy', 'normal', 'hard'].map((d) => `<button data-d="${d}">${d}</button>`).join('')}
  </div>`;
  uiRoot.appendChild(el);
  const panel = el.querySelector('.debug-panel');
  // Пока мышь захвачена игрой, клики уходят в холст: меню открывается клавишей F2 и отпускает мышь.
  const setOpen = (open) => {
    panel.classList.toggle('hidden', !open);
    block('debug', open);
  };
  window.addEventListener('keydown', (e) => {
    if (e.code === 'F2') {
      e.preventDefault();
      setOpen(panel.classList.contains('hidden'));
    }
  });
  el.addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.t !== undefined) {
      setOpen(panel.classList.contains('hidden'));
      return;
    }
    setOpen(false);
    if (b.dataset.d) {
      session.difficulty = b.dataset.d;
      if (game.state) game.state.difficulty = b.dataset.d;
      hud.toast(`Сложность: ${diff().label}`);
      return;
    }
    if (b.dataset.p) {
      debugNewState(b.dataset.p);
      await startChapter();
      return;
    }
    if (b.dataset.e) {
      debugNewState('door');
      await startChapter();
      if (b.dataset.e === 'gl_ch1_thorough') game.state.evidence.chalk_note = true;
      endChapter(b.dataset.e);
    }
  });
}

// Отладочный доступ для автопрохождения: только при ?debug=1 или в режиме разработки.
if (import.meta.env.DEV || DEBUG) {
  window.__glitch = {
    ctx,
    game,
    player,
    get chapter() {
      return chapter;
    },
    get tablet() {
      return tablet;
    },
    cb: tabletCallbacks,
    blockers,
    interact(id) {
      const h = interactor.handlers[id];
      if (!h) throw new Error(`нет обработчика ${id}`);
      return h.onUse();
    },
    teleport(x, z, yaw = player.yaw) {
      player.place({ x, z, yaw });
    },
  };
}

boot();
