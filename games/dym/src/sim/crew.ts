import type { Command, Round, Vec, Victim } from './index'
import { clearLine, distance, move, route } from './partner'

export type Assistance =
  | { kind: 'rescue'; person: Victim }
  | { kind: 'work'; label: string; seconds: number; available: () => boolean; perform: () => void }

export class Crew {
  command: Command = 'follow'
  status = 'Рядом'
  water = 54
  air: number
  spare: boolean
  carrying: Victim | null = null
  coverTarget: Vec | null = null
  readonly spotted = new Set<string>()
  private task: Assistance | null = null
  private workPosition: Vec | null = null
  private workTime = 0
  private refill = false
  private path: Vec[] = []
  private routeTime = 0
  private destination = -1

  constructor(private readonly round: Round, readonly position: Vec, readonly maxAir: number) {
    this.air = maxAir
    this.spare = round.has('cylinder', 'partner')
  }

  get busy() { return this.task !== null || this.carrying !== null }
  get onRescue() { return this.task?.kind === 'rescue' || this.carrying !== null }
  get sprayWide() { return this.round.has('spray', 'partner') }

  isAssigned(person: Victim) { return this.task?.kind === 'rescue' && this.task.person === person }

  private radio(line: string) { this.round.say('Лёша: ' + line, 3) }

  order(command: Command) {
    if (this.carrying) { this.radio('Выношу пострадавшего.'); return }
    this.task = null
    this.command = command
    this.routeTime = 0
    this.radio({ follow: 'Иду следом.', hold: 'Держу позицию.', cover: 'Прикрываю водой.' }[command])
  }

  assign(task: Assistance) {
    if (!this.canHelp()) return
    const goal = task.kind === 'rescue' ? task.person.pos : this.round.player
    if (this.round.cell(this.position) !== this.round.cell(goal) && !route(this.round.fire, this.position, goal).length) {
      this.radio('Путь закрыт. Открой проход.')
      return
    }
    this.command = 'follow'
    this.task = task
    this.workPosition = task.kind === 'work' ? { ...goal } : null
    this.workTime = this.routeTime = 0
    this.radio(task.kind === 'rescue' ? 'Забираю пострадавшего.' : 'Беру задачу на себя.')
  }

  handoff(person: Victim) {
    if (!this.canHelp()) return false
    if (distance(this.position, this.round.player) > 1.75 || !clearLine(this.round.fire, this.position, this.round.player)) {
      this.radio('Подойди ко мне для передачи.')
      return false
    }
    this.command = 'follow'
    this.pickUp(person)
    return true
  }

  private canHelp() {
    if (this.busy) { this.radio('Сначала закончу текущую задачу.'); return false }
    if (this.refill) { this.radio('Пополняю воздух у выхода.'); return false }
    return true
  }

  private pickUp(person: Victim) {
    person.state = 'carried'
    this.carrying = person
    this.task = null
    this.routeTime = 0
    this.radio('Я несу, встречайте у выхода.')
  }

  private walk(to: Vec, speed: number, dt: number, stop = .15) {
    if (distance(this.position, to) <= stop) return
    const r = this.round
    const goal = r.cell(to)
    this.routeTime -= dt
    if (this.routeTime <= 0 || goal !== this.destination) {
      this.destination = goal
      this.routeTime = .30
      this.path = clearLine(r.fire, this.position, to, false, .17) ? [{ ...to }] : route(r.fire, this.position, to)
    }
    const next = this.path[0]
    if (!next) return
    const remaining = distance(this.position, next)
    const step = Math.min(remaining, speed * dt)
    if (remaining <= .09) this.path.shift()
    else move(r.fire, this.position, this.position.x + (next.x - this.position.x) * step / remaining,
      this.position.z + (next.z - this.position.z) * step / remaining, .17)
  }

  step(dt: number) {
    const r = this.round
    const here = r.cell(this.position)
    const safe = r.fire.safe(here)
    this.coverTarget = null
    if (safe) {
      this.air = Math.min(this.maxAir, this.air + dt * 18)
      this.water = Math.min(54, this.water + dt * 22)
      if (this.air >= this.maxAir * .78) this.refill = false
    } else {
      this.air = Math.max(0, this.air - dt * (.59 + r.fire.smoke[here] * .55 + (this.carrying ? .26 : 0)))
      if (this.air < this.maxAir * .24 && this.spare) {
        this.spare = false
        this.air = Math.min(this.maxAir, this.air + 44)
        this.radio('Подключил запасной баллон.')
      }
      if (this.air < this.maxAir * .18 && !this.refill) {
        this.refill = true
        this.task = null
        if (!this.carrying) this.radio('Возвращаюсь к выходу за воздухом.')
      }
    }

    if (this.carrying) {
      this.status = 'Эвакуирует · ' + this.carrying.name
      if (!safe) {
        this.walk(r.exitPoint, r.has('stretcher', 'partner') ? 2.33 : 1.64, dt)
        return
      }
      const person = this.carrying
      this.carrying = null
      person.state = 'saved'
      r.support += 6
      r.say('Ирина: Лёша передал пострадавшего медикам.')
    }
    if (this.refill) {
      this.status = 'Пополняет воздух'
      if (!safe) this.walk(r.exitPoint, 3.1, dt)
      return
    }
    if (this.task) {
      this.performTask(this.task, dt)
      return
    }
    this.status = { follow: 'Прикрывает звено', hold: 'Держит позицию', cover: 'Ищет доступный очаг' }[this.command]
    if (this.command === 'hold') return
    this.walk(r.player, this.command === 'cover' ? 2.5 : 3.35, dt, 1.05)
    this.scan()
    this.waterFire(dt)
  }

  private performTask(task: Assistance, dt: number) {
    const r = this.round
    if (task.kind === 'rescue') {
      if (task.person.state !== 'waiting') { this.task = null; return }
      this.status = 'Идёт за пострадавшим'
      this.walk(task.person.pos, 3.2, dt, .62)
      if (distance(this.position, task.person.pos) <= .78 && clearLine(r.fire, this.position, task.person.pos)) {
        this.workTime += dt
        if (this.workTime >= (r.has('stretcher', 'partner') ? .55 : .9)) this.pickUp(task.person)
      }
      return
    }
    if (!task.available()) { this.task = null; return }
    const spot = this.workPosition!
    this.status = task.label
    this.walk(spot, 3.15, dt, .27)
    if (distance(this.position, spot) > .36) return
    if (r.fire.heat[r.cell(spot)] >= 1.05) {
      this.task = null
      this.radio('Слишком жарко. Сначала охлади очаг.')
      return
    }
    this.workTime += dt
    if (this.workTime >= task.seconds) {
      this.task = null
      task.perform()
      r.support += 2
    }
  }

  private scan() {
    const r = this.round
    if (!r.has('thermal', 'partner')) return
    for (const person of r.victims) {
      if (person.state !== 'waiting' || this.spotted.has(person.id) || distance(this.position, person.pos) > 5.5 ||
          !clearLine(r.fire, this.position, person.pos)) continue
      this.spotted.add(person.id)
      this.radio('Вижу на тепловизоре: ' + person.name + '.')
    }
  }

  private waterFire(dt: number) {
    const r = this.round
    if (this.water <= 0 || (r.safe() && this.command === 'follow') ||
        distance(this.position, r.player) > 5.5) return
    let range = this.sprayWide ? 4 : 5
    let target = -1
    for (let i = 0; i < r.fire.heat.length; i++) {
      if (!r.fire.burning(i) || r.fire.isHazard(i)) continue
      const spot = r.fire.center(i)
      const gap = distance(this.position, spot)
      if (gap >= range || !clearLine(r.fire, this.position, spot)) continue
      range = gap
      target = i
    }
    if (target < 0) return
    this.status = 'Тушит очаг'
    this.coverTarget = r.fire.center(target)
    const flow = this.sprayWide ? 4.2 : 3.4
    const used = Math.min(this.water, dt * flow)
    this.water -= used
    const directed = this.command === 'cover' || r.reinforcement
    const output = (this.sprayWide ? .63 : .43) * (directed ? 1 : .66)
    r.fire.water(target, used * output / flow)
    r.support += used / flow
  }
}
