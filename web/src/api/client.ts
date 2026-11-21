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

  leaderboard: (gameId: string, limit = 10) =>
    call(
      z.array(z.object({ nickname: z.string(), score: z.number(), stars: z.number(), ending: z.string(), durationSec: z.number(), at: z.string() })),
      'GET',
      `/leaderboard?gameId=${encodeURIComponent(gameId)}&limit=${limit}`,
    ),
};
export type LeaderRow = Awaited<ReturnType<typeof api.leaderboard>>[number];
