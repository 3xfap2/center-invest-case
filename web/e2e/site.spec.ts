import { expect, test, type Page } from '@playwright/test';

// Every test fails on any browser console error or uncaught exception.
// Failed /api requests are expected in "API down" tests and are the only thing allowed.
let errors: string[] = [];
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' && !m.location().url.includes('/api/')) errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));
  // Default: no server at all.
  await page.route('**/api/**', (r) => r.abort('connectionrefused'));
});
test.afterEach(() => expect(errors, 'console errors').toEqual([]));

const game = (page: Page) => page.frameLocator('[data-testid=game-frame]');

async function startAs(page: Page, nickname: string, difficulty: 'Лёгкий' | 'Обычный' | 'Сложный', gameId = 'mock') {
  await page.goto(`/start?game=${gameId}`);
  await page.getByLabel('Как тебя зовут в игре?').fill(nickname);
  await page.getByText(difficulty, { exact: true }).click();
  await page.getByRole('button', { name: 'Дальше' }).click();
  await expect(page).toHaveURL(`/play/${gameId}`);
  await expect(game(page).locator('#state')).toHaveText('init получен');
}

const saved = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem('profnav-save') ?? 'null')?.state);

test('landing: the poster shelf switches the hero, by mouse and keyboard, and leads to the start screen', async ({ page }) => {
  await page.goto('/');
  for (const id of ['chuzhoe-imya', 'glitch', 'kompas', 'dym']) await expect(page.getByTestId(`game-${id}`)).toBeVisible();
  await expect(page.getByTestId('game-glitch')).toContainText('Тестировщик игр');
  await expect(page.getByTestId('game-mock')).toHaveCount(0);

  await page.getByTestId('game-glitch').click();
  await expect(page.getByTestId('game-glitch')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('GLITCH');
  await expect(page.getByTestId('hero')).toContainText('Завтра релиз');

  await page.getByTestId('game-glitch').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('game-kompas')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('game-kompas')).toBeFocused();
  await expect(page.getByTestId('hero')).toContainText('Пять подростков');
  // The hero's button follows the game's status: a built game can be played, one that isn't built can't be started.
  const built = !(await page.getByTestId('game-kompas').textContent())?.includes('скоро');
  if (built) await expect(page.getByTestId('cta-play')).toBeVisible();
  else await expect(page.getByTestId('hero').getByRole('button', { name: 'Скоро' })).toBeDisabled();

  await page.getByTestId('nav-start').click();
  await expect(page).toHaveURL('/start');
});

test('ready → init carries the nickname, difficulty, save and flags', async ({ page }) => {
  await startAs(page, 'Аня_15', 'Сложный');
  const init = JSON.parse((await game(page).locator('#init').textContent()) ?? '{}');
  expect(init).toMatchObject({ type: 'init', nickname: 'Аня_15', difficulty: 'hard', save: null, flags: {}, muted: false });
  expect(init.playerId).toMatch(/[0-9a-f-]{36}/);
});

test('a save and a flag survive a page reload', async ({ page }) => {
  await startAs(page, 'Тестер', 'Обычный');
  await game(page).locator('#save').click();
  await game(page).locator('#save').click();
  await game(page).locator('#flag').click();
  await game(page).locator('#progress').click();
  await expect(page.getByTestId('save-status')).toHaveText('Сохранено на этом устройстве');
  await page.reload();
  await expect(game(page).locator('#state')).toHaveText('init получен');
  const init = JSON.parse((await game(page).locator('#init').textContent()) ?? '{}');
  expect(init.save).toEqual({ v: 1, counter: 2, scene: 'mock-2' });
  expect(init.flags).toEqual({ mock_trusted_mentor: true });
});

test('end shows the results with the new achievement', async ({ page }) => {
  await startAs(page, 'Тестер', 'Лёгкий');
  await game(page).locator('#achievement').click();
  await expect(page.getByTestId('toast')).toContainText('mk_first_click');
  await game(page).locator('#end').click();
  await expect(page).toHaveURL('/results/mock');
  await expect(page.getByTestId('ending')).toHaveText('good');
  await expect(page.getByTestId('results')).toContainText('1:35');
  await expect(page.getByTestId('achievements')).toContainText('mk_first_click');
  await expect(page.getByTestId('achievements')).toContainText('новое');
  await expect(page.getByText('Таблица появится, когда сервер будет доступен')).toBeVisible();
  await page.getByRole('button', { name: 'Сыграть ещё' }).click();
  await expect(page).toHaveURL('/play/mock');
  const init = JSON.parse((await game(page).locator('#init').textContent()) ?? '{}');
  expect(init.save).toBeNull();
});

test('exit returns to the game select', async ({ page }) => {
  await startAs(page, 'Тестер', 'Обычный');
  await game(page).locator('#exit').click();
  await expect(page).toHaveURL('/games');
  await expect(page.getByRole('heading', { name: 'Выбери профессию' })).toBeVisible();
});

test('bad messages from the iframe are ignored', async ({ page }) => {
  await startAs(page, 'Тестер', 'Обычный');
  await game(page).locator('#bad').click();
  await page.waitForTimeout(300);
  await expect(page).toHaveURL('/play/mock');
  const s = await saved(page);
  expect(s.games.mock ?? { data: null }).toMatchObject({ data: null });
  expect(s.flags).toEqual({});
  expect(s.runs).toEqual([]);
});

test('pause and resume follow the tab, mute reaches the game', async ({ page }) => {
  await startAs(page, 'Тестер', 'Обычный');
  const setHidden = (hidden: boolean) =>
    page.evaluate((h) => {
      Object.defineProperty(document, 'hidden', { value: h, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    }, hidden);
  await setHidden(true);
  await expect(game(page).locator('#paused')).toHaveText('да');
  await setHidden(false);
  await expect(game(page).locator('#paused')).toHaveText('нет');
  await page.getByTestId('mute').click();
  await expect(game(page).locator('#muted')).toHaveText('выкл');
});

test('the mock game is hidden from the list unless ?dev=1', async ({ page }) => {
  await startAs(page, 'Тестер', 'Обычный');
  await page.goto('/games');
  await expect(page.getByTestId('select-mock')).toHaveCount(0);
  await expect(page.getByTestId('select-glitch')).toBeVisible();
  await page.goto('/games?dev=1');
  await expect(page.getByTestId('select-mock')).toContainText('Играть');
});

test('a broken save shows a notice and the site starts fresh', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('profnav-save', '{"state":{"player":42},"version":1}'));
  await page.reload();
  await expect(page.getByRole('status')).toContainText('Сохранение повреждено');
  await expect(page.getByTestId('player-chip')).toHaveCount(0);
});

test('with the API up: player is created, saves and runs go to the server, leaderboard shows', async ({ page }) => {
  const sent: string[] = [];
  await page.unroute('**/api/**');
  await page.route('**/api/v1/**', async (r) => {
    const url = new URL(r.request().url());
    const key = `${r.request().method()} ${url.pathname}`;
    sent.push(key);
    const json = (status: number, body: unknown) => r.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
    if (key === 'GET /api/v1/health') return json(200, { ok: true, version: 'test' });
    if (key === 'POST /api/v1/players') return json(201, { playerId: 'srv-1', token: 'tok-1', nickname: 'Аня' });
    if (key === 'PUT /api/v1/saves/mock') {
      expect(r.request().headers().authorization).toBe('Bearer tok-1');
      return json(200, { updatedAt: '2026-11-21T18:00:00Z' });
    }
    if (key === 'POST /api/v1/runs') {
      expect(r.request().postDataJSON()).toMatchObject({ gameId: 'mock', ending: 'good', stars: 2, difficulty: 'normal' });
      return json(201, { runId: 'r1' });
    }
    if (key === 'GET /api/v1/leaderboard')
      return json(200, [{ nickname: 'Аня', score: 120, stars: 2, ending: 'good', durationSec: 95, at: '2026-11-21T18:00:00Z' }]);
    return json(404, { error: { code: 'not_found', message: '' } });
  });

  await startAs(page, 'Аня', 'Обычный');
  await game(page).locator('#save').click();
  await expect(page.getByTestId('save-status')).toHaveText('Сохранено', { timeout: 5000 });
  await game(page).locator('#end').click();
  await expect(page.getByTestId('leaderboard')).toContainText('Аня');
  expect(sent).toEqual(expect.arrayContaining(['POST /api/v1/players', 'PUT /api/v1/saves/mock', 'POST /api/v1/runs', 'GET /api/v1/leaderboard']));
  expect(sent.filter((s) => s === 'POST /api/v1/players')).toHaveLength(1);
});

test('with the API returning errors, the whole flow still works locally', async ({ page }) => {
  await page.unroute('**/api/**');
  await page.route('**/api/**', (r) => r.fulfill({ status: 503, contentType: 'application/json', body: '{"error":{"code":"down","message":""}}' }));
  await startAs(page, 'Тестер', 'Обычный');
  await game(page).locator('#save').click();
  await expect(page.getByTestId('save-status')).toHaveText('Сохранено на этом устройстве');
  await game(page).locator('#end').click();
  await expect(page.getByTestId('ending')).toHaveText('good');
});
