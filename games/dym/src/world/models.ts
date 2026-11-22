import * as T from 'three'
import { doorAxis, type Call, type PropKind } from '../sim/content'
import type { Round, Vec } from '../sim'
import { seeded } from '../sim/fire'

type Part = { x: number; y: number; z: number; w: number; h: number; d: number; color: number; angle: number }
const cube = new T.BoxGeometry(1, 1, 1)
const material = new T.MeshLambertMaterial()
const emissive = new T.MeshBasicMaterial()
const olive = 0x56614c, dark = 0x242828, tape = 0xe7ca63, cream = 0xd9cdaf

export class Blocks {
  private parts: Part[] = []
  box(x: number, y: number, z: number, w: number, h: number, d: number, color: number, angle = 0) {
    this.parts.push({ x, y, z, w, h, d, color, angle })
  }
  build(materialOverride: T.Material = material) {
    const mesh = new T.InstancedMesh(cube, materialOverride, this.parts.length)
    const o = new T.Object3D()
    const color = new T.Color()
    this.parts.forEach((part, index) => {
      o.position.set(part.x, part.y, part.z)
      o.scale.set(part.w, part.h, part.d)
      o.rotation.y = part.angle
      o.updateMatrix()
      mesh.setMatrixAt(index, o.matrix)
      mesh.setColorAt(index, color.setHex(part.color))
    })
    mesh.computeBoundingSphere()
    return mesh
  }
}

const surfaces = {
  apartment: [0x82756a, 0x9b8067, 0x654e42, 0x523d34],
  kitchen: [0x697573, 0x8a9790, 0x465553, 0x35433e],
  workshop: [0x726760, 0x8a7d6d, 0x5e584f, 0x413d39],
  store: [0x706d61, 0x959084, 0x655743, 0x514434],
  warehouse: [0x626a65, 0x81908a, 0x494e47, 0x3f4c43],
}

function furniture(blocks: Blocks, x: number, z: number, type: PropKind) {
  const box = (dx: number, y: number, dz: number, w: number, h: number, d: number, color: number) =>
    blocks.box(x + dx, y, z + dz, w, h, d, color)
  switch (type) {
    case 'sofa':
      box(0, .21, 0, .73, .31, .44, 0x6d533f)
      box(0, .44, -.17, .73, .33, .13, 0x86664b)
      for (const side of [-1, 1]) box(side * .34, .32, 0, .12, .32, .45, 0x86664b)
      for (const side of [-1, 1]) box(side * .16, .39, .01, .27, .08, .29, 0xa38665)
      break
    case 'shelf':
      for (const side of [-1, 1]) box(side * .36, .67, 0, .055, 1.34, .35, 0x484b45)
      for (const shelf of [.11, .51, .91, 1.29]) {
        box(0, shelf, 0, .79, .07, .37, 0x796652)
        if (shelf < 1.1) {
          box(-.16, shelf + .12, -.02, .24, .19, .28, shelf > .5 ? 0xa47a48 : 0x8a5c43)
          box(.14, shelf + .14, -.02, .18, .22, .27, 0x65735e)
          box(.14, shelf + .14, .12, .09, .029, .007, cream)
        }
      }
      break
    case 'bed':
      box(0, .15, 0, .54, .25, .84, 0x58483b)
      box(0, .33, 0, .54, .16, .84, cream)
      box(0, .43, .09, .54, .065, .62, 0x718274)
      box(0, .45, -.30, .35, .09, .19, 0xffe9b6)
      break
    case 'table':
    case 'bench':
      for (const dx of [-.27, .27]) for (const dz of [-.23, .23]) box(dx, .28, dz, .06, .55, .06, dark)
      box(0, .57, 0, .67, .08, .56, type === 'bench' ? 0x62716c : 0x8f6b48)
      box(.12, .66, -.10, .2, .10, .1, cream)
      break
    case 'plant':
      box(0, .15, 0, .25, .30, .25, 0x915d43)
      for (const [dx, dz] of [[.12, 0], [0, .12], [-.11, -.06]]) box(dx, .37, dz, .16, .27, .16, 0x526244)
      break
    case 'stove':
      box(0, .26, 0, .74, .52, .58, 0x727977)
      box(0, .47, .30, .58, .13, .055, dark)
      for (const dx of [-.21, .21]) for (const dz of [-.14, .14]) box(dx, .54, dz, .21, .055, .17, dark)
      break
    case 'crate':
      box(0, .27, 0, .64, .54, .62, 0xa27c49)
      box(.09, .72, -.11, .43, .34, .36, 0xb28a58)
      for (const dx of [-.26, .26]) box(dx, .27, .32, .06, .53, .025, 0x79593e)
      box(0, .39, .32, .21, .075, .025, cream)
      break
  }
}

export function character(person: 'responder' | 'victim' | 'child' | 'mother') {
  const blocks = new Blocks()
  const box = blocks.box.bind(blocks)
  const responder = person === 'responder'
  const body = { responder: 0x454b43, victim: 0x798b75, child: 0xc0864e, mother: 0x795b6b }[person]
  const skin = person === 'victim' ? 0xb78969 : 0xce9976
  for (const side of [-1, 1]) {
    box(side * .10, .14, 0, .13, .28, .15, body)
    box(side * .10, .065, .044, .135, .13, .23, dark)
    box(side * .19, .44, .006, .105, .31, .13, body)
    if (responder) {
      box(side * .10, .17, 0, .135, .048, .16, tape)
      box(side * .19, .39, 0, .11, .06, .14, tape)
    }
  }
  box(0, .44, 0, .34, .38, .21, body)
  box(0, .72, 0, .20, .20, .19, skin)
  if (responder) {
    box(0, .32, 0, .35, .06, .225, tape)
    box(0, .49, -.14, .21, .37, .13, 0x9b9772)
    box(0, .51, -.23, .105, .28, .15, 0xa9a27c)
    box(0, .71, .081, .185, .10, .065, 0x232b2b)
    box(0, .755, .113, .135, .066, .025, 0x788a81)
    box(0, .83, .01, .277, .088, .255, 0xe6a53d)
    box(0, .87, -.016, .185, .04, .166, 0xcb9342)
    box(0, .817, .145, .28, .03, .096, 0xf3c55d)
  } else {
    box(0, .80, -.013, .207, .071, .21, 0x543d31)
    box(0, .73, -.091, .207, .14, .048, 0x543d31)
  }
  const group = new T.Group()
  group.add(blocks.build())
  group.scale.setScalar(person === 'child' ? .84 : 1.39)
  return group
}

export function nozzle() {
  const blocks = new Blocks()
  blocks.box(.0, -.06, .18, .07, .102, .42, 0x383e39)
  blocks.box(0, 0, .01, .063, .061, .39, 0x747972)
  blocks.box(0, 0, -.16, .096, .096, .052, 0xb9a568)
  blocks.box(0, 0, -.198, .077, .076, .033, 0x131b1a)
  blocks.box(.048, -.021, .066, .047, .08, .12, 0xda9d46)
  blocks.box(.085, -.08, .229, .17, .105, .22, olive)
  blocks.box(.15, -.08, .288, .038, .11, .084, tape)
  return blocks.build()
}

export function fieldTools() {
  const axe = new Blocks()
  axe.box(.08, -.05, .08, .047, .05, .42, 0x9d6940)
  axe.box(.08, -.016, -.15, .13, .10, .09, 0x71766e)
  axe.box(.02, -.01, -.17, .048, .075, .108, 0xe98b4c)
  const fan = new Blocks()
  fan.box(0, .03, 0, .28, .06, .18, 0xe18d49)
  fan.box(0, .18, 0, .27, .27, .085, 0xd28b52)
  fan.box(0, .18, .049, .21, .20, .027, 0x222b26)
  fan.box(0, .18, .069, .17, .035, .013, 0x6f8374, .2)
  fan.box(0, .18, .069, .035, .17, .013, 0x6f8374)
  const stretcher = new Blocks()
  for (const x of [-.12, .12]) stretcher.box(x, -.04, 0, .032, .033, .5, 0xde8d5b)
  stretcher.box(0, -.038, 0, .23, .019, .40, 0x69755b)
  return { axe: axe.build(), fan: fan.build(), stretcher: stretcher.build() }
}

export function building(round: Round) {
  const { call, fire } = round
  const group = new T.Group()
  const blocks = new Blocks()
  const lamps = new Blocks()
  const doors = new Map<number, T.Group>()
  const paint = surfaces[call.theme]
  const random = seeded(call.number * 113)
  const wall = (x: number, z: number) => call.map[z]?.[x] === '#'
  for (let z = 0; z < fire.height; z++) for (let x = 0; x < fire.width; x++) {
    const tile = call.map[z][x]
    const cx = x + .5
    const cz = z + .5
    if (tile === '#') {
      if (fire.neighbors[fire.index(x, z)].length === 0) continue
      blocks.box(cx, .98, cz, 1, 1.96, 1, paint[1])
      for (const [dx, dz] of [[0, 1], [0, -1], [-1, 0], [1, 0]]) {
        if (wall(x + dx, z + dz)) continue
        blocks.box(cx + dx * .503, .39, cz + dz * .503, dz ? .997 : .014, .77, dx ? .997 : .014, paint[0])
        blocks.box(cx + dx * .514, .77, cz + dz * .514, dz ? .997 : .035, .046, dx ? .997 : .035, paint[2])
        blocks.box(cx + dx * .514, .055, cz + dz * .514, dz ? .997 : .032, .12, dx ? .997 : .032, paint[3])
        if ((x + z * 3) % 13 === 1) {
          blocks.box(cx + dx * .525, 1.23, cz + dz * .525, dz ? .34 : .04, .28, dx ? .34 : .04, dark)
          lamps.box(cx + dx * .55, 1.23, cz + dz * .55, dz ? .265 : .04, .20, dx ? .265 : .04, 0x909c81)
        }
      }
      continue
    }
    const shade = new T.Color(paint[2]).multiplyScalar(.74 + random() * .29).getHex()
    blocks.box(cx, -.055, cz, .998, .11, .998, tile === 's' ? 0x34443b : shade)
    if (tile === 's') {
      const accent = Math.abs(x + .5 - round.entry.x) < .52
      if (accent) {
        lamps.box(cx, .006, cz, .19, .013, .91, 0x82d9a1)
        blocks.box(cx - .16, .002, cz, .025, .009, .99, 0x334d3e)
        blocks.box(cx + .16, .002, cz, .025, .009, .99, 0x334d3e)
      }
    } else {
      blocks.box(cx, 1.99, cz, 1, .10, 1, paint[0])
      if ((x + 2 * z) % 11 === 3 && tile === '.') {
        blocks.box(cx, 1.9, cz, .54, .04, .15, dark)
        lamps.box(cx, 1.875, cz, .43, .016, .102, 0xa6a892)
      }
      if (tile === 'D') {
        const door = new T.Group()
        const frame = new Blocks()
        const panel = new Blocks()
        const horizontal = doorAxis(call.map, x, z) === 'z'
        door.position.set(cx, 0, cz)
        door.rotation.y = horizontal ? 0 : Math.PI / 2
        for (const side of [-1, 1]) frame.box(side * .47, .76, 0, .06, 1.52, .14, dark)
        frame.box(0, 1.60, 0, 1, .25, .20, paint[0])
        const pivot = new T.Group()
        pivot.position.x = -.43
        panel.box(.43, .75, 0, .86, 1.5, .105, call.theme === 'apartment' ? 0x8d694d : 0x526256)
        panel.box(.43, 1.04, -.058, .40, .25, .02, 0x272e2d)
        panel.box(.43, 1.04, .058, .40, .25, .02, 0x272e2d)
        panel.box(.79, .73, 0, .08, .048, .18, 0xcbaf77)
        panel.box(.43, .06, 0, .86, .095, .115, dark)
        pivot.add(panel.build())
        door.add(frame.build(), pivot)
        group.add(door)
        doors.set(fire.index(x, z), pivot)
      }
    }
  }
  for (const { at: [x, z], kind } of call.props) furniture(blocks, x + .5, z + .5, kind)
  for (const o of round.objectives) {
    const { x, z } = o.pos
    if (o.kind === 'door') continue
    if (o.kind === 'goods') { furniture(blocks, x, z, 'crate'); continue }
    blocks.box(x, .41, z, .11, .81, .13, 0x404944)
    blocks.box(x, .84, z, .28, .24, .20, o.kind === 'gas' || o.kind === 'agent' ? 0xa75c40 : 0x4c6f65)
    lamps.box(x, .89, z + .105, .19, .045, .025, 0xe4b67c)
  }
  group.add(blocks.build(), lamps.build(emissive))
  return { group, doors }
}

export function stationBackdrop(scene: T.Scene) {
  const world = new Blocks()
  const glow = new Blocks()
  const b = world.box.bind(world), g = glow.box.bind(glow)
  const random = seeded(72)
  b(0, -.22, 0, 80, .42, 70, 0x30322a)
  b(1.5, -.007, 2, 18, .025, 12, 0x454035)
  b(4.0, 2.92, -3.5, 12, 5.83, 4.4, 0x654f43)
  b(4.0, 5.98, -3.45, 12.5, .35, 4.8, 0x303a36)
  b(4.0, 4.73, -1.28, 12.0, .12, .12, 0x54473f)
  for (let row = 0; row < 17; row++) for (let col = 0; col < 32; col++) {
    b(-1.82 + col * .366 + (row % 2) * .14, .16 + row * .332, -1.276, .35, .309, .016,
      new T.Color(0x785948).multiplyScalar(.72 + random() * .34).getHex())
  }
  b(4.1, 2.03, -1.18, 5.6, 4.04, .21, 0x2b302d)
  b(4.1, 2.06, -1.04, 5.15, 3.73, .085, 0x272826)
  for (let i = 0; i < 11; i++) b(4.1, .3 + i * .335, -0.973, 5.14, .024, .04, 0x595045)
  for (const x of [-.62, 8.36]) {
    b(x, 3.75, -1.16, 1.42, 1.52, .22, 0x2b322d)
    g(x, 3.75, -1.037, 1.22, 1.3, .065, 0x8d623d)
    b(x, 3.75, -.96, .055, 1.32, .065, 0x433f36)
    b(x, 3.75, -.96, 1.24, .055, .065, 0x433f36)
  }
  b(4.08, 4.31, -1.04, 4.22, .33, .24, 0x695848)
  for (let i = 0; i < 11; i++) g(2.41 + i * .32, 4.31, -.891, .168, .043, .045, 0xffbb73)
  g(7.14, 2.68, -.948, .10, .34, .13, 0xffa75f)
  for (let i = 0; i < 65; i++) {
    const x = random() * 23 - 10
    const z = random() * 7 + .4
    b(x, .014, z, .03 + random() * .23, .011, .02 + random() * .25, i % 2 ? 0x514436 : 0x343a34, random() * 3.1)
  }
  for (let i = 0; i < 10; i++) b(-2.4 + i * .97, .017, 5.8, .50, .012, .045, 0x938063)
  const truck = new Blocks()
  const t = truck.box.bind(truck)
  t(0,.56,0,2.55,.7,1.03,0x743a2e); t(.36,.97,0,1.58,.90,1.07,0x8d3e2b)
  t(-.78,.99,0,.89,1.04,1.0,0xa14e33); t(-.78,1.25,.52,.56,.44,.035,0x343e3b)
  t(-1.25,1.24,0,.055,.44,.82,0x3d4944); t(.39,.93,.551,1.40,.60,.035,0x545752)
  for (let i=0;i<7;i++) t(.39,.67+i*.082,.577,1.40,.012,.015,0x242a28)
  t(-.78,.72,.531,.87,.11,.028,0xd39b54); t(0,1.44,0,2.13,.055,.82,0x958373)
  t(-1.25,.62,0,.18,.13,1.09,0x676960); t(-1.04,1.56,0,.29,.11,.39,0x468881)
  for (const x of [-.83,.82]) for (const z of [-.53,.53]) {
    t(x,.365,z,.47,.55,.22,0x1d201e)
    t(x,.365,z*1.12,.25,.27,.065,0x706b5b)
  }
  const engine = truck.build()
  engine.position.set(6.0, 0, 1.55)
  engine.scale.setScalar(1.55)
  engine.rotation.y = -.10
  const crew = character('responder')
  crew.position.set(4.13, .02, 5.13)
  crew.scale.setScalar(2.12)
  crew.rotation.y = -1.43
  const hose = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([
    new T.Vector3(6.9,.62,2.55), new T.Vector3(6.2,.08,3.45), new T.Vector3(4.98,.05,4.07),
    new T.Vector3(5.45,.044,5.23), new T.Vector3(4.63,.071,5.52), new T.Vector3(4.18,.87,5.19),
  ]), 30, .057, 6, false), new T.MeshLambertMaterial({color:0xa37b51}))
  const amber = new T.PointLight(0xff994c, 21, 15, 1.7)
  amber.position.set(6.5, 2.35, 3.8)
  const rim = new T.PointLight(0xaccac1, 13, 14, 2)
  rim.position.set(1.3, 3.05, 2.2)
  const windowLight = new T.PointLight(0xe98143, 10, 9, 2)
  windowLight.position.set(7.3, 3.15, -.2)
  scene.add(world.build(), glow.build(emissive), crew, engine, hose, amber, rim, windowLight)
}
