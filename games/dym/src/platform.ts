import { difficultySchema, fromSave, toSave, type Campaign, type Difficulty } from './sim/campaign'

interface Init { nickname?: unknown; save?: unknown; difficulty?: unknown; muted?: unknown }
interface PlatformBridge {
  standalone: boolean
  onInit: ((message: Init) => void) | null
  pause?: () => void
  resume?: () => void
  mute?: (data: { muted?: boolean; value?: boolean }) => void
  ready: (gameId: string, version: string) => void
  save: (data: Campaign) => void
  flag: (key: string, value: number | boolean) => void
  progress: (step: number, percent: number) => void
  achievement: (id: string) => void
  end: (result: object) => void
  exit: () => void
}

declare global {
  interface Window { NS?: PlatformBridge }
}
const storageKey = 'dym:chapter:v1'
export const bridge = window.NS
export const standalone = bridge?.standalone ?? window === window.parent
export const debug = new URLSearchParams(window.location.search).get('debug') === '1'

export function standaloneSave() {
  try { return fromSave(JSON.parse(localStorage.getItem(storageKey) ?? 'null')) }
  catch { return null }
}

export function persist(campaign: Campaign) {
  const save = toSave(campaign)
  bridge?.save(save)
  if (standalone) {
    try { localStorage.setItem(storageKey, JSON.stringify(save)) } catch { /* Private browsing can deny storage. */ }
  }
}

export function defaults(data: Init): { nickname: string; difficulty: Difficulty; muted: boolean; saved: Campaign | null } {
  return {
    nickname: typeof data.nickname === 'string' ? data.nickname.trim().slice(0, 24) || 'Новичок' : 'Новичок',
    difficulty: difficultySchema.safeParse(data.difficulty).data ?? 'normal',
    muted: data.muted === true,
    saved: fromSave(data.save),
  }
}
