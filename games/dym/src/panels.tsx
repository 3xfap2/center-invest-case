import type { ReactNode } from 'react'
import data from '../content/career.json'
import { calls } from './sim/content'
import { difficulty, endingNames, gear, mvp, reward, savings, type Difficulty, type Ending, type Gear } from './sim/campaign'
import { clock, Key, MapView, number, Patch, ShiftStrip } from './hud'
import type { Game } from './game'

const phaseLabels = { menu: 'ЗАРЕЧНЫЙ', briefing: 'ПЛАН ВЫЕЗДА', buy: 'СНАРЯЖЕНИЕ', choice: 'РЕШЕНИЕ', action: 'НА ВЫЗОВЕ', debrief: 'ИТОГ ВЫЗОВА', ending: 'СМЕНА ЗАВЕРШЕНА' }
const difficultyText = { easy: 'Больше воздуха, огонь распространяется медленнее.', normal: 'Обычный запас воздуха. Подсказки включены.', hard: 'Меньше воздуха, огонь быстрее. Без подсказок.' }

export function Header({ game }: { game: Game }) {
  return <header className="header">
    <div className="station-brand"><Patch /><div><b>ПОЖАРНАЯ ЧАСТЬ № 3</b><span>{phaseLabels[game.phase]}</span></div></div>
    <button className="quiet-button" type="button" aria-pressed={game.muted} onClick={() => game.setSound(!game.muted)}>
      <span aria-hidden="true" className={'audio-icon' + (game.muted ? ' muted' : '')}><i /><i /><i /><i /></span>
      {game.muted ? 'ЗВУК ВЫКЛ' : 'ЗВУК ВКЛ'}
    </button>
  </header>
}

export function MainMenu({ game }: { game: Game }) {
  return <main className="main-menu">
    <div className="hero-body">
      <div className="eyebrow"><span /> ПОЖАРНЫЙ-СПАСАТЕЛЬ</div>
      <h1>ДЫМ<span>.</span></h1>
      <h2>ПЕРВАЯ СМЕНА</h2>
      <p>Одна ночь в Заречном. Пять вызовов.<br />Твоя первая смена в пожарной части № 3.</p>
      <div className="menu-options">
        <label className="name-field"><span>ИМЯ В ЭФИРЕ</span><input aria-label="Имя в эфире" maxLength={24} value={game.nickname}
          onChange={e => { game.nickname = e.target.value; game.update() }} /></label>
        <div className="difficulty"><span>СЛОЖНОСТЬ</span><div className="difficulty-options" role="group" aria-label="Сложность">
          {(Object.keys(difficulty) as Difficulty[]).map(mode => <button type="button" key={mode} aria-pressed={mode === game.mode}
            onClick={() => { game.mode = mode; game.update() }}>{difficulty[mode].name}</button>)}
        </div></div>
      </div>
      <p className="difficulty-help">{difficultyText[game.mode]}</p>
      <div className="menu-actions">
        {game.saved && <button className="primary" onClick={() => game.start(true)}>
          {game.saved.results.length >= calls.length ? 'Посмотреть итоги' : 'Продолжить смену'} <span aria-hidden="true">↗</span>
        </button>}
        <button className={game.saved ? 'secondary' : 'primary'} disabled={game.worldError} onClick={() => game.start(false)}>
          {game.saved ? 'Новая смена' : 'Заступить на смену'} <span aria-hidden="true">↗</span>
        </button>
      </div>
      {game.worldError && <p role="alert">Для игры нужен настольный браузер с поддержкой WebGL 2.</p>}
    </div>
    <footer className="menu-footer">
      <div><Key>WASD</Key> движение <Key>Мышь</Key> обзор <Key>ЛКМ</Key> вода <Key>E</Key> действие</div>
      <div>НОЧНОЕ ДЕЖУРСТВО <b>22:14 / 05:00</b></div>
    </footer>
  </main>
}

function Panel({ tag, title, children, className = '', right }: { tag: string; title: string; children: ReactNode; className?: string; right?: ReactNode }) {
  return <main className={'panel ' + className}>
    <div className="panel-head"><div><div className="eyebrow"><span /> {tag}</div><h1>{title}</h1></div>{right}</div>
    {children}
  </main>
}

export function Briefing({ game }: { game: Game }) {
  const { call } = game
  return <Panel tag={'ВЫЗОВ ' + number(call.number) + ' / ' + number(calls.length) + ' · ' + call.time} title={call.name} className="briefing"
    right={<div className="countdown"><b>{clock(game.clock)}</b><span>ДО СНАРЯЖЕНИЯ</span></div>}>
    <div className="brief-grid">
      <div className="brief-info">
        <span className="site-label">{call.site}</span>
        <blockquote><span className="radio-ticks">▂▅▃▆</span>{call.radio}</blockquote>
        <div className="brief-task"><span className="tag">ЗАДАЧА</span><p>{call.task}</p></div>
        {difficulty[game.campaign.difficulty].hints && <p className="hint">{call.hint}</p>}
        <button className="primary" onClick={() => game.buy()}>К снаряжению <span aria-hidden="true">↗</span></button>
      </div>
      <div className="map-section"><div className="map-heading"><span>ПЛАН ОБЪЕКТА</span><b>↑ С</b></div>
        <MapView call={call} />
        <div className="map-legend"><span><i className="player" /> Старт</span><span><i className="fire" /> Огонь</span>
          <span><i className="victim" /> Люди</span><span><i className="goal" /> Задача</span></div>
      </div>
    </div>
    <ShiftStrip active={game.callIndex} />
  </Panel>
}

const gearIcons = { spray: '≋', air: '▯', thermal: '◎', axe: '⤓', fan: '✳', rescue: '✚' }
export function Buy({ game }: { game: Game }) {
  const loadout = game.equipment[game.selectedOwner]
  return <Panel tag={'ВЫЗОВ ' + number(game.call.number) + ' · ' + game.call.time} title="Снаряжение" className="buy"
    right={<div className="countdown"><b>{clock(game.clock)}</b><span>ДО ВЫЕЗДА</span></div>}>
    <div className="buy-toolbar">
      <div className="segmented" role="group" aria-label="Чьё снаряжение">
        <button aria-pressed={game.selectedOwner === 'you'} onClick={() => { game.selectedOwner = 'you'; game.update() }}>Ты</button>
        <button aria-pressed={game.selectedOwner === 'partner'} onClick={() => { game.selectedOwner = 'partner'; game.update() }}>Лёша</button>
      </div>
      <div className="fund"><span>БЮДЖЕТ ЧАСТИ</span><b>{game.budget} <small>ед.</small></b></div>
    </div>
    <div className="gear-grid">{(Object.keys(gear) as Gear[]).map(id => {
      const item = gear[id]
      const selected = loadout.includes(id)
      return <button key={id} className={'gear-card' + (selected ? ' selected' : '')} aria-pressed={selected}
        onClick={() => game.chooseGear(id)} disabled={!selected && game.budget < item.cost}>
        <span className="gear-icon" aria-hidden="true">{gearIcons[item.symbol]}</span><b>{item.name}</b>
        <small>{item.description}</small><span className="cost">{selected ? '✓ ВЗЯТО' : item.cost + ' ед.'}</span>
      </button>
    })}</div>
    <div className="panel-foot"><span>Штатный ствол с узкой струёй входит в комплект.</span>
      <button className="primary" onClick={() => game.launch()}>На вызов <span aria-hidden="true">↗</span></button>
    </div>
  </Panel>
}

export function Choice({ game }: { game: Game }) {
  return <Panel className="choice" tag="РЕШЕНИЕ · МАСТЕРСКАЯ" title="Второй рукав">
    <blockquote><span className="radio-ticks">▂▅▃▆</span>Лёша: Я вижу рабочего. Входим сейчас?</blockquote>
    <div className="choice-actions">
      <button className="choice-card" onClick={() => game.beginAction(true)}><strong>Дождаться второго рукава</strong><span>−11 сек. · звено в сборе</span></button>
      <button className="choice-card" onClick={() => game.beginAction(false)}><strong>Войти сейчас</strong><span>Выиграешь время · выше риск</span></button>
    </div>
  </Panel>
}

const reason = { complete: 'Задача выполнена', air: 'Воздух закончился', timer: 'Время вышло', withdraw: 'Вызов передан' }
export function Debrief({ game }: { game: Game }) {
  const r = game.campaign.results.at(-1)!
  const hero = mvp(r) === 'player' ? game.campaign.nickname : 'Лёша'
  return <Panel tag={'ИТОГ ВЫЗОВА ' + number(game.call.number)} title={reason[r.status]} className="debrief">
    <div className="debrief-grid">
      <div className="mvp"><Patch /><span>ОТЛИЧИЛСЯ НА ВЫЗОВЕ</span><strong>{hero}</strong>
        <small>{hero === 'Лёша' ? 'Прикрыл звено водой.' : r.saved ? 'Организовал эвакуацию.' : 'Завершил выезд в составе звена.'}</small></div>
      <div className="score-grid">
        <div><span>ЛЮДИ СПАСЕНЫ</span><strong>{r.saved}<small> / {r.total}</small></strong></div>
        <div><span>ИМУЩЕСТВО</span><strong>{r.property}<small>%</small></strong></div>
        <div><span>ДИСЦИПЛИНА ВОЗДУХА</span><strong>{r.air}<small>%</small></strong></div>
        <div><span>БЕЗОПАСНОСТЬ ЗВЕНА</span><strong>{r.safety}<small>%</small></strong></div>
      </div>
    </div>
    <div className="debrief-note">{r.saved < r.total && <p>Другой расчёт вывел оставшихся людей и передал медикам.</p>}
      <p>{game.call.after}</p></div>
    <div className="panel-foot"><div className="balance"><span>+{reward(r)} ед. за вызов</span><small>Бюджет части {game.campaign.budget} ед.</small></div>
      <button className="primary" onClick={() => game.next()}>{game.callIndex + 1 === calls.length ? 'Итоги смены' : 'Следующий вызов'} <span aria-hidden="true">↗</span></button>
    </div>
  </Panel>
}

const epilogue: Record<Ending, { verdict: string; sanya: string; partner: string }> = {
  good: { verdict: 'Саныч: Ты вывел людей и сберёг звено. Вот так и держим смену.',
    sanya: 'Вернул полное звено в часть.', partner: 'Теперь ждёт второй рукав вместе со всеми.' },
  steady: { verdict: 'Саныч: Город уже проснулся. Разберём выезды и снова будем готовы.',
    sanya: 'Собрал звено на утренний разбор.', partner: 'Помог эвакуации и пошёл разбирать снаряжение.' },
  backup: { verdict: 'Саныч: Подмога довела вызов до конца. На следующей смене отработаем выход.',
    sanya: 'Передал участок второму расчёту.', partner: 'Вернулся в часть и проверил дыхательные аппараты.' },
}

export function Finale({ game }: { game: Game }) {
  const e = epilogue[game.ending]
  const final = game.campaign.results.at(-1)
  const people = final && final.saved === final.total ? 'Миша и мама встретили рассвет в безопасности.' :
    'Миша и мама в безопасности. Тем, кто остался внутри, помог второй расчёт.'
  return <Panel tag="РАССВЕТ · ПОЖАРНАЯ ЧАСТЬ № 3" title={endingNames[game.ending]} className="ending"
    right={<div className="countdown"><b>{savings(game.campaign)}/{calls.reduce((sum, call) => sum + call.victims.length, 0)}</b><span>ЛЮДИ СПАСЕНЫ</span></div>}>
    <blockquote><span className="radio-ticks">▂▅▃▆</span>{e.verdict}</blockquote>
    <div className="epilogue">
      <div><b>Саныч</b><span>{e.sanya}</span></div><div><b>Лёша</b><span>{e.partner}</span></div>
      <div><b>Ирина</b><span>Закрыла пятый вызов и передала пост.</span></div><div><b>Миша и мама</b><span>{people}</span></div>
    </div>
    <div className="career">
      <div className="career-head"><Patch /><div><span className="tag">ПРОФЕССИЯ</span><h2>{data.title}</h2></div></div>
      <div className="career-grid"><div><b>На смене</b><p>{data.work}</p></div><div><b>Что важно уметь</b><p>{data.skills}</p></div>
        <div><b>Почему важен тип огня</b><p>{data.fire}</p></div><div><b>Где учиться в Ростовской области</b><p>{data.study}</p></div></div>
      <details><summary>Официальные источники</summary><ul>{data.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul></details>
      <p className="teen-safety">{data.safety}</p>
    </div>
    <div className="panel-foot"><span>Смена завершена</span><button className="secondary" onClick={() => game.exit()}>Выйти в меню <span aria-hidden="true">↗</span></button></div>
  </Panel>
}

export function Pause({ game }: { game: Game }) {
  return <div className="modal-shade"><section className="modal" aria-labelledby="pause-title" role="dialog" aria-modal="true">
    <div className="eyebrow"><span /> ПОЖАРНАЯ ЧАСТЬ № 3</div>
    {game.paused === 'gear' ? <>
      <h2 id="pause-title">Снаряжение</h2>
      {(['you','partner'] as const).map(owner => <div className="pack" key={owner}>
        <b>{owner === 'you' ? 'Ты' : 'Лёша'}</b><span>{game.equipment[owner].length
          ? game.equipment[owner].map(id => gear[id].name).join(' · ') : 'Штатный комплект'}</span>
      </div>)}
      <button className="primary" onClick={() => game.unpause()}>Продолжить</button>
    </> : <>
      <h2 id="pause-title">Пауза</h2>
      {game.worldError && <p>Потеряно подключение к WebGL. Перезагрузи страницу.</p>}
      <button className="primary" disabled={game.sitePaused || game.worldError} onClick={() => game.unpause()}>Продолжить</button>
      <button className="secondary" aria-pressed={game.muted} onClick={() => game.setSound(!game.muted)}>Звук</button>
      <button className="secondary" onClick={() => game.exit()}>Выйти в меню</button>
    </>}
  </section></div>
}

export function Capture({ game }: { game: Game }) {
  return <div className="modal-shade capture"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="capture-title">
    <div className="eyebrow"><span /> НА ВЫЗОВЕ</div><h2 id="capture-title">Кликни, чтобы начать</h2>
    <p><Key>WASD</Key> движение · <Key>ЛКМ</Key> вода · удерживай <Key>E</Key> для действия.</p>
    <button className="primary" onClick={() => game.world?.requestLock()}>Кликни, чтобы начать <span aria-hidden="true">↗</span></button>
    <button className="secondary" onClick={() => game.keyboard()}>Обзор стрелками</button>
    <small>Стрелки или удерживай ПКМ для обзора. Пробел подаёт воду.</small>
  </section></div>
}

export function DebugMenu({ game }: { game: Game }) {
  return <details className="debug-menu"><summary>Отладка</summary>
    <label><input type="checkbox" checked={game.infinite} onChange={event => {
      game.infinite = event.target.checked
      if (game.round && game.demo) game.round.infiniteAir = game.infinite
      game.update()
    }} /> Бесконечный воздух</label>
    <div>{calls.map((call, index) => <button key={call.id} onClick={() => game.debugStart(index)}>Вызов {call.number}</button>)}</div>
    <div>{(Object.keys(endingNames) as Ending[]).map(ending =>
      <button key={ending} onClick={() => game.debugEnding(ending)}>{endingNames[ending]}</button>)}</div>
  </details>
}
