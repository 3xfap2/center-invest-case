import { z } from 'zod';

/** Messages a game may send (docs/GAME_CONTRACT.md §3). Anything that doesn't match is ignored. */

export const MAX_SAVE_BYTES = 64 * 1024;

const Json = z.json();
const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).length;

export const SaveDataSchema = z
  .record(z.string(), Json)
  .refine((d) => d.v === 1, 'save needs "v": 1')
  .refine((d) => bytes(d) <= MAX_SAVE_BYTES, 'save is larger than 64 KB');
export type SaveData = z.infer<typeof SaveDataSchema>;

export const FlagValueSchema = z.union([z.string().max(200), z.number().finite(), z.boolean(), z.null()]);
export type FlagValue = z.infer<typeof FlagValueSchema>;
export const FlagKeySchema = z.string().regex(/^[A-Za-z0-9_.:-]{1,64}$/);

export const ProgressSchema = z.object({
  step: z.union([z.string().max(64), z.number().int()]),
  percent: z.number().min(0).max(100),
});
export type Progress = z.infer<typeof ProgressSchema>;

export const EndSchema = z.object({
  ending: z.string().min(1).max(64),
  stars: z.number().int().min(0).max(3),
  score: z.number().finite(),
  durationSec: z.number().finite().min(0).max(86_400),
  choices: z.array(Json).max(200),
});
export type EndResult = z.infer<typeof EndSchema>;

const base = { ns: z.literal(1) };

export const GameMessageSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('ready'), gameId: z.string().min(1).max(64), version: z.string().max(32) }),
  z.object({ ...base, type: z.literal('save'), data: SaveDataSchema }),
  z.object({ ...base, type: z.literal('flag'), key: FlagKeySchema, value: FlagValueSchema }),
  z.object({ ...base, type: z.literal('progress'), ...ProgressSchema.shape }),
  z.object({ ...base, type: z.literal('achievement'), id: z.string().regex(/^[a-z0-9_]{1,64}$/) }),
  z.object({ ...base, type: z.literal('end'), ...EndSchema.shape }),
  z.object({ ...base, type: z.literal('exit') }),
]);
export type GameMessage = z.infer<typeof GameMessageSchema>;

export function parseGameMessage(data: unknown): GameMessage | null {
  const r = GameMessageSchema.safeParse(data);
  return r.success ? r.data : null;
}

/** Messages the site sends to a game. */
export type SiteMessage =
  | { type: 'init'; playerId: string; nickname: string; difficulty: Difficulty; save: SaveData | null; flags: Record<string, FlagValue>; muted: boolean }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'mute'; muted: boolean };

export const DifficultySchema = z.enum(['easy', 'normal', 'hard']);
export type Difficulty = z.infer<typeof DifficultySchema>;
