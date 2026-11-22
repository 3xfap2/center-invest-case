import { useEffect, useReducer, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { Game } from './game'
import { debug } from './platform'
import { FieldHUD } from './hud'
import { Briefing, Buy, Capture, Choice, Debrief, DebugMenu, Finale, Header, MainMenu, Pause } from './panels'
import './style.css'
import { TouchPad, isTouchDevice, type PadButton } from './touch/TouchPad'

// Phone controls: the joystick walks, a drag on the right half looks around, the buttons send the usual keys.
const TOUCH_BUTTONS: PadButton[] = [
  { id: 'follow', label: 'За мной', key: 'Digit1' },
  { id: 'hold', label: 'Стой', key: 'Digit2' },
  { id: 'crouch', label: 'Присесть', key: 'KeyC', hold: true },
  { id: 'pause', label: 'Пауза', key: 'Escape' },
  { id: 'act', label: 'Действие', key: 'KeyE', hold: true },
  { id: 'water', label: 'Вода', key: 'Space', hold: true },
]

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const markerHost = useRef<HTMLDivElement>(null)
  const getCanvas = useRef(() => canvas.current).current
  const state = useRef<Game | null>(null)
  const [, update] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const game = new Game(canvas.current!, markerHost.current!, update)
    state.current = game
    const escape = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && game.phase !== 'menu' && (game.phase !== 'action' || game.paused)) {
        e.preventDefault()
        game.pause()
      }
    }
    document.addEventListener('keydown', escape)
    update()
    return () => { document.removeEventListener('keydown', escape); game.destroy() }
  }, [])

  const g = state.current
  return <div className={'game-shell phase-' + (g?.phase ?? 'loading')}>
    <canvas className="scene" ref={canvas} aria-label="Трёхмерная сцена" />
    <div className="grain" aria-hidden="true" />
    <div className="world-markers" ref={markerHost} aria-hidden="true" hidden={g?.phase !== 'action' || Boolean(g.paused)} />
    {!g && <div id="loading"><b>ДЫМ</b><span>ПОЖАРНЫЙ-СПАСАТЕЛЬ</span><progress value={70} max={100} aria-label="Загрузка" /></div>}
    {g && <>
      {g.phase !== 'action' && <Header game={g} />}
      {g.phase === 'menu' && <MainMenu game={g} />}
      {g.phase === 'briefing' && <Briefing game={g} />}
      {g.phase === 'buy' && <Buy game={g} />}
      {g.phase === 'choice' && <Choice game={g} />}
      {g.phase === 'action' && <FieldHUD game={g} />}
      {g.phase === 'action' && !g.paused && g.pointer === 'locked' && isTouchDevice() && <TouchPad buttons={TOUCH_BUTTONS} canvas={getCanvas} look />}
      {g.phase === 'debrief' && <Debrief game={g} />}
      {g.phase === 'ending' && <Finale game={g} />}
      {g.paused ? <Pause game={g} /> : g.phase === 'action' && g.pointer !== 'locked' ? <Capture game={g} /> : null}
      {debug && <DebugMenu game={g} />}
    </>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
