import type { ReactNode } from 'react'
import { calls, type Call } from './sim/content'
import { clamp } from './sim/fire'
import type { Round } from './sim'
import type { Game } from './game'

export const clock = (time: number) => {
  const s = Math.max(0, Math.ceil(time))
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}
export const number = (x: number) => String(x).padStart(2, '0')

export function Patch() {
  return <span className="patch" aria-hidden="true"><span className="patch-flame" /></span>
}
export function Key({ children }: { children: ReactNode }) { return <kbd>{children}</kbd> }

export function MapView({ call, round, compact = false }: { call: Call; round?: Round; compact?: boolean }) {
  const cell = compact ? 5 : 13
  const width = call.map[0].length
  const keys = !round || round.hints
  const fired = new Set(call.fires.map(f => f.at.join(',')))
  const rescued = new Set(call.victims.map(v => v.at.join(',')))
  const objectives = new Set(call.objectives.map(o => o.at.join(',')))
  const values = call.map.flatMap((line, y) => Array.from(line, (tile, x) => {
    const index = y * width + x
    const pos = x + ',' + y
    if (round && Math.floor(round.player.x) === x && Math.floor(round.player.z) === y) return 'player'
    if (!round && pos === call.spawn.join(',')) return 'player'
    if (round && keys && Math.floor(round.partner.x) === x && Math.floor(round.partner.z) === y) return 'partner'
    if ((!round && fired.has(pos)) || (round && keys && round.fire.burning(index))) return 'fire'
    if ((!round && rescued.has(pos)) || (round && keys && round.victims.some(v => v.state === 'waiting' && round.cell(v.pos) === index))) return 'victim'
    if ((!round && objectives.has(pos)) || (round && keys && round.objectives.some(o => !o.done && round.cell(o.pos) === index))) return 'goal'
    if (tile === 'D' && round?.fire.doors.has(index)) return 'floor'
    return ({ '#': 'wall', '.': 'floor', D: 'door', s: 'safe' })[tile]
  }))
  return <div className={compact ? 'map compact' : 'map'} aria-label="План здания" role="img"
    style={{ gridTemplateColumns: 'repeat(' + width + ', ' + cell + 'px)', gridAutoRows: cell }}>
    {values.map((value, i) => <span key={i} className={'tile ' + value} />)}
  </div>
}

export function ShiftStrip({ active }: { active: number }) {
  return <div className="shift-strip" aria-label="Хронология смены">{calls.map((call, index) =>
    <div key={call.id} className={index === active ? 'current' : index < active ? 'past' : ''}>
      <b>{call.time}</b><span>{['Квартира','Кафе','Мастерская','Кладовая','Склад'][index] ?? call.name}</span>
    </div>)}</div>
}

function Gauge({ title, value, warning, water }: { title: string; value: number; warning?: boolean; water?: boolean }) {
  const percent = Math.ceil(clamp(value) * 100)
  return <div className={'gauge ' + (warning ? 'warning' : water ? 'water' : '')}>
    <div><span>{title}</span><b>{percent}<small>%</small></b></div>
    <div className="bar" role="progressbar" aria-label={title} aria-valuenow={percent}>
      <span style={{ width: percent + '%' }} />
    </div>
  </div>
}

export function FieldHUD({ game }: { game: Game }) {
  const r = game.round!
  const air = r.air / r.maxAir
  const fires = r.fire.count()
  const distance = Math.hypot(r.player.x - r.partner.x, r.player.z - r.partner.z)
  return <>
    <div className={'mask' + (r.thermal ? ' thermal' : '')}>
      <div className="danger-glow" style={{ opacity: clamp(r.heat * .62 + r.fire.lastFlare * .18 + (air < .28 ? .36 : 0), 0, .78) }} />
    </div>
    <div className="field-hud" data-testid="field">
      <div className="field-head">
        <div><span>ВЫЗОВ {number(r.call.number)} / {number(calls.length)}</span><b>{r.call.name}</b></div>
        <div className={r.remaining < 30 ? 'time urgent' : 'time'} aria-label="Время вызова" data-testid="round-time">{clock(r.remaining)}</div>
        <div className="field-map"><MapView call={r.call} round={r} compact /><span>ЗАРЕЧНЫЙ · {r.call.time}</span></div>
      </div>
      <div className="mission">
        <span className="tag">ЗАДАЧА</span>
        <b>{r.completeOutside ? 'Вернись к выходу' : r.call.task}</b>
        <div className="objectives">
          <span className={r.saved === r.victims.length ? 'done' : ''}>+ {r.saved}/{r.victims.length} спасено</span>
          <span className={fires === 0 ? 'done' : ''}>◆ {fires} очаг.</span>
          {r.objectives.filter(o => o.required).map(o => <span key={o.id} className={o.done ? 'done' : ''}>{o.done ? '✓ ' : '◦ '}{o.label}</span>)}
        </div>
      </div>
      <div className="reticle" aria-hidden="true"><i /><i /><i /><i /><b /></div>
      {(r.target || r.carrying) && <div className="action-label" role="status">
        <div>{r.target ? <><Key>E</Key><strong>{r.target.label}</strong></> : <strong>+ {r.carrying?.name} · к выходу</strong>}</div>
        {!!r.target && <div className="hold-bar"><span style={{ width: Math.round(r.hold * 100) + '%' }} /></div>}
        {r.target?.danger && r.hints && <small>Горячая дверь · возможна вспышка</small>}
      </div>}
      {r.noticeClock > 0 && <div className="radio-caption" key={r.notice}><span className="radio-ticks">▂▅▃▆</span><span>{r.notice}</span></div>}
      <div className="field-bottom">
        <div className="reserves">
          <Gauge title="ВОЗДУХ" value={air} warning={air < .28} />
          <Gauge title="ВОДА" value={r.water / r.maxWater} water />
          {r.safe() && <span className="safe-flag">● БЕЗОПАСНАЯ ЗОНА · ПОПОЛНЕНИЕ</span>}
        </div>
        <div className={'partner-status' + (distance > 4.9 ? ' far' : '')}>
          <span className="partner-icon">◇</span><div><b>Лёша</b><small>{distance > 4.9 ? 'Слишком далеко' : ({ follow: 'За тобой', hold: 'Держит позицию', cover: 'Прикрывает' })[r.command]}</small></div>
        </div>
        <div className="field-keys"><div><Key>1</Key> За мной <Key>2</Key> Стой <Key>3</Key> Вода</div>
          <div><Key>C</Key> Присесть <Key>B</Key> Снаряжение {r.has('thermal') || r.has('thermal', 'partner') ? <><Key>F</Key> Тепловизор</> : null}</div>
          {r.safe() && <div><Key>X</Key> Передать вызов</div>}
        </div>
      </div>
    </div>
  </>
}
