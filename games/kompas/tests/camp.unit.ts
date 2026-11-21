import { describe, expect, it } from 'vitest';
import { camp, types } from '../src/camp/content';
import { activity, afterSlot, afterTalk, answerPicture, assign, chooseRanking, createGame, demoEnding, difficultyRules, fromSave, observe, outcome, playerRadar, presentPaths, profile, recommend, slotSeconds, spreadAssignments, startSlot, talk, tick, toSave } from '../src/camp/game';
import type { CampState } from '../src/camp/game';

const liza = camp.teens.find(teen => teen.id === 'liza')!;
const artem = camp.teens.find(teen => teen.id === 'artem')!;
const timur = camp.teens.find(teen => teen.id === 'timur')!;
const base = () => createGame('normal', 42);
const given = (): CampState => ({ ...base(), phase: 'watch', assignments: { ...spreadAssignments(), liza: 'garden' } });

describe('Camp', () => {
  it('reveals a single axis and spends one point per teen in that slot', () => {
    const initial = given();
    expect(profile(initial, liza)).toEqual([null, null, null, null, null]);
    const next = observe(initial, 'liza');
    expect(profile(next, liza)).toEqual([95, null, null, null, null]);
    expect(next.points).toBe(initial.points - 1);
    expect(observe(next, 'liza')).toBe(next);
  });

  it('makes a leading reply suggest a false direction', () => {
    const state = { ...given(), phase: 'talk' as const };
    const honest = talk(state, liza.id, 'open');
    const leading = talk(state, liza.id, 'leading');
    expect(honest.talks[0].suggested).toBe(liza.wish);
    expect(leading.talks[0].suggested).not.toBe(liza.wish);
    expect(talk(honest, artem.id, 'open')).toBe(honest);
  });

  it('honors capacity and preserves the assignment when a move is refused', () => {
    let state = assign(base(), timur.id, 'studio');
    state = assign(state, artem.id, 'garden');
    state = assign(state, liza.id, 'garden');
    expect(assign(state, timur.id, 'garden')).toBe(state);
    expect(state.assignments[timur.id]).toBe('studio');
  });

  it('changes the signal when Kamila interrupts Timur', () => {
    const state = { ...given(), assignments: { ...spreadAssignments(), timur: 'studio', kamila: 'studio' } };
    expect(activity(state, timur)).toMatchObject({ emote: 'stress', active: true });
  });

  it.each(['good', 'mixed', 'ranked'] as const)('can reach the %s ending', ending => {
    const state = demoEnding(base(), ending);
    expect(state.phase).toBe('epilogue');
    expect(state.ending).toBe(ending);
  });

  it('changes the ending and the teen outcomes when the director gets a ranking', () => {
    const state = { ...demoEnding(base(), 'good'), phase: 'rank' as const, ending: null };
    const ranked = chooseRanking(state, true);
    expect(ranked.ranked).toBe(true);
    expect(ranked.ending).toBe('ranked');
    expect(outcome(ranked, liza).points).toBeLessThan(outcome(chooseRanking(state, false), liza).points);
  });

  it('rewards the wish, multiple contexts, and exploring when evidence is thin', () => {
    const observed = demoEnding(base(), 'good');
    const one = { ...observed, observations: observed.observations.slice(0, 1) };
    expect(outcome(observed, liza).level).toBe('good');
    expect(outcome(one, liza).level).toBe('mixed');
    const encouragedByParents = { ...one, paths: { ...one.paths, liza: 'legal' as const } };
    expect(outcome(encouragedByParents, liza).level).toBe('poor');
    const explore = { ...one, paths: { ...one.paths, liza: 'explore' as const } };
    expect(outcome(explore, liza).level).toBe('mixed');
  });

  it('adjusts difficulty points and hints', () => {
    expect(createGame('easy').points).toBeGreaterThan(createGame('hard').points);
    expect(difficultyRules.easy.window).toBeGreaterThan(difficultyRules.hard.window);
    expect(difficultyRules.hard.hint).toBe(false);
  });

  it('takes nine slots and three talks to reach recommendations', () => {
    let state = { ...base(), assignments: spreadAssignments() };
    for (let day = 0; day < camp.days.length; day++) {
      for (let slot = 0; slot < 3; slot++) {
        state = startSlot(state);
        expect(state.phase).toBe('watch');
        state = tick(state, slotSeconds, 'studio');
        expect(state.phase).toBe('review');
        expect(state.completed).toBe(day * 3 + slot + 1);
        expect(fromSave(toSave(state))).toEqual(state);
        state = afterSlot(state);
      }
      expect(state.phase).toBe('talk');
      state = afterTalk(talk(state, liza.id, 'open'));
    }
    expect(state.phase).toBe('paths');
    for (const teen of camp.teens) state = recommend(state, teen.id, 'explore');
    expect(presentPaths(state).phase).toBe('rank');
  });

  it('round trips in-progress evidence and rejects incompatible saves', () => {
    const next = tick(observe(given(), liza.id), 4.3, 'garden');
    const save = toSave(next);
    expect(fromSave(JSON.parse(JSON.stringify(save)))).toEqual(next);
    expect(new TextEncoder().encode(JSON.stringify(save)).length).toBeLessThan(64 * 1024);
    expect(fromSave({ ...save, v: 2 })).toBeNull();
  });

  it('combines fixed picture answers, time and observations deterministically', () => {
    let state: CampState = { ...demoEnding(base(), 'mixed'), phase: 'quiz',
      watched: { nature: 35, tech: 60, people: 0, signs: 0, art: 0 },
      attention: { nature: 2, tech: 6, people: 0, signs: 0, art: 0 } };
    for (const pair of camp.pictures) state = answerPicture(state, pair[0].type);
    const result = playerRadar(state);
    expect(state.phase).toBe('result');
    expect(result.top).toEqual(['nature', 'tech']);
    expect(types.map(axis => result.values[axis])).toEqual([60, 57, 22, 43, 33]);
  });
});
