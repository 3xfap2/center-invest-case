// Предпросмотр планшета без 3D. Параметры адреса:
// ?tab=log|tracker|docs|chat  &view=card|compare|new|filled|errors|returned|terminal|saved
import { bus } from '../src/core/events.js';
import { game, newGame, pushChat, logAction } from '../src/core/state.js';
import { initInput } from '../src/core/input.js';
import { createTablet } from '../src/ui/tablet.js';

const q = new URLSearchParams(location.search);
const view = q.get('view') || '';

// ?frame=390x844: показать страницу в рамке телефона (окно Chrome не бывает уже ~500 px).
const frame = q.get('frame');
if (frame) {
  const [fw, fh] = frame.split('x').map(Number);
  q.delete('frame');
  document.body.innerHTML = `<iframe src="?${q}" style="position:fixed;left:0;top:0;width:${fw}px;height:${fh}px;border:0;background:#000"></iframe>`;
  throw new Error('frame mode');
}

newGame('Матвей', 'tester');
const s = game.state;
const t0 = new Date();
t0.setHours(23, 41, 5, 0);
let t = t0.getTime();
const add = (id, text, foreign = false) => s.log.push({ id, text, t: (t += 17000 + Math.round(Math.random() * 30000)), foreign });

add('enter_station', 'Запустил сборку 0.9.7');
add('talk_lis', 'Поговорил с Лисом');
add('inspect_bench', 'Осмотрел скамейку');
add('inspect_clock', 'Осмотрел часы');
add('take_lantern', 'Взял фонарь');
add('open_archive', 'Открыл дверь архива');
add('enter_archive', 'Вошёл в архив');
add('exit_archive', 'Вышел из архива');
add('inspect_journal', 'Осмотрел журнал путешественников');
add('try_service_door', 'Попробовал открыть служебный выход');
add('use_terminal', 'Открыл терминал дежурного');
add('door_other_side', 'Дверь открыта с другой стороны', true);

const chat = (from, text) => s.chat.push({ from, text, t: (t += 40000) });
chat('irina', 'Персонаж назвал тебя по имени? Странно. Имя он берёт из профиля. Запиши это себе, но пока не отвлекайся.');
chat('irina', 'Начни со скамейки: шаги, ожидаемый результат по документации, фактический, серьёзность.');
chat('timur', 'Ха. Коллайдер. Исправлю после релиза.');
chat('system', 'Отчёт #0417 принят.');
chat('timur', 'У меня журнал на месте. Пришли шаги и запись, тогда поверю.');

s.reports.push(
  {
    id: '0417', title: 'Скамейка висит в воздухе и вращается', subject: 'bench', steps: ['enter_station', 'inspect_bench'],
    expected: 'bench_floor', actual: 'bench_flying', severity: 'low', attachment: false, status: 'accepted',
    author: 'tester_02 (Матвей)', profile: 'tester_02', date: 'сегодня', closedBy: null, comments: [{ from: 't.safin', text: 'Ха. Коллайдер. Исправлю после релиза.' }], foreign: false, compare: null,
  },
  {
    id: '0418', title: 'Часы на станции идут назад', subject: 'clock', steps: ['inspect_clock'],
    expected: 'clock_forward', actual: 'clock_backward', severity: 'medium', attachment: false, status: 'rejected',
    author: 'tester_02 (Матвей)', profile: 'tester_02', date: 'сегодня', closedBy: 'qa-lead', comments: [], foreign: false, compare: null,
  },
  {
    id: '0419', title: 'Журнал путешественников исчезает со стойки', subject: 'journal', steps: ['take_lantern', 'enter_archive', 'exit_archive'],
    expected: 'journal_stays', actual: 'journal_vanishes', severity: 'high', attachment: true, status: 'accepted',
    author: 'tester_02 (Матвей)', profile: 'tester_02', date: 'сегодня', closedBy: null, comments: [], foreign: false, compare: null,
  },
  {
    id: '0412', title: 'Журнал путешественников исчезает со стойки', subject: 'journal', steps: ['take_lantern', 'enter_archive', 'exit_archive'],
    expected: 'journal_stays', actual: 'journal_vanishes', severity: 'high', attachment: true, status: 'closed_cnr',
    author: 'n.orlov', profile: 'tester_02', date: '24.10', closedBy: 'qa-lead',
    comments: [{ from: 'n.orlov', text: 'Если тебе тоже сказали, что это невозможно, сохрани запись до следующего обновления.' }],
    foreign: true, compare: view === 'compare' ? { matchSteps: true, matchProfile: true } : null,
  },
);
s.evidence = { replay_journal: true, report_0412: true, chalk_note: true };

let replay = { steps: ['take_lantern', 'enter_archive', 'exit_archive'], ok: true };
let hints = 3;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const tablet = createTablet(document.getElementById('ui'), {
  async onReplay(ids) {
    console.log('onReplay', ids);
    await wait(600);
    replay = { steps: ids, ok: ids.includes('take_lantern') && ids.includes('enter_archive') && ids.includes('exit_archive') };
    tablet.open('log');
  },
  async onSubmitReport(draft) {
    console.log('onSubmitReport', draft);
    await wait(400);
    if (draft.subject === 'clock') return { status: 'rejected', message: 'Так задумано. Документация, раздел 2.3.' };
    if (draft.severity === 'low') return { status: 'returned', message: 'Журнал пропадает вместе с прогрессом. Это не «Низкая». Поправь серьёзность.' };
    s.reports.push({ ...draft, id: String(420 + s.reports.length).padStart(4, '0'), status: 'accepted', author: 'tester_02 (Матвей)', profile: 'tester_02', date: 'сегодня', closedBy: null, comments: [], foreign: false, compare: null });
    bus.emit('reports');
    return { status: 'accepted', message: 'Найден похожий отчёт #0412. Открой его в трекере.' };
  },
  onDocCheck(id) {
    console.log('onDocCheck', id);
  },
  canHint: () => hints > 0,
  async onHint() {
    if (hints <= 0) return null;
    hints -= 1;
    s.hintsUsed += 1;
    await wait(300);
    pushChat('irina', 'Посмотри журнал действий: что ты делал прямо перед тем, как журнал исчез?');
    return 'ok';
  },
  async onCompare(id) {
    await wait(300);
    const r = s.reports.find((x) => x.id === id);
    r.compare = { matchSteps: true, matchProfile: true };
    bus.emit('reports');
  },
  onPlayRecording(id) {
    console.log('onPlayRecording', id);
  },
  async onSaveEvidence(ids) {
    console.log('onSaveEvidence', ids);
    await wait(300);
  },
  getReplayResult: () => replay,
});

// Как сценарий: Tab открывает закрытый планшет.
initInput(document.getElementById('view'));
bus.on('input:tablet', () => {
  if (!tablet.isOpen()) tablet.open();
});
bus.on('tablet:open', (d) => console.log('tablet:open', d));
bus.on('tablet:close', (d) => console.log('tablet:close', d));

document.querySelector('.dev-bar').addEventListener('click', (e) => {
  const a = e.target.closest('[data-dev]')?.dataset.dev;
  if (!a) return;
  if (a === 'card') tablet.openReport('0412');
  else if (a === 'terminal') tablet.openTerminal();
  else if (a === 'msg') pushChat('timur', '…подожди. Профиль tester_02? Ладно. Завтра.');
  else if (a === 'foreign') logAction('door_other_side', { foreign: true });
  else tablet.open(a);
});

// Начальное состояние для скриншотов.
const click = (sel) => document.querySelector(sel)?.click();
window.tablet = tablet;
(async () => {
  if (view === 'terminal' || view === 'saved') {
    tablet.openTerminal();
    if (view === 'saved') {
      click('[data-act="t-save"]');
      await wait(400);
    }
  } else if (view === 'card' || view === 'compare') {
    tablet.openReport('0412');
  } else if (['new', 'filled', 'errors', 'returned'].includes(view)) {
    tablet.open('tracker');
    click('[data-act="new-report"]');
    if (view === 'errors') click('[data-act="f-submit"]');
    if (view === 'filled' || view === 'returned') {
      click('[data-act="f-subject"][data-id="journal"]');
      click('[data-act="f-replay-steps"]');
      click('[data-act="f-expected"][data-id="journal_stays"]');
      click('[data-act="f-actual"][data-id="journal_vanishes"]');
      click(`[data-act="f-severity"][data-id="${view === 'returned' ? 'low' : 'high'}"]`);
      if (view === 'returned') {
        click('[data-act="f-submit"]');
        await wait(500);
      }
    }
  } else {
    if (q.get('tab') === 'log') {
      // отметить три шага
      tablet.open('log');
      ['take_lantern', 'enter_archive', 'exit_archive'].forEach((id) => {
        const e = s.log.find((x) => x.id === id);
        click(`[data-act="log-toggle"][data-key="${e.t}:${e.id}"]`);
      });
      pushChat('irina', 'Видела твой отчёт. Хорошая работа. Завтра в девять разберём. Иди домой.');
    } else {
      tablet.open(q.get('tab') || 'log');
    }
  }
  const scroll = q.get('scroll');
  if (scroll) document.querySelector('.tb-main').scrollTop = Number(scroll);
})();

// ?selftest=1: проверка поведения, результат в <pre id="selftest"> (для chrome --dump-dom).
if (q.get('selftest')) {
  const out = [];
  const ok = (name, cond) => out.push(`${cond ? 'PASS' : 'FAIL'} ${name}`);
  const tick = () => new Promise((r) => setTimeout(r, 0));
  const calls = { replay: null, save: null, events: [] };
  bus.on('tablet:open', () => calls.events.push('open'));
  bus.on('tablet:close', () => calls.events.push('close'));
  (async () => {
    await wait(50);
    tablet.close();
    calls.events.length = 0;
    // закрыт + Tab: сценарий открывает, планшет не должен закрыться сам
    bus.emit('input:tablet');
    await tick();
    ok('Tab при закрытом: открыт сценарием', tablet.isOpen());
    // открыт + Tab: закрывается и сценарий не открывает заново
    bus.emit('input:tablet');
    await tick();
    ok('Tab при открытом: закрыт', !tablet.isOpen());
    tablet.open('docs');
    await tick();
    bus.emit('input:pause');
    await tick();
    ok('Esc: закрыт', !tablet.isOpen());
    ok('события open/close', calls.events.join(',') === 'open,close,open,close');
    // непрочитанные
    tablet.open('log');
    pushChat('irina', 'тест');
    ok('счётчик непрочитанных 1', document.querySelector('.tb-unread')?.textContent === '1');
    tablet.open('chat');
    ok('чат прочитан', !document.querySelector('.tb-unread'));
    // журнал: foreign без галочки, повтор
    tablet.open('log');
    ok('чужая запись без кнопки', !document.querySelector('.tb-foreign button') && !!document.querySelector('.tb-foreign'));
    ok('воспроизвести неактивно', document.querySelector('[data-act="replay"]').disabled);
    const row = (i) => document.querySelectorAll('[data-act="log-toggle"]')[i];
    row(6).click();
    row(4).click();
    document.querySelector('[data-act="replay"]').click();
    ok('после повтора планшет закрыт', !tablet.isOpen());
    await wait(700);
    ok('onReplay в хронологическом порядке', JSON.stringify(replay.steps) === JSON.stringify(['take_lantern', 'enter_archive']));
    // форма: валидация
    tablet.open('tracker');
    document.querySelector('[data-act="new-report"]').click();
    document.querySelector('[data-act="f-submit"]').click();
    ok('валидация: 5 полей подсвечено', document.querySelectorAll('.tb-field-err').length === 5);
    ok('без успешного повтора нет кнопки подстановки', !document.querySelector('[data-act="f-replay-steps"]'));
    document.querySelector('[data-act="f-subject"][data-id="bench"]').click();
    const pick = (i) => document.querySelectorAll('[data-act="f-pick"]')[i];
    pick(2).click();
    pick(0).click();
    ok('шаги из журнала по порядку', [...document.querySelectorAll('.tb-steps-chosen li')].map((l) => l.textContent).join('|') === 'Запустил сборку 0.9.7|Осмотрел скамейку');
    document.querySelector('[data-act="f-expected"][data-id="bench_floor"]').click();
    document.querySelector('[data-act="f-actual"][data-id="bench_flying"]').click();
    document.querySelector('[data-act="f-severity"][data-id="medium"]').click();
    ok('ошибки сняты', document.querySelectorAll('.tb-field-err').length === 0);
    const before = s.reports.length;
    document.querySelector('[data-act="f-submit"]').click();
    await wait(600);
    ok('принят: зелёный результат', !!document.querySelector('.tb-result-ok'));
    ok('отчёт добавлен', s.reports.length === before + 1);
    ok('форма очищена', !document.querySelector('.tb-opt.on'));
    // сравнение
    tablet.openReport('0412');
    document.querySelector('[data-act="compare"]').click();
    await wait(500);
    ok('сравнение: две колонки', document.querySelectorAll('.tb-col').length === 2);
    ok('сравнение: совпадения подсвечены', document.querySelectorAll('.tb-steps .tb-match').length === 6 && document.querySelectorAll('.tb-col-row.tb-match').length === 2);
    // документация
    tablet.open('docs');
    document.querySelector('[data-act="doc-check"]').click();
    ok('документация: Проверено', !document.querySelector('[data-act="doc-check"]') && document.querySelector('.tb-doc .tb-pill-ok')?.textContent === 'Проверено');
    // терминал
    tablet.openTerminal();
    ok('терминал: 3 доказательства отмечены', document.querySelectorAll('.tb-term-item.on').length === 3);
    document.querySelectorAll('.tb-term-item')[2].click();
    document.querySelector('[data-act="t-save"]').click();
    await wait(500);
    ok('терминал: Сохранено: 2', document.querySelector('.tb-term-big')?.textContent === 'Сохранено: 2');
    bus.emit('input:tablet');
    await tick();
    ok('терминал закрывается по Tab', !tablet.isOpen());
    const pre = document.createElement('pre');
    pre.id = 'selftest';
    pre.textContent = out.join('\n');
    document.body.appendChild(pre);
  })().catch((e) => {
    const pre = document.createElement('pre');
    pre.id = 'selftest';
    pre.textContent = out.join('\n') + '\nERROR ' + e.stack;
    document.body.appendChild(pre);
  });
}
