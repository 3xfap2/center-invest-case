// HUD: прицел, подсказка действия, текущая задача, всплывающие сообщения, глитч-вспышка.
import { bus } from '../core/events.js';
import { isTouch } from '../core/input.js';
import { promptKey } from '../core/interact.js';
import { sfx } from '../core/audio.js';

const NAMES = { irina: 'Ирина Белова', timur: 'Тимур Сафин', system: 'Система', lis: 'Лис', nikita: 'Никита Орлов' };

export function createHud(root) {
  const el = document.createElement('div');
  el.className = 'hud';
  el.innerHTML = `
    <div class="crosshair"></div>
    <div class="prompt hidden"></div>
    <div class="hud-tl">
      <div class="objective hidden"><small>Задача</small><span></span></div>
      <div class="shift-timer hidden"></div>
    </div>
    <div class="toasts"></div>
    <div class="keys-hint ${isTouch ? 'hidden' : ''}"><b>WASD</b> ходить · <b>E</b> действие · <b>Tab</b> планшет · <b>Esc</b> пауза</div>
    <div class="build-badge hidden"></div>
    <div class="glitch-fx"></div>`;
  root.appendChild(el);

  const cross = el.querySelector('.crosshair');
  const prompt = el.querySelector('.prompt');
  const obj = el.querySelector('.objective');
  const objText = obj.querySelector('span');
  const toasts = el.querySelector('.toasts');
  const gfx = el.querySelector('.glitch-fx');
  const timer = el.querySelector('.shift-timer');
  const buildBadge = el.querySelector('.build-badge');

  bus.on('prompt', (label) => {
    cross.classList.toggle('on', !!label);
    if (label) {
      prompt.textContent = promptKey + label;
      prompt.classList.remove('hidden');
    } else prompt.classList.add('hidden');
  });

  const hud = {
    el,
    show(v) {
      el.classList.toggle('hidden', !v);
    },
    // Текущая сборка мира (глава 2). null скрывает плашку.
    setBuild(b) {
      buildBadge.classList.toggle('hidden', !b);
      if (b) {
        buildBadge.textContent = `Сборка ${b}`;
        buildBadge.dataset.b = b;
      }
    },
    // Время смены: остаток в секундах (может быть отрицательным).
    setTimer(sec) {
      if (sec == null) {
        timer.classList.add('hidden');
        return;
      }
      timer.classList.remove('hidden');
      const over = sec < 0;
      const s = Math.max(0, Math.ceil(sec));
      const text = over ? 'Смена закончилась' : `До конца смены ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      if (timer.textContent !== text) timer.textContent = text;
      timer.classList.toggle('over', over);
    },
    setObjective(text) {
      if (!text) {
        obj.classList.add('hidden');
        return;
      }
      objText.textContent = text;
      obj.classList.remove('hidden');
    },
    toast(text, { from = null, kind = '', ms = 5200 } = {}) {
      const t = document.createElement('div');
      t.className = `toast ${kind}`;
      t.innerHTML = from ? `<div class="from"></div><div class="txt"></div>` : `<div class="txt"></div>`;
      if (from) t.querySelector('.from').textContent = NAMES[from] || from;
      t.querySelector('.txt').textContent = text;
      toasts.appendChild(t);
      while (toasts.children.length > 3) toasts.firstChild.remove();
      setTimeout(() => {
        t.classList.add('out');
        setTimeout(() => t.remove(), 350);
      }, ms);
    },
    glitch({ sound = true } = {}) {
      gfx.classList.remove('on');
      void gfx.offsetWidth;
      gfx.classList.add('on');
      const view = document.getElementById('view');
      view.classList.remove('shake');
      void view.offsetWidth;
      view.classList.add('shake');
      if (sound) sfx.glitch();
    },
  };

  // Сообщения чата всплывают, если планшет закрыт.
  let tabletOpen = false;
  bus.on('tablet:open', () => (tabletOpen = true));
  bus.on('tablet:close', () => (tabletOpen = false));
  bus.on('chat', (m) => {
    sfx.message();
    if (!tabletOpen) hud.toast(m.text, { from: m.from, ms: 7000 });
  });

  return hud;
}
