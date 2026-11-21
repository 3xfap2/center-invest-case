// Собирает реплики Ирины, Тимура и Лиса из src/content/dialogues.js для озвучки.
// Запуск: node scripts/voice-lines.mjs > lines.json
// Реплики с {name} не озвучиваются: ник игрока заранее не произнести.
import { D } from '../src/content/dialogues.js';
import { voiceKey, VOICED } from '../src/core/voiceKey.js';

const lines = new Map();
function walk(x) {
  if (Array.isArray(x)) return x.forEach(walk);
  if (!x || typeof x !== 'object') return;
  if (typeof x.text === 'string' && VOICED.includes(x.who) && !x.text.includes('{name}') && x.text.replace(/[.…\s]/g, '')) {
    const key = voiceKey(x.who, x.text);
    lines.set(key, { key, who: x.who, text: x.text });
  }
  for (const v of Object.values(x)) if (v && typeof v === 'object') walk(v);
}
walk(D);
process.stdout.write(JSON.stringify([...lines.values()], null, 2));
