// Автопрохождение главы 3 (Playwright, window.__glitch и меню ?debug=1).
// Запуск: сначала `npm run dev`, затем `node scripts/playtest3.mjs [--mobile]`.
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
  console.log('FAIL общий таймаут 5 мин');
  process.exit(2);
}, 300000);
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));

const tag = mobile ? 'm' : 'd';
let n = 0;
const shot = async (name) => {
  n += 1;
  await page.screenshot({ path: path.join(OUT, `ch3_${tag}${String(n).padStart(2, '0')}_${name}.png`) });
};
const wait = (ms) => page.waitForTimeout(ms);
const ev = (fn, arg) => page.evaluate(fn, arg);
const flags = () => ev(() => window.__glitch.game.state.flags);
const ch3 = () => ev(() => window.__glitch.game.state.ch3);
const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${extra ? `: ${extra}` : ''}`);
};

async function dialog() {
  for (let i = 0; i < 80; i++) {
    await wait(220);
    if (!(await ev(() => !!document.querySelector('.dialogue:not(.hidden)')))) return;
    const opts = page.locator('.dialogue .opt');
    if ((await opts.count()) > 0) await opts.first().click();
    else await page.locator('.dialogue .line').click();
  }
  throw new Error('диалог не закрылся');
}
async function interact(id) {
  await ev((i) => {
    window.__glitch.interact(i);
  }, id);
  await wait(200);
  await dialog();
}
async function idle() {
  await page.waitForFunction(() => window.__glitch.ctx.world && !window.__glitch.ctx.cutscene && !window.__glitch.blockers.has('menu'), null, { timeout: 20000 });
  await wait(400);
  await dialog();
  // стартовые реплики появляются с задержкой после затемнения: дождаться и закрыть
  await wait(1200);
  await dialog();
}
// панели скрываются атрибутом hidden
const panelOpen = (name) => ev((nm) => document.querySelector(`.c3-layer-${nm}`)?.hidden === false, name);
const inPanel = (name, sel) => page.locator(`.c3-layer-${name} ${sel}`);
async function cmd(id, after = 300) {
  await inPanel('console', `[data-act="cmd"][data-id="${id}"]`).click();
  await wait(after);
}
// Открыть консоль как игрок: на телефоне кнопкой «Консоль», на ПК клавишей Ё. Если мешает реплика, закрыть её и повторить.
async function openConsole() {
  for (let k = 0; k < 5 && !(await panelOpen('console')); k++) {
    await dialog();
    if (mobile) await page.locator('[data-console]').tap().catch(() => {});
    else await page.keyboard.press('Backquote');
    await wait(500);
  }
  return panelOpen('console');
}

try {
  await page.goto(URL);
  await page.getByText('Начать смену').click();
  await page.locator('.cut-skip').click({ timeout: 5000 }).catch(() => {});
  await page.waitForFunction(() => window.__glitch?.game.state);
  await wait(1500);

  // Переход из главы 2 в главу 3 через экран итогов
  await page.keyboard.press('F2');
  await page.locator('[data-e="gl_ch2_standard"]').click();
  await page.waitForSelector('text=Глава 2 завершена');
  await page.locator('[data-a="next"]').click();
  await page.waitForFunction(() => window.__glitch.game.state.chapter === 3 && window.__glitch.ctx.sceneName === 'office', null, { timeout: 20000 });
  await idle();
  check('перешли в главу 3 (офис)', true);
  await shot('office');

  // Следы Никиты
  for (const id of ['coffee', 'whiteboard', 'drawer', 'trash', 'pc']) await interact(id);
  check('найдены все 5 следов', (await flags()).traces_done, String(Object.keys((await ch3()).traces).length));

  // Доска хронологии: сначала неверный порядок, потом верный
  await ev(() => {
    window.__glitch.interact('whiteboard');
  });
  await wait(500);
  check('доска хронологии открылась', await panelOpen('timeline'));
  for (const id of ['mail', 'trash', 'drawer', 'board', 'coffee']) await inPanel('timeline', `[data-act="place"][data-id="${id}"]`).click();
  await inPanel('timeline', '[data-act="submit"]').click();
  await wait(500);
  check('неверный порядок не принят', !(await flags()).timeline_done);
  for (let i = 0; i < 5; i++) await inPanel('timeline', '[data-act="unplace"]').first().click();
  for (const id of ['coffee', 'board', 'drawer', 'trash', 'mail']) await inPanel('timeline', `[data-act="place"][data-id="${id}"]`).click();
  await shot('timeline');
  await inPanel('timeline', '[data-act="submit"]').click();
  await wait(600);
  check('верный порядок принят', (await flags()).timeline_done);
  await inPanel('timeline', '[data-act="done"]').click();
  check('доска закрылась кнопкой «Готово»', !(await panelOpen('timeline')));
  await wait(400);
  await dialog();

  // Станция и консоль
  await interact('pc');
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'station' && !window.__glitch.ctx.cutscene, null, { timeout: 20000 });
  await idle();
  check('станция в режиме отладки', true);
  await wait(1500); // реплика героя появляется через 0.4 с после входа
  await dialog();
  check(mobile ? 'консоль открывается кнопкой «Консоль»' : 'консоль открывается клавишей Ё', await openConsole());
  await cmd('help');
  // H1: дважды save.reload и разговор с Лисом
  for (let k = 0; k < 2; k++) {
    await cmd('save.reload', 2000);
    await inPanel('console', '.c3-x').click(); // закрыть консоль крестиком
    await wait(400);
    await interact('lis');
    await openConsole();
  }
  check('доказательство H1 (Лис не учится)', !!(await ch3()).evidence.h1);
  await shot('console');
  // H2: без фонаря и с фонарём
  await cmd('world.reset');
  await cmd('tp.archive', 600);
  await cmd('tp.hall', 600);
  await cmd('item.lantern');
  await cmd('tp.archive', 600);
  await cmd('tp.hall', 600);
  check('доказательство H2 (фонарь)', !!(await ch3()).evidence.h2, JSON.stringify((await ch3()).runs));
  await cmd('autotest.log');
  check('доказательство H3 (AT-07)', !!(await ch3()).evidence.h3);
  await cmd('hypo', 600);
  check('панель гипотез открылась', await panelOpen('hypo'));
  await inPanel('hypo', '[data-act="verdict"][data-id="h1"][data-v="true"]').click();
  await wait(400);
  check('неверный вердикт не принят', !(await ch3()).verdicts.h1);
  await inPanel('hypo', '[data-act="verdict"][data-id="h1"][data-v="false"]').click();
  await wait(300);
  await inPanel('hypo', '[data-act="verdict"][data-id="h2"][data-v="true"]').click();
  await wait(300);
  await shot('hypotheses');
  await inPanel('hypo', '[data-act="verdict"][data-id="h3"][data-v="true"]').click();
  await wait(900);
  await dialog();
  check('все гипотезы проверены', (await flags()).hypos_done);

  // Комната Никиты: конструктор автотеста
  await ev(() => {
    window.__glitch.interact('service_door');
  });
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'diagnostic' && !window.__glitch.ctx.cutscene, null, { timeout: 20000 });
  await idle();
  await ev(() => {
    window.__glitch.interact('at_terminal');
  });
  await wait(500);
  check('конструктор автотеста открылся', await panelOpen('autotest'));
  await inPanel('autotest', '[data-act="add"][data-id="archive"]').click();
  await inPanel('autotest', '[data-act="run"]').click();
  await wait(1500);
  check('неверный сценарий не прошёл', !(await flags()).autotest_done);
  await inPanel('autotest', '[data-act="clear"]').click();
  for (const id of ['load', 'update', 'migrate', 'at08', 'check']) await inPanel('autotest', `[data-act="add"][data-id="${id}"]`).click();
  await inPanel('autotest', '[data-act="run"]').click();
  await wait(1200);
  await shot('autotest');
  await page.waitForFunction(() => window.__glitch.game.state.flags.autotest_done, null, { timeout: 10000 });
  check('автотест AT-08 доказал стирание журнала', true);
  await wait(2500);
  await dialog();
  await page.waitForFunction(() => window.__glitch.game.state.flags.nikita_posted, null, { timeout: 15000 });
  await dialog();
  await wait(2200); // реплика «новый комментарий» появляется через 1.5 с
  await dialog();
  const comment = await ev(() => window.__glitch.game.state.reports.find((r) => r.id === '0412')?.comments.at(-1)?.text || '');
  check('Никита оставил комментарий под #0412', comment.includes('AT-08'));

  // Финал: открыть и закрыть планшет
  await ev(() => window.__glitch.tablet.open('tracker'));
  await wait(600);
  await ev(() => window.__glitch.tablet.close());
  await page.waitForSelector('text=Глава 3 завершена', { timeout: 15000 });
  await wait(500);
  await shot('chapter3_end');
  const ach = await ev(() => window.__glitch.game.state.achievements);
  check('достижения главы 3', !!(ach.gl_chapter3 && ach.gl_console && ach.gl_nikita_wrong), Object.keys(ach).filter((k) => /detective|console|nikita_wrong|hypotheses|autotest|chapter3/.test(k)).join(','));
  check('на итогах главы 3 нет кнопки дальше', (await page.locator('[data-a="next"]').count()) === 0);
} catch (e) {
  check('прохождение главы 3 без исключений', false, e.message);
  await shot('error').catch(() => {});
}

console.log('\nОшибки браузера:', errors.length ? `\n${errors.join('\n')}` : 'нет');
const failed = results.filter((r) => !r.ok).length;
console.log(`Итог: ${results.length - failed}/${results.length} проверок пройдено`);
clearTimeout(watchdog);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
