import metadata from '../game.json'
import { bridge, defaults, persist, standalone, standaloneSave } from './platform'
import { calls } from './sim/content'
import { emptyEquipment, endPayload, gear, gearCost, getEnding, newCampaign, recordRound, savings,
  type Campaign, type Difficulty, type Ending, type Gear, type RoundResult } from './sim/campaign'
import { Round } from './sim'
import { World } from './world/world'

export type Phase = 'menu' | 'briefing' | 'buy' | 'choice' | 'action' | 'debrief' | 'ending'

export class Game {
  phase: Phase = 'menu'
  mode: Difficulty = 'normal'
  nickname = 'Новичок'
  muted = false
  saved: Campaign | null = standalone ? standaloneSave() : null
  campaign = newCampaign(this.nickname, this.mode)
  equipment = emptyEquipment()
  selectedOwner: 'you' | 'partner' = 'you'
  paused: 'pause' | 'gear' | null = null
  sitePaused = false
  pointer: 'locked' | 'retry' | 'unlocked' = 'unlocked'
  round: Round | null = null
  callIndex = 0
  clock = 0
  demo = false
  infinite = false
  worldError = false
  world: World | null = null
  private timer: number
  private ticked = performance.now()
  private initialized = standalone
  private activeTime = 0

  constructor(canvas: HTMLCanvasElement, markers: HTMLElement, readonly update: () => void) {
    try {
      this.world = new World(canvas, markers, {
        update, done: () => this.completeRound(), paused: () => this.pause(),
        pointer: status => { this.pointer = status; update() },
        gear: () => this.pause('gear'), failed: () => {
          this.worldError = true
          this.pause()
          update()
        },
      })
    } catch {
      this.worldError = true
    }
    if (bridge) {
      bridge.onInit = data => {
        if (!standalone && !this.initialized) {
          const init = defaults(data)
          this.nickname = init.nickname
          this.mode = init.difficulty
          this.saved = init.saved
          this.setSound(init.muted)
          this.initialized = true
          this.update()
        }
      }
      bridge.pause = () => { this.sitePaused = true; this.pause(); this.update() }
      bridge.resume = () => { this.sitePaused = false; this.update() }
      bridge.mute = data => { this.setSound(data.muted ?? data.value ?? true) }
      bridge.ready(metadata.id, metadata.version)
    }
    this.timer = window.setInterval(() => this.tick(), 100)
  }

  get call() { return calls[this.callIndex] }
  get equipmentSpend() { return gearCost(this.equipment) }
  get budget() { return this.campaign.budget - this.equipmentSpend }
  get ending() { return getEnding(this.campaign) }

  private tick() {
    const now = performance.now()
    const seconds = Math.min(1, (now - this.ticked) / 1000)
    this.ticked = now
    if (this.paused || this.sitePaused) return
    if (this.phase === 'briefing' || this.phase === 'buy') {
      this.activeTime += seconds
      this.clock = Math.max(0, this.clock - seconds)
      if (this.clock <= .0001) {
        if (this.phase === 'briefing') this.buy()
        else this.launch()
      }
      this.update()
    }
  }

  start(continued: boolean) {
    if (this.worldError || !this.initialized) return
    this.world?.sound.wake()
    this.demo = false
    this.activeTime = 0
    this.campaign = continued && this.saved ? this.saved : newCampaign(this.nickname, this.mode)
    this.callIndex = Math.min(this.campaign.results.length, calls.length - 1)
    if (this.campaign.results.length === calls.length) this.showEnding(false)
    else this.brief()
  }

  private brief() {
    this.phase = 'briefing'
    this.paused = null
    this.clock = 10
    this.round = null
    this.equipment = emptyEquipment()
    this.selectedOwner = 'you'
    this.world?.showStation()
    this.world?.sound.cue('radio')
    if (!this.demo) bridge?.progress(this.call.number, Math.round(this.callIndex * 100 / calls.length))
    this.update()
  }

  buy() {
    this.phase = 'buy'
    this.clock = 20
    this.update()
  }

  chooseGear(id: Gear) {
    if (this.phase !== 'buy' || this.clock <= 0 || this.paused) return
    const selected = this.equipment[this.selectedOwner]
    if (selected.includes(id)) this.equipment[this.selectedOwner] = selected.filter(item => item !== id)
    else if (this.budget >= gear[id].cost) this.equipment[this.selectedOwner] = [...selected, id]
    this.update()
  }

  launch() {
    if (this.call.theme === 'workshop' && this.phase !== 'choice') {
      this.phase = 'choice'
      this.world?.sound.cue('radio')
      this.update()
    } else this.beginAction()
  }

  beginAction(waited: boolean | null = null) {
    this.phase = 'action'
    this.pointer = 'unlocked'
    this.round = new Round(this.call, this.equipment, this.campaign, waited)
    this.round.infiniteAir = this.infinite && this.demo
    this.world?.setRound(this.round)
    this.world?.sound.cue('round')
    this.world?.enter()
    this.update()
  }

  pause(kind: 'pause' | 'gear' = 'pause') {
    if (this.paused === kind) return
    this.paused = kind
    this.world?.stop()
    this.update()
  }

  unpause() {
    if (this.sitePaused) return
    this.paused = null
    if (this.phase === 'action') {
      this.pointer = 'unlocked'
      this.world?.enter()
    }
    this.update()
  }

  keyboard() {
    this.world?.keyboard()
  }

  setSound(muted: boolean) {
    this.muted = muted
    this.world?.sound.mute(muted)
    this.update()
  }

  exit() {
    this.world?.stop()
    this.world?.showStation()
    this.paused = null
    this.round = null
    this.phase = 'menu'
    this.update()
    bridge?.exit()
  }

  private completeRound() {
    const round = this.round
    if (!round?.result || this.phase !== 'action') return
    const previousSaved = savings(this.campaign)
    const result = round.result
    this.campaign = recordRound(this.campaign, result, this.equipmentSpend, round.waited, round.checked)
    this.phase = 'debrief'
    this.world?.sound.cue(result.saved ? 'rescue' : 'round')
    if (!this.demo) {
      persist(this.campaign)
      this.saved = this.campaign
      if (round.waited !== null) bridge?.flag('dm_waited_for_hose', round.waited)
      if (round.checked !== null) bridge?.flag('dm_checked_back_room', round.checked)
      bridge?.flag('dm_people_saved', savings(this.campaign))
      bridge?.progress(this.call.number, Math.round(this.campaign.results.length * 100 / calls.length))
      if (previousSaved === 0 && result.saved > 0) bridge?.achievement('dm_first_rescue')
      if (result.air === 100 && result.status === 'complete' && !this.campaign.results.slice(0, -1).some(r => r.air === 100 && r.status === 'complete')) bridge?.achievement('dm_air_discipline')
      if (this.campaign.results.length === calls.length) {
        bridge?.achievement('dm_night_shift')
        if (this.ending === 'good') bridge?.achievement('dm_full_crew')
        const payload = endPayload(this.campaign, this.ending)
        bridge?.end({ ...payload, durationSec: payload.durationSec + Math.round(this.activeTime) })
      }
    }
    this.update()
  }

  next() {
    if (this.callIndex + 1 >= calls.length) this.showEnding()
    else { this.callIndex++; this.brief() }
  }

  private showEnding(playCue = true) {
    this.phase = 'ending'
    this.round = null
    this.world?.showStation()
    if (playCue) this.world?.sound.cue('rescue')
    this.update()
  }

  debugStart(index: number) {
    this.demo = true
    this.world?.stop()
    this.paused = null
    this.campaign = newCampaign('Новичок', this.mode)
    this.campaign.results = calls.slice(0, index).map(c => this.sample(c.victims.length, c.victims.length))
    this.callIndex = index
    this.equipment = emptyEquipment()
    this.beginAction(this.call.theme === 'workshop' ? true : null)
  }

  debugEnding(ending: Ending) {
    this.demo = true
    this.world?.stop()
    this.paused = null
    this.campaign = newCampaign('Новичок', this.mode)
    this.campaign.results = calls.map((c, i) =>
      this.sample(ending === 'good' ? c.victims.length : ending === 'steady' && i !== 2 ? 1 : 0, c.victims.length))
    this.campaign.waited = ending === 'good'
    this.campaign.checked = ending === 'good'
    this.showEnding()
  }

  private sample(saved: number, total: number): RoundResult {
    return { saved, total, property: 72, safety: 91, air: 100, support: 3, seconds: 62,
      status: saved === total ? 'complete' : 'timer' }
  }

  destroy() {
    window.clearInterval(this.timer)
    this.world?.dispose()
  }
}
