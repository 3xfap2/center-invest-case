// Диалоги: реплики по очереди и выбор вариантов.
// Узел: { who: 'irina'|'timur'|'lis'|'me'|'system', text, options?: [{text, next?: nodes[], onPick?()}] }
// play(nodes) -> Promise, разрешается после последней реплики.
import { bus } from '../core/events.js';
import { sfx } from '../core/audio.js';
import { isTouch } from '../core/input.js';
import { game } from '../core/state.js';
import { voice } from '../core/voice.js';

const NAMES = { irina: 'Ирина', timur: 'Тимур', lis: 'Лис', me: 'Ты', system: '' };

export function createDialogue(root) {
  const el = document.createElement('div');
  el.className = 'dialogue hidden';
  el.innerHTML = `<div class="speaker"></div><div class="line"></div><div class="options"></div><div class="next"></div>`;
  root.appendChild(el);
  const sp = el.querySelector('.speaker');
  const line = el.querySelector('.line');
  const opts = el.querySelector('.options');
  const next = el.querySelector('.next');

  let typing = null;
  let advance = null;
  let active = false;

  function fill(text) {
    return String(text).replaceAll('{name}', game.state?.name || 'стажёр');
  }

  let finishTyping = null;
  function typeText(text) {
    return new Promise((resolve) => {
      let i = 0;
      line.textContent = '';
      clearInterval(typing);
      const done = () => {
        clearInterval(typing);
        typing = null;
        finishTyping = null;
        line.textContent = text;
        resolve();
      };
      finishTyping = done;
      typing = setInterval(() => {
        i += 2;
        line.textContent = text.slice(0, i);
        if (i >= text.length) done();
      }, 16);
    });
  }

  function onAdvance() {
    if (!active) return;
    if (typing) {
      finishTyping?.();
      return;
    }
    if (advance) {
      const a = advance;
      advance = null;
      a();
    }
  }

  el.addEventListener('click', (e) => {
    if (e.target.closest('.opt')) return;
    onAdvance();
  });
  let openedAt = 0;
  window.addEventListener('keydown', (e) => {
    if (!active || e.repeat) return;
    if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') {
      e.preventDefault();
      if (performance.now() - openedAt > 150) onAdvance();
    }
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) {
      const b = opts.children[n - 1];
      if (b) b.click();
    }
  });

  async function showNode(node) {
    const who = node.who || 'system';
    sp.textContent = NAMES[who] ?? who;
    sp.className = `speaker ${who}`;
    opts.innerHTML = '';
    next.textContent = '';
    voice.say(who, node.text); // озвучка по исходному тексту (до подстановки ника)
    const text = fill(node.text);
    await typeText(text);
    if (node.options?.length) {
      return new Promise((resolve) => {
        node.options.forEach((o, i) => {
          const b = document.createElement('button');
          b.className = 'opt';
          b.innerHTML = `<span class="n">${i + 1}</span><span></span>`;
          b.lastChild.textContent = fill(o.text);
          b.addEventListener('click', (e) => {
            e.stopPropagation();
            sfx.ui();
            opts.innerHTML = '';
            o.onPick?.();
            resolve(o.next || []);
          });
          opts.appendChild(b);
        });
      });
    }
    next.textContent = isTouch ? 'нажмите, чтобы продолжить' : 'E или клик: дальше';
    return new Promise((resolve) => {
      advance = () => resolve([]);
    });
  }

  async function play(nodes) {
    active = true;
    openedAt = performance.now();
    el.classList.remove('hidden');
    bus.emit('dialogue:open');
    const queue = [...nodes];
    while (queue.length) {
      const node = queue.shift();
      if (node.run) {
        await node.run();
        continue;
      }
      const branch = await showNode(node);
      queue.unshift(...branch);
    }
    active = false;
    voice.stop();
    el.classList.add('hidden');
    bus.emit('dialogue:close');
  }

  return {
    play,
    isOpen: () => active,
  };
}
