// Предпросмотр сцен агента «Мир»: /dev/world.html?scene=office|station&cam=spawn&fx=archive,service,chalk,glitch,lantern
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createOffice } from '../src/world/office.js';
import { createStation } from '../src/world/station.js';

const params = new URLSearchParams(location.search);
const sceneName = params.get('scene') === 'station' ? 'station' : 'office';
if (params.has('shot')) document.body.classList.add('shot');

const canvas = document.getElementById('view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight, false);

const world = sceneName === 'station' ? createStation() : createOffice();
const { scene } = world;
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 200);
scene.add(camera); // чтобы дети камеры (фонарь) рендерились
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const EYE = 1.6;
function placeAt(p) {
  camera.position.set(p.x, EYE, p.z);
  const fx = -Math.sin(p.yaw);
  const fz = -Math.cos(p.yaw);
  controls.target.set(p.x + fx * 0.6, EYE - 0.05, p.z + fz * 0.6);
  controls.update();
}
function placeCam(c) {
  camera.position.set(...c.pos);
  controls.target.set(...c.look);
  controls.update();
}

const named = { spawn: world.spawn, ...(world.points || {}) };
const camsEl = document.getElementById('cams');
for (const [k, v] of Object.entries(named)) {
  const a = document.createElement('a');
  a.href = `?scene=${sceneName}&cam=${k}`;
  a.textContent = k;
  camsEl.append(a);
}
for (const k of Object.keys(world.cams || {})) {
  const a = document.createElement('a');
  a.href = `?scene=${sceneName}&cam=${k}`;
  a.textContent = 'cam:' + k;
  camsEl.append(a);
}
const camKey = params.get('cam') || 'spawn';
if (named[camKey]) placeAt(named[camKey]);
else if (world.cams && world.cams[camKey]) placeCam(world.cams[camKey]);
else placeAt(world.spawn);
if (params.has('pos')) {
  camera.position.set(...params.get('pos').split(',').map(Number));
  controls.target.set(...(params.get('look') || '0,1,0').split(',').map(Number));
  controls.update();
}
window.__world = world;
window.__THREE = THREE;
if (params.has('top')) {
  camera.position.set(0, 24, 8);
  controls.target.set(0, 0, 1.5);
  controls.update();
}

// действия для станции
const api = world.api;
const fx = (params.get('fx') || '').split(',').filter(Boolean);
let lanternOn = false;
function toggleLantern() {
  const l = api.makeHandLantern();
  lanternOn = !lanternOn;
  if (lanternOn) camera.add(l);
  else camera.remove(l);
  api.setLanternOnHook(!lanternOn);
}
if (api) {
  const actions = {
    'фонарь': toggleLantern,
    'журнал (глитч)': () => api.setJournalVisible(false, { glitch: true }),
    'журнал вернуть': () => api.setJournalVisible(true),
    'архив открыть/закрыть': () => (api.isArchiveOpen() ? api.closeArchiveDoor() : api.openArchiveDoor()),
    'служебная дверь': () => api.openServiceDoor(),
    'мел': () => api.setChalkVisible(true),
    'сброс': () => api.resetState(),
  };
  const el = document.getElementById('actions');
  for (const [k, fn] of Object.entries(actions)) {
    const b = document.createElement('button');
    b.textContent = k;
    b.onclick = fn;
    el.append(b);
  }
  if (fx.includes('lantern')) toggleLantern();
  if (fx.includes('archive')) api.openArchiveDoor();
  if (fx.includes('service')) api.openServiceDoor();
  if (fx.includes('chalk')) api.setChalkVisible(true);
  if (fx.includes('glitch')) api.setJournalVisible(false, { glitch: true });
}

// статистика
let meshes = 0;
let points = 0;
let lightsP = 0;
scene.traverse((o) => {
  if (o.isMesh) meshes++;
  if (o.isPointLight) lightsP++;
  if (o.isPoints) points++;
});
const slotIds = world.slots.map((s) => s.id).join(', ');
const statsEl = document.getElementById('stats');

window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

const timer = new THREE.Timer();
let t = params.has('t') ? parseFloat(params.get('t')) : 0;
let frame = 0;
function loop() {
  timer.update();
  const dt = Math.min(timer.getDelta(), 0.1);
  t += dt;
  // «игрок» = точка камеры на полу
  world.update(dt, t, { x: camera.position.x, z: camera.position.z });
  controls.update();
  renderer.render(scene, camera);
  if (frame++ % 30 === 0) {
    const info = renderer.info.render;
    statsEl.textContent = `scene: ${sceneName}\nmeshes: ${meshes}  points: ${points}\npointLights: ${lightsP}${lanternOn ? ' (+ фонарь)' : ''}\ndraw calls: ${info.calls}  tris: ${info.triangles}\ncolliders: ${world.colliders.length}\nslots: ${slotIds}\ncam: ${camera.position.x.toFixed(2)}, ${camera.position.z.toFixed(2)}`;
    window.__worldStats = { meshes, points, lightsP, calls: info.calls, tris: info.triangles };
  }
  requestAnimationFrame(loop);
}
loop();
