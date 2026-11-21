import { z } from 'zod';
import raw from '../../content/camp.json';

export const types = ['nature', 'tech', 'people', 'signs', 'art'] as const;
export const emotes = ['interest', 'stress', 'bored', 'help', 'conflict'] as const;
export const questions = ['open', 'family', 'leading'] as const;
export const levels = ['easy', 'normal', 'hard'] as const;
export const endings = ['good', 'mixed', 'ranked'] as const;
export const scenes = ['plan', 'watch', 'review', 'talk', 'paths', 'rank', 'epilogue', 'quiz', 'result'] as const;
export const typeSchema = z.enum(types);
export const pathSchema = z.enum([...types, 'legal', 'explore']);
const color = z.string().regex(/^#[0-9a-f]{6}$/i);
const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const picture = z.object({ type: typeSchema, label: z.string(), image: z.string() });
const schema = z.object({
  axes: z.array(z.object({ id: typeSchema, short: z.string(), title: z.string(), color, path: z.string(), action: z.string() })).length(5),
  workshops: z.array(z.object({ id, type: typeSchema, name: z.string(), task: z.string(), program: z.array(z.string()).length(3).optional(), capacity: z.number().int().min(2).max(3),
    position: z.tuple([z.number().min(-16).max(16), z.number().min(-13).max(10)]) })).min(1),
  teens: z.array(z.object({ id, name: z.string(), age: z.number().int().min(12).max(15), color, skin: color, hair: color,
    style: z.enum(['bob', 'crop', 'bun', 'pony']), profile: z.record(typeSchema, z.number().int().min(0).max(100)), wish: typeSchema,
    pressure: pathSchema, ownLine: z.string(), parentLine: z.string(),
    endings: z.object({ good: z.string(), mixed: z.string(), poor: z.string() }),
    notes: z.partialRecord(typeSchema, z.string()) })).min(1),
  days: z.array(z.object({title: z.string(), speaker: z.string(), line: z.string(), evening: z.string()})).length(3),
  questions: z.array(z.object({ id: z.enum(questions), icon: z.string(), text: z.string() })).length(3),
  interactions: z.array(z.object({ teen: id, with: id, type: typeSchema.optional(), emote: z.enum(emotes), note: z.string() })),
  pictures: z.array(z.tuple([picture, picture])).min(6).max(8),
}).superRefine((data, ctx) => {
  for (const key of ['axes', 'teens', 'workshops', 'questions'] as const) {
    if (new Set(data[key].map(item => item.id)).size !== data[key].length) ctx.addIssue({ code: 'custom', path: [key], message: 'Duplicate id' });
  }
  const teenIds = new Set(data.teens.map(teen => teen.id));
  if (data.interactions.some(rule => !teenIds.has(rule.teen) || !teenIds.has(rule.with) || rule.teen === rule.with))
    ctx.addIssue({ code: 'custom', path: ['interactions'], message: 'Unknown participant' });
  if (data.workshops.reduce((sum, room) => sum + room.capacity, 0) < data.teens.length)
    ctx.addIssue({ code: 'custom', path: ['workshops'], message: 'Too few seats for the roster' });
});
export const camp = schema.parse(raw);
export type Axis = typeof types[number];
export type Emote = typeof emotes[number];
export type Question = typeof questions[number];
export type Difficulty = typeof levels[number];
export type Ending = typeof endings[number];
export type Phase = typeof scenes[number];
export type Path = z.infer<typeof pathSchema>;
export type Teen = typeof camp.teens[number];
export type Workshop = typeof camp.workshops[number];
export const roomById = new Map(camp.workshops.map(room => [room.id, room]));
export const teenById = new Map(camp.teens.map(teen => [teen.id, teen]));
export const axisById = Object.fromEntries(camp.axes.map(axis => [axis.id, axis])) as Record<Axis, typeof camp.axes[number]>;

