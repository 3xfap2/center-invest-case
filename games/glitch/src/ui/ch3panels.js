// Панели главы 3: доска хронологии, отладочная консоль, гипотезы, конструктор автотеста.
// Контракт: docs/CHAPTER3_SPEC.md, раздел «Контракт панелей». Классы с префиксом c3-.
import './ch3panels.css';
import { bus } from '../core/events.js';
import { isTouch } from '../core/input.js';
import { sfx } from '../core/audio.js';

const FAIL_TEXT = 'Что-то пошло не так';
const UNKNOWN_CMD = 'Неизвестная команда. Нажми на команду из списка.';
const CONSOLE_LIMIT = 400;
const LOG_DELAY = 300;

// ---------- помощники ----------
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Текст с `командами` в обратных кавычках: команды показываем моноширинным.
function richText(s) {
  return esc(s).replace(/`([^`]+)`/g, '<code class="c3-code">$1</code>');
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const sound = (name) => {
  try {
    sfx[name]?.();
  } catch {
    /* звук не критичен */
  }
};

// Вызов колбэка игры: синхронный ответ, Promise или исключение. Ошибку не пишем в консоль браузера,
// панель сама покажет «Что-то пошло не так».
async function safeCall(fn, ...args) {
  if (typeof fn !== 'function') return { error: true, value: undefined };
  try {
    return { error: false, value: await fn(...args) };
  } catch {
    return { error: true, value: undefined };
  }
}

const isMobile = () => isTouch || window.innerWidth < 700 || window.innerHeight < 500;

// ---------- общая оболочка панели ----------
function createShell(root, { name, title, size, closeKey }) {
  const layer = document.createElement('div');
  layer.className = `c3-layer c3-layer-${name}`;
  layer.hidden = true;
  layer.innerHTML = `
    <div class="c3-backdrop" data-c3="backdrop"></div>
    <section class="c3-panel c3-panel-${size}" role="dialog" aria-modal="true" aria-label="${esc(title)}" tabindex="-1">
      <header class="c3-head">
        <div class="c3-head-main">
          <span class="c3-head-title">${esc(title)}</span>
          <span class="c3-head-sub"></span>
        </div>
        <button class="c3-close" type="button" data-c3="close" aria-label="Закрыть">${
          closeKey ? `<span class="c3-kbd">${esc(closeKey)}</span>` : ''
        }<span class="c3-x" aria-hidden="true">×</span></button>
      </header>
      <div class="c3-body"></div>
    </section>`;
  root.appendChild(layer);

  const panel = layer.querySelector('.c3-panel');
  const body = layer.querySelector('.c3-body');
  const sub = layer.querySelector('.c3-head-sub');

  let opened = false;
  let justOpened = false;

  function updateLayout() {
    layer.classList.toggle('c3-mobile', isMobile());
    layer.classList.toggle('c3-touch', !!isTouch);
  }
  window.addEventListener('resize', () => {
    if (opened) updateLayout();
  });

  const shell = {
    layer,
    panel,
    body,
    onShow: null,
    onHide: null,
    isOpen: () => opened,
    setSub(text) {
      sub.textContent = text || '';
    },
    show() {
      updateLayout();
      layer.hidden = false;
      if (opened) return;
      opened = true;
      justOpened = true;
      queueMicrotask(() => (justOpened = false));
      if (!isTouch) panel.focus({ preventScroll: true });
      shell.onShow?.();
      bus.emit('panel:open', name);
    },
    hide() {
      if (!opened) return;
      opened = false;
      layer.hidden = true;
      if (document.activeElement && layer.contains(document.activeElement)) document.activeElement.blur();
      shell.onHide?.();
      bus.emit('panel:close', name);
    },
  };

  layer.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-c3]');
    if (!el || !layer.contains(el)) return;
    if (el.dataset.c3 === 'close') {
      sound('ui');
      shell.hide();
    } else if (el.dataset.c3 === 'backdrop') {
      shell.hide();
    }
  });

  // Esc: закрываем в микрозадаче, как планшет, чтобы обработчик паузы увидел панель ещё открытой.
  bus.on('input:pause', () => {
    if (!opened || justOpened) return;
    queueMicrotask(() => {
      if (opened) shell.hide();
    });
  });

  return shell;
}

// Делегирование кликов по [data-act] внутри панели, со звуком.
function onAct(shell, handler) {
  shell.body.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-act]');
    if (!el || !shell.body.contains(el) || el.disabled) return;
    sound('ui');
    handler(el.dataset.act, el);
  });
}

function messageHtml(msg) {
  if (!msg || !msg.text) return '';
  return `<p class="c3-msg c3-msg-${msg.ok ? 'ok' : 'warn'}" role="status">${esc(msg.text)}</p>`;
}

// =====================================================================
// Доска хронологии
// =====================================================================
export function createTimeline(root) {
  const sh = createShell(root, { name: 'timeline', title: 'Доска хронологии', size: 'wide' });

  let cards = [];
  let onSubmit = null;
  let slots = [];
  let setKey = null;
  let msg = null;
  let busy = false;
  let done = false;

  const cardById = (id) => cards.find((c) => c.id === id);

  function dateHtml(c) {
    return c.date
      ? `<span class="c3-date">${esc(c.date)}</span>`
      : '<span class="c3-date c3-date-none">без даты</span>';
  }

  function render() {
    const placed = new Set(slots.filter((s) => s != null));
    const pool = cards.filter((c) => !placed.has(c.id));
    const filled = placed.size;
    const full = cards.length > 0 && filled === cards.length;
    const lock = busy || done;

    sh.setSub(cards.length ? `На доске ${filled} из ${cards.length}` : '');

    const poolHtml = pool.length
      ? pool
          .map(
            (c) => `<li><button class="c3-card" type="button" data-act="place" data-id="${esc(c.id)}"${lock ? ' disabled' : ''}>
              <span class="c3-card-top"><span class="c3-card-title">${esc(c.title)}</span>${dateHtml(c)}</span>
              ${c.text ? `<span class="c3-card-text">${esc(c.text)}</span>` : ''}
            </button></li>`,
          )
          .join('')
      : `<li class="c3-empty">${cards.length ? 'Все карточки на доске' : 'Следов пока нет'}</li>`;

    const slotsHtml = slots
      .map((id, i) => {
        const c = id != null ? cardById(id) : null;
        if (!c) {
          return `<li class="c3-slot c3-slot-empty"><span class="c3-slot-num">${i + 1}</span><span class="c3-slot-free">свободно</span></li>`;
        }
        return `<li class="c3-slot"><button class="c3-slot-btn" type="button" data-act="unplace" data-i="${i}"${lock ? ' disabled' : ''} aria-label="Ячейка ${i + 1}: ${esc(c.title)}. Вернуть в следы">
          <span class="c3-slot-num">${i + 1}</span>
          <span class="c3-slot-main"><span class="c3-card-title">${esc(c.title)}</span>${dateHtml(c)}</span>
        </button></li>`;
      })
      .join('');

    const btn = done
      ? '<button class="c3-btn c3-btn-primary" type="button" data-act="done">Готово</button>'
      : `<button class="c3-btn c3-btn-primary" type="button" data-act="submit"${!full || busy ? ' disabled' : ''}>${busy ? 'Проверяю…' : 'Проверить порядок'}</button>`;

    const info = msg ? messageHtml(msg) : `<p class="c3-msg c3-muted">${full ? 'Все ячейки заполнены' : 'Заполни все ячейки'}</p>`;

    sh.body.innerHTML = `
      <div class="c3-scroll">
        <p class="c3-lead">Расставь следы Никиты по времени. Нажми на карточку, и она встанет в первую свободную ячейку. Нажми на карточку в ячейке, чтобы вернуть её.</p>
        <h3 class="c3-sec">Следы <span class="c3-count">${pool.length}</span></h3>
        <ul class="c3-pool">${poolHtml}</ul>
        <div class="c3-sec c3-sec-row"><h3>Порядок событий</h3><span class="c3-axis">раньше <span aria-hidden="true">→</span> позже</span></div>
        <ol class="c3-slots">${slotsHtml}</ol>
      </div>
      <footer class="c3-actions">${info}${btn}</footer>`;
  }

  async function submit() {
    if (busy || done || slots.some((s) => s == null)) return;
    busy = true;
    msg = null;
    render();
    const r = await safeCall(onSubmit, slots.slice());
    busy = false;
    if (r.error || !r.value || typeof r.value !== 'object') {
      msg = { ok: false, text: FAIL_TEXT };
    } else {
      const ok = !!r.value.ok;
      msg = { ok, text: r.value.message || (ok ? 'Порядок верный' : 'Порядок неверный') };
      done = ok;
    }
    sound(msg.ok ? 'success' : 'fail');
    if (sh.isOpen()) render();
  }

  onAct(sh, (act, el) => {
    if (act === 'place') {
      const i = slots.indexOf(null);
      if (i < 0) return;
      slots[i] = el.dataset.id;
      msg = null;
      render();
    } else if (act === 'unplace') {
      const i = Number(el.dataset.i);
      slots[i] = null;
      msg = null;
      render();
    } else if (act === 'submit') {
      submit();
    } else if (act === 'done') {
      sh.hide();
    }
  });

  function open(opts = {}) {
    const list = Array.isArray(opts.cards) ? opts.cards.filter((c) => c && c.id != null) : [];
    onSubmit = opts.onSubmit;
    const key = list.map((c) => String(c.id)).join('|');
    cards = list;
    if (key !== setKey) {
      // Новый набор карточек: начинаем с пустой доски. Тот же набор: раскладка игрока сохраняется.
      setKey = key;
      slots = new Array(list.length).fill(null);
      msg = null;
      done = false;
    }
    render();
    sh.show();
  }

  return { open, close: () => sh.hide(), isOpen: sh.isOpen };
}

// =====================================================================
// Отладочная консоль
// =====================================================================
export function createConsole(root) {
  const sh = createShell(root, { name: 'console', title: 'Отладочная консоль', size: 'console', closeKey: '`' });

  let commands = [];
  let onRun = null;
  let busy = false;
  let greeted = false;
  const history = []; // набранные команды для стрелок вверх и вниз
  let histPos = 0;

  sh.body.innerHTML = `
    <div class="c3-con">
      <div class="c3-con-screen">
        <div class="c3-con-out" role="log" aria-live="polite" aria-label="Вывод консоли"></div>
        <form class="c3-con-form" autocomplete="off">
          <label class="c3-con-line">
            <span class="c3-con-prompt" aria-hidden="true">&gt;</span>
            <input class="c3-con-input" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" enterkeyhint="send" aria-label="Команда" placeholder="набери команду" />
          </label>
          <div class="c3-con-hint" aria-live="polite"></div>
        </form>
      </div>
      <aside class="c3-con-side">
        <h3 class="c3-sec">Команды</h3>
        <ul class="c3-con-cmds"></ul>
      </aside>
    </div>`;

  const out = sh.body.querySelector('.c3-con-out');
  const form = sh.body.querySelector('.c3-con-form');
  const field = sh.body.querySelector('.c3-con-input');
  const hint = sh.body.querySelector('.c3-con-hint');
  const cmdList = sh.body.querySelector('.c3-con-cmds');

  const norm = (s) =>
    String(s ?? '')
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/^[>/$]+/, '');
  const findCmd = (text) => {
    const n = norm(text);
    if (!n) return null;
    return commands.find((c) => norm(c.id) === n || norm(c.label) === n) || null;
  };
  const cmdText = (c) => c.label || c.id;

  function scrollDown() {
    out.scrollTop = out.scrollHeight;
  }

  function addLine(text, kind) {
    const p = document.createElement('div');
    p.className = `c3-con-row c3-ln-${kind}`;
    p.textContent = String(text ?? '');
    out.appendChild(p);
    while (out.childElementCount > CONSOLE_LIMIT) out.firstElementChild.remove();
  }

  // Строка вывода: строка или { text, kind: 'out' | 'ok' | 'err' | 'dim' }.
  function print(lines) {
    const list = Array.isArray(lines) ? lines : lines == null ? [] : [lines];
    for (const l of list) {
      if (l && typeof l === 'object') addLine(l.text, ['ok', 'err', 'dim', 'cmd'].includes(l.kind) ? l.kind : 'out');
      else addLine(l, 'out');
    }
    scrollDown();
  }

  function renderCommands() {
    const typed = norm(field.value);
    cmdList.innerHTML = commands.length
      ? commands
          .map((c) => {
            const match = typed && (norm(c.id).startsWith(typed) || norm(c.label).startsWith(typed));
            return `<li><button class="c3-cmd${match ? ' c3-match' : ''}" type="button" data-act="cmd" data-id="${esc(c.id)}"${busy ? ' disabled' : ''}>
              <span class="c3-cmd-name">${esc(cmdText(c))}</span>
              ${c.desc ? `<span class="c3-cmd-desc">${esc(c.desc)}</span>` : ''}
            </button></li>`;
          })
          .join('')
      : '<li class="c3-empty">Команд пока нет</li>';
  }

  function matches(text) {
    const n = norm(text);
    if (!n) return [];
    return commands.filter((c) => norm(c.id).startsWith(n) || norm(c.label).startsWith(n));
  }

  function updateHint() {
    const typed = field.value;
    if (!norm(typed)) {
      hint.innerHTML = '<span class="c3-kbd">Enter</span> выполнить <span class="c3-kbd">Tab</span> дополнить <span class="c3-kbd">↑</span> прошлая команда';
    } else {
      const m = matches(typed);
      hint.innerHTML = m.length
        ? `Подходит: ${m
            .slice(0, 4)
            .map((c) => `<span class="c3-hint-cmd">${esc(cmdText(c))}</span>`)
            .join(', ')}${m.length > 4 ? ' и др.' : ''}`
        : 'Такой команды нет в списке';
    }
    cmdList.querySelectorAll('.c3-cmd').forEach((b) => {
      const c = commands.find((x) => String(x.id) === b.dataset.id);
      const n = norm(typed);
      b.classList.toggle('c3-match', !!(c && n && (norm(c.id).startsWith(n) || norm(c.label).startsWith(n))));
    });
  }

  function setBusy(v) {
    busy = v;
    sh.layer.classList.toggle('c3-busy', v);
    cmdList.querySelectorAll('.c3-cmd').forEach((b) => (b.disabled = v));
  }

  function focusField() {
    if (!isTouch && sh.isOpen()) field.focus({ preventScroll: true });
  }

  async function run(cmd) {
    if (busy || !cmd) return;
    setBusy(true);
    addLine(`> ${cmdText(cmd)}`, 'cmd');
    scrollDown();
    const r = await safeCall(onRun, cmd.id);
    if (r.error) addLine(FAIL_TEXT, 'err');
    else print(r.value);
    scrollDown();
    setBusy(false);
    focusField();
  }

  function submitTyped() {
    const text = field.value.trim();
    if (!text || busy) return;
    if (history[history.length - 1] !== text) history.push(text);
    histPos = history.length;
    field.value = '';
    updateHint();
    const cmd = findCmd(text);
    sound('ui');
    if (cmd) {
      run(cmd);
    } else {
      addLine(`> ${text}`, 'cmd');
      addLine(UNKNOWN_CMD, 'err');
      scrollDown();
    }
  }

  // Клавиша ` закрывает консоль: это делает игра. Если игра её не увидела, закрываем сами после события.
  function closeSoon() {
    setTimeout(() => {
      if (sh.isOpen()) sh.hide();
    }, 0);
  }

  field.addEventListener('keydown', (e) => {
    if (e.code === 'Backquote') {
      e.preventDefault();
      closeSoon();
      return; // всплывает в игру
    }
    if (e.code === 'Escape' || e.key === 'Escape') {
      closeSoon();
      return; // всплывает в игру
    }
    // Остальные клавиши в поле не должны управлять игрой (WASD, E, Tab).
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      submitTyped();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = matches(field.value);
      if (m.length) {
        field.value = cmdText(m[0]);
        updateHint();
      }
    } else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      histPos = Math.max(0, histPos - 1);
      field.value = history[histPos] || '';
      updateHint();
    } else if (e.key === 'ArrowDown') {
      if (!history.length) return;
      e.preventDefault();
      histPos = Math.min(history.length, histPos + 1);
      field.value = history[histPos] || '';
      updateHint();
    }
  });
  field.addEventListener('keyup', (e) => {
    if (e.code !== 'Backquote' && e.code !== 'Escape') e.stopPropagation();
  });
  // Символ ` (или «ё» в русской раскладке) мог попасть в поле при открытии консоли той же клавишей.
  field.addEventListener('input', () => {
    const clean = field.value.replace(/[`ёЁ]/g, '');
    if (clean !== field.value) field.value = clean;
    updateHint();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitTyped();
  });

  onAct(sh, (act, el) => {
    if (act === 'cmd') {
      const cmd = commands.find((c) => String(c.id) === el.dataset.id);
      run(cmd);
    }
  });

  sh.onShow = () => {
    if (!isTouch) setTimeout(focusField, 0);
  };

  function open(opts = {}) {
    commands = Array.isArray(opts.commands) ? opts.commands.filter((c) => c && c.id != null) : [];
    onRun = opts.onRun;
    renderCommands();
    updateHint();
    if (!greeted) {
      greeted = true;
      addLine('Отладочная консоль сборки. Вывод сохраняется.', 'dim');
      addLine(isTouch ? 'Нажми на команду в списке.' : 'Набери команду или нажми на неё в списке.', 'dim');
    }
    sh.show();
    scrollDown();
  }

  return { open, close: () => sh.hide(), isOpen: sh.isOpen, print };
}

// =====================================================================
// Гипотезы
// =====================================================================
const VERDICT_TEXT = { true: 'верно', false: 'неверно' };

export function createHypotheses(root) {
  const sh = createShell(root, { name: 'hypo', title: 'Гипотезы Никиты', size: 'wide' });

  let items = [];
  let onVerdict = null;
  // Подписи можно поменять при открытии (глава 4 открывает эту же панель как чек-лист ретеста)
  const DEFAULT_LABELS = { title: 'Гипотезы Никиты', item: 'Гипотеза', lead: 'Проверь гипотезы из блокнота в консоли. Кнопки вердикта откроются, когда для гипотезы будет доказательство.' };
  let labels = DEFAULT_LABELS;
  let local = {}; // вердикты, принятые игрой, пока она не прислала refresh
  let msgs = {};
  let busy = new Set();

  const verdictOf = (it) => (it.verdict === 'true' || it.verdict === 'false' ? it.verdict : local[it.id] || null);

  function render() {
    const total = items.length;
    const doneCount = items.filter((it) => verdictOf(it)).length;
    sh.setSub(total ? `Проверено ${doneCount} из ${total}` : '');

    const list = items
      .map((it, i) => {
        const v = verdictOf(it);
        const hasEv = it.evidence != null && String(it.evidence).trim() !== '';
        const pending = busy.has(it.id);
        const pill = v
          ? `<span class="c3-pill c3-pill-ok">Вердикт: ${VERDICT_TEXT[v]}</span>`
          : hasEv
            ? '<span class="c3-pill c3-pill-blue">Есть доказательство</span>'
            : '<span class="c3-pill">Не проверена</span>';
        const dis = !hasEv || !!v || pending ? ' disabled' : '';
        const actions = v
          ? ''
          : `<div class="c3-hypo-actions">
              <button class="c3-btn" type="button" data-act="verdict" data-v="true" data-id="${esc(it.id)}"${dis}>Верно</button>
              <button class="c3-btn" type="button" data-act="verdict" data-v="false" data-id="${esc(it.id)}"${dis}>Неверно</button>
              ${!hasEv ? '<span class="c3-muted c3-hypo-note">Сначала собери доказательство</span>' : ''}
            </div>`;
        return `<li class="c3-hypo${v ? ' c3-hypo-done' : ''}" data-hypo="${esc(it.id)}">
          <div class="c3-hypo-head"><span class="c3-hypo-num">${esc(labels.item)} ${i + 1}</span>${pill}</div>
          <p class="c3-claim">${esc(it.claim)}</p>
          <dl class="c3-hypo-meta">
            <dt>Как проверить</dt><dd>${it.hint ? richText(it.hint) : '<span class="c3-muted">нет подсказки</span>'}</dd>
            <dt>Доказательство</dt><dd>${hasEv ? richText(it.evidence) : '<span class="c3-muted">пока нет</span>'}</dd>
          </dl>
          ${actions}
          ${!v && msgs[it.id] ? messageHtml(msgs[it.id]) : ''}
        </li>`;
      })
      .join('');

    const prevTop = sh.body.querySelector('.c3-scroll')?.scrollTop || 0;
    sh.body.innerHTML = `
      <div class="c3-scroll">
        <p class="c3-lead">${esc(labels.lead)}</p>
        ${total ? `<ol class="c3-hypos">${list}</ol>` : '<p class="c3-empty">Гипотез пока нет</p>'}
      </div>`;
    const sc = sh.body.querySelector('.c3-scroll');
    if (sc) sc.scrollTop = prevTop;
  }

  async function verdict(id, value) {
    const it = items.find((x) => String(x.id) === id);
    if (!it || busy.has(it.id) || verdictOf(it)) return;
    busy.add(it.id);
    delete msgs[it.id];
    render();
    const r = await safeCall(onVerdict, it.id, value);
    busy.delete(it.id);
    if (r.error || !r.value || typeof r.value !== 'object') {
      msgs[it.id] = { ok: false, text: FAIL_TEXT };
      sound('fail');
    } else if (r.value.ok) {
      local[it.id] = value;
      sound('success');
    } else {
      msgs[it.id] = { ok: false, text: r.value.message || 'Доказательство говорит другое' };
      sound('fail');
    }
    render();
  }

  onAct(sh, (act, el) => {
    if (act === 'verdict') verdict(el.dataset.id, el.dataset.v === 'true' ? 'true' : 'false');
  });

  function setItems(list) {
    items = Array.isArray(list) ? list.filter((x) => x && x.id != null) : [];
  }

  function open(opts = {}) {
    setItems(opts.items);
    onVerdict = opts.onVerdict;
    labels = { ...DEFAULT_LABELS, ...(opts.labels || {}) };
    const titleEl = sh.layer.querySelector('.c3-head-title');
    if (titleEl) titleEl.textContent = labels.title;
    local = {};
    msgs = {};
    render();
    sh.show();
  }

  function refresh(list) {
    setItems(list);
    render();
  }

  return { open, close: () => sh.hide(), isOpen: sh.isOpen, refresh };
}

// =====================================================================
// Конструктор автотеста
// =====================================================================
// Строка лога: { text, ok } или строка. Строка красная, если начинается с ✗ / × / ! / FAIL
// или содержит «ошибк», «не пройден», «провал»; иначе зелёная.
// Значок ✓ или ✗ ставит сама панель, поэтому такой же значок в начале строки убираем.
const stripMark = (t) => t.replace(/^\s*[✓✔✗×✕]\s*/, '');
function logLine(l) {
  if (l && typeof l === 'object') {
    const bad = l.ok === false || l.kind === 'bad' || l.kind === 'err';
    return { text: stripMark(String(l.text ?? '')), kind: bad ? 'bad' : 'ok' };
  }
  const t = String(l ?? '');
  const bad = /^\s*(✗|×|✕|!|\[?fail)/i.test(t) || /ошибк|не пройден|провал/i.test(t);
  return { text: stripMark(t), kind: bad ? 'bad' : 'ok' };
}

export function createAutotest(root) {
  const sh = createShell(root, { name: 'autotest', title: 'Конструктор автотеста', size: 'wide' });

  let blocks = [];
  let onRun = null;
  let setKey = null;
  let scenario = [];
  let log = [];
  let msg = null;
  let busy = false;
  let done = false;
  let token = 0;

  const blockById = (id) => blocks.find((b) => String(b.id) === String(id));

  function render() {
    const inScn = new Set(scenario.map(String));
    const lock = busy || done;
    sh.setSub(`Шагов в сценарии: ${scenario.length}`);

    const blocksHtml = blocks.length
      ? blocks
          .map((b) => {
            const used = inScn.has(String(b.id));
            return `<li><button class="c3-block${used ? ' c3-used' : ''}" type="button" data-act="add" data-id="${esc(b.id)}"${used || lock ? ' disabled' : ''}>
              <span class="c3-block-plus" aria-hidden="true">${used ? '✓' : '+'}</span><span>${esc(b.label)}</span>
            </button></li>`;
          })
          .join('')
      : '<li class="c3-empty">Блоков нет</li>';

    const scnHtml = scenario.length
      ? scenario
          .map((id, i) => {
            const b = blockById(id);
            return `<li><button class="c3-step" type="button" data-act="remove" data-i="${i}"${lock ? ' disabled' : ''} aria-label="Шаг ${i + 1}: ${esc(b?.label || id)}. Убрать">
              <span class="c3-step-num">${i + 1}</span><span class="c3-step-label">${esc(b?.label || id)}</span><span class="c3-step-x" aria-hidden="true">×</span>
            </button></li>`;
          })
          .join('')
      : '<li class="c3-empty">Сценарий пуст. Нажми на блок слева.</li>';

    const logHtml =
      log.length || busy
        ? `<h3 class="c3-sec">Лог запуска</h3>
          <div class="c3-at-log" role="log" aria-live="polite">${log
            .map((l) => `<div class="c3-log-row c3-log-${l.kind}">${esc(l.text)}</div>`)
            .join('')}${busy ? '<div class="c3-log-row c3-log-dim c3-log-wait">выполняется…</div>' : ''}</div>`
        : '';

    const info = msg
      ? messageHtml(msg)
      : `<p class="c3-msg c3-muted">${busy ? 'Сценарий выполняется' : scenario.length ? 'Готов к запуску' : 'Добавь шаги'}</p>`;
    const btns = done
      ? '<button class="c3-btn c3-btn-primary" type="button" data-act="done">Готово</button>'
      : `<button class="c3-btn" type="button" data-act="clear"${!scenario.length || busy ? ' disabled' : ''}>Очистить</button>
         <button class="c3-btn c3-btn-primary" type="button" data-act="run"${!scenario.length || busy ? ' disabled' : ''}>${busy ? 'Запуск…' : 'Запустить'}</button>`;

    sh.body.innerHTML = `
      <div class="c3-scroll">
        <p class="c3-lead">Нажми на блок, чтобы добавить его в конец сценария. Нажми на шаг сценария, чтобы убрать его.</p>
        <div class="c3-at-cols">
          <section class="c3-at-col">
            <h3 class="c3-sec">Блоки</h3>
            <ul class="c3-at-blocks">${blocksHtml}</ul>
          </section>
          <section class="c3-at-col">
            <h3 class="c3-sec">Сценарий <span class="c3-count">${scenario.length}</span></h3>
            <ol class="c3-at-scn">${scnHtml}</ol>
          </section>
        </div>
        ${logHtml}
      </div>
      <footer class="c3-actions">${info}<span class="c3-actions-btns">${btns}</span></footer>`;
  }

  function scrollToEnd() {
    const sc = sh.body.querySelector('.c3-scroll');
    if (sc) sc.scrollTop = sc.scrollHeight;
  }

  async function run() {
    if (busy || done || !scenario.length) return;
    const my = ++token;
    busy = true;
    log = [];
    msg = null;
    render();
    scrollToEnd();
    const r = await safeCall(onRun, scenario.slice());
    if (my !== token) return;
    if (r.error || !r.value || typeof r.value !== 'object') {
      busy = false;
      msg = { ok: false, text: FAIL_TEXT };
      sound('fail');
      render();
      scrollToEnd();
      return;
    }
    const lines = Array.isArray(r.value.lines) ? r.value.lines : [];
    for (const l of lines) {
      await wait(LOG_DELAY);
      if (my !== token) return;
      log.push(logLine(l));
      render();
      scrollToEnd();
    }
    await wait(LOG_DELAY);
    if (my !== token) return;
    const ok = !!r.value.ok;
    busy = false;
    done = ok;
    msg = { ok, text: r.value.message || (ok ? 'Сценарий выполнен' : 'Сценарий не прошёл') };
    sound(ok ? 'success' : 'fail');
    render();
    scrollToEnd();
  }

  onAct(sh, (act, el) => {
    if (act === 'add') {
      const id = blockById(el.dataset.id)?.id;
      if (id == null || scenario.some((x) => String(x) === String(id))) return;
      scenario.push(id);
      msg = null;
      render();
    } else if (act === 'remove') {
      scenario.splice(Number(el.dataset.i), 1);
      msg = null;
      render();
    } else if (act === 'clear') {
      scenario = [];
      msg = null;
      render();
    } else if (act === 'run') {
      run();
    } else if (act === 'done') {
      sh.hide();
    }
  });

  function open(opts = {}) {
    const list = Array.isArray(opts.blocks) ? opts.blocks.filter((b) => b && b.id != null) : [];
    onRun = opts.onRun;
    const key = list.map((b) => String(b.id)).join('|');
    blocks = list;
    if (key !== setKey) {
      setKey = key;
      token++;
      scenario = [];
      log = [];
      msg = null;
      busy = false;
      done = false;
    }
    render();
    sh.show();
  }

  return { open, close: () => sh.hide(), isOpen: sh.isOpen };
}
