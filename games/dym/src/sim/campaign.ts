import { z } from 'zod'
import { calls } from './content'

export const difficultySchema = z.enum(['easy', 'normal', 'hard'])
export type Difficulty = z.infer<typeof difficultySchema>
export const difficulty = {
  easy: { name: 'Учебная', air: 146, spread: .72, hints: true },
  normal: { name: 'Штатная', air: 112, spread: 1, hints: true },
  hard: { name: 'Тревога', air: 88, spread: 1.28, hints: false },
} satisfies Record<Difficulty, object>

export const gear = {
  spray: { name: 'Распылитель', cost: 180, symbol: 'spray',
    description: 'Q · переключает узкую и широкую струю', partnerDescription: 'Сам применяет широкий факел при тушении' },
  cylinder: { name: 'Запасной баллон', cost: 310, symbol: 'air',
    description: 'R · пополняет воздух на 44 ед. один раз', partnerDescription: 'Подключает сам, когда воздух на исходе' },
  thermal: { name: 'Тепловизор', cost: 270, symbol: 'thermal',
    description: 'F · включает обзор через дым', partnerDescription: 'Сообщает о замеченных в дыму людях' },
  axe: { name: 'Инструмент взлома', cost: 140, symbol: 'axe',
    description: 'Взять в B, удерживать E у двери', partnerDescription: '4 · вскрывает дверь по команде' },
  fan: { name: 'Дымосос', cost: 200, symbol: 'fan',
    description: 'Взять в B, удерживать E у открытого окна', partnerDescription: '4 · ставит дымосос у открытого окна' },
  stretcher: { name: 'Спасательные носилки', cost: 150, symbol: 'rescue',
    description: 'Взять в B, удерживать E у пострадавшего', partnerDescription: '4 · выносит пострадавшего на носилках' },
} as const
export type Gear = keyof typeof gear
export type Equipment = { you: Gear[]; partner: Gear[] }
export const emptyEquipment = (): Equipment => ({ you: [], partner: [] })
export const gearCost = ({ you, partner }: Equipment) =>
  [...you, ...partner].reduce((sum, id) => sum + gear[id].cost, 0)

const roundSchema = z.object({
  saved: z.number().int().min(0), total: z.number().int().min(0),
  property: z.number().int().min(0).max(100), air: z.number().int().min(0).max(100),
  safety: z.number().int().min(0).max(100), support: z.number().min(0), seconds: z.number().min(0),
  status: z.enum(['complete', 'air', 'timer', 'withdraw']),
})
export type RoundResult = z.infer<typeof roundSchema>

const saveSchema = z.object({
  v: z.literal(1), nickname: z.string().trim().min(1).max(24), difficulty: difficultySchema,
  budget: z.number().int().min(0).max(1500), waited: z.boolean().nullable(), checked: z.boolean().nullable(),
  results: z.array(roundSchema).max(calls.length),
})
export type Campaign = z.infer<typeof saveSchema>
export type Ending = 'good' | 'steady' | 'backup'
export const endingNames: Record<Ending, string> = {
  good: 'Вместе до рассвета', steady: 'Город просыпается', backup: 'Подмога на рассвете',
}
export const newCampaign = (nickname: string, mode: Difficulty): Campaign => ({
  v: 1, nickname: nickname.trim().slice(0, 24) || 'Новичок', difficulty: mode,
  budget: 690, waited: null, checked: null, results: [],
})
export const toSave = (campaign: Campaign): Campaign => saveSchema.parse(campaign)
export function fromSave(data: unknown): Campaign | null {
  const result = saveSchema.safeParse(data)
  return result.success ? result.data : null
}
export const savings = (c: Campaign) => c.results.reduce((sum, r) => sum + r.saved, 0)
export const scoreRound = (r: RoundResult) => r.saved * 220 + r.property + r.safety + r.air
export const reward = (r: RoundResult) =>
  170 + r.saved * 165 + Math.round(r.property * 1.25 + r.safety + r.air * .6)
export const mvp = (r: RoundResult) => r.support >= 4 && (r.saved === 0 || r.safety >= 88) ? 'Лёша' : 'player'

export function recordRound(c: Campaign, r: RoundResult, spent: number, waited: boolean | null, checked: boolean | null): Campaign {
  if (c.results.length >= calls.length) return c
  return { ...c, results: [...c.results, r], budget: Math.min(1500, Math.max(0, c.budget - spent) + reward(r)),
    waited: waited ?? c.waited, checked: checked ?? c.checked }
}
export function getEnding(c: Campaign): Ending {
  const final = c.results.at(-1)
  if (!final || c.results.length < calls.length) return 'backup'
  const safety = c.results.reduce((sum, r) => sum + r.safety, 0) / c.results.length
  const saved = savings(c)
  if (final.saved === final.total && final.status === 'complete' && saved >= 5 && safety >= 75 && c.waited && c.checked) return 'good'
  if (final.saved >= 1 && saved >= 3 && safety >= 50) return 'steady'
  return 'backup'
}
export function endPayload(c: Campaign, ending: Ending) {
  return {
    ending, score: c.results.reduce((sum, r) => sum + scoreRound(r), 0), stars: { good: 3, steady: 2, backup: 1 }[ending],
    durationSec: Math.round(c.results.reduce((sum, r) => sum + r.seconds, 0)),
    choices: { dm_waited_for_hose: c.waited === true, dm_checked_back_room: c.checked === true, dm_people_saved: savings(c) },
  }
}
