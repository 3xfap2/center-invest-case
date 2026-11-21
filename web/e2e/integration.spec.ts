import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

// Task 3: every real game build in public/games/<id>/ must load inside the site,
// finish the bridge handshake (ready → init), and run without console errors.
// Games appear here after `npm run build` in games/<id>/; with no builds, this file has no tests.

const root = join(import.meta.dirname, '..', 'public', 'games');
const builds = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'mock' && existsSync(join(root, d.name, 'index.html')))
  .map((d) => d.name);

for (const id of builds) {
  test(`${id}: loads in the site, handshake works, no console errors`, async ({ page }) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error' && !m.location().url.includes('/api/')) errors.push(`${m.location().url}: ${m.text()}`);
    });
    page.on('pageerror', (e) => errors.push(e.message));
    await page.route('**/api/**', (r) => r.abort('connectionrefused'));

    await page.goto(`/start?game=${id}`);
    await page.getByLabel('Как тебя зовут в игре?').fill('Проверка');
    await page.getByRole('button', { name: 'Дальше' }).click();
    await expect(page).toHaveURL(`/play/${id}`);

    // "running" is set only after a valid `ready` with this game's id; init is sent at that moment.
    await expect(page.getByTestId('game-host')).toHaveAttribute('data-host-state', 'running', { timeout: 30_000 });

    // Let the game run a few seconds, then switch the tab away and back (pause / resume).
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
      for (const h of [true, false]) {
        Object.defineProperty(document, 'hidden', { value: h, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
      }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `test-results/integration-${id}.png` });

    expect(errors, 'console errors').toEqual([]);
  });
}
