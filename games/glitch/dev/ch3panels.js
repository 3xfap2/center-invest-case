// Предпросмотр панелей главы 3 без 3D. Параметры адреса:
// ?open=timeline|console|hypo|autotest   открыть панель сразу
// &fill=1                                 заполнить панель примером (часть карточек на доске, история консоли, лог автотеста)
// &frame=390x844                          показать страницу в рамке телефона
// ?selftest=1                             прогон основных сценариев, итог PASS/FAIL в <pre id="selftest">
import { bus } from '../src/core/events.js';
import { createTimeline, createConsole, createHypotheses, createAutotest } from '../src/ui/ch3panels.js';

const q = new URLSearchParams(location.search);

const frame = q.get('frame');
if (frame) {
  const [fw, fh] = frame.split('x').map(Number);
  q.delete('frame');
  document.body.innerHTML = `<iframe src="?${q}" style="position:fixed;left:0;top:0;width:${fw}px;height:${fh}px;border:0;background:#000"></iframe>`;
  throw new Error('frame mode');
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ui = document.getElementById('ui');
let failNext = false; // для самопроверки: следующий колбэк бросит исключение
const maybeFail = () => {
  if (failNext) {
    failNext = false;
    throw new Error('test failure');
  }
};

// ---------- хронология ----------
const CARDS = [
  { id: 'report', title: 'Распечатка отчёта #0412', text: '«Закрыт: не воспроизводится». Скомкана и выброшена в урну.', date: '24.10' },
  { id: 'notebook', title: 'Блокнот с гипотезами', text: 'Три гипотезы про Лиса, журнал и служебный выход. «Проверю схему с доски».', date: null },
  { id: 'coffee', title: 'Записка на кофемашине', text: '«Не работает с 0.9.3».', date: '20.10' },
  { id: 'letter', title: 'Черновик письма', text: '«Ухожу. Если кто-то найдёт комнату…» Написано после того, как отчёт закрыли.', date: null },
  { id: 'board', title: 'Схема на обороте доски', text: 'Профиль tester_02 → снимок 0.9.3 → перенос.', date: '22.10' },
];
const ORDER = ['coffee', 'board', 'notebook', 'report', 'letter'];

const timeline = createTimeline(ui);
const timelineOpts = {
  cards: CARDS,
  async onSubmit(ids) {
    maybeFail();
    await wait(250);
    const right = ids.filter((id, i) => id === ORDER[i]).length;
    if (right === ORDER.length) return { ok: true, message: 'Всё сходится. Перенос сломался в 0.9.3, Никита нашёл причину, но отчёт закрыли, и он ушёл.' };
    return { ok: false, message: `На своих местах ${right} из ${ORDER.length}. Посмотри на даты и на то, что ссылается на другие следы.` };
  },
};

// ---------- гипотезы ----------
const HYPO = [
  { id: 'h1', claim: 'Лис учится и каждый раз отвечает по-новому', hint: '`save.reload`, затем поговорить с Лисом. Повторить дважды.', evidence: null, verdict: null, correct: 'false' },
  { id: 'h2', claim: 'Журнал пропадает, только если войти в архив с фонарём', hint: '`world.reset`, `item.lantern`, `tp archive`, `tp hall`, посмотреть на стойку.', evidence: null, verdict: null, correct: 'true' },
  { id: 'h3', claim: 'Служебный выход открыл автотест AT-07, а не игрок', hint: '`autotest.log`: сравнить время открытия двери со строками лога.', evidence: null, verdict: null, correct: 'true' },
];
const hypoItems = () => HYPO.map(({ correct, ...it }) => ({ ...it }));
const hypo = createHypotheses(ui);
const hypoOpts = () => ({
  items: hypoItems(),
  async onVerdict(id, v) {
    maybeFail();
    await wait(150);
    const h = HYPO.find((x) => x.id === id);
    if (h.correct !== v) return { ok: false, message: 'Доказательство говорит другое. Посмотри на него ещё раз.' };
    h.verdict = v;
    return { ok: true };
  },
});

// ---------- консоль ----------
const COMMANDS = [
  { id: 'save.reload', label: 'save.reload', desc: 'Перезагрузить сохранение профиля' },
  { id: 'world.reset', label: 'world.reset', desc: 'Вернуть станцию в начальное состояние' },
  { id: 'item.lantern', label: 'item.lantern', desc: 'Взять или убрать фонарь' },
  { id: 'tp.archive', label: 'tp archive', desc: 'Перенестись в архив' },
  { id: 'tp.hall', label: 'tp hall', desc: 'Перенестись в зал' },
  { id: 'autotest.log', label: 'autotest.log', desc: 'Показать лог автотестов' },
  { id: 'broken', label: 'broken.cmd', desc: 'Команда с ошибкой (для проверки)' },
];
const world = { reloads: 0, lantern: false, where: 'hall', archiveWithLantern: false };
function setEvidence(id, text) {
  const h = HYPO.find((x) => x.id === id);
  if (h && !h.evidence) {
    h.evidence = text;
    if (hypo.isOpen()) hypo.refresh(hypoItems());
    con.print([{ text: `Доказательство для гипотезы ${id.slice(1)} записано.`, kind: 'ok' }]);
  }
}
const con = createConsole(ui);
const consoleOpts = {
  commands: COMMANDS,
  onRun(id) {
    maybeFail();
    switch (id) {
      case 'save.reload':
        world.reloads++;
        if (world.reloads >= 2) setTimeout(() => setEvidence('h1', 'После двух перезагрузок Лис ответил одинаково: «Привет, Матвей».'), 0);
        return ['Сохранение tester_02 загружено.', `Перезагрузок подряд: ${world.reloads}.`];
      case 'world.reset':
        Object.assign(world, { lantern: false, where: 'hall', archiveWithLantern: false });
        return wait(300).then(() => ['Станция сброшена. Фонарь на крючке, журнал на стойке.']);
      case 'item.lantern':
        world.lantern = !world.lantern;
        return [world.lantern ? 'Фонарь у игрока.' : 'Фонарь убран.'];
      case 'tp.archive':
        world.where = 'archive';
        if (world.lantern) world.archiveWithLantern = true;
        return ['Перенос: архив.'];
      case 'tp.hall':
        world.where = 'hall';
        if (world.archiveWithLantern) setTimeout(() => setEvidence('h2', 'С фонарём журнал пропал со стойки, без фонаря остался на месте.'), 0);
        return [world.archiveWithLantern ? 'Перенос: зал. Стойка пустая.' : 'Перенос: зал. Журнал на стойке.'];
      case 'autotest.log':
        setTimeout(() => setEvidence('h3', 'Дверь открыта в 23:58:12. В логе: 23:58:12 AT-07 open service_door.'), 0);
        return wait(200).then(() => ['23:41:05 AT-03 check lighting ok', '23:58:12 AT-07 open service_door', '23:58:40 AT-07 done']);
      case 'broken':
        throw new Error('broken command');
      default:
        return [];
    }
  },
};

// ---------- автотест ----------
const BLOCKS = [
  { id: 'update', label: 'Обновить игру до 1.0' },
  { id: 'check', label: 'Проверить журнал' },
  { id: 'load', label: 'Загрузить сохранение игрока' },
  { id: 'archive', label: 'Открыть архив' },
  { id: 'run08', label: 'Запустить AT-08' },
  { id: 'migrate', label: 'Перенос состояния' },
];
const AT_ORDER = ['load', 'update', 'migrate', 'run08', 'check'];
const autotest = createAutotest(ui);
const autotestOpts = {
  blocks: BLOCKS,
  async onRun(ids) {
    maybeFail();
    await wait(200);
    const okOrder = ids.length === AT_ORDER.length && ids.every((id, i) => id === AT_ORDER[i]);
    if (okOrder) {
      return {
        ok: true,
        lines: [
          'Сохранение 1 (tester_01): журнал стёрт',
          'Сохранение 2 (tester_02): журнал стёрт',
          'Сохранение 3 (tester_03): журнал стёрт',
          { text: 'AT-08 очищает журнал при переносе состояния', ok: true },
        ],
        message: 'Журнал стёрт: 3 из 3. Ошибка воспроизводится автотестом.',
      };
    }
    const bad = ids.findIndex((id, i) => id !== AT_ORDER[i]);
    const label = (id) => BLOCKS.find((b) => b.id === id)?.label || id;
    return {
      ok: false,
      lines: [
        ...ids.slice(0, Math.max(0, bad)).map((id) => `${label(id)}: выполнено`),
        bad >= 0 ? `✗ ${label(ids[bad])}: шаг не на своём месте` : '✗ Сценарий оборвался раньше времени',
      ],
      message: 'Ошибка не воспроизвелась. Проверь порядок шагов и лишние блоки.',
    };
  },
};

// ---------- открытие ----------
const panels = { timeline, console: con, hypo, autotest };
function openPanel(name) {
  Object.entries(panels).forEach(([n, p]) => n !== name && p.isOpen() && p.close());
  if (name === 'timeline') timeline.open(timelineOpts);
  else if (name === 'console') con.open(consoleOpts);
  else if (name === 'hypo') hypo.open(hypoOpts());
  else if (name === 'autotest') autotest.open(autotestOpts);
}

bus.on('panel:open', (n) => console.log('panel:open', n));
bus.on('panel:close', (n) => console.log('panel:close', n));
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') bus.emit('input:pause');
  if (e.code === 'Backquote' && !(e.target instanceof HTMLInputElement)) {
    if (con.isOpen()) con.close();
    else openPanel('console');
  }
});

document.querySelector('.dev-bar').addEventListener('click', (e) => {
  const a = e.target.closest('[data-dev]')?.dataset.dev;
  if (!a) return;
  if (a === 'print') {
    con.print(['Внешний вывод: сборка 1.0 собрана.', { text: 'print() работает', kind: 'ok' }]);
    openPanel('console');
  } else openPanel(a);
});

// Заполнение примером для скриншотов.
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const layerOf = (name) => $(`.c3-layer-${name}`);
async function fill(name) {
  const L = layerOf(name);
  if (name === 'timeline') {
    ['coffee', 'board', 'report'].forEach((id) => L.querySelector(`[data-act="place"][data-id="${id}"]`)?.click());
  } else if (name === 'console') {
    for (const id of ['save.reload', 'world.reset', 'item.lantern', 'tp.archive']) {
      L.querySelector(`[data-act="cmd"][data-id="${id}"]`).click();
      await wait(id === 'world.reset' ? 400 : 30);
    }
    const f = L.querySelector('.c3-con-input');
    f.value = 'tp';
    f.dispatchEvent(new Event('input'));
  } else if (name === 'hypo') {
    HYPO[0].evidence = 'После двух перезагрузок Лис ответил одинаково: «Привет, Матвей».';
    HYPO[2].evidence = 'Дверь открыта в 23:58:12. В логе: 23:58:12 AT-07 open service_door.';
    HYPO[2].verdict = 'true';
    hypo.refresh(hypoItems());
    L.querySelector('[data-act="verdict"][data-id="h1"][data-v="true"]').click();
  } else if (name === 'autotest') {
    ['load', 'update', 'archive', 'migrate'].forEach((id) => L.querySelector(`[data-act="add"][data-id="${id}"]`)?.click());
    L.querySelector('[data-act="run"]').click();
  }
}

const openName = q.get('open');
if (openName && panels[openName]) {
  openPanel(openName);
  if (q.get('fill')) fill(openName);
}

// ---------- самопроверка ----------
if (q.get('selftest')) selftest();

async function selftest() {
  const out = $('#selftest');
  const results = [];
  const check = (name, cond) => {
    results.push(`${cond ? 'ok  ' : 'FAIL'} ${name}`);
    out.textContent = results.join('\n');
  };
  const waitFor = async (fn, ms = 4000) => {
    const t0 = performance.now();
    while (performance.now() - t0 < ms) {
      try {
        if (fn()) return true;
      } catch {
        /* ещё не готово */
      }
      await wait(30);
    }
    return false;
  };
  const events = [];
  bus.on('panel:open', (n) => events.push(`open:${n}`));
  bus.on('panel:close', (n) => events.push(`close:${n}`));
  let consoleErrors = 0;
  const origErr = console.error;
  console.error = (...a) => {
    consoleErrors++;
    origErr(...a);
  };
  window.addEventListener('error', () => consoleErrors++);
  window.addEventListener('unhandledrejection', () => consoleErrors++);

  try {
    // ----- хронология -----
    openPanel('timeline');
    let L = layerOf('timeline');
    check('timeline: открыта, panel:open', timeline.isOpen() && !L.hidden && events.includes('open:timeline'));
    check('timeline: z-index 40', getComputedStyle(L).zIndex === '40');
    check('timeline: 5 пустых ячеек', L.querySelectorAll('.c3-slot-empty').length === 5);
    const submitBtn = () => L.querySelector('[data-act="submit"]');
    check('timeline: проверка неактивна при пустых ячейках', submitBtn().disabled);
    // неверный порядок
    ['board', 'coffee', 'notebook', 'report', 'letter'].forEach((id) => L.querySelector(`[data-act="place"][data-id="${id}"]`).click());
    check('timeline: все карточки на доске', L.querySelectorAll('.c3-slot-btn').length === 5 && !submitBtn().disabled);
    submitBtn().click();
    check('timeline: неверный порядок, жёлтое сообщение', await waitFor(() => L.querySelector('.c3-msg-warn')));
    // вернуть две первые и поставить правильно
    L.querySelector('[data-act="unplace"][data-i="0"]').click();
    check('timeline: карточка вернулась в пул', L.querySelectorAll('.c3-slot-empty').length === 1 && !!L.querySelector('[data-act="place"][data-id="board"]'));
    check('timeline: сообщение сброшено после правки', !L.querySelector('.c3-msg-warn'));
    L.querySelector('[data-act="unplace"][data-i="1"]').click();
    L.querySelector('[data-act="place"][data-id="coffee"]').click();
    L.querySelector('[data-act="place"][data-id="board"]').click();
    const ids = [...L.querySelectorAll('.c3-slot-btn .c3-card-title')].map((e) => e.textContent);
    check('timeline: правильный порядок в ячейках', ids[0].includes('кофемашине') && ids[1].includes('Схема'));
    submitBtn().click();
    check('timeline: верный порядок, зелёное сообщение и «Готово»', await waitFor(() => L.querySelector('.c3-msg-ok') && L.querySelector('[data-act="done"]')));
    L.querySelector('[data-act="done"]').click();
    check('timeline: «Готово» закрывает, panel:close', !timeline.isOpen() && L.hidden && events.includes('close:timeline'));

    // ----- консоль -----
    openPanel('console');
    L = layerOf('console');
    const outText = () => L.querySelector('.c3-con-out').textContent;
    L.querySelector('[data-act="cmd"][data-id="save.reload"]').click();
    check('console: команда из списка, вывод с префиксом', await waitFor(() => outText().includes('> save.reload') && outText().includes('Сохранение tester_02 загружено.')));
    const field = L.querySelector('.c3-con-input');
    const key = (code, k) => {
      const e = new KeyboardEvent('keydown', { code, key: k, bubbles: true, cancelable: true });
      field.dispatchEvent(e);
      return e;
    };
    field.value = '  TP   Archive ';
    field.dispatchEvent(new Event('input'));
    key('Enter', 'Enter');
    check('console: ввод «  TP   Archive » + Enter запускает tp archive', await waitFor(() => outText().includes('> tp archive') && outText().includes('Перенос: архив.')));
    field.value = 'World.Reset';
    field.dispatchEvent(new Event('input'));
    key('Enter', 'Enter');
    check('console: ввод по id в другом регистре + Promise', await waitFor(() => outText().includes('Станция сброшена')));
    field.value = 'rm -rf';
    key('Enter', 'Enter');
    check('console: неизвестная команда', await waitFor(() => outText().includes('Неизвестная команда. Нажми на команду из списка.')));
    field.value = 'sav';
    field.dispatchEvent(new Event('input'));
    check('console: подсказка по началу ввода', L.querySelector('.c3-con-hint').textContent.includes('save.reload') && !!L.querySelector('.c3-cmd.c3-match'));
    key('Tab', 'Tab');
    check('console: Tab дополняет', field.value === 'save.reload');
    field.value = '';
    field.dispatchEvent(new Event('input'));
    let leaked = 0;
    const spy = (e) => e.code === 'KeyW' && leaked++;
    window.addEventListener('keydown', spy);
    key('KeyW', 'w');
    window.removeEventListener('keydown', spy);
    check('console: WASD из поля не всплывает в игру', leaked === 0);
    L.querySelector('[data-act="cmd"][data-id="broken"]').click();
    check('console: ошибка команды, «Что-то пошло не так»', await waitFor(() => outText().includes('Что-то пошло не так')));
    let bqSeen = 0;
    const spyBq = (e) => e.code === 'Backquote' && bqSeen++;
    window.addEventListener('keydown', spyBq);
    const bq = key('Backquote', '`');
    window.removeEventListener('keydown', spyBq);
    check('console: Backquote в поле: preventDefault и всплывает', bq.defaultPrevented && bqSeen === 1);
    check('console: Backquote закрывает консоль', await waitFor(() => !con.isOpen()));
    con.print('Строка извне');
    openPanel('console');
    check('console: история сохранилась между открытиями', outText().includes('> save.reload') && outText().includes('Строка извне'));
    await wait(0); // в том же такте, что открытие, Esc не закрывает (как у планшета)
    bus.emit('input:pause');
    check('console: Esc (input:pause) закрывает', await waitFor(() => !con.isOpen() && events.includes('close:console')));

    // ----- гипотезы -----
    HYPO.forEach((h) => Object.assign(h, { evidence: null, verdict: null }));
    HYPO[1].evidence = 'С фонарём журнал пропал, без фонаря остался.';
    openPanel('hypo');
    L = layerOf('hypo');
    const vbtns = (id) => [...L.querySelectorAll(`[data-act="verdict"][data-id="${id}"]`)];
    check('hypo: 3 карточки', L.querySelectorAll('.c3-hypo').length === 3);
    check('hypo: без доказательства кнопки неактивны', vbtns('h1').length === 2 && vbtns('h1').every((b) => b.disabled));
    check('hypo: с доказательством кнопки активны', vbtns('h2').every((b) => !b.disabled));
    vbtns('h2').find((b) => b.dataset.v === 'false').click();
    check('hypo: неверный вердикт, жёлтое сообщение, кнопки остались', await waitFor(() => L.querySelector('[data-hypo="h2"] .c3-msg-warn') && vbtns('h2').length === 2 && vbtns('h2').every((b) => !b.disabled)));
    vbtns('h2').find((b) => b.dataset.v === 'true').click();
    check('hypo: верный вердикт, зелёная метка', await waitFor(() => L.querySelector('[data-hypo="h2"] .c3-pill-ok')?.textContent.includes('верно') && vbtns('h2').length === 0));
    check('hypo: счётчик в шапке', L.querySelector('.c3-head-sub').textContent.includes('1 из 3'));
    HYPO[0].evidence = 'Лис ответил одинаково.';
    hypo.refresh(hypoItems());
    check('hypo: refresh включил кнопки', vbtns('h1').every((b) => !b.disabled));
    failNext = true;
    vbtns('h1')[0].click();
    check('hypo: исключение в колбэке, «Что-то пошло не так»', await waitFor(() => L.querySelector('[data-hypo="h1"] .c3-msg-warn')?.textContent.includes('Что-то пошло не так')));
    L.querySelector('[data-c3="backdrop"]').click();
    check('hypo: клик по затемнению закрывает', !hypo.isOpen() && events.includes('close:hypo'));

    // ----- автотест -----
    openPanel('autotest');
    L = layerOf('autotest');
    const add = (id) => L.querySelector(`[data-act="add"][data-id="${id}"]`).click();
    const runBtn = () => L.querySelector('[data-act="run"]');
    check('autotest: «Запустить» неактивна при пустом сценарии', runBtn().disabled);
    ['load', 'archive', 'update'].forEach(add);
    check('autotest: блоки добавлены в сценарий', L.querySelectorAll('.c3-step').length === 3);
    check('autotest: добавленный блок неактивен', L.querySelector('[data-act="add"][data-id="load"]').disabled);
    L.querySelector('[data-act="remove"][data-i="1"]').click();
    check('autotest: шаг убран из сценария', L.querySelectorAll('.c3-step').length === 2 && !L.querySelector('[data-act="add"][data-id="archive"]').disabled);
    add('run08');
    runBtn().click();
    check('autotest: неверный сценарий, красная строка и жёлтое сообщение', await waitFor(() => L.querySelector('.c3-log-bad') && L.querySelector('.c3-msg-warn'), 5000));
    L.querySelector('[data-act="clear"]').click();
    check('autotest: «Очистить»', L.querySelectorAll('.c3-step').length === 0);
    AT_ORDER.forEach(add);
    runBtn().click();
    check('autotest: во время запуска кнопки заблокированы', await waitFor(() => runBtn()?.disabled && L.querySelector('[data-act="clear"]').disabled));
    const t0 = performance.now();
    check('autotest: верный сценарий, зелёные строки по одной, «Готово»', await waitFor(() => L.querySelector('[data-act="done"]'), 6000));
    check('autotest: строки шли с задержкой (≥ 1,2 с на 4 строки)', performance.now() - t0 >= 1100);
    check('autotest: 4 зелёные строки и сообщение', L.querySelectorAll('.c3-log-ok').length === 4 && L.querySelector('.c3-msg-ok')?.textContent.includes('3 из 3'));
    L.querySelector('[data-act="done"]').click();
    check('autotest: «Готово» закрывает', !autotest.isOpen() && events.includes('close:autotest'));

    // ----- общее -----
    openPanel('timeline');
    layerOf('timeline').querySelector('[data-c3="close"]').click();
    check('общее: крестик закрывает', !timeline.isOpen());
    check('общее: ни одной ошибки в консоли браузера', consoleErrors === 0);
  } catch (err) {
    check(`исключение в самопроверке: ${err && err.message}`, false);
  }

  const failed = results.filter((r) => r.startsWith('FAIL')).length;
  results.push('', failed ? `FAIL (${failed} из ${results.length - 1})` : `PASS (${results.length - 1} проверок)`);
  out.textContent = results.join('\n');
  document.title = failed ? 'FAIL' : 'PASS';
}
