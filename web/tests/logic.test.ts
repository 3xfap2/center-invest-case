import { describe, expect, it } from 'vitest';
import * as L from '../src/state/logic';

const end = { ending: 'good', stars: 2, score: 100, durationSec: 300, choices: [] };
const id = () => 'p-1';

describe('save logic', () => {
  it('validates nicknames like the server', () => {
    for (const n of ['Аня_15', 'Max', 'Иван Петров', 'a-b']) expect(L.isNickname(n), n).toBe(true);
    for (const n of ['a', ' ', 'x'.repeat(21), 'bad<script>', 'smile\u{1F642}', '  ']) expect(L.isNickname(n), n).toBe(false);
  });

  it('keeps the player id and token when only the difficulty changes', () => {
    let s = L.setPlayer(L.emptyState(), 'Аня', 'easy', id);
    s = L.setToken(s, 'tok');
    s = L.setPlayer(s, 'Аня', 'hard', () => 'other');
    expect(s.player).toEqual({ id: 'p-1', nickname: 'Аня', difficulty: 'hard', token: 'tok', hasPassword: false });
  });

  it('drops the server token when the nickname changes', () => {
    let s = L.setToken(L.setPlayer(L.emptyState(), 'Аня', 'easy', id), 'tok');
    s = L.setPlayer(s, 'Боря', 'easy', id);
    expect(s.player?.token).toBeNull();
    expect(s.player?.id).toBe('p-1');
  });

  it('stores saves per game and flags across games', () => {
    let s = L.applySave(L.emptyState(), 'glitch', { v: 1, room: 2 }, 10);
    s = L.applySave(s, 'chuzhoe-imya', { v: 1, beat: 5 }, 11);
    s = L.setFlag(s, 'gl_helped_dev', true);
    expect(s.games.glitch.data).toEqual({ v: 1, room: 2 });
    expect(s.games['chuzhoe-imya'].data).toEqual({ v: 1, beat: 5 });
    expect(s.flags).toEqual({ gl_helped_dev: true });
  });

  it('adds an achievement once', () => {
    const a = L.addAchievement(L.emptyState(), 'glitch', 'gl_x', 1);
    expect(a.games.glitch.achievements).toEqual(['gl_x']);
    expect(L.addAchievement(a, 'glitch', 'gl_x', 2)).toBe(a);
  });

  it('records runs, keeps the last 50, and finds the latest per game', () => {
    let s = L.setPlayer(L.emptyState(), 'Аня', 'hard', id);
    for (let i = 0; i < 60; i++) s = L.finishRun(s, i % 2 ? 'glitch' : 'mock', { ...end, score: i }, [], i).state;
    expect(s.runs).toHaveLength(L.MAX_RUNS);
    expect(L.lastRun(s, 'glitch')?.score).toBe(59);
    expect(L.lastRun(s, 'mock')?.difficulty).toBe('hard');
    expect(L.lastRun(s, 'none')).toBeNull();
  });

  it('marks a run as synced', () => {
    const { state } = L.finishRun(L.emptyState(), 'mock', end, [], 42);
    expect(L.markRunSynced(state, 42).runs[0].synced).toBe(true);
  });

  it('reset clears the story but keeps achievements and runs', () => {
    let s = L.applySave(L.emptyState(), 'glitch', { v: 1 }, 1);
    s = L.setProgress(s, 'glitch', { step: 'b', percent: 80 }, 2);
    s = L.addAchievement(s, 'glitch', 'gl_a', 3);
    s = L.finishRun(s, 'glitch', end, ['gl_a'], 4).state;
    s = L.resetGame(s, 'glitch', 5);
    expect(s.games.glitch).toMatchObject({ data: null, progress: null, achievements: ['gl_a'] });
    expect(s.runs).toHaveLength(1);
  });

  it('the saved-state schema accepts real state and rejects tampered state', () => {
    let s = L.setPlayer(L.emptyState(), 'Аня', 'normal', id);
    s = L.applySave(s, 'mock', { v: 1, n: 1 }, 1);
    expect(L.SavedStateSchema.safeParse(s).success).toBe(true);
    expect(L.SavedStateSchema.safeParse({ ...s, muted: 'yes' }).success).toBe(false);
    expect(L.SavedStateSchema.safeParse({ ...s, games: { mock: { ...s.games.mock, data: { n: 1 } } } }).success).toBe(false);
  });
});
