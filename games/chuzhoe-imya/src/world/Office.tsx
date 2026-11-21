import { isTouchDevice } from '../touch/TouchPad'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as T from 'three'
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'
import type { Card, CaseSave } from '../case'
import { createPeople } from './people'
import { basementBounds, basementLevel, basementSpawn, createFloor, officeBounds, spawn, type Carry, type Floor, type Place, type Surface } from './floor'
import { createNavigation, type FloorPoint } from './navigation'

type Rectangle = { left: number; top: number; width: number; height: number }
type Focus = Place | 'report' | null
type Look = { id: Place; label: string } | null
export type RouteCue = { angle: number; meters: number }

export type OfficeHandle = {
  capture: () => void
  release: () => void
  approach: (id: Place) => void
}

type OfficeProps = {
  active: boolean
  basement: boolean
  step: number
  colleagueSpeaking: boolean
  visible: boolean
  focus: Focus
  eligible: Partial<Record<Place, string>>
  destination?: Place
  ringing: boolean
  printed: boolean
  carry: Carry
  cards: Card[]
  links: CaseSave['links']
  pinned: boolean
  selectedCard?: string
  hintCard?: string
  onAim: (target: Look) => void
  onInteract: (id: Place) => void
  onCard: (card: string) => void
  onCardHover: (card?: string) => void
  onLostCapture: () => void
  onLockStatus: (locked: boolean) => void
  onFallback: (active: boolean) => void
  onScreen: (rect: Rectangle | null) => void
  onMarker: (point: RouteCue | null) => void
  onFootstep: (surface: Surface, fast: boolean) => void
}

type Controls = { capture: () => void; release: () => void; approach: (id: Place) => void; sync: () => void }
const moveKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])
const up = new T.Vector3(0, 1, 0)

function disposeTree(root: T.Object3D) {
  const mats = new Set<T.Material>()
  root.traverse(object => {
    if (!(object instanceof T.Mesh || object instanceof T.LineSegments)) return
    object.geometry.dispose()
    ;[object.material].flat().forEach(material => mats.add(material))
  })
  mats.forEach(material => {
    if ('map' in material && material.map instanceof T.Texture) material.map.dispose()
    material.dispose()
  })
}

function physicalBoard(floor: Floor) {
  const notes = new Map<string, T.Mesh<T.PlaneGeometry, T.MeshBasicMaterial>>()
  let signature = ''
  const mark = new T.MeshStandardMaterial({ color: '#ae263b', emissive: '#68172b', emissiveIntensity: .7, roughness: .9 })
  const pins = new T.MeshStandardMaterial({ color: '#b63e42', emissive: '#772d33', emissiveIntensity: .22 })
  const build = (cards: Card[], links: CaseSave['links'], selected?: string, hint?: string) => {
    const key = cards.map(card => card.id).join(',') + '|' + links.map(link => link.a + ':' + link.b).join(',')
    if (key !== signature) {
      signature = key
      for (const child of [...floor.boardNotes.children]) {
        child.removeFromParent()
        if (child instanceof T.Mesh && child.material === pins) child.geometry.dispose()
        else if (child instanceof T.Mesh && child.material === mark) child.geometry.dispose()
        else disposeTree(child)
      }
      notes.clear()
      cards.forEach((card, index) => {
        const ink = floor.texture(304, 160, ctx => {
          ctx.fillStyle = ['#e0c7a4', '#bcd0c9', '#d1c5d7', '#dfd1ad'][index % 4]
          ctx.fillRect(0, 0, 304, 160)
          ctx.fillStyle = '#423b43'
          ctx.font = 'bold 24px system-ui'
          ctx.fillText(card.title, 16, 68, 269)
          ctx.fillStyle = '#65535b'
          ctx.font = '20px system-ui'
          ctx.fillText(card.type.toUpperCase(), 16, 38, 210)
          ctx.font = '17px system-ui'
          ctx.fillText(card.stamp, 16, 103, 270)
          ctx.fillStyle = '#7d6262'
          ctx.fillRect(17, 124, 95, 3)
        })
        const note = new T.Mesh(new T.PlaneGeometry(.79, .33), new T.MeshBasicMaterial({ map: ink }))
        note.position.set((index % 4 - 1.5) * .93, .76 - Math.floor(index / 4) * .466, .015)
        note.rotation.z = Math.sin(index * 5 + .1) * .07
        note.userData.clue = card.id
        floor.boardNotes.add(note)
        notes.set(card.id, note)
        const pin = new T.Mesh(new T.SphereGeometry(.024, 6, 5), pins)
        pin.position.set(note.position.x, note.position.y + .138, .044)
        floor.boardNotes.add(pin)
      })
      for (const link of links) {
        const a = notes.get(link.a)?.position
        const b = notes.get(link.b)?.position
        if (!a || !b) continue
        const start = new T.Vector3(a.x, a.y + .138, .058)
        const end = new T.Vector3(b.x, b.y + .138, .058)
        const mid = start.clone().lerp(end, .5)
        mid.y -= .045
        mid.z += .038
        const curve = new T.QuadraticBezierCurve3(start, mid, end)
        const thread = new T.Mesh(new T.TubeGeometry(curve, 9, .010, 5, false), mark)
        floor.boardNotes.add(thread)
      }
    }
    for (const [id, note] of notes) {
      note.material.color.set(id === selected ? '#ffb978' : id === hint ? '#ffdf78' : '#ffffff')
      note.scale.setScalar(id === hint && id !== selected ? 1.065 : 1)
    }
  }
  return { build, notes }
}

export const Office = forwardRef<OfficeHandle, OfficeProps>(function Office(props, forwardedRef) {
  const container = useRef<HTMLDivElement>(null)
  const runtime = useRef<Controls>(null)
  const live = useRef(props)
  live.current = props
  useImperativeHandle(forwardedRef, () => ({
    capture: () => runtime.current?.capture(),
    release: () => runtime.current?.release(),
    approach: id => runtime.current?.approach(id),
  }), [])

  useEffect(() => {
    const host = container.current!
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { antialias: true, alpha: false, powerPreference: 'low-power' })
    if (!context) {
      live.current.onFallback(true)
      return
    }
    const renderer = new T.WebGLRenderer({ canvas, context, antialias: true })
    const rendererInfo = context.getExtension('WEBGL_debug_renderer_info')
    const graphics = rendererInfo ? String(context.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL)) : ''
    const software = /swiftshader|llvmpipe|software|basic render/i.test(graphics)
    renderer.setPixelRatio(software ? .67 : Math.min(devicePixelRatio || 1, 1.35))
    renderer.toneMapping = T.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.13
    canvas.setAttribute('aria-label', 'Трёхмерный этаж банка')
    host.prepend(canvas)
    const camera = new T.PerspectiveCamera(56, 1, .065, 92)
    camera.position.copy(spawn)
    camera.lookAt(.81, 1.0, 3.51)
    const floor = createFloor(camera)
    const guides = [createNavigation(officeBounds, floor.canStand), createNavigation(basementBounds, floor.canStand)]
    const silhouette = new T.Shape()
    silhouette.moveTo(0, .35)
    silhouette.lineTo(.28, -.03)
    silhouette.lineTo(.19, -.12)
    silhouette.lineTo(0, .115)
    silhouette.lineTo(-.19, -.12)
    silhouette.lineTo(-.28, -.03)
    silhouette.closePath()
    const arrow = new T.ShapeGeometry(silhouette).rotateX(-Math.PI / 2)
    const arrows = new T.InstancedMesh(arrow, new T.MeshBasicMaterial({
      color: '#38efbf', transparent: true, opacity: .85, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -1,
    }), 24)
    arrows.count = 0
    arrows.frustumCulled = false
    floor.scene.add(arrows)
    const arrowPose = new T.Object3D()
    let basement = false
    let route: FloorPoint[] = []
    let routeSource: FloorPoint | undefined
    let routeTarget: Place | undefined
    let routeBuilt = 0
    const board = physicalBoard(floor)
    let people: Awaited<ReturnType<typeof createPeople>> | undefined
    let disposed = false
    void createPeople(floor.scene).then(result => {
      if (disposed) {
        for (const actor of floor.scene.children.filter(child => child.name.startsWith('character:'))) {
          actor.removeFromParent()
          disposeTree(actor)
        }
        return
      }
      people = result
      canvas.dataset.characters = String(result.count)
    }).catch(() => { canvas.dataset.characters = '0' })
    const controls = new PointerLockControls(camera, canvas)
    controls.pointerSpeed = .76
    controls.minPolarAngle = .43
    controls.maxPolarAngle = Math.PI - .43

    const pressed = new Set<string>()
    const aimRay = new T.Raycaster()
    aimRay.far = 2
    const pointerRay = new T.Raycaster()
    const direction = new T.Vector3()
    const right = new T.Vector3()
    const moving = new T.Vector3()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const viewRotation = new T.Euler(0, 0, 0, 'YXZ')
    let fallback = false
    let usingDrag = false
    let lastX = 0
    let lastY = 0
    let requestedRelease = false
    let lastTime = 0
    let lastDraw = 0
    let frame = 0
    let movementPhase = 0
    let footAt = 0
    let gaze: Look = null
    let focusMode: Focus = null
    let originalView: { position: T.Vector3; rotation: T.Quaternion } | undefined
    let marker = ''
    let markerUpdate = 0
    let chosenHover: string | undefined

    const release = () => {
      pressed.clear()
      usingDrag = false
      if (controls.isLocked || document.pointerLockElement === canvas) {
        requestedRelease = true
        controls.unlock()
      }
    }
    const activateFallback = () => {
      if (fallback) return
      fallback = true
      live.current.onFallback(true)
    }
    const onUnlock = () => {
      pressed.clear()
      live.current.onLockStatus(false)
      if (requestedRelease) { requestedRelease = false; return }
      if (live.current.active) live.current.onLostCapture()
    }
    controls.addEventListener('unlock', onUnlock)
    controls.addEventListener('lock', () => {
      live.current.onLockStatus(true)
      if (fallback) { fallback = false; live.current.onFallback(false) }
    })
    document.addEventListener('pointerlockerror', activateFallback)

    const showScreen = () => {
      const screen = focusMode ? floor.screens[focusMode as Place] : undefined
      if (!screen) { live.current.onScreen(null); return }
      camera.updateMatrixWorld(true)
      const tl = screen.center.clone().add(new T.Vector3(-screen.width / 2, screen.height / 2, .005)).project(camera)
      const br = screen.center.clone().add(new T.Vector3(screen.width / 2, -screen.height / 2, .005)).project(camera)
      live.current.onScreen({ left: (tl.x + 1) * 50, top: (1 - tl.y) * 50, width: (br.x - tl.x) * 50, height: (tl.y - br.y) * 50 })
    }
    const composeFocus = (focus: Focus) => {
      const screen = focus ? floor.screens[focus as Place] : undefined
      if (screen) {
        const ratio = Math.min(.78, .86 * camera.aspect * screen.height / screen.width)
        camera.position.copy(screen.center).add(new T.Vector3(0, 0, screen.height / (2 * ratio * Math.tan(T.MathUtils.degToRad(camera.fov / 2)))))
        camera.lookAt(screen.center)
      } else if (focus === 'board') {
        const boardHeight = Math.max(2.65, 4.27 / camera.aspect)
        const dist = (boardHeight / 2) / Math.tan(T.MathUtils.degToRad(camera.fov / 2))
        camera.position.set(7.23, 1.70, 4.554 + dist)
        camera.lookAt(7.23, 1.70, 4.54)
      } else if (focus === 'report') {
        camera.position.set(-8.52, 1.57, -2.29)
        camera.lookAt(-7.14, 1.52, -4.61)
      } else if (focus === 'maria') {
        camera.lookAt(-8.16, 1.59, -4.61)
      } else if (focus === 'danya') {
        camera.lookAt(-5.45, 1.35, 6.1)
      }
      showScreen()
    }

    const setFocus = (next: Focus) => {
      if (focusMode === next) return
      if (next && !focusMode) originalView = { position: camera.position.clone(), rotation: camera.quaternion.clone() }
      if (!next && originalView) {
        camera.position.copy(originalView.position)
        camera.quaternion.copy(originalView.rotation)
        originalView = undefined
      }
      focusMode = next
      if (next) release()
      composeFocus(next)
    }

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight, false)
      if (focusMode) composeFocus(focusMode)
      renderer.render(floor.scene, camera)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)

    const capture = () => {
      requestedRelease = false
      if (fallback || controls.isLocked || !canvas.isConnected) return
      // Phones and tablets have no mouse to capture: use the drag-to-look mode at once.
      if (isTouchDevice()) { activateFallback(); return }
      try {
        // Promise rejection is reported as a pointerlockerror on browsers that deny iframe capture.
        const result = canvas.requestPointerLock() as unknown
        if (result instanceof Promise) void result.catch(activateFallback)
      } catch {
        activateFallback()
      }
    }

    const approach = (id: Place) => {
      const pose = floor.targets.find(item => item.id === id)
      if (!pose) return
      camera.position.copy(pose.stand)
      camera.lookAt(pose.aim)
      camera.updateMatrixWorld(true)
      if (focusMode) {
        originalView = { position: camera.position.clone(), rotation: camera.quaternion.clone() }
        composeFocus(focusMode)
      }
    }

    const getAim = () => {
      camera.updateMatrixWorld(true)
      aimRay.setFromCamera({ x: 0, y: 0 } as T.Vector2, camera)
      const candidates = floor.targets.filter(item => item.id in live.current.eligible)
      const hit = aimRay.intersectObjects(candidates.map(item => item.mesh), false)[0]
      return hit ? candidates.find(item => item.mesh === hit.object) : undefined
    }

    const keyDown = (event: KeyboardEvent) => {
      if (!live.current.active || (!controls.isLocked && !fallback)) return
      if (moveKeys.has(event.code)) {
        event.preventDefault()
        pressed.add(event.code)
      }
      if (event.code === 'KeyE' && !event.repeat) {
        event.preventDefault()
        const item = getAim()
        if (item) live.current.onInteract(item.id)
      }
    }
    const keyUp = (event: KeyboardEvent) => { pressed.delete(event.code) }
    const blur = () => { pressed.clear(); usingDrag = false }

    const noteAt = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      pointerRay.setFromCamera(new T.Vector2((event.clientX - box.x) / box.width * 2 - 1, 1 - (event.clientY - box.y) / box.height * 2), camera)
      return pointerRay.intersectObjects([...board.notes.values()], false)[0]?.object.userData.clue as string | undefined
    }
    const pointerDown = (event: PointerEvent) => {
      if (focusMode === 'board' && event.button === 0) {
        const card = noteAt(event)
        if (card) live.current.onCard(card)
      } else if (fallback && live.current.active && event.button === 0) {
        usingDrag = true
        lastX = event.clientX
        lastY = event.clientY
        canvas.setPointerCapture(event.pointerId)
      }
    }
    const pointerMove = (event: PointerEvent) => {
      if (focusMode === 'board') {
        const note = noteAt(event)
        if (note !== chosenHover) { chosenHover = note; live.current.onCardHover(note) }
      } else if (usingDrag) {
        viewRotation.setFromQuaternion(camera.quaternion)
        viewRotation.y -= (event.clientX - lastX) * .003
        viewRotation.x = T.MathUtils.clamp(viewRotation.x - (event.clientY - lastY) * .003, -1.15, 1.15)
        camera.quaternion.setFromEuler(viewRotation)
        lastX = event.clientX
        lastY = event.clientY
      }
    }
    const pointerUp = () => { usingDrag = false }
    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)
    window.addEventListener('blur', blur)
    canvas.addEventListener('pointerdown', pointerDown)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerup', pointerUp)
    canvas.addEventListener('pointercancel', pointerUp)

    const sync = () => {
      if (live.current.basement !== basement) {
        setFocus(null)
        basement = live.current.basement
        route = []
        routeSource = undefined
        arrows.count = 0
        camera.position.copy(basement ? basementSpawn : spawn)
        if (basement) camera.lookAt(37.7, basementLevel + 1.4, -.9)
        else camera.lookAt(.81, 1.0, 3.51)
      }
      setFocus(live.current.focus)
      board.build(live.current.pinned ? live.current.cards : [], live.current.links, live.current.selectedCard, live.current.hintCard)
      floor.printed.visible = live.current.printed
      floor.hands.visible = Boolean(live.current.carry)
      for (const [kind, object] of Object.entries(floor.carried)) object.visible = live.current.carry === kind
      if (!live.current.active) pressed.clear()
      if (focusMode !== 'board') chosenHover = undefined
      canvas.style.cursor = focusMode === 'board' ? 'crosshair' : fallback ? 'grab' : ''
    }
    runtime.current = { capture, release, approach, sync }
    sync()

    const walk = (delta: number) => {
      const forward = Number(pressed.has('KeyW') || pressed.has('ArrowUp')) - Number(pressed.has('KeyS') || pressed.has('ArrowDown'))
      const side = Number(pressed.has('KeyD') || pressed.has('ArrowRight')) - Number(pressed.has('KeyA') || pressed.has('ArrowLeft'))
      if (!forward && !side) {
        camera.position.y = T.MathUtils.lerp(camera.position.y, basement ? basementSpawn.y : spawn.y, delta * 12)
        movementPhase = 0
        footAt = 0
        return
      }
      const fast = pressed.has('ShiftLeft') || pressed.has('ShiftRight')
      camera.getWorldDirection(direction)
      direction.y = 0
      direction.normalize()
      right.crossVectors(direction, up)
      moving.copy(direction).multiplyScalar(forward).addScaledVector(right, side).normalize()
      moving.multiplyScalar(delta * (fast ? 4.62 : 2.59))
      const { x, z } = camera.position
      if (floor.canStand(x + moving.x, z)) camera.position.x += moving.x
      if (floor.canStand(camera.position.x, z + moving.z)) camera.position.z += moving.z
      const distance = Math.hypot(camera.position.x - x, camera.position.z - z)
      if (distance > .0009) {
        movementPhase += distance * 8.2
        footAt += distance
        if (!reduced) camera.position.y = (basement ? basementSpawn.y : spawn.y) + Math.cos(movementPhase) * (fast ? .047 : .031)
        if (footAt > (fast ? .91 : .63)) {
          footAt = 0
          live.current.onFootstep(floor.surfaceAt(camera.position.x, camera.position.z), fast)
        }
      }
    }

    const guide = (id: Place, now: number): RouteCue | null => {
      const target = floor.targets.find(item => item.id === id)
      if (!target) return null
      const { x, z } = camera.position
      if (routeTarget !== id || !routeSource
        || (now - routeBuilt > 315 && Math.hypot(x - routeSource.x, z - routeSource.z) >= .65)) {
        routeTarget = id
        routeSource = { x, z }
        routeBuilt = now
        route = guides[Number(basement)](routeSource, target.stand)
        const y = (basement ? basementLevel : 0) + .037
        let index = 0
        for (let i = 1; i < route.length && index < 24; i++) {
          const start = route[i - 1]
          const next = route[i]
          const dx = next.x - start.x
          const dz = next.z - start.z
          const length = Math.hypot(dx, dz)
          for (let d = i === 1 ? .95 : .35; d < length && index < 24; d += 1.22) {
            arrowPose.position.set(start.x + dx * d / length, y, start.z + dz * d / length)
            arrowPose.rotation.y = Math.atan2(-dx, -dz)
            arrowPose.updateMatrix()
            arrows.setMatrixAt(index++, arrowPose.matrix)
          }
        }
        arrows.count = index
        arrows.instanceMatrix.needsUpdate = true
      }
      const points = route.slice(1)
      while (points.length > 1 && Math.hypot(points[0].x - x, points[0].z - z) < .52) points.shift()
      const first = points[0] ?? target.stand
      const dx = first.x - x
      const dz = first.z - z
      camera.getWorldDirection(direction)
      const bearing = Math.atan2(dx, -dz) - Math.atan2(direction.x, -direction.z)
      const angle = Math.round(Math.atan2(Math.sin(bearing), Math.cos(bearing)) * 180 / Math.PI)
      let distance = Math.hypot(dx, dz)
      for (let i = 1; i < points.length; i++) distance += Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z)
      return { angle, meters: Math.round(distance) }
    }

    const animate = (now: number) => {
      const delta = Math.min(Math.max((now - lastTime) / 1000, 0), .045)
      lastTime = now
      frame = requestAnimationFrame(animate)
      const state = live.current
      if (!state.visible) return
      const roaming = state.active && (controls.isLocked || fallback)
      if (roaming) walk(delta)
      const item = roaming ? getAim() : undefined
      const label = item ? state.eligible[item.id] || item.label : undefined
      if (gaze?.id !== item?.id || gaze?.label !== label) {
        gaze = item ? { id: item.id, label: label! } : null
        state.onAim(gaze)
      }
      if (now - markerUpdate > 85) {
        markerUpdate = now
        const next = roaming && gaze?.id !== state.destination ? state.destination : undefined
        const point = next ? guide(next, now) : null
        if (!next) {
          arrows.count = 0
          routeTarget = undefined
        }
        const key = point ? point.angle + ':' + point.meters : ''
        if (key !== marker) {
          marker = key
          state.onMarker(point)
        }
      }
      const drawEvery = software ? (state.active ? 35 : 83) : (state.active ? 0 : 32)
      if (now - lastDraw < drawEvery) return
      const elapsed = Math.min((now - lastDraw) / 1000, .09)
      lastDraw = now
      if (!basement) people?.update(elapsed, state.step, focusMode, camera, state.colleagueSpeaking)
      if (people) {
        const proxy = floor.targets.find(item => item.id === 'colleague')?.mesh
        if (proxy) { proxy.position.copy(people.stas.position); proxy.position.y += 1.0 }
      }
      if (!reduced) {
        for (let i = 0; i < floor.drops.count; i += 2) {
          const y = floor.drops.getY(i) - elapsed * (1.4 + (i % 7) * .15)
          const wrap = y < .86 ? 2.33 : 0
          floor.drops.setY(i + 1, floor.drops.getY(i + 1) + y - floor.drops.getY(i) + wrap)
          floor.drops.setY(i, y + wrap)
        }
        floor.drops.needsUpdate = true
        floor.handset.position.x = .82 + (state.ringing ? Math.sin(now / 18) * .012 : 0)
        floor.hands.position.y = -.36 + Math.sin(now / 460) * .011
      }
      floor.handset.visible = state.carry !== 'phone'
      floor.phoneLamp.emissiveIntensity = state.ringing ? 1.3 + (reduced ? 0 : Math.sin(now * .012) * .95) : .36
      floor.deskLight.intensity = state.ringing ? 2.1 + (reduced ? 0 : Math.sin(now * .012) * 1.4) : .7
      renderer.render(floor.scene, camera)
    }
    frame = requestAnimationFrame(animate)
    const contextLoss = (event: Event) => { event.preventDefault(); activateFallback() }
    canvas.addEventListener('webglcontextlost', contextLoss)
    return () => {
      disposed = true
      release()
      runtime.current = null
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('keyup', keyUp)
      document.removeEventListener('pointerlockerror', activateFallback)
      window.removeEventListener('blur', blur)
      controls.dispose()
      disposeTree(floor.scene)
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  useEffect(() => { runtime.current?.sync() })
  return <div className="fps-viewport" ref={container} />
})
