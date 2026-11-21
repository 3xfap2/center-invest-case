// Ввод: клавиатура и мышь на ПК, джойстик и свайпы на телефоне.
// Игровая логика читает input.move и input.takeLook(), подписывается на bus 'input:interact', 'input:tablet', 'input:pause'.
import { bus } from './events.js';
import { canFullscreen, isFullscreen, enterFullscreen, onFullscreenChange } from './fullscreen.js';

// Только основной указатель: ноутбук с сенсорным экраном считается ПК и управляется мышью.
export const isTouch = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;

const keys = new Set();
const look = { dx: 0, dy: 0 };

export const input = {
  enabled: false, // false, пока открыт диалог, планшет или меню
  move: { x: 0, y: 0 }, // x вправо, y вперёд, от -1 до 1
  touchMove: { x: 0, y: 0 },
  takeLook() {
    const r = { dx: look.dx, dy: look.dy };
    look.dx = 0;
    look.dy = 0;
    return r;
  },
  update() {
    let x = 0;
    let y = 0;
    if (keys.has('KeyW') || keys.has('ArrowUp')) y += 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) y -= 1;
    if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
    x += this.touchMove.x;
    y += this.touchMove.y;
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    this.move.x = this.enabled ? x : 0;
    this.move.y = this.enabled ? y : 0;
    if (!this.enabled) this.takeLook();
  },
  setEnabled(v) {
    this.enabled = v;
    if (!v) {
      keys.clear();
      if (document.pointerLockElement) document.exitPointerLock();
    }
    bus.emit('input:enabled', v);
  },
};

let canvas = null;

export function initInput(canvasEl) {
  canvas = canvasEl;

  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.code === 'Tab') {
      e.preventDefault();
      bus.emit('input:tablet');
      return;
    }
    if (e.code === 'Escape') {
      bus.emit('input:pause');
      return;
    }
    if (!input.enabled) return;
    if (e.code === 'KeyE' || e.code === 'Enter') {
      bus.emit('input:interact');
      return;
    }
    keys.add(e.code);
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());

  // Мышь работает всегда (в том числе на гибридных ноутбуках), захват курсора только на ПК.
  canvas.addEventListener('click', () => {
    if (!isTouch && input.enabled && !document.pointerLockElement) {
      try {
        canvas.requestPointerLock?.()?.catch?.(() => {});
      } catch {
        /* браузер не дал захват: игрок кликнет ещё раз */
      }
    }
  });
  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === canvas && input.enabled) {
      look.dx += e.movementX;
      look.dy += e.movementY;
    }
  });
  if (isTouch) initTouch();
}

// Телефон: левая половина экрана — джойстик, правая — обзор.
function initTouch() {
  const root = document.getElementById('ui');
  const pad = document.createElement('div');
  pad.className = 'touch-layer';
  pad.innerHTML = `
    <div class="joy" data-joy><div class="joy-knob"></div></div>
    <button class="tbtn-palm" data-act aria-label="Действие"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.6" y="4.2" width="2.6" height="10" rx="1.3"/><rect x="9.7" y="2.6" width="2.6" height="11" rx="1.3"/><rect x="12.8" y="3.1" width="2.6" height="11" rx="1.3"/><rect x="15.9" y="5.2" width="2.6" height="9" rx="1.3"/><rect x="6.6" y="10.2" width="11.9" height="10.6" rx="4.2"/><rect x="3.9" y="10.4" width="2.6" height="7.4" rx="1.3" transform="rotate(-32 5.2 14.1)"/></svg></button>
    <button class="tbtn tbtn-tab" data-tab>Планшет</button>
    <button class="tbtn tbtn-pause" data-pause aria-label="Пауза">II</button>
    <button class="tbtn tbtn-fs hidden" data-fs aria-label="На весь экран">⛶</button>`;
  root.appendChild(pad);

  const joy = pad.querySelector('[data-joy]');
  const knob = pad.querySelector('.joy-knob');
  const R = 50;
  let joyId = null;
  let joyOrigin = null;
  let lookId = null;
  let lookLast = null;

  const btnAct = pad.querySelector('[data-act]');
  const btnTab = pad.querySelector('[data-tab]');
  // Кнопка «на весь экран»: видна, если браузер это умеет и мы ещё не в полном экране.
  const btnFs = pad.querySelector('[data-fs]');
  const syncFs = () => btnFs.classList.toggle('hidden', !canFullscreen() || isFullscreen());
  syncFs();
  onFullscreenChange(syncFs);
  btnFs.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    enterFullscreen().then(syncFs);
  });
  pad.querySelector('[data-pause]').addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    bus.emit('input:pause');
  });
  btnAct.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (input.enabled) bus.emit('input:interact');
  });
  btnTab.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    bus.emit('input:tablet');
  });

  bus.on('input:enabled', (v) => pad.classList.toggle('hidden', !v));
  bus.on('prompt', (label) => {
    // Ладонь горит жёлтым, только когда есть с чем взаимодействовать.
    btnAct.classList.toggle('ready', !!label);
    btnAct.setAttribute('aria-label', label || 'Действие');
  });

  canvas.addEventListener(
    'touchstart',
    (e) => {
      if (!input.enabled) return;
      for (const t of e.changedTouches) {
        if (t.clientX < window.innerWidth * 0.45 && joyId === null) {
          joyId = t.identifier;
          joyOrigin = { x: t.clientX, y: t.clientY };
          joy.style.left = `${t.clientX - 60}px`;
          joy.style.top = `${t.clientY - 60}px`;
          joy.classList.add('on');
        } else if (lookId === null) {
          lookId = t.identifier;
          lookLast = { x: t.clientX, y: t.clientY };
        }
      }
      e.preventDefault();
    },
    { passive: false },
  );

  canvas.addEventListener(
    'touchmove',
    (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === joyId) {
          let dx = t.clientX - joyOrigin.x;
          let dy = t.clientY - joyOrigin.y;
          const len = Math.hypot(dx, dy);
          if (len > R) {
            dx = (dx / len) * R;
            dy = (dy / len) * R;
          }
          knob.style.transform = `translate(${dx}px, ${dy}px)`;
          input.touchMove.x = dx / R;
          input.touchMove.y = -dy / R;
        } else if (t.identifier === lookId) {
          look.dx += (t.clientX - lookLast.x) * 2.2;
          look.dy += (t.clientY - lookLast.y) * 2.2;
          lookLast = { x: t.clientX, y: t.clientY };
        }
      }
      e.preventDefault();
    },
    { passive: false },
  );

  const end = (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyId) {
        joyId = null;
        input.touchMove.x = 0;
        input.touchMove.y = 0;
        knob.style.transform = '';
        joy.classList.remove('on');
      } else if (t.identifier === lookId) {
        lookId = null;
      }
    }
  };
  canvas.addEventListener('touchend', end);
  canvas.addEventListener('touchcancel', end);
}
