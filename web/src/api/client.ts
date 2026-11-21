import { z } from 'zod';
import type { Difficulty, FlagValue, SaveData } from '../bridge/messages';

/** Thin client for the Go server (docs/API.md). Every call can fail; callers fall back to local saves. */

const BASE = '/api/v1';
const TIMEOUT_MS = 4000;

export class ApiError extends Error {
  constructor(public status: number, public code: string) {
    super(`${status} ${code}`);
  }
}

async function call<T>(schema: z.ZodType<T>, method: string, path: string, opts: { token?: string | null; body?: unknown; timeout?: number } = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    signal: AbortSignal.timeout(opts.timeout ?? TIMEOUT_MS),
  });
  // A static host without the server answers with index.html: that is "no API", not a crash.
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body: unknown = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    const code = z.object({ error: z.object({ code: z.string() }) }).safeParse(body);
    throw new ApiError(res.status, code.success ? code.data.error.code : 'unknown');
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new ApiError(res.status, 'bad_response');
  return parsed.data;
}

export const api = {
  health: () => call(z.object({ ok: z.literal(true) }), 'GET', '/health', { timeout: 2500 }),

  createPlayer: (nickname: string) =>
    call(z.object({ playerId: z.string(), token: z.string(), nickname: z.string() }), 'POST', '/players', { body: { nickname } }),

  putSave: (token: string, gameId: string, data: SaveData | null, flags: Record<string, FlagValue>) =>
    call(z.object({ updatedAt: z.string() }), 'PUT', `/saves/${encodeURIComponent(gameId)}`, { token, body: { data, flags } }),

  postRun: (
    token: string,
    run: { gameId: string; ending: string; stars: number; score: number; durationSec: number; difficulty: Difficulty; choices: unknown[] },
  ) => call(z.object({ runId: z.union([z.string(), z.number()]) }), 'POST', '/runs', { token, body: run }),

  checkNickname: (nickname: string) =>
    call(z.object({ valid: z.boolean(), available: z.boolean() }), 'GET', `/players/check?nickname=${encodeURIComponent(nickname)}`),

  // Optional accounts: playing never needs them.
  setPassword: (token: string, password: string) =>
    call(z.object({ hasPassword: z.literal(true) }), 'POST', '/players/me/password', { token, body: { password } }),

  login: (nickname: string, password: string) =>
    call(z.object({ playerId: z.string(), token: z.string(), nickname: z.string() }), 'POST', '/login', { body: { nickname, password } }),

  createTransfer: (token: string) =>
    call(z.object({ code: z.string(), expiresAt: z.string(), nickname: z.string() }), 'POST', '/players/me/transfer', { token }),

  loginCode: (nickname: string, code: string) =>
    call(z.object({ playerId: z.string(), token: z.string(), nickname: z.string(), hasPassword: z.boolean() }), 'POST', '/login/code', {
      body: { nickname, code },
    }),

  logout: (token: string) => call(z.null(), 'POST', '/logout', { token }),

  allSaves: (token: string) =>
    call(z.record(z.string(), z.object({ data: z.unknown(), flags: z.unknown(), updatedAt: z.string() })), 'GET', '/saves', { token }),

  postAchievements: (token: string, items: { gameId: string; id: string }[]) =>
    call(z.object({ added: z.number() }), 'POST', '/achievements', { token, body: { items } }),

  myAchievements: (token: string) => call(z.array(z.object({ gameId: z.string(), id: z.string() })), 'GET', '/achievements/me', { token }),

  achievementBoard: (limit = 10) =>
    call(
      z.array(z.object({ nickname: z.string(), achievements: z.number(), games: z.number(), lastAt: z.string() })),
      'GET',
      `/leaderboard/achievements?limit=${limit}`,
    ),

  leaderboard: (gameId: string, limit = 10) =>
    call(
      z.array(z.object({ nickname: z.string(), score: z.number(), stars: z.number(), ending: z.string(), durationSec: z.number(), at: z.string() })),
      'GET',
      `/leaderboard?gameId=${encodeURIComponent(gameId)}&limit=${limit}`,
    ),
};
export type LeaderRow = Awaited<ReturnType<typeof api.leaderboard>>[number];
export type AchievementRow = Awaited<ReturnType<typeof api.achievementBoard>>[number];
export type ServerSaves = Awaited<ReturnType<typeof api.allSaves>>;
