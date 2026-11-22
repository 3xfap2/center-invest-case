import { expect, test } from '@playwright/test';


test('production game plays a slot inside the real iframe bridge and reaches every ending', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const empty = { nature: 0, tech: 0, people: 0, signs: 0, art: 0 };
  const save = {
    v: 1, difficulty: 'easy', seed: 42, day: 0, slot: 0, completed: 0, phase: 'watch',
    assignments: { liza: 'garden', artem: 'robots', kamila: 'club', timur: 'code', vera: 'studio' },
    points: 9, elapsed: 53.5, durationSec: 53.5, observations: [], talks: [], paths: {},
    ranked: null, ending: null, watched: empty, attention: empty, answers: [], earned: [],
  };
  await page.route('**/harness', route => route.fulfill({ contentType: 'text/html', body:
    '<!doctype html><meta charset="utf-8"><link rel="icon" href="data:,"><style>body{margin:0}iframe{width:100vw;height:100vh;border:0;display:block}</style>' +
    '<script>window.messages=[];addEventListener("message",e=>{if(e.origin!==location.origin||e.data.ns!==1)return;window.messages.push(e.data);' +
    'if(e.data.type==="ready")e.source.postMessage({ns:1,type:"init",nickname:"Юнга",difficulty:"easy",muted:true,save:' + JSON.stringify(save) + '},location.origin);});</script>' +
    '<iframe src="/?debug=1" title="Компас"></iframe>' }));
  await page.goto('/harness');
  const game = page.frameLocator('iframe');
  const messages = () => page.evaluate(() => (window as typeof window & { messages: Record<string, unknown>[] }).messages);
  const host = async (type: string) => page.evaluate(type => {
    document.querySelector('iframe')!.contentWindow!.postMessage({ ns: 1, type }, location.origin);
  }, type);
  await expect(game.getByRole('dialog', { name: 'Отладка' })).toBeVisible();
  await expect.poll(async () => (await messages()).some(e => e.type === 'ready' && e.gameId === 'kompas' && e.version === '0.1.1')).toBe(true);
  await expect(game.locator('canvas.terrain')).toBeVisible();
  await game.getByRole('button', { name: 'Закрыть' }).click();
  await game.getByTestId('teen-liza').click();
  await expect(game.getByRole('region', { name: 'Профиль участника' })).toContainText('95');
  await host('pause');
  await expect(game.getByRole('dialog', { name: 'Пауза' }).getByRole('button')).toHaveText(['Продолжить', 'Звук Выкл.', 'Выйти в меню']);
  const progress = game.getByRole('progressbar', { name: 'Ход мастерской' });
  await expect(progress).toHaveAttribute('max', '45');
  const elapsed = await progress.getAttribute('value');
  await page.waitForTimeout(700);
  expect(await progress.getAttribute('value')).toBe(elapsed);
  await host('resume');
  await expect(game.getByRole('button', { name: 'Следующее занятие' })).toBeVisible({ timeout: 16000 });
  await expect.poll(async () => (await messages()).some(e => e.type === 'progress' && e.step === 1)).toBe(true);
  await expect.poll(async () => (await messages()).some(e => {
    const data = e.data as { v?: number; phase?: string } | undefined;
    return e.type === 'save' && data?.v === 1 && data?.phase === 'review' && JSON.stringify(data).length < 32 * 1024;
  })).toBe(true);

  await game.getByRole('button', { name: 'Следующее занятие' }).click();
  await expect(game.getByRole('button', { name: 'Начать занятие' })).toHaveCount(0);
  await game.getByTestId('room-garden').click();
  const locationInfo = game.getByRole('region', { name: 'О локации' });
  await expect(locationInfo).toContainText('Здесь ухаживают за растениями');
  await expect(locationInfo).toContainText('Пересадить ростки');
  await expect(locationInfo).toContainText('Наблюдение за живой природой');
  await expect(locationInfo).toContainText('Наблюдение по шкале «Природа»');
  await game.getByRole('button', { name: 'Весь лагерь' }).click();
  await game.getByTestId('room-school').click();
  await expect(locationInfo).toContainText('школьным психологом');
  await expect(locationInfo).toContainText('Дневник наблюдений и доступ к занятиям');
  await game.getByRole('button', { name: 'Войти в школу' }).click();
  await game.getByRole('dialog', { name: 'Школа' }).getByRole('button', { name: 'Взять дневник' }).click();
  await expect(game.getByRole('button', { name: 'Начать занятие' })).toBeEnabled();
  await expect.poll(async () => (await messages()).some(e => e.type === 'save' &&
    (e.data as { schoolVisited?: boolean } | undefined)?.schoolVisited === true)).toBe(true);
  const liza = game.getByTestId('teen-liza');
  const studio = game.getByTestId('room-studio');
  await studio.hover();
  const from = (await liza.boundingBox())!;
  const target = (await studio.boundingBox())!;
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 9 });
  await page.mouse.up();
  await expect(liza).toContainText('Арт-студия');
  await page.screenshot({ path: 'test-results/camp.png' });

  const good = { good: 'Свои маршруты', mixed: 'Открытые двери', ranked: 'Места в таблице' };
  for (const [ending, name] of Object.entries(good)) {
    await game.getByRole('button', { name: 'Отладка', exact: true }).click();
    await game.getByTestId('ending-' + ending).click();
    const epilogue = game.getByRole('dialog', { name: 'Пять лет спустя' });
    await expect(epilogue.getByText(name)).toBeVisible();
    await expect(epilogue.locator('.memories article')).toHaveCount(5);
    await expect.poll(async () => (await messages()).some(e => e.type === 'end' && e.ending === ending)).toBe(true);
  }
  await game.getByRole('button', { name: 'А теперь ты' }).click();
  for (let i = 0; i < 8; i++) await game.locator('.picture-pair button').first().click();
  await expect(game.getByRole('dialog', { name: 'Твой компас' })).toBeVisible();
  await expect.poll(async () => (await messages()).some(e => e.type === 'flag' && e.key === 'km_top1')).toBe(true);
  await expect.poll(async () => (await messages()).some(e => e.type === 'flag' && e.key === 'km_top2')).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(game.getByRole('dialog', { name: 'Твой компас' })).toBeVisible();
  expect(errors).toEqual([]);
});
