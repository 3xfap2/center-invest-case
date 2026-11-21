import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Difficulty, EndResult, FlagValue, Progress, SaveData } from '../bridge/messages';
import * as L from './logic';
import { createSafeStorage } from './safeStorage';

interface Store extends L.SavedState {
  notice: string | null;
  setPlayer: (nickname: string, difficulty: Difficulty) => void;
  setToken: (token: string | null) => void;
  applySave: (gameId: string, data: SaveData) => void;
  setFlag: (key: string, value: FlagValue) => void;
  setProgress: (gameId: string, p: Progress) => void;
  /** true when the achievement is new. */
  addAchievement: (gameId: string, id: string) => boolean;
  finishRun: (gameId: string, end: EndResult, earned: string[]) => L.Run;
  markRunSynced: (at: number) => void;
  resetGame: (gameId: string) => void;
  toggleMute: () => void;
  dismissNotice: () => void;
}

const saved = (s: Store): L.SavedState => ({ player: s.player, muted: s.muted, flags: s.flags, games: s.games, runs: s.runs });

// Storage problems can be reported while the store is being created, so they wait until it exists.
// Each message is shown once: a failing write must not loop.
let pending: string | null = null;
let last: string | null = null;
let show: ((m: string) => void) | null = null;
function report(m: string) {
  if (m === last) return;
  last = m;
  if (show) show(m);
  else pending = m;
}

/** The only owner of saved state. Games never touch it directly; the host page calls these actions. */
export const useStore = create<Store>()(
  persist(
    (set, get) => {
      const update = (f: (s: L.SavedState) => L.SavedState) => set((s) => f(saved(s)));
      return {
        ...L.emptyState(),
        notice: null,
        setPlayer: (n, d) => update((s) => L.setPlayer(s, n, d, () => crypto.randomUUID())),
        setToken: (t) => update((s) => L.setToken(s, t)),
        applySave: (g, data) => update((s) => L.applySave(s, g, data, Date.now())),
        setFlag: (k, v) => update((s) => L.setFlag(s, k, v)),
        setProgress: (g, p) => update((s) => L.setProgress(s, g, p, Date.now())),
        addAchievement: (g, id) => {
          const before = saved(get());
          const after = L.addAchievement(before, g, id, Date.now());
          if (after === before) return false;
          set(after);
          return true;
        },
        finishRun: (g, end, earned) => {
          const { state, run } = L.finishRun(saved(get()), g, end, earned, Date.now());
          set(state);
          return run;
        },
        markRunSynced: (at) => update((s) => L.markRunSynced(s, at)),
        resetGame: (g) => update((s) => L.resetGame(s, g, Date.now())),
        toggleMute: () => set((s) => ({ muted: !s.muted })),
        dismissNotice: () => set({ notice: null }),
      };
    },
    {
      name: 'profnav-save',
      version: 1,
      storage: createSafeStorage(L.SavedStateSchema, report),
      partialize: saved,
    },
  ),
);

show = (m) => useStore.setState({ notice: m });
if (pending) show(pending);
