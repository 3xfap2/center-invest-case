// Глава 2. «Комната, которой нет». Сценарий по docs/CHAPTER2_SPEC.md.
// Механика: переключатель сборок (Q) и таблица сравнения (C): регрессия и поиск сборки, где появилась ошибка.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { game, diff, flag, setFlag, logAction, pushChat, save, decide, unlock } from '../core/state.js';
import { platform } from '../core/platform.js';
import { sfx } from '../core/audio.js';
import { input, isTouch } from '../core/input.js';
import { D2, CHAT2, HINTS2, ROWS, BUILDS, ENDINGS2, PROGRESS2 } from '../content/chapter2.js';
import { rowFound } from '../ui/compare.js';
import { createMarker } from './marker.js';
import { ACHIEVEMENTS } from '../content/meta.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = new THREE.Vector3();

function distTo(obj, p) {
  if (!obj) return Infinity;
  obj.getWorldPosition(tmp);
  return Math.hypot(tmp.x - p.x, tmp.z - p.z);
}

export function createChapter2(ctx) {
  const { player, hud, dialogue, screens, compare } = ctx;
  const S = () => game.state;
  const C2 = () => {
    const s = S();
    if (!s.ch2) s.ch2 = { build: '0.9.7', obs: {}, hasSwitcher: false };
    return s.ch2;
  };
  const unsubs = [];
  const timers = [];
  const marker = createMarker();
  let disposed = false;
  let busy = false;
  let finishing = false;
  let stage = '';
  let stageTime = 0;
  let lastObjective = '';

  const later = (ms, fn) => {
    timers.push(
      setTimeout(() => {
        if (!disposed) fn();
      }, ms),
    );
  };
  const chat = (key) => pushChat(...CHAT2[key]);
  const chatOnce = (key) => {
    if (flag(`chat_${key}`)) return;
    setFlag(`chat_${key}`);
    chat(key);
  };

  async function talk(nodes) {
    if (busy) return false;
    busy = true;
    let ok = false;
    try {
      ok = await dialogue.play(nodes);
    } finally {
      busy = false;
    }
    refreshObjective();
    return ok;
  }

  // Выбор варианта в диалоге: возвращает индекс выбранного ответа.
  async function ask(who, text, answers) {
    let picked = -1;
    await talk([{ who, text, options: answers.map((a, i) => ({ text: a, onPick: () => (picked = i) })) }]);
    return picked;
  }

  // ---------- Сборки ----------
  const build = () => C2().build;

  function applyBuild() {
    const w = ctx.world;
    if (!w) return;
    w.api.setBuild?.(build());
    hud.setBuild(C2().hasSwitcher ? build() : null);
    if (ctx.sceneName === 'station') w.api.setJournalVisible(build() === '0.9.5');
    compare.refresh();
  }

  function switchBuild() {
    if (!C2().hasSwitcher || busy || ctx.cutscene || !input.enabled || finishing) return;
    const i = BUILDS.indexOf(build());
    C2().build = BUILDS[(i + 1) % BUILDS.length];
    applyBuild();
    hud.glitch();
    logAction('switch_build', { text: `Переключил сборку на ${build()}` });
    if (!flag('first_switch')) {
      setFlag('first_switch');
      later(500, () => talk(D2.firstSwitch));
      later(1500, () => chatOnce('switchTip'));
    }
    save();
    refreshObjective();
  }

  // ---------- Таблица сравнения ----------
  const foundCount = () => ROWS.filter((r) => rowFound(C2().obs, r)).length;

  function observe(rowId) {
    const obs = C2().obs;
    obs[rowId] = obs[rowId] || {};
    if (obs[rowId][build()]) return false;
    const row = ROWS.find((r) => r.id === rowId);
    const wasFound = rowFound(obs, row);
    obs[rowId][build()] = true;
    logAction('observe', { text: `${row.label} в ${build()}: ${row.values[build()]}` });
    hud.toast(`Таблица: ${row.label}, ${build()}: ${row.values[build()]}`);
    compare.refresh();
    if (!wasFound && rowFound(obs, row)) {
      sfx.success();
      hud.toast(`Различие найдено: ${row.label}`, { kind: 'evidence' });
      chatOnce('rowFound');
      const n = foundCount();
      if (n >= 2) setFlag('rows_2');
      if (n >= diff().rowsNeeded && !flag('rows_done')) {
        setFlag('rows_done');
        later(1200, () => chat('allRows'));
      }
      if (n === ROWS.length) unlock('gl_all_diffs');
    }
    save();
    refreshObjective();
    return true;
  }

  // ---------- Задачи, маркер, подсказки ----------
  const keyQ = () => (isTouch ? 'кнопка «Сборка»' : 'Q');
  const keyC = () => (isTouch ? 'кнопка «Таблица»' : 'C');
  const ROW_TARGET = { bench: 'bench', clock: 'clock', lis: 'lis', journal: 'journal', door: 'serviceDoor' };

  function goal() {
    const o = ctx.world?.objects || {};
    const inDiag = ctx.sceneName === 'diagnostic';
    if (flag('call_done')) {
      if (!inDiag) return { id: 'note', text: 'Вернись в комнату за служебным выходом', target: o.serviceDoor };
      if (build() !== '0.9.3') return { id: 'note', text: `Переключи сборку на 0.9.3 (${keyQ()}) и найди надпись на стене` };
      return { id: 'note', text: 'Прочитай надпись на стене', target: o.hiddenNote };
    }
    if (flag('rows_done')) {
      if (inDiag) return { id: 'call', text: 'Выйди на станцию к терминалу дежурного', target: o.exitDoor };
      return { id: 'call', text: 'Подойди к терминалу дежурного', target: o.terminal };
    }
    if (inDiag) {
      if (!C2().hasSwitcher && !flag('read_board')) return { id: 'wake', text: 'Осмотрись: прочитай записки на доске', target: o.noteWall };
      if (!C2().hasSwitcher) return { id: 'take', text: 'Возьми прибор с подставки', target: o.switcher };
      if (!flag('first_switch')) return { id: 'switch', text: `Переключи сборку: ${keyQ()}` };
      return { id: 'exit', text: 'Выйди на станцию и сравни её в трёх сборках', target: o.exitDoor };
    }
    const next = ROWS.find((r) => !rowFound(C2().obs, r));
    return {
      id: 'compare',
      text: `Сравни станцию в разных сборках (${keyQ()}). Различий: ${foundCount()} из ${diff().rowsNeeded}. Таблица: ${keyC()}`,
      target: next ? o[ROW_TARGET[next.id]] : null,
    };
  }

  function refreshObjective() {
    if (disposed) return;
    const text = goal().text;
    if (text !== lastObjective) {
      lastObjective = text;
      hud.setObjective(text);
    }
  }

  // ---------- Сцены ----------
  async function fadeTo(fn, caption = '') {
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    marker.hide();
    await screens.fadeOut(caption);
    fn();
    ctx.cutscene = false;
    await screens.fadeIn();
    ctx.block('cutscene', false);
  }

  function enterDiag(pos) {
    const w = ctx.loadScene('diagnostic');
    player.place(pos || w.spawn);
    if (C2().hasSwitcher) w.api.takeSwitcher?.();
    ctx.interactor.setHandlers(diagHandlers());
    applyBuild();
    marker.reset();
    refreshObjective();
  }

  function enterStation(pos) {
    const w = ctx.loadScene('station');
    w.api.resetState();
    w.api.openServiceDoor();
    player.place(pos || w.points.serviceReturn || w.spawn);
    ctx.interactor.setHandlers(stationHandlers());
    applyBuild();
    marker.reset();
    if (!flag('on_station')) setFlag('on_station');
    refreshObjective();
  }

  // ---------- Диагностическая комната ----------
  function diagHandlers() {
    const w = ctx.world;
    return {
      note_wall: {
        label: 'Прочитать записки',
        onUse: async () => {
          if (await talk(D2.noteWall)) setFlag('read_board');
        },
      },
      switcher: {
        label: 'Взять прибор',
        enabled: () => !C2().hasSwitcher,
        onUse: async () => {
          C2().hasSwitcher = true;
          w.api.takeSwitcher?.();
          setFlag('has_switcher');
          unlock('gl_switcher');
          sfx.pickup();
          bus.emit('touch:ch2', true);
          applyBuild();
          save();
          await talk(D2.switcher);
        },
      },
      at_terminal: { label: 'Терминал автотестов', onUse: () => talk(D2.atTerminal) },
      exit_door: {
        label: 'Выйти на станцию',
        enabled: () => C2().hasSwitcher,
        onUse: () => fadeTo(() => enterStation(null)),
      },
      hidden_note: {
        label: 'Прочитать надпись',
        enabled: () => build() === '0.9.3' && flag('call_done'),
        onUse: async () => {
          if (!(await talk(D2.hiddenNote))) return; // вышел: записку можно перечитать
          setFlag('note_read');
          decide('gl_ch2_read_at08', true);
          finish();
        },
      },
    };
  }

  // ---------- Станция ----------
  function stationHandlers() {
    return {
      lis: {
        label: 'Поговорить с Лисом',
        onUse: async () => {
          observe('lis');
          if (build() === '0.9.3') {
            if ((await talk(D2.lis093)) && !flag('met_stranger')) {
              setFlag('met_stranger');
              decide('gl_ch2_met_stranger', true);
              unlock('gl_stranger');
            }
            return;
          }
          return talk(build() === '0.9.5' ? D2.lis095 : D2.lis097);
        },
      },
      bench: {
        label: 'Осмотреть скамейку',
        onUse: () => {
          observe('bench');
          return talk(D2.bench[build()]);
        },
      },
      clock: {
        label: 'Осмотреть часы',
        onUse: () => {
          observe('clock');
          return talk(D2.clock[build()]);
        },
      },
      journal: {
        label: 'Осмотреть журнал',
        onUse: () => {
          observe('journal');
          return talk([{ who: 'me', text: D2.journal[build()] }]);
        },
      },
      service_door: {
        label: 'Войти в комнату',
        onUse: () => fadeTo(() => enterDiag(null)),
      },
      terminal: {
        label: 'Терминал дежурного',
        onUse: () => {
          if (flag('rows_done') && !flag('call_done')) return runCall();
          if (flag('call_done')) return talk([{ who: 'me', text: 'Звонок окончен. Надо вернуться в комнату Никиты.' }]);
          return talk([{ who: 'system', text: `ТЕРМИНАЛ ДЕЖУРНОГО. Таблица сравнения: ${foundCount()} из ${diff().rowsNeeded}. Продолжи сравнение.` }]);
        },
      },
    };
  }

  // ---------- Вывод: звонок Ирины и Тимура ----------
  // Звонок засчитывается только целиком: если игрок вышел, в следующий раз он начнётся заново.
  async function runCall() {
    if (!(await talk(D2.callIntro))) return;
    const c = C2();
    for (;;) {
      const i = await ask('irina', D2.quiz1, ['0.9.3', '0.9.5', '0.9.7']);
      if (i === 1) break;
      if (i < 0) return;
      c.q1miss = true;
      S().mistakes = (S().mistakes || 0) + 1;
      sfx.fail();
      save();
      if (!(await talk([{ who: 'irina', text: D2.quiz1Wrong[i === 0 ? '0.9.3' : '0.9.7'] }]))) return;
    }
    decide('gl_ch2_bisect_first_try', !c.q1miss);
    if (!c.q1miss) unlock('gl_bisect');
    sfx.success();
    if (!(await talk(D2.quiz1Right))) return;
    for (;;) {
      const i = await ask('irina', D2.quiz2, ['Часы', 'Скамейка', 'Журнал']);
      if (i === 0) break;
      if (i < 0) return;
      c.q2miss = true;
      S().mistakes = (S().mistakes || 0) + 1;
      sfx.fail();
      save();
      if (!(await talk([{ who: 'irina', text: D2.quiz2Wrong }]))) return;
    }
    if (!c.q2miss) unlock('gl_feature_check');
    if (!(await talk(D2.quiz2Right))) return;
    if (!(await talk(D2.callEnd))) return;
    setFlag('call_done');
    save();
    refreshObjective();
  }

  async function finish() {
    if (finishing) return;
    finishing = true;
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    hud.glitch();
    await wait(600);
    if (disposed) return;
    await screens.fadeOut('', '');
    if (disposed) return; // главу уже сменили (меню отладки)
    setFlag('chapter_done');
    ctx.cutscene = false;
    ctx.finishChapter();
    ctx.block('cutscene', false);
    await screens.fadeIn();
  }

  // ---------- Прогресс ----------
  function sendProgress() {
    let cur = PROGRESS2[0];
    for (const pr of PROGRESS2) if (pr[0] === 'start' || flag(pr[0])) cur = pr;
    platform.progress(cur[1], cur[2]);
  }
  unsubs.push(
    bus.on('flag', sendProgress),
    bus.on('input:switch', switchBuild),
    bus.on('achievement', (id) => hud.toast(`Достижение: ${ACHIEVEMENTS[id] || id}`, { kind: 'evidence' })),
    bus.on('input:compare', () => {
      if (compare.isOpen()) compare.close();
      else if (C2().hasSwitcher && input.enabled) compare.open();
    }),
  );
  compare.setSource(() => ({ obs: C2().obs, build: build(), need: diff().rowsNeeded }));

  // ---------- Кадр ----------
  function update(dt, t = 0) {
    if (disposed || ctx.cutscene || !ctx.world) {
      marker.hide();
      return;
    }
    const p = player.pos;
    const w = ctx.world;
    const remain = (diff().shiftSec2 || diff().shiftSec) - (S().playTime || 0);
    hud.setTimer(remain);
    if (remain < 0 && !flag('shift_over')) {
      setFlag('shift_over');
      pushChat('irina', 'Уже поздно. Ничего, доделай спокойно.');
    }
    // К стойке и к служебному выходу достаточно подойти: наблюдение записывается само.
    if (ctx.sceneName === 'station' && !busy && input.enabled) {
      if (distTo(w.objects.journal, p) < 2.4 && !C2().obs.journal?.[build()]) {
        observe('journal');
        hud.toast(D2.journal[build()]);
      }
      if (distTo(w.objects.serviceDoor, p) < 2.6 && !C2().obs.door?.[build()]) {
        observe('door');
        hud.toast(D2.door[build()]);
      }
    }
    if (ctx.sceneName === 'diagnostic' && w.objects.hiddenNote && !flag('call_done')) w.objects.hiddenNote.visible = false;
    if (!flag('rows_done') && foundCount() >= diff().rowsNeeded) setFlag('rows_done');
    const g = goal();
    if (g.id !== stage) {
      stage = g.id;
      stageTime = 0;
    }
    stageTime += dt;
    if (diff().autoHints && stageTime > diff().autoHintDelay && HINTS2[g.id] && !flag(`auto_${g.id}`)) {
      setFlag(`auto_${g.id}`);
      pushChat('irina', HINTS2[g.id]);
    }
    marker.update(t, g.target, diff().markers, w.scene);
    refreshObjective();
  }

  const tabletCallbacks = {
    onReplay() {
      hud.toast('Повтор нужен был в главе 1. Здесь сравнивай сборки.');
    },
    async onSubmitReport() {
      return { status: 'rejected', message: 'В этой главе отчёт не нужен: собери таблицу сравнения сборок.' };
    },
    onDocCheck() {},
    canHint() {
      const d = diff();
      return d.hints > 0 && S().hintsUsed < d.hints;
    },
    onHint() {
      if (!tabletCallbacks.canHint()) return null;
      S().hintsUsed += 1;
      const g = goal();
      const text = HINTS2[g.id] || g.text;
      pushChat('irina', text);
      return text;
    },
    onCompare() {},
    onPlayRecording() {
      hud.toast('Запись Никиты уже просмотрена. Здесь сравнивай сборки.');
    },
    onSaveEvidence() {},
    getReplayResult() {
      return S().replay || null;
    },
    isDocChecked(id) {
      return id === 'clock' && !!S().prev?.[1]?.flags?.clock_checked;
    },
  };

  return {
    tabletCallbacks,
    async start() {
      const s = S();
      platform.resetProgress();
      sendProgress();
      bus.emit('touch:ch2', !!C2().hasSwitcher);
      const spot = s.debugSpawn;
      delete s.debugSpawn;
      if (s.scene === 'station') enterStation(spot ? ctx.loadScene('station').points[spot] : s.pos);
      else enterDiag(spot ? ctx.loadScene('diagnostic').points[spot] : s.pos);
      if (!flag('started')) {
        setFlag('started');
        ctx.cutscene = true;
        await screens.fadeOut('Глава 2. Комната, которой нет', 'За служебным выходом');
        await wait(1500);
        if (disposed) return;
        ctx.cutscene = false;
        await screens.fadeIn();
        pushChat('system', 'Глава 2. Комната, которой нет');
        later(300, () => talk(D2.wake));
        later(2500, () => chat('start'));
        later(6000, () => chat('timurNoRoom'));
      }
      refreshObjective();
    },
    update,
    preferredTab() {
      return undefined;
    },
    result(forceEnding) {
      const s = S();
      const d = diff();
      const rows = foundCount();
      const ending = forceEnding || (rows === ROWS.length && (s.mistakes || 0) === 0 ? 'gl_ch2_thorough' : 'gl_ch2_standard');
      const durationSec = Math.round(s.playTime || 0);
      const shift = d.shiftSec2 || d.shiftSec;
      const starRules = [
        { text: 'Глава пройдена', done: true },
        { text: d.mistakesForStar === 0 ? 'Ни одной ошибки в ответах' : `Ошибок в ответах: не больше ${d.mistakesForStar}`, done: (s.mistakes || 0) <= d.mistakesForStar },
        { text: `Уложился в смену: ${Math.round((shift) / 60)} мин`, done: durationSec <= (shift) },
      ];
      const stars = starRules.filter((r) => r.done).length;
      const timeBonus = Math.round((Math.max(0, shift - durationSec) / shift) * 300);
      const score = Math.max(0, 500 + rows * 80 + (s.decisions.gl_ch2_bisect_first_try ? 150 : 0) - (s.mistakes || 0) * 75 + timeBonus);
      decide('gl_ch2_rows_found', rows);
      if (s.decisions.gl_ch2_met_stranger === undefined) decide('gl_ch2_met_stranger', false);
      if (s.decisions.gl_ch2_bisect_first_try === undefined) decide('gl_ch2_bisect_first_try', false);
      decide('gl_ch2_ending', ending);
      if (stars === 3) unlock('gl_three_stars');
      const meta = ENDINGS2[ending];
      return {
        starRules,
        chapterNo: 2,
        ending,
        endingTitle: meta.title,
        characters: meta.heroes(s.decisions),
        stars,
        score,
        durationSec,
        choices: Object.entries(s.decisions).map(([key, value]) => ({ key, value })),
        teaser: 'Дальше: глава 3. След предыдущего тестировщика.',
        skillsUsed: [
          { text: 'Сравнил три версии одной локации (регрессионное тестирование)', done: rows >= d.rowsNeeded },
          { text: 'Нашёл сборку, где появилась причина ошибки', done: flag('call_done') },
          { text: 'Отличил изменение по документации от бага', done: flag('call_done') },
          { text: 'Собрал наблюдения в таблицу сравнения', done: rows >= 2 },
        ],
      };
    },
    dispose() {
      disposed = true;
      timers.forEach(clearTimeout);
      unsubs.forEach((u) => u());
      marker.dispose();
      compare.close();
      hud.setBuild(null);
      bus.emit('touch:ch2', false);
    },
  };
}

// ---------- Меню отладки (?debug=1) ----------
export const DEBUG_PRESETS2 = [
  ['ch2_start', 'Глава 2: комната'],
  ['ch2_switcher', 'Глава 2: прибор взят'],
  ['ch2_station', 'Глава 2: станция'],
  ['ch2_table', 'Глава 2: таблица собрана'],
  ['ch2_call', 'Глава 2: после звонка'],
];

const ALL_OBS = Object.fromEntries(ROWS.map((r) => [r.id, { '0.9.3': true, '0.9.5': true, '0.9.7': true }]));
const PRESET2_STEPS = {
  ch2_start: () => {},
  ch2_switcher: (s) => {
    Object.assign(s.flags, { started: true, read_board: true, has_switcher: true, first_switch: true });
    s.ch2.hasSwitcher = true;
  },
  ch2_station: (s) => {
    s.flags.on_station = true;
    s.scene = 'station';
    s.debugSpawn = 'serviceReturn';
  },
  ch2_table: (s) => {
    s.ch2.obs = JSON.parse(JSON.stringify(ALL_OBS));
    Object.assign(s.flags, { rows_2: true, rows_done: true });
    s.debugSpawn = 'terminalView';
  },
  ch2_call: (s) => {
    s.flags.call_done = true;
    s.scene = 'diagnostic';
    s.ch2.build = '0.9.3';
    s.debugSpawn = 'hiddenNote';
  },
};

// Применить шаги главы 2 до выбранного включительно (состояние уже переведено в главу 2).
export function applyPreset2(s, name) {
  for (const [id] of DEBUG_PRESETS2) {
    PRESET2_STEPS[id](s);
    if (id === name) break;
  }
  return s;
}
