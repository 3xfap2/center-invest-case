import { z } from 'zod';
import { camp, types } from './content';
import { axisById, endings, levels, pathSchema, questions, roomById, scenes, teenById, typeSchema } from './content';
import type { Axis, Difficulty, Emote, Path, Question, Teen } from './content';

export const slotsPerDay = 3;
export const totalSlots = camp.days.length * slotsPerDay;
export const slotSeconds = 66;
export const difficultyRules = {
  easy: { points: 9, mixed: 0.04, hint: true, window: 10 },
  normal: { points: 6, mixed: 0.17, hint: true, window: 9 },
  hard: { points: 4, mixed: 0.36, hint: false, window: 7 },
};
export const labels: Record<Emote, string> = {
  interest: 'Интерес', stress: 'Напряжение', bored: 'Скука', help: 'Помощь', conflict: 'Конфликт',
};
export const symbols: Record<Emote, string> = {
  interest: '✦', stress: '💧', bored: 'zZ', help: '♥', conflict: 'ϟ',
};

const count = z.number().nonnegative().finite();
const scores = () => Object.fromEntries(types.map(axis => [axis, 0])) as Record<Axis, number>;
const notes = z.object({ teen: z.string(), axis: typeSchema, value: z.number().int().min(0).max(100), slot: z.number().int().min(0).max(totalSlots - 1), text: z.string() });
const exchange = z.object({ teen: z.string(), day: z.number().int().min(0).max(camp.days.length - 1), question: z.enum(questions), text: z.string(), suggested: pathSchema.nullable() });
const saveSchema = z.object({
  v: z.literal(1), seed: z.number().int().nonnegative(), difficulty: z.enum(levels), day: z.number().int().min(0).max(camp.days.length - 1),
  slot: z.number().int().min(0).max(slotsPerDay - 1), completed: z.number().int().min(0).max(totalSlots),
  phase: z.enum(scenes), assignments: z.record(z.string(), z.string()), points: count, elapsed: count.max(slotSeconds), durationSec: count,
  observations: z.array(notes), talks: z.array(exchange), paths: z.record(z.string(), pathSchema),
  ranked: z.boolean().nullable(), ending: z.enum(endings).nullable(),
  watched: z.record(typeSchema, count), attention: z.record(typeSchema, count),
  answers: z.array(typeSchema).max(camp.pictures.length), earned: z.array(z.string()),
});
export type CampState = z.infer<typeof saveSchema>;
type Observation = z.infer<typeof notes>;

export function createGame(difficulty: Difficulty = 'normal', seed = 104729): CampState {
  return {
    v: 1, seed, difficulty, day: 0, slot: 0, completed: 0, phase: 'plan', assignments: {},
    points: difficultyRules[difficulty].points, elapsed: 0, durationSec: 0, observations: [], talks: [],
    paths: {}, ranked: null, ending: null, watched: scores(), attention: scores(), answers: [], earned: [],
  };
}

export function toSave(state: CampState) {
  return structuredClone(state);
}

export function fromSave(input: unknown): CampState | null {
  const result = saveSchema.safeParse(input);
  if (!result.success) return null;
  const state = result.data;
  for (const [teen, room] of Object.entries(state.assignments)) {
    if (!teenById.has(teen) || !roomById.has(room)) delete state.assignments[teen];
  }
  for (const room of camp.workshops) {
    const occupants = Object.keys(state.assignments).filter(id => state.assignments[id] === room.id);
    for (const id of occupants.slice(room.capacity)) delete state.assignments[id];
  }
  state.observations = state.observations.filter(note => teenById.has(note.teen));
  state.talks = state.talks.filter(talk => teenById.has(talk.teen));
  state.answers = state.answers.filter((type, index) => camp.pictures[index].some(choice => choice.type === type));
  if (state.phase === 'watch' && !isReady(state)) return { ...state, phase: 'plan', elapsed: 0 };
  if (['epilogue', 'quiz', 'result'].includes(state.phase) && state.ending === null) return null;
  return state;
}

export const currentSlot = (state: CampState) => state.day * slotsPerDay + state.slot;
export const occupants = (state: CampState, room: string) => camp.teens.filter(teen => state.assignments[teen.id] === room);
export const isReady = (state: CampState) => camp.teens.every(teen => Boolean(state.assignments[teen.id]));

export function assign(state: CampState, teen: string, room: string) {
  const workshop = roomById.get(room);
  if (state.phase !== 'plan' || !workshop || !teenById.has(teen) || state.assignments[teen] === room) return state;
  if (occupants(state, room).length >= workshop.capacity) return state;
  return { ...state, assignments: { ...state.assignments, [teen]: room } };
}

export function startSlot(state: CampState): CampState {
  return state.phase === 'plan' && isReady(state) ? { ...state, phase: 'watch', elapsed: 0 } : state;
}

export function tick(state: CampState, seconds: number, viewing: string | null): CampState {
  if (state.phase !== 'watch' || seconds <= 0) return state;
  const added = Math.min(seconds, slotSeconds - state.elapsed);
  const elapsed = state.elapsed + added;
  const room = viewing ? roomById.get(viewing) : undefined;
  const watched = room ? { ...state.watched, [room.type]: state.watched[room.type] + added } : state.watched;
  if (elapsed < slotSeconds) return { ...state, elapsed, watched, durationSec: state.durationSec + added };
  return { ...state, elapsed: slotSeconds, watched, durationSec: state.durationSec + added, completed: currentSlot(state) + 1, phase: 'review' };
}

export function afterSlot(state: CampState): CampState {
  if (state.phase !== 'review') return state;
  if (state.slot === slotsPerDay - 1) return { ...state, phase: 'talk' };
  return { ...state, slot: state.slot + 1, elapsed: 0, phase: 'plan' };
}

function seeded(seed: number, key: string) {
  let hash = seed ^ 2166136261;
  for (const character of key) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x45d9f3b);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296;
}

export function activity(state: CampState, teen: Teen) {
  const room = roomById.get(state.assignments[teen.id]);
  if (state.phase !== 'watch' || !room) return null;
  const offset = Math.floor(seeded(state.seed, teen.id) * 3);
  const beat = Math.floor((state.elapsed + offset) / 11);
  const local = state.elapsed + offset - beat * 11;
  const roll = seeded(state.seed, [currentSlot(state), teen.id, room.id, beat].join(':'));
  const interaction = camp.interactions.find(rule => rule.teen === teen.id && state.assignments[rule.with] === room.id && (!rule.type || rule.type === room.type));
  const natural = teen.profile[room.type];
  let emote: Emote = natural >= 72 ? 'interest' : natural >= 54 ? 'help' : natural >= 41 ? 'stress' : 'bored';
  if (roll < difficultyRules[state.difficulty].mixed) emote = natural >= 62 ? 'stress' : 'interest';
  if (interaction && beat % 3 !== 2) emote = interaction.emote;
  const generic = {
    interest: 'Увлёкся заданием и вернулся к нему без напоминания.',
    help: 'Заметил, кому нужна помощь, и показал следующий шаг.',
    bored: 'Отвлёкся и оставил задание на краю стола.',
    stress: 'Замедлился, когда задание усложнилось.',
    conflict: 'В разговоре стало трудно услышать другого.',
  };
  return {
    emote, active: local < difficultyRules[state.difficulty].window,
    note: (interaction && beat % 3 !== 2 ? interaction.note : undefined) ?? teen.notes[room.type] ?? generic[emote],
    type: room.type,
  };
}

function earn(state: CampState, id: string): CampState {
  return state.earned.includes(id) ? state : { ...state, earned: [...state.earned, id] };
}

export function observe(state: CampState, id: string) {
  const teen = teenById.get(id);
  const event = teen ? activity(state, teen) : null;
  const slot = currentSlot(state);
  if (!teen || !event || !event.active || state.points < 1 || state.observations.some(note => note.teen === id && note.slot === slot))
    return state;
  const jitter = state.difficulty === 'hard' ? Math.round((seeded(state.seed, [id, slot].join('/')) - 0.5) * 12) : 0;
  const value = Math.max(0, Math.min(100, teen.profile[event.type] + jitter));
  const observation: Observation = { teen: id, axis: event.type, value, slot, text: event.note };
  return earn({ ...state, points: state.points - 1, observations: [...state.observations, observation],
    attention: { ...state.attention, [event.type]: state.attention[event.type] + 1 } }, 'km_first_look');
}

export function profile(state: CampState, teen: Teen, revealed = false) {
  return types.map(axis => {
    const observations = state.observations.filter(note => note.teen === teen.id && note.axis === axis);
    if (revealed) return teen.profile[axis];
    return observations.length ? Math.round(observations.reduce((sum, note) => sum + note.value, 0) / observations.length) : null;
  });
}

export function leadingSuggestion(state: CampState, teen: Teen) {
  const workshopType = roomById.get(state.assignments[teen.id])?.type;
  return workshopType && workshopType !== teen.wish ? workshopType : types.find(axis => axis !== teen.wish)!;
}

export function talk(state: CampState, id: string, question: Question) {
  const teen = teenById.get(id);
  if (!teen || state.phase !== 'talk' || state.talks.some(item => item.day === state.day)) return state;
  const leading = leadingSuggestion(state, teen);
  const text = { open: teen.ownLine, family: teen.parentLine, leading: 'Наверное… Если вы так думаете, то да.' }[question];
  const suggested = { open: teen.wish, family: teen.pressure, leading }[question];
  const updated = { ...state, talks: [...state.talks, { teen: id, day: state.day, question, text, suggested }] };
  return question === 'open' ? earn(updated, 'km_open_question') : updated;
}

export function afterTalk(state: CampState): CampState {
  if (state.phase !== 'talk' || !state.talks.some(item => item.day === state.day)) return state;
  if (state.day === camp.days.length - 1) return { ...state, phase: 'paths' };
  return { ...state, day: state.day + 1, slot: 0, elapsed: 0, points: difficultyRules[state.difficulty].points, phase: 'plan' };
}

export function recommend(state: CampState, teen: string, path: Path): CampState {
  if (state.phase !== 'paths' || !teenById.has(teen)) return state;
  return { ...state, paths: { ...state.paths, [teen]: path } };
}

export const pathName = (path: Path) => path === 'legal' ? 'Право' : path === 'explore' ? 'Ещё две пробы' : axisById[path].path;
export const readyPaths = (state: CampState) => camp.teens.every(teen => Boolean(state.paths[teen.id]));
export function presentPaths(state: CampState): CampState {
  return state.phase === 'paths' && readyPaths(state) ? { ...state, phase: 'rank' } : state;
}

export function outcome(state: CampState, teen: Teen) {
  const path = state.paths[teen.id];
  const evidence = new Set(state.observations.filter(note => note.teen === teen.id).map(note => note.axis)).size;
  if (!path) return { level: 'poor' as const, points: 0 };
  if (path === 'explore') return { level: 'mixed' as const, points: 48 };
  const fit = path === 'legal' ? 22 : teen.profile[path];
  const respectsWish = path === teen.wish;
  const points = Math.max(0, Math.round(fit * 0.43 + (respectsWish ? 31 : 0) + Math.min(evidence, 2) * 13 -
    (path === teen.pressure && !respectsWish ? 15 : 0) - (state.ranked ? 15 : 0)));
  const level: 'good' | 'mixed' | 'poor' = points >= 90 ? 'good' : points >= 43 ? 'mixed' : 'poor';
  return { level, points };
}

export function chooseRanking(state: CampState, ranked: boolean): CampState {
  if (state.phase !== 'rank' || !readyPaths(state)) return state;
  const next = { ...state, ranked, phase: 'epilogue' as const };
  const strong = camp.teens.filter(teen => outcome(next, teen).level === 'good').length;
  next.ending = ranked ? 'ranked' : strong >= Math.ceil(camp.teens.length * 0.6) ? 'good' : 'mixed';
  return next.ending === 'good' ? earn(next, 'km_own_paths') : next;
}

export function answerPicture(state: CampState, axis: Axis): CampState {
  if (state.phase !== 'quiz' || !camp.pictures[state.answers.length]?.some(choice => choice.type === axis)) return state;
  const answers = [...state.answers, axis];
  return answers.length === camp.pictures.length
    ? earn({ ...state, answers, phase: 'result' }, 'km_self_radar')
    : { ...state, answers };
}

export function playerRadar(state: CampState) {
  const values = scores();
  const pictures = scores();
  for (const axis of state.answers) pictures[axis] += 1;
  const opportunity = (axis: Axis) => camp.pictures.filter(pair => pair.some(choice => choice.type === axis)).length;
  const peakWatch = Math.max(1, ...Object.values(state.watched));
  const peakAttention = Math.max(1, ...Object.values(state.attention));
  for (const axis of types) {
    values[axis] = Math.round(65 * pictures[axis] / Math.max(1, opportunity(axis)) +
      20 * state.watched[axis] / peakWatch + 15 * state.attention[axis] / peakAttention);
  }
  const ordered = [...types].sort((a, b) => values[b] - values[a] || pictures[b] - pictures[a]);
  return { values, top: [ordered[0], ordered[1]] as const };
}

export function spreadAssignments(index = 0) {
  const spaces = camp.workshops.flatMap(room => Array.from({ length: room.capacity }, (_, seat) => ({ id: room.id, seat })));
  spaces.sort((a, b) => a.seat - b.seat);
  return Object.fromEntries(camp.teens.map((teen, seat) => [teen.id, spaces[(seat + index) % spaces.length].id]));
}

export function demoEnding(state: CampState, ending: 'good' | 'mixed' | 'ranked') {
  const demo: CampState = { ...createGame(state.difficulty, state.seed), completed: totalSlots, day: 2, slot: 2, phase: 'rank' };
  for (const teen of camp.teens) {
    demo.paths[teen.id] = ending === 'mixed' ? 'explore' : teen.wish;
    if (ending === 'good') {
      const other = types.find(axis => axis !== teen.wish)!;
      for (const [slot, axis] of [teen.wish, other].entries()) {
        demo.observations.push({ teen: teen.id, axis, slot, value: teen.profile[axis], text: teen.ownLine });
      }
    }
  }
  return chooseRanking(demo, ending === 'ranked');
}


