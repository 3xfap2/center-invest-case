import { z } from 'zod'

const adjacent = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const
const tileAt = (map: readonly string[], x: number, z: number) => map[z]?.[x] ?? '#'

export function doorAxis(map: readonly string[], x: number, z: number): 'x' | 'z' | undefined {
  const [west, east, north, south] = adjacent.map(([dx, dz]) => tileAt(map, x + dx, z + dz))
  const walkable = (tile: string) => tile === '.' || tile === 's'
  if (west === '#' && east === '#' && walkable(north) && walkable(south)) return 'z'
  if (north === '#' && south === '#' && walkable(west) && walkable(east)) return 'x'
}

const position = z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative()])
const fireKind = z.enum(['solid', 'oil', 'electric'])
const objectiveKind = z.enum(['vent', 'gas', 'agent', 'power', 'door', 'goods'])
const propKind = z.enum(['sofa', 'shelf', 'bed', 'table', 'plant', 'stove', 'bench', 'crate'])
const callSchema = z.object({
  id: z.string(), number: z.number().int().positive(), time: z.string(), name: z.string(),
  site: z.string(), theme: z.enum(['apartment', 'kitchen', 'workshop', 'store', 'warehouse']),
  radio: z.string(), task: z.string(), hint: z.string(), after: z.string(),
  spawn: position, face: z.number(), timeLimit: z.number().min(120).max(180),
  map: z.array(z.string().regex(/^[#.Ds]+$/)).min(3),
  fires: z.array(z.object({ at: position, kind: fireKind, heat: z.number().min(.65).max(2) })).min(1),
  victims: z.array(z.object({ at: position, name: z.string() })).min(1),
  objectives: z.array(z.object({ id: z.string(), at: position, kind: objectiveKind, label: z.string(),
    seconds: z.number().positive(), required: z.boolean() })),
  props: z.array(z.object({ at: position, kind: propKind })),
}).superRefine((call, ctx) => {
  const check = (ok: unknown, message: string) => {
    if (!ok) ctx.addIssue({ code: 'custom', message })
  }
  const w = call.map[0]?.length ?? 0
  const wall = /^#+$/
  check(w >= 3 && call.map.every(row => row.length === w && row[0] === '#' && row[w - 1] === '#') &&
    wall.test(call.map[0]) && wall.test(call.map.at(-1)!), 'Карта должна быть прямоугольной и замкнутой')
  const tile = (x: number, z: number) => tileAt(call.map, x, z)
  let hasEntrance = false
  call.map.forEach((row, z) => Array.from(row).forEach((value, x) => {
    if (value !== 'D' && value !== 's') return
    const nearby = adjacent.map(([dx, dz]) => tile(x + dx, z + dz))
    if (value === 's') {
      check(!nearby.includes('.'), 'Между зданием и безопасной зоной нужна дверь: ' + [x, z].join(', '))
      return
    }
    check(doorAxis(call.map, x, z), 'У двери должны быть два встречных прохода: ' + [x, z].join(', '))
    hasEntrance ||= nearby.includes('s') && nearby.includes('.')
  }))
  check(hasEntrance, 'Нужна входная дверь из безопасной зоны')
  check(tile(...call.spawn) === 's', 'Точка старта должна быть в безопасной зоне')
  const queue = [call.spawn]
  const visited = new Set([call.spawn.join(',')])
  for (const [x, z] of queue) {
    const neighbors = adjacent.map(([dx, dz]): [number, number] => [x + dx, z + dz])
    for (const next of neighbors) {
      const key = next.join(',')
      if (tile(...next) === '#' || visited.has(key)) continue
      visited.add(key)
      queue.push(next)
    }
  }
  check(visited.size === call.map.join('').replaceAll('#', '').length, 'На карте есть проходы, отрезанные от входа')
  for (const point of [...call.fires, ...call.victims, ...call.props, ...call.objectives]) {
    check(visited.has(point.at.join(',')), 'Недоступная точка: ' + point.at.join(', '))
    check(tile(...point.at) === ('kind' in point && point.kind === 'door' ? 'D' : '.'), 'Неподходящая клетка: ' + point.at.join(', '))
  }
  check(new Set(call.objectives.map(o => o.id)).size === call.objectives.length, 'Повтор ID задачи')
})

export type Call = z.infer<typeof callSchema>
export type FireKind = z.infer<typeof fireKind>
export type ObjectiveKind = z.infer<typeof objectiveKind>
export type PropKind = z.infer<typeof propKind>
export type GridPos = z.infer<typeof position>
export const center = ([x, z]: GridPos) => ({ x: x + .5, z: z + .5 })

export const calls = Object.values(import.meta.glob('../../content/calls/*.json', { eager: true, import: 'default' }))
  .map(value => callSchema.parse(value))
  .sort((a, b) => a.number - b.number)

if (!calls.length || calls.some((call, index) => call.number !== index + 1) ||
    new Set(calls.map(call => call.id)).size !== calls.length) {
  throw new Error('У вызовов должны быть уникальные ID и последовательные номера')
}
