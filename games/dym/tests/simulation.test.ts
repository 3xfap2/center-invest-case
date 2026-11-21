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
  it('бег расходует больше воздуха, баллон и сложность меняют запас', () => {
    const c = newCampaign('Лена', 'normal')
    const walk = new Round(calls[0], emptyEquipment(), c)
    const run = new Round(calls[0], { you: ['cylinder'], partner: [] }, c)
    Object.assign(walk.player, center([6, 8]))
    Object.assign(run.player, walk.player)
    walk.step({ ...blankInput, z: 1, yaw: Math.PI })
    run.step({ ...blankInput, z: 1, yaw: Math.PI, sprint: true })
    expect(run.maxAir - walk.maxAir).toBe(44)
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
