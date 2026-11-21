// Планшет тестировщика: журнал действий, трекер, документация, чат и режим «Терминал дежурного».
// Контракт: docs/ARCHITECTURE.md, раздел «Планшет».
import './tablet.css';
import { bus } from '../core/events.js';
import { game, diff } from '../core/state.js';
import { isTouch } from '../core/input.js';
import { sfx } from '../core/audio.js';
import { ACTION_TEXT } from '../content/actions.js';
import { REPORT_SUBJECTS, SEVERITY, EVIDENCE_ITEMS } from '../content/reports.js';
import { DOC_SECTIONS } from '../content/docs.js';

const PROFILE = 'tester_02';
const BUILD = '0.9.7';

const TABS = [
  { id: 'log', label: 'Журнал действий', short: 'Журнал' },
  { id: 'tracker', label: 'Трекер', short: 'Трекер' },
  { id: 'docs', label: 'Документация', short: 'Документы' },
  { id: 'chat', label: 'Чат', short: 'Чат' },
];

const STATUS = {
  open: { text: 'Открыт', cls: 'open' },
  accepted: { text: 'Принят', cls: 'ok' },
  returned: { text: 'На доработке', cls: 'warn' },
  rejected: { text: 'Отклонён', cls: 'muted' },
  closed_cnr: { text: 'Закрыт: не воспроизводится', cls: 'bad' },
};

const RESULT = {
  accepted: { title: 'Отчёт принят', cls: 'ok' },
  returned: { title: 'Вернули на доработку', cls: 'warn' },
  rejected: { title: 'Отчёт отклонён', cls: 'muted' },
};

const PEOPLE = {
  irina: { name: 'Ирина Белова', role: 'руководитель тестирования', letter: 'И', cls: 'irina' },
  timur: { name: 'Тимур Сафин', role: 'программист', letter: 'Т', cls: 'timur' },
  system: { name: 'Система', role: '', letter: 'С', cls: 'system' },
  nikita: { name: 'Никита Орлов', role: 'бывший тестировщик', letter: 'Н', cls: 'nikita' },
};

const FIELD_ERR = {
  subject: 'Выбери объект',
  steps: 'Добавь хотя бы один шаг',
  expected: 'Выбери ожидаемый результат',
  actual: 'Выбери фактический результат',
  severity: 'Выбери серьёзность',
};

// ---------- помощники ----------
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hhmmss(t) {
  const d = new Date(t || 0);
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
}

const actionText = (id) => ACTION_TEXT[id] || id;
const subjectOf = (id) => REPORT_SUBJECTS.find((s) => s.id === id) || null;
const optionText = (subject, kind, id) => subjectOf(subject)?.[kind]?.find((o) => o.id === id)?.text || id || '';
const severityText = (id) => SEVERITY.find((s) => s.id === id)?.text || id || '';
const logKey = (e) => `${e.t}:${e.id}`;
const isPromise = (v) => v && typeof v.then === 'function';

function person(from) {
  if (PEOPLE[from]) return PEOPLE[from];
  const name = String(from || '?');
  return { name, role: '', letter: name.charAt(0).toUpperCase(), cls: 'other' };
}

function statusPill(status) {
  const s = STATUS[status] || { text: status || 'Без статуса', cls: 'muted' };
  return `<span class="tb-pill tb-pill-${s.cls}">${esc(s.text)}</span>`;
}

function checkBox(on, mark = '') {
  return `<span class="tb-check${on ? ' on' : ''}" aria-hidden="true">${on ? mark || '<i></i>' : ''}</span>`;
}

// ---------- планшет ----------
export function createTablet(root, callbacks = {}) {
  const cb = callbacks || {};

  // Вызов сценария: колбэк может отсутствовать, быть синхронным или async.
  async function call(name, ...args) {
    const fn = cb[name];
    if (typeof fn !== 'function') return undefined;
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`[tablet] ${name}:`, err);
      return undefined;
    }
  }

  // Синхронные запросы (canHint, getReplayResult) тоже могут вернуть Promise: кешируем ответ.
  const cache = { canHint: false, getReplayResult: null };
  function ask(name, fallback) {
    const fn = cb[name];
    if (typeof fn !== 'function') return fallback;
    let v;
    try {
      v = fn();
    } catch (err) {
      console.error(`[tablet] ${name}:`, err);
      return fallback;
    }
    if (isPromise(v)) {
      v.then(
        (res) => {
          if (JSON.stringify(res) !== JSON.stringify(cache[name])) {
            cache[name] = res;
            if (opened) render();
          }
        },
        (err) => console.error(`[tablet] ${name}:`, err),
      );
      return cache[name] ?? fallback;
    }
    cache[name] = v;
    return v;
  }
  const replayInfo = () => {
    const r = ask('getReplayResult', null);
    return r && r.ok && Array.isArray(r.steps) ? r : null;
  };

  // ---------- состояние интерфейса ----------
  let opened = false;
  let justOpened = false;
  let mode = 'tablet'; // 'tablet' | 'terminal'
  let tab = 'log';
  let tracker = { view: 'list', id: null }; // view: 'list' | 'card' | 'new'
  const logPicks = new Set();
  const docChecked = new Set();
  const busy = new Set(); // кнопки, ждущие ответа сценария
  let hintNote = '';
  let lastViewKey = '';
  let stateRef = null;
  let chatSeen = 0;
  let form = emptyForm();
  let term = { picks: new Set(), known: new Set(), saved: null, saving: false };

  function emptyForm() {
    return {
      subject: null,
      steps: [],
      source: null, // 'replay' | 'log'
      picks: new Set(),
      expected: null,
      actual: null,
      severity: null,
      attachment: false,
      errors: {},
      result: null,
      sending: false,
    };
  }

  // Новая игра или загрузка: сбросить то, что относится к прошлому прохождению.
  function syncState() {
    const s = game.state;
    if (s === stateRef) return;
    stateRef = s;
    chatSeen = s?.chat?.length || 0;
    logPicks.clear();
    docChecked.clear();
    form = emptyForm();
    tracker = { view: 'list', id: null };
  }

  const st = () => game.state || { name: '', log: [], reports: [], evidence: {}, chat: [], flags: {} };
  const unread = () => Math.max(0, (st().chat?.length || 0) - chatSeen);
  const evidenceCount = () => EVIDENCE_ITEMS.filter((it) => st().evidence?.[it.id]).length;
  const availableEvidence = () => EVIDENCE_ITEMS.filter((it) => st().evidence?.[it.id] || it.alwaysAvailable);

  // ---------- DOM ----------
  const layer = document.createElement('div');
  layer.className = 'tb-layer';
  layer.hidden = true;
  layer.innerHTML = `
    <div class="tb-backdrop" data-act="close"></div>
    <section class="tb-panel" role="dialog" aria-modal="true" aria-label="Планшет тестировщика" tabindex="-1">
      <header class="tb-head"></header>
      <div class="tb-body">
        <nav class="tb-tabs" role="tablist"></nav>
        <main class="tb-main"></main>
      </div>
    </section>
    <section class="tb-term" role="dialog" aria-modal="true" aria-label="Терминал дежурного" tabindex="-1" hidden></section>`;
  root.appendChild(layer);

  const panel = layer.querySelector('.tb-panel');
  const headEl = layer.querySelector('.tb-head');
  const tabsEl = layer.querySelector('.tb-tabs');
  const mainEl = layer.querySelector('.tb-main');
  const termEl = layer.querySelector('.tb-term');

  function updateLayout() {
    const mobile = isTouch || window.innerWidth < 700 || window.innerHeight < 500;
    layer.classList.toggle('tb-mobile', mobile);
    layer.classList.toggle('tb-touch', !!isTouch);
  }
  window.addEventListener('resize', () => {
    if (opened) updateLayout();
  });

  // ---------- шапка и вкладки ----------
  function renderHead() {
    const name = st().name || 'без имени';
    headEl.innerHTML = `
      <div class="tb-head-main">
        <span class="tb-head-app">Планшет QA</span>
        <span class="tb-head-profile">Профиль: <b class="tb-mono">${PROFILE}</b><span class="tb-dot">·</span>${esc(name)}<span class="tb-head-build"><span class="tb-dot">·</span>Сборка <span class="tb-mono">${BUILD}</span></span></span>
      </div>
      <div class="tb-head-side">
        <span class="tb-evidence" title="Собранные улики">Улики: <b class="tb-mono">${evidenceCount()}/${EVIDENCE_ITEMS.length}</b></span>
        <button class="tb-close" data-act="close" aria-label="Закрыть планшет">
          <span class="tb-kbd">Tab</span><span class="tb-x" aria-hidden="true">×</span>
        </button>
      </div>`;
  }

  function renderTabs() {
    const counts = {
      log: '',
      tracker: st().reports?.length ? String(st().reports.length) : '',
      docs: '',
      chat: unread() ? String(unread()) : '',
    };
    tabsEl.innerHTML = TABS.map((t) => {
      const on = t.id === tab;
      const badge = counts[t.id]
        ? `<span class="tb-tab-count${t.id === 'chat' ? ' tb-unread' : ''}">${counts[t.id]}</span>`
        : '';
      return `<button class="tb-tab${on ? ' on' : ''}" role="tab" aria-selected="${on}" data-act="tab" data-tab="${t.id}">
        <span class="tb-tab-label tb-tab-full">${t.label}</span><span class="tb-tab-label tb-tab-short">${t.short}</span>${badge}
      </button>`;
    }).join('');
  }

  // ---------- вкладка «Журнал действий» ----------
  function renderLog() {
    const log = st().log || [];
    // Выбор, указывающий на вытесненные из журнала записи, сбрасываем.
    const keys = new Set(log.filter((e) => !e.foreign).map(logKey));
    [...logPicks].forEach((k) => keys.has(k) || logPicks.delete(k));
    const n = logPicks.size;

    const rows = log.length
      ? log
          .map((e) => {
            const time = `<span class="tb-log-time">${hhmmss(e.t)}</span>`;
            if (e.foreign) {
              return `<li class="tb-log-row tb-foreign" aria-disabled="true">
                <span class="tb-check tb-check-none" aria-hidden="true"></span>${time}
                <span class="tb-log-text tb-glitch" data-text="${esc(e.text)}">${esc(e.text)}</span>
              </li>`;
            }
            const on = logPicks.has(logKey(e));
            return `<li><button class="tb-log-row${on ? ' on' : ''}" role="checkbox" aria-checked="${on}" data-act="log-toggle" data-key="${esc(logKey(e))}">
              ${checkBox(on)}${time}<span class="tb-log-text">${esc(e.text)}</span>
            </button></li>`;
          })
          .join('')
      : '';

    return `
      <div class="tb-section-head">
        <h2>Журнал действий</h2>
        <span class="tb-muted">Старые сверху, новые снизу. Отметь шаги и запусти повтор.</span>
      </div>
      ${log.length ? `<ol class="tb-log">${rows}</ol>` : `<p class="tb-empty">Журнал пуст. Действия на станции появятся здесь.</p>`}
      <div class="tb-actions">
        <span class="tb-muted tb-actions-info">Отмечено: <b class="tb-mono">${n}</b></span>
        <button class="tb-btn" data-act="log-clear"${n ? '' : ' disabled'}>Снять выбор</button>
        <button class="tb-btn tb-btn-primary" data-act="replay"${n ? '' : ' disabled'}>Воспроизвести выбранное</button>
      </div>`;
  }

  // ---------- вкладка «Трекер» ----------
  function renderTracker() {
    if (tracker.view === 'new') return renderForm();
    if (tracker.view === 'card') {
      const r = (st().reports || []).find((x) => String(x.id) === String(tracker.id));
      if (r) return renderCard(r);
      tracker = { view: 'list', id: null };
    }
    return renderList();
  }

  function renderList() {
    const reports = [...(st().reports || [])].reverse();
    const rows = reports
      .map(
        (r) => `<li><button class="tb-rep-row" data-act="open-report" data-id="${esc(r.id)}">
          <span class="tb-rep-id">#${esc(r.id)}</span>
          <span class="tb-rep-title">${esc(r.title)}<span class="tb-rep-meta">${esc(r.author || '')}${r.date ? `, ${esc(r.date)}` : ''}</span></span>
          ${statusPill(r.status)}
        </button></li>`,
      )
      .join('');
    return `
      <div class="tb-section-head tb-row-between">
        <div><h2>Отчёты</h2><span class="tb-muted">Сборка ${BUILD}. Новые сверху.</span></div>
        <button class="tb-btn tb-btn-primary" data-act="new-report">Новый отчёт</button>
      </div>
      ${reports.length ? `<ul class="tb-rep-list">${rows}</ul>` : `<p class="tb-empty">Отчётов пока нет. Нашёл странность: повтори её и опиши.</p>`}`;
  }

  function stepsList(steps, mark) {
    if (!steps?.length) return `<p class="tb-muted">Шаги не указаны.</p>`;
    return `<ol class="tb-steps">${steps
      .map((id) => `<li class="${mark && mark.has(id) ? 'tb-match' : ''}">${esc(actionText(id))}</li>`)
      .join('')}</ol>`;
  }

  function myReportFor(subject) {
    const mine = (st().reports || []).filter((r) => !r.foreign && r.subject === subject);
    return mine.find((r) => r.status === 'accepted') || mine[mine.length - 1] || null;
  }

  function renderCompare(r) {
    const mine = myReportFor(r.subject);
    const cmp = r.compare || {};
    if (!mine) {
      return `<div class="tb-compare-empty">Твой отчёт по объекту «${esc(subjectOf(r.subject)?.label || r.subject)}» не найден. Сравнивать не с чем.</div>`;
    }
    const a = new Set(r.steps || []);
    const b = new Set(mine.steps || []);
    const common = new Set([...a].filter((x) => b.has(x)));
    const profA = r.profile || PROFILE;
    const profB = mine.profile || PROFILE;
    const profMatch = cmp.matchProfile ?? profA === profB;
    const stepsMatch = cmp.matchSteps ?? (common.size && common.size === a.size && a.size === b.size);
    const col = (rep, title, prof) => `
      <div class="tb-col">
        <div class="tb-col-head">${esc(title)}${rep === r ? '' : ` <span class="tb-mono">#${esc(rep.id)}</span>`}</div>
        <div class="tb-col-row${profMatch ? ' tb-match' : ''}">Профиль: <b class="tb-mono">${esc(prof)}</b></div>
        <div class="tb-col-row tb-col-label">Автор: ${esc(rep.author || '')}</div>
        <div class="tb-col-label">Шаги</div>
        ${stepsList(rep.steps, common)}
      </div>`;
    return `
      <div class="tb-compare">
        <div class="tb-compare-sum">
          <span class="tb-pill tb-pill-${stepsMatch ? 'warn' : 'muted'}">Шаги: ${common.size} из ${Math.max(a.size, b.size)} совпадают</span>
          <span class="tb-pill tb-pill-${profMatch ? 'warn' : 'muted'}">Профиль ${profMatch ? 'совпадает' : 'другой'}</span>
        </div>
        <div class="tb-cols">
          ${col(r, `Отчёт #${r.id}`, profA)}
          ${col(mine, 'Твой отчёт', profB)}
        </div>
      </div>`;
  }

  function renderCard(r) {
    const subj = subjectOf(r.subject);
    const meta = [
      ['Автор', esc(r.author || '')],
      ['Профиль', `<span class="tb-mono">${esc(r.profile || '')}</span>`],
      ['Дата', esc(r.date || '')],
      ['Закрыл', r.closedBy ? `<span class="tb-mono">${esc(r.closedBy)}</span>` : '<span class="tb-muted">нет</span>'],
      ['Объект', esc(subj?.label || r.subject || '')],
      ['Серьёзность', esc(severityText(r.severity))],
    ]
      .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
      .join('');
    const comments = (r.comments || []).length
      ? (r.comments || [])
          .map(
            (c) => `<blockquote class="tb-quote"><p>${esc(c.text)}</p><cite class="tb-mono">${esc(c.from)}</cite></blockquote>`,
          )
          .join('')
      : `<p class="tb-muted">Комментариев нет.</p>`;
    const attach = r.attachment
      ? `<div class="tb-attach"><span class="tb-attach-icon" aria-hidden="true">▶</span><span>Запись повтора${r.foreign ? ` (${esc(r.author || '')})` : ''}</span>${
          r.foreign
            ? `<button class="tb-btn tb-btn-small" data-act="play" data-id="${esc(r.id)}"${busy.has('play') ? ' disabled' : ''}>Воспроизвести запись</button>`
            : ''
        }</div>`
      : `<p class="tb-muted">Вложений нет.</p>`;
    const foreignBar = r.foreign
      ? `<div class="tb-card-actions">
          <button class="tb-btn tb-btn-primary" data-act="compare" data-id="${esc(r.id)}"${busy.has('compare') ? ' disabled' : ''}>${busy.has('compare') ? 'Сравниваю…' : 'Сравнить с моим'}</button>
          <button class="tb-btn" data-act="play" data-id="${esc(r.id)}"${busy.has('play') ? ' disabled' : ''}>Воспроизвести запись</button>
        </div>`
      : '';
    return `
      <button class="tb-back" data-act="back">‹ Все отчёты</button>
      <div class="tb-card">
        <div class="tb-card-head">
          <span class="tb-rep-id tb-rep-id-big">#${esc(r.id)}</span>
          ${statusPill(r.status)}
          ${r.foreign ? '<span class="tb-pill tb-pill-outline">Чужой отчёт</span>' : ''}
        </div>
        <h2 class="tb-card-title">${esc(r.title)}</h2>
        <dl class="tb-meta">${meta}</dl>
        ${foreignBar}
        ${r.foreign && r.compare ? `<h3>Сравнение</h3>${renderCompare(r)}` : ''}
        <h3>Шаги воспроизведения</h3>
        ${stepsList(r.steps)}
        <div class="tb-two">
          <div><h3>Ожидаемый результат</h3><p>${esc(optionText(r.subject, 'expected', r.expected)) || '<span class="tb-muted">не указан</span>'}</p></div>
          <div><h3>Фактический результат</h3><p>${esc(optionText(r.subject, 'actual', r.actual)) || '<span class="tb-muted">не указан</span>'}</p></div>
        </div>
        <h3>Вложения</h3>
        ${attach}
        <h3>Комментарии</h3>
        ${comments}
      </div>`;
  }

  // ---------- форма нового отчёта ----------
  function fieldClass(k) {
    return `tb-field${form.errors[k] ? ' tb-field-err' : ''}`;
  }
  function fieldErr(k) {
    return form.errors[k] ? `<p class="tb-err-text">${FIELD_ERR[k]}</p>` : '';
  }
  function radioList(act, options, value, label) {
    return `<div class="tb-options" role="radiogroup" aria-label="${esc(label)}">${options
      .map(
        (o) => `<button class="tb-opt${o.id === value ? ' on' : ''}" role="radio" aria-checked="${o.id === value}" data-act="${act}" data-id="${esc(o.id)}">
          <span class="tb-radio" aria-hidden="true"></span><span>${esc(o.text ?? o.label)}</span>
        </button>`,
      )
      .join('')}</div>`;
  }

  function renderForm() {
    const subj = subjectOf(form.subject);
    const replay = replayInfo();
    if (!replay && form.attachment) form.attachment = false;
    const log = (st().log || []).filter((e) => !e.foreign);
    const valid = new Set(log.map(logKey));
    [...form.picks].forEach((k) => valid.has(k) || form.picks.delete(k));

    const chosen = form.steps.length
      ? `<ol class="tb-steps tb-steps-chosen">${form.steps.map((id) => `<li>${esc(actionText(id))}</li>`).join('')}</ol>`
      : `<p class="tb-muted tb-steps-empty">Шаги не выбраны.</p>`;
    const picker = log.length
      ? `<ol class="tb-picker">${log
          .map((e) => {
            const on = form.picks.has(logKey(e));
            return `<li><button class="tb-log-row tb-log-row-small${on ? ' on' : ''}" role="checkbox" aria-checked="${on}" data-act="f-pick" data-key="${esc(logKey(e))}">
              ${checkBox(on)}<span class="tb-log-time">${hhmmss(e.t)}</span><span class="tb-log-text">${esc(e.text)}</span>
            </button></li>`;
          })
          .join('')}</ol>`
      : `<p class="tb-muted">В журнале пока нет действий.</p>`;

    const res = form.result;
    const resBox = res
      ? `<div class="tb-result tb-result-${RESULT[res.status]?.cls || 'muted'}" role="status">
          <b>${esc(RESULT[res.status]?.title || res.status)}</b>${res.message ? `<p>${esc(res.message)}</p>` : ''}
        </div>`
      : '';
    const hasErr = Object.keys(form.errors).length > 0;

    return `
      <button class="tb-back" data-act="back">‹ Все отчёты</button>
      <div class="tb-section-head"><h2>Новый отчёт</h2><span class="tb-muted">Шаги, что ожидал, что получил, насколько серьёзно.</span></div>
      ${resBox}
      <div class="tb-form">
        <div class="${fieldClass('subject')}">
          <div class="tb-label"><span class="tb-num">1</span>Объект</div>
          ${radioList('f-subject', REPORT_SUBJECTS, form.subject, 'Объект')}
          ${subj ? `<p class="tb-hint">Заголовок: <b>${esc(subj.title)}</b></p>` : ''}
          ${fieldErr('subject')}
        </div>

        <div class="${fieldClass('steps')}">
          <div class="tb-label"><span class="tb-num">2</span>Шаги воспроизведения</div>
          ${chosen}
          <div class="tb-inline-btns">
            ${replay ? `<button class="tb-btn tb-btn-small tb-btn-accent" data-act="f-replay-steps">Подставить шаги из повтора</button>` : ''}
            ${form.steps.length ? `<button class="tb-btn tb-btn-small" data-act="f-clear-steps">Очистить шаги</button>` : ''}
          </div>
          <p class="tb-hint">${replay ? 'Или отметь действия из журнала:' : 'Повтора пока нет. Отметь действия из журнала по порядку:'}</p>
          ${picker}
          ${fieldErr('steps')}
        </div>

        <div class="${fieldClass('expected')}">
          <div class="tb-label"><span class="tb-num">3</span>Ожидаемый результат</div>
          ${subj ? radioList('f-expected', subj.expected, form.expected, 'Ожидаемый результат') : `<p class="tb-muted">Сначала выбери объект.</p>`}
          <p class="tb-hint">Как должно быть, сверяйся с документацией.</p>
          ${fieldErr('expected')}
        </div>

        <div class="${fieldClass('actual')}">
          <div class="tb-label"><span class="tb-num">4</span>Фактический результат</div>
          ${subj ? radioList('f-actual', subj.actual, form.actual, 'Фактический результат') : `<p class="tb-muted">Сначала выбери объект.</p>`}
          ${fieldErr('actual')}
        </div>

        <div class="${fieldClass('severity')}">
          <div class="tb-label"><span class="tb-num">5</span>Серьёзность</div>
          ${radioList('f-severity', SEVERITY, form.severity, 'Серьёзность')}
          ${fieldErr('severity')}
        </div>

        <div class="tb-field">
          <button class="tb-opt tb-opt-check${form.attachment ? ' on' : ''}" role="checkbox" aria-checked="${form.attachment}" data-act="f-attach"${replay ? '' : ' disabled'}>
            ${checkBox(form.attachment)}<span>Приложить запись повтора${replay ? '' : '<span class="tb-muted"> (нужен успешный повтор)</span>'}</span>
          </button>
        </div>
      </div>
      <div class="tb-actions">
        <span class="tb-actions-info ${hasErr ? 'tb-err-text' : 'tb-muted'}">${hasErr ? 'Заполни отмеченные поля' : ''}</span>
        <button class="tb-btn" data-act="back">Отмена</button>
        <button class="tb-btn tb-btn-primary" data-act="f-submit"${form.sending ? ' disabled' : ''}>${form.sending ? 'Отправляю…' : 'Отправить'}</button>
      </div>`;
  }

  function stepsFromPicks() {
    form.steps = (st().log || []).filter((e) => !e.foreign && form.picks.has(logKey(e))).map((e) => e.id);
  }

  function validate() {
    const e = {};
    if (!form.subject) e.subject = true;
    if (!form.steps.length) e.steps = true;
    if (!form.expected) e.expected = true;
    if (!form.actual) e.actual = true;
    if (!form.severity) e.severity = true;
    form.errors = e;
    return !Object.keys(e).length;
  }

  async function submit() {
    if (form.sending) return;
    if (!validate()) {
      form.result = null;
      render();
      mainEl.querySelector('.tb-field-err')?.scrollIntoView({ block: 'center' });
      return;
    }
    const subj = subjectOf(form.subject);
    const draft = {
      subject: form.subject,
      title: subj?.title || '',
      steps: [...form.steps],
      expected: form.expected,
      actual: form.actual,
      severity: form.severity,
      attachment: !!(form.attachment && replayInfo()),
    };
    form.sending = true;
    render();
    const res = typeof cb.onSubmitReport === 'function' ? await call('onSubmitReport', draft) : undefined;
    form.sending = false;
    const status = res?.status;
    if (status === 'returned') {
      form.result = { status, message: res.message || '' };
    } else if (status === 'accepted' || status === 'rejected') {
      const keep = { status, message: res.message || '' };
      form = emptyForm();
      form.result = keep;
    } else {
      form.result = { status: 'rejected', message: res?.message || 'Трекер не ответил. Попробуй ещё раз.' };
    }
    if (status === 'accepted') sfx.success?.();
    render();
    mainEl.scrollTop = 0;
  }

  // ---------- вкладка «Документация» ----------
  function isDocChecked(id) {
    if (docChecked.has(id)) return true;
    if (typeof cb.isDocChecked === 'function') {
      try {
        return !!cb.isDocChecked(id);
      } catch {
        return false;
      }
    }
    return false;
  }

  function renderDocs() {
    const toc = DOC_SECTIONS.map((s) => `<a class="tb-toc-item" data-act="doc-jump" data-id="${esc(s.id)}">${esc(s.title)}</a>`).join('');
    const body = DOC_SECTIONS.map((s) => {
      const checked = isDocChecked(s.id);
      const tool = s.checkable
        ? checked
          ? `<span class="tb-pill tb-pill-ok">Проверено</span>`
          : `<button class="tb-btn tb-btn-small" data-act="doc-check" data-id="${esc(s.id)}">Проверено: не баг</button>`
        : '';
      return `<article class="tb-doc" id="tb-doc-${esc(s.id)}">
        <div class="tb-doc-head"><h3>${esc(s.title)}</h3>${tool}</div>
        <p>${esc(s.body)}</p>
      </article>`;
    }).join('');
    return `
      <div class="tb-section-head"><h2>Документация</h2><span class="tb-muted">«Станция Рассвет», ГДД. Источник ожидаемого поведения.</span></div>
      <div class="tb-docs">
        <nav class="tb-toc">${toc}</nav>
        <div class="tb-doc-list">${body}</div>
      </div>`;
  }

  // ---------- вкладка «Чат» ----------
  function renderChat() {
    const chat = st().chat || [];
    const msgs = chat.length
      ? chat
          .map((m, i) => {
            const p = person(m.from);
            const prev = chat[i - 1];
            const grouped = prev && prev.from === m.from && m.t - prev.t < 60000;
            return `<li class="tb-msg${grouped ? ' tb-msg-grouped' : ''}${m.from === 'system' ? ' tb-msg-system' : ''}">
              <span class="tb-avatar tb-av-${p.cls}" aria-hidden="true">${esc(p.letter)}</span>
              <div class="tb-msg-body">
                <div class="tb-msg-head"><b>${esc(p.name)}</b>${p.role ? `<span class="tb-muted tb-msg-role">${esc(p.role)}</span>` : ''}<span class="tb-log-time">${hhmmss(m.t)}</span></div>
                <p>${esc(m.text)}</p>
              </div>
            </li>`;
          })
          .join('')
      : '';
    const canHint = !!ask('canHint', false);
    let left = '';
    try {
      const d = diff();
      if (Number.isFinite(d.hints)) left = `Осталось подсказок: ${Math.max(0, d.hints - (st().hintsUsed || 0))}`;
    } catch {
      /* без состояния */
    }
    return `
      <div class="tb-section-head"><h2>Чат команды</h2><span class="tb-muted">#релиз-097</span></div>
      ${chat.length ? `<ul class="tb-chat">${msgs}</ul>` : `<p class="tb-empty">Сообщений пока нет.</p>`}
      ${
        canHint || hintNote
          ? `<div class="tb-actions">
              <span class="tb-actions-info tb-muted">${esc(hintNote || left)}</span>
              ${canHint ? `<button class="tb-btn tb-btn-primary" data-act="hint"${busy.has('hint') ? ' disabled' : ''}>Спросить Ирину</button>` : ''}
            </div>`
          : ''
      }`;
  }

  // ---------- режим терминала ----------
  function renderTerminal() {
    const items = availableEvidence();
    items.forEach((it) => {
      if (!term.known.has(it.id)) {
        term.known.add(it.id);
        if (term.saved === null) term.picks.add(it.id);
      }
    });
    const n = items.filter((it) => term.picks.has(it.id)).length;
    let body;
    if (term.saved !== null) {
      body = `
        <p class="tb-term-line">&gt; Запись в архив сборки ${BUILD}... готово.</p>
        <p class="tb-term-line tb-term-big">Сохранено: ${term.saved}</p>
        <div class="tb-term-actions"><button class="tb-term-btn" data-act="t-close">[ Закрыть ]</button></div>`;
    } else if (!items.length) {
      body = `
        <p class="tb-term-line">&gt; Нет данных для сохранения.</p>
        <div class="tb-term-actions"><button class="tb-term-btn" data-act="t-close">[ Закрыть ]</button></div>`;
    } else {
      body = `
        <p class="tb-term-line">&gt; Выбери данные для сохранения:</p>
        <ul class="tb-term-list">${items
          .map((it) => {
            const on = term.picks.has(it.id);
            return `<li><button class="tb-term-item${on ? ' on' : ''}" role="checkbox" aria-checked="${on}" data-act="t-toggle" data-id="${esc(it.id)}"${term.saving ? ' disabled' : ''}>
              <span class="tb-term-box">[${on ? 'x' : ' '}]</span>
              <span><span class="tb-term-title">${esc(it.title)}</span><span class="tb-term-desc">${esc(it.desc)}</span></span>
            </button></li>`;
          })
          .join('')}</ul>
        <p class="tb-term-line tb-term-dim">&gt; Отмечено: ${n} из ${items.length}${term.saving ? '. Сохраняю...' : ''}</p>
        <div class="tb-term-actions">
          <button class="tb-term-btn tb-term-primary" data-act="t-save"${n && !term.saving ? '' : ' disabled'}>[ Сохранить в архив сборки ]</button>
          <button class="tb-term-btn" data-act="t-close"${term.saving ? ' disabled' : ''}>[ Закрыть ]</button>
        </div>`;
    }
    termEl.innerHTML = `
      <div class="tb-term-head">
        <span>ТЕРМИНАЛ ДЕЖУРНОГО. Архив сборки</span>
        <button class="tb-term-x" data-act="t-close" aria-label="Закрыть терминал">×</button>
      </div>
      <div class="tb-term-sub">Станция Рассвет · сборка ${BUILD} · профиль ${PROFILE}</div>
      <div class="tb-term-body">${body}<span class="tb-term-cursor" aria-hidden="true"></span></div>`;
  }

  async function saveEvidence() {
    if (term.saving) return;
    const ids = availableEvidence()
      .filter((it) => term.picks.has(it.id))
      .map((it) => it.id);
    if (!ids.length) return;
    term.saving = true;
    render();
    await call('onSaveEvidence', ids);
    term.saving = false;
    term.saved = ids.length;
    sfx.success?.();
    render();
  }

  // ---------- общий рендер ----------
  function render() {
    if (!opened) return;
    syncState();
    updateLayout();
    if (mode === 'terminal') {
      panel.hidden = true;
      termEl.hidden = false;
      layer.classList.add('tb-mode-term');
      renderTerminal();
      return;
    }
    panel.hidden = false;
    termEl.hidden = true;
    layer.classList.remove('tb-mode-term');

    const viewKey = tab === 'tracker' ? `tracker:${tracker.view}:${tracker.id}` : tab;
    const sameView = viewKey === lastViewKey;
    const prevTop = mainEl.scrollTop;
    const atBottom = mainEl.scrollHeight - mainEl.clientHeight - mainEl.scrollTop < 24;

    if (tab === 'chat') chatSeen = st().chat?.length || 0;
    renderHead();
    renderTabs();
    let html = '';
    if (tab === 'log') html = renderLog();
    else if (tab === 'tracker') html = renderTracker();
    else if (tab === 'docs') html = renderDocs();
    else html = renderChat();
    mainEl.innerHTML = `<div class="tb-view tb-view-${tab}">${html}</div>`;
    mainEl.setAttribute('aria-label', TABS.find((t) => t.id === tab)?.label || '');

    const stick = tab === 'log' || tab === 'chat';
    if (stick && (!sameView || atBottom)) mainEl.scrollTop = mainEl.scrollHeight;
    else mainEl.scrollTop = sameView ? prevTop : 0;
    lastViewKey = viewKey;
  }

  // ---------- клики ----------
  layer.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-act]');
    if (!el || !layer.contains(el) || el.disabled) return;
    const act = el.dataset.act;
    const id = el.dataset.id;
    if (act !== 'close' || el.classList.contains('tb-close')) sfx.ui();
    handle(act, el, id);
  });

  function handle(act, el, id) {
    switch (act) {
      case 'close':
        close();
        break;
      case 'tab':
        tab = el.dataset.tab;
        if (tab === 'tracker' && tracker.view === 'card') tracker = { view: 'list', id: null };
        render();
        break;

      // журнал
      case 'log-toggle': {
        const k = el.dataset.key;
        if (logPicks.has(k)) logPicks.delete(k);
        else logPicks.add(k);
        render();
        break;
      }
      case 'log-clear':
        logPicks.clear();
        render();
        break;
      case 'replay': {
        const ids = (st().log || []).filter((e) => !e.foreign && logPicks.has(logKey(e))).map((e) => e.id);
        if (!ids.length) return;
        logPicks.clear();
        close();
        call('onReplay', ids);
        break;
      }

      // трекер
      case 'new-report':
        tracker = { view: 'new', id: null };
        if (form.result && form.result.status !== 'returned') form.result = null;
        render();
        break;
      case 'open-report':
        tracker = { view: 'card', id };
        render();
        break;
      case 'back':
        tracker = { view: 'list', id: null };
        render();
        break;
      case 'compare':
        runBusy('compare', () => call('onCompare', id));
        break;
      case 'play':
        close();
        call('onPlayRecording', id);
        break;

      // форма
      case 'f-subject':
        if (form.subject !== id) {
          form.subject = id;
          form.expected = null;
          form.actual = null;
        }
        clearErr('subject');
        render();
        break;
      case 'f-replay-steps': {
        const r = replayInfo();
        if (!r) return;
        form.steps = [...r.steps];
        form.source = 'replay';
        form.picks.clear();
        form.attachment = true;
        clearErr('steps');
        render();
        break;
      }
      case 'f-pick': {
        const k = el.dataset.key;
        if (form.picks.has(k)) form.picks.delete(k);
        else form.picks.add(k);
        form.source = 'log';
        stepsFromPicks();
        if (form.steps.length) clearErr('steps');
        render();
        break;
      }
      case 'f-clear-steps':
        form.steps = [];
        form.picks.clear();
        form.source = null;
        render();
        break;
      case 'f-expected':
        form.expected = id;
        clearErr('expected');
        render();
        break;
      case 'f-actual':
        form.actual = id;
        clearErr('actual');
        render();
        break;
      case 'f-severity':
        form.severity = id;
        clearErr('severity');
        render();
        break;
      case 'f-attach':
        if (replayInfo()) form.attachment = !form.attachment;
        render();
        break;
      case 'f-submit':
        submit();
        break;

      // документация
      case 'doc-jump':
        mainEl.querySelector(`#tb-doc-${CSS.escape(id)}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        break;
      case 'doc-check':
        docChecked.add(id);
        render();
        call('onDocCheck', id);
        break;

      // чат
      case 'hint':
        runBusy('hint', async () => {
          const ans = await call('onHint');
          hintNote = ans ? '' : 'Подсказок не осталось';
        });
        break;

      // терминал
      case 't-toggle':
        if (term.picks.has(id)) term.picks.delete(id);
        else term.picks.add(id);
        render();
        break;
      case 't-save':
        saveEvidence();
        break;
      case 't-close':
        close();
        break;
      default:
        break;
    }
  }

  function clearErr(k) {
    if (form.errors[k]) delete form.errors[k];
  }

  async function runBusy(key, fn) {
    if (busy.has(key)) return;
    busy.add(key);
    render();
    try {
      await fn();
    } finally {
      busy.delete(key);
      render();
    }
  }

  // ---------- открытие и закрытие ----------
  function show() {
    const was = opened;
    opened = true;
    layer.hidden = false;
    lastViewKey = '';
    render();
    if (!was) {
      justOpened = true;
      queueMicrotask(() => (justOpened = false));
      (mode === 'terminal' ? termEl : panel).focus({ preventScroll: true });
      bus.emit('tablet:open', { mode, tab });
    }
  }

  function open(t) {
    if (t && TABS.some((x) => x.id === t)) tab = t;
    mode = 'tablet';
    show();
  }

  function openTerminal() {
    syncState();
    mode = 'terminal';
    term = { picks: new Set(), known: new Set(), saved: null, saving: false };
    show();
  }

  function openReport(id) {
    syncState();
    tab = 'tracker';
    tracker = { view: 'card', id: String(id) };
    mode = 'tablet';
    show();
  }

  function close() {
    if (!opened) return;
    opened = false;
    layer.hidden = true;
    hintNote = '';
    const wasMode = mode;
    mode = 'tablet';
    if (document.activeElement && layer.contains(document.activeElement)) document.activeElement.blur();
    bus.emit('tablet:close', { mode: wasMode });
  }

  // Tab и Esc закрывают открытый планшет. Закрываем в микрозадаче: так обработчик сценария,
  // который откроет планшет по тому же 'input:tablet' или паузу по 'input:pause', увидит isOpen() === true
  // и не откроет их заново. Открытие закрытого планшета решает сценарий.
  function closeFromKey() {
    if (!opened || justOpened) return;
    queueMicrotask(() => {
      if (opened) close();
    });
  }
  bus.on('input:tablet', closeFromKey);
  bus.on('input:pause', closeFromKey);

  ['log', 'chat', 'flag', 'evidence', 'reports'].forEach((evt) =>
    bus.on(evt, () => {
      // Первое событие нового прохождения: всё, что было в чате до него, считаем прочитанным.
      if (game.state !== stateRef) {
        syncState();
        if (evt === 'chat') chatSeen = Math.max(0, chatSeen - 1);
      }
      if (opened) render();
    }),
  );

  return {
    open,
    close,
    isOpen: () => opened,
    openTerminal,
    openReport,
    refresh: () => render(),
    get unread() {
      syncState();
      return unread();
    },
  };
}
