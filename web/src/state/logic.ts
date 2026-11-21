import { z } from 'zod';
import {
  DifficultySchema, EndSchema, FlagKeySchema, FlagValueSchema, ProgressSchema, SaveDataSchema,
  type Difficulty, type EndResult, type FlagValue, type Progress, type SaveData,
} from '../bridge/messages';

/** Everything the site keeps about a player. Pure functions here; the zustand store in store.ts calls them. */

export const NICKNAME = /^[\p{L}\p{N} _-]{2,20}$/u;
export const isNickname = (s: string) => NICKNAME.test(s) && s.trim().length >= 2;

export const MAX_RUNS = 50;

const PlayerSchema = z.object({
  id: z.string().min(1).max(64),
  nickname: z.string().regex(NICKNAME),
  difficulty: DifficultySchema,
  /** Bearer token from the server, or null while the player exists only on this device. */
  token: z.string().max(200).nullable(),
  /** The player protected the nickname with a password (optional), so it works on any device. */
  hasPassword: z.boolean().default(false),
  /** The secret login key the server made for this player («K7MX-2QPA-9RTD»), kept so the player can see it again here. */
  key: z.string().max(20).nullable().default(null),
});
export type Player = z.infer<typeof PlayerSchema>;

const GameSaveSchema = z.object({
  data: SaveDataSchema.nullable(),
  progress: ProgressSchema.nullable(),
  achievements: z.array(z.string()).max(200),
  updatedAt: z.number(),
});
export type GameSave = z.infer<typeof GameSaveSchema>;

const RunSchema = EndSchema.extend({
  gameId: z.string(),
  difficulty: DifficultySchema,
  /** Achievements first earned during this run. */
  earned: z.array(z.string()),
  at: z.number(),
  /** true once the server has accepted (or finally rejected) it. */
  synced: z.boolean(),
});
export type Run = z.infer<typeof RunSchema>;

export const SavedStateSchema = z.object({
  player: PlayerSchema.nullable(),
  muted: z.boolean(),
  /** Shared by all games: a choice in one game can matter in another. */
  flags: z.record(FlagKeySchema, FlagValueSchema),
  games: z.record(z.string(), GameSaveSchema),
  runs: z.array(RunSchema).max(MAX_RUNS),
});
export type SavedState = z.infer<typeof SavedStateSchema>;

export const emptyState = (): SavedState => ({ player: null, muted: false, flags: {}, games: {}, runs: [] });

const emptyGame = (): GameSave => ({ data: null, progress: null, achievements: [], updatedAt: 0 });
const gameOf = (s: SavedState, id: string) => s.games[id] ?? emptyGame();
const withGame = (s: SavedState, id: string, g: Partial<GameSave>, now: number): SavedState => ({
  ...s,
  games: { ...s.games, [id]: { ...gameOf(s, id), ...g, updatedAt: now } },
});

export function setPlayer(s: SavedState, nickname: string, difficulty: Difficulty, newId: () => string): SavedState {
  const nick = nickname.trim();
  const old = s.player;
  // A new nickname means a new player on the server, so the old token (and account) is dropped.
  const same = !!old && old.nickname === nick;
  return {
    ...s,
    player: { id: old?.id ?? newId(), nickname: nick, difficulty, token: same ? old.token : null, hasPassword: same ? old.hasPassword : false, key: same ? old.key : null },
  };
}

/** After a login: this device now belongs to that account. */
export function loginAs(s: SavedState, nickname: string, token: string, newId: () => string, hasPassword = true, key: string | null = null): SavedState {
  return { ...s, player: { id: s.player?.id ?? newId(), nickname, difficulty: s.player?.difficulty ?? 'normal', token, hasPassword, key } };
}

export const setKey = (s: SavedState, key: string | null): SavedState => (s.player ? { ...s, player: { ...s.player, key } } : s);

export const setHasPassword = (s: SavedState, hasPassword: boolean): SavedState =>
  s.player ? { ...s, player: { ...s.player, hasPassword } } : s;

export interface ServerSave {
  data: unknown;
  flags: unknown;
  updatedAt: string;
}

/**
 * Brings the account's progress from the server onto this device after a login.
 * The server's save wins for each game it has; local games it doesn't know stay.
 * Flags: newer saves win. Achievements: the union. Anything that fails validation is skipped.
 */
export function mergeServer(s: SavedState, saves: Record<string, ServerSave>, achievements: { gameId: string; id: string }[], now: number): SavedState {
  let out = s;
  const ordered = Object.entries(saves).sort(([, a], [, b]) => a.updatedAt.localeCompare(b.updatedAt));
  for (const [gameId, sv] of ordered) {
    const data = SaveDataSchema.nullable().safeParse(sv.data);
    if (data.success && data.data) out = applySave(out, gameId, data.data, now);
    const flags = z.record(FlagKeySchema, FlagValueSchema).safeParse(sv.flags);
    if (flags.success) out = { ...out, flags: { ...out.flags, ...flags.data } };
  }
  for (const a of achievements) out = addAchievement(out, a.gameId, a.id, now);
  return out;
}

/** Every achievement on this device, for sending to the server. */
export const allAchievements = (s: SavedState) =>
  Object.entries(s.games).flatMap(([gameId, g]) => g.achievements.map((id) => ({ gameId, id })));

export const setToken = (s: SavedState, token: string | null): SavedState =>
  s.player ? { ...s, player: { ...s.player, token } } : s;

export const applySave = (s: SavedState, gameId: string, data: SaveData, now: number) => withGame(s, gameId, { data }, now);

export const setFlag = (s: SavedState, key: string, value: FlagValue): SavedState => ({ ...s, flags: { ...s.flags, [key]: value } });

export const setProgress = (s: SavedState, gameId: string, progress: Progress, now: number) =>
  withGame(s, gameId, { progress }, now);

/** Returns the same state object when the achievement is already owned. */
export function addAchievement(s: SavedState, gameId: string, id: string, now: number): SavedState {
  const g = gameOf(s, gameId);
  if (g.achievements.includes(id)) return s;
  return withGame(s, gameId, { achievements: [...g.achievements, id] }, now);
}

export function finishRun(s: SavedState, gameId: string, end: EndResult, earned: string[], now: number): { state: SavedState; run: Run } {
  const run: Run = { ...end, gameId, difficulty: s.player?.difficulty ?? 'normal', earned, at: now, synced: false };
  return { state: { ...s, runs: [...s.runs, run].slice(-MAX_RUNS) }, run };
}

export const markRunSynced = (s: SavedState, at: number): SavedState => ({
  ...s,
  runs: s.runs.map((r) => (r.at === at ? { ...r, synced: true } : r)),
});

/** "Начать заново": the story starts again. Achievements and finished runs stay. */
export const resetGame = (s: SavedState, gameId: string, now: number) => withGame(s, gameId, { data: null, progress: null }, now);

export const lastRun = (s: SavedState, gameId: string) => [...s.runs].reverse().find((r) => r.gameId === gameId) ?? null;
