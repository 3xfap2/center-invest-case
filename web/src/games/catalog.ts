import { z } from 'zod';
import generated from '../games.generated.json';

/**
 * The game list = each game's own game.json (copied in by scripts/sync-games.mjs) + the site's
 * marketing copy below. A game listed here but not built yet shows «скоро».
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
  profession: string;
  minutes: string;
  /** Two short lines: the situation and the stakes. */
  hook: string;
  achievementPrefix: string;
}

const COPY: Record<string, SiteCopy> = {
  glitch: {
    title: 'GLITCH: Последний билд',
    profession: 'Тестировщик игр (QA)',
    minutes: '20–30 мин',
    hook: 'Первый день в игровой студии, а завтра релиз. Мир игры меняется от билда к билду, и один персонаж помнит версии, которых уже нет.',
    achievementPrefix: 'gl_',
  },
  'chuzhoe-imya': {
    title: 'Чужое имя',
    profession: 'Специалист по противодействию мошенничеству в банке',
    minutes: '15–20 мин',
    hook: 'Три часа до оплаты оборудования для молодёжного фестиваля. Реквизиты подменили, а подозреваемым выглядит пятнадцатилетний волонтёр.',
    achievementPrefix: 'ci_',
  },
  mock: {
    title: 'Тестовая игра',
    profession: 'Проверка моста',
    minutes: '1 мин',
    hook: 'Кнопки для каждого сообщения моста. Только для разработки.',
    achievementPrefix: 'mk_',
  },
};

export interface Game {
  id: string;
  title: string;
  profession: string;
  minutes: string;
  hook: string;
  controls: string | null;
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
    title: j?.title ?? c?.title ?? id,
    profession: j?.profession ?? c?.profession ?? '',
    minutes: c?.minutes ?? (j?.minutes ? `${j.minutes} мин` : ''),
    hook: c?.hook ?? '',
    controls: j?.controls ?? null,
    available: j?.available ?? false,
    entry: j?.entry ?? 'index.html',
    achievementPrefix: c?.achievementPrefix ?? '',
    achievementName: (a) => j?.achievements?.[a] ?? a,
    endingName: (e) => j?.endings?.[e] ?? e,
    devOnly: id === 'mock',
  };
}

const ORDER = ['glitch', 'chuzhoe-imya'];
export const GAMES: Game[] = [...new Set([...ORDER, ...built.keys()])].map(make);

export const gameById = (id: string) => GAMES.find((g) => g.id === id) ?? null;
export const publicGames = (dev: boolean) => GAMES.filter((g) => dev || !g.devOnly);
