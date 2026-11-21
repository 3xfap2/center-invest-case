import * as T from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export type Place = 'lift' | 'ledger' | 'voice' | 'compare' | 'handoff' | 'phone' | 'terminal' | 'printer' | 'archive' | 'meeting' | 'maria' | 'laptop' | 'danya' | 'board' | 'coffee' | 'colleague'
export type Target = { id: Place; mesh: T.Mesh; label: string; stand: T.Vector3; aim: T.Vector3 }
export type Surface = 'carpet' | 'tile'
export type Carry = 'phone' | 'papers' | 'cup' | 'folder' | null
export type Bounds = { x1: number; x2: number; z1: number; z2: number }
type Screen = { center: T.Vector3; width: number; height: number }
const floorWidth = 23
const floorDepth = 17
export const spawn = new T.Vector3(0.79, 1.64, 6.57)
export const basementLevel = -4.25
export const basementSpawn = new T.Vector3(39.45, basementLevel + spawn.y, 4.9)
export const officeBounds = { x1: -11.43, x2: 11.43, z1: -8, z2: 8.6 }
export const basementBounds = { x1: 31.2, x2: 48.8, z1: -5.6, z2: 6.7 }

export function createFloor(camera: T.PerspectiveCamera) {
  const scene = new T.Scene()
  scene.background = new T.Color('#0d162b')
  scene.fog = new T.FogExp2('#0c1729', .019)
  scene.add(camera)
  scene.add(new T.HemisphereLight('#b8ccf3', '#88715d', 2.25))
  const light = new T.DirectionalLight('#c2d1ff', 2.0)
  light.position.set(1, 6, 7)
  scene.add(light)
  const windowLight = new T.DirectionalLight('#688bff', 2.0)
  windowLight.position.set(-2, 3, -9)
  scene.add(windowLight)
  const amber = new T.PointLight('#ffba79', 21, 9, 2)
  amber.position.set(-7.8, 2.65, 5.8)
  scene.add(amber)
  const deskLight = new T.PointLight('#ff7048', 1.9, 5, 2)
  deskLight.position.set(.05, 1.59, 3.48)
  scene.add(deskLight)

  const colliders: Bounds[] = []
  const rugs: Bounds[] = []
  const targets: Target[] = []
  const screens: Partial<Record<Place, Screen>> = {}
  const staticMeshes: T.Mesh<T.BufferGeometry, T.Material>[] = []
  const materials = new Map<string, T.Material>()
  const random = (n: number) => {
    const r = Math.sin(413.61 * n + 7.2) * 4379.989
    return r - Math.floor(r)
  }
  const mat = (color: string) => {
    let result = materials.get(color)
    if (!result) {
      result = new T.MeshStandardMaterial({ color, roughness: .83 })
      materials.set(color, result)
    }
    return result
  }
  const luminous = (color: string, strength = 1) => new T.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: strength, roughness: .65,
  })
  const boundary = (x: number, z: number, w: number, d: number) => ({
    x1: x - w / 2, x2: x + w / 2, z1: z - d / 2, z2: z + d / 2,
  })
  const solid = (x: number, z: number, w: number, d: number) => colliders.push(boundary(x, z, w, d))
  const box = (x: number, y: number, z: number, w: number, h: number, d: number, material: string | T.Material, parent: T.Object3D = scene, batch = true) => {
    const mesh = new T.Mesh(new T.BoxGeometry(w, h, d), typeof material === 'string' ? mat(material) : material)
    mesh.position.set(x, y, z)
    parent.add(mesh)
    if (parent === scene && batch && !mesh.material.transparent) staticMeshes.push(mesh)
    return mesh
  }
  const cylinder = (x: number, y: number, z: number, r: number, height: number, color: string, parent: T.Object3D = scene, upper = r) => {
    const mesh = new T.Mesh(new T.CylinderGeometry(upper, r, height, 12), mat(color))
    mesh.position.set(x, y, z)
    parent.add(mesh)
    if (parent === scene) staticMeshes.push(mesh)
    return mesh
  }
  const texture = (width: number, height: number, draw: (context: CanvasRenderingContext2D) => void) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    draw(canvas.getContext('2d')!)
    const tex = new T.CanvasTexture(canvas)
    tex.colorSpace = T.SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }
  const surface = (color: string, grout: string, coarse: boolean) => {
    const map = texture(256, 256, ctx => {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 256, 256)
      ctx.fillStyle = grout
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(0, 64 * i, 256, 1.8)
        ctx.fillRect(i * 64, 0, 1.5, 256)
      }
      for (let i = 0; i < (coarse ? 1900 : 600); i++) {
        ctx.fillStyle = i % 2 ? '#ffffff13' : '#00000019'
        ctx.fillRect(random(i * 5) * 256, random(i * 22 + 100) * 256, 1.5, coarse ? 3 : 1)
      }
    })
    map.wrapS = map.wrapT = T.RepeatWrapping
    return map
  }
  const tile = surface('#28354a', '#1a293e', false)
  tile.repeat.set(7, 5)
  const ground = new T.Mesh(new T.PlaneGeometry(floorWidth + 1, floorDepth + 1), new T.MeshStandardMaterial({ map: tile, roughness: .74 }))
  ground.rotation.x = -Math.PI / 2
  ground.position.z = .25
  scene.add(ground)
  const carpet = (x: number, z: number, w: number, d: number) => {
    const map = surface('#354159', '#323d54', true)
    map.repeat.set(w / 3, d / 3)
    const mesh = new T.Mesh(new T.PlaneGeometry(w, d), new T.MeshStandardMaterial({ map, roughness: 1 }))
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(x, .012, z)
    scene.add(mesh)
    rugs.push(boundary(x, z, w, d))
  }
  carpet(.15, 2.25, 8.2, 6.0)
  carpet(-8.25, -3.7, 5.5, 6.0)
  carpet(6.9, -4.5, 7.1, 5.74)
  carpet(-7.66, 6.1, 6.1, 3.7)

  const wall = (x: number, z: number, w: number, d: number, tint: string, height = 3.45, collide = true) => {
    box(x, height * .5, z, w, height, d, tint)
    box(x, .068, z, w + .032, .13, d + .032, '#252f42')
    if (collide) solid(x, z, w, d)
  }
  wall(-11.65, .3, .25, 17.1, '#26334b')
  wall(11.65, .3, .25, 17.1, '#2b3850')
  wall(0, 8.83, 23.6, .28, '#24344a')
  solid(0, -8.19, 24, .3)
  box(0, .41, -8.2, 23.4, .82, .27, '#28354b')
  box(0, 3.26, -8.21, 23.4, .41, .3, '#34415a')
  box(0, .86, -8.11, 23.4, .08, .42, '#53627b')
  box(0, 3.56, .15, 23.62, .18, 17.6, '#27344a')
  box(0, 3.421, -1.35, 23, .075, .36, '#182639')
  for (let x = -11.4; x <= 11.6; x += 1.56) box(x, 1.94, -8.05, .095, 2.38, .24, '#19283d')
  box(0, 1.62, -8.12, 23.3, .055, .18, '#263950')
  const fixtures = luminous('#c4d7ff', 1.42)
  const warmFixtures = luminous('#ffd4aa', 1.39)
  for (const x of [-8.1, -.8, 5.6, 9.4]) {
    for (const z of [-4.5, 1.1, 5.4]) {
      box(x, 3.432, z, 2.8, .086, .32, '#29394c')
      box(x, 3.382, z, 2.55, .016, .18, x < -5 || z > 4 ? warmFixtures : fixtures)
    }
  }
  for (let x = -11; x < 12; x += 1.8) box(x, 3.463, .15, .009, .047, 17.47, '#46536a')
  for (let z = -7.76; z < 9; z += 1.6) box(0, 3.467, z, 23.42, .04, .008, '#455268')

  const glass = new T.MeshStandardMaterial({ color: '#76b5d9', transparent: true, opacity: .15, roughness: .24, depthWrite: false, side: T.DoubleSide })
  const partition = (x: number, z: number, w: number, d: number) => {
    box(x, 1.75, z, w, 2.83, d, glass)
    box(x, .33, z, w + .045, .66, d + .065, '#334761')
    box(x, 1.95, z, w + .012, .067, d + .035, '#7989a1')
    box(x, 3.174, z, w + .06, .094, d + .06, '#354864')
    if (w > d) for (const dx of [-w / 2, 0, w / 2]) box(x + dx, 1.6, z, .067, 3.2, .097, '#354864')
    else for (const dz of [-d / 2, 0, d / 2]) box(x, 1.6, z + dz, .097, 3.2, .067, '#354864')
    solid(x, z, w, d)
  }
  partition(-9.98, -.75, 3.18, .105)
  partition(-5.66, -4.82, .105, 6.48)
  partition(3.05, -5.54, .11, 5.0)
  partition(8.83, -2.89, 5.17, .11)

  const sky = texture(256, 256, ctx => {
    const tint = ctx.createLinearGradient(0, 0, 0, 246)
    tint.addColorStop(0, '#111b3f')
    tint.addColorStop(.51, '#375c98')
    tint.addColorStop(1, '#ab7186')
    ctx.fillStyle = tint
    ctx.fillRect(0, 0, 256, 256)
    const moon = ctx.createRadialGradient(164, 80, 1, 164, 80, 21)
    moon.addColorStop(0, '#dce4f09a')
    moon.addColorStop(.28, '#b2c6f136')
    moon.addColorStop(1, '#b2c6f100')
    ctx.fillStyle = moon
    ctx.fillRect(0, 0, 256, 256)
  })
  const skyline = new T.Mesh(new T.PlaneGeometry(78, 30), new T.MeshBasicMaterial({ map: sky, fog: false }))
  skyline.position.set(0, 5.6, -39)
  scene.add(skyline)
  const cityMats = ['#1b2d51', '#263a63', '#263b5c', '#182845'].map(color => new T.MeshBasicMaterial({ color }))
  const city: [number, number, number, number][] = []
  for (let i = 0; i < 32; i++) {
    const x = (i - 15.5) * 1.9
    const z = -12.4 - 13 * random(i + 2)
    const w = .95 + .6 * random(i + 30)
    const h = 1.8 + 6.9 * random(i + 50)
    box(x, -2.15 + h / 2, z, w, h, 1.9, cityMats[i % cityMats.length])
    for (let row = 0; .42 * row + .3 < h; row++) {
      for (let col = 0; col < 4; col++) {
        if (random(i * 54 + row * 4 + col) > .48) city.push([x + (col - 1.5) * w / 4.42, -1.92 + row * .42, z + .956, random(i + row * col)])
      }
    }
  }
  const windows = new T.InstancedMesh(new T.PlaneGeometry(.12, .14), new T.MeshBasicMaterial({ color: '#fff' }), city.length)
  city.forEach(([x, y, z, n], index) => {
    windows.setMatrixAt(index, new T.Matrix4().makeTranslation(x, y, z))
    windows.setColorAt(index, new T.Color(n < .44 ? '#98beeb' : '#efbf80'))
  })
  scene.add(windows)
  box(0, 1.98, -8.23, 23.15, 2.27, .04, glass)

  const rain = new Float32Array(380 * 6)
  for (let i = 0; i < 380; i++) {
    const x = random(i + 173) * 23.4 - 11.7
    const y = .86 + random(i + 506) * 2.31
    const z = -8.36 - random(i + 107) * 1.45
    rain.set([x, y, z, x - .049, y - .10 - .13 * random(i + 33), z], i * 6)
  }
  const rainGeo = new T.BufferGeometry()
  const drops = new T.BufferAttribute(rain, 3).setUsage(T.DynamicDrawUsage)
  rainGeo.setAttribute('position', drops)
  scene.add(new T.LineSegments(rainGeo, new T.LineBasicMaterial({ color: '#84b2f6', transparent: true, opacity: .42 })))

  const decals = texture(128, 128, ctx => {
    const shade = ctx.createRadialGradient(64, 64, 5, 64, 64, 63)
    shade.addColorStop(0, '#030815c2')
    shade.addColorStop(.68, '#03081557')
    shade.addColorStop(1, '#03081500')
    ctx.fillStyle = shade
    ctx.fillRect(0, 0, 128, 128)
  })
  const decalMat = new T.MeshBasicMaterial({ map: decals, transparent: true, depthWrite: false })
  const shadow = (x: number, z: number, w: number, d: number) => {
    const mesh = new T.Mesh(new T.PlaneGeometry(w, d), decalMat)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(x, .022, z)
    scene.add(mesh)
  }
  const desk = (x: number, z: number, w: number, d: number, top: string) => {
    shadow(x, z, w + .55, d + .5)
    solid(x, z, w, d)
    box(x, .96, z, w, .13, d, top)
    box(x, .898, z + d / 2 - .02, w, .035, .04, '#877e7b')
    box(x, .59, z - d / 2 + .16, w - .19, .64, .10, '#26354b')
    for (const dx of [-1, 1]) for (const dz of [-1, 1]) box(x + dx * (w / 2 - .13), .46, z + dz * (d / 2 - .14), .072, .92, .077, '#27384e')
  }
  const chair = (x: number, z: number, rotate = 0) => {
    shadow(x, z, 1.12, 1.12)
    solid(x, z, .55, .53)
    const group = new T.Group()
    group.position.set(x, 0, z)
    group.rotation.y = rotate
    scene.add(group)
    cylinder(0, .27, 0, .042, .45, '#304058', group)
    box(0, .51, 0, .61, .12, .59, '#344761', group)
    box(0, .81, .29, .59, .58, .11, '#394b67', group).rotation.x = -.12
    for (let i = 0; i < 5; i++) {
      const leg = box(Math.sin(i * 1.256) * .16, .09, Math.cos(i * 1.256) * .16, .05, .05, .35, '#273751', group)
      leg.rotation.y = i * 1.256
    }
  }
  const plate = (x: number, y: number, z: number, w: number, text: string, tail = '', style: 'gold' | 'blue' = 'gold', rotation = 0) => {
    const map = texture(704, 132, ctx => {
      ctx.fillStyle = '#15223a'
      ctx.fillRect(0, 0, 704, 132)
      ctx.strokeStyle = '#52718c'
      ctx.lineWidth = 3
      ctx.strokeRect(3, 3, 698, 126)
      ctx.fillStyle = style === 'gold' ? '#ffc08c' : '#a1cff5'
      ctx.fillRect(21, 21, 7, 89)
      ctx.font = 'bold 43px system-ui'
      ctx.fillText(text, 49, tail ? 65 : 82, 615)
      if (tail) {
        ctx.fillStyle = '#abc1d9'
        ctx.font = '24px system-ui'
        ctx.fillText(tail, 50, 102, 610)
      }
    })
    const sign = new T.Mesh(new T.PlaneGeometry(w, w * 132 / 704), new T.MeshBasicMaterial({ map }))
    sign.position.set(x, y, z)
    sign.rotation.y = rotation
    scene.add(sign)
  }
  const screen = (id: Place | undefined, x: number, y: number, z: number, w: number, h: number, mode: 'alert' | 'idle' | 'video' | 'mail') => {
    const map = texture(480, 275, ctx => {
      ctx.fillStyle = '#101e30'
      ctx.fillRect(0, 0, 480, 275)
      ctx.fillStyle = '#294461'
      ctx.fillRect(0, 0, 480, 37)
      ctx.fillStyle = mode === 'alert' ? '#ff9469' : '#a6cddd'
      ctx.fillRect(17, 14, 9, 9)
      ctx.font = 'bold 15px system-ui'
      ctx.fillText(mode === 'alert' ? 'АНТИФРОД · МОНИТОРИНГ' : mode === 'video' ? 'ПЕРЕГОВОРНАЯ · СВЯЗЬ' : mode === 'mail' ? 'ПОЧТА МОЛОДЁЖНОГО ЦЕНТРА' : 'РАБОЧАЯ СТАНЦИЯ', 38, 25)
      if (mode === 'alert') {
        ctx.fillStyle = '#5b3137'
        ctx.fillRect(20, 60, 440, 138)
        ctx.strokeStyle = '#e67652'
        ctx.strokeRect(20, 60, 440, 138)
        ctx.fillStyle = '#ffdbc8'
        ctx.font = 'bold 52px system-ui'
        ctx.fillText('480 000 ₽', 37, 128)
        ctx.font = 'bold 21px system-ui'
        ctx.fillText('РИСК 87 / 100', 40, 166)
      } else {
        ctx.fillStyle = '#182d47'
        ctx.fillRect(20, 59, 440, 139)
        ctx.fillStyle = '#9fb9db'
        ctx.font = 'bold 32px system-ui'
        ctx.fillText(mode === 'video' ? 'Линия готова' : mode === 'mail' ? 'Смена реквизитов' : 'Операции', 37, 125)
      }
      ctx.fillStyle = '#456181'
      for (let i = 0; i < 4; i++) ctx.fillRect(21 + i * 113, 227, 90, 18)
    })
    box(x, y, z, w + .08, h + .075, .087, '#162136')
    const panel = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map }))
    panel.position.set(x, y, z + .046)
    scene.add(panel)
    if (id) screens[id] = { center: panel.position.clone(), width: w, height: h }
  }
  const target = (id: Place, label: string, x: number, y: number, z: number, w: number, h: number, d: number, standX: number, standZ: number, aimX = x, aimY = y, aimZ = z) => {
    const mesh = box(x, y, z, w, h, d, new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }), scene, false)
    targets.push({ id, mesh, label, stand: new T.Vector3(standX, spawn.y + (standX > 25 ? basementLevel : 0), standZ), aim: new T.Vector3(aimX, aimY, aimZ) })
  }

  // Open office.
  desk(-.55, 3.13, 3.5, 1.33, '#505d72')
  chair(-.67, 4.31)
  screen('terminal', -.31, 1.66, 3.01, 1.61, .91, 'alert')
  box(-.31, 1.125, 3.01, .08, .25, .09, '#2c3d53')
  box(-.31, 1.04, 3.14, .47, .03, .30, '#2c3d53')
  box(-.63, 1.043, 3.55, .91, .022, .26, '#1e2c43')
  for (let i = 0; i < 30; i++) {
    box(-1.02 + i % 10 * .085, 1.059, 3.47 + Math.floor(i / 10) * .075, .07, .012, .055, '#67758a')
  }
  box(.12, 1.041, 3.53, .20, .019, .27, '#273447')
  box(-1.76, 1.045, 3.44, .31, .025, .42, '#b7b9bc').rotation.y = .1
  const handset = new T.Group()
  handset.position.set(.82, 1.067, 3.49)
  scene.add(handset)
  const phoneLamp = luminous('#ff8950', 2)
  box(.82, 1.044, 3.48, .56, .073, .36, '#4e332f')
  box(0, .052, 0, .47, .06, .097, '#9d5142', handset)
  box(-.195, .056, 0, .11, .084, .142, '#a45a45', handset)
  box(.195, .056, 0, .11, .084, .142, '#a45a45', handset)
  box(.82, 1.085, 3.57, .135, .02, .042, phoneLamp)
  target('phone', 'Взять трубку', .83, 1.14, 3.49, .72, 1.02, .40, .82, 4.88)
  target('terminal', 'Сесть за терминал', -.32, 1.68, 3.40, 1.78, 1.13, .38, -.33, 4.91, -.31, 1.68, 3.04)
  desk(-2.7, -.38, 2.14, 1.03, '#566278')
  screen(undefined, -2.73, 1.57, -.48, 1.07, .63, 'idle')
  chair(-2.73, .56, .18)
  desk(.14, -.56, 2.13, 1.02, '#506078')
  screen(undefined, .12, 1.57, -.64, 1.12, .64, 'idle')
  chair(.05, .34, -.11)
  plate(.4, 2.57, -8.02, 5.4, 'БАНК «ТИХАЯ ЛИНИЯ»', 'ЗАРЕЧНЫЙ  /  ОТДЕЛ АНТИФРОДА')

  // Glass office.
  desk(-8.56, -3.83, 3.35, 1.33, '#736560')
  screen(undefined, -9.19, 1.55, -3.93, .95, .57, 'idle')
  chair(-8.21, -4.9, Math.PI)
  chair(-8.54, -2.63, .06)
  box(-8.21, 1.05, -3.41, .39, .037, .30, '#c7bcb0')
  cylinder(-7.36, 1.2, -4.03, .029, .31, '#826b5f')
  cylinder(-7.36, 1.4, -4.03, .19, .13, '#a58d73', scene, .10)
  box(-7.36, 1.344, -4.03, .27, .012, .27, warmFixtures)
  plate(-8.97, 2.69, -.64, 3.5, 'КАБИНЕТ МАРИИ', 'РУКОВОДИТЕЛЬ СМЕНЫ')
  target('maria', 'Поговорить с Марией', -8.52, 1.5, -3.45, 1.62, 1.22, .50, -8.51, -2.02)

  // Conference room.
  wall(6.9, -7.17, 5.0, .16, '#30435d', 3.45)
  screen('meeting', 6.01, 1.94, -7.02, 2.74, 1.54, 'video')
  desk(8.96, -4.91, 2.22, 2.19, '#556075')
  chair(8.9, -3.48)
  chair(8.94, -6.28, Math.PI)
  plate(8.65, 2.74, -2.81, 3.35, 'ПЕРЕГОВОРНАЯ', 'ВИДЕОСВЯЗЬ')
  target('meeting', 'Включить видеосвязь', 6.0, 1.9, -6.90, 2.86, 1.60, .24, 5.99, -5.25)

  // Archive and printer.
  desk(9.93, .1, 2.77, 1.14, '#4c6280')
  box(9.98, 1.23, .13, .88, .43, .68, '#6e8196')
  box(9.98, 1.43, .09, .89, .052, .69, '#aebcca')
  box(9.98, 1.25, .479, .66, .106, .033, '#202c3e')
  box(10.31, 1.421, .36, .091, .015, .047, luminous('#8be2a4', 1.7))
  const printed = box(9.99, 1.243, .475, .57, .014, .31, '#f3e7d7', scene, false)
  printed.visible = false
  target('printer', 'Забрать страницы', 9.97, 1.25, .35, 1.02, .69, .46, 9.96, 1.81)
  box(7.74, 1.05, -.07, 1.47, 2.1, .63, '#354760')
  solid(7.74, -.07, 1.47, .63)
  for (let row = 0; row < 3; row++) {
    box(7.74, .36 + row * .58, .271, 1.39, .05, .061, '#6b7f9b')
    for (let col = 0; col < 7; col++) {
      const x = 7.15 + col * .18
      const y = .56 + row * .58
      box(x, y, .245, .119, .38, .18, ['#685d54', '#5c6e84', '#487b7a', '#a16e4f'][col % 4])
      box(x, y + .052, .338, .091, .085, .01, '#c6c4b2')
    }
  }
  plate(8.78, 2.61, .105, 3.65, 'АРХИВ И ПРИНТЕР', 'ДОГОВОРЫ  /  ЖУРНАЛЫ')
  target('archive', 'Открыть архив', 7.73, 1.4, .27, 1.47, 1.46, .32, 7.74, 1.70)

  // Evidence wall and reception.
  const cork = texture(256, 256, ctx => {
    ctx.fillStyle = '#8a674d'
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 4900; i++) {
      ctx.fillStyle = i % 2 ? '#c59b7656' : '#432f2853'
      ctx.fillRect(256 * random(i + 124), 256 * random(i * 3 + 77), 2 + i % 3, 1 + i % 2)
    }
  })
  const board = new T.Group()
  board.position.set(7.23, 1.70, 4.42)
  scene.add(board)
  box(0, 0, 0, 4.05, 2.20, .14, '#4c413c', board)
  box(0, 0, .084, 3.91, 2.07, .043, new T.MeshStandardMaterial({ map: cork, roughness: 1 }), board)
  box(0, -1.13, .14, 4.13, .07, .24, '#745a4b', board)
  for (const x of [-1.8, 1.8]) box(x, -.94, -.03, .083, 2.07, .11, '#43506a', board)
  const boardNotes = new T.Group()
  boardNotes.position.set(0, 0, .129)
  board.add(boardNotes)
  solid(7.23, 4.38, 4.16, .24)
  plate(7.22, 3.08, 4.55, 3.62, 'ДОСКА УЛИК', 'КАРТОЧКИ ДЕЛА № 014')
  target('board', 'Подойти к доске улик', 7.23, 1.78, 4.55, 4.07, 2.12, .20, 7.21, 6.3)
  desk(-8.72, 5.26, 3.31, 1.09, '#786d69')
  screen('laptop', -8.28, 1.32, 5.22, .63, .38, 'mail')
  box(-8.28, 1.041, 5.35, .67, .026, .37, '#758296')
  box(-9.21, 1.057, 5.48, .51, .065, .33, '#456180')
  box(-9.92, 1.11, 5.30, .20, .18, .17, '#ad7553')
  plate(-8.8, 2.66, 4.81, 3.61, 'РЕСЕПШЕН', 'ПОСЕТИТЕЛИ  /  ЛИФТ')
  box(-11.49, 1.22, 6.45, .11, 2.41, 1.84, '#637083')
  box(-11.416, 1.21, 6.45, .034, 2.21, 1.66, '#333d53')
  box(-11.386, 1.20, 6.45, .012, 2.17, .021, '#1c263b')
  box(-11.393, 1.33, 7.54, .04, .26, .13, '#6f7f91')
  box(-11.366, 1.36, 7.54, .01, .047, .062, warmFixtures)
  plate(-11.365, 2.70, 6.46, 1.68, 'ЛИФТ', 'АРХИВ · ЭТАЖ −1', 'gold', Math.PI / 2)
  target('lift', 'Войти в лифт', -11.17, 1.40, 6.45, .34, 2.02, 1.94, -9.75, 6.45)
  target('laptop', 'Посмотреть письмо Ирины', -8.25, 1.34, 5.50, .83, .68, .46, -8.27, 6.91)
  target('danya', 'Поговорить с Даней и мамой', -5.45, 1.36, 6.10, 1.5, 1.55, .82, -4.74, 7.13)
  plate(-10.50, 2.57, .95, 2.15, 'КУХНЯ', 'КОФЕ')
  desk(-10.22, .37, 2.06, 1.13, '#71615b')
  box(-10.37, 1.29, .37, .52, .53, .46, '#2e3d52')
  box(-10.35, 1.36, .615, .29, .12, .028, '#a3b4b9')
  target('coffee', 'Налить кофе', -10.36, 1.42, .64, .61, .62, .45, -10.37, 1.72)
  target('colleague', 'Поговорить со Стасом', -3.16, 1.40, -.98, .56, 1.0, .56, -3.17, .55)

  // Archive level. The elevator moves the camera to this lower floor.
  const lower = (x: number, y: number, z: number, w: number, h: number, d: number, color: string | T.Material) =>
    box(x, y + basementLevel, z, w, h, d, color)
  lower(40, -.12, .55, 18.0, .24, 12.65, '#314052')
  lower(40, 3.16, .55, 18.08, .13, 12.6, '#27374a')
  lower(40, 1.53, -5.67, 18, 3.1, .20, '#354659')
  lower(40, 1.53, 6.75, 18, 3.1, .21, '#36445a')
  lower(31.10, 1.53, .55, .19, 3.1, 12.6, '#344155')
  lower(48.88, 1.53, .55, .19, 3.1, 12.6, '#354859')
  for (let x = 31.4; x < 49; x += 1.65) lower(x, .006, .55, .022, .012, 12.6, '#526070')
  for (let z = -5.35; z < 6.75; z += 1.55) lower(40, .006, z, 17.7, .012, .018, '#526070')
  for (const x of [34.9, 40.0, 45.7]) for (const z of [-3.5, 1.2, 4.7]) {
    lower(x, 3.053, z, 2.1, .085, .27, '#25374a')
    lower(x, 3.002, z, 1.92, .018, .16, warmFixtures)
  }
  const downstairs = new T.PointLight('#ffd5a4', 27, 14, 2)
  downstairs.position.set(40.4, basementLevel + 2.7, .1)
  scene.add(downstairs)
  plate(39.55, basementLevel + 2.58, -5.51, 5.25, 'АРХИВ ОПЕРАЦИЙ', 'ЭТАЖ −1  /  БАНК «ТИХАЯ ЛИНИЯ»')
  lower(39.47, 1.15, 6.57, 2.02, 2.29, .16, '#5e6d80')
  lower(39.47, 1.16, 6.46, 1.89, 2.13, .08, '#293b51')
  lower(39.46, 1.15, 6.41, .035, 2.12, .019, '#151e30')
  lower(40.72, 1.42, 6.49, .17, .29, .057, '#657386')
  lower(40.72, 1.46, 6.455, .069, .071, .017, luminous('#83d4b6'))
  for (let i = 0; i < 3; i++) {
    const x = 34.6 + i * 1.05
    lower(x, 1.07, -3.12, .97, 2.13, .63, '#51647a')
    solid(x, -3.12, .99, .67)
    for (let row = 0; row < 4; row++) {
      const y = .25 + row * .5
      lower(x, y, -2.775, .88, .42, .075, row % 2 ? '#526680' : '#657891')
      lower(x, y + .06, -2.71, .28, .066, .04, '#afb8bf')
      lower(x, y - .088, -2.717, .16, .069, .025, '#b5a189')
    }
  }
  plate(35.63, basementLevel + 2.53, -2.75, 3.15, 'ЖУРНАЛЫ', 'КАРТОТЕКА СМЕНЫ')
  target('ledger', 'Открыть архивный шкаф', 35.63, basementLevel + 1.32, -2.78, 2.93, 1.71, .21, 35.63, -1.30)
  const station = (x: number, z: number) => {
    lower(x, .93, z, 2.6, .13, 1.12, '#685e60')
    for (const dx of [-1.15, 1.15]) lower(x + dx, .47, z, .12, .94, .89, '#34455b')
    lower(x, .59, z - .32, 2.18, .50, .10, '#324356')
    solid(x, z, 2.6, 1.12)
  }
  station(44.45, -3.02)
  lower(44.44, 1.17, -2.82, .68, .33, .38, '#334e63')
  lower(44.44, 1.18, -2.614, .43, .12, .039, luminous('#8fddbf', .60))
  plate(44.47, basementLevel + 2.24, -3.05, 3.07, 'КОМНАТА СВЯЗИ', 'ЗАПИСИ РАЗГОВОРОВ')
  target('voice', 'Включить запись разговора', 44.46, basementLevel + 1.29, -2.58, 1.28, 1.1, .24, 44.46, -1.21)
  station(44.6, 2.24)
  screen(undefined, 44.61, basementLevel + 1.52, 2.20, 1.37, .81, 'idle')
  lower(44.60, 1.11, 2.22, .08, .36, .10, '#3b4e66')
  plate(44.59, basementLevel + 2.42, 2.22, 3.25, 'ТЕРМИНАЛ СВЕРКИ', 'ПРОВЕРКА РЕКВИЗИТОВ')
  target('compare', 'Сверить два перевода', 44.60, basementLevel + 1.50, 2.58, 1.63, 1.25, .28, 44.6, 4.05)
  station(35.89, 3.49)
  lower(35.88, 1.04, 3.78, .65, .067, .42, '#a16f53')
  lower(35.89, 1.085, 3.79, .43, .014, .32, '#dbc2a4')
  plate(35.87, basementLevel + 2.23, 3.25, 3.38, 'ДЕЖУРНАЯ СМЕНА', 'ПЕРЕДАЧА ДЕЛ')
  target('handoff', 'Составить передачу дела', 35.89, basementLevel + 1.28, 3.88, 1.31, .86, .24, 35.89, 5.28)
  lower(40.98, .59, -.45, 1.68, 1.19, 2.40, '#435469')
  solid(40.98, -.45, 1.68, 2.40)
  for (const dx of [-.55, 0, .55]) lower(40.98 + dx, 1.335, -.42, .36, .28, .43, '#958674')

  const plant = (x: number, z: number, height: number) => {
    shadow(x, z, 1.0, 1.0)
    cylinder(x, height * .20, z, height * .19, height * .39, '#45596f', scene, height * .24)
    for (let i = 0; i < 11; i++) {
      const theta = i / 11 * Math.PI * 2
      const leaf = new T.Mesh(new T.IcosahedronGeometry(height * .13, 0), mat(['#355f61', '#41696b', '#557f72'][i % 3]))
      leaf.position.set(x + Math.sin(theta) * height * .24, height * (.58 + random(i) * .43), z + Math.cos(theta) * height * .23)
      leaf.scale.set(.72, 2.5, .58)
      leaf.rotation.set(Math.cos(theta) * .68, theta, Math.sin(theta) * .68)
      scene.add(leaf)
    }
  }
  for (const [x, z, size] of [[2.27, -3.7, 1.04], [-10.8, 7.98, 1.0], [10.68, -6.8, 1.1], [-10.75, -6.7, .98], [9.55, 4.93, .86], [2.26, 5.88, .81]]) plant(x, z, size)

  const hands = new T.Group()
  hands.position.set(.33, -.36, -.62)
  camera.add(hands)
  const skin = '#bb907e'
  const cuff = '#516684'
  box(.26, -.12, .11, .16, .17, .48, cuff, hands).rotation.y = -.1
  box(.209, -.063, -.117, .133, .115, .18, skin, hands).rotation.y = -.12
  const carried: Partial<Record<Exclude<Carry, null>, T.Group>> = {}
  for (const name of ['phone', 'papers', 'folder', 'cup'] as const) {
    const item = new T.Group()
    carried[name] = item
    hands.add(item)
    item.visible = false
  }
  box(.18, .015, -.127, .15, .062, .31, '#a75643', carried.phone!)
  box(.18, .015, -.254, .155, .109, .10, '#b26950', carried.phone!)
  box(.18, .015, -.014, .155, .109, .1, '#b26950', carried.phone!)
  box(.06, -.045, -.25, .37, .022, .44, '#ded4c4', carried.papers!).rotation.z = -.12
  box(.06, -.045, -.25, .37, .032, .44, '#bd9259', carried.folder!).rotation.z = -.12
  cylinder(.137, .01, -.15, .092, .17, '#b97554', carried.cup!, .11)

  scene.updateMatrixWorld(true)
  const batches = new Map<T.Material, T.Mesh[]>()
  for (const mesh of staticMeshes) {
    const group = batches.get(mesh.material) ?? []
    group.push(mesh)
    batches.set(mesh.material, group)
  }
  for (const [material, meshes] of batches) {
    if (meshes.length < 2) continue
    const clones = meshes.map(mesh => mesh.geometry.clone().applyMatrix4(mesh.matrixWorld))
    const combined = mergeGeometries(clones)
    clones.forEach(geometry => geometry.dispose())
    if (combined) {
      for (const mesh of meshes) { mesh.removeFromParent(); mesh.geometry.dispose() }
      scene.add(new T.Mesh(combined, material))
    }
  }

  const canStand = (x: number, z: number) => {
    const r = .23
    const bounds = x > 25 ? basementBounds : officeBounds
    return x > bounds.x1 + r && x < bounds.x2 - r && z > bounds.z1 + r && z < bounds.z2 - r
      && !colliders.some(area => x + r > area.x1 && x - r < area.x2 && z + r > area.z1 && z - r < area.z2)
  }
  const surfaceAt = (x: number, z: number): Surface =>
    rugs.some(rect => rect.x1 < x && x < rect.x2 && rect.z1 < z && z < rect.z2) ? 'carpet' : 'tile'

  return { scene, targets, screens, drops, handset, phoneLamp, deskLight, hands, carried, boardNotes, printed, canStand, surfaceAt, texture }
}

export type Floor = ReturnType<typeof createFloor>
