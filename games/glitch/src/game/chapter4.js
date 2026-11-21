// Глава 4. «Последняя сборка» (финал). Ретест исправления 0.9.8, итоговый отчёт, решение о релизе, журнал Лиса.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { game, diff, flag, setFlag, logAction, pushChat, save, decide, unlock, freshCh4 } from '../core/state.js';
import { platform } from '../core/platform.js';
import { sfx } from '../core/audio.js';
import { input, isTouch } from '../core/input.js';
import { D4, CHAT4, HINTS4, RETEST, COMMANDS4, ENDINGS4, PROGRESS4 } from '../content/chapter4.js';
import { createMarker } from './marker.js';
import { ACHIEVEMENTS } from '../content/meta.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function pointIn(z, p) {
  return !!z && p.x > z.minX && p.x < z.maxX && p.z > z.minZ && p.z < z.maxZ;
}

export function createChapter4(ctx) {
  const { player, hud, dialogue, screens, camera, panels } = ctx;
  const S = () => game.state;
  const C4 = () => {
    const s = S();
    if (!s.ch4) s.ch4 = freshCh4();
    return s.ch4;
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
  const chat = (key) => pushChat(...CHAT4[key]);
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
  // Вопрос с вариантами: индекс ответа или -1, если игрок вышел из разговора
  async function ask(who, text, answers) {
    let picked = -1;
    await talk([{ who, text, options: answers.map((a, i) => ({ text: a, onPick: () => (picked = i) })) }]);
    return picked;
  }

  // ---------- Фонарь и журнал (как в главе 3) ----------
  let handLantern = null;
  let lanternHeld = false;
  let inArchive = false;
  let run = null;
  let journalGone = false;
  function showHandLantern(on) {
    if (!handLantern) {
      handLantern = ctx.world.api.makeHandLantern();
      camera.add(handLantern);
    }
    handLantern.children.forEach((c) => {
      if (!c.isLight) c.visible = on;
    });
    handLantern.userData.baseIntensity = on ? 3.4 : 0;
    handLantern.userData.light.intensity = on ? 3.4 : 0;
  }
  function setLantern(on) {
    lanternHeld = on;
    ctx.world.api.setLanternOnHook(!on);
    showHandLantern(on);
  }
  function removeHandLantern() {
    if (handLantern) {
      camera.remove(handLantern);
      handLantern = null;
    }
    lanternHeld = false;
  }

  // ---------- Ретест ----------
  const verdictCount = () => Object.keys(C4().verdicts).length;
  function evidence(id) {
    if (C4().evidence[id]) return;
    C4().evidence[id] = true;
    const r = RETEST.find((x) => x.id === id);
    hud.toast(`Ретест: есть результат для «${r.claim}»`, { kind: 'evidence' });
    panels.hypo.refresh?.(retestItems());
    save();
    refreshObjective();
  }
  function retestItems() {
    return RETEST.map((r) => ({ id: r.id, claim: r.claim, hint: r.hint, evidence: C4().evidence[r.id] ? r.proof : null, verdict: C4().verdicts[r.id] || null }));
  }
  function openRetest() {
    panels.hypo.open({
      items: retestItems(),
      labels: { title: 'Ретест сборки 0.9.8', item: 'Пункт', lead: 'Проверь исправление Тимура по чек-листу. Вердикт можно вынести, когда есть результат проверки.' },
      onVerdict: (id, v) => {
        const r = RETEST.find((x) => x.id === id);
        if (v !== r.truth) {
          S().mistakes = (S().mistakes || 0) + 1;
          C4().retestMiss = true;
          sfx.fail();
          save();
          return { ok: false, message: 'Посмотри на результат проверки ещё раз: он говорит о другом.' };
        }
        C4().verdicts[id] = v;
        sfx.success();
        if (id === 'r3') unlock('gl_regression');
        if (verdictCount() >= 2) setFlag('retest_2');
        if (verdictCount() === RETEST.length) {
          setFlag('retest_done');
          if (!C4().retestMiss) unlock('gl_retest');
          later(400, () => {
            panels.hypo.close();
            chatOnce('retestDone');
            later(1500, () => chatOnce('nikita'));
            talk(D4.retestDone);
          });
        }
        save();
        refreshObjective();
        return { ok: true, message: v === 'true' ? 'Верно: этот пункт исправлен.' : 'Верно: этот пункт не исправлен.' };
      },
    });
  }

  // ---------- Консоль ----------
  async function runCommand(id) {
    if (ctx.sceneName !== 'station') return ['Консоль работает только внутри сборки.'];
    const w = ctx.world;
    logAction('console', { text: `Консоль: ${COMMANDS4.find((c) => c.id === id)?.label || id}` });
    switch (id) {
      case 'help':
        return COMMANDS4.map((c) => `${c.label.padEnd(13)} ${c.desc}`);
      case 'world.reset':
        w.api.resetState();
        w.api.openServiceDoor();
        setLantern(false);
        journalGone = false;
        w.api.setJournalVisible(true);
        hud.glitch({ sound: false });
        return ['Станция сброшена: журнал на стойке, фонарь на крюке, архив закрыт.'];
      case 'item.lantern':
        setLantern(!lanternHeld);
        sfx.pickup();
        return [lanternHeld ? 'Фонарь у тебя в руке.' : 'Фонарь убран на крюк.'];
      case 'tp.archive': {
        if (!w.api.isArchiveOpen()) w.api.openArchiveDoor();
        const z = w.zones.archive;
        player.place({ x: (z.minX + z.maxX) / 2, z: (z.minZ + z.maxZ) / 2, yaw: -Math.PI / 2 });
        return ['Ты в архиве.'];
      }
      case 'tp.hall':
        player.place(w.points.lisTalk);
        return ['Ты у стойки Лиса.', journalGone ? 'Журнала на стойке нет.' : 'Журнал на стойке.'];
      case 'autotest.log':
        evidence('r1');
        return [
          '22.11 09:12:40  СБОРКА  0.9.8 «исправление переноса» (т.сафин)',
          '22.11 09:12:41  AT-08  очистка сохранений после миграции  ОТКЛЮЧЁН',
          '22.11 09:12:41  ПЕРЕНОС  источник снимка: профиль tester_02 (0.9.3)',
        ];
      case 'retest':
        panels.console.close();
        later(50, openRetest);
        return ['Открываю чек-лист ретеста…'];
      default:
        return ['Неизвестная команда.'];
    }
  }
  function openConsole() {
    if (ctx.sceneName !== 'station' || !input.enabled || busy) return;
    panels.console.open({ commands: COMMANDS4, onRun: runCommand });
  }

  // ---------- Итоговый отчёт и решение ----------
  function evidenceList() {
    const s = S();
    return [
      { text: 'Запись повтора: исчезновение журнала (глава 1)', ok: !!s.evidence?.replay_journal },
      { text: 'Отчёт #0412 Никиты (глава 1)', ok: !!s.evidence?.report_0412 },
      { text: 'Таблица сравнения сборок (глава 2)', ok: !!s.prev?.[2]?.flags?.rows_done },
      { text: 'Автотест AT-08: журнал стёрт у 3 из 3 (глава 3)', ok: !!s.prev?.[3]?.flags?.autotest_done },
      { text: 'Ретест 0.9.8: причина не исправлена, память Лиса стёрта', ok: !!flag('retest_done') },
    ];
  }
  async function runReport() {
    const list = evidenceList();
    const n = list.filter((e) => e.ok).length;
    const text = `${D4.reportIntro.text} ${list.map((e) => `${e.ok ? '✓' : '·'} ${e.text}`).join('. ')}. Улик: ${n} из ${list.length}.`;
    if (!(await talk([{ who: 'system', text }]))) return;
    const to = await ask('me', D4.askTo, D4.toOptions);
    if (to < 0) return;
    const rec = await ask('me', D4.askRec, D4.recOptions);
    if (rec < 0) return;
    C4().to = ['both', 'timur', 'nikita'][to];
    C4().rec = rec === 0 ? 'delay' : 'ship';
    C4().evidenceCount = n;
    decide('gl_ch4_to', C4().to);
    decide('gl_ch4_rec', C4().rec);
    decide('gl_ch4_evidence', n);
    setFlag('report_sent');
    sfx.message();
    save();
    await talk(D4.sent);
    refreshObjective();
  }
  async function lisFinal() {
    if (!(await talk(D4.lisFinal))) return;
    const i = await ask('me', D4.askLis, D4.lisOptions);
    if (i < 0) return;
    const saved = i === 0;
    C4().savedLis = saved;
    decide('gl_ch4_saved_lis', saved);
    if (saved) unlock('gl_saved_lis');
    await talk(saved ? D4.lisSaved : D4.lisNot);
    setFlag('lis_done');
    save();
    finish();
  }

  // ---------- Задачи ----------
  const keyConsole = () => (isTouch ? 'кнопка «Консоль»' : 'клавиша Ё');
  function goal() {
    const o = ctx.world?.objects || {};
    const slot = (id) => ctx.world?.slots.find((s) => s.id === id)?.object;
    if (flag('report_sent')) return { id: 'lis', text: 'Поговори с Лисом напоследок', target: o.lis };
    if (flag('retest_done')) return { id: 'report', text: 'Собери итоговый отчёт у терминала дежурного', target: o.terminal };
    if (flag('on_station')) return { id: 'retest', text: `Пройди чек-лист ретеста 0.9.8 в консоли (${keyConsole()}). Пунктов: ${verdictCount()} из ${RETEST.length}` };
    if (flag('met_team')) return { id: 'launch', text: 'Сядь за свой компьютер и запусти сборку 0.9.8', target: slot('pc') };
    return { id: 'meet', text: 'Поговори с Тимуром: он выпустил исправление', target: o.timur };
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
  async function fadeTo(fn, caption = '', sub = '') {
    Object.values(panels).forEach((pn) => pn.close?.());
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    marker.hide();
    await screens.fadeOut(caption, sub);
    fn();
    ctx.cutscene = false;
    await screens.fadeIn();
    ctx.block('cutscene', false);
  }
  function enterOffice(pos) {
    removeHandLantern();
    const w = ctx.loadScene('office');
    player.place(pos || w.spawn);
    ctx.interactor.setHandlers(officeHandlers());
    bus.emit('touch:ch3', false);
    hud.setBuild(null);
    marker.reset();
    refreshObjective();
  }
  function enterStation(pos) {
    removeHandLantern();
    const w = ctx.loadScene('station');
    w.api.setBuild?.('0.9.5'); // 0.9.8: Тимур починил скамейку (обещал в главе 1), остальное как в 0.9.7
    w.api.resetState();
    w.api.openServiceDoor();
    journalGone = false;
    w.api.setJournalVisible(true);
    player.place(pos || w.spawn);
    inArchive = pointIn(w.zones.archive, player.pos);
    if (inArchive) w.api.openArchiveDoor();
    ctx.interactor.setHandlers(stationHandlers());
    bus.emit('touch:ch3', true);
    hud.setBuild('0.9.8');
    if (!flag('on_station')) setFlag('on_station');
    marker.reset();
    refreshObjective();
  }

  function officeHandlers() {
    return {
      timur: {
        label: 'Поговорить с Тимуром',
        onUse: async () => {
          if (flag('met_team')) return talk(D4.timurLater);
          if (await talk(D4.timur)) setFlag('met_team');
        },
      },
      irina: { label: 'Поговорить с Ириной', onUse: () => talk(flag('met_irina4') ? D4.irinaLater : D4.irina).then((ok) => ok && setFlag('met_irina4')) },
      pc: {
        label: 'Запустить сборку 0.9.8',
        onUse: async () => {
          if (!flag('met_team')) return talk([{ who: 'me', text: 'Сначала узнаю у Тимура, что он исправил.' }]);
          if (!(await talk([D4.pcLaunch]))) return;
          await fadeTo(() => enterStation(null), 'Станция Рассвет', 'Сборка 0.9.8 · исправление');
          later(400, () => talk(D4.stationStart));
          later(1500, () => chatOnce('console'));
        },
      },
      whiteboard: { label: 'Доска', onUse: () => talk([{ who: 'me', text: 'На доске свежая надпись Ирины: «Не верь на слово. Проверь».' }]) },
      coffee: { label: 'Кофемашина', onUse: () => talk([{ who: 'me', text: 'Записку Никиты кто-то оставил на месте. И правильно.' }]) },
    };
  }
  function stationHandlers() {
    return {
      lis: {
        label: 'Поговорить с Лисом',
        onUse: async () => {
          if (flag('report_sent')) return lisFinal();
          if (await talk(D4.lisStranger)) evidence('r3');
        },
      },
      bench: {
        label: 'Осмотреть скамейку',
        onUse: async () => {
          if (await talk([{ who: 'me', text: 'Скамейка стоит на полу. Тимур её всё-таки починил.' }])) evidence('r0');
        },
      },
      terminal: {
        label: 'Терминал дежурного',
        onUse: () => {
          if (flag('retest_done') && !flag('report_sent')) return runReport();
          if (flag('report_sent')) return talk([{ who: 'me', text: 'Отчёт отправлен. Осталось поговорить с Лисом.' }]);
          return talk([{ who: 'me', text: 'Сначала проверю исправление по чек-листу.' }]);
        },
      },
      service_door: { label: 'Комната Никиты', onUse: () => talk([{ who: 'me', text: 'Сегодня всё нужное здесь, на станции.' }]) },
    };
  }

  async function finish() {
    if (finishing) return;
    finishing = true;
    ctx.cutscene = true;
    ctx.block('cutscene', true);
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

  // ---------- Подписки ----------
  function sendProgress() {
    let cur = PROGRESS4[0];
    for (const pr of PROGRESS4) if (pr[0] === 'start' || flag(pr[0])) cur = pr;
    platform.progress(cur[1], cur[2]);
  }
  unsubs.push(
    bus.on('flag', sendProgress),
    bus.on('achievement', (id) => hud.toast(`Достижение: ${ACHIEVEMENTS[id] || id}`, { kind: 'evidence' })),
    bus.on('input:console', () => {
      if (panels.console.isOpen()) panels.console.close();
      else openConsole();
    }),
  );

  // ---------- Кадр ----------
  function update(dt, t = 0) {
    if (disposed || ctx.cutscene || !ctx.world) {
      marker.hide();
      return;
    }
    const w = ctx.world;
    const p = player.pos;
    const remain = (diff().shiftSec4 || diff().shiftSec) - (S().playTime || 0);
    hud.setTimer(remain);
    if (ctx.sceneName === 'station') {
      const inside = pointIn(w.zones.archive, p);
      if (inside !== inArchive) {
        inArchive = inside;
        if (inside) run = { lantern: lanternHeld, journal: !journalGone };
        else if (run) {
          if (!run.journal) hud.toast('Журнала уже нет на стойке. Сначала верни мир командой world.reset.');
          else if (run.lantern && lanternHeld) {
            journalGone = true;
            w.api.setJournalVisible(false, { glitch: true });
            hud.glitch();
            hud.toast('С фонарём журнал всё равно пропал. Исправление не помогло.');
            evidence('r2');
          } else hud.toast('Без фонаря журнал на месте. Проверь с фонарём (item.lantern).');
          run = null;
        }
      }
    }
    const g = goal();
    if (g.id !== stage) {
      stage = g.id;
      stageTime = 0;
    }
    stageTime += dt;
    if (diff().autoHints && stageTime > diff().autoHintDelay && HINTS4[g.id] && !flag(`auto_${g.id}`)) {
      setFlag(`auto_${g.id}`);
      pushChat('irina', HINTS4[g.id]);
    }
    marker.update(t, g.target, diff().markers, w.scene);
    refreshObjective();
  }

  const tabletCallbacks = {
    onReplay() {
      hud.toast('Сегодня проверяй исправление через консоль.');
    },
    async onSubmitReport() {
      return { status: 'rejected', message: 'Итоговый отчёт собирается у терминала дежурного.' };
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
      const text = HINTS4[g.id] || g.text;
      pushChat('irina', text);
      return text;
    },
    onCompare() {},
    onPlayRecording() {},
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
      const spot = s.debugSpawn;
      delete s.debugSpawn;
      if (s.scene === 'station') enterStation(spot ? ctx.loadScene('station').points[spot] : s.pos);
      else enterOffice(s.pos);
      if (!flag('started')) {
        setFlag('started');
        ctx.cutscene = true;
        await screens.fadeOut('Глава 4. Последняя сборка', '9:30. Демонстрация в 10:00');
        await wait(1500);
        if (disposed) return;
        ctx.cutscene = false;
        await screens.fadeIn();
        pushChat('system', 'Глава 4. Последняя сборка');
        later(300, () => talk(D4.start));
        later(2500, () => chat('start'));
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
      const c = C4();
      const n = c.evidenceCount ?? 0;
      const ending =
        forceEnding ||
        (c.rec === 'ship' || n < 3 ? 'gl_ch4_not_reproduced' : c.to === 'timur' ? 'gl_ch4_quiet_fix' : c.to === 'nikita' ? 'gl_ch4_alone' : 'gl_ch4_reproduced');
      if (ending === 'gl_ch4_reproduced') unlock('gl_best_ending');
      const durationSec = Math.round(s.playTime || 0);
      const shift = d.shiftSec4 || d.shiftSec;
      const starRules = [
        { text: 'Глава пройдена', done: true },
        { text: d.mistakesForStar === 0 ? 'Ни одной ошибки в ретесте' : `Ошибок в ретесте: не больше ${d.mistakesForStar}`, done: (s.mistakes || 0) <= d.mistakesForStar },
        { text: `Уложился до демонстрации: ${Math.round(shift / 60)} мин`, done: durationSec <= shift },
      ];
      const stars = starRules.filter((r) => r.done).length;
      if (stars === 3) unlock('gl_three_stars');
      const timeBonus = Math.round((Math.max(0, shift - durationSec) / shift) * 300);
      const score = Math.max(0, 600 + n * 80 + (ending === 'gl_ch4_reproduced' ? 200 : 0) - (s.mistakes || 0) * 75 + timeBonus);
      if (s.decisions.gl_ch4_saved_lis === undefined) decide('gl_ch4_saved_lis', false);
      decide('gl_ch4_ending', ending);
      const meta = ENDINGS4[ending];
      return {
        starRules,
        chapterNo: 4,
        ending,
        endingTitle: meta.title,
        characters: meta.heroes(s.decisions),
        stars,
        score,
        durationSec,
        choices: Object.entries(s.decisions).map(([key, value]) => ({ key, value })),
        teaser: `Финал: «${meta.title}». ${meta.note} Спасибо, что прошёл смену до конца.`,
        skillsUsed: [
          { text: 'Проверил исправление по чек-листу (ретест): что починили, а что нет', done: flag('retest_done') },
          { text: 'Нашёл регрессию: исправление сломало память Лиса', done: !!c.verdicts.r3 },
          { text: 'Собрал итоговый отчёт из улик всех глав', done: flag('report_sent') },
          { text: 'Дал рекомендацию о релизе', done: flag('report_sent') },
        ],
      };
    },
    dispose() {
      disposed = true;
      timers.forEach(clearTimeout);
      unsubs.forEach((u) => u());
      marker.dispose();
      removeHandLantern();
      Object.values(panels).forEach((p) => p.close?.());
      hud.setBuild(null);
      bus.emit('touch:ch3', false);
    },
  };
}

// ---------- Меню отладки (?debug=1) ----------
export const DEBUG_PRESETS4 = [
  ['ch4_start', 'Глава 4: офис'],
  ['ch4_station', 'Глава 4: станция, ретест'],
  ['ch4_report', 'Глава 4: ретест пройден'],
  ['ch4_lis', 'Глава 4: отчёт отправлен'],
];
const PRESET4_STEPS = {
  ch4_start: () => {},
  ch4_station: (s) => {
    Object.assign(s.flags, { started: true, met_team: true, on_station: true });
    s.scene = 'station';
    s.debugSpawn = 'lisTalk';
  },
  ch4_report: (s) => {
    s.ch4.evidence = { r0: true, r1: true, r2: true, r3: true };
    s.ch4.verdicts = { r0: 'true', r1: 'true', r2: 'false', r3: 'false' };
    Object.assign(s.flags, { retest_2: true, retest_done: true });
    s.debugSpawn = 'terminalView';
  },
  ch4_lis: (s) => {
    Object.assign(s.ch4, { to: 'both', rec: 'delay', evidenceCount: 5 });
    s.flags.report_sent = true;
    s.debugSpawn = 'lisTalk';
  },
};
export function applyPreset4(s, name) {
  for (const [id] of DEBUG_PRESETS4) {
    PRESET4_STEPS[id](s);
    if (id === name) break;
  }
  return s;
}
