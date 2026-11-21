export type FloorPoint = { x: number; z: number }
export type RouteBounds = { x1: number; x2: number; z1: number; z2: number }

// Walking clearance comes from the same collision test the player uses.
export function createNavigation(bounds: RouteBounds, clear: (x: number, z: number) => boolean) {
  const size = .4
  const width = Math.floor((bounds.x2 - bounds.x1) / size) + 1
  const height = Math.floor((bounds.z2 - bounds.z1) / size) + 1
  const total = width * height
  const point = (index: number): FloorPoint => ({
    x: bounds.x1 + (index % width) * size,
    z: bounds.z1 + Math.floor(index / width) * size,
  })
  const open = Uint8Array.from({ length: total }, (_, index) => {
    const { x, z } = point(index)
    return Number(clear(x, z))
  })
  const nearest = ({ x, z }: FloorPoint) => {
    let best = -1
    let distance = Infinity
    for (let index = 0; index < total; index++) {
      if (!open[index]) continue
      const p = point(index)
      const next = (p.x - x) ** 2 + (p.z - z) ** 2
      if (next < distance) { best = index; distance = next }
    }
    return best
  }
  const clearLine = (a: FloorPoint, b: FloorPoint) => {
    const samples = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / (size / 3))
    for (let i = 1; i <= samples; i++) {
      const t = i / samples
      if (!clear(a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t)) return false
    }
    return true
  }

  return (start: FloorPoint, end: FloorPoint): FloorPoint[] => {
    if (clearLine(start, end)) return [start, end]
    const from = nearest(start)
    const to = nearest(end)
    if (from < 0 || to < 0) return []
    const parent = new Int32Array(total).fill(-1)
    const queue = new Int32Array(total)
    let read = 0
    let write = 1
    queue[0] = from
    parent[from] = from
    while (read < write && parent[to] === -1) {
      const index = queue[read++]
      const x = index % width
      for (const next of [x > 0 ? index - 1 : -1, x < width - 1 ? index + 1 : -1, index - width, index + width]) {
        if (!open[next] || parent[next] !== -1) continue
        parent[next] = index
        queue[write++] = next
      }
    }
    if (parent[to] === -1) return []
    const path = [end]
    for (let index = to; index !== from; index = parent[index]) path.push(point(index))
    path.push(point(from), start)
    path.reverse()
    const simplified = [start]
    let anchor = 0
    while (anchor < path.length - 1) {
      let next = path.length - 1
      while (next > anchor + 1 && !clearLine(path[anchor], path[next])) next--
      simplified.push(path[next])
      anchor = next
    }
    return simplified
  }
}
