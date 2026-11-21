import { z } from 'zod';
import generated from '../games.generated.json';
import type { SceneId } from '../ui/Scene';

/**
 * The game list = each game's own game.json (copied in by scripts/sync-games.mjs) + the site's
 * own copy and look below. A game listed here but not built yet shows «скоро».
 */

const GameJsonSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,32}$/),
  title: z.string().min(1).max(80),
  profession: z.string().min(1).max(120),
  version: z.string().max(32),
  entry: z.string().default('index.html'),
  minutes: z.number().positive().max(240).optional(),
  controls: z.string().max(120).optional(),
  approxSizeMB: z.number().nonnegative().optional(),
  // Optional, if a game wants nicer names on the results screen than the raw ids.
  achievements: z.record(z.string(), z.string().max(80)).optional(),
  endings: z.record(z.string(), z.string().max(80)).optional(),
  available: z.boolean(),
});
type GameJson = z.infer<typeof GameJsonSchema>;

interface SiteCopy {
  title: string;
  /** Short profession for posters and tags. */
  prof: string;
  /** Full profession for the departure board and loading screen. */
  profession: string;
  minutes: number;
  controls: string;
  /** Where and when the story happens, shown in the meta line. */
  place: string;
  hook: string;
  accent: string;
  scene: SceneId | null;
  achievementPrefix: string;
}

const COPY: Record<string, SiteCopy> = {
  'chuzhoe-imya': {
    title: 'Чужое имя',
    prof: 'Антифрод в банке',
    profession: 'Специалист по антифроду',
    minutes: 18,
    controls: 'WASD и мышь',
    place: 'банк · вечер',
    hook: 'Реквизиты подменили. До оплаты три часа. Кому ты поверишь?',
    accent: '#F5B947',
    scene: 'chuzhoe',
    achievementPrefix: 'ci_',
  },
  glitch: {
    title: 'ГЛИТЧ: Последняя сборка',
    prof: 'Тестировщик игр',
    profession: 'Тестировщик игр',
    minutes: 30,
    controls: 'WASD и мышь',
    place: 'студия · ночь',
    hook: 'Завтра релиз. Мир меняется от билда к билду. Помнит об этом только один персонаж.',
    accent: '#45E0E6',
    scene: 'glitch',
    achievementPrefix: 'gl_',
  },
  kompas: {
    title: 'Компас',
    prof: 'Профориентолог',
    profession: 'Школьный профориентолог',
    minutes: 15,
    controls: 'мышь',
    place: 'лагерь на Дону · лето',
    hook: 'Пять подростков, три дня и один вопрос: кем им стать?',
    accent: '#8CCBFF',
    scene: 'kompas',
    achievementPrefix: 'km_',
  },
  dym: {
    title: 'Дым',
    prof: 'Пожарный',
    profession: 'Пожарный',
    minutes: 20,
    controls: 'WASD и мышь',
    place: 'город · ночь',
    hook: 'Первая ночная смена. Пять вызовов. Воздуха в баллоне на двенадцать минут.',
    accent: '#FF7A4D',
    scene: 'dym',
    achievementPrefix: 'dm_',
  },
  mock: {
    title: 'Тестовая игра',
    prof: 'Проверка моста',
    profession: 'Проверка моста',
    minutes: 1,
    controls: 'мышь',
    place: 'разработка',
    hook: 'Кнопки для каждого сообщения моста. Только для разработки.',
    accent: '#5ED27A',
    scene: null,
    achievementPrefix: 'mk_',
  },
};

export interface Game {
  id: string;
  title: string;
  prof: string;
  profession: string;
  minutes: number;
  controls: string;
  place: string;
  hook: string;
  accent: string;
  scene: SceneId | null;
  available: boolean;
  entry: string;
  achievementPrefix: string;
  achievementName: (id: string) => string;
  endingName: (id: string) => string;
  devOnly: boolean;
}

const built = new Map<string, GameJson>();
for (const raw of generated as unknown[]) {
  const r = GameJsonSchema.safeParse(raw);
  if (r.success) built.set(r.data.id, r.data);
}

function make(id: string): Game {
  const j = built.get(id);
  const c = COPY[id];
  return {
    id,
    title: c?.title ?? j?.title ?? id,
    prof: c?.prof ?? j?.profession ?? '',
    profession: c?.profession ?? j?.profession ?? '',
    // The game's own game.json knows its real length best.
    minutes: j?.minutes ?? c?.minutes ?? 20,
    controls: c?.controls ?? j?.controls ?? '',
    place: c?.place ?? '',
    hook: c?.hook ?? '',
    accent: c?.accent ?? '#5ED27A',
    scene: c?.scene ?? null,
    available: j?.available ?? false,
    entry: j?.entry ?? 'index.html',
    achievementPrefix: c?.achievementPrefix ?? '',
    achievementName: (a) => j?.achievements?.[a] ?? a,
    endingName: (e) => j?.endings?.[e] ?? e,
    devOnly: id === 'mock',
  };
}

const ORDER = ['chuzhoe-imya', 'glitch', 'kompas', 'dym'];
export const GAMES: Game[] = [...new Set([...ORDER, ...built.keys()])].map(make);

export const gameById = (id: string) => GAMES.find((g) => g.id === id) ?? null;
export const publicGames = (dev: boolean) => GAMES.filter((g) => dev || !g.devOnly);
export const GREEN = '#5ED27A';
