import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { camp } from '../camp/content';
import type { Axis, Teen, Workshop } from '../camp/content';

const materials = new Map<string, T.MeshStandardMaterial>();
export const mat = (color: string, flat = true) => {
  const key = color + flat;
  let value = materials.get(key);
  if (!value) { value = new T.MeshStandardMaterial({ color, roughness: 0.91, flatShading: flat }); materials.set(key, value); }
  return value;
};
const cube = new T.BoxGeometry();
const sphere = new T.IcosahedronGeometry(1, 1);
const gold = '#e9be71';
const cedar = '#9d6147';
const pale = '#d3a36d';
const dark = '#4e3a31';

export function mesh(parent: T.Object3D, geometry: T.BufferGeometry, material: T.Material, x: number, y: number, z: number, shadow = true) {
  const object = new T.Mesh(geometry, material);
  object.position.set(x, y, z);
  object.castShadow = shadow;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

export function box(parent: T.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, color: string | T.Material, shadow = true) {
  const object = mesh(parent, cube, typeof color === 'string' ? mat(color) : color, x, y, z, shadow);
  object.scale.set(w, h, d);
  return object;
}

export function orb(parent: T.Object3D, x: number, y: number, z: number, r: number, color: string, scaleY = 1) {
  const object = mesh(parent, sphere, mat(color), x, y, z);
  object.scale.set(r, r * scaleY, r);
  return object;
}

function cylinder(parent: T.Object3D, top: number, bottom: number, height: number, x: number, y: number, z: number, color: string, sides = 8) {
  return mesh(parent, new T.CylinderGeometry(top, bottom, height, sides), mat(color), x, y, z);
}

function slab(parent: T.Object3D, points: number[][], depth: number, y: number, material: T.Material) {
  const shape = new T.Shape(points.map(([x, z]) => new T.Vector2(x, -z)));
  const geo = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 1 });
  const object = mesh(parent, geo, material, 0, y, 0, false);
  object.rotation.x = -Math.PI / 2;
  return object;
}

// Batch static meshes by material and shadow behavior, within each selectable building.
export function batchStatic(root: T.Object3D, excluded?: T.Object3D) {
  const inverse = root.matrixWorld.clone();
  const batches = new Map<string, T.Mesh[]>();
  root.updateWorldMatrix(true, true);
  inverse.copy(root.matrixWorld).invert();
  const visit = (object: T.Object3D) => {
    if (object === excluded || object.userData.animated) return;
    if (object instanceof T.Mesh && !(object instanceof T.InstancedMesh) && !Array.isArray(object.material)) {
      const key = [object.material.uuid, object.castShadow, object.receiveShadow].join(':');
      const batch = batches.get(key) ?? [];
      batch.push(object);
      batches.set(key, batch);
    }
    object.children.forEach(visit);
  };
  visit(root);
  for (const batch of batches.values()) {
    if (batch.length < 2) continue;
    const geometries = batch.map(object => {
      const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
      return geometry.applyMatrix4(inverse.clone().multiply(object.matrixWorld));
    });
    const combined = mergeGeometries(geometries);
    geometries.forEach(geometry => geometry.dispose());
    if (!combined) continue;
    const first = batch[0];
    const assembled = mesh(root, combined, first.material as T.Material, 0, 0, 0, first.castShadow);
    assembled.receiveShadow = first.receiveShadow;
    batch.forEach(object => object.removeFromParent());
  }
}

export function random(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

const palette: Record<Axis, { roof: string; wall: string; trim: string }> = {
  nature: { roof: '#bdc588', wall: '#d9bd83', trim: '#6f8453' },
  tech: { roof: '#b76240', wall: '#edc082', trim: '#964b3a' },
  people: { roof: '#d68c62', wall: '#f1cc9d', trim: '#a74836' },
  signs: { roof: '#52877f', wall: '#a6c6ab', trim: '#3d6b60' },
  art: { roof: '#947798', wall: '#e9b5ac', trim: '#7e5375' },
};

function path(parent: T.Group, a: T.Vector2, b: T.Vector2, width: number, color: string) {
  const step = b.clone().sub(a);
  const strip = box(parent, width, 0.03, step.length() + 0.28, (a.x + b.x) / 2, 0.035, (a.y + b.y) / 2, color, false);
  strip.rotation.y = Math.atan2(step.x, step.y);
}

export function terrain(parent: T.Group) {
  const outline = [[-22, -13], [-18, -17], [17, -17], [22, -12], [22, 13], [17, 17], [-18, 17], [-22, 13]];
  const sand = [[-22, -13], [-18, -17], [17, -17], [22, -12], [22, 8], [18, 9.7], [13, 11.4], [7, 12.3], [2, 11.8], [-4, 9.3], [-10, 10], [-15, 12], [-22, 12]];
  const green = [[-22, -13], [-18, -17], [17, -17], [22, -12], [22, 7], [18, 8.9], [13, 10.6], [7, 11.5], [2, 11], [-4, 8.5], [-10, 9.2], [-15, 11.2], [-22, 11.2]];
  slab(parent, outline, 1.18, -1.55, mat('#795740'));
  slab(parent, outline, 0.13, -1.45, mat('#ba8a62'));
  slab(parent, outline, 0.37, -0.43, mat('#538e8b'));
  slab(parent, sand, 0.105, -0.14, mat('#d6af75'));
  slab(parent, green, 0.10, -0.10, mat('#9aaa6a'));

  for (const room of camp.workshops) {
    const [x, z] = room.position;
    path(parent, new T.Vector2(x, z + 2.1), new T.Vector2(x * 0.64, 0.5 + z * 0.25), 1.28, '#c9ae79');
    path(parent, new T.Vector2(x * 0.64, 0.5 + z * 0.25), new T.Vector2(0, 1.4), 1.28, '#c9ae79');
  }
  cylinder(parent, 3.15, 3.17, 0.075, 0, 0.035, 1.4, '#c0a473', 16);
  cylinder(parent, 1.35, 1.43, 0.16, 0, 0.11, 1.4, '#8f704e', 16);
  cylinder(parent, 1.13, 1.18, 0.18, 0, 0.21, 1.4, '#473831', 16);
  for (let i = 0; i < 7; i++) {
    const a = i * Math.PI * 2 / 7;
    orb(parent, Math.cos(a) * 1.1, 0.25, 1.4 + Math.sin(a) * 1.1, 0.27, i % 2 ? '#a99073' : '#91887b', 0.7);
  }
  for (let i = 0; i < 3; i++) {
    const log = box(parent, 0.22, 0.23, 1.21, 0, 0.29, 1.4, cedar);
    log.rotation.y = i * 1.1;
  }
  for (const [x, z, angle] of [[-3.1, 2.1, 1.1], [2.9, 2.5, -1.05], [0, 4.65, 0]]) {
    const bench = new T.Group();
    bench.position.set(x, 0, z);
    bench.rotation.y = angle;
    parent.add(bench);
    box(bench, 1.86, 0.15, 0.49, 0, 0.53, 0, pale);
    box(bench, 1.8, 0.24, 0.12, 0, 0.83, 0.24, cedar);
    for (const u of [-0.63, 0.63]) box(bench, 0.14, 0.75, 0.14, u, 0.38, 0.17, dark);
  }

  const rng = random(5272);
  const dummy = new T.Object3D();
  const makeInstances = (geo: T.BufferGeometry, capacity: number, color: string, cast = true) => {
    const batch = new T.InstancedMesh(geo, mat(color), capacity);
    batch.castShadow = cast;
    batch.receiveShadow = true;
    parent.add(batch);
    return batch;
  };
  const trunk = makeInstances(new T.CylinderGeometry(0.11, 0.19, 1, 6), 92, '#8a634a');
  const leaves = makeInstances(new T.ConeGeometry(1, 1, 6), 184, '#ffffff');
  const treeColors = ['#6b8853', '#668452', '#779259', '#8b9a5e', '#54774b', '#8a9855'];
  let trees = 0;
  for (let i = 0; i < 290 && trees < 92; i++) {
    const x = rng() * 42 - 21;
    const z = rng() * 27 - 16;
    if ((Math.abs(x) > 17 && z < -13) || (z > 7.8 && x > -11 && x < 5)) continue;
    if (z > -12 && Math.abs(x) < 17 && (z < 5 || rng() < 0.72)) continue;
    if (camp.workshops.some(room => Math.hypot(room.position[0] - x, room.position[1] - z) < 4.4)) continue;
    const h = 0.75 + rng() * 1.1;
    const s = 0.46 + rng() * 0.64;
    dummy.position.set(x, h * 0.49, z);
    dummy.rotation.set(0, rng() * 6.28, 0);
    dummy.scale.set(1, h, 1);
    dummy.updateMatrix();
    trunk.setMatrixAt(trees, dummy.matrix);
    for (let tier = 0; tier < 2; tier++) {
      dummy.position.y = h * (0.94 + tier * 0.42);
      dummy.scale.set(s * (1.1 - tier * 0.26), h * (1.21 - tier * 0.18), s * (1.1 - tier * 0.26));
      dummy.updateMatrix();
      leaves.setMatrixAt(trees * 2 + tier, dummy.matrix);
      leaves.setColorAt(trees * 2 + tier, new T.Color(treeColors[(trees + tier) % treeColors.length]));
    }
    trees++;
  }
  trunk.count = trees;
  leaves.count = trees * 2;

  const glints = makeInstances(cube, 110, '#8bb6aa', false);
  let rippleCount = 0;
  for (let i = 0; i < 110; i++) {
    const x = rng() * 40 - 20;
    const z = 11 + rng() * 5.7;
    if (z < 12.4 || (Math.abs(x) > 17 && z > 16)) continue;
    dummy.position.set(x, -0.048, z);
    dummy.rotation.set(0, -0.065, 0);
    dummy.scale.set(0.24 + rng() * 1.16, 0.014, 0.035);
    dummy.updateMatrix();
    glints.setMatrixAt(rippleCount++, dummy.matrix);
  }
  glints.count = rippleCount;
  const flecks = makeInstances(sphere, 104, '#ffffff', false);
  let fleckCount = 0;
  for (let i = 0; i < 104; i++) {
    const x = rng() * 39 - 19.5, z = rng() * 25 - 15.5;
    if (camp.workshops.some(room => Math.hypot(room.position[0] - x, room.position[1] - z) < 3.5)) continue;
    if (Math.abs(x) < 3.3 && Math.abs(z - 1.4) < 3.3) continue;
    dummy.position.set(x, 0.06, z);
    dummy.scale.set(0.055 + rng() * 0.18, 0.06 + rng() * 0.14, 0.08);
    dummy.updateMatrix();
    flecks.setMatrixAt(fleckCount, dummy.matrix);
    flecks.setColorAt(fleckCount++, new T.Color(['#b6af71', '#6b874f', '#d2a66c', '#859951'][i % 4]));
  }
  flecks.count = fleckCount;
  const pier = new T.Group();
  pier.position.set(-8, 0.11, 10.6);
  pier.rotation.y = 0.16;
  parent.add(pier);
  for (let i = 0; i < 14; i++) {
    box(pier, 1.75, 0.13, 0.23, 0, 0, i * 0.25, i % 2 ? '#b38a61' : '#c49b6e');
  }
  for (const x of [-0.69, 0.69]) for (const z of [0, 1.6, 3.2]) box(pier, 0.15, 0.65, 0.15, x, -0.03, z, dark);
  const canoe = new T.Group();
  canoe.position.set(-3.5, 0, 13.4);
  canoe.rotation.y = 0.45;
  parent.add(canoe);
  const hull = sphere.clone();
  const body = mesh(canoe, hull, mat('#b86449'), 0, 0.11, 0, false);
  body.scale.set(1.36, 0.25, 0.43);
  box(canoe, 1.68, 0.048, 0.4, 0, 0.28, 0, '#805646', false);
  for (const side of [-0.45, 0.45]) box(canoe, 0.18, 0.07, 0.45, side, 0.31, 0, pale, false);

  const lamps = [];
  for (const [x, z] of [[-2.7, -1.3], [3.2, 0.1], [-3, 5.3], [4.4, 6.6], [-13, 1.6], [14, 0.5], [-6, -9]]) {
    cylinder(parent, 0.09, 0.13, 2.12, x, 1.06, z, '#675846', 5);
    box(parent, 0.39, 0.11, 0.38, x, 2.33, z, '#634b37');
    const glass = new T.MeshStandardMaterial({ color: '#eac58a', emissive: '#ffad49', emissiveIntensity: 0.15 });
    box(parent, 0.26, 0.32, 0.25, x, 2.13, z, glass);
    const glow = new T.PointLight('#ffc478', 0, 5.6);
    glow.position.set(x, 2.05, z);
    if (lamps.length < 2) parent.add(glow);
    lamps.push({ glass, glow });
  }

  const pennants = new T.Group();
  parent.add(pennants);
  const pennant = new T.BufferGeometry();
  pennant.setAttribute('position', new T.Float32BufferAttribute([0, 0, 0, 0.48, 0, 0, 0.24, -0.48, 0], 3));
  pennant.computeVertexNormals();
  for (let i = 0; i < 11; i++) {
    const a = i / 10;
    const item = new T.Mesh(pennant, new T.MeshBasicMaterial({color: [gold,'#b55f4c','#e5d7a0','#629991','#8c7598'][i % 5], side: T.DoubleSide}));
    item.position.set(-3.0 + a * 5.85, 2.49 - Math.sin(a * Math.PI) * 0.6, 0.15);
    pennants.add(item);
  }
  for (const x of [-3.2, 3.25]) cylinder(parent, 0.055, 0.09, 2.58, x, 1.29, 0.15, cedar, 5);
  const line = new T.Line(new T.BufferGeometry().setFromPoints(Array.from({length: 15}, (_, i) => {
    const a = i / 14;
    return new T.Vector3(-3.2 + a * 6.45, 2.54 - Math.sin(a * Math.PI) * 0.7, 0.15);
  })), new T.LineBasicMaterial({color: '#695341'}));
  parent.add(line);
  return { lamps, glints };
}

function table(g: T.Group, x: number, z: number, w: number, tint = pale) {
  box(g, w, 0.13, 0.76, x, 1.0, z, tint);
  for (const side of [-1, 1]) {
    box(g, 0.17, 0.72, 0.55, x + side * (w / 2 - 0.18), 0.59, z, cedar);
  }
}

export function workshop(parent: T.Group, room: Workshop) {
  const group = new T.Group();
  const [x, z] = room.position;
  group.position.set(x, 0, z);
  group.userData.room = room.id;
  parent.add(group);
  const color = palette[room.type];
  const tile = room.type === 'nature' ? '#9b895d' : '#c69869';
  box(group, 6.55, 0.31, 4.68, 0, 0.18, 0, '#84614a');
  for (let i = 0; i < 10; i++) box(group, 6.49, 0.089, 0.437, 0, 0.366, -2.02 + i * 0.448, i % 3 === 0 ? pale : tile, false);
  box(group, 1.75, 0.16, 0.55, 0, 0.1, 2.57, cedar);
  box(group, 1.65, 0.12, 0.5, 0, 0.22, 2.36, pale);
  const roof = new T.Group();
  group.add(roof);
  const cover = new T.MeshStandardMaterial({ color: color.roof, roughness: 0.83, transparent: true, side: T.DoubleSide });
  const frame = new T.MeshStandardMaterial({ color: color.trim, roughness: 0.9, transparent: true });
  for (const side of [-1, 1]) {
    const sheet = box(roof, 3.72, 0.15, 5.09, side * 1.75, 3.28, 0, cover);
    sheet.rotation.z = -side * 0.39;
    for (const a of [-2.24, -1.49, -0.75, 0, 0.75, 1.49, 2.24]) {
      if (room.type !== 'nature' && Math.abs(a) !== 2.24) continue;
      const strip = box(roof, 3.77, 0.075, 0.1, side * 1.77, 3.37, a, frame);
      strip.rotation.z = -side * 0.39;
    }
  }
  box(roof, 0.18, 0.16, 5.22, 0, 4.06, 0, frame);
  const upper = new T.MeshStandardMaterial({ color: color.wall, transparent: true, roughness: 0.91 });
  box(roof, 6.5, room.type === 'nature' ? 0.22 : 1.49, 0.15, 0, 2.1, -2.18, upper);
  for (const side of [-1, 1]) {
    box(roof, 0.15, 1.32, 4.35, side * 3.18, 1.88, 0, upper);
    box(group, 0.19, 0.58, 4.42, side * 3.19, 0.67, 0, color.trim);
    for (const zz of [-2.13, 2.13]) box(group, 0.14, 2.38, 0.15, side * 3.18, 1.57, zz, color.trim);
  }
  box(group, 6.45, 0.57, 0.13, 0, 0.68, -2.16, color.trim);
  box(roof, 6.4, 0.18, 0.17, 0, 2.68, 2.14, frame);
  if (room.type !== 'nature') {
    for (const side of [-1, 1]) {
      box(roof, 1.9, 1.42, 0.13, side * 2.12, 1.84, 2.15, upper);
      box(roof, 0.88, 0.66, 0.16, side * 2.11, 1.9, 2.23, frame);
    }
  } else {
    upper.color.set('#b0c193');
    cover.color.set('#a7bf99');
  }
  const sign = box(roof, 1.49, 0.41, 0.1, 0, 2.47, 2.29, frame);
  for (const i of [-0.46, -0.15, 0.16, 0.47]) box(sign, 0.07, 0.33, 1.1, i, 0, 0.1, gold, false);

  for (const xx of [-1.79, 1.79]) {
    if (room.type === 'nature') {
      box(group, 2.35, 0.56, 1.03, xx, 0.67, -0.62, '#966846');
      box(group, 2.21, 0.09, 0.9, xx, 0.98, -0.62, '#674538', false);
      for (let i = 0; i < 5; i++) for (const zz of [-0.84, -0.44]) {
        orb(group, xx - 0.81 + i * 0.4, 1.15, zz, 0.16, i % 2 ? '#6c894e' : '#92a955', 1.62);
      }
    } else {
      table(group, xx, -0.67, 2.33, room.type === 'people' ? '#eed09b' : pale);
    }
  }
  const prop = new T.Group();
  group.add(prop);
  const learners: ReturnType<typeof figure>[] = [];
  let robotHead: T.Group | undefined;
  switch (room.type) {
    case 'nature':
      cylinder(prop, 0.24, 0.19, 0.32, 0, 0.6, -1.44, '#cc9562');
      orb(prop, 0, 0.86, -1.44, 0.23, '#779f59', 1.75);
      box(prop, 0.43, 0.3, 0.5, 1.2, 0.58, 1.52, '#83a6a1');
      box(prop, 1.05, 0.18, 0.64, 1.95, 0.48, -1.6, '#c08568');
      const body = orb(prop, 1.89, 0.67, -1.6, 0.21, '#ecd4a8', 0.53);
      body.scale.x = 0.34;
      orb(prop, 2.14, 0.74, -1.58, 0.14, '#e4be8e');
      for (const z of [-1.66, -1.50]) {
        const ear = orb(prop, 2.08, 0.84, z, 0.087, '#c5916a', 1.24);
        ear.rotation.z = -0.43;
      }
      break;
    case 'tech':
      box(prop, 0.72, 0.22, 0.51, -1.8, 1.18, -0.71, dark);
      box(prop, 0.59, 0.48, 0.38, -1.8, 1.48, -0.72, '#8eada7');
      robotHead = new T.Group();
      robotHead.position.set(-1.8, 1.84, -0.71);
      robotHead.userData.animated = true;
      prop.add(robotHead);
      box(robotHead, 0.43, 0.26, 0.33, 0, 0, 0, '#a9bdb0');
      for (const x of [-0.12, 0.11]) box(robotHead, 0.071, 0.063, 0.023, x, 0.02, 0.177, '#f0ce74');
      for (let i = 0; i < 4; i++) box(prop, 0.38, 0.065, 0.14, 1.13 + i * 0.36, 1.1, -0.6, ['#a4684c','#617b77','#6c6e60','#b88858'][i]);
      break;
    case 'people':
      for (let i = 0; i < 7; i++) {
        box(prop, 0.21, 0.1, 0.3, -2.59 + i * 0.24, 1.13, -0.64, i % 2 ? '#a86354' : '#859d69').rotation.y = i * 0.26;
      }
      for (const v of [-1.65, 1.75]) cylinder(prop, 0.36, 0.39, 0.29, v, 0.58, 1.11, '#ad735a');
      for (const [i, x] of [-1.70, 1.76].entries()) {
        const learner = figure(group, {
          id: 'visitor', color: i === 0 ? '#b4bd7a' : '#e5a46f',
          hair: i === 0 ? '#546044' : '#654634', skin: '#cb9a75', style: i === 0 ? 'crop' : 'bob',
        });
        learner.root.position.set(x, 0.41, -1.55);
        learner.root.scale.setScalar(0.65);
        learner.root.userData = { animated: true };
        learner.root.visible = false;
        learners.push(learner);
      }
      break;
    case 'signs':
      for (const v of [-2.26, 1.64]) {
        box(prop, 0.86, 0.09, 0.48, v, 1.1, -0.65, '#516b68');
        box(prop, 0.78, 0.48, 0.083, v, 1.38, -0.86, '#4b6a67').rotation.x = -0.14;
        for (let i = 0; i < 3; i++) box(prop, 0.51 - i * 0.085, 0.027, 0.07, v - i * 0.039, 1.47 - i * 0.085, -0.794, '#b4c79e', false);
      }
      break;
    case 'art':
      for (const v of [-1.7, 1.75]) {
        for (const u of [-0.3, 0.3]) box(prop, 0.1, 1.36, 0.12, v + u, 1.15, -1.43, cedar).rotation.z = u * -0.65;
        box(prop, 0.92, 0.83, 0.08, v, 1.43, -1.31, '#ead9b6').rotation.x = -0.16;
        for (const [dx, dy, col] of [[-0.18, -0.14, '#c58072'], [0.13, 0.13, '#9b88a1'], [0.22, -0.2, '#8ca59a']] as const)
          box(prop, 0.21, 0.17, 0.03, v + dx, 1.43 + dy, -1.24, col).rotation.z = dx * 2.1;
      }
      break;
  }
  return { group, roof, cover, frame, upper, learners, robotHead, fade: 1 };
}

export function figure(parent: T.Group, teen: Pick<Teen, 'id' | 'color' | 'skin' | 'hair' | 'style'>) {
  const root = new T.Group();
  root.userData.teen = teen.id;
  parent.add(root);
  const chest = new T.Group();
  root.add(chest);
  const hips = '#455b5e';
  const arms: T.Group[] = [], legs: T.Group[] = [];
  box(chest, 0.5, 0.62, 0.31, 0, 1.03, 0, teen.color);
  box(chest, 0.12, 0.19, 0.329, 0.08, 1.05, 0.01, '#dcd0a7');
  cylinder(chest, 0.09, 0.1, 0.18, 0, 1.34, 0, teen.skin);
  orb(chest, 0, 1.62, 0.015, 0.276, teen.skin, 1.11);
  const hair = orb(chest, 0, 1.74, -0.045, 0.276, teen.hair, 0.75);
  hair.scale.z *= 1.03;
  if (teen.style === 'bob') {
    for (const s of [-1, 1]) box(chest, 0.13, 0.33, 0.31, s * 0.2, 1.56, -0.11, teen.hair).rotation.z = s * -0.18;
  }
  if (teen.style === 'bun') orb(chest, 0, 1.94, -0.075, 0.13, teen.hair);
  if (teen.style === 'pony') orb(chest, 0, 1.52, -0.28, 0.14, teen.hair, 1.88);
  for (const s of [-1, 1]) {
    box(chest, 0.035, 0.044, 0.025, s * 0.085, 1.618, 0.268, '#453633', false);
    const arm = new T.Group();
    arm.position.set(s * 0.29, 1.26, 0);
    box(arm, 0.17, 0.25, 0.19, 0, -0.09, 0, teen.color);
    box(arm, 0.138, 0.27, 0.15, 0, -0.315, 0, teen.skin);
    chest.add(arm);
    arms.push(arm);
    const leg = new T.Group();
    leg.position.set(s * 0.131, 0.77, 0);
    box(leg, 0.2, 0.55, 0.225, 0, -0.25, 0, hips);
    box(leg, 0.212, 0.15, 0.34, 0, -0.58, 0.07, '#f0dbb2');
    root.add(leg);
    legs.push(leg);
  }
  return { root, arms, legs, chest };
}



// Each tool follows a shoulder joint, so the work reads at both map and close range.
export function toolsFor(arm: T.Group) {
  const groups = new Map<Axis, T.Group>();
  const tool = (type: Axis) => {
    const group = new T.Group();
    group.position.set(0, -0.45, 0.035);
    group.visible = false;
    arm.add(group);
    groups.set(type, group);
    return group;
  };
  const can = tool('nature');
  box(can, 0.25, 0.25, 0.36, 0, -0.03, 0.07, '#699d9c', false);
  box(can, 0.06, 0.09, 0.29, 0, 0.09, 0.3, '#83afad', false).rotation.x = -0.42;
  box(can, 0.11, 0.12, 0.08, 0, 0.145, 0.43, '#aec0a4', false);
  const driver = tool('tech');
  box(driver, 0.12, 0.10, 0.19, 0, -0.01, 0.035, '#b76240', false);
  box(driver, 0.041, 0.043, 0.25, 0, -0.01, 0.23, '#a8bbaf', false);
  const card = tool('people');
  box(card, 0.33, 0.063, 0.25, 0, -0.027, 0.1, '#edc98c', false);
  box(card, 0.06, 0.019, 0.15, 0, -0.062, 0.1, '#ad6d57', false);
  const numbers = tool('signs');
  box(numbers, 0.25, 0.05, 0.31, 0, -0.028, 0.1, '#789990', false);
  for (let i = 0; i < 3; i++) box(numbers, 0.12, 0.018, 0.022, -0.01, -0.058, i * 0.055 + 0.04, '#e6d0a6', false);
  const brush = tool('art');
  box(brush, 0.071, 0.085, 0.34, 0, -0.006, 0.14, '#d7a76e', false);
  box(brush, 0.09, 0.092, 0.1, 0, -0.006, 0.32, '#d2837a', false);
  return groups;
}
