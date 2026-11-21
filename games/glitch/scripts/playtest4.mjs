// Автопрохождение главы 4 (финал) (Playwright, window.__glitch и меню ?debug=1).
// Запуск: сначала `npm run dev`, затем `node scripts/playtest4.mjs [--mobile]`.
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
  await page.screenshot({ path: path.join(OUT, `ch4_${tag}${String(n).padStart(2, '0')}_${name}.png`) });
};
const wait = (ms) => page.waitForTimeout(ms);
const ev = (fn, arg) => page.evaluate(fn, arg);
const flags = () => ev(() => window.__glitch.game.state.flags);
const ch4 = () => ev(() => window.__glitch.game.state.ch4);
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

  // Переход из главы 3 в финал через экран итогов
  await page.keyboard.press('F2');
  await page.locator('[data-e="gl_ch3_standard"]').click();
  await page.waitForSelector('text=Глава 3 завершена');
  check('на итогах главы 3 есть кнопка «Глава 4»', (await page.locator('[data-a="next"]').count()) === 1);
  await page.locator('[data-a="next"]').click();
  await page.waitForFunction(() => window.__glitch.game.state.chapter === 4 && window.__glitch.ctx.sceneName === 'office', null, { timeout: 20000 });
  await idle();
  check('перешли в финал (офис)', true);

  await interact('timur');
  check('Тимур рассказал про 0.9.8', (await flags()).met_team);
  await interact('pc');
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'station' && !window.__glitch.ctx.cutscene, null, { timeout: 20000 });
  await idle();
  await wait(1500);
  await dialog();
  check('станция 0.9.8', true);

  check(mobile ? 'консоль открывается кнопкой' : 'консоль открывается клавишей Ё', await openConsole());
  await cmd('autotest.log');
  await cmd('world.reset');
  await cmd('item.lantern');
  await cmd('tp.archive', 600);
  await cmd('tp.hall', 600);
  const ev4 = (await ch4()).evidence;
  check('ретест: AT-08 отключён и журнал всё равно пропадает', !!(ev4.r1 && ev4.r2), JSON.stringify(ev4));
  await inPanel('console', '.c3-x').click();
  await wait(400);
  await interact('lis');
  check('ретест: Лис забыл игрока', !!(await ch4()).evidence.r3);
  await openConsole();
  await cmd('retest', 600);
  check('чек-лист ретеста открылся', await panelOpen('hypo'));
  const title = await inPanel('hypo', '.c3-head-title').textContent();
  check('заголовок чек-листа «Ретест сборки 0.9.8»', title.includes('Ретест'), title);
  await inPanel('hypo', '[data-act="verdict"][data-id="r2"][data-v="true"]').click();
  await wait(400);
  check('неверный вердикт не принят', !(await ch4()).verdicts.r2);
  await inPanel('hypo', '[data-act="verdict"][data-id="r1"][data-v="true"]').click();
  await wait(300);
  await inPanel('hypo', '[data-act="verdict"][data-id="r2"][data-v="false"]').click();
  await wait(300);
  await shot('retest');
  await inPanel('hypo', '[data-act="verdict"][data-id="r3"][data-v="false"]').click();
  await wait(900);
  await dialog();
  check('ретест пройден', (await flags()).retest_done);

  // Итоговый отчёт: первые варианты = Ирине и Тимуру вместе, перенести релиз
  await ev(() => {
    const pt = window.__glitch.ctx.world.points.terminalView;
    window.__glitch.teleport(pt.x, pt.z, pt.yaw);
  });
  await wait(400);
  await interact('terminal');
  const c4 = await ch4();
  check('отчёт отправлен Ирине и Тимуру, рекомендация перенести', (await flags()).report_sent && c4.to === 'both' && c4.rec === 'delay', `${c4.to}/${c4.rec}, улик ${c4.evidenceCount}`);

  // Лис: сохранить журнал
  await interact('lis');
  await page.waitForSelector('text=Глава 4 завершена', { timeout: 15000 });
  await wait(500);
  await shot('finale');
  const endTitle = await page.locator('.end-wrap h2').first().textContent();
  check('лучшая концовка «Воспроизводится»', endTitle.includes('Воспроизводится'), endTitle);
  const ach = await ev(() => window.__glitch.game.state.achievements);
  check('достижения финала', !!(ach.gl_chapter4 && ach.gl_best_ending && ach.gl_saved_lis && ach.gl_regression));
  check('после финала нет кнопки дальше', (await page.locator('[data-a="next"]').count()) === 0);
} catch (e) {
  check('прохождение финала без исключений', false, e.message);
  await shot('error').catch(() => {});
}

console.log('\nОшибки браузера:', errors.length ? `\n${errors.join('\n')}` : 'нет');
const failed = results.filter((r) => !r.ok).length;
console.log(`Итог: ${results.length - failed}/${results.length} проверок пройдено`);
clearTimeout(watchdog);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
