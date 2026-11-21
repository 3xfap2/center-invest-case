// Персонажи из примитивов: Ирина, Тимур, Лис. Стоят на y = 0, смотрят в +Z, рост около 1.7 м.
import * as THREE from 'three';
import { mat, box, PAL } from './build.js';

const PRESETS = {
  irina: { shirt: 0x1f6b68, pants: 0x2a2e38, hair: 0x3b2419, skin: PAL.skin, shoes: 0x2a2024 },
  timur: { shirt: 0x46505e, pants: 0x34495e, hair: 0x17171c, skin: PAL.skinDark, shoes: 0xe6e6e6 },
  lis: { shirt: 0x6b5a3a, pants: 0x3c3e2b, hair: 0x9a4f28, skin: PAL.skin, shoes: 0x3a281c },
};

// Невидимый хитбокс для луча взаимодействия (прозрачный, но не visible=false).
const hitGeo = new THREE.BoxGeometry(1, 1, 1);
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
export function hitbox(w, h, d, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(hitGeo, hitMat);
  m.scale.set(w, h, d);
  m.position.set(x, y, z); // y: центр
  m.userData.hitbox = true;
  return m;
}

// Цилиндр и сфера с кэшем геометрии (build.js создаёт новую геометрию на каждый вызов).
const geoCache = new Map();
function cachedGeo(key, make) {
  if (!geoCache.has(key)) geoCache.set(key, make());
  return geoCache.get(key);
}
export function ccyl(rTop, rBot, h, color, x = 0, y = 0, z = 0, seg = 8, material = null) {
  const geo = cachedGeo(`c${rTop}|${rBot}|${h}|${seg}`, () => new THREE.CylinderGeometry(rTop, rBot, h, seg));
  const m = new THREE.Mesh(geo, material || mat(color));
  m.position.set(x, y + h / 2, z);
  return m;
}
export function csphere(r, color, x = 0, y = 0, z = 0, seg = 8, material = null) {
  const geo = cachedGeo(`s${r}|${seg}`, () => new THREE.SphereGeometry(r, seg, Math.max(4, seg - 2)));
  const m = new THREE.Mesh(geo, material || mat(color));
  m.position.set(x, y, z);
  return m;
}
export function ccone(r, h, color, x = 0, y = 0, z = 0, seg = 6, material = null) {
  const geo = cachedGeo(`k${r}|${h}|${seg}`, () => new THREE.ConeGeometry(r, h, seg));
  const m = new THREE.Mesh(geo, material || mat(color));
  m.position.set(x, y + h / 2, z);
  return m;
}

export function shade(color, k) {
  const c = new THREE.Color(color);
  c.multiplyScalar(k);
  return c.getHex();
}

export function createCharacter({ name = 'npc', shirt, pants, hair, skin, extra } = {}) {
  const p = PRESETS[extra] || {};
  shirt = shirt ?? p.shirt ?? 0x6a7380;
  pants = pants ?? p.pants ?? 0x2e3440;
  hair = hair ?? p.hair ?? 0x2a1d16;
  skin = skin ?? p.skin ?? PAL.skin;
  const shoes = p.shoes ?? 0x1e1e24;

  const g = new THREE.Group();
  g.name = name;

  // ноги и обувь
  const bootH = extra === 'lis' ? 0.16 : 0.08;
  for (const s of [-1, 1]) {
    g.add(box(0.17, 0.76, 0.19, pants, s * 0.105, 0.06, 0));
    g.add(box(0.19, bootH, 0.27, shoes, s * 0.105, 0, 0.035));
    if (extra === 'timur') g.add(box(0.195, 0.025, 0.275, 0x3a3f48, s * 0.105, 0, 0.035)); // подошва кед
  }
  if (extra === 'lis') g.add(box(0.12, 0.12, 0.02, shade(pants, 0.78), -0.105, 0.36, 0.1)); // заплатка на колене

  // корпус (для дыхания)
  const body = new THREE.Group();
  body.position.y = 0.8;
  g.add(body);
  body.add(box(0.42, 0.14, 0.24, pants, 0, -0.12, 0)); // таз

  const torsoW = extra === 'irina' ? 0.42 : 0.47;
  body.add(box(torsoW, 0.58, 0.26, shirt, 0, 0, 0));
  body.add(ccyl(0.06, 0.065, 0.1, skin, 0, 0.56, 0, 6)); // шея

  // руки на шарнирах в плечах
  const arms = [];
  for (const s of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(s * (torsoW / 2 + 0.07), 0.55, 0);
    arm.rotation.z = s * 0.06;
    arm.add(box(0.13, 0.56, 0.15, shirt, 0, -0.56, 0));
    arm.add(box(0.1, 0.12, 0.11, skin, 0, -0.68, 0));
    body.add(arm);
    arms.push(arm);
  }

  // голова на шарнире у шеи
  const head = new THREE.Group();
  head.position.y = 0.65;
  body.add(head);
  head.add(box(0.23, 0.26, 0.24, skin, 0, 0, 0));
  // глаза чуть впереди лица (лицо на z = 0.12), без общих плоскостей с очками: иначе мерцают
  for (const s of [-1, 1]) head.add(box(0.035, 0.035, 0.01, 0x1a1a1f, s * 0.055, 0.13, 0.124));
  head.add(box(0.04, 0.06, 0.03, shade(skin, 0.92), 0, 0.07, 0.13)); // нос
  head.add(box(0.07, 0.012, 0.01, shade(skin, 0.7), 0, 0.035, 0.121)); // рот
  for (const s of [-1, 1]) head.add(box(0.03, 0.06, 0.05, shade(skin, 0.9), s * 0.125, 0.1, 0)); // уши
  head.add(box(0.25, 0.07, 0.26, hair, 0, 0.235, -0.005)); // макушка
  head.add(box(0.25, 0.2, 0.06, hair, 0, 0.07, -0.11)); // затылок

  if (extra === 'irina') {
    for (const s of [-1, 1]) head.add(box(0.03, 0.15, 0.2, hair, s * 0.125, 0.12, -0.02)); // волосы по бокам
    head.add(csphere(0.085, hair, 0, 0.29, -0.1, 7)); // пучок
    head.add(box(0.2, 0.03, 0.03, hair, 0, 0.27, 0.115)); // линия чёлки
    // очки
    const frame = 0x22252b;
    for (const s of [-1, 1]) {
      // стекло в 4 мм перед глазами и полупрозрачное, чтобы глаза было видно
      head.add(box(0.075, 0.052, 0.004, 0xbfe0ea, s * 0.055, 0.13, 0.137, mat(0xbfe0ea, { opacity: 0.35 })));
      head.add(box(0.085, 0.012, 0.012, frame, s * 0.055, 0.162, 0.138)); // верх оправы перед стеклом
      head.add(box(0.01, 0.012, 0.21, frame, s * 0.118, 0.155, 0.02));
    }
    head.add(box(0.03, 0.01, 0.01, frame, 0, 0.14, 0.137)); // перемычка
    body.add(ccyl(0.1, 0.11, 0.07, shirt, 0, 0.54, 0, 8)); // ворот свитера
    body.add(box(0.07, 0.09, 0.01, 0xf2f2f2, 0.11, 0.33, 0.135)); // бейдж
    body.add(box(0.012, 0.16, 0.008, 0x37e6ff, 0.08, 0.38, 0.132)); // ремешок бейджа
    body.add(box(0.42, 0.04, 0.27, shade(shirt, 0.8), 0, 0.0, 0)); // резинка свитера
  }

  if (extra === 'timur') {
    const dark = shade(shirt, 0.75);
    body.add(box(0.34, 0.16, 0.12, shirt, 0, 0.46, -0.15)); // капюшон
    body.add(box(0.3, 0.15, 0.02, dark, 0, 0.08, 0.135)); // карман
    for (const s of [-1, 1]) body.add(box(0.015, 0.15, 0.01, 0xf0f0f0, s * 0.05, 0.36, 0.134)); // шнурки
    // наушники на шее
    const hp = 0xe4e6ea; // светлые наушники заметны на тёмном худи
    body.add(box(0.28, 0.035, 0.05, hp, 0, 0.62, -0.08));
    for (const s of [-1, 1]) {
      const cup = ccyl(0.055, 0.055, 0.045, hp, 0, 0, 0, 8);
      cup.rotation.z = Math.PI / 2;
      cup.position.set(s * 0.115, 0.6, 0.04);
      body.add(cup);
      const ring = ccyl(0.04, 0.04, 0.01, 0xff7a3d, 0, 0, 0, 8);
      ring.rotation.z = Math.PI / 2;
      ring.position.set(s * 0.14, 0.6, 0.04);
      body.add(ring);
      body.add(box(0.025, 0.03, 0.12, hp, s * 0.12, 0.6, -0.03));
    }
    head.add(box(0.12, 0.06, 0.12, hair, 0.03, 0.27, 0.03)); // вихор
  }

  if (extra === 'lis') {
    const dark = shade(shirt, 0.72);
    body.add(box(0.48, 0.12, 0.28, shirt, 0, -0.1, 0)); // подол куртки
    body.add(box(0.36, 0.08, 0.3, dark, 0, 0.52, -0.005)); // воротник
    body.add(box(0.02, 0.5, 0.01, 0x2a241a, 0, 0.02, 0.132)); // молния
    for (const s of [-1, 1]) body.add(box(0.12, 0.1, 0.015, dark, s * 0.12, 0.33, 0.135)); // нагрудные карманы
    body.add(box(0.1, 0.09, 0.012, 0x7e6b48, -0.13, 0.1, 0.134)); // потёртость
    for (const arm of arms) arm.add(box(0.135, 0.1, 0.12, 0x5a4c31, 0, -0.38, -0.02)); // заплатки на локтях
    // оранжевая эмблема лиса на левом рукаве (+X)
    const left = arms[1];
    const em = box(0.012, 0.08, 0.08, 0xff7a1a, 0.068, -0.2, 0);
    em.rotation.x = Math.PI / 4;
    left.add(em);
    for (const s of [-1, 1]) {
      const ear = ccone(0.02, 0.04, 0xff7a1a, 0, 0, 0, 3);
      ear.position.set(0.068, -0.12, s * 0.025);
      left.add(ear);
    }
    left.add(box(0.013, 0.02, 0.02, 0xfff3e0, 0.069, -0.235, 0)); // светлый кончик морды
    // взлохмаченные волосы
    const tufts = [
      [0.06, 0.28, 0.04, 0.3],
      [-0.07, 0.28, 0.0, -0.35],
      [0.0, 0.29, -0.07, 0.15],
      [-0.03, 0.27, 0.09, -0.2],
    ];
    for (const [x, y, z, r] of tufts) {
      const t = box(0.1, 0.06, 0.1, hair, x, y - 0.03, z);
      t.rotation.set(r * 0.6, r, r * 0.5);
      head.add(t);
    }
    for (const s of [-1, 1]) head.add(box(0.03, 0.1, 0.16, hair, s * 0.125, 0.15, -0.03));
  }

  // хитбокс для луча взаимодействия
  g.add(hitbox(0.62, 1.75, 0.5, 0, 0.88, 0));

  g.userData.head = head;
  g.userData.body = body;
  g.userData.bodyY = body.position.y;
  g.userData.arms = arms;
  g.userData.phase = (name.length * 1.37 + (extra ? extra.length : 0) * 0.91) % (Math.PI * 2);
  return g;
}

// Дыхание, лёгкое покачивание головы и рук.
export function animateCharacter(group, t) {
  const u = group.userData;
  if (!u.body) return;
  const ph = u.phase;
  const s = Math.sin(t * 2.0 + ph);
  u.body.position.y = u.bodyY + s * 0.004;
  u.body.scale.set(1 + s * 0.008, 1 + s * 0.005, 1 + s * 0.014);
  u.head.rotation.x = Math.sin(t * 0.6 + ph) * 0.045;
  u.head.rotation.z = Math.sin(t * 0.43 + ph * 1.3) * 0.035;
  u.arms.forEach((a, i) => {
    a.rotation.x = Math.sin(t * 1.05 + ph + i * 1.7) * 0.035;
  });
}

// Плавно повернуть персонажа (его +Z) к точке (x, z).
export function faceTowards(group, x, z, dt = 1 / 60) {
  const dx = x - group.position.x;
  const dz = z - group.position.z;
  if (dx * dx + dz * dz < 1e-6) return;
  const target = Math.atan2(dx, dz);
  let d = target - group.rotation.y;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  group.rotation.y += d * (1 - Math.exp(-5 * dt));
  group.rotation.y = Math.atan2(Math.sin(group.rotation.y), Math.cos(group.rotation.y));
}
