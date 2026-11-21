// Озвучка реплик Ирины, Тимура и Лиса: файлы из public/voice (генерирует scripts/tts_generate.py).
// Реплики с ником игрока не озвучены: их ключа нет в манифесте, и они просто идут текстом.
import { audioContext, audioOut } from './audio.js';
import { voiceKey, VOICED } from './voiceKey.js';

let manifest = null;
let manifestLoad = null;
const buffers = new Map(); // ключ -> Promise<AudioBuffer>
let current = null;

function loadManifest() {
  if (!manifestLoad) {
    manifestLoad = fetch('./voice/manifest.json')
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((m) => (manifest = m));
  }
  return manifestLoad;
}

function loadBuffer(key) {
  const ctx = audioContext();
  if (!ctx || !manifest?.[key]) return null;
  if (!buffers.has(key)) {
    buffers.set(
      key,
      fetch(`./${manifest[key].file}`)
        .then((r) => r.arrayBuffer())
        .then((b) => ctx.decodeAudioData(b))
        .catch(() => null),
    );
  }
  return buffers.get(key);
}

export const voice = {
  // Подгрузить все реплики в фоне (после первого нажатия игрока, когда есть звук).
  async preload() {
    await loadManifest();
    for (const key of Object.keys(manifest || {})) await loadBuffer(key);
  },
  // Сказать реплику. who и text такие же, как в диалоге (до подстановки ника).
  async say(who, text) {
    this.stop();
    if (!VOICED.includes(who) || !text || text.includes('{name}')) return;
    await loadManifest();
    const key = voiceKey(who, text);
    const p = loadBuffer(key);
    if (!p) return;
    const token = {};
    current = token;
    const buf = await p;
    const ctx = audioContext();
    if (!buf || !ctx || current !== token) return; // пока грузилось, игрок уже пролистал
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 1.15;
    src.connect(g).connect(audioOut());
    src.start();
    token.src = src;
  },
  stop() {
    if (current?.src) {
      try {
        current.src.stop();
      } catch {
        /* уже закончилась */
      }
    }
    current = null;
  },
  has(who, text) {
    return !!manifest?.[voiceKey(who, text)];
  },
  loadManifest,
};
