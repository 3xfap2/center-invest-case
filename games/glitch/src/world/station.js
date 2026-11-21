// Станция Рассвет. Ночь, тёплые лампы, платформа на севере (−Z).
// План (x слева направо, z с севера на юг):
//   z от −8 до −4: пути ниже платформы; z от −4 до −1: платформа; z от −1 до 7: зал ожидания под крышей.
//   Запад (x < −9): архив 3.7×3.7 м с дверью в стене зала. Восток (x = 9): служебный выход, перед ним терминал.
//   Юго-запад зала: будка смотрителя со стойкой, журналом, крюком с фонарём и Лисом.
import * as THREE from 'three';
import { mat, uniqueMat, box, collider, textPlane, PAL } from './build.js';
import { createCharacter, animateCharacter, faceTowards, hitbox, ccyl, csphere, ccone, shade } from './characters.js';

const HALL_H = 4.2;
const WALL_IN = 9.0; // внутренняя грань боковых стен зала (x = ±9)

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noise(t) {
  return Math.sin(t * 7.3) * 0.5 + Math.sin(t * 13.1 + 1.3) * 0.3 + Math.sin(t * 23.7 + 2.1) * 0.2;
}

function gradientPlane(w, h, bottom, top) {
  const geo = new THREE.PlaneGeometry(w, h, 1, 4);
  const cb = new THREE.Color(bottom);
  const ct = new THREE.Color(top);
  const pos = geo.attributes.position;
  const cols = [];
  for (let i = 0; i < pos.count; i++) {
    const k = (pos.getY(i) + h / 2) / h;
    const c = cb.clone().lerp(ct, Math.pow(k, 0.6));
    cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, depthWrite: false }));
}

// Полупрозрачный «луч» света: цвет вершин к краю гаснет до чёрного, смешивание аддитивное.
function glowMesh(verts, colors, indices) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  m.visible = false;
  return m;
}

// Фонарь: начало координат у верха ручки (за неё вешают на крюк).
const ringGeo = new THREE.TorusGeometry(0.05, 0.009, 4, 10);
function lanternModel(glassMat, flameMat) {
  const g = new THREE.Group();
  const metal = 0x2b2622;
  const ring = new THREE.Mesh(ringGeo, mat(metal));
  ring.position.y = -0.05;
  g.add(ring);
  const cap = ccone(0.11, 0.08, metal, 0, -0.17, 0, 4);
  cap.rotation.y = Math.PI / 4;
  g.add(cap);
  g.add(box(0.16, 0.02, 0.16, metal, 0, -0.19, 0));
  g.add(box(0.12, 0.2, 0.12, 0, 0, -0.39, 0, glassMat));
  g.add(csphere(0.028, 0, 0, -0.31, 0, 5, flameMat));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(box(0.018, 0.2, 0.018, metal, sx * 0.065, -0.39, sz * 0.065));
  g.add(box(0.17, 0.04, 0.17, metal, 0, -0.43, 0));
  return g;
}

function bench(len = 2.0) {
  const g = new THREE.Group();
  const iron = PAL.stationTrim;
  for (const z of [-0.15, 0, 0.15]) g.add(box(len, 0.05, 0.13, PAL.bench, 0, 0.42, z));
  for (const y of [0.6, 0.78]) {
    const b = box(len, 0.11, 0.04, PAL.bench, 0, y, -0.24);
    b.rotation.x = -0.12;
    g.add(b);
  }
  for (const s of [-1, 1]) {
    const x = s * (len / 2 - 0.15);
    g.add(box(0.06, 0.42, 0.48, iron, x, 0, 0));
    g.add(box(0.06, 0.5, 0.05, iron, x, 0.45, -0.26));
    g.add(box(0.06, 0.04, 0.46, iron, x, 0.62, 0));
  }
  return g;
}

export function createStation() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAL.sky);
  scene.fog = new THREE.Fog(PAL.sky, 16, 50);

  const colliders = [];
  const R = (minX, maxX, minZ, maxZ) => {
    const c = { minX, maxX, minZ, maxZ };
    colliders.push(c);
    return c;
  };
  const C = (x, z, w, d) => {
    const c = collider(x, z, w, d);
    colliders.push(c);
    return c;
  };
  const add = (m, parent = scene) => {
    parent.add(m);
    return m;
  };

  // ---------- свет: 3 точечных (две лампы зала и холодный свет служебной двери) ----------
  scene.add(new THREE.HemisphereLight(0x46527c, 0x2a1e16, 0.6));
  const moon = new THREE.DirectionalLight(0x9fb2ff, 0.5);
  moon.position.set(-15, 25, -30);
  scene.add(moon);
  const lampLights = [
    { light: new THREE.PointLight(0xffc47a, 11, 7.5, 2), base: 11, pos: [-3.75, 2.9, 2.3] },
    { light: new THREE.PointLight(0xffc47a, 12, 10, 2), base: 12, pos: [3.25, 2.9, 2.3] },
  ];
  for (const l of lampLights) {
    l.light.position.set(...l.pos);
    scene.add(l.light);
  }
  const doorLight = new THREE.PointLight(0xa8dcff, 0, 7, 2);
  doorLight.position.set(8.5, 1.3, 3.9);
  scene.add(doorLight);

  // ---------- небо, луна, холмы, звёзды ----------
  const r = rng(11);
  const sky = gradientPlane(320, 100, 0x262b52, PAL.sky);
  sky.position.set(0, 14, -100);
  scene.add(sky);
  scene.add(csphere(4, 0, -28, 26, -92, 10, new THREE.MeshBasicMaterial({ color: 0xf3edd6, fog: false })));
  scene.add(csphere(6.5, 0, -28, 26, -93, 10, new THREE.MeshBasicMaterial({ color: 0x5a6494, transparent: true, opacity: 0.18, fog: false, depthWrite: false })));
  const hillMat = new THREE.MeshBasicMaterial({ color: 0x0f1528, fog: false });
  [[-45, -80, 34, 14], [-10, -88, 40, 10], [30, -78, 30, 16], [60, -85, 36, 11], [-75, -75, 30, 9]].forEach(([x, z, rr, h]) => {
    add(ccone(rr, h, 0, x, -1.2, z, 6, hillMat));
  });
  {
    const n = 380;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const el = 0.08 + Math.pow(r(), 0.7) * 1.3;
      const rad = 120;
      pos[i * 3] = Math.cos(a) * Math.cos(el) * rad;
      pos[i * 3 + 1] = Math.sin(el) * rad;
      pos[i * 3 + 2] = Math.sin(a) * Math.cos(el) * rad - 20;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xdfe8ff, size: 1.6, sizeAttenuation: false, fog: false })));
  }

  // ---------- земля, пути, деревья ----------
  add(box(90, 0.2, 30, 0x1a1d1a, 0, -0.21, 11)); // земля вокруг зала (z от −4 до 26)
  add(box(90, 0.1, 55, 0x161a17, 0, -1.25, -31.6)); // земля у путей
  add(box(90, 1.1, 0.4, 0x2a2826, 0, -1.2, -4.3)); // откос
  add(box(90, 0.12, 3.6, 0x34302c, 0, -1.2, -6.5)); // щебень
  for (const z of [-5.75, -7.25]) add(box(90, 0.1, 0.07, 0x7a716a, 0, -1.06, z));
  {
    const n = 128;
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.22, 0.06, 2.3), mat(PAL.sleeper), n);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
      m4.makeTranslation(-44.5 + i * 0.7, -1.05, -6.5);
      im.setMatrixAt(i, m4);
    }
    scene.add(im);
  }
  {
    // забор за путями
    const n = 46;
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.08, 1.0, 0.08), mat(0x2a2522), n);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
      m4.makeTranslation(-45 + i * 2, -0.65, -9.8);
      im.setMatrixAt(i, m4);
    }
    scene.add(im);
    for (const y of [-0.85, -0.35]) add(box(90, 0.05, 0.04, 0x2a2522, 0, y, -9.8));
  }
  {
    // деревья: тёмные конусы за путями и по бокам станции
    const spots = [];
    for (let i = 0; i < 44; i++) spots.push([-44 + i * 2 + r() * 1.2, -1.15, -12 - r() * 7]);
    for (let i = 0; i < 10; i++) spots.push([12 + r() * 10, -0.05, -2 + r() * 12]);
    for (let i = 0; i < 10; i++) spots.push([-15 - r() * 9, -0.05, -2 + r() * 12]);
    const im = new THREE.InstancedMesh(new THREE.ConeGeometry(1, 1, 5), mat(0x13211d), spots.length);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    spots.forEach(([x, y, z], i) => {
      const s = 1.1 + r() * 1.4;
      const h = 3 + r() * 4;
      m4.compose(new THREE.Vector3(x, y + h / 2, z), q, new THREE.Vector3(s, h, s));
      im.setMatrixAt(i, m4);
    });
    scene.add(im);
  }
  // светофор за путями
  add(ccyl(0.06, 0.06, 3.2, 0x2a2522, 8.5, -1.15, -8.8, 6));
  add(box(0.25, 0.5, 0.2, 0x1a1a1a, 8.5, 1.6, -8.8));
  add(csphere(0.07, 0, 8.5, 1.95, -8.68, 6, new THREE.MeshBasicMaterial({ color: 0x5cff9a, fog: false })));

  // ---------- платформа ----------
  add(box(18.4, 1.2, 3.1, PAL.platform, 0, -1.2, -2.55)); // z от −4.1 до −1
  add(box(18.4, 0.02, 0.3, 0x85858a, 0, 0, -3.95)); // бордюр
  add(box(18.4, 0.025, 0.18, PAL.platformEdge, 0, 0, -3.72)); // жёлтая линия
  R(-9.4, 9.4, -4.4, -3.8); // невидимая стена по краю платформы
  // ограждения по краям платформы
  for (const s of [-1, 1]) {
    const x = s * 9.15;
    for (const z of [-3.9, -2.5, -1.1]) add(box(0.08, 1.0, 0.08, PAL.stationTrim, x, 0, z));
    for (const y of [0.5, 0.95]) add(box(0.05, 0.05, 2.9, PAL.stationTrim, x, y, -2.5));
  }
  // фонари на платформе
  const globeMat = new THREE.MeshBasicMaterial({ color: 0xffe2a8 });
  for (const x of [-6.8, 6.8]) {
    add(ccyl(0.05, 0.07, 3.0, PAL.stationTrim, x, 0, -2.6, 6));
    add(box(0.1, 0.1, 0.1, PAL.stationTrim, x, 2.95, -2.6));
    add(csphere(0.16, 0, x, 3.18, -2.6, 8, globeMat));
    C(x, -2.6, 0.3, 0.3);
  }

  // ---------- зал: пол, стены, крыша ----------
  add(box(18, 0.02, 8, PAL.stationFloor, 0, 0, 3)); // z от −1 до 7
  {
    // плитка в шахматном порядке
    const tiles = [];
    for (let ix = 0; ix < 18; ix++) for (let iz = 0; iz < 8; iz++) if ((ix + iz) % 2 === 0) tiles.push([-8.5 + ix, -0.5 + iz]);
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.004, 1), mat(shade(PAL.stationFloor, 0.84)), tiles.length);
    const m4 = new THREE.Matrix4();
    tiles.forEach(([x, z], i) => {
      m4.makeTranslation(x, 0.021, z);
      im.setMatrixAt(i, m4);
    });
    scene.add(im);
  }
  const wallMat = mat(PAL.stationWall);
  // юг
  add(box(18.6, HALL_H, 0.3, 0, 0, 0, 7.15, wallMat));
  R(-9.4, 9.4, 7.0, 7.4);
  // запад: проём двери архива z от 1.85 до 3.15
  add(box(0.3, HALL_H, 2.85, 0, -9.15, 0, 0.425, wallMat));
  add(box(0.3, HALL_H, 4.15, 0, -9.15, 0, 5.225, wallMat));
  add(box(0.3, HALL_H - 2.25, 1.3, 0, -9.15, 2.25, 2.5, wallMat));
  R(-9.4, -WALL_IN, -4.4, 1.85);
  R(-9.4, -WALL_IN, 3.15, 7.4);
  // восток: проём служебного выхода z от 3.0 до 4.0 (закрыт нарисованной дверью)
  add(box(0.3, HALL_H, 4.15, 0, 9.15, 0, 0.925, wallMat));
  add(box(0.3, HALL_H, 3.3, 0, 9.15, 0, 5.65, wallMat));
  add(box(0.3, HALL_H - 2.15, 1.0, 0, 9.15, 2.15, 3.5, wallMat));
  R(WALL_IN, 9.4, -4.4, 7.4); // стена и дверь-декорация: коллайдер всегда
  // панели, поручень, карниз
  const trim = PAL.stationTrim;
  add(box(18, 1.0, 0.04, trim, 0, 0, 6.98));
  add(box(18, 0.06, 0.07, PAL.wood, 0, 1.0, 6.965));
  add(box(18.2, 0.15, 0.1, trim, 0, 3.7, 6.95));
  for (const s of [-1, 1]) {
    const x = s * 8.98;
    const segs = s < 0 ? [[-1, 1.75], [3.25, 7]] : [[-1, 2.92], [4.08, 7]];
    for (const [z0, z1] of segs) {
      add(box(0.04, 1.0, z1 - z0, trim, x, 0, (z0 + z1) / 2));
      add(box(0.07, 0.06, z1 - z0, PAL.wood, x, 1.0, (z0 + z1) / 2));
    }
    add(box(0.1, 0.15, 8, trim, s * 8.95, 3.7, 3));
  }
  // крыша и балки
  add(box(18.6, 0.2, 9.8, trim, 0, HALL_H, 2.3));
  for (const z of [-0.95, 1.4, 3.8, 6.2]) add(box(18.3, 0.22, 0.18, PAL.wood, 0, HALL_H - 0.22, z));
  // колонны между залом и платформой
  for (const x of [-6, -2, 2, 6]) {
    add(ccyl(0.11, 0.13, HALL_H - 0.22, trim, x, 0, -1.0, 8));
    add(box(0.36, 0.2, 0.36, trim, x, 0, -1.0));
    add(box(0.34, 0.12, 0.34, trim, x, HALL_H - 0.34, -1.0));
    C(x, -1.0, 0.4, 0.4);
  }

  // табличка «Станция Рассвет», двусторонняя, висит над входом в зал
  add(box(3.7, 0.62, 0.08, trim, 0, 3.15, -0.95));
  for (const x of [-1.5, 1.5]) add(ccyl(0.012, 0.012, 0.3, 0x1a1a1a, x, 3.76, -0.95, 4));
  {
    const opts = { width: 3.5, height: 0.52, bg: '#22403a', fg: '#f2e6c8', font: 'bold 170px serif' };
    const a = textPlane('Станция Рассвет', opts);
    a.position.set(0, 3.46, -1.0);
    a.rotation.y = Math.PI;
    add(a);
    const b = textPlane('Станция Рассвет', opts);
    b.position.set(0, 3.46, -0.9);
    add(b);
  }

  // ---------- подвесные лампы ----------
  const bulbMats = [];
  for (const x of [-5.5, -2.0, 1.5, 5.0]) {
    const bm = uniqueMat(PAL.lamp, { emissive: PAL.lamp, emissiveIntensity: 1 });
    bulbMats.push(bm);
    add(ccyl(0.012, 0.012, HALL_H - 0.22 - 3.24, 0x1a1a1a, x, 3.24, 2.3, 4)); // провод
    add(ccone(0.34, 0.24, 0x2f4a3c, x, 3.0, 2.3, 8));
    add(ccyl(0.3, 0.3, 0.01, 0, x, 2.99, 2.3, 8, bm)); // светящаяся изнанка абажура
    add(csphere(0.09, 0, x, 2.95, 2.3, 6, bm));
  }

  // ---------- скамейки ----------
  for (const [x, z] of [[-2.2, 0.7], [1.8, 0.7], [-0.6, 3.1], [-4.0, -1.85]]) {
    const b = bench();
    b.position.set(x, 0, z);
    b.rotation.y = Math.PI; // лицом к платформе
    scene.add(b);
    C(x, z, 2.0, 0.62);
  }
  // баговая скамейка: висит и вращается
  const bugPivot = new THREE.Group();
  bugPivot.position.set(3.0, 1.0, 3.0);
  const bugBench = bench();
  bugBench.position.y = -0.45;
  bugPivot.add(bugBench);
  bugPivot.add(hitbox(2.1, 0.9, 0.7, 0, 0, 0));
  scene.add(bugPivot);
  C(3.0, 3.0, 1.5, 1.5);
  const ghosts = [PAL.glitchCyan, PAL.glitchPink].map((c) => {
    const g = new THREE.Group();
    const gm = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });
    g.add(box(2.0, 0.08, 0.45, 0, 0, -0.03, 0, gm));
    g.add(box(2.0, 0.3, 0.04, 0, 0, 0.13, -0.24, gm));
    g.visible = false;
    scene.add(g);
    return g;
  });

  // ---------- часы на южной стене ----------
  const clock = new THREE.Group();
  clock.position.set(0.8, 2.75, 6.95);
  {
    const rim = ccyl(0.9, 0.9, 0.1, trim, 0, 0, 0, 16);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 0, 0);
    clock.add(rim);
    const face = ccyl(0.8, 0.8, 0.02, 0, 0, 0, 0, 16, mat(PAL.clockFace, { emissive: 0x3a3428 }));
    face.rotation.x = Math.PI / 2;
    face.position.set(0, 0, -0.055);
    clock.add(face);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const big = i % 3 === 0;
      const tk = box(big ? 0.05 : 0.03, big ? 0.14 : 0.09, 0.01, 0x2a2420, 0, 0, 0);
      tk.position.set(Math.sin(a) * 0.68, Math.cos(a) * 0.68, -0.07);
      tk.rotation.z = -a;
      clock.add(tk);
    }
    const name = textPlane('РАССВЕТ', { width: 0.36, height: 0.08, transparentBg: true, fg: '#3f2e25', font: 'bold 180px serif' });
    name.position.set(0, -0.3, -0.07);
    name.rotation.y = Math.PI;
    clock.add(name);
  }
  const hand = (w, len, color, z) => {
    const p = new THREE.Group();
    p.position.z = z;
    p.add(box(w, len, 0.012, color, 0, -0.08, 0));
    clock.add(p);
    return p;
  };
  const hourHand = hand(0.06, 0.45, 0x1e1a18, -0.08);
  const minHand = hand(0.04, 0.68, 0x1e1a18, -0.09);
  const secHand = hand(0.015, 0.74, 0xc0392b, -0.1);
  const cap = ccyl(0.04, 0.04, 0.04, 0x1e1a18, 0, 0, 0, 8);
  cap.rotation.x = Math.PI / 2;
  cap.position.z = -0.11;
  clock.add(cap);
  clock.add(hitbox(1.8, 1.8, 0.25, 0, 0, -0.05));
  scene.add(clock);

  // ---------- расписание, плакат, урны, забытый чемодан, растения ----------
  add(box(2.36, 1.42, 0.06, trim, 5.0, 1.6, 6.97));
  {
    const txt = 'РАСПИСАНИЕ ПОЕЗДОВ\n01:10  на Полдень     по графику\n02:45  на Туман       задержан\n03:17  Сборка 0.9.3   отменён\n05:30  Утренний       по графику';
    const tp = textPlane(txt, { width: 2.2, height: 1.3, bg: '#141a22', fg: '#ffcf7a', font: 'bold 50px monospace', align: 'left', pad: 40, lineHeight: 1.45 });
    tp.position.set(5.0, 2.31, 6.935);
    tp.rotation.y = Math.PI;
    add(tp);
  }
  {
    const tp = textPlane('НЕ ЗАБЫВАЙТЕ\nСВОИ ВЕЩИ', { width: 0.8, height: 0.6, bg: '#e8dcc0', fg: '#5a2f22', font: 'bold 120px sans-serif' });
    tp.position.set(-1.9, 1.95, 6.975);
    tp.rotation.y = Math.PI;
    add(tp);
  }
  for (const [x, z] of [[-3.65, 0.7], [4.2, -0.4], [7.8, 0.6]]) {
    add(ccyl(0.2, 0.16, 0.6, 0x34453a, x, 0, z, 8));
    add(ccyl(0.22, 0.22, 0.04, 0x26332b, x, 0.6, z, 8));
    C(x, z, 0.45, 0.45);
  }
  add(box(0.45, 0.6, 0.2, 0x7a3b2a, 3.15, 0, 0.75)); // чемодан
  add(box(0.16, 0.04, 0.04, 0x2a2420, 3.15, 0.6, 0.75));
  C(3.15, 0.75, 0.5, 0.3);
  for (const x of [8.35, -8.35]) {
    add(ccyl(0.25, 0.2, 0.45, 0x8a4a2e, x, 0, 6.4, 7));
    for (const [dx, dy, dz, rr] of [[0, 0.85, 0, 0.32], [0.15, 1.15, 0.05, 0.24], [-0.12, 1.1, -0.06, 0.22]]) add(csphere(rr, PAL.plant, x + dx, dy, 6.4 + dz, 5));
    C(x, 6.4, 0.55, 0.55);
  }

  // ---------- будка смотрителя ----------
  const wood = PAL.wood;
  for (const x of [-6.25, -3.15]) add(box(0.3, 2.6, 0.3, wood, x, 0, 4.15));
  add(box(0.1, 2.6, 2.7, shade(wood, 0.8), -6.3, 0, 5.65));
  add(box(0.1, 2.6, 2.7, shade(wood, 0.8), -3.1, 0, 5.65));
  add(box(3.7, 0.15, 3.25, trim, -4.7, 2.6, 5.45));
  add(box(3.6, 0.42, 0.06, trim, -4.7, 2.28, 3.92));
  {
    const sign = textPlane('Смотритель', { width: 1.6, height: 0.32, bg: '#3f2e25', fg: '#f2d9a6', font: 'bold 150px serif' });
    sign.position.set(-4.7, 2.49, 3.885);
    sign.rotation.y = Math.PI;
    add(sign);
  }
  add(box(2.8, 1.0, 0.55, wood, -4.7, 0, 4.35)); // стойка
  add(box(3.0, 0.05, 0.72, trim, -4.7, 1.0, 4.36)); // столешница
  for (const x of [-5.65, -4.7, -3.75]) add(box(0.78, 0.6, 0.02, PAL.bench, x, 0.2, 4.07));
  // звонок и чернильница
  add(ccyl(0.06, 0.07, 0.02, 0x8a7a5a, -5.4, 1.05, 4.3, 8));
  add(csphere(0.05, 0xc8a050, -5.4, 1.09, 4.3, 6));
  add(ccyl(0.03, 0.035, 0.05, 0x1a1a2a, -3.65, 1.05, 4.25, 6));
  // полка и мелочи в будке
  add(box(2.6, 0.04, 0.3, wood, -4.7, 1.45, 6.82));
  add(box(0.3, 0.2, 0.18, 0x5a3a2a, -5.6, 1.49, 6.85)); // радио
  add(ccyl(0.07, 0.08, 0.16, 0x7a8a8a, -4.9, 1.49, 6.85, 7)); // чайник
  add(csphere(0.07, 0, -3.8, 1.6, 6.85, 6, mat(PAL.lamp, { emissive: PAL.lamp, emissiveIntensity: 0.9 }))); // ночник
  for (let i = 0; i < 4; i++) add(box(0.05, 0.24, 0.18, [0x7a2f2f, 0x2c4a7a, 0x3a5a3a, 0x8a6a3a][i], -4.35 + i * 0.07, 1.49, 6.85));
  add(box(0.5, 0.35, 0.03, wood, -5.6, 1.75, 6.97)); // ключница
  for (let i = 0; i < 3; i++) add(box(0.03, 0.08, 0.01, 0xc8a050, -5.75 + i * 0.15, 1.8, 6.95));
  R(-6.45, -2.95, 4.0, 7.0);

  // журнал путешественников
  const coverMat = uniqueMat(PAL.book);
  const pagesMat = uniqueMat(0xf2ead8);
  const journal = new THREE.Group();
  journal.position.set(-4.05, 1.05, 4.32);
  journal.rotation.y = 0.18;
  journal.add(box(0.34, 0.06, 0.26, 0, 0, 0, 0, coverMat));
  journal.add(box(0.33, 0.045, 0.24, 0, 0.012, 0.008, 0, pagesMat));
  journal.add(box(0.015, 0.002, 0.14, 0xc0392b, 0.08, 0.06, 0.15)); // закладка
  {
    const title = textPlane('ЖУРНАЛ', { width: 0.22, height: 0.06, bg: '#7a2f2f', fg: '#e8c66a', font: 'bold 200px serif' });
    title.rotation.set(-Math.PI / 2, 0, Math.PI); // читается со стороны зала
    title.position.set(0, 0.062, 0);
    journal.add(title);
  }
  journal.add(hitbox(0.5, 0.25, 0.42, 0, 0.1, 0));
  scene.add(journal);
  const journalBase = journal.position.clone();

  // крюк и фонарь (на передней грани левой колонны будки)
  const hook = new THREE.Group();
  hook.position.set(-6.25, 0, 4.0);
  hook.add(box(0.1, 0.14, 0.02, 0x2b2622, 0, 1.56, -0.01));
  hook.add(box(0.025, 0.025, 0.15, 0x2b2622, 0, 1.64, -0.085));
  hook.add(box(0.025, 0.06, 0.025, 0x2b2622, 0, 1.64, -0.16));
  hook.add(hitbox(0.28, 0.24, 0.22, 0, 1.66, -0.1));
  scene.add(hook);
  R(-6.45, -6.05, 3.6, 4.3);
  const hookGlass = mat(0xffd9a0, { emissive: 0xffa040, emissiveIntensity: 0.55, opacity: 0.85 });
  const hookFlame = mat(0xffe6a0, { emissive: 0xffc060, emissiveIntensity: 1 });
  const lantern = lanternModel(hookGlass, hookFlame);
  lantern.position.set(-6.25, 1.69, 3.84);
  lantern.add(hitbox(0.36, 0.56, 0.36, 0, -0.24, 0));
  scene.add(lantern);

  // Лис за стойкой
  const lis = createCharacter({ name: 'Лис', extra: 'lis' });
  lis.position.set(-4.7, 0, 5.35);
  lis.rotation.y = Math.PI;
  scene.add(lis);
  const lisBaseYaw = Math.PI;

  // ---------- архив (запад, без своего света) ----------
  const AR = { minX: -13.0, maxX: -9.3, minZ: 0.65, maxZ: 4.35 };
  const archWall = mat(0x2e2724);
  add(box(3.75, 0.02, 3.75, 0x231d1a, -11.15, 0, 2.5));
  add(box(4.3, 3.2, 0.3, 0, -11.15, 0, 0.5, archWall));
  add(box(4.3, 3.2, 0.3, 0, -11.15, 0, 4.5, archWall));
  add(box(0.3, 3.2, 4.3, 0, -13.15, 0, 2.5, archWall));
  add(box(4.4, 0.15, 4.4, trim, -11.15, 3.2, 2.5));
  R(-13.4, -9.0, 0.3, 0.65);
  R(-13.4, -9.0, 4.35, 4.7);
  R(-13.4, -13.0, 0.3, 4.7);
  {
    // стеллажи вдоль северной и южной стен
    const shelfC = 0x3e2e20;
    const boxes = [];
    const rb = rng(5);
    for (const [zc, back] of [[0.875, -1], [4.125, 1]]) {
      for (const x of [-12.5, -11.1, -9.7]) add(box(0.05, 2.25, 0.45, shelfC, x, 0, zc));
      for (const y of [0.1, 0.65, 1.2, 1.75, 2.22]) add(box(2.85, 0.04, 0.45, shelfC, -11.1, y, zc));
      add(box(2.85, 2.25, 0.02, shade(shelfC, 0.8), -11.1, 0, zc + back * 0.215));
      for (const y of [0.14, 0.69, 1.24, 1.79]) {
        let x = -12.45;
        while (x < -9.8) {
          const w = 0.28 + rb() * 0.3;
          if (x + w > -9.75) break;
          if (rb() > 0.18) {
            const h = 0.18 + rb() * 0.28;
            const d = 0.28 + rb() * 0.1;
            boxes.push([x + w / 2, y, zc, w * 0.92, h, d]);
          }
          x += w + 0.03;
        }
      }
    }
    // низкий шкаф у дальней стены и ящики у входа
    add(box(0.45, 0.95, 1.8, shelfC, -12.775, 0, 2.5));
    add(box(0.5, 0.04, 1.85, shade(shelfC, 1.2), -12.775, 0.95, 2.5));
    boxes.push([-12.8, 0.99, 1.9, 0.4, 0.3, 0.38], [-12.75, 0.99, 2.9, 0.35, 0.22, 0.4], [-9.75, 0, 3.55, 0.5, 0.5, 0.5], [-9.75, 0.5, 3.55, 0.42, 0.36, 0.42]);
    add(box(0.12, 0.42, 0.55, 0x4a2a22, -12.75, 0.99, 2.35)); // старый чемодан на шкафу
    const cardboard = [0x6a5236, 0x5a4630, 0x7a6040, 0x8a8478, 0x4e3c28];
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat(0xffffff), boxes.length);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const col = new THREE.Color();
    boxes.forEach(([x, y, z, w, h, d], i) => {
      m4.compose(new THREE.Vector3(x, y + h / 2, z), q, new THREE.Vector3(w, h, d));
      im.setMatrixAt(i, m4);
      col.setHex(cardboard[i % cardboard.length]);
      im.setColorAt(i, col);
    });
    scene.add(im);
    R(-12.9, -9.65, 0.65, 1.12);
    R(-12.9, -9.65, 3.88, 4.35);
    R(-13.0, -12.5, 1.55, 3.45);
    C(-9.75, 3.55, 0.55, 0.55);
    // мёртвая лампочка под потолком
    add(ccyl(0.01, 0.01, 0.6, 0x1a1a1a, -11.15, 2.6, 2.5, 4));
    add(csphere(0.06, 0x3a3836, -11.15, 2.56, 2.5, 6));
  }
  // надпись мелом на дальней стене (по умолчанию скрыта)
  const chalk = textPlane('н.о. 0.9.3\nжурнал тут был', { width: 2.0, height: 0.8, transparentBg: true, fg: '#f4f1e8', font: 'bold 100px "Segoe Print", "Comic Sans MS", cursive' });
  chalk.material.opacity = 0;
  chalk.material.depthWrite = false;
  chalk.visible = false;
  chalk.position.set(-12.985, 1.85, 2.5);
  chalk.rotation.set(0, Math.PI / 2, -0.04);
  scene.add(chalk);
  const chalkWall = new THREE.Group();
  chalkWall.add(hitbox(0.12, 1.2, 2.0, -12.94, 1.85, 2.5));
  scene.add(chalkWall);

  // дверь архива: петли у z = 1.85, открывается наружу в зал
  const doorC = 0x6a4a30;
  const archiveDoor = new THREE.Group();
  archiveDoor.position.set(-9.15, 0, 1.85);
  archiveDoor.add(box(0.06, 2.2, 1.3, doorC, 0, 0, 0.65));
  for (const sx of [-1, 1]) {
    archiveDoor.add(box(0.01, 0.8, 0.95, shade(doorC, 1.18), sx * 0.034, 0.25, 0.65));
    archiveDoor.add(box(0.01, 0.75, 0.95, shade(doorC, 1.18), sx * 0.034, 1.25, 0.65));
    archiveDoor.add(box(0.04, 0.03, 0.14, 0xc8a050, sx * 0.055, 1.0, 1.12));
  }
  scene.add(archiveDoor);
  add(box(0.1, 2.3, 0.1, trim, -8.97, 0, 1.8));
  add(box(0.1, 2.3, 0.1, trim, -8.97, 0, 3.2));
  add(box(0.1, 0.1, 1.5, trim, -8.97, 2.25, 2.5));
  {
    const s = textPlane('Архив', { width: 0.8, height: 0.22, bg: '#3f2e25', fg: '#f2d9a6', font: 'bold 150px serif' });
    s.position.set(-8.98, 2.6, 2.5);
    s.rotation.y = Math.PI / 2;
    add(s);
  }
  const archDoorCollider = R(-9.3, -WALL_IN, 1.85, 3.15);

  // ---------- служебный выход (восток): нарисованная дверь ----------
  const voidMat = new THREE.MeshBasicMaterial({ color: 0xd8f2ff, fog: false });
  add(box(0.5, 2.15, 1.0, 0, 9.55, 0, 3.5, voidMat)); // холодная пустота за дверью
  const serviceDoor = new THREE.Group();
  serviceDoor.position.set(8.97, 0, 2.97);
  serviceDoor.add(box(0.05, 2.2, 1.06, PAL.serviceDoor, 0, 0, 0.53));
  {
    const paint = shade(PAL.serviceDoor, 0.7);
    const x = -0.028;
    serviceDoor.add(box(0.006, 0.05, 0.9, paint, x, 1.95, 0.53));
    serviceDoor.add(box(0.006, 0.05, 0.9, paint, x, 0.12, 0.53));
    serviceDoor.add(box(0.006, 1.88, 0.05, paint, x, 0.12, 0.1));
    serviceDoor.add(box(0.006, 1.88, 0.05, paint, x, 0.12, 0.96));
    serviceDoor.add(box(0.006, 0.42, 0.5, 0x8fa4b8, x, 1.35, 0.53)); // нарисованное окошко
    serviceDoor.add(box(0.006, 0.05, 0.16, 0x2b3138, x, 1.0, 0.86)); // нарисованная ручка
    for (const y of [0.35, 1.8]) serviceDoor.add(box(0.006, 0.12, 0.03, 0x2b3138, x, y, 0.03));
  }
  scene.add(serviceDoor);
  {
    const s = textPlane('Служебный выход', { width: 1.3, height: 0.24, bg: '#2b3138', fg: '#e8edf2', font: 'bold 120px sans-serif' });
    s.position.set(8.985, 2.42, 3.5);
    s.rotation.y = -Math.PI / 2;
    add(s);
  }
  // свет из щели: пятно на полу и «луч»
  const cold = new THREE.Color(0x9fd8ff);
  const floorGlow = glowMesh(
    [9.0, 0.03, 3.9, 9.0, 0.03, 4.02, 5.6, 0.03, 3.1, 5.6, 0.03, 5.2],
    [cold.r, cold.g, cold.b, cold.r, cold.g, cold.b, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 3, 2],
  );
  const beamGlow = glowMesh(
    [9.0, 0.0, 3.97, 9.0, 2.15, 3.97, 7.2, 0.0, 4.4, 7.2, 2.6, 4.4],
    [cold.r * 0.6, cold.g * 0.6, cold.b * 0.6, cold.r * 0.6, cold.g * 0.6, cold.b * 0.6, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 3, 2],
  );
  scene.add(floorGlow, beamGlow);

  // ---------- терминал дежурного: экраном к служебному выходу ----------
  const terminal = new THREE.Group();
  terminal.position.set(5.3, 0, 3.5);
  terminal.rotation.y = Math.PI / 2; // локальный +Z смотрит в +X
  terminal.add(box(0.72, 0.06, 0.5, 0x1d2228, 0, 0, -0.05));
  terminal.add(box(0.7, 0.85, 0.45, PAL.terminal, 0, 0, -0.05));
  terminal.add(box(0.66, 0.04, 0.28, 0x3a424b, 0, 0.85, 0.2));
  terminal.add(box(0.5, 0.025, 0.16, 0x15191e, 0, 0.89, 0.2));
  {
    const head = new THREE.Group();
    head.position.set(0, 1.25, -0.1);
    head.rotation.x = -0.15;
    head.add(box(0.7, 0.54, 0.14, PAL.terminal, 0, -0.27, 0));
    const scr = textPlane('ТЕРМИНАЛ\nДЕЖУРНОГО\n\n> архив сборки_', { width: 0.6, height: 0.44, bg: '#06170f', fg: '#63e6a8', font: 'bold 92px monospace' });
    scr.position.set(0, 0, 0.072);
    head.add(scr);
    head.add(csphere(0.035, 0, 0.29, 0.3, 0, 6, mat(0xffb04a, { emissive: 0xffb04a, emissiveIntensity: 1 })));
    terminal.add(head);
  }
  terminal.add(box(0.04, 0.9, 0.04, 0x15191e, 0.3, 0, -0.3)); // кабель
  scene.add(terminal);
  R(5.0, 5.65, 3.12, 3.88);

  // ---------- точки и камеры ----------
  const yawTo = (x, z, tx, tz) => Math.atan2(-(tx - x), -(tz - z));
  const spawn = { x: 0.0, z: -2.0, yaw: yawTo(0.0, -2.0, lis.position.x, lis.position.z) };
  const points = {
    terminalView: { x: 6.2, z: 3.5, yaw: Math.PI / 2 }, // лицом к экрану (−X), служебный выход в 2.8 м строго за спиной
    lisTalk: { x: -4.7, z: 3.0, yaw: Math.PI }, // лицом к Лису (+Z)
  };
  const cams = {
    counter: { pos: [-4.5, 1.8, 2.5], look: [-4.1, 1.05, 4.3] },
    hook: { pos: [-5.5, 1.65, 2.6], look: [-6.25, 1.35, 3.9] },
    archiveDoor: { pos: [-6.3, 1.7, 3.3], look: [-9.1, 1.2, 2.5] },
    archiveInside: { pos: [-9.7, 1.65, 2.5], look: [-12.6, 1.2, 2.5] },
    serviceDoor: { pos: [6.2, 1.7, 2.2], look: [9.0, 1.1, 3.5] },
    wide: { pos: [6.8, 3.3, -2.6], look: [-3.0, 0.8, 3.8] },
  };

  // ---------- состояние ----------
  const ARCH_OPEN = 1.45; // наружу, в зал: внутри архива проход остаётся свободным
  const SERVICE_OPEN = 0.44;
  const st = {
    archOpen: false,
    archAngle: 0,
    archPendingCollider: false,
    serviceOpen: false,
    serviceAngle: 0,
    chalkTarget: 0,
    journalFx: 0, // > 0: идёт мерцание, секунды
    lastPlayer: null,
    jitter: 0,
    jitterT: 0.4,
  };
  let handLantern = null;

  function restoreJournalLook() {
    journal.position.copy(journalBase);
    journal.scale.set(1, 1, 1);
    coverMat.color.setHex(PAL.book);
    coverMat.emissive.setHex(0x000000);
    pagesMat.color.setHex(0xf2ead8);
  }

  function playerOverlaps(c) {
    const p = st.lastPlayer;
    if (!p) return false;
    const R0 = 0.3;
    return p.x + R0 > c.minX && p.x - R0 < c.maxX && p.z + R0 > c.minZ && p.z - R0 < c.maxZ;
  }

  const api = {
    resetState() {
      api.setJournalVisible(true);
      api.setLanternOnHook(true);
      st.archOpen = false;
      st.archAngle = 0;
      archiveDoor.rotation.y = 0;
      st.archPendingCollider = true;
      if (!playerOverlaps(archDoorCollider)) {
        archDoorCollider.enabled = true;
        st.archPendingCollider = false;
      }
      st.chalkTarget = 0;
      chalk.material.opacity = 0;
      chalk.visible = false;
    },
    setLanternOnHook(on) {
      lantern.visible = !!on;
    },
    setJournalVisible(on, { glitch = false } = {}) {
      if (on) {
        st.journalFx = 0;
        restoreJournalLook();
        journal.visible = true;
      } else if (glitch && journal.visible) {
        st.journalFx = 0.0001;
      } else {
        st.journalFx = 0;
        restoreJournalLook();
        journal.visible = false;
      }
    },
    openArchiveDoor() {
      st.archOpen = true;
      st.archPendingCollider = false;
      archDoorCollider.enabled = false;
    },
    closeArchiveDoor() {
      st.archOpen = false;
      st.archPendingCollider = true; // включим, когда игрок выйдет из проёма
    },
    isArchiveOpen() {
      return st.archOpen;
    },
    openServiceDoor() {
      st.serviceOpen = true;
    },
    closeServiceDoor() {
      st.serviceOpen = false;
    },
    setChalkVisible(on) {
      st.chalkTarget = on ? 1 : 0;
    },
    makeHandLantern() {
      if (handLantern) return handLantern;
      const glass = mat(0xffe2b0, { emissive: 0xffa848, emissiveIntensity: 1.1, opacity: 0.9 });
      const flame = mat(0xfff0c0, { emissive: 0xffd070, emissiveIntensity: 1.4 });
      const g = new THREE.Group();
      g.name = 'handLantern';
      const model = lanternModel(glass, flame);
      model.scale.setScalar(0.85);
      g.add(model);
      const light = new THREE.PointLight(0xffb060, 3.4, 6, 1.6);
      light.position.set(0, -0.26, -0.05);
      g.add(light);
      g.position.set(0.32, -0.06, -0.7); // в правом нижнем углу кадра, если повесить на камеру
      g.userData.light = light;
      g.userData.baseIntensity = 3.4;
      handLantern = g;
      return g;
    },
  };

  const slots = [
    { id: 'lis', object: lis },
    { id: 'lantern', object: lantern },
    { id: 'hook', object: hook },
    { id: 'journal', object: journal },
    { id: 'archive_door', object: archiveDoor },
    { id: 'service_door', object: serviceDoor },
    { id: 'clock', object: clock },
    { id: 'bench', object: bugPivot },
    { id: 'terminal', object: terminal },
    { id: 'chalk_wall', object: chalkWall },
  ];

  const sBase = 0.4;
  const mBase = 2.1;
  const hBase = -0.6;

  function update(dt, t, playerPos) {
    dt = Math.min(dt || 0, 0.1);
    if (playerPos) st.lastPlayer = { x: playerPos.x, z: playerPos.z };

    // часы идут назад: стрелки крутятся против часовой
    const TAU = Math.PI * 2;
    // для зрителя в зале (смотрит в +Z) рост rotation.z это ход по часовой, поэтому вычитаем
    secHand.rotation.z = sBase - Math.floor(t) * (TAU / 60);
    minHand.rotation.z = mBase - t * (TAU / 600);
    hourHand.rotation.z = hBase - t * (TAU / 7200);

    // баговая скамейка
    st.jitterT -= dt;
    if (st.jitterT <= 0) {
      st.jitter = 0.08 + Math.random() * 0.1;
      st.jitterT = 0.5 + Math.random() * 1.6;
    }
    const jit = st.jitter > 0;
    if (jit) st.jitter -= dt;
    bugPivot.position.set(
      3.0 + (jit ? (Math.random() - 0.5) * 0.04 : 0),
      1.0 + Math.sin(t * 1.6) * 0.06 + (jit ? (Math.random() - 0.5) * 0.03 : 0),
      3.0 + (jit ? (Math.random() - 0.5) * 0.04 : 0),
    );
    bugPivot.rotation.set(Math.sin(t * 0.8) * 0.04, t * 0.35, Math.sin(t * 1.1) * 0.06);
    ghosts.forEach((g, i) => {
      g.visible = jit;
      if (jit) {
        g.position.copy(bugPivot.position);
        g.position.x += i ? -0.05 : 0.05;
        g.rotation.copy(bugPivot.rotation);
      }
    });

    // лампы слегка мерцают, одна иногда «спотыкается»
    lampLights.forEach((l, i) => {
      l.light.intensity = l.base * (0.95 + 0.04 * noise(t * 1.3 + i * 4));
    });
    bulbMats.forEach((m, i) => {
      let k = 0.95 + 0.05 * noise(t * 1.3 + i * 2.7);
      if (i === 3 && Math.sin(t * 0.7) * Math.sin(t * 1.9) > 0.82) k *= Math.random() > 0.5 ? 0.25 : 1;
      m.emissiveIntensity = k;
    });
    hookFlame.emissiveIntensity = 0.85 + 0.15 * noise(t * 2.1);
    if (handLantern) handLantern.userData.light.intensity = handLantern.userData.baseIntensity * (0.92 + 0.06 * noise(t * 2.3));

    // Лис дышит и поворачивается к игроку, если тот ближе 3 м
    animateCharacter(lis, t);
    if (playerPos && (playerPos.x - lis.position.x) ** 2 + (playerPos.z - lis.position.z) ** 2 < 9) {
      faceTowards(lis, playerPos.x, playerPos.z, dt);
    } else {
      faceTowards(lis, lis.position.x + Math.sin(lisBaseYaw), lis.position.z + Math.cos(lisBaseYaw), dt * 0.5);
    }

    // журнал исчезает с мерцанием (~0.6 с)
    if (st.journalFx > 0) {
      st.journalFx += dt;
      const k = st.journalFx / 0.6;
      if (k >= 1) {
        st.journalFx = 0;
        restoreJournalLook();
        journal.visible = false;
      } else {
        journal.visible = Math.random() > k * 0.7;
        journal.position.set(journalBase.x + (Math.random() - 0.5) * 0.08 * k, journalBase.y, journalBase.z + (Math.random() - 0.5) * 0.04);
        journal.scale.set(1 + (Math.random() - 0.5) * 0.5 * k, 1, 1 - (Math.random() - 0.5) * 0.3 * k);
        const pick = [PAL.book, PAL.glitchPink, PAL.glitchCyan][Math.floor(Math.random() * 3)];
        coverMat.color.setHex(pick);
        coverMat.emissive.setHex(pick === PAL.book ? 0x000000 : pick);
        pagesMat.color.setHex(Math.random() > 0.5 ? 0xf2ead8 : PAL.glitchCyan);
      }
    }

    // дверь архива
    const archTarget = st.archOpen ? ARCH_OPEN : 0;
    st.archAngle += (archTarget - st.archAngle) * (1 - Math.exp(-6 * dt));
    if (Math.abs(archTarget - st.archAngle) < 0.002) st.archAngle = archTarget;
    archiveDoor.rotation.y = st.archAngle;
    if (st.archPendingCollider && !playerOverlaps(archDoorCollider)) {
      archDoorCollider.enabled = true;
      st.archPendingCollider = false;
    }

    // служебный выход и холодный свет из щели
    const sTarget = st.serviceOpen ? SERVICE_OPEN : 0;
    st.serviceAngle += (sTarget - st.serviceAngle) * (1 - Math.exp(-2.5 * dt));
    serviceDoor.rotation.y = st.serviceAngle;
    const open = st.serviceAngle / SERVICE_OPEN;
    doorLight.intensity = open * 5 * (0.94 + 0.06 * noise(t * 0.9));
    floorGlow.visible = beamGlow.visible = open > 0.01;
    floorGlow.material.opacity = open * 0.55;
    beamGlow.material.opacity = open * 0.3;

    // надпись мелом: плавно проступает
    const cm = chalk.material;
    if (cm.opacity !== st.chalkTarget) {
      const step = dt / 1.2;
      cm.opacity = st.chalkTarget > cm.opacity ? Math.min(st.chalkTarget, cm.opacity + step) : Math.max(st.chalkTarget, cm.opacity - step);
    }
    chalk.visible = cm.opacity > 0.001;
  }

  update(0, 0, null);

  return {
    scene,
    colliders,
    slots,
    spawn,
    zones: { archive: AR },
    points,
    cams,
    api,
    objects: { lis, journal, lantern, archiveDoor, serviceDoor, terminal, clock, bench: bugPivot, hook, chalk },
    update,
  };
}
