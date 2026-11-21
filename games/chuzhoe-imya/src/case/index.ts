import { z } from 'zod'
import rawCase from '../../content/case.json'
import { continuation, finalArchiveStage } from './continuation'

const stage = z.number().int().min(0).max(11)
const id = z.string().regex(/^[a-zA-Z0-9_]+$/).max(40)
const txId = z.enum(['A', 'B', 'C', 'D'])
const decision = z.enum(['approve', 'hold', 'block'])
const route = z.enum(['family', 'accuse', 'review'])
const result = z.enum(['confirms', 'contradicts', 'none'])
const ending = z.enum(['clean', 'overblock', 'lost', 'blame'])
const difficulty = z.enum(['easy', 'normal', 'hard'])
const minutes = z.number().int().positive()
const decisionRecord = z.object({
  action: decision, reasons: z.array(id).max(2), route: route.optional(),
})

const configSchema = z.object({
  deadline: minutes, inspectionMinutes: minutes, callMinutes: minutes, wrongLinkMinutes: minutes,
  difficulty: z.record(difficulty, z.object({ minutes, hints: z.boolean() })),
  factors: z.record(id, z.tuple([z.string(), z.string()])),
  transactions: z.array(z.object({
    id: txId, letter: z.string(), time: z.string(), amount: minutes, recipient: z.string(),
    risk: z.number().int().min(0).max(100), factors: z.array(id), stage, cards: z.array(id),
  })).length(4),
  cards: z.array(z.object({
    id, stage, type: z.string(), title: z.string(), detail: z.string(), stamp: z.string(),
  })),
  links: z.array(z.object({ a: id, b: id, result, note: z.string() })),
  calls: z.array(z.object({
    id, stage, character: id, cards: z.array(id),
    press: z.array(z.object({ id, needs: z.array(id).nonempty() })),
    hard: z.boolean().optional(), optional: z.boolean().optional(),
  })),
  boardUnlock: z.array(id), hardOnly: z.array(id),
  work: z.array(z.object({ id, stage, adds: z.array(id), requires: z.array(id), answer: z.string().optional() })),
  archive: z.object({ ending: z.string(), folders: z.array(z.object({ code: z.string(), name: z.string(), year: z.string() })) }),
  email: z.object({ sender: z.string(), verified: z.string(), characters: z.array(z.string()), addedIndex: z.number().int() }),
  requirements: z.array(z.object({
    call: id.optional(), inspection: txId.optional(), attempt: z.boolean().optional(), work: id.optional(),
    decisions: z.boolean().optional(), report: z.boolean().optional(),
  })).length(12),
  rules: z.object({
    reportMinutes: minutes,
    correct: z.record(txId, z.array(decision).nonempty()),
    support: z.record(txId, z.array(z.array(id).min(1).max(2)).nonempty()),
    endings: z.record(ending, ending),
    achievements: z.record(z.enum(['clean', 'noOverblock', 'danya', 'fast', 'fullReport']), z.string().regex(/^ci_/)),
  }),
}).superRefine((data, context) => {
  const verify = (valid: boolean, message: string) => {
    if (!valid) context.addIssue({ code: 'custom', message })
  }
  const cardIds = new Set(data.cards.map(card => card.id))
  const callIds = new Set(data.calls.map(call => call.id))
  const workIds = new Set(data.work.map(task => task.id))
  verify(cardIds.size === data.cards.length && callIds.size === data.calls.length, 'Duplicate card or call')
  verify(new Set(data.transactions.map(tx => tx.id)).size === 4, 'Missing or duplicate transactions')
  const usedCards = [
    ...data.transactions.flatMap(tx => tx.cards), ...data.boardUnlock, ...data.hardOnly, ...data.work.flatMap(task => task.adds),
    ...data.calls.flatMap(call => [...call.cards, ...call.press.flatMap(option => option.needs)]),
    ...data.links.flatMap(link => [link.a, link.b]),
    ...Object.values(data.rules.support).flat(2),
  ]
  verify(usedCards.every(cardId => cardIds.has(cardId)), 'Unknown card')
  verify(data.transactions.every(tx => tx.factors.every(factor => factor in data.factors)), 'Unknown factor')
  verify(data.requirements.every((req, step) => !req.call || data.calls.some(call => call.id === req.call && call.stage === step)), 'Unknown checkpoint call')
  verify(workIds.size === data.work.length
    && data.work.every(task => task.requires.every(key => workIds.has(key)))
    && data.requirements.every((req, step) => !req.work || data.work.some(task => task.id === req.work && task.stage === step)), 'Invalid work checkpoint')
  verify(data.links.every(link => link.a !== link.b) && new Set(data.links.map(link => pair(link.a, link.b))).size === data.links.length, 'Duplicate link')
})

const saveSchema = z.object({
  v: z.literal(1), difficulty, step: stage, elapsed: z.number().int().min(0).max(240),
  durationSec: z.number().int().min(0).max(86400),
  cards: z.array(id).max(40), inspected: z.array(txId).max(4),
  calls: z.record(id, id),
  links: z.array(z.object({ a: id, b: id, result })).max(100),
  boardAttempts: z.number().int().min(0).max(255),
  decisions: z.partialRecord(txId, decisionRecord),
  submitted: z.boolean(), complete: z.boolean(),
  archiveStage: z.number().int().min(0).max(finalArchiveStage).default(0),
  layout: z.literal('floor').optional(), work: z.array(id).max(30).default([]),
})

function pair(a: string, b: string) {
  return [a, b].sort().join(':')
}

export const caseData = configSchema.parse(rawCase)
export type CaseData = z.infer<typeof configSchema>
export type CaseSave = z.infer<typeof saveSchema>
export type Difficulty = z.infer<typeof difficulty>
export type TxId = z.infer<typeof txId>
export type Decision = z.infer<typeof decision>
export type Route = z.infer<typeof route>
export type LinkResult = z.infer<typeof result>
export type Ending = z.infer<typeof ending>
export type Card = CaseData['cards'][number]
export type Transaction = CaseData['transactions'][number]

export function createCase(data: CaseData, selectedDifficulty: Difficulty, save?: unknown) {
  return new CaseStore(data, selectedDifficulty, save)
}

export class CaseStore {
  private current: CaseSave
  private linkTable: Map<string, CaseData['links'][number]>

  constructor(readonly data: CaseData, selectedDifficulty: Difficulty, save?: unknown) {
    const parsed = saveSchema.safeParse(save)
    this.current = parsed.success ? parsed.data : {
      v: 1, difficulty: selectedDifficulty, step: 0, elapsed: 0, durationSec: 0,
      cards: [], inspected: [], calls: {}, links: [], boardAttempts: 0,
      decisions: {}, submitted: false, complete: false, archiveStage: 0, layout: 'floor', work: [],
    }
    this.linkTable = new Map(data.links.map(link => [pair(link.a, link.b), link]))
    const legalCards = new Set(data.cards.map(card => card.id))
    this.current.cards = [...new Set(this.current.cards)].filter(card => legalCards.has(card))
    this.current.links = this.current.links.filter(link => legalCards.has(link.a) && legalCards.has(link.b))
    if (!this.current.layout) {
      this.current.step = this.current.complete ? 11 : this.current.submitted ? 11 : !this.current.calls.opening
        ? 0 : this.current.inspected.includes('A') ? 2 : 1
      this.current.layout = 'floor'
    }
    if (!this.archiveUnlocked) this.current.archiveStage = 0
    this.spend(0)
  }

  get state(): Readonly<CaseSave> { return this.current }
  get settings() { return this.data.difficulty[this.current.difficulty] }
  get remaining() { return this.settings.minutes - this.current.elapsed }
  get archiveUnlocked() { return this.current.complete && this.current.submitted }
  get archiveQuest() { return this.archiveUnlocked ? continuation.quests[this.current.archiveStage - 1] : undefined }
  get archiveComplete() { return this.current.archiveStage === finalArchiveStage }

  descend() {
    if (!this.archiveUnlocked || this.current.archiveStage !== 0) return false
    this.current.archiveStage = 1
    return true
  }

  resolveArchive(answer: string) {
    const quest = this.archiveQuest
    if (!quest || quest.answer !== answer) return false
    this.current.archiveStage++
    return true
  }

  get clock() { return this.data.deadline - this.remaining }
  get evidence() { return this.data.cards.filter(card => this.current.cards.includes(card.id)) }
  get transactions() {
    const letterOrder = new Map(txId.options.map((key, index) => [key, index]))
    return this.data.transactions.filter(tx => tx.stage <= this.current.step)
      .sort((a, b) => letterOrder.get(a.id)! - letterOrder.get(b.id)!)
  }
  get activeCalls() {
    return this.data.calls.filter(call =>
      call.stage === this.current.step && (!call.hard || this.current.difficulty === 'hard'))
  }
  get canAdvance() {
    if (this.current.complete) return false
    const requirement = this.data.requirements[this.current.step]
    return (!requirement.call || Boolean(this.current.calls[requirement.call]))
      && (!requirement.inspection || this.current.inspected.includes(requirement.inspection))
      && (!requirement.attempt || this.current.links.some(link => link.result !== 'none'))
      && (!requirement.work || this.current.work.includes(requirement.work))
      && (!requirement.decisions || this.hasDecisions)
      && (!requirement.report || this.current.submitted)
  }
  get hasDecisions() {
    return txId.options.every(key => Boolean(this.current.decisions[key]))
  }

  private spend(amount: number) {
    this.current.elapsed = Math.min(this.settings.minutes, this.current.elapsed + amount)
    if (this.remaining === 0) {
      this.current.step = 11
      this.current.complete = true
    }
  }

  addCard(cardId: string) {
    const card = this.data.cards.find(item => item.id === cardId)
    if (!card || card.stage > this.current.step || this.current.cards.includes(cardId)) return false
    if (this.data.hardOnly.includes(cardId) && this.current.difficulty !== 'hard') return false
    this.current.cards.push(cardId)
    return true
  }

  inspect(transactionId: TxId) {
    const transaction = this.transactions.find(item => item.id === transactionId)
    if (!transaction || this.current.complete || this.current.submitted) return []
    if (this.current.inspected.includes(transactionId)) return this.evidence.filter(card => transaction.cards.includes(card.id))
    this.current.inspected.push(transactionId)
    const added = transaction.cards.filter(card => this.addCard(card))
    this.spend(this.data.inspectionMinutes)
    return this.evidence.filter(card => added.includes(card.id) || transaction.cards.includes(card.id))
  }

  perform(action: string, answer?: string) {
    const task = this.data.work.find(item => item.id === action && item.stage === this.current.step)
    if (!task || this.current.complete || this.current.work.includes(action)) return false
    if (task.answer !== undefined && task.answer !== answer) return false
    if (!task.requires.every(key => this.current.work.includes(key))) return false
    this.current.work.push(action)
    task.adds.forEach(card => this.addCard(card))
    return true
  }

  pressOptions(characterId: string) {
    return this.activeCalls
      .filter(call => call.character === characterId && !this.current.calls[call.id])
      .flatMap(call => call.press.filter(option =>
        option.needs.every(card => this.current.cards.includes(card))).map(option => option.id))
  }

  answerCall(callId: string, option: string) {
    const call = this.activeCalls.find(item => item.id === callId)
    if (!call || this.current.complete || this.current.calls[callId] || !id.safeParse(option).success) return false
    if (option.startsWith('press_') && !this.pressOptions(call.character).includes(option)) return false
    this.current.calls[callId] = option
    call.cards.forEach(card => this.addCard(card))
    this.spend(this.data.callMinutes)
    return true
  }

  link(cardA: string, cardB: string): LinkResult {
    const canCompare = !this.current.complete && !this.current.submitted && cardA !== cardB
      && [cardA, cardB].every(card => this.current.cards.includes(card))
    if (!canCompare) return 'none'
    const relation = this.linkTable.get(pair(cardA, cardB))?.result ?? 'none'
    if (this.current.step === 7) this.current.boardAttempts = Math.min(255, this.current.boardAttempts + 1)
    if (relation === 'none') {
      this.spend(this.data.wrongLinkMinutes)
    } else if (!this.current.links.some(link => pair(link.a, link.b) === pair(cardA, cardB))) {
      if (this.current.links.length < 100) this.current.links.push({ a: cardA, b: cardB, result: relation })
    }
    return relation
  }

  linkNote(cardA: string, cardB: string) {
    return this.linkTable.get(pair(cardA, cardB))?.note ?? 'У этих двух улик нет подтверждённой связи.'
  }

  hintCards(selected?: string) {
    if (!this.settings.hints) return []
    const held = (card: string) => this.current.cards.includes(card)
    return [...this.linkTable.values()].flatMap(link => {
      if (link.result === 'none' || !held(link.a) || !held(link.b)) return []
      if (selected) return selected === link.a ? [link.b] : selected === link.b ? [link.a] : []
      return link.result === 'contradicts' ? [link.a, link.b] : []
    })
  }

  decide(key: TxId, action: Decision, reasons: string[] = [], contact?: Route) {
    if (![10, 11].includes(this.current.step) || this.current.submitted || this.current.complete) return false
    const unique = [...new Set(reasons)]
    if (unique.length > 2 || !unique.every(card => this.current.cards.includes(card))) return false
    this.current.decisions[key] = { action, reasons: unique, ...(key === 'C' && contact ? { route: contact } : {}) }
    return true
  }

  justified(key: TxId) {
    const choice = this.current.decisions[key]
    return Boolean(choice && this.data.rules.correct[key].includes(choice.action)
      && this.data.rules.support[key].some(group => group.every(card => choice.reasons.includes(card)))
      && (key !== 'C' || choice.route === 'family'))
  }

  report() {
    if (this.current.step === 11 && this.hasDecisions && !this.current.submitted && !this.current.complete) {
      this.current.submitted = true
      this.spend(this.data.rules.reportMinutes)
    }
    const choices = this.current.decisions
    const expired = this.remaining === 0
    const blame = choices.C?.route === 'accuse'
    const loss = expired || !choices.A || choices.A.action === 'approve'
    const blockedHonest = (['B', 'D'] as const).some(key => choices[key] && choices[key].action !== 'approve')
    const protectedDanya = !expired && choices.C?.action === 'block' && choices.C.route === 'family'
    const quality = txId.options.filter(key => this.justified(key)).length
    const festival = !loss && !blame && !blockedHonest && protectedDanya && quality === 4
    const flags = {
      danya_protected: protectedDanya, festival_held: festival,
      blocked_honest: blockedHonest, report_quality: quality,
    }
    const selected = blame ? 'blame' : loss ? 'lost' : festival ? 'clean' : 'overblock'
    const ids = this.data.rules.achievements
    const achievements = [
      festival && ids.clean,
      !blockedHonest && !expired && choices.B?.action === 'approve' && choices.D?.action === 'approve' && ids.noOverblock,
      protectedDanya && ids.danya,
      !expired && this.remaining >= 60 && ids.fast,
      quality === 4 && this.current.submitted && ids.fullReport,
    ].filter((item): item is string => Boolean(item))
    return {
      ending: this.data.rules.endings[selected],
      stars: festival ? 3 : !blame && !loss ? 2 : quality >= 2 ? 1 : 0,
      score: Math.min(100, quality * 15 + (festival ? 20 : 0)
        + this.current.links.filter(link => link.result === 'contradicts').length * 5),
      flags, achievements,
      choices: txId.options.flatMap(key => choices[key] ? [{ transaction: key, ...choices[key] }] : []),
    }
  }

  advance() {
    if (!this.canAdvance) return false
    if (this.current.step === 11) this.current.complete = true
    else {
      this.current.step += 1
      if (this.current.step === 7) this.data.boardUnlock.forEach(card => this.addCard(card))
    }
    return true
  }

  toSave(durationSec = this.current.durationSec): CaseSave {
    return structuredClone({ ...this.current, durationSec: Math.max(0, Math.min(86400, Math.floor(durationSec))) })
  }
}
