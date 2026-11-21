// Таблица сравнения сборок (глава 2): объекты × сборки. Открывается клавишей C или кнопкой «Таблица».
import { bus } from '../core/events.js';
import { sfx } from '../core/audio.js';
import { isTouch } from '../core/input.js';
import { ROWS, BUILD_ORDER } from '../content/chapter2.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Строка найдена, если объект осмотрен хотя бы в двух сборках с разным состоянием.
export function rowFound(obs, row) {
  const seen = BUILD_ORDER.filter((b) => obs?.[row.id]?.[b]);
  return new Set(seen.map((b) => row.values[b])).size >= 2;
}

export function createCompare(root) {
  const el = document.createElement('div');
  el.className = 'cmp-layer hidden';
  el.innerHTML = `<div class="cmp-panel" role="dialog" aria-label="Таблица сравнения сборок">
      <div class="cmp-head"><b>Таблица сравнения сборок</b><span class="cmp-count"></span><button class="cmp-x" aria-label="Закрыть">×</button></div>
      <div class="cmp-body"></div>
      <div class="cmp-foot">${isTouch ? 'Закрой таблицу и переключай сборку кнопкой «Сборка».' : 'C: закрыть таблицу. Сборка переключается клавишей Q, когда таблица закрыта.'}</div>
    </div>`;
  root.appendChild(el);
  const body = el.querySelector('.cmp-body');
  const count = el.querySelector('.cmp-count');
  let open = false;
  let getState = () => ({ obs: {}, build: null, need: 4 });

  function render() {
    const { obs, build, need } = getState();
    const found = ROWS.filter((r) => rowFound(obs, r)).length;
    count.textContent = found >= need ? `Найдено различий: ${found}. Нужно: ${need}` : `Найдено различий: ${found} из ${need}`;
    body.innerHTML = `<table class="cmp-table">
      <thead><tr><th></th>${BUILD_ORDER.map((b) => `<th class="${b === build ? 'cur' : ''}">${b}</th>`).join('')}</tr></thead>
      <tbody>${ROWS.map((r) => {
        const ok = rowFound(obs, r);
        const cells = BUILD_ORDER.map((b) => {
          const v = obs?.[r.id]?.[b];
          return `<td class="${v ? 'seen' : 'unk'} ${b === build ? 'cur' : ''}">${v ? esc(r.values[b]) : '?'}</td>`;
        }).join('');
        return `<tr class="${ok ? 'ok' : ''}"><th>${ok ? '✓ ' : ''}${esc(r.label)}</th>${cells}</tr>${ok ? `<tr class="note"><td colspan="4">${esc(r.note)}</td></tr>` : ''}`;
      }).join('')}</tbody></table>`;
  }

  const api = {
    setSource(fn) {
      getState = fn;
    },
    isOpen: () => open,
    open() {
      if (open) return;
      open = true;
      render();
      el.classList.remove('hidden');
      sfx.ui();
      bus.emit('compare:open');
    },
    close() {
      if (!open) return;
      open = false;
      el.classList.add('hidden');
      bus.emit('compare:close');
    },
    refresh() {
      if (open) render();
    },
  };
  el.querySelector('.cmp-x').addEventListener('click', () => api.close());
  el.addEventListener('click', (e) => {
    if (e.target === el) api.close();
  });
  bus.on('input:pause', () => api.close());
  return api;
}
