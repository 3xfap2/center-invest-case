import { z } from 'zod'
import raw from '../../content/continuation.json'

const id = z.string().min(1)
const entry = z.object({
  id, room: id, task: id, action: id, clue: id, answer: id, wrong: id, solved: id,
  options: z.array(z.object({ id, label: id })).min(2),
}).refine(entry => new Set(entry.options.map(option => option.id)).size === entry.options.length
  && entry.options.some(option => option.id === entry.answer), 'Invalid archive choices')

export const continuation = z.object({
  title: id, intro: id, quests: z.tuple([entry, entry, entry, entry]),
}).parse(raw)
export type ArchiveQuest = typeof continuation.quests[number]
export const finalArchiveStage = continuation.quests.length + 1
