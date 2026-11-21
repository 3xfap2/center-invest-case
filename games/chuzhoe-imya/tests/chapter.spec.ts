import { expect, test } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const origin = 'http://chuzhoe-imya.test'
const file = new URL('../../../web/public/games/chuzhoe-imya/index.html', import.meta.url)

test('first-person chapter, UTF-8 bridge, checkpoint restore and every ending', async ({ page }) => {
  const messages: { type: string; [key: string]: unknown }[] = []
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.exposeFunction('recordGameMessage', (data: typeof messages[number]) => messages.push(data))
  await page.route(origin + '/index.html?debug=1', route => route.fulfill({
    path: fileURLToPath(file), contentType: 'text/html; charset=utf-8',
  }))
  await page.route(origin + '/platform-test', route => route.fulfill({
    contentType: 'text/html; charset=utf-8',
    body: '<!doctype html><html lang="ru"><meta charset="utf-8"><style>body{margin:0}iframe{display:block;width:100vw;height:100vh;border:0}</style><script>' +
      'window.addEventListener("message", event => {' +
      'if (event.origin !== location.origin || event.data?.ns !== 1) return;' +
      'recordGameMessage(event.data);' +
      'if (event.data.type === "ready") event.source.postMessage({ ns: 1, type: "init", playerId: "demo", nickname: "Пилот", difficulty: "normal", save: null, flags: {}, muted: true }, location.origin);' +
      '});</script><iframe title="Игра" src="/index.html?debug=1"></iframe></html>',
  }))
  await page.goto(origin + '/platform-test')
  const game = page.frameLocator('iframe')
  const dialog = (name: string) => game.getByRole('dialog', { name, exact: true })
  const button = (name: string) => game.getByRole('button', { name, exact: true })
  const prompt = (name: string) => expect(game.locator('.fps-prompt')).toContainText(name)
  const approach = async (name: string) => {
    await page.keyboard.press('F3')
    await prompt(name)
    await page.keyboard.press('e')
  }

  await expect(game.getByRole('heading', { name: 'Три часа до оплаты' })).toBeVisible({ timeout: 5000 })
  await expect(game.getByText('Стажёр · Пилот', { exact: false })).toBeVisible()
  await expect.poll(() => messages.some(item => item.type === 'ready' && item.gameId === 'chuzhoe-imya')).toBe(true)
  await expect(game.locator('.fps-viewport canvas')).toBeVisible()
  await expect(game.locator('.fps-viewport canvas')).toHaveAttribute('data-characters', '5')
  if (process.env.CHUZHOE_SCREENSHOT) await page.screenshot({ path: process.env.CHUZHOE_SCREENSHOT })

  await button('Нажми, чтобы начать смену').click()
  await expect(game.locator('.fps-objective')).toContainText('Ответь на звонок Олега')
  await expect(game.getByLabel('Маршрут к текущей цели')).toBeVisible()
  await expect(game.locator('.fps-prompt')).toHaveCount(0)
  // The phone is outside raycast range at spawn. Actually walk to it before using E.
  await page.keyboard.down('w')
  try { await prompt('Взять трубку') } finally { await page.keyboard.up('w') }
  await prompt('Взять трубку')
  await page.keyboard.press('e')
  await expect(button('Повторить реплику')).toBeVisible()
  await button('Что произойдёт в 21:00?').click({ force: true })
  await button('Повесить трубку').click({ force: true })

  await approach('Сесть за терминал')
  await game.getByRole('button', { name: /Изучить перевод/ }).click({ force: true })
  await expect(game.getByText('Счёту пять дней', { exact: true })).toBeVisible()
  await button('Отойти от монитора').click({ force: true })
  await approach('Распечатать журнал')
  await expect(game.locator('.fps-objective')).toContainText('Забери журнал')
  // Aim at the printer from its approach position through the debug menu without replacing the checkpoint.
  await approach('Забрать страницы')

  await approach('Поговорить с Марией')
  await button('В журнале подтверждение появилось позже заявки').click({ force: true })
  await game.getByRole('region', { name: 'Разговор с Марией' }).getByRole('button', { name: 'Продолжить', exact: true }).click({ force: true })
  await approach('Открыть архив')
  await dialog('Архив').getByRole('button', { name: /1278/ }).click({ force: true })
  await expect(dialog('Архив').getByText('Цифры в этой папке отличаются от заявки.')).toBeVisible()
  await dialog('Архив').getByRole('button', { name: /7218/ }).click({ force: true })
  await button('Забрать договор').click({ force: true })

  await approach('Набрать Виктора')
  await button('В старом договоре счёт 3027. Вы его меняли?').click({ force: true })
  await button('Продолжить').click({ force: true })
  await approach('Посмотреть письмо Ирины')
  await button('Увеличить адрес').click({ force: true })
  await button('Буква x').click({ force: true })
  await button('Продолжить').click({ force: true })
  await approach('Подойти к доске улик')
  await expect(game.getByText('Шаг 1 из 3 · Разложи улики')).toBeVisible()
  await button('Прикрепить карточки').click({ force: true })
  await button('Подсказать пару').click({ force: true })
  await expect(game.getByLabel('Рекомендуемая пара')).toContainText('Ответ Виктора')
  // Click the actual meshes projected at row 2, columns 2 and 3.
  await page.mouse.click(561, 350)
  await page.mouse.click(879, 350)
  await expect(game.locator('.board-controls')).toContainText('1 / 4')
  await expect(game.getByRole('status')).toContainText('Противоречит')
  if (process.env.CHUZHOE_BOARD_SCREENSHOT) await page.screenshot({ path: process.env.CHUZHOE_BOARD_SCREENSHOT })
  await button('Дальше к терминалу').click({ force: true })

  await approach('Проверить ранний перевод')
  await game.getByRole('button', { name: /Изучить перевод/ }).click({ force: true })
  await expect(game.getByText('Счёт на имя Дани', { exact: true })).toBeVisible()
  await button('Отойти от монитора').click({ force: true })
  await approach('Поговорить с Даней')
  await button('Можем говорить вместе с мамой?').click({ force: true })
  await button('Продолжить').click({ force: true })

  await approach('Принять решения')
  const decisions = game.getByRole('region', { name: 'Терминал' })
  await decisions.getByRole('group', { name: 'Решение по операции А' }).getByRole('button', { name: 'Приостановить' }).click({ force: true })
  for (const label of ['Б', 'Г']) {
    await decisions.getByRole('group', { name: 'Решение по операции ' + label }).getByRole('button', { name: 'Провести' }).click({ force: true })
  }
  await decisions.getByRole('group', { name: 'Решение по операции В' }).getByRole('button', { name: 'Заблокировать' }).click({ force: true })
  await decisions.getByRole('radio', { name: 'Связаться с семьёй' }).check({ force: true })
  await decisions.getByRole('button', { name: /Открыть документы возврата/ }).click({ force: true })
  await button('Продолжить').click({ force: true })

  await approach('Представить отчёт')
  const report = game.getByRole('region', { name: 'Отчёт' })
  for (const [letter, evidence] of [
    ['А', ['Одна буква в адресе', 'Ответ Виктора']], ['Б', ['Прошлая оплата']],
    ['В', ['Счёт на имя Дани', 'Карта была у другого']], ['Г', ['Билеты волонтёра']],
  ] as const) {
    await report.locator('.queue-item').filter({ hasText: new RegExp('^' + letter) }).click({ force: true })
    for (const card of evidence) await report.locator('.evidence-options').getByRole('button', { name: new RegExp(card) }).click({ force: true })
  }
  await button('Представить отчёт').click({ force: true })
  await expect(report.getByText('Решение обосновано')).toBeVisible()
  await button('К итогам').click({ force: true })
  await expect(dialog('Итоги главы').getByRole('heading', { name: 'Чистая работа' })).toBeVisible()
  await expect(dialog('Итоги главы').getByRole('heading', { name: 'Специалист отдела антифрода' })).toBeVisible()
  await expect.poll(() => messages.filter(item => item.type === 'save').length).toBe(12)
  await expect.poll(() => messages.some(item => item.type === 'end' && item.ending === 'clean' && item.stars === 3)).toBe(true)
  expect(messages.filter(item => item.type === 'flag').map(item => item.key)).toEqual([
    'danya_protected', 'festival_held', 'blocked_honest', 'report_quality',
  ])
  expect(messages.some(item => item.type === 'achievement' && item.id === 'ci_ch1_clean')).toBe(true)
  expect(messages.filter(item => item.type === 'save').every(item => (item.data as { v: number }).v === 1
    && Buffer.byteLength(JSON.stringify(item.data)) <= 65536)).toBe(true)

  await button('Дальше к лифту').click({ force: true })
  await expect(game.getByLabel('Маршрут к текущей цели')).toContainText('Лифт у ресепшена')
  await approach('Войти в лифт')
  await button('Спуститься на этаж −1').click({ force: true })
  await button('Выйти из лифта').click({ force: true })
  await expect(game.getByText('АРХИВ · ЭТАЖ −1')).toBeVisible()
  await approach('Открыть архивный шкаф')
  await button('Папка № 041 · оплата аренды').click({ force: true })
  await expect(game.getByRole('status')).toContainText('Проверь номер дела')
  await button('Папка № 014 · оборудование фестиваля').click({ force: true })
  await approach('Включить запись разговора')
  await button('Сверить личность по номеру из договора').click({ force: true })
  await approach('Сверить два перевода')
  await button('Проверить перевод на •• 8041').click({ force: true })
  await approach('Составить передачу дела')
  await button('Проверить •• 8041, приложив договор и подтверждение поставщика').click({ force: true })
  await expect(dialog('Дело передано')).toBeVisible()
  await expect.poll(() => messages.some(item => item.type === 'flag' && item.key === 'archive_completed')).toBe(true)
  await dialog('Дело передано').getByRole('button', { name: 'Закрыть' }).click({ force: true })

  for (const [id, label] of [
    ['overblock', 'Перестраховка'], ['lost', 'Деньги ушли'], ['blame', 'Чужая вина'], ['clean', 'Чистая работа'],
  ]) {
    await page.keyboard.press('F2')
    await dialog('Режим демонстрации').getByRole('button', { name: label, exact: true }).click({ force: true })
    await expect(dialog('Итоги главы').getByRole('heading', { name: label, exact: true })).toBeVisible()
    await expect.poll(() => messages.filter(item => item.type === 'end').at(-1)?.ending).toBe(id)
  }

  const checkpoint = messages.find(item => item.type === 'save' && (item.data as { step: number }).step === 8)?.data
  await page.evaluate(save => {
    document.querySelector('iframe')!.contentWindow!.postMessage({ ns: 1, type: 'init', nickname: 'Пилот', difficulty: 'normal', save, muted: true }, location.origin)
  }, checkpoint)
  await expect(game.locator('.fps-objective')).toContainText('Найди ранний перевод')
  await page.evaluate(() => {
    document.querySelector('iframe')!.contentWindow!.postMessage({ ns: 1, type: 'pause' }, location.origin)
  })
  await expect(dialog('Пауза').getByRole('button')).toHaveCount(3)
  await page.evaluate(() => {
    document.querySelector('iframe')!.contentWindow!.postMessage({ ns: 1, type: 'resume' }, location.origin)
  })
  await expect(dialog('Пауза')).toHaveCount(0)

  await page.goto(file.href)
  await expect(page.getByRole('button', { name: 'Нажми, чтобы начать смену' })).toBeEnabled()
  await page.setViewportSize({ width: 1280, height: 720 })
  await expect(page.locator('.fps-viewport canvas')).toBeVisible()
  expect(errors).toEqual([])
})
