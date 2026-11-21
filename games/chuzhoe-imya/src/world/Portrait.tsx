import { useEffect, useRef } from 'react'

const palettes: Record<string, [string, string, string, string]> = {
  oleg: ['#a17866', '#d5a183', '#45323a', '#61758b'],
  irina: ['#916a66', '#c79281', '#453441', '#437977'],
  victor: ['#a87762', '#d3a284', '#51433a', '#4e6884'],
  maria: ['#a5726c', '#ce9888', '#48313d', '#666087'],
  danya: ['#ad8173', '#d3a188', '#5f4038', '#467075'],
}

export function PersonPortrait({ person, speaking }: { person: string; speaking?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current!.getContext('2d')
    if (!ctx) return
    const [shade, skin, hair, shirt] = palettes[person] ?? palettes.oleg
    ctx.clearRect(0, 0, 160, 148)
    const poly = (color: string, ...points: [number, number][]) => {
      ctx.beginPath()
      points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }
    const teen = person === 'danya'
    const long = person === 'maria' || person === 'irina'
    const rim = person === 'victor' ? '#6e6c73' : '#302937'
    const left = teen ? 50 : 44
    poly(shirt, [10, 148], [17, 128], [41, 116], [60, 109], [96, 108], [121, 116], [144, 132], [151, 148])
    poly('#253451', [10, 148], [17, 128], [41, 116], [60, 110], [74, 148])
    poly(shade, [67, 83], [95, 83], [102, 113], [82, 126], [62, 114])
    if (long) poly(hair, [left, 56], [53, 31], [87, 22], [111, 33], [126, 56], [129, 111], [101, 116], [104, 82], [56, 81], [57, 116], [36, 106])
    poly(shade, [left + 3, 57], [59, 37], [94, 33], [113, 47], [113, 76], [101, 96], [83, 112], [66, 106], [51, 89])
    poly(skin, [64, 42], [93, 35], [111, 48], [110, 77], [94, 101], [79, 108], [66, 98], [62, 77])
    poly('#ffffff22', [84, 52], [101, 45], [108, 53], [99, 67], [86, 63])
    poly(hair, [left, 55], [left - 1, 39], [55, 29], [78, 21], [99, 24], [117, 34], [122, 49], [110, 65], [104, 51], [95, 40], [73, 50], [57, 48], [52, 67])
    poly(rim, [65, 67], [75, 65], [77, 70], [67, 72])
    poly(rim, [91, 65], [103, 63], [102, 69], [92, 70])
    poly(shade, [84, 70], [81, 84], [91, 84])

    if (person === 'maria' || person === 'victor') {
      ctx.strokeStyle = '#303344'
      ctx.lineWidth = 2.5
      ctx.strokeRect(61, 61, 19, 15)
      ctx.strokeRect(88, 59, 19, 15)
      poly('#303344', [80, 65], [88, 64], [88, 68], [80, 69])
    }
    poly('#101b2e6e', [60, 110], [83, 128], [68, 143], [52, 118])
    poly('#dde3f126', [101, 109], [84, 127], [95, 146], [110, 118])
    const mouthArea = ctx.getImageData(74, 89, 21, 11)
    let open = false
    const drawMouth = () => {
      ctx.putImageData(mouthArea, 74, 89)
      poly('#75424b', [77, 92], [92, 91], [88, open ? 98 : 95], [81, open ? 99 : 96])
      open = !open
    }
    drawMouth()
    if (speaking) {
      const interval = window.setInterval(drawMouth, 225)
      return () => window.clearInterval(interval)
    }
  }, [person, speaking])
  return <canvas ref={ref} className={'portrait' + (speaking ? ' speaking' : '')} width="160" height="148" aria-hidden="true" />
}
