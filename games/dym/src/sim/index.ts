import { difficulty, type Campaign, type Equipment, type Gear, type RoundResult } from './campaign'
import { center, type Call, type ObjectiveKind } from './content'
import { clamp, FireGrid } from './fire'
import { clearLine, distance, move } from './partner'
import { Crew, type Assistance } from './crew'

export const STEP = .05
export type Vec = { x: number; z: number }
export type Aim = Vec & { y: number }
export type Command = 'follow' | 'hold' | 'cover'
export type Input = {
  x: number; z: number; sprint: boolean; crouch: boolean; interact: boolean; spray: boolean; yaw: number; pitch: number
}
export const blankInput: Input = {
  x: 0, z: 0, sprint: false, crouch: false, interact: false, spray: false, yaw: 0, pitch: 0,
}
type Objective = {
  id: string; pos: Vec; kind: ObjectiveKind; label: string; seconds: number; required: boolean; done: boolean
}
export type Victim = { id: string; pos: Vec; name: string; state: 'waiting' | 'carried' | 'saved' }
type HandTool = 'axe' | 'fan' | 'stretcher'
type Action = {
  id: string; label: string; seconds: number; danger?: boolean; assist?: Assistance;
  partnerOnly?: boolean; perform: () => void
}
export const forward = (yaw: number) => ({ x: -Math.sin(yaw), z: -Math.cos(yaw) })
export const eyeHeight = (crouch: boolean) => crouch ? .63 : 1.12
export const shotPoint = (origin: Aim, yaw: number, pitch: number, length: number): Aim => {
  const f = forward(yaw)
  return {
    x: origin.x + f.x * Math.cos(pitch) * length,
    z: origin.z + f.z * Math.cos(pitch) * length,
    y: origin.y + Math.sin(pitch) * length - .038 * length * length,
  }
}

export class Round {
  readonly fire: FireGrid
  readonly player: Vec
  readonly crew: Crew
  readonly objectives: Objective[]
  readonly victims: Victim[]
  readonly maxAir: number
  readonly maxWater: number
  readonly hints: boolean
  readonly doorCells: Vec[] = []
  readonly entry: Vec
  readonly exitPoint: Vec
  readonly timeLimit: number
  readonly reinforcement: boolean
  air: number
  water: number
  time = 0
  safety = 100
  support = 0
  waited: boolean | null
  checked: boolean | null = null
  carrying: Victim | null = null
  result: RoundResult | null = null
  hold = 0
  target: Action | null = null
  notice = ''
  noticeClock = 0
  crouch = false
  spraying = false
  moving = false
  heat = 0
  visibility = 0
  thermal = false
  sprayWide = false
  spare: boolean
  handTool: HandTool | null = null
  fanPosition: Vec | null = null
  recoil = 0
  aim: Aim | null = null
  infiniteAir = false
  private holdId = ''
  private carryUsesStretcher = false
  private airWarning = false
  private fireTime = 0
  private lowestAir = 100
  private mostFire = 0
  private objectiveReady = false

  constructor(readonly call: Call, readonly equipment: Equipment, campaign: Campaign, waited: boolean | null = null) {
    const mode = difficulty[campaign.difficulty]
    this.waited = waited
    this.hints = mode.hints
    this.reinforcement = call.theme === 'warehouse' && campaign.waited === true
    this.fire = new FireGrid(call, call.number * 8191 + 183, mode.spread)
    this.player = center(call.spawn)
    this.maxAir = mode.air
    this.spare = this.has('cylinder')
    this.maxWater = this.reinforcement ? 144 : 112
    this.air = this.maxAir
    this.water = this.maxWater
    this.timeLimit = call.timeLimit
    this.objectives = call.objectives.map(o => ({ ...o, pos: center(o.at), done: false }))
    this.victims = call.victims.map((v, i) => ({ ...v, id: 'victim-' + i, pos: center(v.at), state: 'waiting' }))
    Array.from(this.fire.tiles).forEach((tile, i) => {
      if (tile === 'D') this.doorCells.push(this.fire.center(i))
    })
    const entrances = this.doorCells.filter(p => this.fire.neighbors[this.cell(p)].some(i => this.fire.safe(i)))
    this.entry = entrances.reduce((nearest, door) =>
      distance(this.player, door) < distance(this.player, nearest) ? door : nearest, entrances[0] ?? this.player)
    this.exitPoint = this.fire.center(this.fire.neighbors[this.cell(this.entry)].find(i => this.fire.safe(i)) ?? this.cell(this.player))
    this.crew = new Crew(this, { x: this.player.x + .76, z: this.player.z + .22 }, mode.air)
    if (waited !== null) {
      if (waited) {
        this.time = 11
        this.say('Саныч: Второй рукав готов. Входим вместе.')
      } else {
        this.safety = 78
        this.say('Саныч: Запомню. Внутри держитесь рядом.')
      }
    }
    if (call.theme === 'warehouse') {
      if (!this.reinforcement) {
        this.fire.ignite(this.fire.index(13.5, 8.5), 'solid', .82)
        this.say('Саныч: Второй рукав ещё в пути.')
      } else {
        this.say('Саныч: Второй рукав на позиции.')
      }
      if (campaign.checked === true) this.fire.vent = .018
    }
    this.mostFire = this.fire.count()
  }

  has(id: Gear, owner: keyof Equipment = 'you') { return this.equipment[owner].includes(id) }
  get partner() { return this.crew.position }
  safe() { return this.fire.safe(this.cell(this.player)) }
  cell(pos: Vec) { return this.fire.index(pos.x, pos.z) }
  say(text: string, duration = 4) { this.notice = text; this.noticeClock = duration }
  order(command: Command) { this.crew.order(command) }
  orderHelp() {
    if (this.carrying) {
      if (this.crew.handoff(this.carrying)) this.carrying = null
      return
    }
    if (this.target?.assist) this.crew.assign(this.target.assist)
    else this.say('Наведи прицел на пострадавшего или доступную Лёше задачу.', 3)
  }

  useGear(id: Gear) {
    if (!this.has(id)) return
    switch (id) {
      case 'thermal':
        this.thermal = !this.thermal
        this.say(this.thermal ? 'Тепловизор включён.' : 'Тепловизор выключен.', 2)
        return
      case 'spray':
        this.sprayWide = !this.sprayWide
        this.say(this.sprayWide ? 'Распылитель · широкий факел.' : 'Ствол · узкая струя.', 2)
        return
      case 'cylinder':
        if (!this.spare) { this.say('Запасной баллон уже использован.'); return }
        if (this.carrying) { this.say('Сначала передай пострадавшего Лёше.'); return }
        if (this.air > this.maxAir - 15) { this.say('Воздуха достаточно. Сохрани запас.'); return }
        this.spare = false
        this.air = Math.min(this.maxAir, this.air + 44)
        this.airWarning = false
        this.say('Запасной баллон подключён.')
        return
      default:
        if (id === 'fan' && this.fanPosition) return
        this.handTool = this.handTool === id ? null : id
        this.say(this.handTool ? ({ axe: 'Инструмент для двери готов.', fan: 'Дымосос готов. Открой окно.', stretcher: 'Носилки готовы.' })[id] : 'Инструмент убран.', 2.5)
    }
  }
  withdraw() {
    if (this.safe() && !this.result) this.finish('withdraw')
    else this.say('Сначала вернись к зелёной полосе.')
  }
  speed(sprint: boolean) {
    if (this.carrying) return this.carryUsesStretcher ? 2.15 : 1.47
    if (this.crouch) return 1.52
    return sprint ? 3.86 : 2.76
  }

  private action(input: Input): Action | null {
    const direction = forward(input.yaw)
    let best = Infinity
    let action: Action | null = null
    const consider = (p: Vec, candidate: Action, door = false) => {
      const length = distance(this.player, p)
      const facing = (direction.x * (p.x - this.player.x) + direction.z * (p.z - this.player.z)) / Math.max(.01, length)
      const rank = length - facing * .6
      if (length > 1.52 || (length >= .46 && facing <= .35) || rank >= best ||
          !clearLine(this.fire, this.player, p, door)) return
      best = rank
      action = candidate
    }
    for (const v of this.victims) {
      if (this.carrying || v.state !== 'waiting' || this.crew.isAssigned(v)) continue
      const stretcher = this.handTool === 'stretcher'
      consider(v.pos, { id: v.id, label: (stretcher ? 'На носилки: ' : 'Поднять: ') + v.name,
        seconds: stretcher ? .8 : 1.25, assist: { kind: 'rescue', person: v },
        perform: () => {
          this.carrying = v
          this.carryUsesStretcher = stretcher
          v.state = 'carried'
          this.say('Лёша: К выходу. Я рядом.')
        },
      })
    }
    const axe = this.handTool === 'axe'
    for (const o of this.objectives) {
      if (this.carrying && o.kind !== 'door') continue
      if (o.done) {
        if (o.kind === 'vent' && !this.fanPosition) this.considerFan(o, consider)
        continue
      }
      const door = o.kind === 'door'
      consider(o.pos, {
        id: o.id, label: door && axe ? o.label + ' инструментом' : o.label,
        seconds: o.seconds * (door && axe ? .5 : 1),
        danger: door && this.fire.doorRisk(this.cell(o.pos)),
        assist: door ? this.doorHelp(o.pos, o.seconds * .5, () => this.complete(o)) : undefined,
        perform: () => this.complete(o),
      }, door)
    }
    for (const p of this.doorCells) {
      const i = this.cell(p)
      if (this.fire.doors.has(i) || this.objectives.some(o => o.kind === 'door' && !o.done && this.cell(o.pos) === i)) continue
      consider(p, {
        id: 'door-' + i, label: axe ? 'Вскрыть дверь инструментом' : 'Открыть дверь', seconds: axe ? .33 : .68,
        danger: this.fire.doorRisk(i), assist: this.doorHelp(p, .33, () => this.openDoor(p)),
        perform: () => this.openDoor(p),
      }, true)
    }
    return action
  }

  private doorHelp(pos: Vec, seconds: number, perform: () => void): Assistance | undefined {
    const cell = this.cell(pos)
    if (!this.has('axe', 'partner') || this.fire.doorRisk(cell)) return
    return { kind: 'work', label: 'Вскрывает дверь', seconds,
      available: () => !this.fire.doors.has(cell) && !this.fire.doorRisk(cell), perform }
  }

  private considerFan(o: Objective, consider: (pos: Vec, action: Action) => void) {
    const own = this.handTool === 'fan'
    const partnerFan = this.has('fan', 'partner')
    if (!own && !partnerFan) return
    const deploy = () => {
      this.fanPosition = { ...o.pos }
      if (this.handTool === 'fan') this.handTool = null
      this.fire.vent += .185
      this.say('Саныч: Дымосос запущен, видимость улучшится.')
    }
    consider(o.pos, {
      id: 'fan-' + o.id, label: 'Поставить дымосос', seconds: 1.2, partnerOnly: !own, perform: deploy,
      assist: partnerFan ? { kind: 'work', label: 'Ставит дымосос', seconds: 1.2,
        available: () => !this.fanPosition, perform: deploy } : undefined,
    })
  }

  private openDoor(p: Vec) {
    if (this.fire.open(this.cell(p))) {
      this.safety -= 8
      this.say('Саныч: Вспышка у двери. Назад!')
    }
  }

  private complete(o: Objective) {
    o.done = true
    switch (o.kind) {
      case 'door':
        this.openDoor(o.pos)
        if (this.checked === null) this.checked = true
        this.say('Нина: Я здесь! Помогите!')
        break
      case 'goods':
        if (this.checked === null) this.checked = false
        this.say('Владелец: Товар в порядке. А кто там стучит?')
        break
      case 'power':
        this.fire.power = false
        this.say('Лёша: Питание отключено.')
        break
      case 'gas':
        this.fire.gas = false
        this.say('Лёша: Газ перекрыт.')
        break
      case 'agent':
        this.fire.suppressOil()
        this.say('Лёша: Плита погашена.')
        break
      case 'vent':
        this.fire.vent += .075
        this.say('Лёша: Дым уходит.')
        break
    }
  }

  private trace(input: Input, yaw: number, range: number) {
    const origin = { ...this.player, y: eyeHeight(this.crouch) - .07 }
    let final = origin
    let hit = -1
    for (let length = .15; length <= range; length += .12) {
      final = shotPoint(origin, yaw, input.pitch + this.recoil * .55, length)
      const i = this.cell(final)
      if (this.fire.blocked(i) || final.y > 1.95) break
      if ((this.fire.heat[i] >= .32 && final.y <= .80) || final.y < .055) {
        hit = i
        break
      }
    }
    return { final, hit }
  }

  private updateHose(input: Input, dt: number) {
    this.spraying = input.spray && this.water > 0 && !this.carrying
    this.recoil = clamp(this.recoil + (this.spraying ? .65 : -1.5) * dt, 0, .095)
    if (!this.spraying) { this.aim = null; return }
    const spray = this.sprayWide
    this.water = Math.max(0, this.water - dt * (spray ? 3.9 : 3.15))
    const range = spray ? 4.3 : 6.6
    const straight = this.trace(input, input.yaw, range)
    this.aim = straight.final
    const hits = new Set<number>()
    for (const offset of spray ? [-.21, 0, .21] : [0]) {
      const hit = offset === 0 ? straight.hit : this.trace(input, input.yaw + offset, range).hit
      if (hit < 0 || hits.has(hit)) continue
      hits.add(hit)
      if (this.fire.water(hit, dt * (offset === 0 ? (spray ? .86 : 1.34) : .63))) {
        this.safety -= dt * 5
        const material = this.fire.kind[hit] === 'oil' ? 'Масло. Включи тушение плиты.' : 'Проводка под напряжением. Ищи щит.'
        this.say('Саныч: ' + material, 2)
      }
    }
  }

  step(input: Input, dt = STEP) {
    if (this.result) return
    this.time += dt
    this.noticeClock = Math.max(0, this.noticeClock - dt)
    this.crouch = input.crouch && !this.carrying
    const running = input.sprint && !this.crouch && !this.carrying
    this.moving = Math.abs(input.x) + Math.abs(input.z) > .05
    if (this.moving) {
      const f = forward(input.yaw)
      const speed = this.speed(running) * dt / Math.max(1, Math.hypot(input.x, input.z))
      move(this.fire, this.player, this.player.x + (f.x * input.z - f.z * input.x) * speed,
        this.player.z + (f.z * input.z + f.x * input.x) * speed, .19)
    }

    const cell = this.cell(this.player)
    const safe = this.fire.safe(cell)
    this.heat = this.fire.heat[cell] ?? 0
    this.visibility = (this.fire.smoke[cell] ?? 0) * (this.crouch ? .54 : 1)
    this.target = this.action(input)
    if (!this.target || this.target.id !== this.holdId || !input.interact || this.target.partnerOnly) this.hold = 0
    this.holdId = this.target?.id ?? ''
    if (this.target && !this.target.partnerOnly && input.interact) {
      if (this.heat < 1.05) {
        this.hold += dt / this.target.seconds
        if (this.hold >= 1 - 1e-8) {
          this.target.perform()
          this.hold = 0
          this.target = null
        }
      } else this.say('Слишком жарко. Охлади очаг.', 1.2)
    }
    if (this.carrying && safe) {
      this.say('Ирина: ' + this.carrying.name + ' в безопасности.')
      this.carrying.state = 'saved'
      this.carrying = null
    }

    this.updateHose(input, dt)
    this.crew.step(dt)
    const gap = distance(this.player, this.partner)
    if (!safe && !this.crew.onRescue && gap > 4.9) this.safety -= dt * (gap > 8 ? 1.25 : .56)
    this.fireTime += dt
    if (this.fireTime >= .25 - 1e-8) {
      this.fire.step(this.fireTime)
      this.fireTime = 0
    }
    if (safe) {
      this.air = Math.min(this.maxAir, this.air + dt * 16)
      this.water = Math.min(this.maxWater, this.water + dt * 27)
      if (this.air / this.maxAir > .38) this.airWarning = false
    } else if (!this.infiniteAir) {
      const stress = Math.max(0, this.heat - .36) * 1.45 + this.visibility * .37
      this.air = Math.max(0, this.air - dt * (.71 + (this.moving ? .19 : 0)
        + (running && this.moving ? .67 : 0) + stress + (this.carrying ? .17 : 0)))
      const percent = 100 * this.air / this.maxAir
      this.lowestAir = Math.min(this.lowestAir, percent)
      if (percent < 28 && !this.airWarning) {
        this.airWarning = true
        this.say('Саныч: Воздух на исходе. Пора к выходу.')
      }
      if (percent < 14) this.safety -= dt * .58
    }
    this.safety = clamp(this.safety, 0, 100)
    const fires = this.fire.count()
    this.mostFire = Math.max(this.mostFire, fires)
    const ready = fires === 0 && this.objectives.every(o => !o.required || o.done) && this.victims.every(v => v.state === 'saved')
    if (ready && !this.objectiveReady && !safe) this.say('Саныч: Задача выполнена. Возвращайтесь к выходу.')
    this.objectiveReady = ready
    if (this.air <= 0) this.finish('air')
    else if (ready && safe) this.finish('complete')
    else if (this.time >= this.timeLimit) this.finish('timer')
  }

  get remaining() { return Math.max(0, this.timeLimit - this.time) }
  get saved() { return this.victims.filter(v => v.state === 'saved').length }
  get completeOutside() { return this.objectiveReady }

  private finish(status: RoundResult['status']) {
    if (status === 'air') this.safety = Math.min(this.safety, 52)
    if (this.call.theme === 'store' && this.checked === null) this.checked = false
    const damage = Math.max(0, this.mostFire - this.call.fires.length) * 2
    const bonus = this.objectives.some(o => o.kind === 'goods' && o.done) ? 5 : 0
    this.result = {
      saved: this.saved, total: this.victims.length, property: clamp(this.fire.property() - damage + bonus, 0, 100),
      air: Math.round(this.lowestAir >= 28 ? 100 : this.lowestAir * 100 / 28),
      safety: Math.round(this.safety), support: this.support, seconds: Math.min(this.time, this.timeLimit), status,
    }
  }
}
