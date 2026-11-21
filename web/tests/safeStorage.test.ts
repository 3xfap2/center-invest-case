import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSafeStorage } from '../src/state/safeStorage';
import { SavedStateSchema, emptyState } from '../src/state/logic';

function fakeLocalStorage(initial: Record<string, string> = {}) {
  const m = new Map(Object.entries(initial));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    map: m,
  };
}

afterEach(() => vi.unstubAllGlobals());

describe('safe storage', () => {
  it('loads a valid save', () => {
    const ls = fakeLocalStorage({ s: JSON.stringify({ state: emptyState(), version: 1 }) });
    vi.stubGlobal('window', { localStorage: ls });
    const problems: string[] = [];
    expect(createSafeStorage(SavedStateSchema, (m) => problems.push(m)).getItem('s')).toEqual({ state: emptyState(), version: 1 });
    expect(problems).toEqual([]);
  });

  it.each([
    ['broken JSON', '{not json'],
    ['wrong shape', JSON.stringify({ state: { player: 5 }, version: 1 })],
  ])('removes a %s save and reports it once', (_, text) => {
    const ls = fakeLocalStorage({ s: text });
    vi.stubGlobal('window', { localStorage: ls });
    const problems: string[] = [];
    expect(createSafeStorage(SavedStateSchema, (m) => problems.push(m)).getItem('s')).toBeNull();
    expect(ls.map.has('s')).toBe(false);
    expect(problems).toHaveLength(1);
  });

  it('works without storage (private mode)', () => {
    vi.stubGlobal('window', {
      get localStorage() {
        throw new Error('blocked');
      },
    });
    const problems: string[] = [];
    const st = createSafeStorage(SavedStateSchema, (m) => problems.push(m));
    expect(st.getItem('s')).toBeNull();
    expect(() => st.setItem('s', { state: emptyState(), version: 1 })).not.toThrow();
    expect(problems).toHaveLength(1);
  });
});
