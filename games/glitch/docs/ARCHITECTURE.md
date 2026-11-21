# Архитектура и контракт между частями

Стек: Vite 8 + Three.js 0.187, чистый JavaScript (ES-модули), без фреймворков. Запуск: `npm run dev`.
Сюжет: `docs/STORY_BIBLE.md`. Сценарий главы: `docs/CHAPTER1_SPEC.md`. Тексты в игре по-русски, **без длинных тире «—»** (используйте точку, запятую, двоеточие).

## Владельцы файлов
| Файлы | Кто пишет |
|---|---|
| `src/core/*`, `src/main.js`, `src/game/*`, `src/ui/ui.css`, `src/ui/hud.js`, `src/ui/dialogue.js`, `src/ui/screens.js`, `src/content/actions.js`, `src/content/reports.js`, `src/content/docs.js`, `src/content/dialogues.js` | ведущий (основная сессия) |
| `src/world/characters.js`, `src/world/office.js`, `src/world/station.js` | агент «Мир» |
| `src/ui/tablet.js`, `src/ui/tablet.css` | агент «Планшет» |

Чужие файлы не менять. Если нужен общий помощник, положите его в свой файл. `src/world/build.js` (помощники и палитра `PAL`) можно только читать.

## Общие модули (уже есть)
- `core/events.js`: `bus.on(evt, fn)` (возвращает отписку), `bus.emit(evt, data)`.
- `core/state.js`: `game.state` (имя, сложность, flags, log, reports, evidence, chat), `diff()`, `flag(k)`, `setFlag(k)`, `logAction(id)`, `addEvidence(id)`, `pushChat(from, text)`, `save()`.
  События шины: `'log'` (запись), `'chat'` (сообщение), `'flag'`, `'evidence'`, `'reports'` (изменился список отчётов).
- `core/input.js`: `isTouch`, `input.enabled`.
- `core/audio.js`: `sfx.click()`, `sfx.ui()`, `sfx.message()` и т.д.
- `world/build.js`: `mat`, `uniqueMat`, `box(w,h,d,color,x,y,z)` (y = низ коробки), `cyl`, `sphere`, `collider(x,z,w,d)`, `colliderOf(mesh)`, `textPlane(text, opts)`, палитра `PAL`.

## Мир (агент «Мир»)

Требования ко всем сценам:
- Чистый low-poly: примитивы, `flatShading`, плоские цвета из `PAL`, без текстур (кроме табличек `textPlane`).
- Производительность телефона: без теней, не больше 4 точечных источников света на сцену плюс `HemisphereLight` и один `DirectionalLight`. Не больше ~600 мешей. Туман `THREE.Fog`.
- Единицы: метры. Пол на y = 0. Рост персонажей около 1.7. Глаза игрока на 1.6.
- Игрок сталкивается только с прямоугольниками XZ из `colliders` (стены, мебель). Проходы шире 1.0 м.
- Вперёд для игрока при yaw = 0 это направление −Z. yaw растёт против часовой стрелки (поворот налево).

### `src/world/characters.js`
```js
export function createCharacter({ name, shirt, pants, hair, skin, extra }) // -> THREE.Group, стоит на y=0, смотрит в +Z
// extra: 'irina' (пучок волос, очки), 'timur' (наушники на шее, худи), 'lis' (рабочая куртка, оранжевая эмблема лиса на рукаве, фонарь в руке не нужен)
// group.userData.head: голова (для поворота к игроку)
export function animateCharacter(group, t) // лёгкое дыхание и покачивание головы
export function faceTowards(group, x, z, dt) // плавно повернуть персонажа к точке
```

### `src/world/office.js`
```js
export function createOffice() -> {
  scene,              // THREE.Scene с фоном, туманом, светом
  colliders,          // [{minX,maxX,minZ,maxZ}]
  slots,              // [{id, object}]: 'irina', 'timur', 'pc', 'whiteboard', 'coffee'
  spawn,              // {x, z, yaw} у входной двери, лицом в офис
  points: { pcView }, // {x, z, yaw}: где стоит игрок, глядя в экран ПК
  objects: { irina, timur, pcScreen }, // pcScreen: меш экрана с уникальным материалом
  update(dt, t, playerPos) // анимации, персонажи поворачиваются к игроку, если он ближе 3 м
}
```
Офис около 10×8 м, ночь. Окна с огнями города, доска с надписью «РЕЛИЗ ЗАВТРА / Сборка 0.9.7», три стола: стол Ирины (она стоит рядом), стол Тимура (два монитора, он стоит рядом), стол игрока с ПК. На мониторе игрока жёлтый стикер «Н.О. AT не выключать» (`textPlane`). Кофемашина. Входная дверь у точки появления.

### `src/world/station.js`
```js
export function createStation() -> {
  scene, colliders,
  slots,   // ids: 'lis', 'lantern', 'hook', 'journal', 'archive_door', 'service_door', 'clock', 'bench', 'terminal', 'chalk_wall'
  spawn,   // {x, z, yaw}: вход в зал, лицом к будке Лиса
  zones: { archive: {minX,maxX,minZ,maxZ} }, // внутренность архива
  points: { terminalView, lisTalk },         // {x,z,yaw}
  cams: { counter, hook, archiveDoor, archiveInside, serviceDoor, wide }, // {pos:[x,y,z], look:[x,y,z]} для повтора-катсцены
  api: {
    resetState(),               // журнал на стойке, фонарь на крюке, дверь архива закрыта, мел скрыт
    setLanternOnHook(bool),     // фонарь висит на крюке или нет
    setJournalVisible(bool, { glitch } = {}), // glitch: true: исчезает с мерцанием за ~0.6 с
    openArchiveDoor(), closeArchiveDoor(), isArchiveOpen(),
    openServiceDoor(),          // приоткрывается на ~25°, из щели холодный голубоватый свет. Коллайдер двери остаётся
    setChalkVisible(bool),      // надпись мелом на стене архива (плавное появление)
    makeHandLantern(),          // -> THREE.Group: фонарь в руке + PointLight (тёплый, distance ~6). Сценарий крепит к камере
  },
  objects: { lis, journal, lantern, archiveDoor, serviceDoor, terminal, clock },
  update(dt, t, playerPos)      // часы идут НАЗАД, скамейка висит ~1 м и медленно вращается, лампы слегка мерцают, Лис поворачивается к игроку
}
```
Планировка станции (примерно 26×16 м, можно менять):
- Север: платформа с жёлтой линией края и путями ниже (рельсы, шпалы). Дальше тёмное небо. Невидимая стена по краю платформы.
- Центр: зал ожидания: скамейки (одна из них баговая, висит и вращается), большие круглые часы на стене, 2–3 подвесные лампы.
- Будка смотрителя: стойка, на ней красная книга (журнал путешественников). Рядом крюк с фонарём. Лис стоит за или возле стойки. Табличка «Смотритель».
- Запад: архив, комната около 4×4 м с дверью (распашная, открывается поворотом). Внутри полки с коробками, **без своего света** (темно, освещает только фонарь игрока). Дальняя стена: место для надписи мелом «н.о. 0.9.3\nжурнал тут был» (белый текст на прозрачном фоне), по умолчанию скрыта.
- Восток: служебный выход, нарисованная декоративная дверь с табличкой «Служебный выход». Терминал дежурного (стойка с экраном, зелёный текст «ТЕРМИНАЛ ДЕЖУРНОГО») стоит в ~3 м от служебного выхода, **экраном от двери**: игрок у терминала стоит к двери спиной.
- Табличка «Станция Рассвет» над залом.

## Планшет (агент «Планшет»)

### `src/ui/tablet.js`
```js
export function createTablet(root, callbacks) -> {
  open(tab?),       // tab: 'log' | 'tracker' | 'docs' | 'chat'
  close(), isOpen(),
  openTerminal(),   // режим «Терминал дежурного»: сохранение доказательств
  openReport(id),   // открыть карточку отчёта в трекере
  refresh(),
}
```
При открытии `bus.emit('tablet:open')`, при закрытии `bus.emit('tablet:close')`. Закрытие: крестик, Tab, Esc (слушать `bus.on('input:tablet')` и `bus.on('input:pause')`).
Перерисовка по событиям `'log'`, `'chat'`, `'flag'`, `'evidence'`, `'reports'`.

`callbacks` (реализует сценарий, все могут быть async):
- `onReplay(ids: string[])`: игрок выбрал действия из журнала (в хронологическом порядке) и нажал «Воспроизвести выбранное». Планшет закрывается, сценарий показывает повтор.
- `onSubmitReport(draft)` -> `{ status: 'accepted'|'returned'|'rejected', message }`. Показать результат в форме.
- `onDocCheck(sectionId)`: игрок отметил раздел документации «Проверено: не баг».
- `onHint()` -> `string | null`: кнопка «Спросить Ирину». Показывать, только если `callbacks.canHint()` вернул true.
- `onCompare(reportId)`: кнопка «Сравнить с моим» в карточке чужого отчёта.
- `onPlayRecording(reportId)`: кнопка «Воспроизвести запись».
- `onSaveEvidence(ids: string[])`: в режиме терминала.
- `getReplayResult()` -> `{ steps: string[], ok: boolean } | null`: последний успешный повтор (для формы отчёта).

Вкладки:
1. **Журнал действий**: `game.state.log`, старые сверху, новые снизу, время ЧЧ:ММ:СС. У каждой записи галочка. Записи с `foreign: true` выделены (глитч-стиль: розово-голубой сдвиг, моргание), их нельзя отмечать. Кнопки «Воспроизвести выбранное» (неактивна, пока ничего не выбрано) и «Снять выбор».
2. **Трекер**: список `game.state.reports` (номер, заголовок, статус цветной меткой). Кнопка «Новый отчёт». Карточка отчёта показывает все поля, статус, `closedBy`, комментарии, вложения. Если `report.foreign` (чужой отчёт), кнопки «Сравнить с моим» и «Воспроизвести запись». Если у отчёта есть `compare` (после сравнения), показать две колонки «Отчёт #0412» и «Твой отчёт» с подсветкой совпадающих строк (шаги и профиль).
   Форма «Новый отчёт» по `src/content/reports.js`: выбор объекта (`REPORT_SUBJECTS`), затем «Шаги воспроизведения» (если `getReplayResult()` есть и ok, кнопка «Подставить шаги из повтора», иначе выбор действий из журнала), «Ожидаемый результат» и «Фактический результат» (варианты объекта), «Серьёзность» (`SEVERITY`), галочка «Приложить запись повтора» (активна, если повтор успешен). Кнопка «Отправить». Результат `onSubmitReport` показать в форме: зелёный, жёлтый (вернули на доработку, форма остаётся заполненной) или серый (отклонён).
3. **Документация**: разделы из `src/content/docs.js`. У разделов с `checkable: true` кнопка «Проверено: не баг» (после нажатия метка «Проверено»).
4. **Чат**: `game.state.chat`, сообщения с аватаром-буквой и именем (`from`: 'irina' Ирина Белова, 'timur' Тимур Сафин, 'system' Система). Счётчик непрочитанных на вкладке. Внизу кнопка «Спросить Ирину» (если `canHint()`), ответ появляется сообщением в чате (его добавляет сценарий через `pushChat`).

Шапка: «Профиль: tester_02 · {имя} · Сборка 0.9.7» и счётчик улик «Улики: N/4».
Режим терминала: тёмно-зелёный экран, заголовок «ТЕРМИНАЛ ДЕЖУРНОГО. Архив сборки», список доступных доказательств с галочками (`EVIDENCE_ITEMS` из `src/content/reports.js`, показывать только те, что есть в `game.state.evidence` или помечены `alwaysAvailable`), кнопка «Сохранить в архив сборки».

Стиль: рабочий инструмент тестировщика, тёмная тема, но **не** «ИИшный»: никаких неоновых градиентов и стекла. Ориентир: Jira или Linear в тёмной теме, плотная типографика, системный шрифт, моноширинный только для журнала и номеров. На телефоне планшет занимает весь экран, кнопки от 44 px, вкладки внизу или сверху крупно.

### Модель отчёта (`game.state.reports[]`)
```js
{
  id: '0418',               // строка
  title: 'Журнал путешественников исчезает со стойки',
  subject: 'journal',
  steps: ['take_lantern','enter_archive','exit_archive'], // id из ACTION_TEXT
  expected: 'journal_stays', actual: 'journal_vanishes', severity: 'high', // id вариантов
  attachment: true,         // приложена запись
  status: 'open'|'accepted'|'returned'|'rejected'|'closed_cnr', // closed_cnr = «Закрыт: не воспроизводится»
  author: 'tester_02 ({имя})' | 'n.orlov',
  profile: 'tester_02',
  date: 'сегодня' | '24.10',
  closedBy: 'qa-lead' | null,
  comments: [{ from: 'n.orlov', text: '...' }],
  foreign: false,           // чужой отчёт
  compare: null | { matchSteps: true, matchProfile: true },
}
```
