import * as T from 'three'
import { seeded } from '../sim/fire'
import { shotPoint, eyeHeight, type Round } from '../sim'

const pointVertex = `
attribute float opacity;
attribute float size;
varying vec3 tint;
varying float strength;
uniform float pixelRatio;
void main() {
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = clamp(size * pixelRatio / max(.55, -view.z), 1., 180.);
  tint = color;
  strength = opacity;
}
`
const pointFragment = `
varying vec3 tint;
varying float strength;
uniform float core;
void main() {
  float radius = length(gl_PointCoord - .5) * 2.;
  float fade = pow(max(0., 1. - radius), core) * strength;
  if (fade < .008) discard;
  gl_FragColor = vec4(tint, fade);
  #include <colorspace_fragment>
}
`

class Particles {
  readonly points: T.Points
  private readonly position: T.BufferAttribute
  private readonly color: T.BufferAttribute
  private readonly opacity: T.BufferAttribute
  private readonly size: T.BufferAttribute
  private cursor = 0

  constructor(private readonly limit: number, additive: boolean, core: number, pixelRatio: number) {
    const space = new T.BufferGeometry()
    const attr = (name: string, count: number) => {
      const values = new T.BufferAttribute(new Float32Array(limit * count), count).setUsage(T.DynamicDrawUsage)
      space.setAttribute(name, values)
      return values
    }
    this.position = attr('position', 3)
    this.color = attr('color', 3)
    this.opacity = attr('opacity', 1)
    this.size = attr('size', 1)
    this.points = new T.Points(space, new T.ShaderMaterial({
      uniforms: { pixelRatio: { value: pixelRatio }, core: { value: core } },
      vertexShader: pointVertex, fragmentShader: pointFragment, vertexColors: true, depthWrite: false,
      transparent: true, blending: additive ? T.AdditiveBlending : T.NormalBlending,
    }))
    this.points.frustumCulled = false
    this.points.renderOrder = additive ? 4 : 2
  }
  add(x: number, y: number, z: number, size: number, opacity: number, color: T.Color) {
    if (this.cursor >= this.limit) return
    const i = this.cursor++
    this.position.setXYZ(i, x, y, z)
    this.size.setX(i, size)
    this.opacity.setX(i, opacity)
    this.color.setXYZ(i, color.r, color.g, color.b)
  }
  setPixelRatio(ratio: number) { (this.points.material as T.ShaderMaterial).uniforms.pixelRatio.value = ratio }
  flush() {
    this.points.geometry.setDrawRange(0, this.cursor)
    this.cursor = 0
    this.position.needsUpdate = this.size.needsUpdate = this.opacity.needsUpdate = this.color.needsUpdate = true
  }
}

export class Effects {
  readonly group = new T.Group()
  private readonly flame: T.InstancedMesh
  private readonly mist: Particles
  private readonly sparks: Particles
  private readonly water: Particles
  private readonly dummy = new T.Object3D()
  private readonly shades = [new T.Color(0xce4a1d), new T.Color(0xfa8a27), new T.Color(0xffd071)]
  private readonly smokeColor = new T.Color(0x292d29)
  private readonly sparkColor = new T.Color(0xffa759)
  private readonly sprayColor = new T.Color(0x9cdccd)
  private readonly seeds = new Float32Array(1280)
  private readonly lights: T.PointLight[]

  constructor(pixelRatio: number, lightCount: number) {
    const random = seeded(312789)
    this.seeds.forEach((_, i) => { this.seeds[i] = random() })
    const geo = new T.ConeGeometry(.23, 1, 4, 1)
    this.flame = new T.InstancedMesh(geo, new T.MeshBasicMaterial({ toneMapped: false }), 256)
    this.flame.frustumCulled = false
    this.flame.instanceMatrix.setUsage(T.DynamicDrawUsage)
    this.mist = new Particles(340, false, 1.55, pixelRatio)
    this.sparks = new Particles(330, true, 1.42, pixelRatio)
    this.water = new Particles(370, true, 1.35, pixelRatio)
    this.lights = Array.from({ length: lightCount }, () => new T.PointLight(0xff7632, 0, 4.9, 2))
    this.group.add(this.flame, this.mist.points, this.sparks.points, this.water.points, ...this.lights)
  }

  setPixelRatio(ratio: number) {
    for (const item of [this.mist, this.sparks, this.water]) item.setPixelRatio(ratio)
  }

  frameMenu(t: number) {
    this.flame.count = 0
    for (let i = 0; i < 70; i++) {
      const f = this.seeds[i]
      const rise = (t * (.14 + f * .1) + f * 9) % 1
      const x = this.seeds[i + 70] * 16 - 3
      const z = this.seeds[i + 140] * 6
      this.mist.add(x + rise, .55 + rise * 4.5, z, 700 + f * 390, .15 * Math.sin(rise * Math.PI), this.smokeColor)
      if (i < 32 && x > 1) this.sparks.add(x, .15 + rise * 4.4, z, 12 + f * 16,
        .7 * Math.sin(rise * Math.PI), this.sparkColor)
    }
    this.flush()
  }

  frame(r: Round, yaw: number, pitch: number) {
    const { fire, time } = r
    let count = 0
    const lights: { x: number; z: number; heat: number; distance: number }[] = []
    for (let i = 0; i < fire.heat.length; i++) {
      const smoke = fire.smoke[i]
      const burning = fire.burning(i)
      if (smoke < .055 && !burning) continue
      const { x, z } = fire.center(i)
      const range = Math.hypot(x - r.player.x, z - r.player.z)
      if (range > 12) continue
      const phase = this.seeds[i % this.seeds.length]
      if (burning) {
        const heat = fire.heat[i]
        lights.push({ x, z, heat, distance: range })
        for (let part = 0; part < 5 && count < 256; part++) {
          const angle = phase * 21 + part * 2.43
          const noise = Math.sin(time * (9 + part) + angle) * .5 + .5
          const size = (.28 + noise * .32 + (part % 3) * .07) * heat
          const scale = part > 1 ? .65 : 1
          this.dummy.position.set(x + Math.cos(angle) * .16, size * .52 + .055, z + Math.sin(angle) * .16)
          this.dummy.rotation.set((noise - .5) * .5, angle, Math.sin(angle + time * 6) * .18)
          this.dummy.scale.set(scale, size, scale)
          this.dummy.updateMatrix()
          this.flame.setMatrixAt(count, this.dummy.matrix)
          this.flame.setColorAt(count++, this.shades[part === 0 ? 0 : part < 4 ? 1 : 2])
        }
        for (let spark = 0; spark < 8; spark++) {
          const t = (time * (.49 + spark * .016) + phase + spark * .19) % 1
          this.sparks.add(x + t * Math.sin(spark * 4 + time) * .46, .23 + t * 1.64,
            z + t * Math.cos(spark + time) * .34, 5 + (1 - t) * 13, (1 - t) * .93, this.sparkColor)
        }
        this.sparks.add(x, .29, z, 225, .41, this.sparkColor)
      }
      if (!r.thermal) for (let puff = 0; puff < 3; puff++) {
        const drift = (time * .20 + phase + puff * .24) % 1
        const y = Math.max(.24, 1.82 - smoke * (1.08 + puff * .26) + drift * .26)
        this.mist.add(x + Math.sin(drift * 6 + puff) * .35, y, z + Math.cos(drift * 6 + puff) * .29,
          310 + smoke * 265, smoke * .61 * Math.sin(drift * Math.PI), this.smokeColor)
      }
    }
    this.flame.count = count
    this.flame.instanceMatrix.needsUpdate = true
    if (this.flame.instanceColor) this.flame.instanceColor.needsUpdate = true
    lights.sort((a, b) => a.distance - b.distance)
    this.lights.forEach((light, i) => {
      const nearest = lights[i]
      light.intensity = nearest ? nearest.heat * (3.6 + Math.sin(time * 8 + i * 9) * .88) : 0
      if (nearest) light.position.set(nearest.x, .5, nearest.z)
    })
    if (r.aim) {
      const origin = { ...r.player, y: eyeHeight(r.crouch) - .07 }
      const length = Math.hypot(r.aim.x - origin.x, r.aim.z - origin.z) / Math.max(.36, Math.cos(pitch))
      const streams = r.sprayWide ? 3 : 1
      for (let i = 0; i < 110; i++) {
        const t = (this.seeds[i] + time * (1.7 + this.seeds[120 + i] * 1.1)) % 1
        const wobble = (this.seeds[240 + i] - .5) * (r.sprayWide ? .46 : .11) * t
        const at = shotPoint(origin, yaw + wobble + (streams === 3 ? ((i % 3) - 1) * .09 : 0),
          pitch + r.recoil * .55, Math.max(.25, length * t))
        this.water.add(at.x + Math.cos(yaw) * (1 - t) * .22, at.y - (1 - t) * .15, at.z - Math.sin(yaw) * (1 - t) * .22,
          4 + this.seeds[i] * 8, .75, this.sprayColor)
      }
      for (let i = 0; i < 20; i++) {
        const t = (time * 1.9 + this.seeds[i]) % 1
        this.water.add(r.aim.x + t * Math.cos(i * 1.7) * .55, Math.max(.06, r.aim.y) + t * .46 - t * t * .32,
          r.aim.z + t * Math.sin(i * 2.6) * .55, 8 + t * 14, (1 - t) * .67, this.sprayColor)
      }
    }
    if (r.crew.coverTarget) {
      const { x, z } = r.crew.coverTarget
      for (let i = 0; i < 37; i++) {
        const t = (time * 1.85 + this.seeds[130 + i]) % 1
        const spread = r.crew.sprayWide ? t * (this.seeds[210 + i] - .5) * .52 : 0
        this.water.add(T.MathUtils.lerp(r.partner.x, x, t) + spread, .82 - .64 * t * t,
          T.MathUtils.lerp(r.partner.z, z, t) + spread, 7, .72, this.sprayColor)
      }
    }
    this.flush()
  }

  private flush() { this.mist.flush(); this.sparks.flush(); this.water.flush() }
}
