// Офис студии «Ноль-Один» ночью. Комната 10×8 м: x от -5 до 5, z от -4 (окна) до 4 (вход).
import * as THREE from 'three';
import { mat, uniqueMat, box, collider, textPlane, PAL } from './build.js';
import { createCharacter, animateCharacter, faceTowards, hitbox, ccyl, csphere, ccone } from './characters.js';

const H = 3; // высота потолка

// Псевдослучайные числа с зерном: город всегда одинаковый.
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

// Небо-градиент: плоскость с цветами вершин, без текстуры.
function gradientPlane(w, h, bottom, top) {
  const geo = new THREE.PlaneGeometry(w, h, 1, 4);
  const cb = new THREE.Color(bottom);
  const ct = new THREE.Color(top);
  const pos = geo.attributes.position;
  const cols = [];
  for (let i = 0; i < pos.count; i++) {
    const k = (pos.getY(i) + h / 2) / h;
    const c = cb.clone().lerp(ct, Math.pow(k, 0.7));
    cols.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, depthWrite: false }));
}

function buildCity(scene) {
  const r = rng(42);
  const sky = gradientPlane(320, 90, 0x3a2a4c, 0x0a1224);
  sky.position.set(0, 10, -95);
  scene.add(sky);

  const unit = new THREE.BoxGeometry(1, 1, 1);
  const N = 46;
  const bMat = new THREE.MeshBasicMaterial({ color: 0x121b30, fog: false });
  const bMat2 = new THREE.MeshBasicMaterial({ color: 0x0d1424, fog: false });
  const near = new THREE.InstancedMesh(unit, bMat, N);
  const far = new THREE.InstancedMesh(unit, bMat2, N);
  const winGeo = new THREE.PlaneGeometry(1, 1);
  const MAXW = 900;
  const wins = new THREE.InstancedMesh(winGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false }), MAXW);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();
  const palette = [PAL.cityLight, PAL.cityLight, 0xffe6b0, 0xffb85c, 0x9fd0ff, 0xc98b4a];
  let wi = 0;
  const base = -30;
  const place = (mesh, i, zMin, zMax, scaleMin) => {
    const x = -45 + (90 * (i + r() * 0.6)) / N;
    const z = zMin + r() * (zMax - zMin);
    const w = 3 + r() * 5 * scaleMin;
    const d = 3 + r() * 4;
    const top = -6 + r() * 22;
    const h = top - base;
    m4.compose(new THREE.Vector3(x, base + h / 2, z), q, new THREE.Vector3(w, h, d));
    mesh.setMatrixAt(i, m4);
    // окна на фасаде, обращённом к офису
    const cols = Math.max(1, Math.floor(w / 1.1));
    const rows = Math.floor(h / 1.4);
    for (let ry = 0; ry < rows && wi < MAXW; ry++) {
      const wy = top - 0.9 - ry * 1.4;
      if (wy < -24) break;
      for (let cx = 0; cx < cols && wi < MAXW; cx++) {
        if (r() > 0.32) continue;
        const wx = x - w / 2 + (w / cols) * (cx + 0.5);
        m4.compose(new THREE.Vector3(wx, wy, z + d / 2 + 0.02), q, new THREE.Vector3(0.55, 0.75, 1));
        wins.setMatrixAt(wi, m4);
        col.setHex(palette[Math.floor(r() * palette.length)]);
        wins.setColorAt(wi, col);
        wi++;
      }
    }
  };
  for (let i = 0; i < N; i++) place(near, i, -16, -34, 1);
  for (let i = 0; i < N; i++) place(far, i, -42, -70, 1.6);
  wins.count = wi;
  wins.instanceMatrix.needsUpdate = true;
  if (wins.instanceColor) wins.instanceColor.needsUpdate = true;
  scene.add(near, far, wins);

  // телебашня с мигающим огнём
  const tower = ccyl(0.4, 1.4, 48, 0, 0, 0, 0, 6, new THREE.MeshBasicMaterial({ color: 0x141d33, fog: false }));
  tower.position.set(22, -26 + 24, -60);
  scene.add(tower);
  const beacon = csphere(0.7, 0, 22, 22.3, -60, 6, new THREE.MeshBasicMaterial({ color: 0xff3b3b, fog: false }));
  scene.add(beacon);
  return { beacon };
}

function desk(parent, x, z, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.add(box(1.6, 0.05, 0.8, PAL.deskTop, 0, 0.7, 0));
  g.add(box(0.05, 0.7, 0.74, PAL.desk, -0.75, 0, 0));
  g.add(box(0.05, 0.7, 0.74, PAL.desk, 0.75, 0, 0));
  g.add(box(1.45, 0.42, 0.03, PAL.desk, 0, 0.28, -0.34));
  parent.add(g);
  return g;
}

function chair(parent, x, z, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = rotY;
  g.add(ccyl(0.28, 0.28, 0.04, 0x2a313c, 0, 0.02, 0, 5));
  g.add(ccyl(0.03, 0.03, 0.38, 0x8892a0, 0, 0.05, 0, 6));
  g.add(box(0.48, 0.08, 0.46, PAL.chair, 0, 0.43, 0));
  g.add(box(0.46, 0.55, 0.07, PAL.chair, 0, 0.55, 0.22));
  parent.add(g);
  return g;
}

// Монитор, обращённый к +Z (в локальных координатах группы стола).
function monitor(parent, x, y, z, w, h, screenMaterial, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  g.add(box(0.2, 0.02, 0.15, PAL.monitor, 0, 0, 0));
  g.add(box(0.05, 0.16, 0.03, PAL.monitor, 0, 0.02, -0.03));
  g.add(box(w, h, 0.035, PAL.monitor, 0, 0.12, -0.02));
  const screen = box(w - 0.04, h - 0.04, 0.006, 0, 0, 0.14, 0.0, screenMaterial);
  g.add(screen);
  parent.add(g);
  return { group: g, screen };
}

function codeLines(parent, x, y, z, w, h, rotY, seed) {
  const r = rng(seed);
  const colors = [0x7fd1ff, 0xffcf7a, 0xb894ff, 0x8de39a, 0xe6edf3];
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  const n = 6;
  for (let i = 0; i < n; i++) {
    const lw = (0.15 + r() * 0.6) * w;
    const indent = (r() > 0.5 ? 0.08 : 0) * w;
    const m = box(lw, 0.012, 0.004, 0, -w / 2 + 0.03 + indent + lw / 2, h / 2 - 0.05 - i * (h - 0.06) / n, 0,
      mat(colors[i % colors.length], { emissive: colors[i % colors.length], emissiveIntensity: 0.9 }));
    g.add(m);
  }
  parent.add(g);
}

function plant(parent, x, z, tall = true) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.add(ccyl(0.2, 0.15, 0.4, 0xb8643f, 0, 0, 0, 7));
  g.add(ccyl(0.19, 0.19, 0.02, 0x3a2a1e, 0, 0.38, 0, 7));
  if (tall) {
    g.add(ccyl(0.025, 0.03, 0.7, 0x6b4a2e, 0, 0.4, 0, 5));
    const leaves = [
      [0, 1.25, 0, 0.32],
      [0.14, 1.0, 0.08, 0.26],
      [-0.13, 0.95, -0.06, 0.24],
      [0.02, 1.5, -0.04, 0.22],
    ];
    for (const [lx, ly, lz, rr] of leaves) g.add(csphere(rr, PAL.plant, lx, ly, lz, 5));
  } else {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const leaf = box(0.06, 0.32, 0.02, PAL.plant, Math.cos(a) * 0.06, 0.38, Math.sin(a) * 0.06);
      leaf.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
      g.add(leaf);
    }
  }
  parent.add(g);
  return g;
}

function mug(parent, x, y, z, color) {
  parent.add(ccyl(0.04, 0.035, 0.1, color, x, y, z, 7));
  const h = box(0.015, 0.05, 0.05, color, x + 0.045, y + 0.025, z);
  parent.add(h);
}

function bin(parent, x, z) {
  parent.add(ccyl(0.15, 0.12, 0.34, 0x3a4150, x, 0, z, 7));
  parent.add(box(0.12, 0.04, 0.1, 0xe9ecef, x + 0.02, 0.32, z)); // смятая бумажка
}

export function createOffice() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1224);
  scene.fog = new THREE.Fog(0x0a1224, 10, 34);

  const colliders = [];
  const C = (x, z, w, d) => {
    const c = collider(x, z, w, d);
    colliders.push(c);
    return c;
  };
  const add = (m) => {
    scene.add(m);
    return m;
  };

  // ---------- свет ----------
  scene.add(new THREE.HemisphereLight(0x5d6c96, 0x2e2824, 1.15));
  const moon = new THREE.DirectionalLight(0x8fa6e0, 0.45);
  moon.position.set(-3, 8, -12);
  scene.add(moon);
  const deskLamp = new THREE.PointLight(0xffbf73, 3.2, 6, 2);
  deskLamp.position.set(-3.75, 1.25, -0.75);
  scene.add(deskLamp);
  const pcGlow = new THREE.PointLight(0x6fb3ff, 1.6, 4.5, 2);
  pcGlow.position.set(0, 1.25, -2.6);
  scene.add(pcGlow);
  const ceilLight = new THREE.PointLight(0xffe0b8, 9, 11, 2);
  ceilLight.position.set(0.2, 2.75, 1.9);
  scene.add(ceilLight);

  // торшер у входа: тёплый свет на Ирину и доску (4-й точечный источник, в офисе фонаря нет)
  const floorLamp = new THREE.PointLight(0xffc98a, 4.5, 8, 2);
  floorLamp.position.set(-4.55, 1.75, 3.5);
  scene.add(floorLamp);
  add(ccyl(0.16, 0.18, 0.04, 0x2a2f3a, -4.55, 0, 3.5, 7));
  add(ccyl(0.02, 0.02, 1.55, 0x2a2f3a, -4.55, 0.04, 3.5, 5));
  add(ccyl(0.14, 0.22, 0.3, 0, -4.55, 1.55, 3.5, 8, mat(0xf2e2c4, { emissive: 0xffc98a, emissiveIntensity: 0.8 })));
  C(-4.55, 3.5, 0.4, 0.4);

  // ---------- комната ----------
  add(box(10, 0.1, 8, PAL.officeFloor, 0, -0.1, 0));
  add(box(5.2, 0.012, 3.4, 0x323a4c, 0.2, 0, -0.4)); // ковёр
  add(box(10.4, 0.1, 8.4, 0x2b303b, 0, H, 0)); // потолок
  // стены
  add(box(10.4, H, 0.2, PAL.officeWall, 0, 0, 4.1)); // юг (вход)
  add(box(0.2, H, 8.4, PAL.officeWall, -5.1, 0, 0)); // запад
  add(box(0.2, H, 8.4, PAL.officeWall, 5.1, 0, 0)); // восток
  C(0, 4.1, 10.4, 0.2);
  C(-5.1, 0, 0.2, 8.4);
  C(5.1, 0, 0.2, 8.4);
  C(0, -4.1, 10.4, 0.2);
  // плинтус
  add(box(10, 0.1, 0.03, 0x2a2f3a, 0, 0, 3.985));
  add(box(0.03, 0.1, 8, 0x2a2f3a, -4.985, 0, 0));
  add(box(0.03, 0.1, 8, 0x2a2f3a, 4.985, 0, 0));

  // северная стена с окнами
  add(box(10.4, 0.85, 0.2, PAL.officeWall, 0, 0, -4.1));
  add(box(10.4, H - 2.45, 0.2, PAL.officeWall, 0, 2.45, -4.1));
  for (const px of [-4.9, -1.6, 1.6, 4.9]) add(box(0.3, 1.6, 0.22, PAL.officeWall, px, 0.85, -4.1));
  for (const mx of [-3.25, 0, 3.25]) add(box(0.04, 1.6, 0.04, 0x1d222b, mx, 0.85, -4.05));
  add(box(10, 0.04, 0.04, 0x1d222b, 0, 1.75, -4.05));
  add(box(9.8, 0.04, 0.3, PAL.deskTop, 0, 0.85, -3.86)); // подоконник
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 1.6),
    new THREE.MeshBasicMaterial({ color: 0x9fc4ff, transparent: true, opacity: 0.07, depthWrite: false }),
  );
  glass.position.set(0, 1.65, -4.06);
  scene.add(glass);
  for (const rx of [-3.25, 3.25]) add(box(1.3, 0.5, 0.1, 0xb4bac4, rx, 0.18, -3.93)); // батареи
  const city = buildCity(scene);

  // потолочные панели: две горят, две выключены
  const panelOn = mat(0xf2f4f8, { emissive: 0xfff1dc, emissiveIntensity: 0.9 });
  const panelOff = mat(0x4a5160);
  [[-2.5, -1.5, panelOff], [2.5, -1.5, panelOff], [-2.8, 2.2, panelOff], [0.2, 1.9, panelOn], [2.8, 2.2, panelOff]].forEach(([x, z, m]) => {
    add(box(1.2, 0.03, 0.6, 0, x, H - 0.03, z, m));
  });

  // ---------- входная дверь (юг) ----------
  add(box(1.0, 2.1, 0.06, 0x5b4636, -3.6, 0, 3.98));
  add(box(0.08, 2.18, 0.08, 0x2a2f3a, -4.14, 0, 3.98));
  add(box(0.08, 2.18, 0.08, 0x2a2f3a, -3.06, 0, 3.98));
  add(box(1.16, 0.08, 0.08, 0x2a2f3a, -3.6, 2.12, 3.98));
  add(box(0.14, 0.03, 0.05, 0xc9ccd2, -3.25, 1.0, 3.93));
  const exitSign = textPlane('ВЫХОД', { width: 0.42, height: 0.15, bg: '#1d7f47', fg: '#eafff1', font: 'bold 260px sans-serif' });
  exitSign.position.set(-3.6, 2.4, 3.995);
  exitSign.rotation.y = Math.PI;
  add(exitSign);

  // ---------- доска (запад) ----------
  const board = new THREE.Group();
  board.add(box(0.04, 1.3, 2.1, 0x9aa3ad, -4.98, 0.85, 1.7));
  board.add(box(0.02, 1.2, 2.0, PAL.whiteboard, -4.95, 0.9, 1.7));
  board.add(box(0.08, 0.03, 1.4, 0x9aa3ad, -4.92, 0.86, 1.7)); // лоток для маркеров
  for (const [mz, mc] of [[1.3, 0xd64545], [1.45, 0x2c4a7a], [1.6, 0x2e8b57]]) board.add(box(0.03, 0.03, 0.12, mc, -4.91, 0.89, mz));
  const t1 = textPlane('РЕЛИЗ ЗАВТРА', { width: 1.8, height: 0.36, transparentBg: true, fg: '#d23c3c', font: 'bold 150px sans-serif' });
  t1.position.set(-4.935, 1.78, 1.7);
  t1.rotation.y = Math.PI / 2;
  board.add(t1);
  const t2 = textPlane('Сборка 0.9.7', { width: 1.3, height: 0.26, transparentBg: true, fg: '#2c4a7a', font: 'bold 150px sans-serif' });
  t2.position.set(-4.935, 1.42, 1.85);
  t2.rotation.y = Math.PI / 2;
  board.add(t2);
  const t3 = textPlane('[x] сборка\n[ ] смоук\n[ ] регресс', { width: 0.7, height: 0.4, transparentBg: true, fg: '#3a3f48', font: 'bold 110px sans-serif', align: 'left' });
  t3.position.set(-4.935, 1.12, 1.05);
  t3.rotation.y = Math.PI / 2;
  board.add(t3);
  // стикеры на доске
  [[2.45, 1.55, 0xf4d54a], [2.5, 1.2, 0xff9fb5], [2.3, 1.05, 0x9fe0ff]].forEach(([sz, sy, sc]) => board.add(box(0.01, 0.14, 0.14, sc, -4.935, sy, sz)));
  board.add(hitbox(0.3, 1.3, 2.1, -4.85, 1.5, 1.7));
  scene.add(board);
  C(-4.9, 1.7, 0.2, 2.1);

  // ---------- стол Ирины ----------
  const dI = desk(scene, -3.2, -0.6);
  monitor(dI, 0.1, 0.725, -0.2, 0.6, 0.36, mat(0x0d1a2a, { emissive: 0x3f6f9f, emissiveIntensity: 0.6 }));
  dI.add(box(0.42, 0.02, 0.14, 0x2a2f3a, 0.1, 0.725, 0.12)); // клавиатура
  // настольная лампа
  dI.add(ccyl(0.07, 0.08, 0.03, 0x2a2f3a, -0.55, 0.725, -0.15, 6));
  const arm = box(0.025, 0.4, 0.025, 0x2a2f3a, -0.55, 0.75, -0.15);
  arm.rotation.z = 0.25;
  dI.add(arm);
  const shade = ccone(0.09, 0.12, 0, -0.62, 1.07, -0.15, 6, mat(0x1f6b68));
  shade.rotation.z = Math.PI + 0.4;
  dI.add(shade);
  dI.add(csphere(0.035, 0, -0.63, 1.03, -0.15, 6, mat(PAL.lamp, { emissive: PAL.lamp, emissiveIntensity: 1 })));
  mug(dI, 0.55, 0.725, 0.15, 0x1f6b68);
  dI.add(box(0.22, 0.03, 0.3, 0xf2f2f2, -0.3, 0.725, 0.15)); // бумаги
  const deskPlant = plant(dI, 0.62, -0.2, false);
  deskPlant.scale.setScalar(0.5);
  deskPlant.position.y = 0.725;
  chair(scene, -3.2, 0.3, 0.2);
  bin(scene, -2.2, -1.2);
  C(-3.2, -0.6, 1.6, 0.8);
  C(-3.2, 0.3, 0.55, 0.55);
  C(-2.2, -1.2, 0.32, 0.32);

  // ---------- стол Тимура (два монитора) ----------
  const dT = desk(scene, 3.2, -0.6);
  const sm = mat(0x0b1220, { emissive: 0x1b2a44, emissiveIntensity: 0.8 });
  monitor(dT, -0.32, 0.725, -0.2, 0.56, 0.34, sm, 0.18);
  monitor(dT, 0.32, 0.725, -0.2, 0.56, 0.34, sm, -0.18);
  codeLines(dT, -0.315, 0.725 + 0.14, -0.192, 0.5, 0.3, 0.18, 3);
  codeLines(dT, 0.315, 0.725 + 0.14, -0.192, 0.5, 0.3, -0.18, 9);
  dT.add(box(0.42, 0.02, 0.14, 0x2a2f3a, 0, 0.725, 0.12));
  for (let i = 0; i < 3; i++) dT.add(ccyl(0.032, 0.032, 0.12, [0x37e6ff, 0xff3d8a, 0x37e6ff][i], 0.55 + i * 0.07, 0.725, 0.2 - i * 0.05, 7));
  // резиновая уточка для отладки
  dT.add(csphere(0.06, 0xf7d23a, -0.6, 0.79, 0.1, 6));
  dT.add(csphere(0.04, 0xf7d23a, -0.6, 0.86, 0.14, 6));
  dT.add(box(0.03, 0.015, 0.04, 0xff8a2a, -0.6, 0.85, 0.185));
  mug(dT, -0.4, 0.725, 0.2, 0xe9ecef);
  chair(scene, 3.3, 0.35, -0.5);
  bin(scene, 4.2, 0.4);
  C(3.2, -0.6, 1.6, 0.8);
  C(3.3, 0.35, 0.55, 0.55);
  C(4.2, 0.4, 0.32, 0.32);

  // ---------- стол игрока с ПК ----------
  const dP = desk(scene, 0, -3.0);
  const pcScreenMat = uniqueMat(0x0d1a2a, { emissive: PAL.screenOn, emissiveIntensity: 0.55 });
  const pcMon = monitor(dP, 0, 0.725, -0.15, 0.68, 0.4, pcScreenMat);
  const pcScreen = pcMon.screen;
  const sticker = textPlane('Н.О.\nAT не\nвыключать', { width: 0.14, height: 0.13, bg: '#f4d54a', fg: '#3a2f12', font: 'bold 170px sans-serif' });
  sticker.position.set(0.27, 0.2, 0.012);
  sticker.rotation.z = -0.1;
  pcMon.group.add(sticker);
  dP.add(box(0.44, 0.02, 0.15, 0x2a2f3a, 0, 0.725, 0.15));
  dP.add(box(0.06, 0.02, 0.1, 0x2a2f3a, 0.35, 0.725, 0.17));
  dP.add(box(0.2, 0.44, 0.45, 0x1b1f27, 0.6, 0, -0.05)); // системный блок
  dP.add(box(0.02, 0.02, 0.01, 0, 0.6, 0.38, 0.18, mat(0x5cff9a, { emissive: 0x5cff9a, emissiveIntensity: 1 })));
  mug(dP, -0.5, 0.725, 0.1, 0xd64545);
  dP.add(box(0.16, 0.012, 0.22, 0xf2f2f2, -0.3, 0.725, 0.2)); // пропуск и лист
  const pcSlot = pcMon.group;
  pcSlot.add(hitbox(0.9, 0.62, 0.5, 0, 0.26, 0.05));
  chair(scene, -0.95, -2.05, 0.9);
  bin(scene, 1.15, -3.5);
  C(0, -3.0, 1.6, 0.8);
  C(-0.95, -2.05, 0.55, 0.55);
  C(1.15, -3.5, 0.32, 0.32);

  // ---------- кофейный уголок (юго-восток) ----------
  add(box(2.5, 0.86, 0.6, 0x4a5466, 3.65, 0, 3.65));
  add(box(2.56, 0.04, 0.64, PAL.deskTop, 3.65, 0.86, 3.65));
  add(box(2.5, 0.6, 0.35, 0x4a5466, 3.65, 1.65, 3.82)); // навесной шкаф
  for (const hx of [3.05, 4.25]) add(box(0.02, 0.5, 0.01, 0xc9ccd2, hx, 1.7, 3.64));
  const coffee = new THREE.Group();
  coffee.position.set(3.0, 0.9, 3.7);
  coffee.add(box(0.4, 0.52, 0.36, 0x2a2d33, 0, 0, 0));
  coffee.add(box(0.42, 0.06, 0.38, 0x8a929c, 0, 0.52, 0));
  coffee.add(box(0.3, 0.04, 0.16, 0x8a929c, 0, 0.0, -0.2)); // поддон
  coffee.add(box(0.06, 0.05, 0.06, 0x8a929c, 0, 0.27, -0.2)); // носик
  coffee.add(ccyl(0.05, 0.04, 0.09, 0xf2f2f2, 0, 0.04, -0.2, 7)); // чашка
  coffee.add(ccyl(0.09, 0.07, 0.16, 0x3b2a1e, 0.08, 0.58, 0.05, 7)); // бункер с зёрнами
  const ledMat = uniqueMat(0x2a2d33, { emissive: 0x5cff9a, emissiveIntensity: 1 });
  coffee.add(box(0.03, 0.03, 0.01, 0, -0.12, 0.42, -0.185, ledMat));
  coffee.add(box(0.03, 0.03, 0.01, 0, -0.06, 0.42, -0.185, mat(0x2a2d33, { emissive: 0xffb04a, emissiveIntensity: 1 })));
  coffee.add(hitbox(0.6, 0.8, 0.6, 0, 0.4, -0.05));
  scene.add(coffee);
  add(box(0.48, 0.28, 0.34, 0xd9dde2, 4.25, 0.9, 3.72)); // микроволновка
  add(box(0.3, 0.2, 0.01, 0x1d222b, 4.2, 0.94, 3.545));
  mug(scene, 3.45, 0.9, 3.55, 0xff8a2a);
  mug(scene, 3.6, 0.9, 3.62, 0x37e6ff);
  mug(scene, 4.75, 0.9, 3.55, 0xe9ecef);
  C(3.65, 3.65, 2.56, 0.66);

  // ---------- восточная стена: шкаф, папки, плакат ----------
  add(box(0.45, 0.85, 3.2, 0x4a5466, 4.75, 0, -1.6 + 1.0));
  add(box(0.47, 0.03, 3.22, PAL.deskTop, 4.75, 0.85, -0.6));
  const binders = [0xd64545, 0x2c4a7a, 0xf4d54a, 0x2e8b57, 0x8a6a4f, 0x2c4a7a];
  binders.forEach((c, i) => add(box(0.28, 0.3, 0.07, c, 4.75, 0.88, -1.7 + i * 0.09)));
  plant(scene, 4.75, 0.6, false).position.y = 0.88;
  C(4.75, -0.6, 0.5, 3.2);
  const poster = textPlane('СТАНЦИЯ\nРАССВЕТ\n\nрелиз скоро', { width: 0.8, height: 1.1, bg: '#2a1f2e', fg: '#ffcf7a', font: 'bold 120px sans-serif' });
  poster.position.set(4.975, 1.85, -1.4);
  poster.rotation.y = -Math.PI / 2;
  add(poster);
  add(box(0.02, 1.16, 0.86, 0x1d222b, 4.99, 1.27, -1.4));
  const logo = textPlane('НОЛЬ-ОДИН', { width: 1.4, height: 0.3, transparentBg: true, fg: '#e8edf2', font: 'bold 150px sans-serif' });
  logo.position.set(4.985, 2.0, 0.6);
  logo.rotation.y = -Math.PI / 2;
  add(logo);

  // растения по углам
  plant(scene, -4.5, -3.5, true);
  plant(scene, 4.5, -3.45, true);
  C(-4.5, -3.5, 0.45, 0.45);
  C(4.5, -3.45, 0.45, 0.45);
  plant(scene, -1.2, -3.86, false).position.y = 0.87; // кактус на подоконнике

  // ---------- персонажи ----------
  const irina = createCharacter({ name: 'Ирина', extra: 'irina' });
  irina.position.set(-1.9, 0, 0.6);
  scene.add(irina);
  const timur = createCharacter({ name: 'Тимур', extra: 'timur' });
  timur.position.set(2.05, 0, -0.35);
  scene.add(timur);
  C(-1.9, 0.6, 0.5, 0.5);
  C(2.05, -0.35, 0.5, 0.5);

  const spawn = { x: -3.6, z: 3.2, yaw: Math.atan2(-(irina.position.x + 3.6), -(irina.position.z - 3.2)) };
  // по умолчанию персонажи смотрят на вход
  irina.rotation.y = Math.atan2(spawn.x - irina.position.x, spawn.z - irina.position.z);
  timur.rotation.y = Math.atan2(-1 - timur.position.x, 2.5 - timur.position.z);
  const base = [
    { ch: irina, yaw: irina.rotation.y },
    { ch: timur, yaw: timur.rotation.y },
  ];

  const pcView = { x: 0, z: -1.85, yaw: 0 };

  const slots = [
    { id: 'irina', object: irina },
    { id: 'timur', object: timur },
    { id: 'pc', object: pcSlot },
    { id: 'whiteboard', object: board },
    { id: 'coffee', object: coffee },
  ];

  function update(dt, t, playerPos) {
    for (const { ch, yaw } of base) {
      animateCharacter(ch, t);
      if (playerPos) {
        const dx = playerPos.x - ch.position.x;
        const dz = playerPos.z - ch.position.z;
        if (dx * dx + dz * dz < 9) {
          faceTowards(ch, playerPos.x, playerPos.z, dt);
          continue;
        }
      }
      faceTowards(ch, ch.position.x + Math.sin(yaw), ch.position.z + Math.cos(yaw), dt * 0.5);
    }
    city.beacon.visible = Math.sin(t * 2.2) > 0.2;
    ledMat.emissiveIntensity = 0.6 + 0.4 * Math.sin(t * 3);
  }

  return {
    scene,
    colliders,
    slots,
    spawn,
    points: { pcView },
    objects: { irina, timur, pcScreen },
    update,
  };
}
