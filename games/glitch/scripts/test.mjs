// npm test: проверки по docs/GAME_CONTRACT.md перед каждым pull request.
// 1) статические проверки файлов; 2) автопрохождение на ПК и телефоне (dev);
// 3) меню отладки и обмен сообщениями с «сайтом» в iframe; 4) сборка и прохождение собранной версии.
import { createServer, build, preview } from 'vite';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.join(root, p);
const SHOTS = process.env.SHOTS || rel('.shots');
let failed = 0;
const check = (name, ok, extra = '') => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}${extra ? `: ${extra}` : ''}`);
};

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
}

// ---------- 1. Статические проверки ----------
console.log('\n== Файлы по контракту');
const gj = JSON.parse(fs.readFileSync(rel('game.json'), 'utf8'));
check('game.json: id glitch, entry index.html', gj.id === 'glitch' && gj.entry === 'index.html');
check(
  'game.json: все поля',
  ['title', 'profession', 'version', 'controls', 'credits'].every((k) => typeof gj[k] === 'string' && gj[k]) &&
    ['approxSizeMB', 'minutes'].every((k) => typeof gj[k] === 'number'),
);
check('CREDITS.md на месте', fs.existsSync(rel(gj.credits)));

const career = JSON.parse(fs.readFileSync(rel('src/content/career.json'), 'utf8'));
const careerText = JSON.stringify(career);
check(
  'career.json: есть что делает, навыки, где учиться, источники',
  career.what?.length >= 3 && career.skills?.length >= 3 && career.study?.length >= 3 && career.sources?.length >= 1,
);
check('career.json: без заглушек', !/уточняются/i.test(careerText));
check(
  'career.json: все ссылки https',
  [...career.study, ...career.sources].every((x) => /^https:\/\//.test(x.url)),
);

const srcFiles = walk(rel('src'), ['.js', '.json', '.css']).concat([rel('index.html')]);
const dashHits = [];
for (const f of srcFiles) {
  fs.readFileSync(f, 'utf8')
    .split('\n')
    .map((l) => l.replace(/\r$/, ''))
    .forEach((line, i) => {
      const code = f.endsWith('.json') ? line : line.replace(/(^|\s)\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
      if (code.includes('—')) dashHits.push(`${path.relative(root, f)}:${i + 1}`);
    });
}
check('нет длинного тире в тексте игры', dashHits.length === 0, dashHits.join(', '));

const allSrc = srcFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const flagsDoc = fs.readFileSync(rel('docs/FLAGS.md'), 'utf8');
const decided = [...new Set([...allSrc.matchAll(/decide\('([a-z0-9_]+)'/g)].map((m) => m[1]))];
check('все флаги описаны в docs/FLAGS.md', decided.every((k) => flagsDoc.includes(`\`${k}\``)), decided.join(', '));
check('флаги с префиксом gl_', decided.every((k) => k.startsWith('gl_')));
const achDoc = fs.readFileSync(rel('docs/ACHIEVEMENTS.md'), 'utf8');
const unlocked = [...new Set([...allSrc.matchAll(/unlock\('([a-z0-9_]+)'/g)].map((m) => m[1]))];
check('все достижения описаны в docs/ACHIEVEMENTS.md', unlocked.every((k) => achDoc.includes(`\`${k}\``)), unlocked.join(', '));
check('достижения с префиксом gl_', unlocked.every((k) => k.startsWith('gl_')));
const achJson = JSON.parse(fs.readFileSync(rel('achievements.json'), 'utf8'));
const jsonIds = achJson.map((a) => a.id);
check(
  'achievements.json совпадает с кодом (для сайта)',
  unlocked.every((k) => jsonIds.includes(k)) && jsonIds.every((k) => unlocked.includes(k)) && achJson.every((a) => a.title && a.description),
  `в коде ${unlocked.length}, в json ${jsonIds.length}`,
);
check('общий мост берётся из games/shared', allSrc.includes("import '../../../shared/ns-bridge.js'") && !fs.existsSync(rel('src/ns-bridge.js')));

// ---------- 2. Автопрохождение (dev) ----------
const server = await createServer({ root, configFile: rel('vite.config.js'), server: { port: 5179, strictPort: true, host: '127.0.0.1' }, logLevel: 'error' });
await server.listen();
const DEV = 'http://127.0.0.1:5179/';

// Дочерний процесс запускаем асинхронно: сервер Vite живёт в этом же процессе и должен отвечать.
function playtest(url, args, tag) {
  console.log(`\n== Автопрохождение: ${tag}`);
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [rel('scripts/playtest.mjs'), ...args], {
      env: { ...process.env, URL: url, SHOTS: path.join(SHOTS, tag) },
    });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    const kill = setTimeout(() => child.kill(), 300000);
    child.on('close', (code) => {
      clearTimeout(kill);
      out
        .split('\n')
        .filter((l) => l && !l.startsWith('shot'))
        .forEach((l) => console.log(`   ${l}`));
      check(`автопрохождение ${tag}`, code === 0);
      resolve();
    });
  });
}

await playtest(DEV, [], 'pc');
await playtest(DEV, ['--mobile'], 'phone');

// ---------- 3. Меню отладки и сайт в iframe ----------
console.log('\n== Сайт в iframe и меню отладки');
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1400, height: 800 } });
// Без захвата системного курсора (иначе у человека за компьютером прыгает мышь). Действует и внутри iframe.
await page.addInitScript(() => {
  Element.prototype.requestPointerLock = function () {
    return Promise.resolve();
  };
});
page.setDefaultTimeout(30000);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
try {
  await page.goto(`${DEV}dev/host.html?nick=Матвей&difficulty=easy`);
  const frameEl = await page.waitForSelector('#game');
  const frame = await frameEl.contentFrame();
  await frame.waitForSelector('text=Начать смену');
  const types = () => page.evaluate(() => window.messages.map((m) => m.type));
  check('игра прислала ready с gameId и version', await page.evaluate(() => window.messages.some((m) => m.type === 'ready' && m.gameId === 'glitch' && m.version)));
  await frame.getByText('Начать смену').click();
  await frame.waitForFunction(() => window.__glitch?.game.state);
  const st = await frame.evaluate(() => ({ name: window.__glitch.game.state.name, d: window.__glitch.game.state.difficulty }));
  check('ник и сложность взяты из init', st.name === 'Матвей' && st.d === 'easy', JSON.stringify(st));

  await page.evaluate(() => window.sendToGame({ type: 'pause' }));
  await page.waitForTimeout(200);
  const pausedOk = await frame.evaluate(() => window.__glitch.blockers.has('external'));
  await page.evaluate(() => window.sendToGame({ type: 'resume' }));
  await page.waitForTimeout(200);
  const resumedOk = !(await frame.evaluate(() => window.__glitch.blockers.has('external')));
  check('pause и resume от сайта', pausedOk && resumedOk);
  await page.evaluate(() => window.sendToGame({ type: 'mute', muted: false }));

  // Все точки главы из меню отладки.
  const presets = await frame.$$eval('[data-p]', (bs) => bs.map((b) => b.dataset.p));
  let presetsOk = true;
  for (const p of presets) {
    await page.keyboard.press('F2');
    await frame.click(`[data-p="${p}"]`);
    await frame.waitForFunction(() => window.__glitch.ctx.world && !window.__glitch.ctx.cutscene && !window.__glitch.blockers.has('menu'), null, { timeout: 15000 });
    const sc = await frame.evaluate(() => window.__glitch.ctx.sceneName);
    if (sc !== (p === 'office' ? 'office' : 'station')) presetsOk = false;
  }
  check(`меню отладки: переход к ${presets.length} точкам главы`, presetsOk && presets.length >= 8);

  const endings = await frame.$$eval('[data-e]', (bs) => bs.map((b) => b.dataset.e));
  let endingsOk = true;
  for (const e of endings) {
    await page.keyboard.press('F2');
    await frame.click(`[data-e="${e}"]`);
    await frame.waitForSelector('text=Глава 1 завершена');
    // postMessage доходит до сайта асинхронно: ждём именно это сообщение end.
    await page.waitForFunction((id) => window.messages.some((m) => m.type === 'end' && m.ending === id), e, { timeout: 5000 }).catch(() => {});
    const last = await page.evaluate(() => [...window.messages].reverse().find((m) => m.type === 'end'));
    if (!last || last.ending !== e || last.stars < 0 || last.stars > 3 || typeof last.score !== 'number' || !Array.isArray(last.choices) || typeof last.durationSec !== 'number')
      endingsOk = false;
  }
  check(`меню отладки: все концовки (${endings.join(', ')}) и сообщение end`, endingsOk && endings.length >= 2);
  check('финал: карточка профессии с источниками', (await frame.locator('.sources a').count()) >= 1 && (await frame.locator('.heroes li').count()) === 4);
  await frame.getByText('Выйти в меню').click();
  await page.waitForFunction(() => window.messages.some((m) => m.type === 'exit'), null, { timeout: 5000 }).catch(() => {});
  const t = await types();
  for (const need of ['save', 'progress', 'achievement', 'flag', 'end', 'exit']) check(`сайт получил ${need}`, t.includes(need));
  const saveMsg = await page.evaluate(() => [...window.messages].reverse().find((m) => m.type === 'save'));
  check('save: v 1 и не больше 64 КБ', saveMsg?.data?.v === 1 && JSON.stringify(saveMsg.data).length <= 65536);
  const bad = await page.evaluate(() => window.messages.filter((m) => m.type === 'achievement' && !m.id.startsWith('gl_')).length);
  check('достижения с префиксом gl_', bad === 0);
} catch (e) {
  check('сайт в iframe без исключений', false, e.message);
}
check('нет ошибок в консоли (iframe)', errors.length === 0, errors.join(' | '));
await browser.close();
await server.close();

// ---------- 4. Сборка ----------
console.log('\n== Сборка');
await build({ root, configFile: rel('vite.config.js'), logLevel: 'error' });
const out = path.resolve(root, '../../web/public/games/glitch');
check('сборка в web/public/games/glitch/index.html', fs.existsSync(path.join(out, 'index.html')));
const size = walk(out, ['']).reduce((s, f) => s + fs.statSync(f).size, 0) / 1024 / 1024;
check(`размер сборки ${size.toFixed(2)} МБ совпадает с game.json (${gj.approxSizeMB})`, Math.abs(size - gj.approxSizeMB) <= 1);
const prev = await preview({ root, configFile: rel('vite.config.js'), preview: { port: 5180, strictPort: true, host: '127.0.0.1' }, logLevel: 'error' });
await playtest('http://127.0.0.1:5180/?debug=1', [], 'build');
await (prev.close ? prev.close() : new Promise((r) => prev.httpServer.close(r)));

console.log(failed ? `\nНЕ ПРОЙДЕНО: ${failed}` : '\nВсе проверки пройдены');
process.exit(failed ? 1 : 0);
