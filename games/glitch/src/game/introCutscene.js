// Вступительная катсцена (около 28 секунд): как герой стал тестировщиком.
// Камера летит между точками, внизу субтитры, кнопка «Пропустить» всегда доступна.
import * as THREE from 'three';
import { sfx, playIntroMusic } from '../core/audio.js';
import { isTouch } from '../core/input.js';

// Кадры: длительность, субтитр, откуда и куда летит камера, события по времени (в секундах от начала кадра).
function shots(intro) {
  const a = intro.api;
  const c = intro.cams;
  return [
    {
      dur: 5.2,
      sub: 'Мне было двенадцать. Любимая игра зависла прямо на финальном боссе.',
      from: c.roomFrom,
      to: c.roomTo,
      start: () => {
        a.setHeroAge('kid');
        a.setStickers(0);
        a.setScreen('game');
      },
      events: [
        [2.6, () => (a.setScreen('glitch'), sfx.glitch())],
        [3.7, () => (a.setScreen('crash'), sfx.fail())],
      ],
    },
    {
      dur: 4.6,
      sub: 'Другой бы выключил компьютер. А я открыл тетрадь и записал, что делал перед ошибкой.',
      from: c.notesFrom,
      to: c.notesTo,
      events: [[0.6, () => sfx.click()]],
    },
    {
      dur: 4.6,
      sub: 'Через неделю я смог её повторить. Снова и снова. И написал разработчикам.',
      from: c.monFrom,
      to: c.monTo,
      start: () => a.setScreen('game'),
      events: [
        [1.0, () => (a.setScreen('glitch'), sfx.glitch())],
        [1.7, () => a.setScreen('crash')],
        [2.8, () => (a.setScreen('sending'), sfx.ui())],
      ],
    },
    {
      dur: 5.0,
      sub: 'Они ответили: «Спасибо, исправили». А в титрах игры появилось моё имя.',
      from: c.screenFrom,
      to: c.screenTo,
      start: () => (a.setScreen('mail'), sfx.message()),
      events: [[2.5, () => (a.setScreen('credits'), sfx.success())]],
    },
    {
      dur: 4.6,
      sub: 'Потом были сотни найденных багов. Колледж. И одно объявление.',
      from: c.wallFrom,
      to: c.wallTo,
      start: () => {
        a.setHeroAge('adult');
        a.setScreen('credits');
      },
      // стена обрастает стикерами за время кадра
      tick: (k) => a.setStickers(Math.round(3 + k * 39)),
    },
    {
      dur: 4.6,
      sub: '«Студия „Ноль-Один“ ищет тестировщика». Сегодня мой первый рабочий день.',
      from: c.adFrom,
      via: c.adVia,
      to: c.adTo,
      start: () => (a.setScreen('ad'), sfx.message()),
    },
  ];
}

const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

/**
 * Запустить катсцену. Возвращает { done: Promise, skip() }.
 * intro: результат createIntro(); camera: камера игры; root: #ui; name: ник игрока.
 */
export function playIntro({ intro, camera, root, name, fade }) {
  intro.api.setName(name);
  const list = shots(intro);

  const el = document.createElement('div');
  el.className = 'cutscene letterbox';
  el.innerHTML = `<button class="cut-skip">Пропустить ›</button><div class="cut-sub"></div>`;
  root.appendChild(el);
  const subEl = el.querySelector('.cut-sub');
  const skipBtn = el.querySelector('.cut-skip');
  if (!isTouch) skipBtn.textContent = 'Пропустить (Пробел) ›';

  const stopMusic = playIntroMusic();
  let finished = false;
  let resolveDone;
  const done = new Promise((r) => (resolveDone = r));
  const pFrom = new THREE.Vector3();
  const pTo = new THREE.Vector3();
  const lFrom = new THREE.Vector3();
  const lTo = new THREE.Vector3();
  const look = new THREE.Vector3();

  let idx = -1;
  let shotStart = 0;
  let fired = new Set();
  let raf = 0;

  function startShot(i, now) {
    idx = i;
    shotStart = now;
    fired = new Set();
    const s = list[i];
    s.start?.();
    subEl.classList.remove('show');
    void subEl.offsetWidth;
    subEl.textContent = s.sub;
    subEl.classList.add('show');
  }

  function frame(now) {
    if (finished) return;
    if (idx < 0) startShot(0, now);
    let s = list[idx];
    let t = (now - shotStart) / 1000;
    if (t >= s.dur) {
      if (idx + 1 >= list.length) {
        finish();
        return;
      }
      startShot(idx + 1, now);
      s = list[idx];
      t = 0;
    }
    const k = Math.min(1, t / s.dur);
    const e = ease(k);
    pFrom.fromArray(s.from[0]);
    pTo.fromArray(s.to[0]);
    lFrom.fromArray(s.from[1]);
    lTo.fromArray(s.to[1]);
    if (s.via) {
      const u = 1 - e;
      camera.position.set(
        u * u * pFrom.x + 2 * u * e * s.via[0] + e * e * pTo.x,
        u * u * pFrom.y + 2 * u * e * s.via[1] + e * e * pTo.y,
        u * u * pFrom.z + 2 * u * e * s.via[2] + e * e * pTo.z,
      );
    } else camera.position.lerpVectors(pFrom, pTo, e);
    look.lerpVectors(lFrom, lTo, e);
    camera.lookAt(look);
    s.tick?.(k);
    (s.events || []).forEach(([at, fn], j) => {
      if (t >= at && !fired.has(j)) {
        fired.add(j);
        fn();
      }
    });
    raf = requestAnimationFrame(frame);
  }

  async function finish() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('keydown', onKey);
    stopMusic();
    await fade?.();
    el.remove();
    resolveDone();
  }

  function onKey(e) {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') {
      e.preventDefault();
      finish();
    }
  }
  skipBtn.addEventListener('click', () => finish());
  window.addEventListener('keydown', onKey);
  raf = requestAnimationFrame(frame);

  return { done, skip: finish };
}
