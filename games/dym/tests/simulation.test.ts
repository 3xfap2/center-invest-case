import { describe, expect, it } from 'vitest'
import { blankInput, Round, STEP, type Vec } from '../src/sim'
import { calls, center, type Call, type GridPos } from '../src/sim/content'
import { FireGrid } from '../src/sim/fire'
import { emptyEquipment, endPayload, fromSave, getEnding, newCampaign, recordRound, reward, toSave, type RoundResult } from '../src/sim/campaign'

const result = (saved: number, total = 1): RoundResult =>
  ({ saved, total, air: 100, property: 95, safety: 95, support: 5, seconds: 75, status: saved === total ? 'complete' : 'timer' })

describe('Состояние пожара', () => {
  it('распространяет жар и дым на соседнюю клетку, тушится водой', () => {
    const grid = new FireGrid(calls[0], 142, 1)
    const seat = grid.index(5, 8)
    const next = grid.index(5, 7)
    const start = grid.count()
    let peak = start
    for (let i = 0; i < 300; i++) { grid.step(.25); peak = Math.max(peak, grid.count()) }
    expect(peak).toBeGreaterThan(start)
    expect(grid.smoke[next]).toBeGreaterThan(.1)
    grid.water(seat, 2)
    expect(grid.burning(seat)).toBe(false)
    expect(grid.wet[seat]).toBeGreaterThan(.8)
  })

  it('вода усиливает горящее масло и проводку под напряжением', () => {
    const kitchen = new FireGrid(calls[1], 412, 1)
    const oil = kitchen.index(12, 5)
    const temperature = kitchen.heat[oil]
    expect(kitchen.water(oil, .3)).toBe(true)
    expect(kitchen.heat[oil]).toBeGreaterThan(temperature)
    kitchen.suppressOil()
    expect(kitchen.burning(oil)).toBe(false)

    const workshop = new FireGrid(calls[2], 714, 1)
    const wire = workshop.index(12, 7)
    expect(workshop.water(wire, .3)).toBe(true)
    workshop.power = false
    expect(workshop.water(wire, 2)).toBe(false)
    expect(workshop.burning(wire)).toBe(false)
  })

  it('закрытая дверь отделяет дым и может дать вспышку при открытии', () => {
    const grid = new FireGrid(calls[3], 914, 1)
    const door = grid.index(5, 6)
    const hot = grid.index(5, 5)
    grid.heat[hot] = 1.1
    grid.smoke[hot] = .8
    grid.step(.25)
    expect(grid.smoke[door]).toBe(0)
    expect(grid.doorRisk(door)).toBe(true)
    expect(grid.open(door)).toBe(true)
    expect(grid.lastFlare).toBeGreaterThan(0)
  })
})

describe('Игрок и кампания', () => {
  it('бег расходует больше воздуха, сложность меняет ёмкость', () => {
    const c = newCampaign('Лена', 'normal')
    const walk = new Round(calls[0], emptyEquipment(), c)
    const run = new Round(calls[0], { you: ['cylinder'], partner: [] }, c)
    Object.assign(walk.player, center([6, 8]))
    Object.assign(run.player, walk.player)
    walk.step({ ...blankInput, z: 1, yaw: Math.PI })
    run.step({ ...blankInput, z: 1, yaw: Math.PI, sprint: true })
    expect(run.maxAir).toBe(walk.maxAir)
    expect(run.maxAir - run.air).toBeGreaterThan(walk.maxAir - walk.air)

    const easy = new Round(calls[0], emptyEquipment(), newCampaign('Лена', 'easy'))
    const hard = new Round(calls[0], emptyEquipment(), newCampaign('Лена', 'hard'))
    expect(easy.maxAir).toBeGreaterThan(hard.maxAir)
    expect(easy.fire.spread).toBeLessThan(hard.fire.spread)
    expect(hard.hints).toBe(false)
  })

  it('надо удерживать E, а после подъёма человека скорость падает', () => {
    const r = new Round(calls[0], emptyEquipment(), newCampaign('Лена', 'normal'))
    Object.assign(r.player, { x: 10.62, z: 3.5 })
    const input = { ...blankInput, interact: true, yaw: -Math.PI / 2 }
    const speed = r.speed(false)
    for (let i = 0; i < 24; i++) r.step(input)
    expect(r.carrying).toBeNull()
    r.step({ ...input, interact: false })
    expect(r.hold).toBe(0)
    for (let i = 0; i < 25; i++) r.step(input)
    expect(r.carrying?.name).toBe('Миша')
    expect(r.speed(false)).toBeLessThan(speed)
  })

  it('начисляет бюджет, сохраняет выборы и восстанавливает сохранение', () => {
    const c = newCampaign('Лена', 'easy')
    const r = result(1)
    const settled = recordRound(c, r, 180, true, null)
    expect(settled.budget).toBe(c.budget - 180 + reward(r))
    expect(fromSave(JSON.parse(JSON.stringify(toSave(settled))))).toEqual(settled)
    expect(fromSave({ ...settled, v: 2 })).toBeNull()
    expect(JSON.stringify(toSave(settled)).length).toBeLessThan(64 * 1024)
  })

  it('три исхода определяются спасёнными людьми, безопасностью и двумя решениями', () => {
    const chapter = { ...newCampaign('Лена', 'easy'), waited: true, checked: true,
      results: calls.map(c => result(c.victims.length, c.victims.length)) }
    expect(getEnding(chapter)).toBe('good')
    expect(getEnding({ ...chapter, waited: false })).toBe('steady')
    expect(getEnding({ ...chapter, checked: false })).toBe('steady')
    expect(getEnding({ ...chapter, results: calls.map(c => result(0, c.victims.length)) })).toBe('backup')
    expect(endPayload(chapter, 'good').choices.dm_people_saved).toBe(6)
    const gear = emptyEquipment()
    const supported = new Round(calls[4], gear, chapter)
    const unsupported = new Round(calls[4], gear, { ...chapter, waited: false, checked: false })
    expect(supported.maxWater).toBeGreaterThan(unsupported.maxWater)
    expect(supported.fire.count()).toBeLessThan(unsupported.fire.count())
    expect(supported.fire.vent).toBeGreaterThan(unsupported.fire.vent)
  })
})

const yawAt = (from: Vec, to: Vec) => Math.atan2(from.x - to.x, from.z - to.z)
class Driver {
  constructor(readonly r: Round) {}
  private nextPath(to: Vec) {
    const r = this.r
    const start = r.cell(r.player)
    const end = r.cell(to)
    const visited = new Map([[start, start]])
    const queue = [start]
    for (const i of queue) {
      if (i === end) break
      for (const n of r.fire.neighbors[i]) {
        if (visited.has(n)) continue
        queue.push(n)
        visited.set(n, i)
      }
    }
    if (!visited.has(end)) throw new Error('Missing route to cell ' + end)
    const path = []
    for (let i = end; i !== start; i = visited.get(i)!) path.push(i)
    return path.reverse()
  }
  walk(to: Vec) {
    const yaw = yawAt(this.r.player, to)
    const speed = this.r.speed(false)
    const ticks = Math.round(Math.hypot(to.x - this.r.player.x, to.z - this.r.player.z) / (speed * STEP))
    for (let tick = 0; tick < ticks; tick++) this.r.step({ ...blankInput, yaw, z: 1 })
  }
  interact(to: Vec, id: string, ticks: number) {
    const yaw = yawAt(this.r.player, to)
    this.r.step({ ...blankInput, yaw })
    expect(this.r.target?.id).toBe(id)
    for (let i = 0; i < ticks; i++) this.r.step({ ...blankInput, yaw, interact: true })
  }
  go(at: GridPos, stopShort = false) {
    const goal = center(at)
    for (const i of this.nextPath(goal)) {
      const to = this.r.fire.center(i)
      if (stopShort && this.r.cell(goal) === i) return
      if (this.r.fire.blocked(i)) this.interact(to, 'door-' + i, 16)
      this.walk(to)
    }
  }
  douse(call: Call, spot: GridPos) {
    const fire = this.r.fire
    const seat = fire.index(...spot)
    if (!fire.burning(seat)) return
    const adjacent = fire.neighbors[seat].map(i => fire.center(i)).filter(p => !fire.blocked(fire.index(p.x, p.z)))
    adjacent.sort((a, b) => Number(fire.burning(this.r.cell(a))) - Number(fire.burning(this.r.cell(b))) ||
      Math.hypot(a.x - this.r.player.x, a.z - this.r.player.z) - Math.hypot(b.x - this.r.player.x, b.z - this.r.player.z))
    const to = adjacent[0]
    if (!to) throw new Error('No approach to fire in ' + call.id)
    this.go([Math.floor(to.x), Math.floor(to.z)])
    const yaw = yawAt(this.r.player, center(spot))
    for (let i = 0; i < 38 && fire.burning(seat); i++) this.r.step({ ...blankInput, yaw, pitch: -.49, spray: true })
    expect(fire.burning(seat)).toBe(false)
  }
}

describe('Снаряжение и напарник в здании', () => {
  const campaign = newCampaign('Лена', 'normal')
  const call = calls[0]
  const tick = (round: Round, count: number) => {
    for (let i = 0; i < count; i++) round.step(blankInput)
  }

  it('включает купленные режимы и расходует запасной баллон один раз', () => {
    const r = new Round(call, { you: ['spray', 'thermal', 'cylinder'], partner: [] }, campaign)
    const unequipped = new Round(call, emptyEquipment(), campaign)
    unequipped.useGear('thermal')
    unequipped.useGear('spray')
    expect(unequipped.thermal || unequipped.sprayWide).toBe(false)
    expect(r.sprayWide || r.thermal).toBe(false)
    r.useGear('spray')
    r.useGear('thermal')
    expect(r.sprayWide && r.thermal).toBe(true)
    r.useGear('spray')
    expect(r.sprayWide).toBe(false)
    r.useGear('cylinder')
    expect(r.spare).toBe(true)
    r.air = 30
    r.useGear('cylinder')
    expect(r.air).toBe(74)
    expect(r.spare).toBe(false)
    r.air = 30
    r.useGear('cylinder')
    expect(r.air).toBe(30)
  })

  it('использует подготовленные носилки и ускоряет вскрытие инструментом', () => {
    const r = new Round(call, { you: ['stretcher', 'axe'], partner: [] }, campaign)
    Object.assign(r.player, r.exitPoint)
    r.useGear('axe')
    const d = new Driver(r)
    d.interact(r.entry, 'door-' + r.cell(r.entry), 7)
    expect(r.fire.doors.has(r.cell(r.entry))).toBe(true)
    r.useGear('stretcher')
    const person = call.victims[0]
    d.go(person.at, true)
    d.interact(center(person.at), 'victim-0', 16)
    expect(r.carrying?.name).toBe(person.name)
    expect(r.speed(false)).toBe(2.15)
  })

  it('включает дымосос у открытого окна за игрока или за Лёшу', () => {
    for (const owner of ['you', 'partner'] as const) {
      const equipment = emptyEquipment()
      equipment[owner] = ['fan']
      const r = new Round(call, equipment, campaign)
      const vent = r.objectives.find(o => o.kind === 'vent')!
      Object.assign(r.player, { x: vent.pos.x, z: vent.pos.z + .8 })
      Object.assign(r.partner, r.player)
      const d = new Driver(r)
      d.interact(vent.pos, vent.id, Math.ceil(vent.seconds / STEP) + 1)
      expect(r.fire.vent).toBeCloseTo(.075)
      if (owner === 'you') {
        r.useGear('fan')
        d.interact(vent.pos, 'fan-' + vent.id, 25)
      } else {
        r.step({ ...blankInput, yaw: yawAt(r.player, vent.pos) })
        expect(r.target?.partnerOnly).toBe(true)
        r.orderHelp()
        tick(r, 35)
      }
      expect(r.fanPosition).toEqual(vent.pos)
      expect(r.fire.vent).toBeCloseTo(.26)
    }
  })

  it('Лёша сам тушит безопасный очаг и использует свой баллон', () => {
    const r = new Round(call, { you: [], partner: ['cylinder', 'spray'] }, campaign)
    Object.assign(r.player, { x: 6.5, z: 9.5 })
    Object.assign(r.partner, { x: 5.5, z: 9.5 })
    r.crew.air = 22
    const fuel = r.fire.index(5, 8)
    const before = r.fire.heat[fuel]
    r.step(blankInput)
    expect(r.crew.coverTarget).toEqual(r.fire.center(fuel))
    expect(r.fire.heat[fuel]).toBeLessThan(before)
    expect(r.crew.water).toBeLessThan(54)
    expect(r.crew.spare).toBe(false)
    expect(r.crew.air).toBeGreaterThan(60)
    r.fire.heat.fill(0)
    r.fire.ignite(fuel, 'oil', 1)
    r.step(blankInput)
    expect(r.crew.coverTarget).toBeNull()
  })

  it('Лёша вскрывает дверь, находит пострадавшего и выносит его к выходу', () => {
    const r = new Round(call, { you: [], partner: ['axe', 'stretcher', 'thermal'] }, campaign)
    const d = new Driver(r)
    d.go([9, 11])
    r.step({ ...blankInput, yaw: yawAt(r.player, r.entry) })
    r.orderHelp()
    tick(r, 70)
    expect(r.fire.doors.has(r.cell(r.entry))).toBe(true)
    const person = r.victims[0]
    d.go(call.victims[0].at, true)
    tick(r, 65)
    expect(r.crew.spotted.has(person.id)).toBe(true)
    r.step({ ...blankInput, yaw: yawAt(r.player, person.pos) })
    expect(r.target?.id).toBe(person.id)
    r.orderHelp()
    tick(r, 38)
    expect(r.crew.carrying).toBe(person)
    r.order('hold')
    expect(r.crew.carrying).toBe(person)
    tick(r, 230)
    expect(person.state).toBe('saved')
    expect(r.saved).toBe(1)
    expect(r.support).toBeGreaterThanOrEqual(8)
  })

  it('игрок может передать Лёше человека, которого уже несёт', () => {
    const r = new Round(call, emptyEquipment(), campaign)
    const d = new Driver(r)
    d.go(call.victims[0].at, true)
    tick(r, 80)
    const person = r.victims[0]
    d.interact(person.pos, person.id, 26)
    expect(r.carrying).toBe(person)
    r.orderHelp()
    expect(r.carrying).toBeNull()
    expect(r.crew.carrying).toBe(person)
    tick(r, 280)
    expect(r.saved).toBe(1)
  })
})

it.each(calls)('позволяет открыть и пройти каждую дверь с обеих сторон: $name', call => {
  const campaign = newCampaign('Лена', 'normal')
  const layout = new Round(call, emptyEquipment(), campaign)
  expect(layout.fire.neighbors[layout.cell(layout.entry)].some(i => layout.fire.safe(i))).toBe(true)
  for (const door of layout.doorCells) {
    const cell = layout.cell(door)
    const neighbors = layout.fire.neighbors[cell]
    expect(neighbors).toHaveLength(2)
    const key = call.objectives.find(o => o.kind === 'door' && layout.cell(center(o.at)) === cell)
    for (const [from, to] of [neighbors, [...neighbors].reverse()]) {
      const round = new Round(call, emptyEquipment(), campaign)
      round.fire.heat.fill(0)
      Object.assign(round.player, round.fire.center(from))
      const driver = new Driver(round)
      driver.walk(door)
      expect(round.cell(round.player)).toBe(from)
      driver.interact(door, key?.id ?? 'door-' + cell, Math.ceil((key?.seconds ?? .68) / STEP) + 1)
      driver.walk(round.fire.center(to))
      expect(round.cell(round.player)).toBe(to)
    }
  }
})

it('позволяет пройти пять вызовов от инструктажа до лучшего исхода', () => {
  let campaign = newCampaign('Лена', 'normal')
  for (const call of calls) {
    const held = call.theme === 'workshop' ? true : null
    const r = new Round(call, { you: ['cylinder', 'axe'], partner: ['stretcher'] }, campaign, held)
    const d = new Driver(r)
    for (const o of call.objectives.filter(o => o.required)) {
      d.go(o.at, true)
      d.interact(center(o.at), o.id, Math.ceil(o.seconds / STEP) + 1)
    }
    for (const f of call.fires) d.douse(call, f.at)
    for (let attempt = 0; attempt < 12 && r.fire.count(); attempt++) {
      const i = r.fire.heat.findIndex((_, cell) => r.fire.burning(cell))
      if (i >= 0) d.douse(call, [i % r.fire.width, Math.floor(i / r.fire.width)])
    }
    for (const [i, v] of call.victims.entries()) {
      d.go(v.at, true)
      d.interact(center(v.at), 'victim-' + i, 26)
      d.go(call.spawn)
    }
    expect(r.result?.status, call.name).toBe('complete')
    campaign = recordRound(campaign, r.result!, 0, held, r.checked)
  }
  expect(getEnding(campaign)).toBe('good')
})
