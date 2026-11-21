// Автопрохождение главы 2 (Playwright, отладочный доступ window.__glitch и меню ?debug=1).
// Запуск: сначала `npm run dev`, затем `node scripts/playtest2.mjs [--mobile]`.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.URL || 'http://localhost:5173/';
const URL = BASE.includes('?') ? `${BASE}&debug=1` : `${BASE}?debug=1`;
const mobile = process.argv.includes('--mobile');
const OUT = process.env.SHOTS || path.resolve('.shots');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const context = await browser.newContext(
  mobile ? { viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: { width: 1280, height: 800 } },
);
// Без захвата системного курсора (иначе у человека за компьютером прыгает мышь).
await context.addInitScript(() => {
  Element.prototype.requestPointerLock = function () {
    return Promise.resolve();
  };
});
const page = await context.newPage();
page.setDefaultTimeout(30000);
const watchdog = setTimeout(() => {
  console.log('FAIL общий таймаут 4 мин');
  process.exit(2);
}, 240000);
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));

const tag = mobile ? 'm' : 'd';
let n = 0;
const shot = async (name) => {
  n += 1;
  await page.screenshot({ path: path.join(OUT, `ch2_${tag}${String(n).padStart(2, '0')}_${name}.png`) });
};
const wait = (ms) => page.waitForTimeout(ms);
const ev = (fn, arg) => page.evaluate(fn, arg);
const flags = () => ev(() => window.__glitch.game.state.flags);
const ch2 = () => ev(() => window.__glitch.game.state.ch2);
const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${extra ? `: ${extra}` : ''}`);
};

// Пролистать диалог. answers: список текстов вариантов, которые выбирать (иначе первый).
async function dialog(answers = []) {
  for (let i = 0; i < 80; i++) {
    await wait(220);
    if (!(await ev(() => !!document.querySelector('.dialogue:not(.hidden)')))) return;
    const opts = page.locator('.dialogue .opt');
    const cnt = await opts.count();
    if (cnt > 0) {
      const texts = await opts.allTextContents();
      let idx = texts.findIndex((t) => answers.some((a) => t.includes(a)));
      if (idx < 0) idx = 0;
      await opts.nth(idx).click();
    } else await page.locator('.dialogue .line').click();
  }
  throw new Error('диалог не закрылся');
}
async function interact(id, answers) {
  await ev((i) => {
    window.__glitch.interact(i);
  }, id);
  await wait(150);
  await dialog(answers);
}
async function idle() {
  await page.waitForFunction(() => window.__glitch.ctx.world && !window.__glitch.ctx.cutscene && !window.__glitch.blockers.has('menu'), null, { timeout: 20000 });
  await wait(300);
  await dialog();
}
async function switchTo(b) {
  for (let i = 0; i < 4 && (await ch2()).build !== b; i++) {
    await page.keyboard.press('q');
    await wait(350);
    await dialog();
  }
  return (await ch2()).build === b;
}
async function teleportTo(pointName) {
  await ev((p) => {
    const pt = window.__glitch.ctx.world.points[p];
    window.__glitch.teleport(pt.x, pt.z, pt.yaw);
  }, pointName);
  await wait(500);
}
async function standNear(objName, dist = 1.4) {
  await ev(([o, d]) => {
    const w = window.__glitch.ctx.world;
    const v = w.objects[o].getWorldPosition(w.objects[o].position.clone());
    const p = window.__glitch.player.pos;
    const dx = p.x - v.x;
    const dz = p.z - v.z;
    const len = Math.hypot(dx, dz) || 1;
    window.__glitch.teleport(v.x + (dx / len) * d, v.z + (dz / len) * d);
  }, [objName, dist]);
  await wait(500);
}

try {
  await page.goto(URL);
  await page.getByText('Начать смену').click();
  await page.locator('.cut-skip').click({ timeout: 5000 }).catch(() => {});
  await page.waitForFunction(() => window.__glitch?.game.state);
  await wait(1500);

  // Переход из главы 1 в главу 2 через экран итогов
  await page.keyboard.press('F2');
  await page.locator('[data-e="gl_ch1_standard"]').click();
  await page.waitForSelector('text=Глава 1 завершена');
  const nextBtn = page.locator('[data-a="next"]');
  check('на итогах главы 1 есть кнопка «Глава 2»', (await nextBtn.count()) === 1);
  await nextBtn.click();
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'diagnostic', null, { timeout: 20000 });
  await idle();
  const st = await ev(() => ({ ch: window.__glitch.game.state.chapter, prev: !!window.__glitch.game.state.prev?.[1] }));
  check('сохранение перешло в главу 2', st.ch === 2 && st.prev);
  await shot('room_097');

  await interact('note_wall');
  check('записки прочитаны', (await flags()).read_board);
  await interact('switcher');
  check('прибор взят', (await ch2()).hasSwitcher);
  check('переключение на 0.9.3', await switchTo('0.9.3'));
  await shot('room_093');

  await ev(() => {
    window.__glitch.interact('exit_door');
  });
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'station' && !window.__glitch.ctx.cutscene, null, { timeout: 15000 });
  await idle();
  check('вышли на станцию', true);

  for (const b of ['0.9.3', '0.9.5', '0.9.7']) {
    await switchTo(b);
    await interact('bench');
    await interact('clock');
    await interact('lis');
    await standNear('journal', 1.3);
    await dialog();
    await teleportTo('serviceReturn');
    await dialog();
    if (b === '0.9.3') await shot('station_093');
  }
  const found = await ev(() => {
    const obs = window.__glitch.game.state.ch2.obs;
    return Object.keys(obs).filter((k) => new Set(Object.keys(obs[k])).size >= 2).length;
  });
  check('таблица: все 5 различий', found === 5, String(found));
  check('таблица собрана (rows_done)', (await flags()).rows_done);
  await page.keyboard.press('c');
  await wait(400);
  check('таблица открывается по C', await ev(() => !!document.querySelector('.cmp-layer:not(.hidden)')));
  await shot('table');
  await page.keyboard.press('c');
  await wait(300);

  await teleportTo('terminalView');
  await interact('terminal', ['0.9.5', 'Часы']);
  check('звонок пройден, сборка 0.9.5 названа', (await flags()).call_done);

  await ev(() => {
    window.__glitch.interact('service_door');
  });
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'diagnostic' && !window.__glitch.ctx.cutscene, null, { timeout: 15000 });
  await idle();
  await switchTo('0.9.3');
  await teleportTo('hiddenNote');
  await shot('hidden_note');
  await ev(() => {
    window.__glitch.interact('hidden_note');
  });
  await dialog();
  await page.waitForSelector('text=Глава 2 завершена', { timeout: 15000 });
  await wait(500);
  await shot('chapter2_end');
  const ach = await ev(() => window.__glitch.game.state.achievements);
  check('экран итогов главы 2 и достижение gl_chapter2', !!ach.gl_chapter2);
  check('достижения главы 2: прибор, бисекция, полная таблица', !!(ach.gl_switcher && ach.gl_bisect && ach.gl_all_diffs));
} catch (e) {
  check('прохождение главы 2 без исключений', false, e.message);
  await shot('error').catch(() => {});
}

console.log('\nОшибки браузера:', errors.length ? `\n${errors.join('\n')}` : 'нет');
const failed = results.filter((r) => !r.ok).length;
console.log(`Итог: ${results.length - failed}/${results.length} проверок пройдено`);
clearTimeout(watchdog);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
