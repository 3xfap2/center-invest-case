import { create } from 'zustand';
import type { Difficulty } from '../bridge/messages';
import { allAchievements } from '../state/logic';
import { useStore } from '../state/store';
import { ApiError, api } from './client';

/**
 * Local first: every change is saved in the browser at once. When the server is reachable,
 * saves are also copied there (debounced) and finished runs are sent for the leaderboard.
 * When it is not, nothing breaks; the status just says «Сохранено на этом устройстве».
 */

type Status = 'checking' | 'online' | 'offline';
export const useSync = create<{ status: Status; lastSaved: 'server' | 'local' | null }>(() => ({ status: 'checking', lastSaved: null }));

const SAVE_DEBOUNCE_MS = 1500;
const timers = new Map<string, ReturnType<typeof setTimeout>>();
let connecting: Promise<void> | null = null;

const online = () => useSync.getState().status === 'online';

/** Checks the server, creates the player there if needed, and sends runs that were finished offline. */
export function connect(): Promise<void> {
  connecting ??= (async () => {
    try {
      await api.health();
    } catch {
      useSync.setState({ status: 'offline' });
      return;
    }
    useSync.setState({ status: 'online' });
    await ensurePlayer();
    await flushRuns();
    await pushAchievements();
  })().finally(() => {
    connecting = null;
  });
  return connecting;
}

let creating: Promise<string | null> | null = null;
function ensurePlayer(): Promise<string | null> {
  const { player } = useStore.getState();
  if (!player) return Promise.resolve(null);
  if (player.token) return Promise.resolve(player.token);
  // One request at a time, so two saves can't create two players.
  creating ??= createPlayer(player.nickname).finally(() => {
    creating = null;
  });
  return creating;
}

let conflict: string | null = null; // a nickname the server refused this session: don't ask again
async function createPlayer(nickname: string): Promise<string | null> {
  if (conflict === nickname) return null;
  const { setToken } = useStore.getState();
  try {
    const r = await api.createPlayer(nickname);
    setToken(r.token);
    return r.token;
  } catch (e) {
    // The player started offline and someone else registered this nickname meanwhile.
    if (e instanceof ApiError && e.status === 409) {
      conflict = nickname;
      useStore.setState({ notice: `Ник «${nickname}» уже занят на сервере. Прогресс хранится только на этом устройстве. Смени ник на старте.` });
    }
    // 400: the server did not accept the nickname (for example the word filter). Stay local.
    else if (!(e instanceof ApiError) || e.status >= 500) useSync.setState({ status: 'offline' });
    return null;
  }
}

/** Nicknames are compared like the server does: case-insensitive, «ё» = «е». */
export const sameNickname = (a: string, b: string) => {
  const k = (s: string) => s.trim().toLowerCase().replaceAll('ё', 'е');
  return k(a) === k(b);
};

/**
 * «Дальше» on the start screen. A nickname this device already owns just continues.
 * A new one is registered on the server first, so a taken nickname is refused before the game starts.
 * Without the server the player starts locally and is registered later.
 */
export async function startAs(nickname: string, difficulty: Difficulty): Promise<'ok' | 'taken' | 'bad'> {
  const nick = nickname.trim();
  const s = useStore.getState();
  if (s.player?.token && sameNickname(s.player.nickname, nick)) {
    s.setPlayer(s.player.nickname, difficulty);
    return 'ok';
  }
  if (useSync.getState().status !== 'online') await connect();
  if (useSync.getState().status !== 'online') {
    s.setPlayer(nick, difficulty);
    return 'ok';
  }
  try {
    const r = await api.createPlayer(nick);
    s.setPlayer(r.nickname, difficulty);
    useStore.getState().setToken(r.token);
  } catch (e) {
    if (e instanceof ApiError && e.status === 409) return 'taken';
    if (e instanceof ApiError && e.status === 400) return 'bad';
    s.setPlayer(nick, difficulty); // the server failed: play locally, register later
    return 'ok';
  }
  void flushRuns();
  void pushAchievements();
  return 'ok';
}

/** Runs a call with the player's token. A 401 means the server forgot us: get a new token once and retry. */
async function withToken<T>(f: (token: string) => Promise<T>): Promise<T | null> {
  let token = await ensurePlayer();
  if (!token) return null;
  try {
    return await f(token);
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      const s = useStore.getState();
      if (s.player?.hasPassword) {
        // An account's session ended (for example after a server reset). Don't create a stranger with the same nickname.
        s.setToken(null);
        s.setHasPassword(false);
        useStore.setState({ notice: 'Вход в аккаунт устарел. Войди снова, чтобы прогресс сохранялся на сервере.' });
        return null;
      }
      s.setToken(null);
      token = await ensurePlayer();
      if (token) return f(token);
    }
    throw e;
  }
}

// ---- achievements ----

let achTimer: ReturnType<typeof setTimeout> | undefined;
/** Called when a game grants an achievement. Sends all of them a moment later (the server ignores repeats). */
export function queueAchievements() {
  clearTimeout(achTimer);
  achTimer = setTimeout(() => void pushAchievements(), SAVE_DEBOUNCE_MS);
}

export async function pushAchievements() {
  if (!online()) return;
  const items = allAchievements(useStore.getState()).slice(0, 200);
  if (items.length === 0) return;
  await withToken((t) => api.postAchievements(t, items)).catch(() => undefined);
}

// ---- optional accounts ----

export type AccountResult = 'ok' | 'bad' | 'taken' | 'limited' | 'offline';

const errorResult = (e: unknown): AccountResult =>
  e instanceof ApiError ? (e.status === 401 ? 'bad' : e.status === 409 ? 'taken' : e.status === 429 ? 'limited' : e.status === 400 ? 'bad' : 'offline') : 'offline';

/** Logs this device into an account with its password and brings its saves and achievements here. */
export async function login(nickname: string, password: string): Promise<AccountResult> {
  try {
    const r = await api.login(nickname.trim(), password);
    useStore.getState().loginAs(r.nickname, r.token, true);
    return await afterLogin(r.token);
  } catch (e) {
    return errorResult(e);
  }
}

/** Logs this device in with a one-time code from the player's other device. No password needed. */
export async function loginWithCode(nickname: string, code: string): Promise<AccountResult> {
  try {
    const r = await api.loginCode(nickname.trim(), code.replace(/\s/g, ''));
    useStore.getState().loginAs(r.nickname, r.token, r.hasPassword);
    return await afterLogin(r.token);
  } catch (e) {
    return errorResult(e);
  }
}

/** On the old device: a 6-digit code to continue on another device (valid 10 minutes, once). */
export async function requestCode(): Promise<{ code: string; expiresAt: string } | 'offline'> {
  if (!online()) return 'offline';
  try {
    const r = await withToken((t) => api.createTransfer(t));
    return r ?? 'offline';
  } catch {
    return 'offline';
  }
}

async function afterLogin(token: string): Promise<AccountResult> {
  useSync.setState({ status: 'online' });
  try {
    const [saves, achievements] = await Promise.all([api.allSaves(token), api.myAchievements(token)]);
    useStore.getState().mergeServer(saves, achievements);
  } catch {
    // Logged in, but the progress couldn't be loaded now; local progress stays.
  }
  await pushAchievements();
  for (const gameId of Object.keys(useStore.getState().games)) queueSave(gameId);
  return 'ok';
}

/** Protects the current nickname with a password, so it opens on any device. */
export async function protect(password: string): Promise<AccountResult> {
  if (!online()) return 'offline';
  try {
    const r = await withToken((t) => api.setPassword(t, password));
    if (!r) return 'offline';
    useStore.getState().setHasPassword(true);
    return 'ok';
  } catch (e) {
    return errorResult(e);
  }
}

/** Ends this device's session and clears its local progress. The account and its saves stay on the server. */
export async function logout() {
  const token = useStore.getState().player?.token;
  if (token) await api.logout(token).catch(() => undefined);
  useStore.getState().logout();
  useSync.setState({ lastSaved: null });
}

/** Called after every local save. */
export function queueSave(gameId: string) {
  useSync.setState({ lastSaved: 'local' });
  if (!online()) return;
  clearTimeout(timers.get(gameId));
  timers.set(
    gameId,
    setTimeout(() => {
      timers.delete(gameId);
      const { games, flags } = useStore.getState();
      withToken((t) => api.putSave(t, gameId, games[gameId]?.data ?? null, flags))
        .then((r) => r && useSync.setState({ lastSaved: 'server' }))
        .catch(() => useSync.setState({ lastSaved: 'local' }));
    }, SAVE_DEBOUNCE_MS),
  );
}

export async function flushRuns() {
  if (!online()) return;
  for (const run of useStore.getState().runs.filter((r) => !r.synced)) {
    try {
      const { gameId, ending, stars, score, durationSec, difficulty, choices } = run;
      const r = await withToken((t) => api.postRun(t, { gameId, ending, stars, score, durationSec, difficulty, choices }));
      if (r) useStore.getState().markRunSynced(run.at);
    } catch (e) {
      // 4xx: the server will never take this run (for example too short). Don't retry it forever.
      if (e instanceof ApiError && e.status < 500 && e.status !== 429) useStore.getState().markRunSynced(run.at);
      else return;
    }
  }
}
