import type { PersistStorage, StorageValue } from 'zustand/middleware';
import type { z } from 'zod';

/**
 * localStorage wrapper for zustand `persist`.
 * - Blocked storage (private mode, policies) never throws: the game runs without saving.
 * - Corrupt or invalid saves are removed and reported once, so the player can start fresh.
 */
export function createSafeStorage<T>(
  schema: z.ZodType<T>,
  onProblem: (message: string) => void,
): PersistStorage<T> {
  const store = getLocalStorage();
  if (!store) onProblem('Браузер не даёт сохранять прогресс. Играть можно, но после перезагрузки всё начнётся заново.');

  return {
    getItem(name) {
      if (!store) return null;
      let text: string | null;
      try {
        text = store.getItem(name);
      } catch {
        return null;
      }
      if (text === null) return null;
      try {
        const parsed = JSON.parse(text) as StorageValue<unknown>;
        const result = schema.safeParse(parsed.state);
        if (!result.success) throw new Error('invalid save');
        return { state: result.data, version: parsed.version };
      } catch {
        safeRemove(store, name);
        onProblem('Сохранение повреждено, поэтому начнём с чистого листа.');
        return null;
      }
    },
    setItem(name, value) {
      if (!store) return;
      try {
        store.setItem(name, JSON.stringify(value));
      } catch {
        onProblem('Не удалось сохранить прогресс. Играть можно дальше.');
      }
    },
    removeItem(name) {
      if (store) safeRemove(store, name);
    },
  };
}

function getLocalStorage(): Storage | null {
  try {
    const s = window.localStorage;
    const probe = '__profnav_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

function safeRemove(store: Storage, name: string) {
  try {
    store.removeItem(name);
  } catch {
    /* storage became unavailable; nothing else to do */
  }
}
