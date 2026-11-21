import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { login, logout, protect, useSync } from '../src/api/sync';
import * as L from '../src/state/logic';
import { useStore } from '../src/state/store';

const id = () => 'p-1';
const json = (status: number, body: unknown) =>
  new Response(body === null ? null : JSON.stringify(body), { status, headers: body === null ? {} : { 'content-type': 'application/json' } });

describe('account logic', () => {
  it('a nickname change leaves the account', () => {
    let s = L.setPlayer(L.emptyState(), 'Аня', 'easy', id);
    s = L.setHasPassword(L.setToken(s, 'tok'), true);
    expect(L.setPlayer(s, 'Аня', 'hard', id).player).toMatchObject({ token: 'tok', hasPassword: true });
    expect(L.setPlayer(s, 'Боря', 'hard', id).player).toMatchObject({ token: null, hasPassword: false });
  });

  it('loginAs keeps this device id and difficulty', () => {
    const s = L.loginAs(L.setPlayer(L.emptyState(), 'гость', 'hard', id), 'Аня', 'tok', () => 'x');
    expect(s.player).toEqual({ id: 'p-1', nickname: 'Аня', difficulty: 'hard', token: 'tok', hasPassword: true });
  });

  it('old saves without hasPassword still load', () => {
    const old = { player: { id: 'p', nickname: 'Аня', difficulty: 'easy', token: null }, muted: false, flags: {}, games: {}, runs: [] };
    const r = L.SavedStateSchema.safeParse(old);
    expect(r.success && r.data.player?.hasPassword).toBe(false);
  });

  it('mergeServer: server saves win, local-only games stay, newer flags win, achievements are joined, bad data is skipped', () => {
    let s = L.applySave(L.emptyState(), 'glitch', { v: 1, room: 1 }, 1);
    s = L.applySave(s, 'mock', { v: 1, local: true }, 1);
    s = L.setFlag(s, 'a', 'local');
    s = L.addAchievement(s, 'glitch', 'gl_local', 1);
    const out = L.mergeServer(
      s,
      {
        glitch: { data: { v: 1, room: 5 }, flags: { a: 'old', b: 1 }, updatedAt: '2026-11-21T10:00:00Z' },
        'chuzhoe-imya': { data: { v: 1, beat: 7 }, flags: { a: 'new' }, updatedAt: '2026-11-21T12:00:00Z' },
        dym: { data: { no: 'version' }, flags: { 'bad key!': 1 }, updatedAt: '2026-11-21T13:00:00Z' },
      },
      [{ gameId: 'glitch', id: 'gl_server' }, { gameId: 'glitch', id: 'gl_local' }],
      2,
    );
    expect(out.games.glitch.data).toEqual({ v: 1, room: 5 });
    expect(out.games.mock.data).toEqual({ v: 1, local: true });
    expect(out.games['chuzhoe-imya'].data).toEqual({ v: 1, beat: 7 });
    expect(out.games.dym).toBeUndefined();
    expect(out.flags).toEqual({ a: 'new', b: 1 });
    expect(out.games.glitch.achievements).toEqual(['gl_local', 'gl_server']);
    expect(L.allAchievements(out)).toEqual([
      { gameId: 'glitch', id: 'gl_local' },
      { gameId: 'glitch', id: 'gl_server' },
    ]);
  });
});

describe('account sync', () => {
  beforeEach(() => {
    useStore.setState({ ...L.emptyState() });
    useSync.setState({ status: 'online', lastSaved: null });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('login brings the account progress to this device', async () => {
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        calls.push(`${init.method} ${url}`);
        if (url.endsWith('/login')) return json(200, { playerId: 's1', token: 'tok', nickname: 'Аня' });
        if (url.endsWith('/saves')) return json(200, { glitch: { data: { v: 1, room: 4 }, flags: {}, updatedAt: '2026-11-21T10:00:00Z' } });
        if (url.endsWith('/achievements/me')) return json(200, [{ gameId: 'glitch', id: 'gl_x' }]);
        if (url.endsWith('/achievements')) return json(200, { added: 0 });
        return json(404, {});
      }),
    );
    expect(await login(' аня ', 'secret1')).toBe('ok');
    const s = useStore.getState();
    expect(s.player).toMatchObject({ nickname: 'Аня', token: 'tok', hasPassword: true });
    expect(s.games.glitch.data).toEqual({ v: 1, room: 4 });
    expect(s.games.glitch.achievements).toEqual(['gl_x']);
    expect(calls).toContain('POST /api/v1/achievements');
  });

  it('login reports a wrong password and a busy server', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => json(401, { error: { code: 'bad_login', message: '' } })));
    expect(await login('Аня', 'nope12')).toBe('bad');
    vi.stubGlobal('fetch', vi.fn(async () => json(429, { error: { code: 'rate_limited', message: '' } })));
    expect(await login('Аня', 'nope12')).toBe('limited');
    expect(useStore.getState().player).toBeNull();
  });

  it('protect marks the account, or reports a taken nickname', async () => {
    useStore.getState().setPlayer('Аня', 'easy');
    useStore.getState().setToken('tok');
    vi.stubGlobal('fetch', vi.fn(async () => json(409, { error: { code: 'nickname_taken', message: '' } })));
    expect(await protect('secret1')).toBe('taken');
    expect(useStore.getState().player?.hasPassword).toBe(false);
    vi.stubGlobal('fetch', vi.fn(async () => json(200, { hasPassword: true })));
    expect(await protect('secret1')).toBe('ok');
    expect(useStore.getState().player?.hasPassword).toBe(true);
  });

  it('logout clears this device even if the server is down', async () => {
    useStore.getState().setPlayer('Аня', 'easy');
    useStore.getState().applySave('glitch', { v: 1 });
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('down'))));
    await logout();
    expect(useStore.getState().player).toBeNull();
    expect(useStore.getState().games).toEqual({});
  });
});
