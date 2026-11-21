import { describe, expect, it } from 'vitest'
import { caseData, createCase, type Difficulty, type Ending } from '../src/case'

const startAt = (step: number, difficulty: Difficulty = 'normal', cards?: string[]) => {
  const snapshot = createCase(caseData, difficulty).toSave()
  snapshot.step = step
  snapshot.cards = cards ?? caseData.cards.map(card => card.id)
  return createCase(caseData, difficulty, snapshot)
}

function resolve(ending: Ending) {
  const store = startAt(10)
  store.decide('A', ending === 'lost' ? 'approve' : 'hold', ['email', 'victor'])
  store.decide('B', 'approve', ['old_details'])
  store.decide('C', 'block', ['danya', 'trace'], ending === 'blame' ? 'accuse' : 'family')
  store.decide('D', ending === 'overblock' ? 'block' : 'approve', ['bus_refund'])
  expect(store.advance()).toBe(true)
  const result = store.report()
  expect(store.advance()).toBe(true)
  return { store, result }
}

describe('case links', () => {
  it.each(caseData.links)('$a plus $b is $result in either order', ({ a, b, result }) => {
    expect(startAt(7).link(a, b)).toBe(result)
    expect(startAt(7).link(b, a)).toBe(result)
  })
  it('charges five minutes when linking unrelated cards and does not reward retries', () => {
    const store = startAt(7)
    expect(store.link('new_account', 'danya')).toBe('none')
    expect(store.remaining).toBe(175)
    expect(store.state.links).toHaveLength(0)
    expect(store.state.boardAttempts).toBe(1)
    expect(store.link('email', 'victor')).toBe('contradicts')
    expect(store.link('victor', 'email')).toBe('contradicts')
    expect(store.state.links).toHaveLength(1)
    expect(store.remaining).toBe(175)
  })
})

describe('chapter', () => {
  it('unlocks press choices only with contradictory evidence and charges one call', () => {
    const store = startAt(5, 'normal', [])
    expect(store.pressOptions('victor')).toEqual([])
    expect(store.answerCall('victor', 'press_contract')).toBe(false)
    store.addCard('old_details')
    expect(store.pressOptions('victor')).toContain('press_contract')
    expect(store.answerCall('victor', 'press_contract')).toBe(true)
    expect(store.answerCall('victor', 'contract')).toBe(false)
    expect(store.remaining).toBe(165)
    expect(store.evidence.map(card => card.id)).toContain('victor')
    expect(store.advance()).toBe(true)
  })

  it('chains the opening call and first inspection through checkpoints', () => {
    const store = createCase(caseData, 'normal')
    expect(store.advance()).toBe(false)
    expect(store.answerCall('opening', 'hear')).toBe(true)
    expect(store.advance()).toBe(true)
    expect(store.inspect('A')).toHaveLength(3)
    expect(store.inspect('A')).toHaveLength(3)
    expect(store.remaining).toBe(160)
    expect(store.advance()).toBe(true)
  })

  it.each(['clean', 'overblock', 'lost', 'blame'] as const)('reaches %s via its own decisions', ending => {
    const { result, store } = resolve(ending)
    expect(result.ending).toBe(ending)
    expect(store.state.complete).toBe(true)
  })

  it('flags a blocked honest bus refund even when the other three decisions are correct', () => {
    const { result } = resolve('overblock')
    expect(result.flags).toEqual({
      danya_protected: true, festival_held: false, blocked_honest: true, report_quality: 3,
    })
  })

  it('scores weak reports, limits attachments and stops the case when the deadline expires', () => {
    const store = startAt(10)
    expect(store.decide('A', 'hold', ['email', 'victor', 'oleg'])).toBe(false)
    store.decide('A', 'hold', ['bus_refund'])
    store.decide('B', 'approve', ['old_details'])
    store.decide('C', 'block', ['danya', 'trace'], 'family')
    store.decide('D', 'approve', ['bus_refund'])
    store.advance()
    expect(store.report().flags.report_quality).toBe(3)
    expect(store.justified('A')).toBe(false)

    const save = startAt(7, 'hard').toSave()
    save.elapsed = 145
    const almostLate = createCase(caseData, 'hard', save)
    almostLate.link('new_account', 'danya')
    expect(almostLate.state).toMatchObject({ step: 11, complete: true })
    expect(almostLate.report().ending).toBe('lost')
  })

  it('gives easy mode more time and hints, and hard mode the extra clue and call', () => {
    for (const [difficulty, remaining, start] of [
      ['easy', 240, 1020], ['normal', 180, 1080], ['hard', 150, 1110],
    ] as const) {
      const store = createCase(caseData, difficulty)
      expect(store.remaining).toBe(remaining)
      expect(store.clock).toBe(start)
      const board = startAt(7, difficulty, ['email', 'victor'])
      expect(board.hintCards().length > 0).toBe(difficulty === 'easy')
      expect(board.addCard('amount')).toBe(difficulty === 'hard')
      expect(board.activeCalls.map(call => call.id)).toEqual(difficulty === 'hard' ? ['hard_oleg'] : [])
    }
  })

  it('requires the print queue, matching folder and mismatched letter for physical tasks', () => {
    const printer = startAt(2, 'normal', [])
    expect(printer.perform('take_log')).toBe(false)
    expect(printer.perform('queue_print')).toBe(true)
    expect(printer.perform('take_log')).toBe(true)
    expect(printer.evidence.map(card => card.id)).toEqual(['dates'])
    const archive = startAt(4, 'normal', [])
    expect(archive.perform('take_contract', '1278')).toBe(false)
    expect(archive.perform('take_contract', '7218')).toBe(true)
    expect(archive.evidence.map(card => card.id)).toContain('old_details')
    const laptop = startAt(6, 'normal', [])
    expect(laptop.perform('mark_email', 'a')).toBe(false)
    expect(laptop.perform('mark_email', 'x')).toBe(true)
    expect(laptop.evidence.map(card => card.id)).toEqual(['email'])
  })

  it('round-trips a v1 checkpoint independently of the platform difficulty and bounds the payload', () => {
    const { store } = resolve('clean')
    const saved = store.toSave(193)
    const raw = JSON.stringify(saved)
    expect(new TextEncoder().encode(raw).byteLength).toBeLessThan(64 * 1024)
    expect(createCase(caseData, 'hard', JSON.parse(raw)).toSave()).toEqual(saved)
    expect(createCase(caseData, 'hard', { v: 9 }).state.difficulty).toBe('hard')
    saved.cards.length = 0
    expect(store.evidence.length).toBeGreaterThan(0)
  })
})
