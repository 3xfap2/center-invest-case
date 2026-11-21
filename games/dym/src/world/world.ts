import * as T from 'three'
import { STEP, eyeHeight, type Input, type Round } from '../sim'
import { clearLine, distance } from '../sim/partner'
import { Effects } from './effects'
import { building, character, nozzle, stationBackdrop } from './models'
import { Sound } from './sound'

interface Hooks {
  update: () => void
  done: () => void
  paused: () => void
  pointer: (state: 'locked' | 'retry' | 'unlocked') => void
  gear: () => void
  failed: () => void
}

export class World {
  readonly sound = new Sound()
  readonly renderer: T.WebGLRenderer
  readonly camera = new T.PerspectiveCamera(69, 1, .028, 85)
  private scene: T.Scene
  private readonly menu = new T.Scene()
  private readonly menuEffects: Effects
  private readonly fieldEffects: Effects
  private readonly equipmentView = new T.Scene()
  private readonly equipmentCamera = new T.PerspectiveCamera(58, 1, .035, 3)
  private readonly hose = nozzle()
  private readonly responder = character('responder')
  private readonly lantern = new T.PointLight(0xffe5b5, 1.75, 7.3, 1.8)
  private doors = new Map<number, T.Group>()
  private victims: T.Group[] = []
  private markers: { id: string; position: T.Vector3; element: HTMLElement }[] = []
  private keys = new Set<string>()
  private round: Round | null = null
  private yaw = 0
  private pitch = 0
  private elapsed = 0
  private backlog = 0
  private frameId = 0
  private lastFrame = 0
  private quality = .88
  private qualityTime = 0
  private smoothedFrame = 1 / 60
  private lastUpdate = 0
  private lastNotice = ''
  private lastSaved = 0
  private lastPartner = new T.Vector2()
  private lockPending = false
  private lockRequired = true
  private drag = false
  private spray = false
  private active = false
  private frozen = false
  private observer: ResizeObserver
  private readonly listeners = new AbortController()

  constructor(private readonly canvas: HTMLCanvasElement, private readonly markerHost: HTMLElement, private readonly hooks: Hooks) {
    let context: WebGL2RenderingContext | null = null
    try { context = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'high-performance' }) } catch {}
    if (!context) throw new Error('WebGL 2 unavailable')
    this.renderer = new T.WebGLRenderer({ canvas, context, antialias: false })
    this.renderer.setPixelRatio(Math.min(1.2, devicePixelRatio || 1) * this.quality)
    this.renderer.toneMapping = T.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.14
    this.renderer.autoClear = false
    this.menu.background = new T.Color(0x283029)
    this.menu.fog = new T.FogExp2(0x3a4036, .048)
    this.menu.add(new T.HemisphereLight(0xa9bcb2, 0x544b3a, 2.0))
    stationBackdrop(this.menu)
    this.menuEffects = new Effects(this.renderer.getPixelRatio(), 0)
    this.fieldEffects = new Effects(this.renderer.getPixelRatio(), 2)
    this.menu.add(this.menuEffects.group)
    this.scene = this.menu
    this.equipmentView.add(new T.HemisphereLight(0xd5e4d7, 0x4d3a27, 2.8), this.hose)
    const cast = new T.DirectionalLight(0xffd19c, 2)
    cast.position.set(1, 2, -.3)
    this.equipmentView.add(cast)
    this.observer = new ResizeObserver(this.resize)
    this.observer.observe(canvas)
    this.resize()
    const options = { signal: this.listeners.signal }
    document.addEventListener('pointerlockchange', this.lockChanged, options)
    document.addEventListener('pointerlockerror', this.lockError, options)
    document.addEventListener('mousemove', this.mouseMoved, options)
    document.addEventListener('mouseup', this.mouseUp, options)
    document.addEventListener('keydown', this.keyDown, options)
    document.addEventListener('keyup', this.keyUp, options)
    window.addEventListener('blur', this.blur, options)
    this.canvas.addEventListener('mousedown', this.mouseDown, options)
    this.canvas.addEventListener('contextmenu', event => event.preventDefault(), options)
    this.canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); this.hooks.failed() }, options)
    this.frameId = requestAnimationFrame(this.frame)
  }

  private resize = () => {
    const size = this.canvas.getBoundingClientRect()
    const w = Math.max(1, size.width)
    const h = Math.max(1, size.height)
    this.renderer.setSize(w, h, false)
    this.camera.aspect = this.equipmentCamera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.equipmentCamera.updateProjectionMatrix()
  }

  setRound(round: Round) {
    if (this.scene !== this.menu) this.disposeRound()
    this.round = round
    this.yaw = round.call.face
    this.pitch = -.03
    this.lastNotice = ''
    this.lastSaved = 0
    this.scene = new T.Scene()
    this.scene.background = new T.Color(0x363c35)
    this.scene.fog = new T.FogExp2(0x343a34, .04)
    const ambient = new T.HemisphereLight(0xc4cbbb, 0x655849, 1.22)
    const fill = new T.DirectionalLight(0xe1c5a3, .48)
    fill.position.set(6, 10, 3)
    const { group, doors } = building(round)
    this.doors = doors
    this.scene.add(ambient, fill, group, this.lantern, this.fieldEffects.group, this.responder)
    this.lastPartner.set(round.partner.x, round.partner.z)
    this.responder.rotation.y = Math.PI
    this.victims = round.victims.map(v => {
      const model = character(v.name === 'Миша' ? 'child' : v.name === 'Мама Миши' ? 'mother' : 'victim')
      model.position.set(v.pos.x, .01, v.pos.z)
      model.scale.y *= .58
      model.rotation.y = 2.5
      this.scene.add(model)
      return model
    })
    const defs = [
      ...round.objectives.map(o => ({ id: o.id, text: ({ vent: 'Вентиляция', gas: 'Газ', agent: 'Плита', power: 'Щит', door: 'Дальняя комната', goods: 'Товар' })[o.kind], symbol: '◆', pos: o.pos, height: 1.21 })),
      ...round.victims.map(v => ({ id: v.id, text: v.name, symbol: '+', pos: v.pos, height: .88 })),
      { id: 'exit', text: 'Выход', symbol: '↗', pos: { x: round.entry.x, z: round.entry.z + .45 }, height: 1.67 },
      { id: 'partner', text: 'Лёша', symbol: '◇', pos: round.partner, height: 1.40 },
    ]
    this.markers = defs.map(({ id, text, symbol, pos, height }) => {
      const element = document.createElement('div')
      element.className = 'world-marker marker-' + (id.startsWith('victim') ? 'victim' : id)
      const icon = document.createElement('span')
      const label = document.createElement('b')
      icon.textContent = symbol
      label.textContent = text
      element.append(icon, label)
      this.markerHost.append(element)
      return { id, position: new T.Vector3(pos.x, height, pos.z), element }
    })
    this.backlog = 0
  }

  showStation() {
    if (this.scene === this.menu) return
    this.disposeRound()
    this.round = null
    this.scene = this.menu
  }

  private disposeRound() {
    this.scene.remove(this.fieldEffects.group, this.responder, this.lantern)
    this.scene.traverse(object => { if (object instanceof T.InstancedMesh) object.dispose() })
    this.scene.clear()
    this.markerHost.replaceChildren()
    this.markers = []
  }

  enter() {
    this.active = true
    this.frozen = false
    this.lockRequired = true
    this.clearInput()
    this.sound.wake()
    this.requestLock()
  }

  keyboard() {
    this.lockRequired = false
    this.lockPending = false
    this.hooks.pointer('locked')
  }

  stop() {
    this.active = false
    this.frozen = true
    this.clearInput()
    this.lockPending = false
    this.sound.frame(false, false, 1)
    if (document.pointerLockElement === this.canvas) document.exitPointerLock()
  }

  get canPlay() { return this.active && (!this.lockRequired || document.pointerLockElement === this.canvas) }

  requestLock() {
    if (!this.active || this.lockPending || document.pointerLockElement === this.canvas) return
    this.lockPending = true
    const frame = window.frameElement
    const sandboxed = frame instanceof HTMLIFrameElement && frame.hasAttribute('sandbox') && !frame.sandbox.contains('allow-pointer-lock')
    if (!this.canvas.requestPointerLock || sandboxed || navigator.userActivation?.isActive === false) {
      this.lockError()
      return
    }
    try {
      const result = this.canvas.requestPointerLock()
      if (result && typeof result.catch === 'function') void result.catch(this.lockError)
    } catch { this.lockError() }
  }

  private lockChanged = () => {
    this.lockPending = false
    if (!this.active) return
    if (document.pointerLockElement === this.canvas) this.hooks.pointer('locked')
    else if (this.lockRequired) {
      this.clearInput()
      this.hooks.paused()
    }
  }
  private lockError = () => {
    const pending = this.lockPending
    this.lockPending = false
    if (pending && this.active && this.lockRequired) this.hooks.pointer('retry')
  }
  private clearInput() {
    this.keys.clear()
    this.spray = this.drag = false
    this.backlog = 0
  }
  private blur = () => { if (this.active) this.hooks.paused() }
  private mouseDown = (e: MouseEvent) => {
    if (!this.active) return
    if (!this.canPlay) { this.requestLock(); return }
    if (e.button === 0) this.spray = true
    if (e.button === 2) this.drag = true
  }
  private mouseUp = (e: MouseEvent) => {
    if (e.button === 0) this.spray = false
    if (e.button === 2) this.drag = false
  }
  private mouseMoved = (e: MouseEvent) => {
    if (this.active && (document.pointerLockElement === this.canvas || (!this.lockRequired && this.drag))) {
      this.look(e.movementX * .0025, e.movementY * .0025)
    }
  }
  private look(dx: number, dy: number) {
    this.yaw -= dx
    this.pitch = T.MathUtils.clamp(this.pitch - dy, -1.2, 1.16)
  }
  private keyUp = (e: KeyboardEvent) => { this.keys.delete(e.code) }
  private keyDown = (e: KeyboardEvent) => {
    if (!this.active || !this.round || (e.target instanceof HTMLElement && /^(INPUT|BUTTON|SELECT)$/.test(e.target.tagName) && !this.canPlay)) return
    if (e.code === 'Escape') { e.preventDefault(); this.hooks.paused(); return }
    if (!this.canPlay) return
    const controls = ['KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight','KeyC','KeyE','KeyF','KeyB','KeyX',
      'Digit1','Digit2','Digit3','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space']
    if (!controls.includes(e.code)) return
    e.preventDefault()
    this.keys.add(e.code)
    if (e.repeat) return
    if (e.code === 'KeyF') this.round.toggleThermal()
    if (e.code === 'KeyB') this.hooks.gear()
    if (e.code === 'KeyX') this.round.withdraw()
    if (e.code === 'Digit1') this.round.order('follow')
    if (e.code === 'Digit2') this.round.order('hold')
    if (e.code === 'Digit3') this.round.order('cover')
  }

  private input(dt: number): Input {
    const has = (code: string) => Number(this.keys.has(code))
    this.look((has('ArrowRight') - has('ArrowLeft')) * dt * 1.65, (has('ArrowDown') - has('ArrowUp')) * dt * 1.45)
    return {
      x: has('KeyD') - has('KeyA'), z: has('KeyW') - has('KeyS'),
      sprint: this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'), crouch: this.keys.has('KeyC'),
      interact: this.keys.has('KeyE'), spray: this.spray || this.keys.has('Space'), yaw: this.yaw, pitch: this.pitch,
    }
  }

  private updateRound(dt: number) {
    const r = this.round!
    const camera = this.camera
    const stride = r.moving ? Math.sin(r.time * (r.crouch ? 9 : 12)) * .025 : 0
    camera.position.set(r.player.x, T.MathUtils.lerp(camera.position.y, eyeHeight(r.crouch) + stride, Math.min(1, dt * 17)), r.player.z)
    camera.rotation.set(this.pitch + r.recoil, this.yaw, r.spraying ? Math.sin(r.time * 38) * .012 : 0, 'YXZ')
    const fog = this.scene.fog as T.FogExp2
    fog.density = r.thermal ? .030 : .043 + r.visibility * .69
    fog.color.setHex(r.thermal ? 0x17252a : 0x343a34)
    this.lantern.position.set(r.player.x, camera.position.y, r.player.z)
    this.lantern.intensity = r.thermal ? 2.4 : 1.65
    this.responder.position.set(r.partner.x, .004, r.partner.z)
    const delta = new T.Vector2(r.partner.x, r.partner.z).sub(this.lastPartner)
    if (r.coverTarget) this.responder.rotation.y = Math.atan2(r.coverTarget.x - r.partner.x, r.coverTarget.z - r.partner.z)
    else if (delta.lengthSq() > .0001) this.responder.rotation.y = Math.atan2(delta.x, delta.y)
    this.lastPartner.set(r.partner.x, r.partner.z)
    this.doors.forEach((pivot, i) => {
      pivot.rotation.y = T.MathUtils.lerp(pivot.rotation.y, r.fire.doors.has(i) ? -Math.PI / 2 : 0, Math.min(1, dt * 9))
    })
    this.victims.forEach((model, i) => { model.visible = r.victims[i].state === 'waiting' })
    this.hose.visible = !r.carrying
    this.hose.position.set(.226 + stride * .52, -.178 + stride * .3, -.49 + r.recoil * .48)
    this.hose.rotation.set(.094 + r.recoil, -.095, -.08)
    this.fieldEffects.frame(r, this.yaw, this.pitch)
    camera.updateMatrixWorld()
    const direction = camera.getWorldDirection(new T.Vector3())
    for (const m of this.markers) {
      const at = m.position
      if (m.id === 'partner') { at.x = r.partner.x; at.z = r.partner.z }
      const v = r.victims.find(person => person.id === m.id)
      const o = r.objectives.find(goal => goal.id === m.id)
      const d = distance(r.player, at)
      const visible = this.active && this.canPlay && (at.x - r.player.x) * direction.x +
        (at.z - r.player.z) * direction.z > .12 && (!v || v.state === 'waiting') && (!o || !o.done) &&
        (m.id === 'exit' || m.id === 'partner' || r.hints || d < 2.7 || r.thermal) &&
        ((r.thermal && v && d < 7) || (d < 6.1 && clearLine(r.fire, r.player, at, m.id === 'exit' || o?.kind === 'door')))
      if (!visible) { m.element.hidden = true; continue }
      const p = at.clone().project(camera)
      m.element.hidden = p.z < -1 || p.z > 1 || Math.abs(p.x) > .93 || Math.abs(p.y) > .87
      m.element.style.left = ((p.x + 1) * 50) + '%'
      m.element.style.top = ((1 - p.y) * 50) + '%'
    }
  }

  private adjustResolution(dt: number) {
    this.smoothedFrame = T.MathUtils.lerp(this.smoothedFrame, dt, .12)
    this.qualityTime += dt
    if (this.qualityTime < 1.25) return
    this.qualityTime = 0
    const adjustment = this.smoothedFrame > .023 ? -.15 : this.smoothedFrame < .0175 ? .045 : 0
    const next = T.MathUtils.clamp(this.quality + adjustment, .43, .96)
    if (next === this.quality) return
    this.quality = next
    const ratio = Math.min(1.2, devicePixelRatio || 1) * this.quality
    this.renderer.setPixelRatio(ratio)
    this.menuEffects.setPixelRatio(ratio)
    this.fieldEffects.setPixelRatio(ratio)
  }

  private frame = (now: number) => {
    this.frameId = requestAnimationFrame(this.frame)
    const dt = Math.min(.6, (now - (this.lastFrame || now)) / 1000)
    this.lastFrame = now
    this.elapsed += dt
    this.adjustResolution(dt)
    const r = this.round
    if (!r) {
      this.camera.position.set(1.2 + Math.sin(this.elapsed * .12) * .13, 1.58, 9.26)
      this.camera.lookAt(2.18, 1.62, 0.8)
      this.menuEffects.frameMenu(this.elapsed)
    } else {
      if (this.canPlay && !this.frozen) {
        const input = this.input(dt)
        this.backlog += dt
        while (this.backlog >= STEP && !r.result) {
          r.step(input)
          this.backlog -= STEP
        }
        if (r.notice !== this.lastNotice && r.noticeClock > 0) {
          this.lastNotice = r.notice
          this.sound.cue(r.saved > this.lastSaved ? 'rescue' : 'radio')
          this.lastSaved = r.saved
        }
        if (r.result) { this.stop(); this.hooks.done() }
      }
      if (this.active || !this.frozen) this.updateRound(dt)
      this.sound.frame(r.spraying, this.canPlay && !r.safe(), r.air / r.maxAir)
      if (now - this.lastUpdate >= 70 && this.active) {
        this.lastUpdate = now
        this.hooks.update()
      }
    }
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)
    if (r && this.active && this.canPlay) {
      this.renderer.clearDepth()
      this.renderer.render(this.equipmentView, this.equipmentCamera)
    }
  }

  dispose() {
    this.stop()
    cancelAnimationFrame(this.frameId)
    this.observer.disconnect()
    this.listeners.abort()
    if (this.scene !== this.menu) this.disposeRound()
    this.renderer.dispose()
  }
}
