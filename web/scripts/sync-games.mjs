// Runs before dev, build and test.
// 1. Copies the shared bridge into the mock game (the real games copy it in their own build).
// 2. Collects every game's game.json into src/games.generated.json, and marks whether its build exists.
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(web, '..');
const built = join(web, 'public', 'games');
const sources = join(repo, 'games');

copyFileSync(join(sources, 'shared', 'ns-bridge.js'), join(built, 'mock', 'ns-bridge.js'));

const dirs = (p) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : []);
const ids = [...new Set([...dirs(sources), ...dirs(built)])].filter((id) => id !== 'shared').sort();

const games = [];
for (const id of ids) {
  // The source game.json is the truth; a built copy is the fallback (and the only one for the mock game).
  const file = [join(sources, id, 'game.json'), join(built, id, 'game.json')].find((f) => existsSync(f));
  if (!file) continue;
  let meta;
  try {
    meta = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new Error(`${file}: invalid JSON (${e.message})`);
  }
  if (meta.id !== id) throw new Error(`${file}: "id" is "${meta.id}", but the folder is "${id}"`);
  const entry = typeof meta.entry === 'string' ? meta.entry : 'index.html';
  games.push({ ...meta, available: existsSync(join(built, id, entry)) });
}

writeFileSync(join(web, 'src', 'games.generated.json'), JSON.stringify(games, null, 2) + '\n');
console.log(`sync-games: ${games.map((g) => `${g.id}${g.available ? '' : ' (no build)'}`).join(', ') || 'none'}`);
