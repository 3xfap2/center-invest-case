import { expect, test } from 'vitest'
import { caseData, createCase } from '../src/case'
import { continuation } from '../src/case/continuation'
import { createNavigation } from '../src/world/navigation'

test('the elevator is locked until the final report, with ordered archive tasks and resumable saves', () => {
  const original = createCase(caseData, 'normal')
  expect(original.descend()).toBe(false)
  const snapshot = original.toSave()
  const finishedWithoutReport = createCase(caseData, 'normal', { ...snapshot, complete: true, step: 11 })
  expect(finishedWithoutReport.descend()).toBe(false)
  const finished = createCase(caseData, 'normal', { ...snapshot, submitted: true, complete: true, step: 11 })
  expect(finished.archiveUnlocked).toBe(true)
  expect(finished.descend()).toBe(true)
  expect(finished.descend()).toBe(false)
  expect(finished.resolveArchive('contract_number')).toBe(false)
  expect(finished.resolveArchive('014')).toBe(true)
  const resumed = createCase(caseData, 'normal', finished.toSave())
  expect(resumed.archiveQuest?.id).toBe('voice')
  for (const task of continuation.quests.slice(1)) expect(resumed.resolveArchive(task.answer)).toBe(true)
  expect(resumed.archiveComplete).toBe(true)
  expect(resumed.resolveArchive('evidence')).toBe(false)
  expect(resumed.state.complete).toBe(true)
})

test('an unsuccessful connection cannot complete the board quest', () => {
  const game = createCase(caseData, 'normal')
  const board = createCase(caseData, 'normal', { ...game.toSave(), step: 7, cards: ['email', 'victor', 'quote'] })
  expect(board.perform('pin_cards')).toBe(true)
  expect(board.link('email', 'quote')).toBe('none')
  expect(board.canAdvance).toBe(false)
  expect(board.link('email', 'victor')).toBe('contradicts')
  expect(board.canAdvance).toBe(true)
})

test('walking directions go through a gap instead of pointing through a wall', () => {
  const through = createNavigation({ x1: 0, x2: 8, z1: 0, z2: 8 }, (x, z) => Math.abs(x - 4) > .45 || z > 5)
  const route = through({ x: 2, z: 2 }, { x: 6, z: 2 })
  expect(route.length).toBeGreaterThan(2)
  expect(route.some(point => point.z > 5)).toBe(true)
  const blocked = createNavigation({ x1: 0, x2: 8, z1: 0, z2: 8 }, x => Math.abs(x - 4) > .45)
  expect(blocked({ x: 2, z: 2 }, { x: 6, z: 2 })).toEqual([])
})
