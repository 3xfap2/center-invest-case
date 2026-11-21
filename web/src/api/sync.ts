import { create } from 'zustand';
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

async function createPlayer(nickname: string): Promise<string | null> {
  const { setToken } = useStore.getState();
  try {
    const r = await api.createPlayer(nickname);
    setToken(r.token);
    return r.token;
  } catch (e) {
    // 400: the server did not accept the nickname (for example the word filter). Stay local.
    if (!(e instanceof ApiError) || e.status >= 500) useSync.setState({ status: 'offline' });
    return null;
  }
}

/** Runs a call with the player's token. A 401 means the server forgot us: get a new token once and retry. */
async function withToken<T>(f: (token: string) => Promise<T>): Promise<T | null> {
  let token = await ensurePlayer();
  if (!token) return null;
  try {
    return await f(token);
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      useStore.getState().setToken(null);
      token = await ensurePlayer();
      if (token) return f(token);
    }
    throw e;
  }
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
