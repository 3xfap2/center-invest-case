// Диагностическая комната за служебным выходом станции. Глава 2.
// План: внутри x от −3 до 3, z от −2.5 (север) до 2.5 (юг), потолок 3 м.
//   Юг: дверь обратно на станцию (x = 0), у неё точка появления, лицом на север.
//   Центр: подставка с переключателем Никиты. Запад: пробковая доска с записками.
//   Север: скрытая записка (слева), табличка «ДИАГНОСТИКА» (0.9.3), терминал автотестов (справа).
//   Восток: стол со стендом, стойка с платами. Юго-запад: шкаф.
// Сборки: 0.9.3 «официальная» комната; 0.9.5 и 0.9.7 «вырезанная»: серые блоки, дыры в стенах, розовые кубы.
// Коллайдеры одинаковые во всех сборках.
import * as THREE from 'three';
import { mat, uniqueMat, box, textPlane, PAL } from './build.js';
import { hitbox, ccyl, csphere, shade } from './characters.js';

const H = 3.0; // высота потолка
const BUILDS = ['0.9.3', '0.9.5', '0.9.7'];

function noise(t) {
  return Math.sin(t * 7.3) * 0.5 + Math.sin(t * 13.1 + 1.3) * 0.3 + Math.sin(t * 23.7 + 2.1) * 0.2;
}

const HAND = '"Segoe Print", "Comic Sans MS", "Marker Felt", cursive';

export function createDiagnostic() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1612);
  scene.fog = new THREE.Fog(0x1a1612, 8, 24);

  const colliders = [];
  const R = (minX, maxX, minZ, maxZ) => {
    const c = { minX, maxX, minZ, maxZ };
    colliders.push(c);
    return c;
  };
  const add = (m, parent = scene) => {
    parent.add(m);
    return m;
  };

  // Материалы отделки меняют цвет по сборке: [материал, цвет 0.9.3, цвет вырезанной комнаты].
  const finish = [];
  const fmat = (c93, cCut) => {
    const m = uniqueMat(c93);
    finish.push([m, c93, cCut]);
    return m;
  };
  const wallMat = fmat(0x7f8b82, 0x777b82);
  const floorMat = fmat(0x4b4f4c, 0x55585e);
  const ceilMat = fmat(0x9c9a92, 0x5a5d62);
  const standMat = fmat(0x39414a, 0x7a7e84);

  // группы, которые видны только в одной из версий комнаты
  const official = add(new THREE.Group()); // 0.9.3
  const cut = add(new THREE.Group()); // 0.9.5 и 0.9.7
  const cut97 = add(new THREE.Group(), cut); // только 0.9.7

  // ---------- свет: Hemisphere + Directional + 3 PointLight ----------
  const hemi = new THREE.HemisphereLight(0xffe2c0, 0x3a3028, 0.7);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffd9a8, 0.35);
  sun.position.set(2, 6, 3);
  scene.add(sun);
  const lampW = new THREE.PointLight(0xffcf8a, 7, 8, 2);
  lampW.position.set(-1.3, 2.7, 0.2);
  const lampE = new THREE.PointLight(0xffcf8a, 6, 8, 2);
  lampE.position.set(1.6, 2.7, -0.6);
  const accent = new THREE.PointLight(0xffc070, 1.6, 4, 2); // 0.9.3: настольная лампа; вырезанная: розовый отсвет кубов
  accent.position.set(2.55, 1.3, 1.05);
  scene.add(lampW, lampE, accent);

  // ---------- пол, потолок, стены ----------
  add(box(6.4, 0.02, 5.4, 0, 0, -0.02, 0, floorMat));
  // светильники-панели
  const panelMatW = uniqueMat(0xfff2d6, { emissive: 0xffe0a8, emissiveIntensity: 1 });
  const panelMatE = uniqueMat(0xfff2d6, { emissive: 0xffe0a8, emissiveIntensity: 1 });
  const panelW = add(box(1.1, 0.05, 0.32, 0, -1.3, H - 0.06, 0.2, panelMatW));
  const panelE = add(box(1.1, 0.05, 0.32, 0, 1.6, H - 0.06, -0.6, panelMatE));

  // куски стен и потолка: запоминаем исходное положение, вырезанные сборки сдвигают или прячут их
  const pieces = {};
  const piece = (key, w, h, d, x, y, z, material = wallMat) => {
    const m = add(box(w, h, d, 0, x, y, z, material));
    m.userData.base = { pos: m.position.clone(), rot: m.rotation.clone() };
    pieces[key] = m;
    return m;
  };
  piece('ceilW', 2.4, 0.15, 5.4, -2.0, H, 0, ceilMat);
  piece('ceilM', 2.2, 0.15, 5.4, 0.3, H, 0, ceilMat);
  piece('ceilE', 2.0, 0.15, 5.4, 2.2, H, 0, ceilMat);
  // север (внутренняя грань z = −2.5)
  piece('nW', 2.8, H, 0.2, -1.8, 0, -2.6);
  piece('nM', 1.4, H, 0.2, 0.3, 0, -2.6);
  piece('nE', 2.2, H, 0.2, 2.1, 0, -2.6);
  // юг (внутренняя грань z = 2.5), проём двери x от −0.6 до 0.6
  piece('sW', 2.6, H, 0.2, -1.9, 0, 2.6);
  piece('sE', 2.6, H, 0.2, 1.9, 0, 2.6);
  piece('sTop', 1.2, H - 2.2, 0.2, 0, 2.2, 2.6);
  // запад (x = −3) целиком: на ней доска Никиты
  piece('w', 0.2, H, 5.4, -3.1, 0, 0);
  // восток (x = 3)
  piece('eN', 0.2, H, 2.1, 3.1, 0, -1.55);
  piece('eM', 0.2, H, 1.7, 3.1, 0, 0.35);
  piece('eS', 0.2, H, 1.5, 3.1, 0, 1.95);
  // стены: коллайдеры всегда, даже там, где стены в вырезанной сборке нет
  R(-3.4, 3.4, -2.9, -2.5);
  R(-3.4, 3.4, 2.5, 2.9); // вместе с закрытой дверью
  R(-3.4, -3.0, -2.9, 2.9);
  R(3.0, 3.4, -2.9, 2.9);

  // Как куски «разъезжаются» в вырезанных сборках. hide: куска нет.
  const DISPLACE = {
    '0.9.5': {
      eM: { hide: true },
      ceilE: { hide: true },
      nE: { dz: -0.55, dy: 0.35, rz: 0.035, ry: 0.07 },
    },
    '0.9.7': {
      eM: { hide: true },
      ceilE: { hide: true },
      nE: { dz: -0.7, dy: 0.5, rz: 0.05, ry: 0.1 },
      nW: { dz: -0.35, dy: 0.28, rx: -0.07, rz: -0.02 },
      ceilM: { dy: 0.45, rz: 0.06 },
      eS: { dx: 0.4, dy: -0.15, ry: -0.12 },
    },
  };
  // контуры там, где стены нет: «тут должна быть стена»
  const ghostLineMat = new THREE.LineBasicMaterial({ color: PAL.glitchCyan, transparent: true, opacity: 0.35, fog: false });
  for (const key of ['eM', 'ceilE']) {
    const p = pieces[key];
    const lines = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), ghostLineMat);
    lines.scale.copy(p.scale);
    lines.position.copy(p.position);
    cut.add(lines);
  }

  // ---------- отделка 0.9.3: панели, плинтус, таблички ----------
  {
    const panel = 0x5a4a3e;
    const strip = (w, d, x, z) => {
      official.add(box(w, 0.9, d, panel, x, 0, z));
      official.add(box(w + 0.01, 0.05, d + 0.01, PAL.stationTrim, x, 0.9, z));
    };
    strip(6.0, 0.03, 0, -2.485); // север
    strip(2.4, 0.03, -1.8, 2.485); // юг, запад от двери
    strip(2.4, 0.03, 1.8, 2.485); // юг, восток от двери
    strip(0.03, 5.0, -2.985, 0); // запад
    strip(0.03, 5.0, 2.985, 0); // восток
    // табличка над проходом на север
    const sign = textPlane('ДИАГНОСТИКА', { width: 1.9, height: 0.34, bg: '#2b3138', fg: '#f2e6c8', font: 'bold 150px sans-serif' });
    sign.position.set(0.3, 2.5, -2.485);
    official.add(sign);
    official.add(box(2.0, 0.42, 0.02, PAL.stationTrim, 0.3, 2.29, -2.497));
    // плакат на южной стене
    const poster = textPlane('ПРОВЕРКА СБОРКИ\n\n1. Снять снимок состояния\n2. Сравнить с прошлой сборкой\n3. Записать каждое различие\n4. Отличить баг от изменения', {
      width: 1.0,
      height: 1.2,
      bg: '#e8dcc0',
      fg: '#3a2a22',
      font: 'bold 56px sans-serif',
      align: 'left',
      pad: 50,
      lineHeight: 1.35,
    });
    poster.position.set(-1.75, 1.65, 2.485);
    poster.rotation.y = Math.PI;
    official.add(poster);
    // табличка над дверью
    const exitSign = textPlane('Зал ожидания', { width: 0.9, height: 0.2, bg: '#2b3138', fg: '#e8edf2', font: 'bold 120px sans-serif' });
    exitSign.position.set(0, 2.5, 2.485);
    exitSign.rotation.y = Math.PI;
    official.add(exitSign);
    // часы-коробочка с датой сборки
    const stamp = textPlane('сборка 0.9.3', { width: 0.6, height: 0.14, bg: '#14201a', fg: '#7de0a0', font: 'bold 90px monospace' });
    stamp.position.set(2.985, 2.2, 0.6);
    stamp.rotation.y = -Math.PI / 2;
    official.add(stamp);
  }

  // ---------- дверь обратно на станцию (юг) ----------
  const exitDoor = new THREE.Group();
  exitDoor.position.set(0, 0, 2.5);
  {
    const trim = 0x2b3138;
    exitDoor.add(box(1.1, 2.15, 0.06, PAL.serviceDoor, 0, 0, -0.01));
    exitDoor.add(box(0.9, 0.04, 0.01, shade(PAL.serviceDoor, 0.75), 0, 1.9, -0.045));
    exitDoor.add(box(0.9, 0.04, 0.01, shade(PAL.serviceDoor, 0.75), 0, 0.15, -0.045));
    exitDoor.add(box(0.36, 0.5, 0.01, 0x8fa4b8, 0, 1.35, -0.045)); // окошко
    exitDoor.add(box(0.06, 0.04, 0.16, 0xb8bcc2, 0.4, 1.0, -0.1)); // ручка
    exitDoor.add(box(0.06, 0.04, 0.06, 0xb8bcc2, 0.4, 1.0, -0.06));
    exitDoor.add(box(0.1, 2.3, 0.1, trim, -0.6, 0, -0.04)); // наличник
    exitDoor.add(box(0.1, 2.3, 0.1, trim, 0.6, 0, -0.04));
    exitDoor.add(box(1.3, 0.1, 0.1, trim, 0, 2.2, -0.04));
    exitDoor.add(hitbox(1.2, 2.2, 0.3, 0, 1.1, -0.1));
  }
  add(exitDoor);

  // ---------- подставка и переключатель (центр) ----------
  const STAND = { x: 0, z: -0.4 };
  add(box(0.5, 0.06, 0.5, 0, STAND.x, 0, STAND.z, standMat));
  add(box(0.3, 1.0, 0.3, 0, STAND.x, 0.06, STAND.z, standMat));
  add(box(0.46, 0.05, 0.42, 0, STAND.x, 1.06, STAND.z, standMat));
  R(STAND.x - 0.3, STAND.x + 0.3, STAND.z - 0.3, STAND.z + 0.3);
  {
    // аккуратная бирка на подставке в 0.9.3
    const tag = textPlane('ОБРАЗЕЦ Н.О.\nне выносить', { width: 0.26, height: 0.12, bg: '#e8dcc0', fg: '#3a2a22', font: 'bold 80px sans-serif' });
    tag.position.set(STAND.x, 0.8, STAND.z + 0.152);
    official.add(tag);
  }

  const switcher = new THREE.Group();
  switcher.position.set(STAND.x, 1.11, STAND.z);
  const screens = {};
  const ledMat = uniqueMat(0xff4040, { emissive: 0xff3030, emissiveIntensity: 1 });
  {
    const body = 0x4a5e50; // крашеная самодельная коробка
    switcher.add(box(0.3, 0.14, 0.2, body, 0, 0, 0));
    switcher.add(box(0.31, 0.012, 0.21, shade(body, 0.75), 0, 0.14, 0)); // крышка
    switcher.add(box(0.05, 0.145, 0.205, 0xd9c34a, -0.09, 0.002, 0)); // изолента
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) switcher.add(box(0.012, 0.004, 0.012, 0xb8bcc2, sx * 0.135, 0.152, sz * 0.085)); // винты
    // ручка-переключатель на передней грани
    const knob = ccyl(0.038, 0.042, 0.04, 0x1e1e22, 0, 0, 0, 10);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(0.075, 0.07, 0.12);
    switcher.add(knob);
    switcher.add(box(0.008, 0.03, 0.008, 0xf2f2f2, 0.075, 0.075, 0.142)); // риска на ручке
    for (let i = 0; i < 3; i++) {
      const a = -0.7 + i * 0.7;
      switcher.add(box(0.006, 0.012, 0.004, 0xf2e6c8, 0.075 + Math.sin(a) * 0.056, 0.064 + Math.cos(a) * 0.056, 0.102));
    }
    // маленький экран: показывает текущую сборку
    switcher.add(box(0.11, 0.06, 0.01, 0x101418, -0.02, 0.04, 0.1));
    for (const b of BUILDS) {
      const s = textPlane(b, { width: 0.09, height: 0.04, bg: '#0b1a14', fg: b === '0.9.7' ? '#ff6fa8' : '#63e6a8', font: 'bold 200px monospace', pad: 8 });
      s.position.set(-0.02, 0.07, 0.106);
      switcher.add(s);
      screens[b] = s;
    }
    switcher.add(csphere(0.012, 0, -0.115, 0.1, 0.1, 6, ledMat)); // светодиод
    // провод-антенна
    const ant = ccyl(0.005, 0.005, 0.16, 0x1a1a1a, 0.12, 0.14, -0.07, 4);
    ant.rotation.z = -0.35;
    switcher.add(ant);
    switcher.add(csphere(0.012, 0xc0392b, 0.15, 0.29, -0.07, 5));
    switcher.add(hitbox(0.5, 0.34, 0.46, 0, 0.12, 0));
  }
  add(switcher);

  // ---------- пробковая доска Никиты (запад) ----------
  const noteWall = new THREE.Group();
  noteWall.position.set(-2.98, 0, 0.2); // внутренняя грань западной стены
  {
    noteWall.add(box(0.04, 1.2, 1.95, 0x5e4631, 0.02, 0.92, 0)); // рама
    noteWall.add(box(0.02, 1.1, 1.85, 0xa9814e, 0.045, 0.97, 0)); // пробка
    const notes = [
      ['Комнату вырезали\nв 0.9.4', -0.62, 1.78, 0.05],
      ['Если ты здесь,\nперенос вернул её', 0.02, 1.8, -0.04],
      ['Возьми\nпереключатель', 0.62, 1.74, 0.06],
      ['Сборки по кругу:\n0.9.7, 0.9.3, 0.9.5', -0.5, 1.28, -0.05],
      ['Сравни станцию.\nЧто изменилось?', 0.25, 1.3, 0.04],
      ['не выключай AT\nн.о.', 0.68, 1.22, -0.07],
    ];
    const pinMat = mat(0xc0392b);
    for (const [txt, z, y, rz] of notes) {
      const n = textPlane(txt, { width: 0.42, height: 0.3, bg: '#f3dc5a', fg: '#2a2418', font: `bold 90px ${HAND}`, pad: 30 });
      n.position.set(0.058, y, -z);
      n.rotation.set(0, Math.PI / 2, rz);
      noteWall.add(n);
      noteWall.add(csphere(0.014, 0, 0.065, y + 0.12, -z, 5, pinMat));
    }
    // фото станции и нитка между записками
    noteWall.add(box(0.005, 0.2, 0.26, 0xe8e8e0, 0.058, 1.06, 0.13));
    noteWall.add(box(0.006, 0.15, 0.22, 0x4a6286, 0.06, 1.085, 0.13)); // фото: ночное небо
    noteWall.add(box(0.007, 0.05, 0.22, 0x5a4a3e, 0.061, 1.085, 0.13)); // и станция
    noteWall.add(box(0.008, 0.02, 0.03, 0xffcf7a, 0.062, 1.11, 0.1));
    const thread = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.068, 1.9, 0.62),
      new THREE.Vector3(0.068, 1.92, -0.02),
      new THREE.Vector3(0.068, 1.86, -0.62),
      new THREE.Vector3(0.068, 1.4, 0.5),
    ]);
    noteWall.add(new THREE.Line(thread, new THREE.LineBasicMaterial({ color: 0xc0392b })));
    noteWall.add(hitbox(0.2, 1.25, 2.0, 0.08, 1.52, 0));
  }
  add(noteWall);

  // ---------- терминал автотестов (север, справа) ----------
  const atTerminal = new THREE.Group();
  atTerminal.position.set(1.7, 0, -2.2);
  const atScreenMat = { m: null };
  {
    atTerminal.add(box(0.9, 0.8, 0.6, 0x4a4f55, 0, 0, 0)); // тумба
    atTerminal.add(box(0.86, 0.02, 0.01, 0x30343a, 0, 0.4, 0.302));
    atTerminal.add(box(0.55, 0.45, 0.45, 0xb9b29c, 0, 0.8, -0.06)); // старый монитор
    atTerminal.add(box(0.4, 0.33, 0.22, shade(0xb9b29c, 0.85), 0, 0.86, -0.38));
    const scr = textPlane('АВТОТЕСТЫ  н.о.\nAT-06 ... ЗАВЕРШЁН\nAT-07 ... ЗАВЕРШЁН\nAT-08 ... ОЖИДАЕТ РЕЛИЗ\n> _', {
      width: 0.46,
      height: 0.3,
      bg: '#06170f',
      fg: '#63e6a8',
      font: 'bold 64px monospace',
      align: 'left',
      pad: 40,
      lineHeight: 1.3,
    });
    scr.position.set(0, 1.055, 0.172);
    atTerminal.add(scr);
    atScreenMat.m = scr.material;
    atTerminal.add(box(0.46, 0.025, 0.14, 0xa8a18c, 0, 0.8, 0.22)); // клавиатура
    atTerminal.add(box(0.05, 0.025, 0.01, 0x1a1a1a, 0.2, 0.83, 0.166)); // кнопка питания
    const sticker = textPlane('AT', { width: 0.07, height: 0.05, bg: '#f3dc5a', fg: '#2a2418', font: `bold 160px ${HAND}`, pad: 6 });
    sticker.position.set(-0.2, 0.845, 0.17);
    atTerminal.add(sticker);
    atTerminal.add(hitbox(0.95, 1.8, 0.7, 0, 0.9, 0));
  }
  add(atTerminal);
  R(1.2, 2.2, -2.5, -1.85);

  // ---------- мебель: в 0.9.3 настоящая, в вырезанной сборке серые блоки того же размера ----------
  const greyBlock = mat(0x7a7e84);
  const furniture = [
    // [minX, maxX, minZ, maxZ, высота блока]
    [1.75, 3.0, -0.2, 1.4, 0.76], // стол со стендом
    [2.3, 3.0, -2.5, -1.8, 1.9], // стойка с платами
    [-3.0, -2.45, 1.35, 2.45, 1.1], // шкаф
  ];
  for (const [x0, x1, z0, z1, h] of furniture) {
    R(x0, x1, z0, z1);
    const b = box(x1 - x0, h, z1 - z0, 0, (x0 + x1) / 2, 0, (z0 + z1) / 2, greyBlock);
    cut.add(b);
  }
  const blinkA = uniqueMat(0x63e6a8, { emissive: 0x63e6a8, emissiveIntensity: 1 });
  const blinkB = uniqueMat(0xffb04a, { emissive: 0xffb04a, emissiveIntensity: 1 });
  {
    // стол со стендом
    const o = official;
    o.add(box(0.8, 0.05, 1.55, PAL.deskTop, 2.6, 0.72, 0.6));
    for (const [x, z] of [[2.25, -0.12], [2.95, -0.12], [2.25, 1.32], [2.95, 1.32]]) o.add(box(0.05, 0.72, 0.05, PAL.desk, x, 0, z));
    o.add(box(0.7, 0.5, 0.03, PAL.desk, 2.6, 0.2, 1.3));
    // стенд: плата с проводами и мультиметр
    o.add(box(0.42, 0.03, 0.5, 0x1f5a3a, 2.6, 0.77, 0.25));
    for (let i = 0; i < 4; i++) o.add(box(0.06, 0.03, 0.08, 0x1a1a1a, 2.5 + (i % 2) * 0.18, 0.8, 0.1 + Math.floor(i / 2) * 0.25));
    o.add(box(0.16, 0.07, 0.24, 0xd9b23c, 2.75, 0.77, 0.95)); // мультиметр
    o.add(box(0.1, 0.005, 0.12, 0x9fd0a0, 2.72, 0.845, 0.95));
    // монитор стенда
    const mon = new THREE.Group();
    mon.position.set(2.82, 0.77, 0.55);
    mon.rotation.y = -Math.PI / 2;
    mon.add(box(0.12, 0.02, 0.12, PAL.monitor, 0, 0, 0));
    mon.add(box(0.04, 0.22, 0.04, PAL.monitor, 0, 0.02, 0));
    mon.add(box(0.56, 0.34, 0.04, PAL.monitor, 0, 0.2, 0.02));
    const ms = textPlane('СНИМОК 0.9.3\nсостояние: ОК\nжурнал: нет\nпамять NPC: нет', { width: 0.5, height: 0.29, bg: '#0d1a2a', fg: '#9fd0ff', font: 'bold 64px monospace', align: 'left', pad: 36 });
    ms.position.set(0, 0.37, 0.043);
    mon.add(ms);
    o.add(mon);
    // настольная лампа
    o.add(ccyl(0.07, 0.08, 0.02, 0x2a2420, 2.75, 0.77, 1.15, 8));
    const arm = ccyl(0.012, 0.012, 0.4, 0x2a2420, 2.75, 0.78, 1.15, 4);
    arm.rotation.z = 0.25;
    o.add(arm);
    o.add(csphere(0.07, 0, 2.66, 1.17, 1.15, 6, mat(PAL.lamp, { emissive: PAL.lamp, emissiveIntensity: 1 })));
    // стул
    o.add(box(0.44, 0.05, 0.44, PAL.chair, 1.98, 0.45, 0.6));
    o.add(box(0.05, 0.45, 0.42, PAL.chair, 1.78, 0.5, 0.6));
    o.add(ccyl(0.03, 0.03, 0.42, 0x1a1a1a, 1.98, 0.03, 0.6, 6));
    o.add(box(0.4, 0.03, 0.06, 0x1a1a1a, 1.98, 0.0, 0.6));
    o.add(box(0.06, 0.03, 0.4, 0x1a1a1a, 1.98, 0.0, 0.6));

    // стойка с платами
    o.add(box(0.7, 1.9, 0.62, 0x2b3138, 2.65, 0, -2.15));
    for (let r = 0; r < 5; r++) {
      const y = 0.25 + r * 0.33;
      o.add(box(0.6, 0.22, 0.02, 0x3c4450, 2.65, y, -1.835));
      for (let i = 0; i < 4; i++) o.add(box(0.03, 0.03, 0.01, 0, 2.42 + i * 0.05, y + 0.15, -1.822, (r + i) % 3 === 0 ? blinkB : blinkA));
      const lbl = textPlane(`СТЕНД ${r + 1}`, { width: 0.22, height: 0.06, bg: '#e8dcc0', fg: '#2a2418', font: 'bold 110px sans-serif', pad: 8 });
      lbl.position.set(2.78, y + 0.11, -1.822);
      o.add(lbl);
    }

    // шкаф с папками
    o.add(box(0.52, 1.1, 1.08, PAL.shelf, -2.72, 0, 1.9));
    o.add(box(0.01, 0.48, 0.5, shade(PAL.shelf, 1.2), -2.455, 0.08, 1.62));
    o.add(box(0.01, 0.48, 0.5, shade(PAL.shelf, 1.2), -2.455, 0.08, 2.18));
    o.add(box(0.01, 0.42, 1.0, shade(PAL.shelf, 0.6), -2.455, 0.62, 1.9));
    const binders = [0x2c4a7a, 0x7a2f2f, 0x3a5a3a, 0x2c4a7a, 0xd9b23c, 0x6a5236];
    binders.forEach((c, i) => o.add(box(0.3, 0.34, 0.06, c, -2.72, 0.65, 1.52 + i * 0.075)));
    o.add(box(0.36, 0.24, 0.3, 0x8a8478, -2.7, 1.1, 2.15)); // коробка «архив тестов»
    // коврик у двери
    o.add(box(1.0, 0.012, 0.6, 0x3a2a2a, 0, 0, 1.9));
  }

  // ---------- розовые «ошибочные» кубы и контуры (вырезанная комната) ----------
  const pinkMat = uniqueMat(PAL.glitchPink, { emissive: PAL.glitchPink, emissiveIntensity: 0.85 });
  const cubes = [];
  const cube = (s, x, y, z, parent = cut) => {
    const m = box(s, s, s, 0, x, y - s / 2, z, pinkMat); // y: центр
    m.rotation.set(x * 1.3, z * 0.9 + y, x * 0.7);
    m.userData.base = m.position.clone();
    parent.add(m);
    cubes.push(m);
    return m;
  };
  cube(0.42, 3.55, 1.4, 0.4); // в дыре восточной стены
  cube(0.3, 2.7, 3.25, 0.9); // в дыре потолка
  cube(0.5, -2.7, 0.08, -2.2); // утонул в полу
  cube(0.28, 2.9, 2.05, -2.85); // за съехавшей стеной
  cube(0.6, 5.2, 2.2, 1.8); // далеко в пустоте
  cube(0.22, 0.9, 2.05, -1.5, cut97); // висит над проходом
  cube(0.34, -2.95, 0.95, 1.1, cut97); // торчит из западной стены
  cube(0.26, 2.6, 0.13, 2.15, cut97); // в углу у двери
  cube(0.45, -1.2, 3.1, -1.0, cut97); // в щели потолка
  cube(0.7, -4.6, 1.2, -4.2, cut97); // в пустоте за севером
  cube(0.4, 6.0, 0.6, -1.5, cut97);

  // ---------- скрытая записка Никиты (север, слева), видна только в 0.9.3 ----------
  const hiddenNote = textPlane('Перенос тащит не только журнал.\nОн тащит мой профиль и мои автотесты.\nAT-07 был последним.\nAT-08 запустится на релизе.\nУ всех игроков.\n  н.о.', {
    width: 1.9,
    height: 1.15,
    transparentBg: true,
    fg: '#1c1418',
    font: `bold 70px ${HAND}`,
    align: 'left',
    pad: 40,
    lineHeight: 1.3,
  });
  hiddenNote.material.depthWrite = false;
  hiddenNote.material.opacity = 0;
  hiddenNote.position.set(-1.75, 1.55, -2.488);
  hiddenNote.rotation.z = 0.025;
  hiddenNote.visible = false;
  add(hiddenNote);

  // ---------- точки ----------
  const spawn = { x: 0, z: 1.7, yaw: 0 }; // у двери, лицом на север, в комнату
  const points = {
    switcher: { x: STAND.x, z: STAND.z + 0.95, yaw: 0 }, // перед подставкой, лицом к ней
    hiddenNote: { x: -1.75, z: -1.05, yaw: 0 }, // перед надписью
  };

  // ---------- состояние и сборки ----------
  const st = { build: '0.9.7', noteTarget: 0, taken: false };

  function applyPieces(b) {
    const d = DISPLACE[b] || {};
    for (const [key, m] of Object.entries(pieces)) {
      const o = d[key] || {};
      const base = m.userData.base;
      m.visible = !o.hide;
      m.position.set(base.pos.x + (o.dx || 0), base.pos.y + (o.dy || 0), base.pos.z + (o.dz || 0));
      m.rotation.set(base.rot.x + (o.rx || 0), base.rot.y + (o.ry || 0), base.rot.z + (o.rz || 0));
    }
  }

  const api = {
    setBuild(b) {
      if (!BUILDS.includes(b)) return;
      st.build = b;
      const off = b === '0.9.3';
      official.visible = off;
      cut.visible = !off;
      cut97.visible = b === '0.9.7';
      for (const [m, c93, cCut] of finish) m.color.setHex(off ? c93 : cCut);
      applyPieces(b);
      for (const k of BUILDS) screens[k].visible = k === b;
      // свет
      if (off) {
        scene.background.setHex(0x1a1612);
        scene.fog.color.setHex(0x1a1612);
        scene.fog.near = 8;
        scene.fog.far = 24;
        hemi.color.setHex(0xffe2c0);
        hemi.groundColor.setHex(0x3a3028);
        hemi.intensity = 0.7;
        sun.color.setHex(0xffd9a8);
        sun.intensity = 0.35;
        lampW.color.setHex(0xffcf8a);
        lampE.color.setHex(0xffcf8a);
        accent.color.setHex(0xffc070);
        accent.position.set(2.55, 1.3, 1.05);
        accent.distance = 4;
        panelMatW.emissive.setHex(0xffe0a8);
        panelMatE.emissive.setHex(0xffe0a8);
        panelE.visible = true;
      } else {
        scene.background.setHex(0x040508);
        scene.fog.color.setHex(0x040508);
        scene.fog.near = 5;
        scene.fog.far = 17;
        hemi.color.setHex(0x8a98b4);
        hemi.groundColor.setHex(0x1e2228);
        hemi.intensity = 0.85;
        sun.color.setHex(0x9fb2ff);
        sun.intensity = 0.3;
        lampW.color.setHex(0xb8ccff);
        lampE.color.setHex(0xb8ccff);
        accent.color.setHex(PAL.glitchPink);
        accent.position.set(2.9, 1.5, 0.4);
        accent.distance = 5;
        panelMatW.emissive.setHex(0x9fb8e0);
        panelMatE.emissive.setHex(0x9fb8e0);
        panelE.visible = b === '0.9.5'; // в 0.9.7 светильник висит в пустоте без потолка: прячем
      }
      // скрытая записка: в 0.9.3 проступает, в остальных сразу невидима
      if (off) {
        st.noteTarget = 1;
        hiddenNote.visible = true;
      } else {
        st.noteTarget = 0;
        hiddenNote.material.opacity = 0;
        hiddenNote.visible = false;
      }
      update(0, lastT, null);
    },
    getBuild() {
      return st.build;
    },
    takeSwitcher() {
      st.taken = true;
      switcher.visible = false;
    },
    // для отладки и перезапуска главы
    resetSwitcher() {
      st.taken = false;
      switcher.visible = true;
    },
  };

  const slots = [
    { id: 'switcher', object: switcher },
    { id: 'note_wall', object: noteWall },
    { id: 'at_terminal', object: atTerminal },
    { id: 'exit_door', object: exitDoor },
    { id: 'hidden_note', object: hiddenNote },
  ];

  let lastT = 0;
  function update(dt, t, playerPos) {
    dt = Math.min(dt || 0, 0.1);
    lastT = t || 0;
    const off = st.build === '0.9.3';

    if (off) {
      lampW.intensity = 7 * (0.96 + 0.03 * noise(t * 1.1));
      lampE.intensity = 6 * (0.96 + 0.03 * noise(t * 1.3 + 3));
      accent.intensity = 1.6;
      panelMatW.emissiveIntensity = panelMatE.emissiveIntensity = 1;
      // светодиоды стендов
      blinkA.emissiveIntensity = Math.sin(t * 5.1) > 0 ? 1 : 0.15;
      blinkB.emissiveIntensity = Math.sin(t * 2.3 + 1) > 0.3 ? 1 : 0.1;
    } else {
      // холодный тусклый свет, западная лампа «спотыкается», розовый отсвет мерцает
      let k = 0.9 + 0.1 * noise(t * 1.7);
      if (Math.sin(t * 0.9) * Math.sin(t * 2.3) > 0.78) k *= Math.random() > 0.5 ? 0.15 : 1;
      lampW.intensity = 4.2 * k;
      panelMatW.emissiveIntensity = 0.55 * k;
      lampE.intensity = st.build === '0.9.5' ? 2.4 * (0.9 + 0.1 * noise(t * 2.1 + 5)) : 0;
      panelMatE.emissiveIntensity = 0.45;
      accent.intensity = 1.8 * (0.75 + 0.25 * noise(t * 3.1));
      pinkMat.emissiveIntensity = 0.7 + 0.3 * noise(t * 4.3);
      // кубы иногда дёргаются
      for (let i = 0; i < cubes.length; i++) {
        const c = cubes[i];
        const p = c.userData.base;
        const jolt = Math.sin(t * (1.3 + i * 0.37) + i * 2.1) > 0.97;
        c.position.set(p.x + (jolt ? (Math.random() - 0.5) * 0.12 : 0), p.y + Math.sin(t * 0.8 + i) * 0.03, p.z + (jolt ? (Math.random() - 0.5) * 0.12 : 0));
        c.rotation.y += dt * (0.2 + (i % 3) * 0.15);
      }
    }

    // переключатель: светодиод мигает, пока лежит
    ledMat.emissiveIntensity = Math.sin(t * 6) > 0 ? 1 : 0.2;

    // экран автотестов слегка мерцает
    if (atScreenMat.m) {
      const f = 0.88 + 0.12 * noise(t * 3.7);
      atScreenMat.m.color.setRGB(f, f, f);
    }

    // скрытая записка проступает за ~1.5 с
    const nm = hiddenNote.material;
    if (nm.opacity !== st.noteTarget) {
      const step = dt / 1.5;
      nm.opacity = st.noteTarget > nm.opacity ? Math.min(st.noteTarget, nm.opacity + step) : Math.max(st.noteTarget, nm.opacity - step);
    }
  }

  api.setBuild('0.9.7');

  return {
    scene,
    colliders,
    slots,
    spawn,
    points,
    objects: { switcher, noteWall, atTerminal, exitDoor, hiddenNote },
    api,
    update,
  };
}
