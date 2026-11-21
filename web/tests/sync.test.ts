import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { connect, flushRuns, useSync } from '../src/api/sync';
import { useStore } from '../src/state/store';

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const end = { ending: 'good', stars: 2, score: 100, durationSec: 300, choices: [] };

beforeEach(() => {
  useStore.setState({ player: null, runs: [], games: {}, flags: {} });
  useSync.setState({ status: 'checking', lastSaved: null });
});
afterEach(() => vi.unstubAllGlobals());

describe('sync with the server', () => {
  it('goes offline when /health answers with the site page instead of JSON', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<!doctype html>', { status: 200, headers: { 'content-type': 'text/html' } })));
    await connect();
    expect(useSync.getState().status).toBe('offline');
  });

  it('goes offline when the network fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('Failed to fetch'))));
    await connect();
    expect(useSync.getState().status).toBe('offline');
  });

  it('creates the player once, then sends unsent runs', async () => {
    useStore.getState().setPlayer('Аня', 'easy');
    useStore.getState().finishRun('mock', end, []);
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push(`${init.method} ${url}`);
        if (url.endsWith('/health')) return json(200, { ok: true, version: '1' });
        if (url.endsWith('/players')) return json(201, { playerId: 's1', token: 'tok', nickname: 'Аня' });
        if (url.endsWith('/runs')) return json(201, { runId: 'r1' });
        return json(404, {});
      }),
    );
    await connect();
    expect(calls).toEqual(['GET /api/v1/health', 'POST /api/v1/players', 'POST /api/v1/runs']);
    expect(useStore.getState().player?.token).toBe('tok');
    expect(useStore.getState().runs[0].synced).toBe(true);
  });

  it('does not retry a run the server rejected (400), but keeps one that failed with 500', async () => {
    useStore.getState().setPlayer('Аня', 'easy');
    useStore.getState().setToken('tok');
    useStore.getState().finishRun('mock', end, []);
    useSync.setState({ status: 'online' });
    vi.stubGlobal('fetch', vi.fn(async () => json(500, { error: { code: 'internal', message: '' } })));
    await flushRuns();
    expect(useStore.getState().runs[0].synced).toBe(false);
    vi.stubGlobal('fetch', vi.fn(async () => json(400, { error: { code: 'bad_duration', message: '' } })));
    await flushRuns();
    expect(useStore.getState().runs[0].synced).toBe(true);
  });

  it('gets a new token after a 401 and retries', async () => {
    useStore.getState().setPlayer('Аня', 'easy');
    useStore.getState().setToken('old');
    useStore.getState().finishRun('mock', end, []);
    useSync.setState({ status: 'online' });
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        const auth = (init.headers as Record<string, string>).Authorization;
        if (url.endsWith('/players')) return json(201, { playerId: 's2', token: 'new', nickname: 'Аня' });
        if (url.endsWith('/runs')) return auth === 'Bearer new' ? json(201, { runId: 'r' }) : json(401, { error: { code: 'unauthorized', message: '' } });
        return json(404, {});
      }),
    );
    await flushRuns();
    expect(useStore.getState().player?.token).toBe('new');
    expect(useStore.getState().runs[0].synced).toBe(true);
  });
});
