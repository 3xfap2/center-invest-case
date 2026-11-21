// Полноэкранные экраны: загрузка и старт, пауза, затемнение, финал главы, авторы.
import { sfx, unlockAudio } from '../core/audio.js';
import { isTouch } from '../core/input.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function createScreens(root) {
  const fadeEl = document.createElement('div');
  fadeEl.className = 'fade';
  fadeEl.innerHTML = '<div class="cap"></div>';
  root.appendChild(fadeEl);

  let current = null;
  function show(html, cls = '') {
    close();
    current = document.createElement('div');
    current.className = `screen ${cls}`;
    current.innerHTML = html;
    root.appendChild(current);
    return current;
  }
  function close() {
    current?.remove();
    current = null;
  }

  if (isTouch) {
    const rh = document.createElement('div');
    rh.className = 'rotate-hint armed';
    rh.innerHTML = `<div>Поверни телефон горизонтально.<br>Так удобнее ходить и смотреть.<br><br><button class="btn">Играть вертикально</button></div>`;
    rh.querySelector('button').addEventListener('click', () => rh.classList.remove('armed'));
    root.appendChild(rh);
  }

  const screens = {
    close,

    // Экран загрузки: название, профессия, полоса. Потом кнопка старта.
    loading() {
      const s = show(
        `<div class="title-wrap">
          <h1 class="game-title">ГЛИТЧ</h1>
          <div class="game-sub">Последняя сборка</div>
          <div class="profession">Профессия: тестировщик игр (QA)</div>
          <div class="load-bar"><div class="load-fill"></div></div>
          <div class="load-text">Загрузка…</div>
          <div class="btn-col start-btns hidden"></div>
        </div>`,
        'solid loading',
      );
      const fill = s.querySelector('.load-fill');
      const text = s.querySelector('.load-text');
      const btns = s.querySelector('.start-btns');
      return {
        setProgress(p, label) {
          fill.style.width = `${Math.round(p * 100)}%`;
          if (label) text.textContent = label;
        },
        // Ждём нажатия: оно же разрешает звук в браузере.
        askStart({ canContinue, name }) {
          text.textContent = name ? `Готово. Тестировщик: ${name}` : 'Готово';
          btns.innerHTML = canContinue
            ? `<button class="btn primary" data-a="continue">Продолжить смену</button>
               <button class="btn" data-a="restart">Начать заново</button>`
            : `<button class="btn primary" data-a="start">Начать смену</button>`;
          btns.insertAdjacentHTML('beforeend', '<button class="link" data-a="credits">Авторы и источники</button>');
          btns.classList.remove('hidden');
          return new Promise((resolve) => {
            const onClick = async (e) => {
              const a = e.target.closest('[data-a]')?.dataset.a;
              if (!a) return;
              unlockAudio();
              sfx.ui();
              if (a === 'credits') {
                await screens.credits();
                return;
              }
              btns.removeEventListener('click', onClick);
              resolve(a);
            };
            btns.addEventListener('click', onClick);
          });
        },
      };
    },

    credits() {
      return new Promise((resolve) => {
        const el = document.createElement('div');
        el.className = 'screen';
        el.style.zIndex = 160;
        el.innerHTML = `<div class="card">
            <h2>Авторы и источники</h2>
            <div class="credits">
              <p>«ГЛИТЧ: Последняя сборка». Игра о профессии тестировщика игр. Cyber Garden 2026, кейс «Центр-инвест».</p>
              <p>Вся графика собрана из простых фигур в коде. Звук синтезирован в браузере. Чужих моделей, текстур и музыки нет.</p>
              <p>Технологии: Three.js (MIT), Vite (MIT).</p>
              <p>История, люди и компании выдуманы.</p>
            </div>
            <button class="btn" data-a="back">Назад</button>
          </div>`;
        root.appendChild(el);
        el.addEventListener('click', (e) => {
          if (e.target.closest('[data-a="back"]')) {
            el.remove();
            resolve();
          }
        });
      });
    },

    // Пауза: ровно три кнопки. onSound() переключает звук и возвращает новое состояние muted.
    pause({ muted, onSound }) {
      return new Promise((resolve) => {
        const label = (m) => `Звук: ${m ? 'выкл' : 'вкл'}`;
        const s = show(
          `<div class="card pause-card">
            <h2>Пауза</h2>
            <div class="btn-col">
              <button class="btn primary" data-a="resume">Продолжить</button>
              <button class="btn" data-a="sound">${label(muted)}</button>
              <button class="btn" data-a="exit">Выйти в меню</button>
            </div>
          </div>`,
        );
        s.addEventListener('click', (e) => {
          const a = e.target.closest('[data-a]')?.dataset.a;
          if (!a) return;
          sfx.ui();
          if (a === 'sound') {
            e.target.closest('[data-a]').textContent = label(onSound());
            return;
          }
          resolve(a);
        });
      });
    },

    // Финал главы: что стало с героями и карточка профессии.
    chapterEnd({ endingTitle, characters, stars, score, skillsUsed, career }) {
      return new Promise((resolve) => {
        const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
        const s = show(
          `<div class="end-wrap">
            <div class="card">
              <div class="end-kicker">Глава 1 завершена</div>
              <h2>${esc(endingTitle)}</h2>
              <div class="stars" aria-label="Звёзды: ${stars} из 3">${starStr}</div>
              <p class="score">Очки: ${score}</p>
              <h3>Что стало с героями</h3>
              <ul class="heroes">
                ${characters.map((c) => `<li><b>${esc(c.name)}</b><span>${esc(c.text)}</span></li>`).join('')}
              </ul>
              <p class="teaser">Глава 2. Комната, которой нет. Скоро.</p>
            </div>
            <div class="card career">
              <div class="end-kicker">Карточка профессии</div>
              <h2>${esc(career.profession)}</h2>
              <h3>Чем занимается на самом деле</h3>
              <ul>${career.what.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
              <h3>Что ты сегодня делал сам</h3>
              <ul class="end-list">
                ${skillsUsed.map((i) => `<li class="${i.done ? '' : 'no'}"><span class="mark">${i.done ? '✓' : '·'}</span><span>${esc(i.text)}</span></li>`).join('')}
              </ul>
              <h3>Какие навыки нужны</h3>
              <ul>${career.skills.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
              <h3>Где учиться в Ростовской области</h3>
              <ul class="study">
                ${career.study
                  .map(
                    (x) =>
                      `<li><b>${esc(x.name)}</b> <span class="lvl">${esc(x.level)}, ${esc(x.city)}</span><br><span>${esc(x.what)}</span> <a href="${esc(x.url)}" target="_blank" rel="noopener">сайт</a></li>`,
                  )
                  .join('')}
              </ul>
              <h3>Источники</h3>
              <ul class="sources">
                ${career.sources.map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a></li>`).join('')}
              </ul>
              <p class="checked">Данные проверены: ${esc(career.checked)}</p>
            </div>
            <div class="end-actions">
              <button class="btn primary" data-a="exit">Выйти в меню</button>
              <button class="btn" data-a="restart">Пройти заново</button>
            </div>
          </div>`,
          'solid end-screen',
        );
        s.addEventListener('click', (e) => {
          const a = e.target.closest('[data-a]')?.dataset.a;
          if (a) {
            sfx.ui();
            resolve(a);
          }
        });
      });
    },

    async fadeOut(caption = '', sub = '') {
      fadeEl.querySelector('.cap').innerHTML = caption ? `${esc(caption)}${sub ? `<small>${esc(sub)}</small>` : ''}` : '';
      fadeEl.classList.add('on');
      await wait(650);
    },
    clearFade() {
      fadeEl.classList.remove('on');
    },
    async fadeIn() {
      fadeEl.classList.remove('on');
      await wait(650);
    },
  };
  return screens;
}
