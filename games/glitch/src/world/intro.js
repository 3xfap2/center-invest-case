// Сцена вступления: комната героя. Ночь, компьютер, тетрадь, стена со стикерами.
// Экран монитора рисуется на canvas: игра, глитч, ошибка, письмо, титры, вакансия.
import * as THREE from 'three';
import { mat, uniqueMat, box, textPlane, PAL } from './build.js';
import { createCharacter, animateCharacter, ccyl, csphere } from './characters.js';

const SCR_W = 512;
const SCR_H = 330;

export function createIntro() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090f);
  scene.fog = new THREE.Fog(0x07090f, 7, 16);
  scene.add(new THREE.HemisphereLight(0x8a9ac8, 0x241a14, 0.6));
  const moon = new THREE.DirectionalLight(0x9fb4ff, 0.35);
  moon.position.set(-4, 4, 1);
  scene.add(moon);
  const add = (o) => (scene.add(o), o);

  // ---------- комната 4.4 × 3.6 м ----------
  const wallC = 0x2e3850;
  add(box(4.4, 0.1, 3.8, 0x3b2f29, 0, -0.1, 0)); // пол
  add(box(4.4, 2.7, 0.1, wallC, 0, 0, -1.85)); // северная стена (за столом)
  add(box(0.1, 2.7, 3.8, wallC, 2.25, 0, 0)); // восточная
  add(box(0.1, 0.9, 3.8, wallC, -2.25, 0, 0)); // западная: низ под окном
  add(box(0.1, 0.5, 3.8, wallC, -2.25, 2.2, 0)); // западная: верх над окном
  add(box(0.1, 1.3, 1.1, wallC, -2.25, 0.9, -1.3)); // простенки у окна
  add(box(0.1, 1.3, 1.3, wallC, -2.25, 0.9, 1.25));
  add(box(4.4, 0.1, 3.8, 0x1c2232, 0, 2.7, 0)); // потолок
  add(box(4.4, 0.12, 0.04, 0x232b3d, 0, 0, -1.79)); // плинтус

  // окно с ночным небом, луной и звёздами
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.3), new THREE.MeshBasicMaterial({ color: 0x0b1633, toneMapped: false }));
  sky.position.set(-2.32, 1.55, -0.15);
  sky.rotation.y = Math.PI / 2;
  add(sky);
  add(csphere(0.09, 0xf2f0e6, -2.3, 1.95, 0.2, 8, new THREE.MeshBasicMaterial({ color: 0xf2f0e6 })));
  for (let i = 0; i < 14; i++) {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.018, 0.018), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    s.position.set(-2.3, 1.0 + Math.random() * 1.1, -0.7 + Math.random() * 1.1);
    s.rotation.y = Math.PI / 2;
    add(s);
  }
  add(box(0.12, 0.05, 1.3, 0x4a3a2e, -2.18, 0.88, -0.15)); // подоконник
  add(box(0.06, 1.3, 0.05, 0x4a3a2e, -2.2, 0.9, -0.15)); // рама

  // ---------- стол, монитор, клавиатура ----------
  const wood = 0x7a5638;
  add(box(1.7, 0.06, 0.72, 0x9a6f4a, 0, 0.72, -1.42)); // столешница
  for (const [x, z] of [[-0.8, -1.72], [0.8, -1.72], [-0.8, -1.12], [0.8, -1.12]]) add(box(0.05, 0.72, 0.05, wood, x, 0, z));
  add(box(0.1, 0.16, 0.08, 0x15181e, 0, 0.78, -1.64)); // подставка монитора
  add(box(0.66, 0.44, 0.06, 0x15181e, 0, 0.94, -1.64)); // корпус монитора

  const canvas = document.createElement('canvas');
  canvas.width = SCR_W;
  canvas.height = SCR_H;
  const g = canvas.getContext('2d');
  const scrTex = new THREE.CanvasTexture(canvas);
  scrTex.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.387), new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false }));
  screen.position.set(0, 1.16, -1.606);
  add(screen);

  add(box(0.46, 0.02, 0.15, 0x22262e, 0, 0.78, -1.3)); // клавиатура
  add(box(0.07, 0.025, 0.11, 0x22262e, 0.36, 0.78, -1.3)); // мышь

  // тетрадь с записями шагов
  add(box(0.24, 0.012, 0.32, 0xefe6cf, 0.58, 0.78, -1.3));
  const notes = textPlane('1. Сохранился у босса\n2. Открыл инвентарь\n3. Прыгнул\n4. Зависла!', {
    width: 0.22,
    height: 0.3,
    bg: '#efe6cf',
    fg: '#2a3a7a',
    font: 'bold 96px "Segoe Print", "Comic Sans MS", cursive',
    align: 'left',
    pad: 40,
    lineHeight: 1.5,
  });
  notes.position.set(0.58, 0.794, -1.3);
  notes.rotation.x = -Math.PI / 2;
  add(notes);
  add(box(0.012, 0.012, 0.16, 0x3050c0, 0.72, 0.795, -1.32)); // ручка

  // настольная лампа
  add(ccyl(0.07, 0.09, 0.03, 0x2b3138, -0.62, 0.78, -1.5));
  add(ccyl(0.012, 0.012, 0.32, 0x2b3138, -0.62, 0.81, -1.5));
  add(ccyl(0.05, 0.11, 0.1, 0xd8b04a, -0.62, 1.11, -1.5, 8));
  const lampLight = new THREE.PointLight(0xffc070, 1.4, 4, 1.6);
  lampLight.position.set(-0.62, 1.05, -1.4);
  add(lampLight);
  const screenLight = new THREE.PointLight(0x6fb3ff, 1.2, 3.2, 1.6);
  screenLight.position.set(0, 1.15, -1.25);
  add(screenLight);

  // стул: спинка закрывает героя ниже плеч
  const chairC = 0x1f2630;
  add(box(0.5, 0.06, 0.5, chairC, 0, 0.45, -0.72));
  add(box(0.5, 0.62, 0.06, chairC, 0, 0.5, -0.45));
  add(ccyl(0.03, 0.03, 0.45, 0x111418, 0, 0, -0.72));

  // кровать, полка, плакат
  add(box(1.0, 0.42, 2.0, 0x4e3a58, 1.68, 0, 0.6));
  add(box(0.7, 0.12, 0.35, 0xe8e2d4, 1.68, 0.42, -0.2));
  add(box(1.0, 0.04, 0.26, wood, -1.3, 1.85, -1.72));
  for (let i = 0; i < 6; i++) add(box(0.07, 0.24, 0.18, [0xb04a3a, 0x3a6fb0, 0xd8b04a, 0x4a8a5a][i % 4], -1.7 + i * 0.12, 1.89, -1.72));
  const poster = textPlane('ПИКСЕЛЬ\nКВЕСТ', { width: 0.6, height: 0.8, bg: '#2a1f3e', fg: '#ffcf7a', font: 'bold 150px sans-serif' });
  poster.position.set(-1.3, 1.25, -1.79);
  add(poster);

  // стена со стикерами-багами справа от стола: появляются по одному
  const stickers = [];
  const stickerColors = [0xf2d54a, 0xf2a7c3, 0x8fd3f2, 0xb7e38a];
  for (let i = 0; i < 42; i++) {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const sc = stickerColors[i % 4];
    const s = box(0.13, 0.13, 0.006, sc, 0.95 + col * 0.17 + (Math.random() - 0.5) * 0.04, 0.95 + row * 0.2 + (Math.random() - 0.5) * 0.04, -1.795, mat(sc, { emissive: sc, emissiveIntensity: 0.35 }));
    s.rotation.z = (Math.random() - 0.5) * 0.25;
    s.visible = false;
    add(s);
    stickers.push(s);
  }

  // герой за компьютером: со спины, «сидит» (опущен, ноги скрыты полом и стулом)
  const hero = createCharacter({ name: 'hero', shirt: 0x3d5a80, pants: 0x2b2f38, hair: 0x3a2a1e, skin: PAL.skin });
  hero.rotation.y = Math.PI;
  add(hero);

  // ---------- экран монитора ----------
  let screenKind = 'game';
  let heroName = '';
  let glitchTimer = 0;

  function drawGame(glitch = false) {
    const sk = g.createLinearGradient(0, 0, 0, SCR_H);
    sk.addColorStop(0, '#2b1d5a');
    sk.addColorStop(1, '#d0607a');
    g.fillStyle = sk;
    g.fillRect(0, 0, SCR_W, SCR_H);
    g.fillStyle = '#2f6b4a';
    g.beginPath();
    g.moveTo(0, 250);
    for (let x = 0; x <= SCR_W; x += 32) g.lineTo(x, 230 + Math.sin(x / 40) * 18);
    g.lineTo(SCR_W, SCR_H);
    g.lineTo(0, SCR_H);
    g.fill();
    g.fillStyle = '#ffd34a'; // герой игры
    g.fillRect(110, 200, 22, 32);
    g.fillStyle = '#8a1f2a'; // босс
    g.fillRect(330, 120, 110, 110);
    g.fillStyle = '#ffffff';
    g.fillRect(360, 150, 14, 14);
    g.fillRect(400, 150, 14, 14);
    g.fillStyle = '#111';
    g.fillRect(300, 30, 180, 16);
    g.fillStyle = '#e23a3a';
    g.fillRect(302, 32, 60, 12);
    g.fillStyle = '#fff';
    g.font = 'bold 16px sans-serif';
    g.fillText('ФИНАЛЬНЫЙ БОСС', 300, 24);
    if (glitch) {
      for (let i = 0; i < 9; i++) {
        const y = Math.random() * SCR_H;
        const h = 6 + Math.random() * 26;
        g.drawImage(canvas, 0, y, SCR_W, h, (Math.random() - 0.5) * 70, y, SCR_W, h);
        g.fillStyle = Math.random() > 0.5 ? 'rgba(55,230,255,0.35)' : 'rgba(255,61,138,0.35)';
        g.fillRect(0, y, SCR_W, h * 0.4);
      }
    }
  }

  function drawText(bg, fg, lines, { size = 26, top = 60, align = 'left', x = 36 } = {}) {
    g.fillStyle = bg;
    g.fillRect(0, 0, SCR_W, SCR_H);
    g.fillStyle = fg;
    g.textAlign = align;
    g.textBaseline = 'alphabetic';
    lines.forEach((ln, i) => {
      const [txt, style] = Array.isArray(ln) ? ln : [ln, null];
      g.font = style || `${size}px sans-serif`;
      g.fillText(txt, align === 'center' ? SCR_W / 2 : x, top + i * size * 1.45);
    });
    g.textAlign = 'left';
  }

  function draw() {
    switch (screenKind) {
      case 'game':
        drawGame(false);
        break;
      case 'glitch':
        drawGame(true);
        break;
      case 'crash':
        drawText('#10307a', '#ffffff', [['Игра перестала работать', 'bold 30px sans-serif'], '', 'Код ошибки: 0x0412', 'Несохранённый прогресс потерян.'], { top: 110, size: 24 });
        break;
      case 'sending':
        drawText('#f2f2f2', '#22262e', [['Новое письмо', 'bold 24px sans-serif'], 'Кому: студия «Пиксель»', 'Тема: игра зависает у босса', '', 'Шаги: 1. Сохраниться у босса', '2. Открыть инвентарь  3. Прыгнуть', '', ['Отправка…', 'bold 22px sans-serif']], { top: 44, size: 20 });
        break;
      case 'mail':
        drawText('#f2f2f2', '#22262e', [['Студия «Пиксель»', 'bold 24px sans-serif'], 'Тема: Re: игра зависает у босса', '', 'Спасибо! Ошибка повторилась', 'по вашим шагам. Исправили', 'в версии 1.0.4.', '', ['Вы в титрах :)', 'bold 22px sans-serif']], { top: 46, size: 21 });
        break;
      case 'credits':
        drawText('#05060a', '#c9cfdb', ['Пиксель Квест', '', 'Программирование', 'Художники', '', ['Особая благодарность', 'bold 24px sans-serif'], '', [heroName, 'bold 34px sans-serif']], { top: 44, size: 22, align: 'center' });
        break;
      case 'ad':
        drawText('#141a22', '#e6e9ee', [['Студия «Ноль-Один»', 'bold 28px sans-serif'], ['ищет младшего тестировщика', 'bold 24px sans-serif'], '', 'Нужно: внимательность', 'и любовь к сломанным вещам.', '', ['[ Откликнуться ]', 'bold 24px sans-serif']], { top: 58, size: 22 });
        g.fillStyle = '#f2c94c';
        g.fillRect(0, 0, 10, SCR_H);
        break;
      default:
        g.fillStyle = '#000';
        g.fillRect(0, 0, SCR_W, SCR_H);
    }
    scrTex.needsUpdate = true;
  }

  const SCREEN_LIGHT = { game: 0x9f7ad8, glitch: 0xff5aa0, crash: 0x3a5cff, sending: 0xdfe6f2, mail: 0xdfe6f2, credits: 0x9aa4b2, ad: 0xf2c94c };

  const api = {
    setScreen(kind) {
      screenKind = kind;
      screenLight.color.setHex(SCREEN_LIGHT[kind] || 0x6fb3ff);
      draw();
    },
    setName(name) {
      heroName = name;
      if (screenKind === 'credits') draw();
    },
    setStickers(n) {
      stickers.forEach((s, i) => (s.visible = i < n));
    },
    // Ребёнком герой ниже; взрослым выше.
    setHeroAge(age) {
      const kid = age === 'kid';
      hero.scale.setScalar(kid ? 0.82 : 1);
      hero.position.set(0, kid ? -0.06 : -0.36, -0.78);
    },
  };
  api.setHeroAge('kid');
  api.setScreen('game');

  // Точки камеры для кадров: [позиция, куда смотреть].
  const cams = {
    roomFrom: [[0.1, 1.6, 1.5], [0, 1.15, -1.6]],
    roomTo: [[0.28, 1.38, 0.15], [0, 1.15, -1.6]],
    notesFrom: [[1.0, 1.35, -0.55], [0.58, 0.79, -1.3]],
    notesTo: [[0.72, 1.1, -0.98], [0.58, 0.79, -1.3]],
    monFrom: [[-0.68, 1.32, -0.5], [0, 1.14, -1.6]],
    monTo: [[-0.52, 1.24, -1.08], [0, 1.15, -1.6]], // слева от головы и уже перед ней
    screenFrom: [[-0.28, 1.18, -1.08], [0, 1.16, -1.6]], // начинаем перед лицом, не в голове
    screenTo: [[0, 1.16, -1.2], [0, 1.16, -1.6]],
    wallFrom: [[0.35, 1.5, 0.5], [1.35, 1.35, -1.8]],
    wallTo: [[1.0, 1.55, -0.2], [1.5, 1.45, -1.8]],
    adFrom: [[0.15, 1.35, 0.7], [0, 1.16, -1.6]],
    adVia: [0.9, 1.3, -0.8], // широкая дуга справа от головы
    adTo: [[0, 1.17, -1.12], [0, 1.16, -1.6]],
  };

  return {
    scene,
    colliders: [],
    slots: [],
    objects: { hero, screen },
    api,
    cams,
    update(dt, t) {
      animateCharacter(hero, t);
      if (screenKind === 'glitch') {
        glitchTimer += dt;
        if (glitchTimer > 0.08) {
          glitchTimer = 0;
          draw();
        }
      }
    },
  };
}
