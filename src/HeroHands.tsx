import { useEffect, useRef, type RefObject } from 'react'

const SHEET = `${import.meta.env.BASE_URL}hero-hands.webp`
// Части листа [x, y, w, h] в долях. A — руки с указательным пальцем, B — раскрытые ладони.
const SRC = {
  LA: [0, 0.06, 0.47, 0.4],
  RA: [0.53, 0.06, 0.47, 0.4],
  LB: [0, 0.55, 0.47, 0.4],
  RB: [0.53, 0.55, 0.47, 0.4],
} as const
type Key = keyof typeof SRC
const LOOP = 20
const LEVELS = [0, 0.26, 0.52, 0.78, 1]
const COLORS = ['#e5507a', '#4f9dde']
const ASPECT = (0.4 * 905) / (0.47 * 1600)

const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const mixAt = (t: number, on: number, off: number, dur: number) => smooth(on, on + dur, t) * (1 - smooth(off, off + dur, t))

/// Две руки из точек, как на светодиодном табло. Тянутся друг к другу и по очереди меняют позу.
export default function HeroHands({ quietRef, reduce }: { quietRef: RefObject<HTMLElement | null>; reduce: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    const fA = document.createElement('canvas')
    const fB = document.createElement('canvas')
    const gA = fA.getContext('2d', { willReadFrequently: true })
    const gB = fB.getContext('2d', { willReadFrequently: true })
    if (!canvas || !ctx || !gA || !gB) return

    let tiles: Record<Key, HTMLCanvasElement> | null = null
    let W = 0, H = 0, DPR = 1, step = 5, rowStep = 10, cols = 1, rows = 1, R = 2
    let hw = 0, hh = 0, cy = 0
    let seeds = new Float32Array(0)
    let quiet = { x: 0, y: 0, rx: 1, ry: 1 }
    let raf = 0
    let visible = true
    const t0 = performance.now()

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      W = r.width
      H = r.height
      if (!W || !H) return
      DPR = Math.min(2, devicePixelRatio || 1)
      canvas.width = Math.round(W * DPR)
      canvas.height = Math.round(H * DPR)
      step = Math.max(5, W / 205)
      rowStep = step * 2.05
      cols = Math.ceil(W / step)
      rows = Math.ceil(H / rowStep)
      R = step * 0.46
      fA.width = fB.width = cols
      fA.height = fB.height = rows
      seeds = new Float32Array(cols * rows)
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++) seeds[j * cols + i] = 0.55 * hash(i, j) + 0.45 * hash(j * 3.1, 7.7)

      const q = quietRef.current?.getBoundingClientRect()
      if (q) quiet = { x: q.left + q.width / 2 - r.left, y: q.top + q.height / 2 - r.top, rx: q.width / 2 + step * 3, ry: q.height / 2 + rowStep }
      const portrait = H > W
      hw = W * (portrait ? 0.72 : 0.5)
      hh = hw * ASPECT
      // На узком экране руки над заголовком, на широком под кнопками, по бокам от телефона.
      cy = portrait ? Math.max(hh / 2 + 48, (quiet.y - quiet.ry + 72) / 2) : Math.min(H * 0.8, quiet.y + quiet.ry + hh * 0.45)
      if (reduce) render(0)
    }

    const drawHand = (g: CanvasRenderingContext2D, tile: HTMLCanvasElement, left: boolean, t: number) => {
      const a = (2 * Math.PI * t) / LOOP
      const ph = left ? 0 : Math.PI
      const reach = (0.035 * Math.sin(a + ph) + 0.012 * Math.sin(2 * a + 1.3 + ph)) * W
      const sc = 1 + 0.07 * Math.sin(a + 0.9 + ph)
      const rot = (left ? 1 : -1) * 0.045 * Math.sin(a + 2.1 + ph)
      const x = left ? reach - W * 0.045 : W - hw + W * 0.045 - reach
      const px = left ? 0 : W
      g.setTransform(cols / W, 0, 0, rows / H, 0, 0)
      g.translate(px, cy)
      g.rotate(rot)
      g.scale(sc, sc)
      g.translate(-px, -cy)
      g.drawImage(tile, x, cy - hh / 2, hw, hh)
    }

    function render(time: number) {
      if (!tiles || !ctx || !gA || !gB || !W) return
      const t = ((time % LOOP) + LOOP) % LOOP
      for (const g of [gA, gB]) {
        g.setTransform(1, 0, 0, 1, 0, 0)
        g.fillStyle = '#fff'
        g.fillRect(0, 0, cols, rows)
      }
      drawHand(gA, tiles.LA, true, t)
      drawHand(gA, tiles.RA, false, t)
      drawHand(gB, tiles.LB, true, t)
      drawHand(gB, tiles.RB, false, t)
      const dA = gA.getImageData(0, 0, cols, rows).data
      const dB = gB.getImageData(0, 0, cols, rows).data

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const tick = Math.floor(t * 7)
      const mL = mixAt(t, 6.2, 14.6, 1.6)
      const mR = mixAt(t, 2.4, 10.4, 1.6)
      const half = cols / 2
      const paths = [new Path2D(), new Path2D()]

      for (let j = 0; j < rows; j++) {
        const shift = hash(j, tick) > 0.965 ? Math.round((hash(tick, j) - 0.5) * 8) : 0
        const yc = (j + 0.5) * rowStep
        const dy = (yc - quiet.y) / quiet.ry
        const dy4 = dy * dy * dy * dy
        for (let i = 0; i < cols; i++) {
          const seed = seeds[j * cols + i]
          const left = i < half
          const m = left ? mL : mR
          const si = Math.min(cols - 1, Math.max(0, i - shift))
          const lum = (seed < m ? dB : dA)[(j * cols + si) * 4] / 255
          let v = Math.min(1, Math.max(0, (1 - lum - 0.16) / 0.42))
          if (v <= 0) continue
          if (m > 0.001 && m < 0.999) {
            const d = Math.abs(seed - m)
            if (d < 0.12) {
              v *= d / 0.12
              if (hash(i + tick, j) <= 0.4) v *= 0.3
            }
          }
          v *= 0.86 + 0.14 * Math.sin(t * 3.2 + seed * 40)
          v *= smooth(0.035, 0.11, Math.abs((i + 0.5) / cols - 0.5))
          const xc = (i + 0.5) * step
          const dx = (xc - quiet.x) / quiet.rx
          v *= smooth(0.85, 1.25, Math.sqrt(Math.sqrt(dx * dx * dx * dx + dy4)))

          let lvl = 0
          for (let k = LEVELS.length - 1; k > 0; k--)
            if (v >= LEVELS[k] - 0.13) {
              lvl = k
              break
            }
          if (!lvl) continue
          const rad = R * (lvl === 1 ? 0.38 : LEVELS[lvl])
          const p = paths[left ? 0 : 1]
          p.moveTo(xc + rad, yc)
          p.arc(xc, yc, rad, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = COLORS[0]
      ctx.fill(paths[0])
      ctx.fillStyle = COLORS[1]
      ctx.fill(paths[1])
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || reduce) return
      render((now - t0) / 1000)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(frame)
    }

    const img = new Image()
    img.onload = () => {
      const make = (k: Key) => {
        const [x, y, w, h] = SRC[k]
        const c = document.createElement('canvas')
        c.width = 420
        c.height = Math.round((420 * h * img.height) / (w * img.width))
        const g = c.getContext('2d')
        if (g) {
          g.imageSmoothingQuality = 'high'
          g.drawImage(img, x * img.width, y * img.height, w * img.width, h * img.height, 0, 0, c.width, c.height)
        }
        return c
      }
      tiles = { LA: make('LA'), RA: make('RA'), LB: make('LB'), RB: make('RB') }
      if (reduce) render(0)
      else start()
    }
    img.src = SHEET

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    if (quietRef.current) ro.observe(quietRef.current)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)
    resize()

    return () => {
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
      img.onload = null
    }
  }, [quietRef, reduce])

  return <canvas ref={ref} aria-hidden className="block h-full w-full" />
}
