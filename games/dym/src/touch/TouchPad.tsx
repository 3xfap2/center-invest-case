import { useEffect, useRef } from 'react'
import './touch.css'

/**
 * On-screen controls for phones and tablets. The game keeps reading its usual keyboard and mouse
 * events: the pad sends the same events (W/A/S/D from the joystick, keys from the buttons, mouse
 * buttons and movement from the look area), so the game logic doesn't change.
 * Shown only on touch-first devices (coarse pointer); desktop players never see it.
 */

export const isTouchDevice = () => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches

export type PadButton = {
  id: string
  label: string
  /** KeyboardEvent.code to send, for example 'KeyE'. */
  key?: string
  /** Mouse button to press on the game canvas while held (0 = left). */
  mouse?: 0 | 2
  /** true: held while the finger is down; false: a short tap. */
  hold?: boolean
}

type Props = {
  buttons: PadButton[]
  /** The canvas that receives mouse events (look area and mouse buttons). */
  canvas?: () => HTMLElement | null
  /** Add a look area on the right half that turns a finger drag into right-button mouse drag. */
  look?: boolean
}

const keyName: Record<string, string> = { KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd', KeyE: 'e', Tab: 'Tab', Escape: 'Escape' }
const sendKey = (type: 'keydown' | 'keyup', code: string) =>
  document.dispatchEvent(new KeyboardEvent(type, { code, key: keyName[code] ?? code.replace(/^Key|^Digit/, '').toLowerCase(), bubbles: true, cancelable: true }))

const sendMouse = (target: EventTarget | null, type: 'mousedown' | 'mouseup' | 'mousemove', init: MouseEventInit) =>
  target?.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, ...init }))

const DEAD = 0.35
const LOOK_SPEED = 2.2

export function TouchPad({ buttons, canvas, look = false }: Props) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = host.current
    if (!root) return
    const down = new Set<string>()
    const setKeys = (want: Set<string>) => {
      for (const k of down) if (!want.has(k)) { sendKey('keyup', k); down.delete(k) }
      for (const k of want) if (!down.has(k)) { sendKey('keydown', k); down.add(k) }
    }

    // Joystick: the knob follows the finger inside the ring; its direction holds W/A/S/D.
    const ring = root.querySelector<HTMLElement>('.tp-stick')!
    const knob = root.querySelector<HTMLElement>('.tp-knob')!
    let stickId: number | null = null
    const moveStick = (e: PointerEvent) => {
      const r = ring.getBoundingClientRect()
      const radius = r.width / 2
      let x = (e.clientX - (r.left + radius)) / radius
      let y = (e.clientY - (r.top + radius)) / radius
      const len = Math.hypot(x, y)
      if (len > 1) { x /= len; y /= len }
      knob.style.transform = `translate(${x * radius * 0.55}px, ${y * radius * 0.55}px)`
      const want = new Set<string>()
      if (y < -DEAD) want.add('KeyW')
      if (y > DEAD) want.add('KeyS')
      if (x < -DEAD) want.add('KeyA')
      if (x > DEAD) want.add('KeyD')
      setKeys(want)
    }
    const stopStick = () => { stickId = null; knob.style.transform = ''; setKeys(new Set()) }
    const onStickDown = (e: PointerEvent) => { e.preventDefault(); stickId = e.pointerId; ring.setPointerCapture(e.pointerId); moveStick(e) }
    const onStickMove = (e: PointerEvent) => { if (e.pointerId === stickId) moveStick(e) }
    const onStickUp = (e: PointerEvent) => { if (e.pointerId === stickId) stopStick() }
    ring.addEventListener('pointerdown', onStickDown)
    ring.addEventListener('pointermove', onStickMove)
    ring.addEventListener('pointerup', onStickUp)
    ring.addEventListener('pointercancel', onStickUp)

    // Look area: a drag becomes a right-button mouse drag on the canvas, as the game expects without mouse capture.
    const area = root.querySelector<HTMLElement>('.tp-look')
    let lookId: number | null = null
    let lastX = 0
    let lastY = 0
    const onLookDown = (e: PointerEvent) => {
      e.preventDefault()
      lookId = e.pointerId
      lastX = e.clientX
      lastY = e.clientY
      area!.setPointerCapture(e.pointerId)
      sendMouse(canvas?.() ?? null, 'mousedown', { button: 2, buttons: 2, clientX: e.clientX, clientY: e.clientY })
    }
    const onLookMove = (e: PointerEvent) => {
      if (e.pointerId !== lookId) return
      const dx = (e.clientX - lastX) * LOOK_SPEED
      const dy = (e.clientY - lastY) * LOOK_SPEED
      lastX = e.clientX
      lastY = e.clientY
      sendMouse(document, 'mousemove', { movementX: dx, movementY: dy, buttons: 2, clientX: e.clientX, clientY: e.clientY })
    }
    const onLookUp = (e: PointerEvent) => {
      if (e.pointerId !== lookId) return
      lookId = null
      sendMouse(document, 'mouseup', { button: 2, buttons: 0 })
    }
    area?.addEventListener('pointerdown', onLookDown)
    area?.addEventListener('pointermove', onLookMove)
    area?.addEventListener('pointerup', onLookUp)
    area?.addEventListener('pointercancel', onLookUp)

    // Buttons: a key or a mouse button, tapped or held.
    const cleanups: (() => void)[] = []
    for (const b of buttons) {
      const el = root.querySelector<HTMLElement>(`[data-tp="${b.id}"]`)
      if (!el) continue
      let held = false
      const press = (e: PointerEvent) => {
        e.preventDefault()
        el.setPointerCapture(e.pointerId)
        el.classList.add('is-down')
        if (b.mouse !== undefined) sendMouse(canvas?.() ?? null, 'mousedown', { button: b.mouse, buttons: b.mouse === 0 ? 1 : 2 })
        if (b.key) sendKey('keydown', b.key)
        held = true
        if (!b.hold) setTimeout(() => release(), 80)
      }
      const release = () => {
        if (!held) return
        held = false
        el.classList.remove('is-down')
        if (b.mouse !== undefined) sendMouse(document, 'mouseup', { button: b.mouse, buttons: 0 })
        if (b.key) sendKey('keyup', b.key)
      }
      const up = () => { if (b.hold) release() }
      el.addEventListener('pointerdown', press)
      el.addEventListener('pointerup', up)
      el.addEventListener('pointercancel', up)
      cleanups.push(() => { release(); el.removeEventListener('pointerdown', press); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up) })
    }

    return () => {
      stopStick()
      if (lookId !== null) sendMouse(document, 'mouseup', { button: 2, buttons: 0 })
      cleanups.forEach((f) => f())
      ring.removeEventListener('pointerdown', onStickDown)
      ring.removeEventListener('pointermove', onStickMove)
      ring.removeEventListener('pointerup', onStickUp)
      ring.removeEventListener('pointercancel', onStickUp)
      area?.removeEventListener('pointerdown', onLookDown)
      area?.removeEventListener('pointermove', onLookMove)
      area?.removeEventListener('pointerup', onLookUp)
      area?.removeEventListener('pointercancel', onLookUp)
    }
  }, [buttons, canvas])

  return (
    <div className="tp" ref={host} data-testid="touch-pad">
      {look && <div className="tp-look" aria-hidden="true" />}
      <div className="tp-stick" role="application" aria-label="Джойстик: движение">
        <div className="tp-knob" />
      </div>
      <div className="tp-buttons">
        {buttons.map((b) => (
          <button key={b.id} type="button" className="tp-btn" data-tp={b.id}>
            {b.label}
          </button>
        ))}
      </div>
      <p className="tp-rotate">Поверни телефон горизонтально</p>
    </div>
  )
}
