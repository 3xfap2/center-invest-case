export type Sound = 'tap' | 'card' | 'clash' | 'ring' | 'printer' | 'thread' | 'wrong'
  | 'terminal' | 'lift-move' | 'lift-arrive' | 'complete' | 'coffee'
export type VoiceChannel = 'live' | 'phone' | 'radio'

const clips = import.meta.glob<string>('./voices/*.mp3', { eager: true, import: 'default', query: '?inline' })
const voiceClips = new Map(Object.entries(clips).map(([path, data]) => [path.slice('./voices/'.length, -4), data]))

type Narration = { id: string; channel: VoiceChannel }

export class OfficeSound {
  private context?: AudioContext
  private ambience?: GainNode
  private effects?: GainNode
  private speech?: GainNode
  private noiseBuffer?: AudioBuffer
  private timer?: number
  private enabled = false
  private ringing = false
  private underground = false
  private voice?: AudioBufferSourceNode
  private narration?: Narration
  private voiceRevision = 0
  private readonly decoded = new Map<string, Promise<AudioBuffer>>()

  setState(enabled: boolean, ringing: boolean, underground = this.underground) {
    const before = this.enabled
    this.enabled = enabled
    this.ringing = ringing
    this.underground = underground
    const audio = this.context
    if (!audio) return
    if (!enabled) {
      void audio.suspend().catch(() => {})
      return
    }
    if (audio.state !== 'running') void audio.resume().catch(() => {})
    this.duck(Boolean(this.voice))
    if (!before && this.narration && !this.voice) this.speak(this.narration.id, this.narration.channel)
  }

  unlock() {
    if (!this.enabled || !window.AudioContext) return
    if (this.context) {
      if (this.context.state !== 'running') void this.context.resume().catch(() => {})
      return
    }
    try {
      const audio = new AudioContext()
      this.context = audio
      const master = audio.createGain()
      const ambience = audio.createGain()
      const effects = audio.createGain()
      const speech = audio.createGain()
      master.gain.value = .68
      ambience.gain.value = this.underground ? .13 : .55
      effects.gain.value = .78
      speech.gain.value = 1
      ambience.connect(master)
      effects.connect(master)
      speech.connect(master)
      master.connect(audio.destination)
      this.ambience = ambience
      this.effects = effects
      this.speech = speech

      const noise = audio.createBuffer(1, 3 * audio.sampleRate, audio.sampleRate)
      const samples = noise.getChannelData(0)
      for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * .72
      this.noiseBuffer = noise
      const rain = audio.createBufferSource()
      rain.buffer = noise
      rain.loop = true
      const filter = audio.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 840
      const level = audio.createGain()
      level.gain.value = .22
      rain.connect(filter).connect(level).connect(ambience)
      rain.start()

      let tick = 0
      this.timer = window.setInterval(() => {
        if (!this.enabled) return
        tick++
        if (!this.underground) this.tone(tick % 2 ? 604 : 435, .028, .028, 0, 'triangle', this.ambience)
        if (this.ringing && tick % 3 === 0) this.ring()
        if (tick % 14 === 1) {
          const chord = this.underground ? [82.4, 123.5, 196] : tick % 28 < 14 ? [110, 164.8, 261.6] : [98, 146.8, 220]
          chord.forEach((note, index) => this.tone(note, 5.7, .022, index * .28, 'sine', this.ambience, .9))
        }
      }, 1000)
      void audio.resume().catch(() => {})
    } catch {
      this.dispose()
    }
  }

  private duck(active: boolean) {
    if (!this.ambience || !this.context) return
    const dry = this.underground ? .13 : .55
    this.ambience.gain.setTargetAtTime(active ? dry * .29 : dry, this.context.currentTime, .11)
  }

  private tone(frequency: number, length: number, volume: number, delay = 0, wave: OscillatorType = 'sine',
    bus = this.effects, attack = .007, end = frequency) {
    if (!this.context || !bus) return
    const start = this.context.currentTime + delay
    const oscillator = this.context.createOscillator()
    const envelope = this.context.createGain()
    oscillator.type = wave
    oscillator.frequency.setValueAtTime(frequency, start)
    oscillator.frequency.exponentialRampToValueAtTime(end, start + length)
    envelope.gain.setValueAtTime(.0001, start)
    envelope.gain.exponentialRampToValueAtTime(volume, start + attack)
    envelope.gain.exponentialRampToValueAtTime(.0001, start + length)
    oscillator.connect(envelope).connect(bus)
    oscillator.start(start)
    oscillator.stop(start + length + .015)
  }

  private noise(length: number, volume: number, frequency: number, delay = 0,
    kind: BiquadFilterType = 'bandpass', attack = .012, end = frequency) {
    if (!this.context || !this.noiseBuffer || !this.effects) return
    const audio = this.context
    const start = audio.currentTime + delay
    const source = audio.createBufferSource()
    const filter = audio.createBiquadFilter()
    const envelope = audio.createGain()
    source.buffer = this.noiseBuffer
    filter.type = kind
    filter.frequency.setValueAtTime(frequency, start)
    filter.frequency.exponentialRampToValueAtTime(end, start + length)
    envelope.gain.setValueAtTime(.0001, start)
    envelope.gain.exponentialRampToValueAtTime(volume, start + attack)
    envelope.gain.exponentialRampToValueAtTime(.0001, start + length)
    source.connect(filter).connect(envelope).connect(this.effects)
    source.start(start, Math.random() * Math.max(0, this.noiseBuffer.duration - length))
    source.stop(start + length)
  }

  private ring() {
    for (const delay of [0, .29]) {
      this.tone(457, .21, .105, delay, 'triangle')
      this.tone(699, .19, .049, delay, 'sine')
    }
  }

  play(kind: Sound) {
    if (!this.enabled) return
    this.unlock()
    switch (kind) {
      case 'tap':
        this.noise(.055, .075, 2600)
        this.tone(420, .046, .045, 0, 'triangle')
        break
      case 'ring':
        this.ring()
        break
      case 'card':
        this.noise(.14, .13, 2450, 0, 'bandpass', .012, 1100)
        this.tone(587, .14, .085, .055, 'triangle')
        this.tone(880, .22, .066, .123)
        break
      case 'thread':
      case 'clash':
        this.noise(.108, .07, 1380, 0, 'bandpass', .008, 480)
        this.tone(165, .38, .19, .025, 'triangle', this.effects, .012, 123)
        this.tone(kind === 'clash' ? 329.6 : 440, .38, .072, .035, 'triangle')
        break
      case 'wrong':
        this.tone(153, .19, .13, 0, 'triangle', this.effects, .008, 87)
        this.noise(.12, .08, 370, .018, 'lowpass')
        break
      case 'terminal':
        this.noise(.058, .063, 2200)
        for (const [index, note] of [390, 523, 784].entries()) this.tone(note, .13, .06, index * .058, 'sine')
        break
      case 'printer':
        this.tone(94, .53, .105, 0, 'triangle', this.effects, .05, 130)
        for (const delay of [0, .14, .28]) this.noise(.17, .12, 645, delay)
        this.noise(.19, .13, 2300, .43, 'bandpass', .02, 915)
        break
      case 'lift-move':
        this.noise(.6, .17, 850, 0, 'bandpass', .036, 140)
        this.tone(62, 1.2, .18, .05, 'triangle', this.effects, .15, 41)
        this.noise(1.24, .15, 120, .03, 'lowpass', .25, 65)
        break
      case 'lift-arrive':
        this.tone(660, .5, .105, 0, 'triangle')
        this.tone(990, .49, .085, .16)
        this.noise(.52, .12, 490, .2, 'bandpass', .045, 185)
        break
      case 'complete':
        for (const [index, note] of [261.6, 329.6, 392, 523.3].entries()) {
          this.tone(note, .83, .09, index * .094, 'triangle', this.effects, .03)
          this.tone(note * 2, .42, .035, index * .094)
        }
        break
      case 'coffee':
        this.noise(.37, .086, 2500, 0, 'highpass', .065, 1220)
        this.tone(1220, .18, .057, .21, 'sine')
        break
    }
  }

  footstep(surface: 'tile' | 'carpet', fast: boolean) {
    if (!this.enabled || !this.context) return
    const hard = surface === 'tile'
    const pitch = (this.underground ? 92 : hard ? 123 : 74) * (.93 + Math.random() * .15)
    this.tone(pitch, hard ? .075 : .11, fast ? .14 : .095, 0, 'triangle', this.effects, .007, pitch * .62)
    this.noise(hard ? .065 : .088, fast ? .11 : .075, hard ? 1700 : 550, .006)
  }

  hasVoice(id: string) {
    return voiceClips.has(id)
  }

  speak(id: string, channel: VoiceChannel = 'live') {
    const clip = voiceClips.get(id)
    if (!clip) return
    this.stopVoice()
    this.narration = { id, channel }
    if (!this.enabled) return
    this.unlock()
    const audio = this.context
    const bus = this.speech
    if (!audio || !bus) return
    const revision = this.voiceRevision
    let decoded = this.decoded.get(id)
    if (!decoded) {
      const bytes = Uint8Array.from(atob(clip.slice(clip.indexOf(',') + 1)), char => char.charCodeAt(0))
      decoded = audio.decodeAudioData(bytes.buffer)
      if (this.decoded.size >= 12) {
        const oldest = this.decoded.keys().next().value
        if (oldest) this.decoded.delete(oldest)
      }
      this.decoded.set(id, decoded)
    }
    void decoded.then(buffer => {
      if (revision !== this.voiceRevision || !this.enabled || this.context !== audio) return
      const source = audio.createBufferSource()
      source.buffer = buffer
      const filter = channel === 'live' ? undefined : audio.createBiquadFilter()
      if (filter) {
        filter.type = 'bandpass'
        filter.frequency.value = channel === 'phone' ? 1380 : 1750
        filter.Q.value = .47
        source.connect(filter).connect(bus)
      } else source.connect(bus)
      this.voice = source
      this.duck(true)
      source.onended = () => {
        source.disconnect()
        filter?.disconnect()
        if (this.voice === source) {
          this.voice = undefined
          this.narration = undefined
          this.duck(false)
        }
      }
      source.start()
    }).catch(() => {
      this.decoded.delete(id)
      if (revision === this.voiceRevision) this.stopVoice()
    })
  }

  stopVoice(id?: string) {
    if (id && this.narration?.id !== id) return
    this.voiceRevision++
    const active = this.voice
    this.voice = undefined
    this.narration = undefined
    active?.stop()
    this.duck(false)
  }

  dispose() {
    this.stopVoice()
    if (this.timer !== undefined) window.clearInterval(this.timer)
    this.timer = undefined
    if (this.context && this.context.state !== 'closed') void this.context.close().catch(() => {})
    this.context = undefined
    this.ambience = undefined
    this.effects = undefined
    this.speech = undefined
    this.noiseBuffer = undefined
    this.decoded.clear()
  }
}
