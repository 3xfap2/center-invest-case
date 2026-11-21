// Автопрохождение главы 1 в браузере (Playwright) с отладочным доступом window.__glitch.
// Запуск: сначала `npm run dev`, затем `node scripts/playtest.mjs [--mobile] [--difficulty=lead]`.
// Скриншоты: папка из переменной SHOTS (по умолчанию ./.shots).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.env.URL || 'http://localhost:5173/';
const mobile = process.argv.includes('--mobile');
const difficulty = (process.argv.find((a) => a.startsWith('--difficulty=')) || '--difficulty=normal').split('=')[1];
const OUT = process.env.SHOTS || path.resolve('.shots');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const context = await browser.newContext(
  mobile
    ? { viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
    : { viewport: { width: 1280, height: 800 } },
);
// Тестовый Chrome на Windows захватывает настоящий системный курсор (pointer lock),
// и у человека за компьютером мышь начинает прыгать. В тестах захват не нужен: отключаем.
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
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

const tag = mobile ? 'm' : 'd';
let n = 0;
const shot = async (name) => {
  n += 1;
  const f = path.join(OUT, `${tag}${String(n).padStart(2, '0')}_${name}.png`);
  await page.screenshot({ path: f });
  console.log('shot', f);
};
const wait = (ms) => page.waitForTimeout(ms);
const ev = (fn, arg) => page.evaluate(fn, arg);
const flags = () => ev(() => window.__glitch.game.state.flags);
const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${extra ? `: ${extra}` : ''}`);
};

// Пролистать открытый диалог, выбирая вариант pick.
async function dialog(pick = 0) {
  for (let i = 0; i < 80; i++) {
    await wait(220);
    const open = await ev(() => !!document.querySelector('.dialogue:not(.hidden)'));
    if (!open) return;
    const opts = await page.locator('.dialogue .opt').count();
    if (opts > 0) await page.locator('.dialogue .opt').nth(Math.min(pick, opts - 1)).click();
    else await page.locator('.dialogue .line').click();
  }
  throw new Error('диалог не закрылся');
}
async function interact(id, pick = 0) {
  await ev((i) => {
    window.__glitch.interact(i); // не ждём: диалог закрывает dialog()
  }, id);
  await wait(150);
  await dialog(pick);
}
async function idle() {
  await page.waitForFunction(() => !window.__glitch.ctx.cutscene && !document.querySelector('.dialogue:not(.hidden)'), null, { timeout: 20000 });
}

try {
  const t0 = Date.now();
  await page.goto(URL);
  await page.waitForSelector('text=Начать смену', { timeout: 15000 });
  const loadMs = Date.now() - t0;
  check('загрузка до кнопки старта не дольше 5 с', loadMs <= 5000, `${loadMs} мс`);
  await shot('loading');
  await page.getByText('Начать смену').click();
  // вступительный ролик пропускаем (его проверяет отдельный тест)
  await page.locator('.cut-skip').click({ timeout: 5000 }).catch(() => {});
  await page.waitForFunction(() => window.__glitch?.game.state, null, { timeout: 15000 });
  await ev((d) => (window.__glitch.game.state.difficulty = d), difficulty);
  await page.waitForFunction(() => window.__glitch?.ctx.world, null, { timeout: 15000 });
  await wait(4000);
  await dialog();
  await shot('office');

  if (!(await flags()).met_irina) await interact('irina', 0);
  check('бриф Ирины', (await flags()).met_irina);
  await interact('timur', 1);
  await interact('pc', 0);
  await page.waitForFunction(() => window.__glitch.ctx.sceneName === 'station' && !window.__glitch.ctx.cutscene, null, { timeout: 20000 });
  await wait(1500);
  await dialog();
  await shot('station');

  await interact('lis', 0);
  check('встреча с Лисом', (await flags()).met_lis);
  await interact('bench');
  let r = await ev(() => window.__glitch.cb.onSubmitReport({ subject: 'bench', steps: ['inspect_bench'], expected: 'bench_fly', actual: 'bench_flying', severity: 'low', attachment: false }));
  check('скамейка: неверное ожидаемое возвращено', r.status === 'returned', r.message);
  r = await ev(() => window.__glitch.cb.onSubmitReport({ subject: 'bench', steps: ['inspect_bench'], expected: 'bench_floor', actual: 'bench_flying', severity: 'low', attachment: false }));
  check('скамейка принята', r.status === 'accepted', r.message);
  await interact('clock');
  await ev(() => window.__glitch.cb.onDocCheck('clock'));
  r = await ev(() => window.__glitch.cb.onSubmitReport({ subject: 'clock', steps: ['inspect_clock'], expected: 'clock_forward', actual: 'clock_backward', severity: 'low', attachment: false }));
  check('часы отклонены как фича', r.status === 'rejected', r.message);

  // Баг журнала: фонарь, архив, обратно.
  await interact('archive_door');
  await interact('lantern');
  check('фонарь в руке', (await flags()).lantern_held);
  const z = await ev(() => window.__glitch.ctx.world.zones.archive);
  const chalk = await ev(() => {
    const s = window.__glitch.ctx.world.slots.find((x) => x.id === 'chalk_wall');
    const v = s.object.getWorldPosition(new s.object.position.constructor());
    return { x: v.x, z: v.z };
  });
  // Встать внутри архива ближе к надписи.
  const cx = Math.min(Math.max(chalk.x, z.minX + 0.6), z.maxX - 0.6);
  const cz = Math.min(Math.max(chalk.z, z.minZ + 0.6), z.maxZ - 0.6);
  const mx = (z.minX + z.maxX) / 2;
  const mz = (z.minZ + z.maxZ) / 2;
  await ev(({ x, zz }) => window.__glitch.teleport(x, zz), { x: mx, zz: mz });
  await wait(400);
  await ev(({ x, zz }) => window.__glitch.teleport(x, zz), { x: (cx + mx) / 2, zz: (cz + mz) / 2 });
  await wait(1200);
  await shot('archive_lantern');
  const chalkOn = await ev(() => window.__glitch.ctx.world.slots.find((x) => x.id === 'chalk_wall') && true);
  try {
    await interact('chalk_wall');
  } catch (e) {
    console.log('надпись: ', e.message);
  }
  check('улика: надпись мелом', await ev(() => !!window.__glitch.game.state.evidence.chalk_note), String(chalkOn));
  const sp = await ev(() => window.__glitch.ctx.world.spawn);
  await ev((s) => window.__glitch.teleport(s.x, s.z, s.yaw), sp);
  await wait(800);
  check('журнал исчез после выхода с фонарём', (await flags()).journal_gone);
  await dialog();
  await shot('journal_gone');

  // Неудачный повтор, затем удачный.
  await ev(() => window.__glitch.cb.onReplay(['enter_archive', 'exit_archive']));
  check('повтор без фонаря не воспроизводится', !(await flags()).replay_ok);
  const replay = ev(() => window.__glitch.cb.onReplay(['take_lantern', 'enter_archive', 'exit_archive']));
  await wait(5000);
  await shot('replay_cutscene');
  await replay;
  check('повтор воспроизвёл ошибку', (await flags()).replay_ok);
  await idle();

  r = await ev(() => window.__glitch.cb.onSubmitReport({ subject: 'journal', steps: ['take_lantern', 'enter_archive', 'exit_archive'], expected: 'journal_stays', actual: 'journal_vanishes', severity: 'low', attachment: true }));
  check('журнал: низкая серьёзность возвращена', r.status === 'returned', r.message);
  r = await ev(() => window.__glitch.cb.onSubmitReport({ subject: 'journal', steps: ['take_lantern', 'enter_archive', 'exit_archive'], expected: 'journal_stays', actual: 'journal_vanishes', severity: 'high', attachment: true }));
  check('журнал принят', r.status === 'accepted', r.message);
  await wait(4200);
  check('найден дубликат #0412', (await flags()).dup_found);

  await ev(() => window.__glitch.tablet.open('tracker'));
  await wait(400);
  await shot('tracker');
  await ev(() => window.__glitch.tablet.openReport('0412'));
  await wait(400);
  await shot('report_0412');
  await ev(() => window.__glitch.cb.onCompare('0412'));
  await wait(600);
  await shot('compare');
  await wait(800);
  await dialog();
  check('сравнение выполнено', (await flags()).compared);
  await ev(() => window.__glitch.tablet.close());
  await idle();

  const tv = await ev(() => window.__glitch.ctx.world.points.terminalView);
  await ev((t) => window.__glitch.teleport(t.x, t.z, t.yaw), tv);
  await wait(500);
  await shot('terminal_view');
  await ev(() => {
    window.__glitch.interact('terminal');
  });
  await wait(500);
  await shot('terminal_ui');
  await ev(() => window.__glitch.cb.onSaveEvidence(['replay_journal', 'report_0412', 'profile_match', 'chalk_note']));
  check('доказательства сохранены', (await flags()).evidence_saved);
  await ev(() => window.__glitch.tablet.close());
  await wait(900);
  await dialog();
  await page.waitForFunction(() => window.__glitch.game.state.flags.final_logged, null, { timeout: 15000 });
  check('в журнале чужая запись', await ev(() => window.__glitch.game.state.log.some((l) => l.foreign)));
  await ev(() => window.__glitch.tablet.open('log'));
  await wait(500);
  await shot('final_log');
  await ev(() => window.__glitch.tablet.close());
  await wait(3000);
  await dialog();
  check('служебный выход открыт', (await flags()).door_opened);
  await ev((t) => window.__glitch.teleport(t.x, t.z, t.yaw + Math.PI), tv);
  await wait(600);
  await shot('door_open');
  await interact('service_door');
  await page.waitForSelector('text=Глава 1 завершена', { timeout: 10000 });
  await wait(500);
  await shot('chapter_end');
  check('экран итогов', true);
} catch (e) {
  check('прохождение без исключений', false, e.message);
  await shot('error').catch(() => {});
}

console.log('\nОшибки браузера:', errors.length ? `\n${errors.join('\n')}` : 'нет');
const failed = results.filter((r) => !r.ok).length;
console.log(`Итог: ${results.length - failed}/${results.length} проверок пройдено`);
clearTimeout(watchdog);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
