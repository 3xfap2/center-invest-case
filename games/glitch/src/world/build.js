// Помощники для построения low-poly мира из примитивов.
// Плоские цвета, flatShading, без текстур (кроме табличек с текстом на canvas).
import * as THREE from 'three';

const matCache = new Map();

export function mat(color, { emissive = 0x000000, emissiveIntensity = 1, transparent = false, opacity = 1 } = {}) {
  const key = `${color}|${emissive}|${emissiveIntensity}|${opacity}`;
  if (!matCache.has(key)) {
    matCache.set(
      key,
      new THREE.MeshLambertMaterial({
        color,
        emissive,
        emissiveIntensity,
        flatShading: true,
        transparent: transparent || opacity < 1,
        opacity,
      }),
    );
  }
  return matCache.get(key);
}

// Уникальный материал, если его будут менять во время игры (мигание, подсветка).
export function uniqueMat(color, opts = {}) {
  return new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts });
}

const boxGeo = new THREE.BoxGeometry(1, 1, 1);

// Коробка с центром основания в (x, y, z): y — высота низа коробки.
export function box(w, h, d, color, x = 0, y = 0, z = 0, material = null) {
  const m = new THREE.Mesh(boxGeo, material || mat(color));
  m.scale.set(w, h, d);
  m.position.set(x, y + h / 2, z);
  return m;
}

export function cyl(rTop, rBot, h, color, x = 0, y = 0, z = 0, seg = 8, material = null) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material || mat(color));
  m.position.set(x, y + h / 2, z);
  return m;
}

export function sphere(r, color, x = 0, y = 0, z = 0, seg = 8, material = null) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(4, seg - 2)), material || mat(color));
  m.position.set(x, y, z);
  return m;
}

// Прямоугольник столкновений в плоскости XZ по центру и размеру.
export function collider(x, z, w, d) {
  return { minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 };
}

// Коллайдер по мешу-коробке (учитывает scale и position, без поворота или с поворотом на 90°).
export function colliderOf(mesh, pad = 0) {
  const b = new THREE.Box3().setFromObject(mesh);
  return { minX: b.min.x - pad, maxX: b.max.x + pad, minZ: b.min.z - pad, maxZ: b.max.z + pad };
}

// Табличка с текстом (canvas-текстура на плоскости).
export function textPlane(text, { width = 1, height = 0.3, bg = '#1b2430', fg = '#e8edf2', font = 'bold 64px sans-serif', align = 'center', pad = 24, lineHeight = 1.2, transparentBg = false } = {}) {
  const pxW = 1024;
  const pxH = Math.round((pxW * height) / width);
  const c = document.createElement('canvas');
  c.width = pxW;
  c.height = pxH;
  const g = c.getContext('2d');
  if (!transparentBg) {
    g.fillStyle = bg;
    g.fillRect(0, 0, pxW, pxH);
  }
  g.fillStyle = fg;
  g.font = font;
  g.textAlign = align;
  g.textBaseline = 'middle';
  const lines = String(text).split('\n');
  const size = parseInt(font.match(/(\d+)px/)?.[1] || 64, 10);
  const total = lines.length * size * lineHeight;
  const x = align === 'center' ? pxW / 2 : align === 'right' ? pxW - pad : pad;
  lines.forEach((ln, i) => g.fillText(ln, x, pxH / 2 - total / 2 + size * lineHeight * (i + 0.5)));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: tex, transparent: transparentBg, toneMapped: false }),
  );
  return m;
}

// Палитра: тёплая ночная станция и холодный офис. Использовать её, а не случайные цвета.
export const PAL = {
  // офис
  officeFloor: 0x2a2f3a,
  officeWall: 0x3b4252,
  desk: 0x8a6a4f,
  deskTop: 0xc9a27e,
  monitor: 0x15181e,
  screenOn: 0x6fb3ff,
  chair: 0x1f2630,
  plant: 0x4f8a5b,
  whiteboard: 0xe9ecef,
  windowNight: 0x0b1a33,
  cityLight: 0xffd27a,
  // станция
  platform: 0x6b6b70,
  platformEdge: 0xd9b23c,
  rail: 0x4a4038,
  sleeper: 0x5b4636,
  stationWall: 0x7a5c48,
  stationTrim: 0x3f2e25,
  stationFloor: 0x5a4a3e,
  wood: 0x8b5e3c,
  bench: 0x9c6b42,
  lamp: 0xffcf7a,
  clockFace: 0xf2ead8,
  book: 0x7a2f2f,
  lantern: 0xe0a040,
  archive: 0x3a3330,
  shelf: 0x5e4631,
  serviceDoor: 0x55606b,
  terminal: 0x2b3138,
  terminalScreen: 0x63e6a8,
  sky: 0x0a0f1f,
  // персонажи
  skin: 0xe0b394,
  skinDark: 0xb98563,
  // акценты интерфейса и глитча
  glitchCyan: 0x37e6ff,
  glitchPink: 0xff3d8a,
};
