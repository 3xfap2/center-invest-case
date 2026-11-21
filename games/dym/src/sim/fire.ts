import type { Call, FireKind } from './content'
export const ignition = .59
export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))

export function seeded(seed: number) {
  let value = seed | 0
  return () => {
    value = (Math.imul(1664525, value) + 1013904223) | 0
    return (value >>> 0) / 4294967296
  }
}

export class FireGrid {
  readonly width: number
  readonly height: number
  readonly tiles: string
  readonly heat: Float32Array
  readonly fuel: Float32Array
  readonly originalFuel: Float32Array
  readonly smoke: Float32Array
  readonly wet: Float32Array
  readonly kind: FireKind[]
  readonly doors = new Set<number>()
  readonly neighbors: number[][]
  private readonly nextHeat: Float32Array
  private readonly nextSmoke: Float32Array
  power = true
  gas = true
  vent = 0
  lastFlare = 0

  constructor(call: Call, seed: number, readonly spread: number) {
    this.width = call.map[0].length
    this.height = call.map.length
    this.tiles = call.map.join('')
    const size = this.tiles.length
    this.heat = new Float32Array(size)
    this.fuel = new Float32Array(size)
    this.smoke = new Float32Array(size)
    this.wet = new Float32Array(size)
    this.nextHeat = new Float32Array(size)
    this.nextSmoke = new Float32Array(size)
    this.kind = Array.from({ length: size }, () => 'solid')
    const random = seeded(seed)
    this.neighbors = Array.from(this.tiles, (tile, i) => {
      const { x, z } = this.center(i)
      if (tile === '.') this.fuel[i] = .25 + random() * .5
      return [[x - 1, z], [x + 1, z], [x, z - 1], [x, z + 1]]
        .map(([col, row]) => this.index(col, row)).filter(n => n >= 0 && this.tiles[n] !== '#')
    })
    for (const prop of call.props) this.fuel[this.index(...prop.at)] = 1
    for (const fire of call.fires) this.ignite(this.index(...fire.at), fire.kind, fire.heat)
    this.originalFuel = this.fuel.slice()
  }

  center(i: number) { return { x: i % this.width + .5, z: Math.floor(i / this.width) + .5 } }
  index(x: number, z: number) {
    const col = Math.floor(x)
    const row = Math.floor(z)
    return col < 0 || col >= this.width || row < 0 || row >= this.height ? -1 : row * this.width + col
  }
  safe(i: number) { return this.tiles[i] === 's' }
  blocked(i: number) { return i < 0 || this.tiles[i] === '#' || (this.tiles[i] === 'D' && !this.doors.has(i)) }
  burning(i: number) { return this.heat[i] >= ignition && this.fuel[i] > .008 }
  isHazard(i: number) { return this.kind[i] === 'oil' || (this.kind[i] === 'electric' && this.power) }

  ignite(i: number, kind: FireKind, heat: number) {
    if (this.blocked(i) || this.safe(i)) return
    this.kind[i] = kind
    this.fuel[i] = Math.max(this.fuel[i], 1.12)
    this.heat[i] = heat
    this.smoke[i] = Math.max(this.smoke[i], .3)
  }

  water(i: number, amount: number) {
    if (this.blocked(i) || this.safe(i) || amount <= 0) return false
    if (this.isHazard(i) && this.burning(i)) {
      this.heat[i] = Math.min(1.8, this.heat[i] + amount * 1.5)
      this.smoke[i] = clamp(this.smoke[i] + amount * .6)
      this.lastFlare = 1.6
      for (const n of this.neighbors[i]) {
        if (!this.blocked(n) && !this.safe(n)) this.heat[n] = Math.min(1.4, this.heat[n] + amount * .22)
      }
      return true
    }
    this.heat[i] = Math.max(0, this.heat[i] - amount)
    this.wet[i] = clamp(this.wet[i] + amount * .85)
    return false
  }

  doorRisk(i: number) { return this.neighbors[i]?.some(n => this.heat[n] > .83 && this.smoke[n] > .53) ?? false }
  open(i: number) {
    if (this.tiles[i] !== 'D' || this.doors.has(i)) return false
    this.doors.add(i)
    for (const n of this.neighbors[i]) {
      if (this.heat[n] > .83 && this.smoke[n] > .53) {
        this.heat[n] = Math.min(1.8, this.heat[n] + .6)
        this.heat[i] = .52
        this.smoke[i] = .55
        this.lastFlare = 2
        return true
      }
    }
    return false
  }
  suppressOil() {
    for (let i = 0; i < this.kind.length; i++) {
      if (this.kind[i] !== 'oil') continue
      this.heat[i] = 0
      this.wet[i] = .9
      this.kind[i] = 'solid'
    }
  }

  step(dt: number) {
    this.lastFlare = Math.max(0, this.lastFlare - dt)
    for (let i = 0; i < this.heat.length; i++) {
      if (this.blocked(i) || this.safe(i)) continue
      const heat = this.heat[i]
      const smoke = this.smoke[i]
      this.wet[i] = Math.max(0, this.wet[i] - dt * .027)
      let conduction = 0
      let diffusion = 0
      let freshAir = 0
      for (const n of this.neighbors[i]) {
        if (this.blocked(n)) continue
        if (this.safe(n)) freshAir++
        conduction += Math.max(0, this.heat[n] - heat) * (this.burning(n) ? 1 : .13)
        diffusion += this.smoke[n] - smoke
      }
      const burning = this.burning(i)
      const draw = this.kind[i] === 'oil' && this.gas ? 1.32 : 1
      if (burning) this.fuel[i] = Math.max(0, this.fuel[i] - dt * (.009 + heat * .004))
      const cooling = burning ? .075 : .024 + heat * .024
      const growth = burning ? Math.max(0, 1.48 * draw - heat) * .27 : 0
      const transfer = conduction * .10 * this.spread * (1 - this.wet[i]) * (.56 + this.fuel[i] * .44)
      this.nextHeat[i] = clamp(heat + dt * (transfer + growth * this.spread - cooling - .045 * freshAir), 0, 1.8)
      this.nextSmoke[i] = clamp(smoke + dt * (
        (burning ? heat * .33 * (1 - smoke) : 0) + diffusion * .19 - smoke * (.027 + this.vent + freshAir * .22)
      ))
    }
    this.heat.set(this.nextHeat)
    this.smoke.set(this.nextSmoke)
  }

  count() {
    let sum = 0
    for (let i = 0; i < this.heat.length; i++) if (this.burning(i)) sum++
    return sum
  }

  property() {
    let original = 0
    let lost = 0
    for (let i = 0; i < this.fuel.length; i++) {
      original += this.originalFuel[i]
      lost += Math.max(0, this.originalFuel[i] - this.fuel[i]) + (this.burning(i) ? .72 : 0)
    }
    return Math.round(100 * (1 - clamp(lost / Math.max(1, original * .31))))
  }
}
