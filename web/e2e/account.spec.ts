import { expect, test, type Page, type Route } from '@playwright/test';

// A tiny in-memory stand-in for the Go server: enough for the account flow and the boards.
function fakeServer() {
  const db = {
    players: new Map<string, { nick: string; password: string | null }>(), // session token → player
    accounts: [] as { nick: string; password: string | null }[], // every player; logout ends a session, not the account
    saves: {} as Record<string, unknown>,
    achievements: [] as { gameId: string; id: string }[],
  };
  let n = 0;
  const handle = async (r: Route) => {
    const req = r.request();
    const url = new URL(req.url());
    const key = `${req.method()} ${url.pathname}`;
    const token = req.headers().authorization?.replace('Bearer ', '') ?? '';
    const body = req.postData() ? req.postDataJSON() : {};
    const json = (status: number, b: unknown) => r.fulfill({ status, contentType: 'application/json', body: JSON.stringify(b) });
    const me = db.players.get(token);
    switch (key) {
      case 'GET /api/v1/health':
        return json(200, { ok: true, version: 'test' });
      case 'POST /api/v1/players': {
        const t = `tok-${++n}`;
        const p = { nick: body.nickname, password: null };
        db.accounts.push(p);
        db.players.set(t, p);
        return json(201, { playerId: `p${n}`, token: t, nickname: body.nickname });
      }
      case 'POST /api/v1/players/me/password':
        if (!me) return json(401, { error: { code: 'unauthorized', message: '' } });
        me.password = body.password;
        return json(200, { hasPassword: true });
      case 'POST /api/v1/login': {
        const acc = db.accounts.find((p) => p.nick.toLowerCase() === String(body.nickname).toLowerCase() && p.password === body.password);
        if (!acc) return json(401, { error: { code: 'bad_login', message: '' } });
        const t = `tok-${++n}`;
        db.players.set(t, acc);
        return json(200, { playerId: 'p', token: t, nickname: acc.nick, hasPassword: true });
      }
      case 'POST /api/v1/logout':
        db.players.delete(token);
        return r.fulfill({ status: 204 });
      case 'GET /api/v1/saves':
        return json(200, db.saves);
      case 'POST /api/v1/achievements':
        for (const a of body.items) if (!db.achievements.some((x) => x.id === a.id)) db.achievements.push(a);
        return json(200, { added: 1 });
      case 'GET /api/v1/achievements/me':
        return json(200, db.achievements);
      case 'GET /api/v1/leaderboard/achievements':
        return json(200, [
          { nickname: 'Лиса_Дон', achievements: 9, games: 2, lastAt: '2026-11-21T10:00:00Z' },
          { nickname: 'Аня', achievements: db.achievements.length, games: 1, lastAt: '2026-11-21T11:00:00Z' },
        ]);
      case 'GET /api/v1/leaderboard':
        return json(200, []);
    }
    if (req.method() === 'PUT' && url.pathname.startsWith('/api/v1/saves/')) {
      db.saves[url.pathname.split('/').pop()!] = { ...body, updatedAt: '2026-11-21T12:00:00Z' };
      return json(200, { updatedAt: '2026-11-21T12:00:00Z' });
    }
    if (key === 'POST /api/v1/runs') return json(201, { runId: 1 });
    return json(404, { error: { code: 'not_found', message: '' } });
  };
  return { db, handle };
}

let errors: string[] = [];
test.beforeEach(({ page }) => {
  errors = [];
  page.on('console', (m) => m.type() === 'error' && !m.location().url.includes('/api/') && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
});
test.afterEach(() => expect(errors, 'console errors').toEqual([]));

const game = (page: Page) => page.frameLocator('[data-testid=game-frame]');

test('optional account: play with a nickname, protect it, log out, log in again and get the progress back', async ({ page }) => {
  const server = fakeServer();
  await page.route('**/api/**', server.handle);

  // 1. Play with a nickname only: no password needed.
  await page.goto('/start?game=mock');
  await page.getByLabel('Как тебя зовут в игре?').fill('Аня');
  await page.getByRole('button', { name: 'Дальше' }).click();
  await expect(game(page).locator('#state')).toHaveText('init получен');
  await game(page).locator('#save').click();
  await game(page).locator('#save').click();
  await game(page).locator('#achievement').click();
  await expect(page.getByTestId('save-status')).toHaveText('Сохранено', { timeout: 5000 });
  await expect.poll(() => server.db.achievements.length).toBe(1);

  // 2. The game select suggests protecting the progress; set a password.
  await page.getByTestId('back').click();
  await page.getByTestId('protect-nudge').getByRole('link', { name: 'Защитить' }).click();
  await expect(page).toHaveURL('/account');
  const protectForm = page.getByTestId('protect-form');
  await protectForm.getByLabel('Пароль', { exact: true }).fill('secret1');
  await protectForm.getByLabel('Ещё раз').fill('secret2');
  await protectForm.getByRole('button', { name: 'Защитить паролем' }).click();
  await expect(protectForm.getByRole('alert')).toHaveText('Пароли не совпадают.');
  await protectForm.getByLabel('Ещё раз').fill('secret1');
  await protectForm.getByRole('button', { name: 'Защитить паролем' }).click();
  await expect(page.getByTestId('account-on')).toContainText('Аня');

  // 3. Log out: this device forgets everything.
  await page.getByRole('button', { name: 'Выйти' }).click();
  await expect(page).toHaveURL('/');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('profnav-save')!).state.player)).toBeNull();

  // 4. Log in (wrong password first) and the progress comes back from the server.
  await page.goto('/account');
  await page.getByLabel('Ник').fill('аня');
  await page.getByLabel('Пароль').fill('wrong12');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByRole('alert')).toHaveText('Неверный ник или пароль.');
  await page.getByLabel('Пароль').fill('secret1');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page).toHaveURL('/games');
  await expect(page.getByTestId('player-chip')).toContainText('Аня');
  await expect(page.getByTestId('protect-nudge')).toHaveCount(0);

  await page.goto('/play/mock');
  const init = JSON.parse((await game(page).locator('#init').textContent()) ?? '{}');
  expect(init.save).toEqual({ v: 1, counter: 2, scene: 'mock-2' });
});

test('the achievements leaderboard shows top players and marks you', async ({ page }) => {
  const server = fakeServer();
  server.db.achievements.push({ gameId: 'glitch', id: 'gl_a' }, { gameId: 'glitch', id: 'gl_b' });
  await page.route('**/api/**', server.handle);
  await page.goto('/start');
  await page.getByLabel('Как тебя зовут в игре?').fill('Аня');
  await page.getByRole('button', { name: 'Дальше' }).click();
  await expect(page).toHaveURL('/games');
  const board = page.getByTestId('achievement-board');
  await expect(board.locator('tbody tr')).toHaveCount(2);
  await expect(board.locator('tbody tr').first()).toContainText('Лиса_Дон');
  await expect(board.locator('tr.is-me')).toContainText('Аня');
  await expect(board.locator('tr.is-me')).toContainText('2');
});

test('without the server, the leaderboard explains itself and the account page still works offline', async ({ page }) => {
  await page.route('**/api/**', (r) => r.abort('connectionrefused'));
  await page.goto('/');
  await expect(page.getByTestId('achievement-board')).toContainText('Таблица появится, когда сервер будет доступен');
  await page.goto('/account');
  await page.getByLabel('Ник').fill('Аня');
  await page.getByLabel('Пароль').fill('secret1');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByRole('alert')).toContainText('Сервер сейчас недоступен');
});
