import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, AudioLines, Check, CirclePause, Clock3, FileCheck2, Flag, LayoutGrid, LogOut, Navigation2, Phone, Play, ShieldCheck, TerminalSquare, X } from 'lucide-react'
import metadata from '../game.json'
import extra from '../content/dialogue/voice-extra.json'
import { caseData, createCase, type CaseSave, type CaseStore, type Difficulty, type Ending } from './case'
import { continuation } from './case/continuation'
import { Office, type OfficeHandle, type RouteCue } from './world/Office'
import type { Carry, Place } from './world/floor'
import { Calls, DebugPanel, Decisions, Dialog, EndingScreen, Report, Terminal, beats, clockText, relations } from './world/Panels'
import { Archive, Email } from './world/PhysicalTools'
import { ArchiveChallenge, ArchiveResult } from './world/ArchiveContinuation'
import { OfficeSound, type Sound } from './world/sound'
import './world/styles.css'
import './world/fps.css'
import { TouchPad, isTouchDevice, type PadButton } from './touch/TouchPad'

// Phone controls: the joystick walks; dragging on the 3D view looks around (the game's own no-capture mode).
const TOUCH_BUTTONS: PadButton[] = [
  { id: 'tasks', label: 'Задачи', key: 'Tab' },
  { id: 'pause', label: 'Пауза', key: 'Escape' },
  { id: 'act', label: 'Действие', key: 'KeyE' },
]

type SiteInit = { nickname?: string; difficulty?: Difficulty; save?: unknown; muted?: boolean }
type Bridge = {
  standalone: boolean
  onInit: (data: SiteInit) => void
  pause: () => void
  resume: () => void
  mute: (data: { muted: boolean }) => void
  ready: (gameId: string, version: string) => void
  save: (data: CaseSave) => void
  progress: (step: number, percent: number) => void
  flag: (key: string, value: boolean | number) => void
  achievement: (id: string) => void
  end: (result: { ending: string; stars: number; score: number; durationSec: number; choices: unknown[] }) => void
  exit: () => void
}
const ns = (window as Window & { NS?: Bridge }).NS
const debug = new URLSearchParams(location.search).get('debug') === '1'
const title = 'Три часа до оплаты'
const labels: Record<Difficulty, string> = { easy: 'Лёгкий', normal: 'Обычный', hard: 'Сложный' }
type Panel = 'phone' | 'terminal' | 'manager' | 'archive' | 'meeting' | 'email' | 'board' | 'danya' | 'decisions' | 'report' | 'ending' | 'debug' | 'tasks' | 'difficulty' | 'lift' | 'archive-quest' | 'archive-result'
type Rect = { left: number; top: number; width: number; height: number }
const physicalFocus: Partial<Record<Panel, Place | 'report'>> = {
  terminal: 'terminal', phone: 'phone', manager: 'maria', meeting: 'meeting',
  email: 'laptop', board: 'board', danya: 'danya', decisions: 'terminal', report: 'report',
}
const callAnswers: Record<string, string> = { opening: 'hear', maria: 'separate', victor: 'contract', danya: 'parent' }

const saveKey = 'chuzhoe-imya:save:v1'
const boardPair = ['email', 'victor']
const rooms: Partial<Record<Place, string>> = {
  phone: 'Рабочий стол', terminal: 'Рабочий стол', printer: 'Принтер', archive: 'Архив',
  meeting: 'Переговорная', maria: 'Кабинет Марии', laptop: 'Ноутбук Ирины',
  danya: 'Ресепшен', board: 'Доска улик', lift: 'Лифт у ресепшена',
}

function localSave() {
  try { return JSON.parse(localStorage.getItem(saveKey) ?? 'null') as unknown }
  catch { return null }
}

function App() {
  const [store, setStore] = useState<CaseStore>()
  const [nickname, setNickname] = useState('')
  const [started, setStarted] = useState(false)
  const [panel, setPanel] = useState<Panel | null>(null)
  const [paused, setPaused] = useState(false)
  const [sitePaused, setSitePaused] = useState(false)
  const [tabHidden, setTabHidden] = useState(document.hidden)
  const [muted, setMuted] = useState(false)
  const [exited, setExited] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [locked, setLocked] = useState(false)
  const [aim, setAim] = useState<{ id: Place; label: string } | null>(null)
  const [marker, setMarker] = useState<RouteCue | null>(null)
  const [boardHelp, setBoardHelp] = useState(false)
  const [lift, setLift] = useState<'moving' | 'arrived' | null>(null)
  const [screen, setScreen] = useState<Rect | null>(null)
  const [carry, setCarry] = useState<Carry>(null)
  const [pinned, setPinned] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string>()
  const [hoverCard, setHoverCard] = useState<string>()
  const [cue, setCue] = useState('')
  const [, redraw] = useState(0)
  const [sound] = useState(() => new OfficeSound())
  const office = useRef<OfficeHandle>(null)
  const duration = useRef(0)
  const activeSince = useRef<number | null>(null)
  const endSent = useRef(false)
  const cueTimer = useRef<number | undefined>(undefined)
  const liftTimer = useRef<number | undefined>(undefined)
  const standalone = ns?.standalone ?? true
  const inactive = paused || sitePaused || tabHidden || exited
  const archiveOpen = store?.archiveUnlocked ?? false
  const below = (store?.state.archiveStage ?? 0) > 0
  const archiveQuest = store?.archiveQuest
  const canWalk = !store?.state.complete || archiveOpen
  const active = Boolean(started && !inactive && !panel && !lift && canWalk)
  const beat = beats[store?.state.step ?? 0]
  const step = store?.state.step ?? 0
  const printing = Boolean(store?.state.work.includes('queue_print') && !store.state.work.includes('take_log'))
  const ringing = Boolean(started && step === 0 && !panel && !store?.canAdvance)
  const place = (archiveOpen
    ? below ? archiveQuest?.id ?? 'handoff' : 'lift'
    : step === 2 && !printing && !store?.canAdvance ? 'terminal' : beat.place) as Place
  const task = archiveOpen
    ? below ? archiveQuest?.task ?? 'Дело передано следующей смене' : 'Дойди до лифта и спустись в архив'
    : step === 2 ? printing ? 'Забери журнал у принтера' : 'Отправь журнал на печать' : beat.task
  const targetRoom = archiveQuest?.room ?? rooms[place] ?? 'Стол дежурной смены'
  const focus = panel ? physicalFocus[panel] ?? null : null

  const durationSec = () => Math.floor(duration.current + (activeSince.current === null ? 0 : (performance.now() - activeSince.current) / 1000))
  const saveCheckpoint = (caseStore: CaseStore) => {
    const snapshot = caseStore.toSave(durationSec())
    ns?.save(snapshot)
    if (standalone && !debug) {
      try { localStorage.setItem(saveKey, JSON.stringify(snapshot)) } catch { /* Browser storage is optional. */ }
    }
  }
  const sync = (caseStore: CaseStore, save: boolean) => {
    const step = caseStore.state.step + 1
    ns?.progress(step, caseStore.state.complete ? 100 : Math.round((step - 1) * 100 / beats.length))
    if (save) saveCheckpoint(caseStore)
  }

  useEffect(() => {
    const begin = (data: SiteInit) => {
      const next = createCase(caseData, data.difficulty === 'easy' || data.difficulty === 'hard' ? data.difficulty : 'normal', data.save ?? (standalone && !debug ? localSave() : undefined))
      duration.current = next.state.durationSec
      activeSince.current = null
      endSent.current = next.state.complete
      setNickname(typeof data.nickname === 'string' ? data.nickname.trim().slice(0, 24) : '')
      setMuted(Boolean(data.muted))
      setStore(next)
      setPinned(next.state.work.includes('pin_cards') || next.state.links.length > 0)
      setPanel(next.archiveComplete ? 'archive-result' : next.state.complete && !next.state.archiveStage ? 'ending' : null)
      sync(next, false)
    }
    if (ns) {
      ns.onInit = begin
      ns.pause = () => { office.current?.release(); setSitePaused(true) }
      ns.resume = () => setSitePaused(false)
      ns.mute = data => setMuted(Boolean(data.muted))
      ns.ready(metadata.id, metadata.version)
    } else begin({ nickname: 'Тест', difficulty: 'normal' })
    const visibility = () => {
      if (document.hidden) {
        office.current?.release()
        if (activeSince.current !== null) setPaused(true)
      }
      setTabHidden(document.hidden)
    }
    document.addEventListener('visibilitychange', visibility)
    return () => document.removeEventListener('visibilitychange', visibility)
  }, [])

  useEffect(() => {
    sound.setState(started && !muted && !inactive && canWalk, ringing, below)
  }, [sound, muted, inactive, started, ringing, canWalk, below])
  useEffect(() => () => {
    sound.dispose()
    window.clearTimeout(cueTimer.current)
    window.clearTimeout(liftTimer.current)
  }, [sound])
  useEffect(() => {
    if (!store || !started || store.state.complete || inactive) return
    const startedAt = performance.now()
    activeSince.current = startedAt
    return () => {
      if (activeSince.current === startedAt) {
        duration.current += (performance.now() - startedAt) / 1000
        activeSince.current = null
      }
    }
  }, [store, started, inactive, store?.state.complete])

  const play = (kind: Sound) => sound.play(kind)
  const announce = (message: string) => {
    window.clearTimeout(cueTimer.current)
    setCue(message)
    cueTimer.current = window.setTimeout(() => setCue(''), 3800)
  }
  const start = () => {
    sound.setState(!muted && !inactive, step === 0, below)
    sound.unlock()
    if (step === 0) play('ring')
    setStarted(true)
    setCarry(null)
    setPanel(null)
    office.current?.capture()
  }
  const open = (next: Panel) => {
    sound.stopVoice()
    office.current?.release()
    if (next === 'board') {
      setCue('')
      setBoardHelp(false)
    }
    setPanel(next)
  }
  const returnToFloor = () => {
    setPanel(null)
    setSelectedCard(undefined)
    setHoverCard(undefined)
    setCarry(null)
    if (started && !inactive && canWalk) office.current?.capture()
  }
  const continueToLift = () => {
    setStarted(true)
    setPanel(null)
    setCarry(null)
    office.current?.capture()
  }
  const rideLift = () => {
    if (!store || !archiveOpen || below || lift) return
    office.current?.release()
    play('lift-move')
    setLift('moving')
    setPanel(null)
    liftTimer.current = window.setTimeout(() => {
      if (!store.descend()) { setLift(null); return }
      saveCheckpoint(store)
      play('lift-arrive')
      setLift('arrived')
      redraw(value => value + 1)
    }, 1300)
  }
  const solveArchive = (answer: string) => {
    const quest = store?.archiveQuest
    if (!store || !quest || !store.resolveArchive(answer)) return false
    saveCheckpoint(store)
    play(store.archiveComplete ? 'complete' : 'card')
    if (store.archiveComplete) {
      ns?.flag('archive_completed', true)
      ns?.achievement('ci_ch2_archive_complete')
      open('archive-result')
    } else {
      announce(quest.solved)
      returnToFloor()
    }
    redraw(value => value + 1)
    return true
  }
  const finish = (caseStore: CaseStore) => {
    office.current?.release()
    setPanel('ending')
    setCarry(null)
    if (endSent.current) return
    endSent.current = true
    const { flags, achievements, ending, stars, score, choices } = caseStore.report()
    Object.entries(flags).forEach(([key, value]) => ns?.flag(key, value))
    achievements.forEach(id => ns?.achievement(id))
    ns?.end({ ending, stars, score, durationSec: durationSec(), choices })
  }
  const refresh = () => {
    if (store?.state.complete) {
      sync(store, true)
      finish(store)
    }
    redraw(value => value + 1)
  }
  const advance = (held: Carry = null) => {
    if (!store?.advance()) return
    play('card')
    sync(store, true)
    if (store.state.complete) finish(store)
    else { returnToFloor(); setCarry(held) }
    redraw(value => value + 1)
  }

  const interact = (id: Place) => {
    if (!store || !active) return
    if (archiveOpen) {
      if (id !== place) return
      play('tap')
      open(id === 'lift' ? 'lift' : store.archiveComplete ? 'archive-result' : 'archive-quest')
      return
    }
    if (id === 'lift' || id === 'ledger' || id === 'voice' || id === 'compare' || id === 'handoff') return
    play(id === 'terminal' && step !== 2 ? 'terminal' : id === 'coffee' ? 'coffee' : 'tap')
    if (id === 'coffee') {
      setCarry('cup')
      announce('Кофе ещё горячий.')
      return
    }
    if (id === 'colleague') {
      announce('Стас: ' + extra['stas-hint'].text)
      sound.speak('stas-hint')
      return
    }
    if (id === 'terminal' && step === 2) {
      if (store.perform('queue_print')) {
        play('printer')
        announce('Журнал отправлен на принтер у архива.')
        refresh()
      }
      return
    }
    if (id === 'printer') {
      if (store.perform('take_log')) {
        announce('Журнал в руках. Время отметок не совпадает со словами Олега.')
        advance('papers')
      }
      return
    }
    if (id === 'phone') { setCarry('phone'); open('phone'); return }
    if (id === 'board') { setCarry(null); open('board'); return }
    if (id === 'maria') { open(step === 11 ? 'report' : 'manager'); return }
    if (id === 'laptop') { open('email'); return }
    if (id === 'terminal') { open(step === 10 ? 'decisions' : 'terminal'); return }
    open(id)
  }

  const selectCard = (id: string) => {
    if (!store || !pinned) return
    if (!selectedCard || selectedCard === id) {
      setSelectedCard(selectedCard === id ? undefined : id)
      play('tap')
      return
    }
    const relation = store.link(selectedCard, id)
    if (relation !== 'none') setBoardHelp(false)
    if (!store.state.complete && standalone && !debug) saveCheckpoint(store)
    announce(relations[relation] + ' · ' + store.linkNote(selectedCard, id) + (relation === 'none' ? ' −5 мин.' : ''))
    setSelectedCard(undefined)
    play(relation === 'contradicts' ? 'clash' : relation === 'confirms' ? 'thread' : 'wrong')
    refresh()
  }

  const toggleMute = () => {
    setMuted(!muted)
    sound.setState(started && muted && !inactive, ringing)
    if (muted && !inactive) sound.unlock()
  }
  const exit = () => {
    ns?.exit()
    if (standalone) { setPaused(false); setExited(true) }
  }
  const replace = (next: CaseStore, nextPanel: Panel | null = null) => {
    endSent.current = false
    duration.current = next.state.durationSec
    activeSince.current = null
    setStore(next)
    setPanel(nextPanel)
    setPinned(next.state.work.includes('pin_cards') || next.state.links.length > 0)
    sync(next, false)
  }
  const jump = (index: number) => {
    if (!store) return
    const next = createCase(caseData, store.state.difficulty)
    for (let current = 0; current < index; current++) {
      const req = next.data.requirements[current]
      if (req.call) next.answerCall(req.call, callAnswers[req.call])
      if (req.inspection) next.inspect(req.inspection)
      if (current === 2) next.perform('queue_print')
      if (req.work) next.perform(req.work, next.data.work.find(item => item.id === req.work)?.answer)
      if (req.attempt) next.link('victor', 'email')
      if (req.decisions) { next.inspect('D'); demoDecisions(next, 'clean') }
      if (req.report) next.report()
      next.advance()
    }
    const nextPlace = (index === 2 ? 'terminal' : beats[index].place) as Place
    office.current?.approach(nextPlace)
    setStarted(true)
    replace(next)
    office.current?.capture()
  }
  const debugFinish = (key: Ending) => {
    const empty = createCase(caseData, 'normal').toSave()
    empty.step = 10
    empty.cards = caseData.cards.map(card => card.id)
    empty.work = ['mark_email', 'pin_cards']
    const next = createCase(caseData, 'normal', empty)
    demoDecisions(next, key)
    next.advance()
    next.report()
    next.advance()
    replace(next, 'ending')
    sync(next, true)
    finish(next)
  }
  const showAll = () => {
    if (!store) return
    const snapshot = store.toSave()
    snapshot.cards = caseData.cards.map(card => card.id)
    office.current?.approach('board')
    setStarted(true)
    replace(createCase(caseData, store.state.difficulty, snapshot), 'board')
    setPinned(true)
  }

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.repeat) return
      if (event.key === 'Escape' && started && !exited) {
        event.preventDefault()
        if (paused || sitePaused) {
          setPaused(false)
          setSitePaused(false)
          if (!panel) office.current?.capture()
        } else {
          office.current?.release()
          setPaused(true)
        }
      }
      if (debug && event.code === 'F3' && active) { event.preventDefault(); office.current?.approach(place); office.current?.capture(); return }
      if (debug && event.code === 'F2' && !inactive && !lift) { event.preventDefault(); open('debug'); return }
      if (event.code === 'Tab' && active && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        open('tasks')
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  })

  if (!store) return <main className="loading">
    <div className="brand-mark"><ShieldCheck size={28} /></div><h1>{metadata.title}</h1>
    <p>{metadata.profession}</p><progress max={100} value={85} aria-label="Загрузка игры" />
    <span>Подключаем рабочие инструменты</span>
  </main>

  const eligible: Partial<Record<Place, string>> = { coffee: 'Налить кофе', colleague: 'Поговорить со Стасом' }
  if (step === 7 && store.state.difficulty === 'hard' && !store.state.calls.hard_oleg) eligible.meeting = 'Ответить Олегу'
  if (step >= 7) eligible.board = 'Подойти к доске улик'
  if (archiveOpen) {
    for (const key of Object.keys(eligible) as Place[]) delete eligible[key]
    eligible[place] = below ? archiveQuest?.action ?? 'Посмотреть итог сверки' : 'Войти в лифт'
  } else if (step === 2) {
    if (!store.state.calls.oleg) eligible.meeting = 'Уточнить срок у Олега'
    if (printing) eligible.printer = 'Забрать страницы'
    else eligible.terminal = 'Распечатать журнал'
  } else {
    eligible[place] = beat.action
  }
  const payload = { store, refresh, play, sound }
  const callMode = panel === 'phone' || panel === 'manager' || panel === 'meeting' || panel === 'danya'
  const screenMode = panel === 'terminal' || panel === 'decisions' || panel === 'email' || panel === 'meeting'
  const feedbackCard = store.evidence.find(card => card.id === (hoverCard ?? selectedCard))
  const boardReady = step === 7 && store.canAdvance
  const cluePair = boardPair.flatMap(id => store.evidence.find(card => card.id === id) ?? [])
  const hintCard = boardHelp && cluePair.length === 2
    ? (cluePair.find(card => card.id !== selectedCard)?.id ?? undefined)
    : undefined
  const sceneFooter = panel === 'report' ? 'К итогам' : panel === 'phone' ? 'Повесить трубку' : panel === 'terminal' ? 'Отойти от монитора' : 'Продолжить'
  const critical = store.remaining <= 25
  const screenPosition = screenMode && screen && !fallback
    ? { left: screen.left + '%', top: screen.top + '%', width: screen.width + '%', height: screen.height + '%' }
    : undefined
  const dismiss = () => store.canAdvance && (panel === beat.tool || (panel === 'board' && step === 7))
    ? advance(panel === 'archive' ? 'folder' : null) : returnToFloor()

  return <main className="fps-game">
    <Office ref={office} active={active} basement={below} step={step} colleagueSpeaking={cue.startsWith('Стас:')} visible={!inactive} focus={focus} eligible={eligible}
      destination={store.archiveComplete ? undefined : place} ringing={ringing} printed={printing} carry={carry}
      cards={store.evidence} links={store.state.links} pinned={pinned} selectedCard={selectedCard} hintCard={hintCard}
      onAim={setAim} onInteract={interact} onCard={selectCard} onCardHover={setHoverCard}
      onLostCapture={() => setPaused(true)} onLockStatus={setLocked} onFallback={setFallback} onScreen={setScreen} onMarker={setMarker}
      onFootstep={(surface, fast) => sound.footstep(surface, fast)} />

    {!started && canWalk && !panel && !lift && <section className="fps-start" aria-label="Начало смены">
      <div className="fps-cover">
        <div className="fps-eyebrow"><ShieldCheck size={20} /> ЧУЖОЕ ИМЯ</div>
        <h1>{below ? continuation.title : title}</h1>
        <p>Заречный · Банк «Тихая Линия»</p>
        <button className="primary" onClick={start}><Play size={20} /> {below || step > 0 ? 'Продолжить расследование' : 'Нажми, чтобы начать смену'}</button>
        <div className="start-controls"><span><kbd>WASD</kbd> Ходить</span><span><kbd>Shift</kbd> Быстрее</span><span><kbd>E</kbd> Действие</span></div>
      </div>
      <div className="fps-profile">Стажёр{nickname && ' · ' + nickname}
        {standalone && step === 0 ? <button onClick={() => open('difficulty')}>{labels[store.state.difficulty]} режим</button> : <span>{labels[store.state.difficulty]} режим</span>}
      </div>
    </section>}

    {started && canWalk && !lift && <div className="fps-hud" aria-label="Интерфейс игры">
      <div className="fps-objective"><span>{below ? 'АРХИВ · ЭТАЖ −1' : 'ТЕКУЩАЯ ЗАДАЧА'}</span><strong>{task}</strong>
        {!panel && !store.archiveComplete && <small>{targetRoom}</small>}
      </div>
      {archiveOpen
        ? <div className="fps-clock"><ArrowDown size={18} /><div><small>ЭТАЖ</small><strong>{below ? '−1' : '1'}</strong></div></div>
        : <div className={'fps-clock ' + (critical ? 'critical' : '')}><Clock3 size={18} /><div><small>ДО ОПЛАТЫ</small><strong>{clockText(store.remaining)}</strong></div></div>}
      {!panel && !inactive && <>
        <i className={'fps-crosshair ' + (aim ? 'on' : '')} />
        {aim && <div className="fps-prompt"><kbd>E</kbd> {aim.label}</div>}
        {marker && !store.archiveComplete && <div className="directions-hud" aria-label="Маршрут к текущей цели">
          <Navigation2 size={23} style={{ transform: 'rotate(' + marker.angle + 'deg)' }} />
          <div><strong>{targetRoom}{marker.meters > 0 && ' · ' + marker.meters + ' м'}</strong><span>
            {marker.meters < 2 ? 'Наведи прицел на предмет и нажми E' : Math.abs(marker.angle) > 105 ? 'Развернись и следуй по стрелкам' : 'Следуй по стрелкам на полу'}
          </span></div>
        </div>}
        <div className="fps-log-hint"><kbd>Tab</kbd> Задачи{fallback && <span> · Зажми мышь, чтобы осмотреться</span>}</div>
      </>}
    </div>}
    {isTouchDevice() && active && <TouchPad buttons={TOUCH_BUTTONS} />}
    {debug && !panel && !inactive && !lift && <div className="fps-dev">
      <button className="icon-button" onClick={() => open('debug')} aria-label="Режим демонстрации"><TerminalSquare size={19} /></button>
      {active && <button className="icon-button" onClick={() => { office.current?.approach(place); office.current?.capture() }} aria-label="Подойти к цели"><Flag size={17} /></button>}
    </div>}
    {active && !locked && !fallback && <div className="fps-capture"><button className="secondary" onClick={() => office.current?.capture()}>Вернуться к управлению</button></div>}
    {cue && panel !== 'board' && <div className="fps-toast" role="status">{cue}</div>}

    {(screenMode || panel === 'report') && <section className={'floor-screen ' + (panel === 'report' ? 'report-screen' : panel === 'meeting' ? 'meeting-screen' : '')}
      style={screenPosition} aria-label={panel === 'report' ? 'Отчёт' : panel === 'meeting' ? 'Видеосвязь' : panel === 'email' ? 'Письмо Ирины' : 'Терминал'}>
      <div className="monitor-toolbar">
        {panel === 'report' ? 'ОТЧЁТ ДЛЯ МАРИИ СЕРГЕЕВНЫ' : panel === 'meeting' ? 'ВИДЕОСВЯЗЬ' : panel === 'email' ? 'НОУТБУК ИРИНЫ' : 'АНТИФРОД · ДЕЛО № 014'}
        <button className="icon-button" aria-label="Встать и вернуться" onClick={returnToFloor}><X size={15} /></button>
      </div>
      <div className="monitor-content">
        {panel === 'terminal' && <Terminal {...payload} />}
        {panel === 'decisions' && <Decisions {...payload} />}
        {panel === 'meeting' && <Calls {...payload} presentation="video" />}
        {panel === 'email' && <Email {...payload} />}
        {panel === 'report' && <Report {...payload} />}
      </div>
      <div className="monitor-footer">
        {panel === 'report' && !store.state.submitted
          ? <button className="primary" onClick={() => { store.report(); play('card'); refresh() }}><FileCheck2 size={17} /> Представить отчёт</button>
          : <button className="primary" onClick={dismiss}>{store.canAdvance ? <Check size={17} /> : null}{store.canAdvance ? sceneFooter : 'Вернуться'}</button>}
      </div>
    </section>}

    {callMode && panel !== 'meeting' && <section className="fps-conversation" aria-label={panel === 'phone' ? 'Телефон' : panel === 'manager' ? 'Разговор с Марией' : 'Разговор с Даней'}>
      <Calls {...payload} presentation={panel === 'phone' ? 'phone' : 'in-person'} />
      <button className="secondary" onClick={dismiss}>{store.canAdvance ? sceneFooter : 'Отойти'}</button>
    </section>}

    {panel === 'archive' && <Dialog title="Архив" label="ПАПКИ ПОСТАВЩИКОВ" onClose={returnToFloor}
      footer={store.canAdvance ? <button className="primary" onClick={() => advance('folder')}>Забрать договор</button> : undefined}>
      <Archive {...payload} />
    </Dialog>}

    {panel === 'board' && <>
      <div className="board-controls">
        <div><LayoutGrid size={18} /><strong>Доска улик</strong><span>{store.state.links.filter(link => link.result === 'contradicts').length} / 4 противоречий</span></div>
        <button className={boardReady ? 'primary' : 'secondary'} onClick={dismiss}>{boardReady ? 'Дальше к терминалу' : 'Отойти от доски'}</button>
      </div>
      {!pinned && <div className="board-pin-action">
        <strong>Шаг 1 из 3 · Разложи улики</strong>
        <p>Прикрепи собранные карточки. Потом нажми на две карточки, чтобы соединить их нитью.</p>
        <button className="primary" onClick={() => {
          store.perform('pin_cards')
          setPinned(true)
          setCue('')
          if (standalone && !debug) saveCheckpoint(store)
          play('card')
          refresh()
        }}>Прикрепить карточки</button>
      </div>}
      {pinned && <div className="board-live-detail">
        <div className="board-instructions">
          <strong>{boardReady ? 'Связь найдена · Можно продолжать'
            : selectedCard ? 'Шаг 3 из 3 · Выбери вторую улику' : 'Шаг 2 из 3 · Выбери первую улику'}</strong>
          <span>{boardReady ? 'Кнопка «Дальше к терминалу» открывает следующее задание.'
            : selectedCard ? 'Нажми на другую карточку. Одна содержательная связь завершит задание.'
              : 'Ищи две улики об одном платеже. Например, найди письмо о смене счёта и сравни его со словами поставщика.'}</span>
        </div>
        {cue ? <p role="status">{cue}</p> : feedbackCard
          ? <p><strong>{feedbackCard.title}</strong> · {feedbackCard.detail}</p> : null}
        <div className="board-help-buttons">
          {!boardReady && cluePair.length === 2 && <button className="secondary" onClick={() => { setSelectedCard(undefined); setBoardHelp(!boardHelp) }}>
            {boardHelp ? 'Скрыть подсказку' : 'Подсказать пару'}
          </button>}
          <details><summary>Карточки списком</summary><div>
            {store.evidence.map(card => <button key={card.id} className="secondary" aria-pressed={selectedCard === card.id}
              onClick={() => selectCard(card.id)}>{card.title}</button>)}
          </div></details>
        </div>
        {boardHelp && !boardReady && <div className="board-example" aria-label="Рекомендуемая пара">
          {cluePair.map((card, index) => <button key={card.id} className={hintCard === card.id ? 'primary' : 'secondary'}
            onClick={() => selectCard(card.id)}>{index + 1}. {card.title}</button>)}
        </div>}
      </div>}
    </>}

    {panel === 'lift' && <Dialog title="Лифт в архив" label="ПРОДОЛЖЕНИЕ РАССЛЕДОВАНИЯ" icon={<ArrowDown size={21} />} onClose={returnToFloor}
      footer={<button className="primary" onClick={rideLift}>Спуститься на этаж −1</button>}>
      <p>{continuation.intro}</p>
    </Dialog>}
    {lift && <section className={'elevator-view ' + lift} aria-label="Поездка на лифте">
      <div className="lift-frame">
        <div className="lift-number"><ArrowDown size={21} /><strong>{lift === 'arrived' ? '−1' : '1'}</strong></div>
        <div className="lift-doors"><i /><i /></div>
        <p>{lift === 'arrived' ? 'Этаж −1 · Архив' : 'Спускаемся в архив'}</p>
        {lift === 'arrived' && <button className="primary" onClick={() => { setLift(null); office.current?.capture() }}>Выйти из лифта</button>}
      </div>
    </section>}
    {panel === 'archive-quest' && archiveQuest && <Dialog title={archiveQuest.room}
      label={'ЭТАЖ −1 · ЗАДАНИЕ ' + store.state.archiveStage + ' ИЗ ' + continuation.quests.length} onClose={returnToFloor}>
      <ArchiveChallenge key={archiveQuest.id} quest={archiveQuest} onSolve={solveArchive} sound={sound} />
    </Dialog>}
    {panel === 'archive-result' && <Dialog title="Дело передано" label="АРХИВ · ЭТАЖ −1" icon={<Check size={23} />} onClose={returnToFloor}
      footer={<button className="secondary" onClick={returnToFloor}>Осмотреть архив</button>}>
      <ArchiveResult sound={sound} />
    </Dialog>}

    {panel === 'tasks' && <Dialog title="Задачи" label={archiveOpen ? 'ЭТАЖ −1 · ПРОДОЛЖЕНИЕ' : 'ЭПИЗОД ' + (step + 1) + ' / ' + beats.length} onClose={returnToFloor}>
      <div className="fps-tasks"><strong>{task}</strong><p>{archiveQuest?.clue ?? (archiveOpen ? continuation.intro : beat.summary)}</p>
        <p>Стажёр{nickname && ' · ' + nickname} · {labels[store.state.difficulty]} режим</p>
        <ol>{(archiveOpen ? continuation.quests.slice(0, Math.max(0, store.state.archiveStage - 1)).map(quest => quest.task) : beats.slice(0, step).map(beat => beat.title)).map(label => <li key={label}><Check size={15} /> {label}</li>)}</ol>
      </div>
    </Dialog>}
    {panel === 'debug' && <Dialog title="Режим демонстрации" label="БЫСТРЫЙ ДОСТУП" icon={<TerminalSquare size={21} />} onClose={returnToFloor}>
      <DebugPanel store={store} jump={jump} showAll={showAll} finish={debugFinish} />
    </Dialog>}
    {panel === 'ending' && <Dialog title="Итоги главы" label="ДЕЛО № 014" icon={<Flag size={22} />} onClose={archiveOpen ? continueToLift : () => setPanel(null)} mode="ending-dialog"
      footer={archiveOpen ? <button className="primary" onClick={continueToLift}><ArrowDown size={18} /> Дальше к лифту</button> : undefined}>
      <EndingScreen store={store} />
    </Dialog>}
    {store.state.complete && !archiveOpen && !panel && <div className="fps-finished"><button className="primary" onClick={() => open('ending')}>Показать итоги</button></div>}
    {panel === 'difficulty' && <Dialog title="Сложность" onClose={() => setPanel(null)} mode="small-dialog">
      <div className="difficulty-options">{(Object.entries(labels) as [Difficulty, string][]).map(([id, label]) =>
        <button key={id} className={'answer-button ' + (id === store.state.difficulty ? 'is-selected' : '')}
          onClick={() => replace(createCase(caseData, id))}><strong>{label}</strong><span>{clockText(caseData.difficulty[id].minutes)} · {id === 'easy' ? 'Дополнительные подсказки' : 'Маршрут и помощь на доске'}</span></button>)}</div>
    </Dialog>}
    {(paused || (sitePaused && !tabHidden)) && !exited && <Dialog title="Пауза" label={title.toUpperCase()} icon={<CirclePause size={23} />} mode="small-dialog pause-dialog">
      <button className="primary" onClick={() => {
        setPaused(false); setSitePaused(false)
        if (!panel && !lift && started && canWalk) office.current?.capture()
      }}><Play size={18} /> Продолжить</button>
      <button className="secondary" aria-label="Звук" aria-pressed={!muted} onClick={toggleMute}><AudioLines size={18} /> Звук <span>{muted ? 'Выкл.' : 'Вкл.'}</span></button>
      <button className="secondary" onClick={exit}><LogOut size={18} /> Выйти в меню</button>
    </Dialog>}
    {exited && <Dialog title={metadata.title} label={title.toUpperCase()} icon={<ShieldCheck size={23} />} mode="small-dialog pause-dialog">
      <button className="primary" onClick={() => { setExited(false); if (!panel) office.current?.capture() }}><Play size={18} /> Вернуться к делу</button>
      <button className="secondary" onClick={() => { const fresh = createCase(caseData, store.state.difficulty); replace(fresh); saveCheckpoint(fresh); setExited(false); setStarted(false) }}>Начать заново</button>
    </Dialog>}
  </main>
}

function demoDecisions(store: CaseStore, key: Ending) {
  store.decide('A', key === 'lost' ? 'approve' : 'hold', ['email', 'victor'])
  store.decide('B', 'approve', ['old_details'])
  store.decide('C', 'block', ['danya', 'trace'], key === 'blame' ? 'accuse' : 'family')
  store.decide('D', key === 'overblock' ? 'block' : 'approve', ['bus_refund'])
}

createRoot(document.getElementById('root')!).render(<App />)
