import { expect, test } from '@playwright/test'
const endingNames = { good: 'Вместе до рассвета', steady: 'Город просыпается', backup: 'Подмога на рассвете' }

test('мост, снаряжение, помощь Лёши, пауза, сохранение, пять вызовов и три финала', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  page.on('console', e => { if (e.type() === 'error') errors.push(e.text()) })
  await page.route('**/harness', route => route.fulfill({
    contentType: 'text/html; charset=utf-8',
    body: `<!doctype html><html><head><title>Test host</title></head>
      <body style="margin:0">
      <iframe title="Дым" src="/?debug=1" style="display:block;border:0;width:100vw;height:100vh"></iframe>
      <script>
      window.received = [];
      let save = JSON.parse(sessionStorage.getItem('chapter') || 'null');
      window.addEventListener('message', e => {
        if (e.origin !== location.origin || e.data?.ns !== 1) return;
        window.received.push(e.data);
        if(e.data.type === 'save') { save = e.data.data; sessionStorage.setItem('chapter', JSON.stringify(save)); }
        if(e.data.type === 'ready') e.source.postMessage({ns:1,type:'init',nickname:'Искра',difficulty:'normal',save,muted:true},location.origin);
      });
      window.sendGame = (type) => document.querySelector('iframe').contentWindow.postMessage({ns:1,type},location.origin);
      </script></body></html>`,
  }))
  await page.addInitScript(() => {
    if (window === window.top) return
    let attempts = 0
    Object.defineProperty(window, 'pointerAttempts', { get: () => attempts })
    HTMLCanvasElement.prototype.requestPointerLock = () => {
      attempts++
      return Promise.reject(new DOMException('Mouse capture refused by test', 'NotAllowedError'))
    }
  })
  await page.goto('/harness')
  const frame = page.frameLocator('iframe')
  const messages = () => page.evaluate(() => (window as unknown as { received: Record<string, unknown>[] }).received)
  await expect(frame.getByRole('button', { name: 'Заступить на смену' })).toBeVisible()
  await expect(frame.getByRole('textbox', { name: 'Имя в эфире' })).toHaveValue('Искра')
  await expect.poll(async () => (await messages()).find(message => message.type === 'ready')).toMatchObject({
    type: 'ready', gameId: 'dym', version: '0.1.0',
  })
  await frame.getByRole('button', { name: 'Заступить на смену' }).click()
  await expect(frame.getByRole('heading', { name: 'Свет на втором' })).toBeVisible()
  await frame.getByRole('button', { name: 'К снаряжению' }).click()
  await frame.getByRole('button', { name: /Запасной баллон/ }).click()
  await expect(frame.getByRole('button', { name: /Запасной баллон/ })).toHaveAttribute('aria-pressed', 'true')
  await frame.getByRole('button', { name: /Распылитель/ }).click()
  await frame.getByRole('button', { name: 'Лёша', exact: true }).click()
  await frame.getByRole('button', { name: /Инструмент взлома/ }).click()
  await frame.getByRole('button', { name: 'На вызов' }).click()
  const time = frame.getByTestId('round-time')
  const capture = frame.getByRole('button', { name: 'Кликни, чтобы начать' })
  await expect(capture).toBeVisible()
  await capture.click()
  await expect.poll(() => frame.locator('body').evaluate(() =>
    (window as unknown as { pointerAttempts: number }).pointerAttempts)).toBeGreaterThanOrEqual(2)
  await expect(time).toHaveText('2:30')
  await frame.getByRole('button', { name: 'Обзор стрелками' }).click()
  await expect(time).not.toHaveText('2:30')
  await page.keyboard.press('b')
  const fieldGear = frame.getByRole('dialog', { name: 'Снаряжение' })
  await expect(fieldGear.getByText('Комплект Лёши')).toBeVisible()
  await fieldGear.getByRole('button', { name: 'Включить', exact: true }).click()
  await expect(fieldGear.getByRole('button', { name: 'Узкая струя', exact: true })).toBeVisible()
  await fieldGear.getByRole('button', { name: 'Продолжить' }).click()
  await frame.getByRole('button', { name: 'Обзор стрелками' }).click()
  await expect(frame.getByTestId('field')).toContainText('Распылитель')
  await page.keyboard.press('q')
  await expect(frame.getByTestId('field')).toContainText('Узкая струя')
  const door = frame.getByText('Открыть дверь', { exact: true })
  await page.keyboard.down('w')
  try { await expect(door).toBeVisible() } finally { await page.keyboard.up('w') }
  await expect(frame.getByText('Поручить Лёше')).toBeVisible()
  await page.keyboard.press('4')
  await expect(door).toBeHidden()
  await expect(frame.locator('.safe-flag')).toBeVisible()
  await page.evaluate(() => (window as unknown as { sendGame: (s: string) => void }).sendGame('pause'))
  const pause = frame.getByRole('dialog', { name: 'Пауза' })
  await expect(pause).toBeVisible()
  await expect(pause.getByRole('button')).toHaveText(['Продолжить', 'Звук', 'Выйти в меню'])
  await expect(pause.getByRole('button', { name: 'Продолжить' })).toBeDisabled()
  const stopped = await time.textContent()
  await page.waitForTimeout(1200)
  await expect(time).toHaveText(stopped!)
  await page.evaluate(() => (window as unknown as { sendGame: (s: string) => void }).sendGame('resume'))
  await pause.getByRole('button', { name: 'Продолжить' }).click()
  await frame.getByRole('button', { name: 'Обзор стрелками' }).click()
  await page.keyboard.press('x')
  await expect(frame.getByRole('heading', { name: 'Вызов передан' })).toBeVisible()
  await expect.poll(async () => (await messages()).find(message => message.type === 'save')).toMatchObject({
    type: 'save', data: { v: 1, nickname: 'Искра', results: [{ status: 'withdraw', saved: 0 }] },
  })
  await frame.getByRole('button', { name: 'Следующий вызов' }).click()
  await expect(frame.getByRole('heading', { name: 'На горячей линии' })).toBeVisible()
  await page.reload()
  await expect(frame.getByRole('heading', { name: 'ДЫМ.' })).toBeVisible()
  await frame.getByRole('button', { name: 'Продолжить смену' }).click()
  await expect(frame.getByRole('heading', { name: 'На горячей линии' })).toBeVisible()
  await frame.getByText('Отладка', { exact: true }).click()
  await frame.getByRole('checkbox', { name: 'Бесконечный воздух' }).check()
  for (const [index, name] of ['Свет на втором', 'На горячей линии', 'Пауза в эфире', 'За дальней дверью', 'До первого света'].entries()) {
    await frame.getByRole('button', { name: 'Вызов ' + (index + 1), exact: true }).click()
    await expect(frame.getByTestId('field')).toContainText(name)
  }
  for (const name of Object.values(endingNames)) {
    await frame.getByRole('button', { name, exact: true }).click()
    await expect(frame.getByRole('heading', { name, exact: true })).toBeVisible()
    await expect(frame.getByRole('heading', { name: 'Пожарный-спасатель' })).toBeVisible()
  }
  await page.setViewportSize({ width: 1450, height: 850 })
  await expect(frame.getByRole('heading', { name: endingNames.backup })).toBeVisible()
  await page.evaluate(() => {
    const saved = JSON.parse(sessionStorage.getItem('chapter')!)
    saved.results = Array.from({ length: 4 }, () => saved.results[0])
    saved.waited = saved.checked = false
    sessionStorage.setItem('chapter', JSON.stringify(saved))
  })
  await page.reload()
  await frame.getByRole('button', { name: 'Продолжить смену' }).click()
  await expect(frame.getByRole('heading', { name: 'До первого света' })).toBeVisible()
  await frame.getByRole('button', { name: 'К снаряжению' }).click()
  await frame.getByRole('button', { name: 'На вызов' }).click()
  await frame.getByRole('button', { name: 'Обзор стрелками' }).click()
  await page.keyboard.press('x')
  await expect(frame.getByRole('heading', { name: 'Вызов передан' })).toBeVisible()
  await expect.poll(async () => (await messages()).filter(message => message.type === 'end')).toMatchObject([{
    type: 'end', ending: 'backup', stars: 1,
    choices: { dm_waited_for_hose: false, dm_checked_back_room: false, dm_people_saved: 0 },
  }])
  await frame.getByRole('button', { name: 'Итоги смены' }).click()
  await expect(frame.getByRole('heading', { name: endingNames.backup })).toBeVisible()
  await expect(frame.getByText(/позвони 101 или 112/)).toBeVisible()
  expect(errors).toEqual([])
})
