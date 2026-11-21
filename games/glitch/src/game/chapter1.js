// Глава 1. Первый рабочий день. Сценарий по docs/CHAPTER1_SPEC.md.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { game, diff, flag, setFlag, logAction, addEvidence, pushChat, save, decide, unlock } from '../core/state.js';
import { platform } from '../core/platform.js';
import { ACHIEVEMENTS, PROGRESS, ENDINGS } from '../content/meta.js';
import { sfx, setAmbience } from '../core/audio.js';
import { input, isTouch } from '../core/input.js';
import { D, CHAT, HINTS } from '../content/dialogues.js';
import { ACTION_TEXT, JOURNAL_BUG_STEPS } from '../content/actions.js';
import { REPORT_SUBJECTS, EVIDENCE_ITEMS } from '../content/reports.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = new THREE.Vector3();

function pointIn(z, p) {
  return !!z && p.x > z.minX && p.x < z.maxX && p.z > z.minZ && p.z < z.maxZ;
}

function distTo(obj, p) {
  if (!obj) return Infinity;
  obj.getWorldPosition(tmp);
  return Math.hypot(tmp.x - p.x, tmp.z - p.z);
}

// Модель бага: журнал пропадает, если выйти из архива с фонарём, с которым туда вошёл.
function simulate(ids) {
  let held = false;
  let carried = false;
  let gone = false;
  for (const id of ids) {
    if (id === 'take_lantern') held = true;
    else if (id === 'return_lantern') held = false;
    else if (id === 'enter_archive') carried = held;
    else if (id === 'exit_archive') {
      if (carried && held) gone = true;
      carried = false;
    }
  }
  const extra = ids.length !== JOURNAL_BUG_STEPS.length || ids.some((id, i) => id !== JOURNAL_BUG_STEPS[i]);
  return { ok: gone, extra };
}

function nikitaReport() {
  return {
    id: '0412',
    title: 'Журнал путешественников исчезает со стойки',
    subject: 'journal',
    steps: [...JOURNAL_BUG_STEPS],
    expected: 'journal_stays',
    actual: 'journal_vanishes',
    severity: 'high',
    attachment: true,
    status: 'closed_cnr',
    author: 'n.orlov',
    profile: 'tester_02',
    date: '24.10',
    build: '0.9.6',
    closedBy: 'qa-lead',
    comments: [
      { from: 'qa-lead', text: 'Повторила по шагам на тестовом стенде. Журнал на месте. Не воспроизводится.' },
      { from: 'n.orlov', text: 'Если тебе тоже сказали, что это невозможно, сохрани запись до следующего обновления.' },
    ],
    foreign: true,
    compare: null,
  };
}

export function createChapter1(ctx) {
  const { player, hud, dialogue, screens, camera } = ctx;
  const S = () => game.state;
  const unsubs = [];
  const timers = [];
  let disposed = false;

  let handLantern = null;
  let inArchive = false;
  let carriedIn = false;
  let chalkShown = false;
  let busy = false;
  let finishing = false;
  let lisIdleIdx = 0;
  let stage = '';
  let stageTime = 0;
  let finalRemind = 0;

  const later = (ms, fn) => {
    timers.push(
      setTimeout(() => {
        if (!disposed) fn();
      }, ms),
    );
  };

  function chat(key) {
    const [from, text] = CHAT[key];
    pushChat(from, text.replace('{tabletKey}', isTouch ? 'кнопка «Планшет» справа' : 'клавиша Tab'));
  }
  function chatOnce(key) {
    const f = `chat_${key}`;
    if (flag(f)) return;
    setFlag(f);
    chat(key);
  }

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
  // Кто сам заговаривает при приближении: после выхода из разговора ждём, пока игрок отойдёт.
  const autoMuted = new Set();

  // ---------- Задачи и подсказки ----------
  const tabKey = () => (isTouch ? 'кнопка «Планшет»' : 'Tab');
  const tablet = () => (isTouch ? '«Планшет»' : 'Планшет (Tab)');
  const actKey = () => (isTouch ? 'кнопку «Действие»' : 'E');
  const slotObj = (id) => ctx.world?.slots.find((x) => x.id === id)?.object || null;

  // Текущий шаг главы: текст задачи, объект для маркера и подсказка Ирины.
  function goal() {
    const o = ctx.world?.objects || {};
    if (S().scene === 'office') {
      if (!flag('met_irina')) return { id: 'office_irina', text: 'Подойди к Ирине и поговори с ней', target: o.irina };
      return { id: 'office_pc', text: 'Сядь за свой компьютер у окна и запусти сборку', target: slotObj('pc') };
    }
    if (flag('door_opened')) return { id: 'door', text: 'Обернись. Служебный выход открыт. Подойди к нему', target: o.serviceDoor };
    if (flag('final_logged')) return { id: 'final', text: `Открой ${isTouch ? '«Планшет»' : 'планшет (Tab)'}: в журнале действий новая запись` };
    if (flag('evidence_saved')) return { id: 'wait', text: 'Постой у терминала. Смена почти закончилась', target: o.terminal };
    if (flag('compared')) return { id: 'save', text: 'Подойди к терминалу дежурного и сохрани доказательства', target: o.terminal };
    if (flag('dup_found'))
      return { id: 'compare', text: `${tablet()}, вкладка «Трекер»: открой отчёт #0412 и нажми «Сравнить с моим»` };
    if (flag('journal_reported')) return { id: 'compare', text: 'Отчёт принят. Трекер ищет похожие отчёты…' };
    if (flag('replay_ok'))
      return {
        id: 'report',
        text: `${tablet()}, «Трекер», «Новый отчёт»: выбери «Журнал путешественников», нажми «Подставить шаги из повтора», заполни поля и отправь`,
      };
    if (flag('journal_gone'))
      return {
        id: 'replay',
        text: diff().strict
          ? 'Журнал исчез. Найди в журнале действий, что к этому привело, и воспроизведи ошибку'
          : `Журнал исчез. ${tablet()}, вкладка «Журнал»: отметь «Взял фонарь», «Вошёл в архив», «Вышел из архива» и нажми «Воспроизвести выбранное»`,
      };
    if (!flag('met_lis')) return { id: 'lis', text: 'Подойди к будке смотрителя и поговори с Лисом', target: o.lis };
    if (!flag('lantern_held')) return { id: 'lantern', text: 'Возьми фонарь с крюка у будки', target: o.lantern };
    if (inArchive) return { id: 'archive_out', text: 'Ты в архиве. Теперь выйди обратно в зал', target: o.archiveDoor };
    if (!ctx.world.api.isArchiveOpen()) return { id: 'archive', text: 'Открой дверь архива и зайди внутрь с фонарём', target: o.archiveDoor };
    return { id: 'archive', text: 'Зайди в архив с фонарём', target: o.archiveDoor };
  }

  function objective() {
    return goal().text;
  }

  // Маркер над целью: жёлтый ромб, виден сквозь стены. На сложном уровне его нет.
  const marker = (() => {
    const m = new THREE.MeshBasicMaterial({ color: 0xf2c94c, depthTest: false, depthWrite: false, transparent: true, opacity: 0.92 });
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.22, 4), m);
    top.position.y = 0.11;
    const bottom = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 4), m);
    bottom.rotation.x = Math.PI;
    bottom.position.y = -0.15;
    g.add(top, bottom);
    g.traverse((x) => (x.renderOrder = 999));
    g.visible = false;
    return g;
  })();
  const markerBox = new THREE.Box3();
  let markerTarget = null;
  let markerTop = new THREE.Vector3();

  function updateMarker(t, target) {
    const w = ctx.world;
    const show = !!target && diff().markers && !ctx.cutscene && !!w;
    if (!show) {
      marker.visible = false;
      return;
    }
    if (marker.parent !== w.scene) w.scene.add(marker);
    if (target !== markerTarget) {
      markerTarget = target;
      markerBox.setFromObject(target);
      markerBox.getCenter(markerTop);
      markerTop.y = Math.min(markerBox.max.y, 2.4) + 0.45;
    }
    marker.visible = true;
    marker.position.set(markerTop.x, markerTop.y + Math.sin(t * 3) * 0.07, markerTop.z);
    marker.rotation.y = t * 1.5;
  }

  let lastObjective = '';
  function refreshObjective() {
    if (disposed) return;
    const text = objective();
    if (text !== lastObjective) {
      lastObjective = text;
      hud.setObjective(text);
    }
  }

  // ---------- Фонарь ----------
  // Фонарь в руке крепится к камере один раз за вход на станцию и дальше только включается и выключается.
  // Свет не удаляем и не прячем: иначе браузер перестраивает шейдеры и картинка дёргается.
  const LANTERN_POWER = 3.4;
  function showHandLantern(on) {
    if (!handLantern) {
      handLantern = ctx.world.api.makeHandLantern();
      camera.add(handLantern);
    }
    handLantern.children.forEach((c) => {
      if (!c.isLight) c.visible = on;
    });
    handLantern.userData.baseIntensity = on ? LANTERN_POWER : 0;
    handLantern.userData.light.intensity = on ? LANTERN_POWER : 0;
  }
  function setLantern(held) {
    ctx.world.api.setLanternOnHook(!held);
    showHandLantern(held);
    setFlag('lantern_held', held);
  }
  function removeHandLantern() {
    if (handLantern) {
      camera.remove(handLantern);
      handLantern = null;
    }
  }

  // ---------- Сцены ----------
  function enterOffice(pos) {
    removeHandLantern();
    const w = ctx.loadScene('office');
    player.place(pos || w.spawn);
    ctx.interactor.setHandlers(officeHandlers());
    refreshObjective();
  }

  function applyStationState() {
    const w = ctx.world;
    w.api.resetState();
    if (flag('journal_gone')) w.api.setJournalVisible(false);
    if (flag('archive_open')) w.api.openArchiveDoor();
    setLantern(flag('lantern_held'));
    chalkShown = !!S().evidence.chalk_note;
    if (chalkShown) w.api.setChalkVisible(true);
    if (flag('door_opened')) w.api.openServiceDoor();
    else w.api.closeServiceDoor?.();
  }

  function enterStation(pos) {
    removeHandLantern(); // мир мог пересоздаться: берём фонарь текущей станции
    const w = ctx.loadScene('station');
    player.place(pos || w.spawn);
    applyStationState();
    inArchive = pointIn(w.zones.archive, player.pos);
    carriedIn = inArchive && flag('lantern_held');
    ctx.interactor.setHandlers(stationHandlers());
    refreshObjective();
  }

  async function goStation() {
    setFlag('pc_used');
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    await screens.fadeOut('Станция Рассвет', 'Сборка 0.9.7 · релиз-кандидат · профиль tester_02');
    await wait(1300);
    enterStation(null);
    ctx.cutscene = false;
    await screens.fadeIn();
    ctx.block('cutscene', false);
    if (!flag('entered_station')) {
      setFlag('entered_station');
      logAction('enter_station');
      later(900, () => chat('stationEnter'));
    }
    refreshObjective();
  }

  // ---------- Офис ----------
  async function irinaBrief() {
    if (await talk(D.irinaBrief)) setFlag('met_irina');
    else autoMuted.add('irina');
  }

  function officeHandlers() {
    return {
      irina: {
        label: 'Поговорить с Ириной',
        onUse: () => (flag('met_irina') ? talk(flag('pc_used') ? D.irinaLater : D.irinaAgain) : irinaBrief()),
      },
      timur: {
        label: 'Поговорить с Тимуром',
        onUse: async () => {
          if (flag('met_timur')) return talk(D.timurAgain);
          if (!(await talk(D.timurFirst))) return;
          setFlag('met_timur');
          unlock('gl_team');
        },
      },
      pc: {
        label: 'Сесть за компьютер',
        onUse: async () => {
          if (!flag('met_irina')) return talk(D.pcLocked);
          let launch = false;
          await talk([
            {
              who: 'system',
              text: 'Вход выполнен. Профиль: tester_02. Имя: {name}. Сборка: 0.9.7 (релиз-кандидат).',
              options: [{ text: 'Запустить сборку', onPick: () => (launch = true) }, { text: 'Позже' }],
            },
          ]);
          if (launch) goStation();
        },
      },
      whiteboard: { label: 'Прочитать доску', onUse: () => talk(D.whiteboard) },
      coffee: {
        label: 'Кофемашина',
        onUse: () => {
          unlock('gl_coffee');
          return talk(D.coffee);
        },
      },
    };
  }

  // ---------- Станция ----------
  async function lisIntro() {
    logAction('talk_lis');
    const answers = ['familiar', 'which_door', 'first_time'];
    const nodes = D.lisIntro.map((n) =>
      n.options ? { ...n, options: n.options.map((o, i) => ({ ...o, onPick: () => decide('gl_lis_first_answer', answers[i]) })) } : n,
    );
    if (!(await talk(nodes))) {
      autoMuted.add('lis');
      return;
    }
    setFlag('met_lis');
    later(900, () => chatOnce('lisName'));
  }

  async function talkLis() {
    if (!flag('met_lis')) return lisIntro();
    logAction('talk_lis');
    S().lisTalks = (S().lisTalks || 1) + 1;
    if (S().lisTalks >= 3) unlock('gl_lis_friend');
    if (flag('journal_gone') && !flag('lis_gone_talk')) {
      const nodes = [...D.lisAfterGone];
      if (diff().autoHints) nodes.splice(1, 0, D.lisAfterGoneHint);
      if (await talk(nodes)) setFlag('lis_gone_talk');
      return;
    }
    if (flag('evidence_saved')) return talk(D.lisAfterSaved);
    return talk(D.lisIdle[lisIdleIdx++ % D.lisIdle.length]);
  }

  function stationHandlers() {
    const w = ctx.world;
    return {
      lis: { label: 'Поговорить с Лисом', onUse: talkLis },
      lantern: {
        label: 'Взять фонарь',
        enabled: () => !flag('lantern_held'),
        onUse: () => {
          setLantern(true);
          logAction('take_lantern');
          sfx.pickup();
        },
      },
      hook: {
        label: 'Повесить фонарь на крюк',
        enabled: () => flag('lantern_held'),
        onUse: () => {
          setLantern(false);
          logAction('return_lantern');
          unlock('gl_careful');
          sfx.pickup();
        },
      },
      journal: {
        label: 'Осмотреть журнал',
        enabled: () => !flag('journal_gone'),
        onUse: () => {
          logAction('inspect_journal');
          talk(D.journal);
        },
      },
      archive_door: {
        label: 'Открыть дверь архива',
        enabled: () => !w.api.isArchiveOpen(),
        onUse: () => {
          w.api.openArchiveDoor();
          setFlag('archive_open');
          logAction('open_archive');
          sfx.door();
        },
      },
      service_door: {
        label: () => (flag('door_opened') ? 'Войти' : 'Открыть служебный выход'),
        onUse: () => {
          if (flag('door_opened')) return finish();
          sfx.locked();
          logAction('try_service_door');
          talk(D.serviceLocked);
        },
      },
      clock: {
        label: 'Осмотреть часы',
        onUse: () => {
          logAction('inspect_clock');
          setFlag('inspected_clock');
          if (flag('inspected_bench')) unlock('gl_side_bugs');
          talk(D.clock);
        },
      },
      bench: {
        label: 'Осмотреть скамейку',
        onUse: async () => {
          logAction('inspect_bench');
          setFlag('inspected_bench');
          if (flag('inspected_clock')) unlock('gl_side_bugs');
          await talk(D.bench);
          if (!flag('bench_reported')) chatOnce('benchGuide');
        },
      },
      terminal: {
        label: 'Терминал дежурного',
        onUse: () => {
          logAction('use_terminal');
          if (Object.keys(S().evidence).length === 0) return talk(D.terminalEmpty);
          ctx.tablet?.openTerminal();
        },
      },
      chalk_wall: {
        label: 'Рассмотреть надпись',
        enabled: () => chalkShown && !S().evidence.chalk_note,
        onUse: async () => {
          logAction('inspect_wall');
          await talk(D.chalk);
          addEvidence('chalk_note');
        },
      },
    };
  }

  function triggerJournalBug() {
    setFlag('journal_gone');
    ctx.world.api.setJournalVisible(false, { glitch: true });
    hud.glitch();
    setFlag('noticed_gone');
    later(700, () => talk(D.journalGone));
    refreshObjective();
  }

  // ---------- Повтор (катсцена) ----------
  async function playReplay(steps, { ok, badge }) {
    const w = ctx.world;
    ctx.tablet?.close?.();
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    await screens.fadeOut();
    const ov = document.createElement('div');
    ov.className = 'letterbox';
    ov.style.cssText = 'position:absolute;inset:0;pointer-events:none';
    ov.innerHTML = '<div class="replay-badge"></div><div class="replay-cap"></div>';
    ov.querySelector('.replay-badge').textContent = badge;
    const cap = ov.querySelector('.replay-cap');
    document.getElementById('ui').appendChild(ov);
    hud.show(false);
    showHandLantern(false);
    w.api.resetState();
    const look = new THREE.Vector3();
    const setCam = (c) => {
      if (!c) return;
      camera.position.set(...c.pos);
      look.set(...c.look);
      camera.lookAt(look);
    };
    setCam(w.cams.wide);
    await screens.fadeIn();
    for (let i = 0; i < steps.length; i++) {
      const id = steps[i];
      cap.textContent = `Шаг ${i + 1}/${steps.length}: ${ACTION_TEXT[id] || id}`;
      if (id === 'take_lantern') {
        setCam(w.cams.hook);
        await wait(500);
        w.api.setLanternOnHook(false);
        sfx.pickup();
        await wait(700);
      } else if (id === 'return_lantern') {
        setCam(w.cams.hook);
        await wait(500);
        w.api.setLanternOnHook(true);
        await wait(700);
      } else if (id === 'open_archive') {
        setCam(w.cams.archiveDoor);
        await wait(400);
        w.api.openArchiveDoor();
        sfx.door();
        await wait(800);
      } else if (id === 'enter_archive') {
        if (!w.api.isArchiveOpen()) w.api.openArchiveDoor();
        setCam(w.cams.archiveInside);
        await wait(1100);
      } else if (id === 'exit_archive') {
        setCam(w.cams.archiveDoor);
        await wait(1100);
      } else if (id === 'try_service_door' || id === 'use_terminal') {
        setCam(w.cams.serviceDoor);
        await wait(900);
      } else if (id === 'inspect_journal' || id === 'talk_lis') {
        setCam(w.cams.counter);
        await wait(900);
      } else {
        setCam(w.cams.wide);
        await wait(900);
      }
    }
    setCam(w.cams.counter);
    cap.textContent = 'Проверка: журнал на стойке?';
    await wait(1000);
    if (ok) {
      w.api.setJournalVisible(false, { glitch: true });
      hud.glitch();
      await wait(900);
      cap.textContent = 'Воспроизведено. Журнал исчез со стойки.';
      sfx.success();
    } else {
      cap.textContent = 'Не воспроизвелось. Журнал на месте.';
      sfx.fail();
    }
    await wait(1900);
    await screens.fadeOut();
    ov.remove();
    applyStationState();
    player.apply();
    ctx.cutscene = false;
    hud.show(true);
    await screens.fadeIn();
    ctx.block('cutscene', false);
  }

  // ---------- Отчёты ----------
  // Похожий отчёт появляется сразу, чтобы выход в меню не потерял его. С задержкой только сообщения.
  function addDuplicate() {
    const s = S();
    if (!s.reports.find((r) => r.id === '0412')) s.reports.push(nikitaReport());
    addEvidence('report_0412');
    setFlag('dup_found');
    bus.emit('reports');
  }
  function afterJournalAccepted() {
    addDuplicate();
    later(1200, () => chat('journalAccepted'));
    later(3400, () => {
      chat('duplicate');
      refreshObjective();
    });
  }

  async function submitReport(d) {
    const s = S();
    const subj = REPORT_SUBJECTS.find((x) => x.id === d.subject);
    const strict = diff().strict;
    let status = 'accepted';
    let message = '';
    let after = null;
    const ret = (who, text) => {
      status = 'returned';
      message = `Вернули на доработку. ${text}`;
      pushChat(who, text);
    };
    const already = (f) => ({ status: 'rejected', message: 'Такой отчёт уже есть в трекере.', f });

    if (!subj) return { status: 'returned', message: 'Выбери, о чём отчёт.' };

    if (d.subject === 'bench') {
      if (flag('bench_reported')) return already();
      if (d.expected !== 'bench_floor') ret('irina', 'Ожидаемое берём из документации, раздел 2: скамейки стоят на полу.');
      else if (d.actual !== 'bench_flying') ret('irina', 'Фактический результат опиши так, как видишь. Что именно со скамейкой не так?');
      else if (d.severity === 'high' || d.severity === 'critical' || (strict && d.severity !== 'low'))
        ret('irina', 'Скамейка мешает пройти игру? Нет. Серьёзность ниже.');
      else {
        setFlag('bench_reported');
        message = 'Принят. Тимур взял в работу.';
        after = () => later(1200, () => chat('benchOk'));
      }
    } else if (d.subject === 'clock') {
      if (flag('clock_rejected')) return already();
      status = 'rejected';
      message = 'Отклонён: так задумано. Документация, раздел 2.3.';
      setFlag('clock_rejected');
      after = () => {
        later(1000, () => chat('clockRejected1'));
        later(3000, () => chat('clockRejected2'));
      };
    } else if (d.subject === 'lis_name') {
      if (flag('lis_reported')) return already();
      setFlag('lis_reported');
      message = 'Принят. Тимур посмотрит.';
      after = () => later(1200, () => pushChat('timur', 'Имя из профиля, это нормально. А вот про прошлую сборку… странно. Посмотрю после релиза.'));
    } else if (d.subject === 'journal') {
      if (flag('journal_reported')) return already();
      const sim = simulate(d.steps || []);
      if (!flag('journal_gone') && !flag('replay_ok')) ret('timur', 'У меня журнал на месте. Что именно ты видел?');
      else if (!sim.ok) ret('timur', 'По твоим шагам у меня не воспроизводится. Проверь шаги повтором.');
      else if (!d.attachment || !flag('replay_ok')) {
        status = 'returned';
        message = 'Вернули на доработку. Нужна запись повтора.';
        chat('journalNoRepro');
      } else if (strict && sim.extra) ret('irina', 'В шагах лишнее. Оставь только то, без чего ошибка не повторяется.');
      else if (d.expected !== 'journal_stays') ret('irina', 'Сверься с документацией, раздел 3. Что там сказано про журнал?');
      else if (d.actual !== 'journal_vanishes') ret('irina', 'Фактический результат неточный. Что ты видел своими глазами?');
      else if (d.severity === 'low' || d.severity === 'medium') ret('irina', 'Игрок теряет сюжетный предмет и прогресс. Это выше, чем «низкая» или «средняя».');
      else if (strict && d.severity !== 'high') ret('irina', 'Игра не вылетает. Это высокая, а не критическая.');
      else {
        setFlag('journal_reported');
        message = 'Принят. Тимур смотрит.';
        after = afterJournalAccepted;
      }
    }

    if (status !== 'accepted') s.mistakes = (s.mistakes || 0) + 1;
    if (d.subject === 'journal' && status === 'returned') s.journalReturns = (s.journalReturns || 0) + 1;
    if (status === 'accepted') {
      unlock('gl_first_bug');
      if (d.subject === 'journal' && !s.journalReturns) unlock('gl_clean_report');
      if (d.subject === 'lis_name') decide('gl_reported_lis', true);
    }
    if (d.subject === 'clock') decide('gl_clock_trap', 'reported');
    if (status !== 'returned') {
      const mine = s.reports.filter((r) => !r.foreign).length;
      s.reports.push({
        id: String(418 + mine).padStart(4, '0'),
        title: subj.title,
        subject: d.subject,
        steps: d.steps || [],
        expected: d.expected,
        actual: d.actual,
        severity: d.severity,
        attachment: !!d.attachment,
        status,
        author: `tester_02 (${s.name})`,
        profile: 'tester_02',
        date: 'сегодня',
        closedBy: null,
        comments: status === 'rejected' && d.subject === 'clock' ? [{ from: 't.safin', text: 'Так задумано. См. документацию 2.3.' }] : [],
        foreign: false,
        compare: null,
      });
      bus.emit('reports');
      save();
      sfx.success();
    } else sfx.fail();
    after?.();
    refreshObjective();
    return { status, message };
  }

  // ---------- Финал ----------
  function triggerFinalLog() {
    setFlag('final_logged');
    logAction('door_other_side', { foreign: true });
    hud.glitch({ sound: false });
    sfx.glitch();
    hud.toast('Журнал действий: новая запись', { kind: 'evidence', ms: 8000 });
    finalRemind = 0;
    refreshObjective();
  }

  async function doorSequence() {
    setFlag('door_opened');
    await wait(1300);
    if (disposed) return;
    sfx.clickBehind();
    ctx.world.api.openServiceDoor();
    await wait(1000);
    await talk(D.doorBehind);
    refreshObjective();
  }

  async function finish() {
    if (finishing) return;
    finishing = true;
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    sfx.door();
    await screens.fadeOut('', '');
    setFlag('chapter_done');
    removeHandLantern();
    setAmbience(null);
    ctx.cutscene = false;
    ctx.finishChapter(); // сначала блокирует ввод меню итогов, иначе мышь снова захватится
    ctx.block('cutscene', false);
    await screens.fadeIn();
  }

  // ---------- Подписки ----------
  function sendProgress() {
    let cur = PROGRESS[0];
    for (const pr of PROGRESS) if (pr[0] === 'start' || flag(pr[0])) cur = pr;
    platform.progress(cur[1], cur[2]);
  }

  unsubs.push(
    bus.on('flag', sendProgress),
    bus.on('achievement', (id) => hud.toast(`Достижение: ${ACHIEVEMENTS[id] || id}`, { kind: 'evidence' })),
    bus.on('evidence', (id) => {
      if (id === 'chalk_note') unlock('gl_chalk');
      const it = EVIDENCE_ITEMS.find((e) => e.id === id);
      hud.toast(`Новая улика: ${it ? it.title : id}`, { kind: 'evidence' });
    }),
    bus.on('tablet:close', () => {
      if (S().scene !== 'station') return;
      if (flag('evidence_saved') && !flag('after_save_said')) {
        setFlag('after_save_said');
        later(400, () => talk(D.afterSave));
      }
      if (flag('final_logged') && !flag('door_opened')) doorSequence();
    }),
  );

  // ---------- Колбэки планшета ----------
  const tabletCallbacks = {
    async onReplay(ids) {
      if (ctx.sceneName !== 'station' || !ids?.length) return;
      const { ok, extra } = simulate(ids);
      const strictFail = ok && extra && diff().strict;
      await playReplay(ids, { ok, badge: 'ПОВТОР · профиль tester_02' });
      if (ok && !strictFail) {
        S().replay = { steps: [...ids], ok: true };
        if (!flag('replay_ok')) {
          setFlag('replay_ok');
          addEvidence('replay_journal');
          unlock('gl_reproduced');
          later(700, () => chat('replayOk'));
        }
      } else if (strictFail) {
        later(500, () => chat('replayExtra'));
      } else {
        hud.toast('Не воспроизвелось. Попробуй другой набор шагов.');
      }
      save();
      refreshObjective();
    },
    onSubmitReport: submitReport,
    onDocCheck(id) {
      if (id === 'clock' && !flag('clock_checked')) {
        setFlag('clock_checked');
        unlock('gl_not_a_bug');
        if (!flag('clock_rejected')) decide('gl_clock_trap', 'docs');
        later(600, () => chat('clockChecked'));
      }
    },
    canHint() {
      const d = diff();
      return d.hints > 0 && S().hintsUsed < d.hints;
    },
    onHint() {
      if (!tabletCallbacks.canHint()) return null;
      S().hintsUsed += 1;
      const g = goal();
      const text = HINTS[g.id] || g.text;
      pushChat('irina', text);
      return text;
    },
    onCompare(id) {
      const s = S();
      const r = s.reports.find((x) => x.id === id);
      if (!r) return;
      const mine = s.reports.find((x) => !x.foreign && x.subject === r.subject);
      const same = !!mine && mine.steps.join() === r.steps.join();
      r.compare = { matchSteps: same, matchProfile: true };
      bus.emit('reports');
      save();
      if (!flag('compared')) {
        setFlag('compared');
        addEvidence('profile_match');
        unlock('gl_duplicate');
        later(900, () => talk(D.compareRealize));
      }
      refreshObjective();
    },
    async onPlayRecording(id) {
      if (ctx.sceneName !== 'station') return;
      const r = S().reports.find((x) => x.id === id);
      await playReplay(r?.steps?.length ? r.steps : JOURNAL_BUG_STEPS, { ok: true, badge: 'ЗАПИСЬ n.orlov · сборка 0.9.6' });
      setFlag('nikita_played');
      unlock('gl_nikita_record');
      decide('gl_watched_nikita_record', true);
    },
    onSaveEvidence(ids) {
      S().savedEvidence = [...ids];
      decide('gl_saved_evidence', [...ids].sort());
      save();
      const enough = ids.includes('replay_journal') && ids.includes('report_0412');
      if (enough && flag('compared') && !flag('evidence_saved')) {
        setFlag('evidence_saved');
        unlock('gl_evidence');
        sfx.success();
        later(1500, () => chat('saved1'));
        later(4200, () => chat('saved2'));
      } else if (!enough && flag('compared')) {
        later(600, () => pushChat('irina', 'Сохрани и свою запись, и отчёт #0412. Одно без другого ничего не доказывает.'));
      }
      refreshObjective();
    },
    getReplayResult() {
      return S().replay || null;
    },
    isDocChecked(id) {
      return id === 'clock' && flag('clock_checked');
    },
  };

  // ---------- Кадр ----------
  function update(dt, t = 0) {
    if (disposed || ctx.cutscene || !ctx.world) {
      marker.visible = false;
      return;
    }
    const w = ctx.world;
    const p = player.pos;
    const free = input.enabled && !busy;

    // Время смены зависит от сложности. Опоздание не мешает пройти, но стоит звезды.
    const remain = diff().shiftSec - (S().playTime || 0);
    hud.setTimer(remain);
    if (remain < 0 && !flag('shift_over')) {
      setFlag('shift_over');
      pushChat('irina', 'Смена уже закончилась. Ничего, доделай спокойно.');
    }

    if (ctx.sceneName === 'office') {
      if (autoMuted.has('irina') && distTo(w.objects.irina, p) > 4) autoMuted.delete('irina');
      if (free && !flag('met_irina') && !autoMuted.has('irina') && distTo(w.objects.irina, p) < 3) irinaBrief();
      updateMarker(t, goal().target);
      refreshObjective();
      return;
    }

    // Переходы через дверь архива.
    const inside = pointIn(w.zones.archive, p);
    if (inside !== inArchive) {
      inArchive = inside;
      if (inside) {
        logAction('enter_archive');
        carriedIn = flag('lantern_held');
      } else {
        logAction('exit_archive');
        if (carriedIn && flag('lantern_held') && !flag('journal_gone')) triggerJournalBug();
        carriedIn = false;
      }
    }

    // Надпись мелом видна только в свете фонаря у дальней стены архива.
    if (!S().evidence.chalk_note) {
      const chalkSlot = w.slots.find((s) => s.id === 'chalk_wall');
      const want = inside && flag('lantern_held') && distTo(chalkSlot?.object, p) < 2.6;
      if (want !== chalkShown) {
        chalkShown = want;
        w.api.setChalkVisible(want);
      }
    }

    if (autoMuted.has('lis') && distTo(w.objects.lis, p) > 4.5) autoMuted.delete('lis');
    if (free && !flag('met_lis') && !autoMuted.has('lis') && distTo(w.objects.lis, p) < 3.2) lisIntro();

    // Автоподсказки: если игрок долго стоит на одном шаге, Ирина пишет сама.
    const g = goal();
    if (g.id !== stage) {
      stage = g.id;
      stageTime = 0;
    }
    stageTime += dt;
    if (diff().autoHints && stageTime > diff().autoHintDelay && HINTS[g.id] && !flag(`auto_${g.id}`)) {
      setFlag(`auto_${g.id}`);
      pushChat('irina', HINTS[g.id]);
    }
    updateMarker(t, g.target);
    refreshObjective();

    // Финал: игрок стоит у терминала после сохранения доказательств.
    if (flag('evidence_saved') && !flag('final_logged') && free && flag('after_save_said')) {
      const tv = w.points.terminalView;
      if (Math.hypot(p.x - tv.x, p.z - tv.z) < 3 && player.stillTime > 1.5) triggerFinalLog();
    }
    if (flag('final_logged') && !flag('door_opened')) {
      finalRemind += dt;
      if (finalRemind > 20) {
        finalRemind = 0;
        hud.toast(isTouch ? 'Журнал действий: новая запись. Открой планшет.' : 'Журнал действий: новая запись. Tab, чтобы открыть.', { kind: 'evidence' });
      }
    }
  }

  return {
    tabletCallbacks,
    async start() {
      const s = S();
      platform.resetProgress();
      if (flag('journal_reported') && !flag('dup_found')) addDuplicate(); // старое сохранение
      sendProgress();
      if (s.scene === 'station') {
        const spot = s.debugSpawn ? ctx.loadScene('station').points[s.debugSpawn] : null;
        delete s.debugSpawn;
        enterStation(spot || s.pos);
      } else {
        enterOffice(s.pos);
        if (!s.pos) {
          ctx.cutscene = true;
          await screens.fadeOut('Студия «Ноль-Один». 21:40', 'Первый рабочий день. Релиз завтра.');
          await wait(900);
          if (disposed) return; // главу уже перезапустили из меню
          ctx.cutscene = false;
          await screens.fadeIn();
        }
      }
      refreshObjective();
    },
    update,
    preferredTab() {
      return flag('final_logged') && !flag('door_opened') ? 'log' : undefined;
    },
    // Итог главы для сайта и финального экрана. forceEnding: из меню отладки.
    result(forceEnding) {
      const s = S();
      const d = diff();
      const ev = s.evidence;
      const evCount = EVIDENCE_ITEMS.filter((e) => ev[e.id]).length;
      const ending = forceEnding || (ev.chalk_note && evCount === EVIDENCE_ITEMS.length ? 'gl_ch1_thorough' : 'gl_ch1_standard');
      const durationSec = Math.round(s.playTime || 0);
      const inTime = durationSec <= d.shiftSec;
      const careful = !!ev.chalk_note || flag('clock_checked');
      const starRules = [
        { text: 'Глава пройдена', done: true },
        { text: d.mistakesForStar === 0 ? 'Ни одной ошибки в отчётах' : `Ошибок в отчётах: не больше ${d.mistakesForStar}`, done: (s.mistakes || 0) <= d.mistakesForStar },
        { text: `Уложился в смену: ${Math.round((d.shiftSec) / 60)} мин`, done: durationSec <= (d.shiftSec) },
      ];
      const stars = starRules.filter((r) => r.done).length;
      const timeBonus = Math.round(Math.max(0, d.shiftSec - durationSec) / d.shiftSec * 300);
      const score = Math.max(
        0,
        500 + evCount * 100 + (flag('clock_checked') ? 150 : 0) - (s.mistakes || 0) * 75 + timeBonus,
      );
      // Решения для следующих глав фиксируем в конце, даже если игрок их не трогал.
      decide('gl_reported_lis', !!flag('lis_reported'));
      decide('gl_chalk_found', !!ev.chalk_note);
      decide('gl_watched_nikita_record', !!flag('nikita_played'));
      if (!s.decisions.gl_clock_trap) decide('gl_clock_trap', 'none');
      decide('gl_ch1_ending', ending);
      if (evCount === EVIDENCE_ITEMS.length) unlock('gl_all_evidence');
      if ((s.mistakes || 0) === 0) unlock('gl_perfect');
      if (durationSec > 0 && durationSec <= 360) unlock('gl_fast');
      if (stars === 3) unlock('gl_three_stars');
      const meta = ENDINGS[ending];
      return {
        starRules,
        chapterNo: 1,
        teaser: 'Дальше: глава 2. Комната, которой нет.',
        ending,
        endingTitle: meta.title,
        characters: meta.heroes(s.decisions),
        stars,
        score,
        durationSec,
        choices: Object.entries(s.decisions).map(([key, value]) => ({ key, value })),
        skillsUsed: [
          { text: 'Воспроизвёл ошибку по шагам', done: flag('replay_ok') },
          { text: 'Описал ожидаемый и фактический результат', done: flag('journal_reported') || flag('bench_reported') },
          { text: 'Оценил, насколько ошибка серьёзная', done: flag('journal_reported') },
          { text: 'Сверил странность с документацией', done: flag('clock_checked') },
          { text: 'Нашёл похожий отчёт и сравнил', done: flag('compared') },
          { text: 'Сохранил доказательство', done: flag('evidence_saved') },
        ],
      };
    },
    dispose() {
      disposed = true;
      marker.parent?.remove(marker);
      timers.forEach(clearTimeout);
      unsubs.forEach((u) => u());
      removeHandLantern();
    },
  };
}

// ---------- Меню отладки (?debug=1): переход к любой точке главы ----------
export const DEBUG_PRESETS = [
  ['office', 'Офис: начало'],
  ['station', 'Станция: начало'],
  ['lis', 'Станция: Лис встречен'],
  ['journal_gone', 'Журнал исчез'],
  ['replay', 'Ошибка воспроизведена'],
  ['reported', 'Отчёт принят, найден #0412'],
  ['compared', 'Отчёты сравнены'],
  ['final', 'Доказательства сохранены, у терминала'],
  ['door', 'Служебный выход открыт'],
];

const log = (id, foreign = false) => ({ id, text: ACTION_TEXT[id] || id, t: Date.now(), foreign });
const PRESET_STEPS = {
  office: (s) => {
    s.scene = 'office';
  },
  station: (s) => {
    Object.assign(s.flags, { met_irina: true, met_timur: true, pc_used: true, entered_station: true });
    s.scene = 'station';
    s.log.push(log('enter_station'));
  },
  lis: (s) => {
    Object.assign(s.flags, { met_lis: true, chat_lisName: true });
    s.log.push(log('talk_lis'));
  },
  journal_gone: (s) => {
    Object.assign(s.flags, { bench_reported: true, archive_open: true, journal_gone: true, noticed_gone: true });
    s.log.push(log('inspect_bench'), log('open_archive'), log('take_lantern'), log('enter_archive'), log('exit_archive'));
    s.reports.push({ id: '0418', title: 'Скамейка висит в воздухе и вращается', subject: 'bench', steps: ['inspect_bench'], expected: 'bench_floor', actual: 'bench_flying', severity: 'low', attachment: false, status: 'accepted', author: `tester_02 (${s.name})`, profile: 'tester_02', date: 'сегодня', closedBy: null, comments: [], foreign: false, compare: null });
    s.flags.lantern_held = true;
  },
  replay: (s) => {
    s.flags.replay_ok = true;
    s.replay = { steps: [...JOURNAL_BUG_STEPS], ok: true };
    s.evidence.replay_journal = true;
  },
  reported: (s) => {
    Object.assign(s.flags, { journal_reported: true, dup_found: true });
    s.reports.push({ id: '0419', title: 'Журнал путешественников исчезает со стойки', subject: 'journal', steps: [...JOURNAL_BUG_STEPS], expected: 'journal_stays', actual: 'journal_vanishes', severity: 'high', attachment: true, status: 'accepted', author: `tester_02 (${s.name})`, profile: 'tester_02', date: 'сегодня', closedBy: null, comments: [], foreign: false, compare: null });
    s.reports.push(nikitaReport());
    s.evidence.report_0412 = true;
  },
  compared: (s) => {
    s.flags.compared = true;
    s.evidence.profile_match = true;
    const r = s.reports.find((x) => x.id === '0412');
    if (r) r.compare = { matchSteps: true, matchProfile: true };
  },
  final: (s) => {
    Object.assign(s.flags, { evidence_saved: true, after_save_said: true });
    s.savedEvidence = ['replay_journal', 'report_0412', 'profile_match'];
    s.debugSpawn = 'terminalView';
  },
  door: (s) => {
    Object.assign(s.flags, { final_logged: true, door_opened: true });
    s.log.push(log('door_other_side', true));
    s.debugSpawn = 'terminalView';
  },
};

// Применить все шаги до выбранного включительно к свежему состоянию.
export function applyPreset(s, name) {
  for (const [id] of DEBUG_PRESETS) {
    PRESET_STEPS[id](s);
    if (id === name) break;
  }
  return s;
}
