import type { FireGrid } from './fire'
import type { Vec } from './index'

export const distance = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.z - b.z)

export function clearLine(fire: FireGrid, a: Vec, b: Vec, allowLast = false, radius = 0) {
  const steps = Math.ceil(distance(a, b) / .14)
  const end = fire.index(b.x, b.z)
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const x = a.x + (b.x - a.x) * t
    const z = a.z + (b.z - a.z) * t
    const cell = fire.index(x, z)
    if (fire.blocked(cell) && !(allowLast && cell === end)) return false
    if (radius && corners.some(([dx, dz]) => fire.blocked(fire.index(x + radius * dx, z + radius * dz)))) return false
  }
  return true
}

const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
export function move(fire: FireGrid, pos: Vec, x: number, z: number, radius: number) {
  const clear = (cx: number, cz: number) => corners.every(([dx, dz]) =>
    !fire.blocked(fire.index(cx + dx * radius, cz + dz * radius)))
  if (clear(x, pos.z)) pos.x = x
  if (clear(pos.x, z)) pos.z = z
}

export function route(fire: FireGrid, from: Vec, to: Vec) {
  const start = fire.index(from.x, from.z)
  const end = fire.index(to.x, to.z)
  if (start === end || start < 0 || end < 0) return []
  const previous = new Int16Array(fire.heat.length).fill(-1)
  const queue = [start]
  previous[start] = start
  for (const i of queue) {
    if (i === end) break
    for (const n of fire.neighbors[i]) {
      if (fire.blocked(n) || previous[n] !== -1) continue
      previous[n] = i
      queue.push(n)
    }
  }
  const path: Vec[] = []
  if (previous[end] === -1) return path
  for (let i = end; i !== start; i = previous[i]) path.push(fire.center(i))
  return path.reverse()
}
