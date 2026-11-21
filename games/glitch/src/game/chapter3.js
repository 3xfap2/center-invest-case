// Глава 3. «След предыдущего тестировщика». Сценарий по docs/CHAPTER3_SPEC.md.
// Механики: реконструкция событий (доска хронологии), консоль отладки и проверка гипотез, конструктор автотеста.
import * as THREE from 'three';
import { bus } from '../core/events.js';
import { game, diff, flag, setFlag, logAction, pushChat, save, decide, unlock, freshCh3 } from '../core/state.js';
import { platform } from '../core/platform.js';
import { sfx } from '../core/audio.js';
import { input, isTouch } from '../core/input.js';
import { box, cyl, sphere, mat, colliderOf } from '../world/build.js';
import { D3, CHAT3, HINTS3, TRACES, HYPOTHESES, COMMANDS, BLOCKS, CORRECT, TEST_SAVES, ENDINGS3, PROGRESS3, NIKITA_COMMENT } from '../content/chapter3.js';
import { createMarker } from './marker.js';
import { ACHIEVEMENTS } from '../content/meta.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = new THREE.Vector3();
function distTo(obj, p) {
  if (!obj) return Infinity;
  obj.getWorldPosition(tmp);
  return Math.hypot(tmp.x - p.x, tmp.z - p.z);
}
function pointIn(z, p) {
  return !!z && p.x > z.minX && p.x < z.maxX && p.z > z.minZ && p.z < z.maxZ;
}

export function createChapter3(ctx) {
  const { player, hud, dialogue, screens, camera, panels } = ctx;
  const S = () => game.state;
  const C3 = () => {
    const s = S();
    if (!s.ch3) s.ch3 = freshCh3();
    return s.ch3;
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
  const chat = (key) => pushChat(...CHAT3[key]);
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

  // ---------- Следы в офисе: ящик и урна добавляются к сцене офиса ----------
  const extra = { drawer: null, trash: null, colliders: [] };
  function addOfficeExtras(w) {
    if (extra.drawer) return;
    const drawer = new THREE.Group();
    drawer.add(box(0.46, 0.2, 0.06, 0x6e5440, 0, 0, 0));
    drawer.add(box(0.14, 0.03, 0.04, 0x2a2f3a, 0, 0.09, 0.04));
    drawer.position.set(0.42, 0.42, -2.6);
    w.scene.add(drawer);
    const trash = new THREE.Group();
    trash.add(cyl(0.17, 0.14, 0.36, 0x3a4250, 0, 0, 0, 8));
    trash.add(sphere(0.08, 0xefe8d6, 0.02, 0.36, 0.01, 6, mat(0xefe8d6)));
    trash.add(sphere(0.06, 0xefe8d6, -0.07, 0.34, -0.04, 6, mat(0xefe8d6)));
    trash.position.set(-1.1, 0, -2.4);
    w.scene.add(trash);
    extra.drawer = drawer;
    extra.trash = trash;
    trash.updateMatrixWorld(true); // иначе коллайдер окажется в начале координат
    const c = colliderOf(trash.children[0], 0.02);
    extra.colliders = [c];
    w.colliders.push(c);
  }
  function removeOfficeExtras() {
    const w = ctx.world;
    extra.drawer?.parent?.remove(extra.drawer);
    extra.trash?.parent?.remove(extra.trash);
    for (const c of extra.colliders) {
      const arr = (w && w.colliders) || [];
      const i = arr.indexOf(c);
      if (i >= 0) arr.splice(i, 1);
    }
    extra.drawer = extra.trash = null;
    extra.colliders = [];
  }

  const traceCount = () => Object.keys(C3().traces).length;
  async function findTrace(id, nodes) {
    const ok = await talk(nodes);
    if (!ok || C3().traces[id]) return;
    C3().traces[id] = true;
    const t = TRACES.find((x) => x.id === id);
    logAction('trace', { text: `След Никиты: ${t.title}` });
    hud.toast(`След Никиты: ${t.title} (${traceCount()} из ${TRACES.length})`, { kind: 'evidence' });
    sfx.pickup();
    if (traceCount() >= 3) setFlag('traces_3');
    if (traceCount() === TRACES.length) {
      setFlag('traces_done');
      later(800, () => chatOnce('timeline'));
    }
    save();
    refreshObjective();
  }

  // ---------- Доска хронологии ----------
  let timelineTalkPending = false;
  function openTimeline() {
    // перемешиваем один раз на главу: панель сохраняет раскладку, пока набор и порядок карточек те же
    if (!C3().cardOrder) C3().cardOrder = TRACES.map((t) => t.id).sort(() => Math.random() - 0.5);
    const cards = C3().cardOrder.map((id) => TRACES.find((t) => t.id === id)).map((t) => ({ id: t.id, title: t.title, text: t.text, date: t.date || (diff().strict ? null : t.softDate) })); // на сложном уровне две даты нужно вывести самому
    panels.timeline.open({
      cards,
      onSubmit: (ids) => {
        C3().timelineTries += 1;
        const right = TRACES.slice().sort((a, b) => a.order - b.order).map((t) => t.id);
        const ok = ids.join() === right.join();
        if (!ok) {
          S().mistakes = (S().mistakes || 0) + 1;
          const firstWrong = ids.findIndex((id, i) => id !== right[i]);
          sfx.fail();
          save();
          return { ok: false, message: diff().strict ? `Не сходится с ${firstWrong + 1}-го места. Блокнот ссылается на схему с доски, письмо написано после закрытия отчёта.` : `Не сходится с ${firstWrong + 1}-го места. Расставь карточки по датам: от ранней к поздней.` };
        }
        sfx.success();
        setFlag('timeline_done');
        decide('gl_ch3_timeline_first_try', C3().timelineTries === 1);
        if (C3().timelineTries === 1) unlock('gl_detective');
        save();
        timelineTalkPending = true;
        refreshObjective();
        return { ok: true, message: 'Порядок верный. Последняя неделя Никиты восстановлена.' };
      },
    });
  }

  // ---------- Фонарь (как в главе 1: крепится к камере один раз, включается яркостью) ----------
  let handLantern = null;
  let lanternHeld = false;
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

  // ---------- Консоль отладки ----------
  let inArchive = false;
  let run = null; // текущий заход в архив: { lantern, journal }
  let journalGone = false;
  let pendingLisCheck = false; // после save.reload ждём разговора с Лисом

  function evidence(hid) {
    if (C3().evidence[hid]) return;
    C3().evidence[hid] = true;
    const h = HYPOTHESES.find((x) => x.id === hid);
    hud.toast(`Доказательство для гипотезы: «${h.claim}»`, { kind: 'evidence' });
    panels.hypo.refresh?.(hypoItems());
    save();
    refreshObjective();
  }

  async function runCommand(id) {
    if (ctx.sceneName !== 'station') return ['Консоль работает только внутри сборки.'];
    const w = ctx.world;
    if (!flag('console_used')) {
      setFlag('console_used');
      unlock('gl_console');
    }
    logAction('console', { text: `Консоль: ${COMMANDS.find((c) => c.id === id)?.label || id}` });
    switch (id) {
      case 'help':
        return COMMANDS.map((c) => `${c.label.padEnd(13)} ${c.desc}`);
      case 'save.reload': {
        await quickFade(() => {
          w.api.resetState();
          w.api.openServiceDoor();
          setLantern(false);
          journalGone = false;
          w.api.setJournalVisible(true);
          player.place(w.points.lisTalk);
        });
        C3().reloads += 1;
        pendingLisCheck = true;
        save();
        return [`Сохранение профиля tester_02 загружено заново (${C3().reloads}).`, 'Станция как при загрузке. Поговори с Лисом.'];
      }
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
        evidence('h3');
        return [
          '21.11 23:41:05  AT-03  часы: направление ............ OK',
          '21.11 23:52:40  AT-05  скамейка: высота .............. СБОЙ',
          '21.11 23:58:12  AT-07  служебный выход: открыть изнутри  OK',
          '21.11 23:58:12  СОБЫТИЕ  дверь «Служебный выход» открыта',
          '                AT-08  очистка сохранений после миграции  ОЖИДАЕТ РЕЛИЗ',
        ];
      case 'hypo':
        panels.console.close();
        later(50, openHypotheses);
        return ['Открываю гипотезы Никиты…'];
      default:
        return ['Неизвестная команда.'];
    }
  }

  async function quickFade(fn) {
    ctx.cutscene = true;
    marker.hide();
    await screens.fadeOut();
    fn();
    ctx.cutscene = false;
    await screens.fadeIn();
  }

  function openConsole() {
    if (ctx.sceneName !== 'station' || !input.enabled || busy) return;
    panels.console.open({ commands: COMMANDS, onRun: runCommand });
  }

  // ---------- Гипотезы ----------
  function hypoItems() {
    return HYPOTHESES.map((h) => ({
      id: h.id,
      claim: h.claim,
      hint: h.hint,
      evidence: C3().evidence[h.id] ? h.proof : null,
      verdict: C3().verdicts[h.id] || null,
    }));
  }
  const verdictCount = () => Object.keys(C3().verdicts).length;
  function openHypotheses() {
    panels.hypo.open({
      items: hypoItems(),
      onVerdict: (id, v) => {
        const h = HYPOTHESES.find((x) => x.id === id);
        if (v !== h.truth) {
          S().mistakes = (S().mistakes || 0) + 1;
          C3().hypoMistake = true;
          sfx.fail();
          save();
          return { ok: false, message: 'Посмотри на доказательство ещё раз: оно говорит о другом.' };
        }
        C3().verdicts[id] = v;
        sfx.success();
        if (id === 'h1') {
          decide('gl_ch3_lis_learns', false);
          unlock('gl_nikita_wrong');
        }
        if (verdictCount() >= 2) setFlag('hypos_2');
        if (verdictCount() === HYPOTHESES.length) {
          setFlag('hypos_done');
          if (!C3().hypoMistake) unlock('gl_hypotheses');
          later(400, () => {
            panels.hypo.close();
            chatOnce('hyposDone');
            talk(D3.hyposDone);
          });
        }
        save();
        refreshObjective();
        return { ok: true, message: v === 'true' ? 'Верно: гипотеза подтвердилась.' : 'Верно: гипотеза опровергнута.' };
      },
    });
  }

  // ---------- Конструктор автотеста ----------
  function openAutotest() {
    panels.autotest.open({
      blocks: BLOCKS,
      onRun: async (ids) => {
        C3().autotestRuns += 1;
        decide('gl_ch3_autotest_runs', C3().autotestRuns);
        const lines = [];
        const ok = ids.join() === CORRECT.join();
        if (ok) {
          for (const s of TEST_SAVES) {
            lines.push({ ok: true, text: `${s}: загружено, обновлено до 1.0, перенос выполнен` });
            lines.push({ ok: false, text: `${s}: AT-08 «очистка после миграции»: журнал путешественников стёрт` });
          }
          setFlag('autotest_done');
          if (C3().autotestRuns === 1) unlock('gl_autotest');
          sfx.success();
          save();
          later(2700, () => afterAutotest()); // панель выводит 6 строк по 300 мс и итог
          return { ok: true, lines, message: 'Итог: журнал стёрт у 3 из 3 тестовых игроков. Это доказательство.' };
        }
        S().mistakes = (S().mistakes || 0) + 1;
        sfx.fail();
        save();
        let i = ids.findIndex((id, k) => id !== CORRECT[k]);
        if (i < 0) i = ids.length; // верное начало, но сценарий короче
        const why =
          ids.includes('archive')
            ? 'Шаг «Открыть архив» к релизу не относится: сохранения игроков меняются без входа в архив.'
            : i === 0
              ? 'Сначала нужно загрузить сохранение игрока: без данных проверять нечего.'
              : ids.length < CORRECT.length
                ? 'Сценарий короткий: в конце нужно проверить результат (журнал).'
                : 'Порядок нарушен: на релизе игра сначала обновляется, потом переносит состояние, и только после этого запускается AT-08.';
        lines.push({ ok: false, text: `шаг ${i + 1}: тест прерван` });
        return { ok: false, lines, message: why };
      },
    });
  }

  async function afterAutotest() {
    if (flag('nikita_posted')) return;
    panels.autotest.close();
    // Никита оставляет комментарий под своим старым отчётом. Ставим сразу: выход в меню не должен потерять финал.
    const r = S().reports.find((x) => x.id === '0412');
    if (r && !r.comments.some((c) => c.text === NIKITA_COMMENT)) r.comments.push({ from: 'n.orlov', text: NIKITA_COMMENT });
    bus.emit('reports');
    decide('gl_ch3_nikita_contact', true);
    setFlag('nikita_posted');
    save();
    chatOnce('autotest');
    await talk(D3.autotestDone);
    later(1500, () => {
      chatOnce('nikita');
      talk(D3.nikitaFinal);
    });
  }

  // ---------- Задачи ----------
  const keyConsole = () => (isTouch ? 'кнопка «Консоль»' : 'клавиша Ё');
  function goal() {
    const o = ctx.world?.objects || {};
    const sc = ctx.sceneName;
    if (flag('nikita_posted')) return { id: 'final', text: 'Открой планшет: «Трекер», отчёт #0412' };
    if (flag('hypos_done')) {
      if (sc === 'diagnostic') return { id: 'autotest', text: 'Собери автотест AT-08 на старом терминале', target: o.atTerminal };
      return { id: 'autotest', text: 'Иди в комнату Никиты за служебным выходом', target: o.serviceDoor };
    }
    if (flag('on_station')) return { id: 'hypos', text: `Проверь гипотезы Никиты в консоли (${keyConsole()}). Вердикты: ${verdictCount()} из 3` };
    if (flag('timeline_done')) return { id: 'launch', text: 'Сядь за свой компьютер и запусти сборку', target: ctx.world?.slots.find((s) => s.id === 'pc')?.object };
    if (flag('traces_done')) return { id: 'timeline', text: 'Разложи следы Никиты по порядку на доске', target: ctx.world?.slots.find((s) => s.id === 'whiteboard')?.object };
    const next = TRACES.find((t) => !C3().traces[t.id]);
    const targetOf = {
      coffee: ctx.world?.slots.find((s) => s.id === 'coffee')?.object,
      board: ctx.world?.slots.find((s) => s.id === 'whiteboard')?.object,
      drawer: extra.drawer,
      trash: extra.trash,
      mail: ctx.world?.slots.find((s) => s.id === 'pc')?.object,
    };
    return { id: 'traces', text: `Найди следы Никиты в офисе: ${traceCount()} из ${TRACES.length}`, target: next ? targetOf[next.id] : null };
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
    addOfficeExtras(w);
    ctx.interactor.setSlots([...w.slots, { id: 'drawer', object: extra.drawer }, { id: 'trash', object: extra.trash }]);
    player.place(pos || w.spawn);
    ctx.interactor.setHandlers(officeHandlers());
    bus.emit('touch:ch3', false);
    marker.reset();
    refreshObjective();
  }
  function enterStation(pos) {
    removeOfficeExtras();
    removeHandLantern();
    const w = ctx.loadScene('station');
    w.api.setBuild?.('0.9.7');
    w.api.resetState();
    w.api.openServiceDoor();
    journalGone = false;
    w.api.setJournalVisible(true);
    player.place(pos || w.spawn);
    inArchive = pointIn(w.zones.archive, player.pos);
    if (inArchive) w.api.openArchiveDoor(); // сохранились внутри архива: дверь не должна запереть
    ctx.interactor.setHandlers(stationHandlers());
    bus.emit('touch:ch3', true);
    if (!flag('on_station')) setFlag('on_station');
    marker.reset();
    refreshObjective();
  }
  function enterDiag(pos) {
    removeHandLantern();
    const w = ctx.loadScene('diagnostic');
    w.api.setBuild?.('0.9.7');
    w.api.takeSwitcher?.();
    player.place(pos || w.spawn);
    ctx.interactor.setHandlers(diagHandlers());
    bus.emit('touch:ch3', false);
    marker.reset();
    refreshObjective();
  }

  function officeHandlers() {
    const w = ctx.world;
    return {
      irina: { label: 'Поговорить с Ириной', onUse: () => talk(flag('met_irina3') ? D3.irinaLater : D3.irina).then((ok) => ok && setFlag('met_irina3')) },
      timur: { label: 'Поговорить с Тимуром', onUse: () => talk(flag('met_timur3') ? D3.timurLater : D3.timur).then((ok) => ok && setFlag('met_timur3')) },
      coffee: { label: 'Осмотреть кофемашину', onUse: () => findTrace('coffee', D3.coffee) },
      whiteboard: {
        label: () => (flag('traces_done') && !flag('timeline_done') ? 'Разложить следы на доске' : 'Осмотреть оборот доски'),
        onUse: () => (flag('traces_done') && !flag('timeline_done') ? openTimeline() : findTrace('board', D3.board)),
      },
      drawer: { label: 'Открыть ящик стола', onUse: () => findTrace('drawer', D3.drawer) },
      trash: { label: 'Заглянуть в урну', onUse: () => findTrace('trash', D3.trash) },
      pc: {
        label: () => (flag('timeline_done') ? 'Запустить сборку' : 'Открыть компьютер'),
        onUse: async () => {
          if (!flag('timeline_done')) return findTrace('mail', D3.mail);
          if (!(await talk([D3.pcLaunch]))) return;
          await fadeTo(() => enterStation(null), 'Станция Рассвет', 'Сборка 0.9.7 · режим отладки');
          later(400, () => talk(D3.stationStart));
          later(1500, () => chatOnce('console'));
        },
      },
    };
    // w используется для расширения в будущем
  }

  function stationHandlers() {
    return {
      lis: {
        label: 'Поговорить с Лисом',
        onUse: async () => {
          if (!(await talk(D3.lisSame))) return;
          if (pendingLisCheck) {
            pendingLisCheck = false;
            C3().lisAfterReload += 1;
            if (C3().lisAfterReload >= 2) evidence('h1');
            else hud.toast('Запомни ответ Лиса. Перезагрузи сохранение и спроси ещё раз.');
            save();
          }
        },
      },
      service_door: { label: 'Войти в комнату Никиты', onUse: () => fadeTo(() => enterDiag(null)) },
      terminal: { label: 'Терминал дежурного', onUse: () => talk([{ who: 'me', text: 'Сегодня всё нужное в консоли отладки.' }]) },
    };
  }

  function diagHandlers() {
    return {
      at_terminal: {
        label: 'Терминал автотестов',
        onUse: () => {
          if (!flag('hypos_done')) return talk([{ who: 'me', text: 'Сначала проверю гипотезы Никиты на станции.' }]);
          if (flag('autotest_done') && !flag('nikita_posted')) return afterAutotest();
          if (flag('autotest_done')) return talk([{ who: 'me', text: 'Автотест уже собран. Результат у меня.' }]);
          openAutotest();
        },
      },
      exit_door: { label: 'Выйти на станцию', onUse: () => fadeTo(() => enterStation(ctx.loadScene('station').points.serviceReturn)) },
      note_wall: { label: 'Записки Никиты', onUse: () => talk([{ who: 'me', text: 'Те же записки. Теперь я знаю, что за ними стояло.' }]) },
    };
  }

  async function finish() {
    if (finishing) return;
    finishing = true;
    ctx.cutscene = true;
    ctx.block('cutscene', true);
    await screens.fadeOut('', '');
    setFlag('chapter_done');
    ctx.cutscene = false;
    ctx.finishChapter();
    ctx.block('cutscene', false);
    await screens.fadeIn();
  }

  // ---------- Подписки ----------
  function sendProgress() {
    let cur = PROGRESS3[0];
    for (const pr of PROGRESS3) if (pr[0] === 'start' || flag(pr[0])) cur = pr;
    platform.progress(cur[1], cur[2]);
  }
  unsubs.push(
    bus.on('flag', sendProgress),
    bus.on('achievement', (id) => hud.toast(`Достижение: ${ACHIEVEMENTS[id] || id}`, { kind: 'evidence' })),
    bus.on('panel:close', (name) => {
      if (name === 'timeline' && timelineTalkPending) {
        timelineTalkPending = false;
        later(300, () => talk(D3.timelineDone));
      }
    }),
    bus.on('input:console', () => {
      if (panels.console.isOpen()) panels.console.close();
      else openConsole();
    }),
    // Финал: игрок открыл и закрыл планшет после комментария Никиты
    bus.on('tablet:close', () => {
      if (flag('nikita_posted') && !finishing) later(500, finish);
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
    const remain = (diff().shiftSec3 || diff().shiftSec) - (S().playTime || 0);
    hud.setTimer(remain);
    if (ctx.sceneName === 'station') {
      // Заходы в архив: проверка гипотезы о фонаре
      const inside = pointIn(w.zones.archive, p);
      if (inside !== inArchive) {
        inArchive = inside;
        if (inside) run = { lantern: lanternHeld, journal: !journalGone };
        else if (run) {
          if (run.journal) {
            if (run.lantern && lanternHeld) {
              journalGone = true;
              w.api.setJournalVisible(false, { glitch: true });
              hud.glitch();
              C3().runs.with = true;
              hud.toast('С фонарём: журнал пропал со стойки.');
            } else {
              C3().runs.without = true;
              hud.toast('Без фонаря: журнал на месте.');
            }
            if (C3().runs.with && C3().runs.without) evidence('h2');
            save();
          } else {
            hud.toast('Журнала уже нет на стойке. Сначала верни мир командой world.reset.');
          }
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
    if (diff().autoHints && stageTime > diff().autoHintDelay && HINTS3[g.id] && !flag(`auto_${g.id}`)) {
      setFlag(`auto_${g.id}`);
      pushChat('irina', HINTS3[g.id]);
    }
    marker.update(t, g.target, diff().markers, w.scene);
    refreshObjective();
  }

  const tabletCallbacks = {
    onReplay() {
      hud.toast('Сегодня проверяй через консоль отладки.');
    },
    async onSubmitReport() {
      return { status: 'rejected', message: 'В этой главе отчёт не нужен: проверь гипотезы Никиты.' };
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
      const text = HINTS3[g.id] || g.text;
      pushChat('irina', text);
      return text;
    },
    onCompare() {},
    onPlayRecording() {
      hud.toast('Запись Никиты ты уже видел.');
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
      const spot = s.debugSpawn;
      delete s.debugSpawn;
      if (s.scene === 'station') enterStation(spot ? ctx.loadScene('station').points[spot] : s.pos);
      else if (s.scene === 'diagnostic') enterDiag(spot ? ctx.loadScene('diagnostic').points[spot] : s.pos);
      else enterOffice(s.pos);
      if (!flag('started')) {
        setFlag('started');
        ctx.cutscene = true;
        await screens.fadeOut('Глава 3. След предыдущего тестировщика', 'Утро релиза, 7:40');
        await wait(1500);
        if (disposed) return;
        ctx.cutscene = false;
        await screens.fadeIn();
        pushChat('system', 'Глава 3. Утро релиза');
        later(300, () => talk(D3.start));
        later(2500, () => chat('start'));
      }
      if (flag('autotest_done') && !flag('nikita_posted')) later(500, afterAutotest); // сохранились посреди финала
      refreshObjective();
    },
    update,
    preferredTab() {
      return flag('nikita_posted') ? 'tracker' : undefined;
    },
    result(forceEnding) {
      const s = S();
      const d = diff();
      const ending = forceEnding || ((s.mistakes || 0) === 0 ? 'gl_ch3_thorough' : 'gl_ch3_standard');
      const durationSec = Math.round(s.playTime || 0);
      const shift = d.shiftSec3 || d.shiftSec;
      const starRules = [
        { text: 'Глава пройдена', done: true },
        { text: d.mistakesForStar === 0 ? 'Ни одной ошибки' : `Ошибок: не больше ${d.mistakesForStar}`, done: (s.mistakes || 0) <= d.mistakesForStar },
        { text: `Уложился в смену: ${Math.round((shift) / 60)} мин`, done: durationSec <= (shift) },
      ];
      const stars = starRules.filter((r) => r.done).length;
      const timeBonus = Math.round((Math.max(0, shift - durationSec) / shift) * 300);
      const score = Math.max(0, 600 + verdictCount() * 60 + (flag('autotest_done') ? 150 : 0) - (s.mistakes || 0) * 75 + timeBonus);
      if (s.decisions.gl_ch3_timeline_first_try === undefined) decide('gl_ch3_timeline_first_try', false);
      if (s.decisions.gl_ch3_nikita_contact === undefined) decide('gl_ch3_nikita_contact', false);
      decide('gl_ch3_ending', ending);
      if (stars === 3) unlock('gl_three_stars');
      const meta = ENDINGS3[ending];
      return {
        starRules,
        chapterNo: 3,
        ending,
        endingTitle: meta.title,
        characters: meta.heroes(s.decisions),
        stars,
        score,
        durationSec,
        choices: Object.entries(s.decisions).map(([key, value]) => ({ key, value })),
        teaser: 'Глава 4. Исправление. Скоро.',
        skillsUsed: [
          { text: 'Восстановил порядок событий по следам', done: flag('timeline_done') },
          { text: 'Подготовил условия теста через консоль отладки', done: !!flag('console_used') },
          { text: 'Проверил гипотезы и опроверг неверную', done: flag('hypos_done') },
          { text: 'Собрал и запустил автотест', done: flag('autotest_done') },
        ],
      };
    },
    dispose() {
      disposed = true;
      timers.forEach(clearTimeout);
      unsubs.forEach((u) => u());
      marker.dispose();
      removeOfficeExtras();
      removeHandLantern();
      Object.values(panels).forEach((p) => p.close?.());
      bus.emit('touch:ch3', false);
    },
  };
}

// ---------- Меню отладки (?debug=1) ----------
export const DEBUG_PRESETS3 = [
  ['ch3_start', 'Глава 3: офис'],
  ['ch3_traces', 'Глава 3: следы найдены'],
  ['ch3_station', 'Глава 3: станция, консоль'],
  ['ch3_hypos', 'Глава 3: гипотезы проверены'],
];
const PRESET3_STEPS = {
  ch3_start: () => {},
  ch3_traces: (s) => {
    s.ch3.traces = Object.fromEntries(TRACES.map((t) => [t.id, true]));
    Object.assign(s.flags, { started: true, traces_3: true, traces_done: true });
  },
  ch3_station: (s) => {
    Object.assign(s.flags, { timeline_done: true, on_station: true });
    s.scene = 'station';
    s.debugSpawn = 'lisTalk';
  },
  ch3_hypos: (s) => {
    s.ch3.evidence = { h1: true, h2: true, h3: true };
    s.ch3.verdicts = { h1: 'false', h2: 'true', h3: 'true' };
    Object.assign(s.flags, { hypos_2: true, hypos_done: true, console_used: true });
    s.scene = 'diagnostic';
    s.debugSpawn = 'switcher';
  },
};
export function applyPreset3(s, name) {
  for (const [id] of DEBUG_PRESETS3) {
    PRESET3_STEPS[id](s);
    if (id === name) break;
  }
  return s;
}
