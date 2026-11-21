import { describe, expect, it } from 'vitest';
import { parseRoute } from '../src/router';

describe('routes', () => {
  it.each([
    ['/', '', { name: 'landing' }],
    ['/start', '?game=glitch', { name: 'start', game: 'glitch' }],
    ['/start', '', { name: 'start', game: null }],
    ['/games/', '', { name: 'games' }],
    ['/play/chuzhoe-imya', '', { name: 'play', id: 'chuzhoe-imya' }],
    ['/results/mock', '', { name: 'results', id: 'mock' }],
    ['/play', '', { name: 'notFound' }],
    ['/admin', '', { name: 'notFound' }],
  ])('%s%s', (p, q, r) => expect(parseRoute(p, q)).toEqual(r));
});
