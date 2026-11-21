import { describe, expect, it } from 'vitest';
import { parseGameMessage } from '../src/bridge/messages';

describe('bridge messages', () => {
  it('accepts every valid message from the contract', () => {
    const ok = [
      { ns: 1, type: 'ready', gameId: 'glitch', version: '0.1.0' },
      { ns: 1, type: 'save', data: { v: 1, scene: 'office', hp: 3 } },
      { ns: 1, type: 'flag', key: 'ci_trusted_danya', value: true },
      { ns: 1, type: 'progress', step: 'beat-3', percent: 25 },
      { ns: 1, type: 'achievement', id: 'gl_first_bug' },
      { ns: 1, type: 'end', ending: 'good', stars: 3, score: 900, durationSec: 1200, choices: ['a', { id: 2 }] },
      { ns: 1, type: 'exit' },
    ];
    for (const m of ok) expect(parseGameMessage(m), JSON.stringify(m)).not.toBeNull();
  });

  it.each([
    ['not an object', 'hello'],
    ['wrong ns', { ns: 2, type: 'exit' }],
    ['unknown type', { ns: 1, type: 'hack' }],
    ['save without v: 1', { ns: 1, type: 'save', data: { scene: 'x' } }],
    ['save over 64 KB', { ns: 1, type: 'save', data: { v: 1, junk: 'x'.repeat(66_000) } }],
    ['save that is an array', { ns: 1, type: 'save', data: [1] }],
    ['empty flag key', { ns: 1, type: 'flag', key: '', value: 1 }],
    ['object flag value', { ns: 1, type: 'flag', key: 'k', value: { a: 1 } }],
    ['percent over 100', { ns: 1, type: 'progress', step: 1, percent: 140 }],
    ['achievement with spaces', { ns: 1, type: 'achievement', id: 'gl first' }],
    ['4 stars', { ns: 1, type: 'end', ending: 'good', stars: 4, score: 1, durationSec: 60, choices: [] }],
    ['NaN score', { ns: 1, type: 'end', ending: 'good', stars: 1, score: Number.NaN, durationSec: 60, choices: [] }],
    ['end without ending', { ns: 1, type: 'end', stars: 1, score: 1, durationSec: 60, choices: [] }],
  ])('rejects %s', (_, m) => expect(parseGameMessage(m)).toBeNull());
});
