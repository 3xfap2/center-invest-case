export type Sound = 'tap' | 'card' | 'clash' | 'ring' | 'printer'

export class OfficeSound {
  private audio?: AudioContext
  private output?: GainNode
  private timer?: number
  private enabled = false
  private ringing = false

  setState(enabled: boolean, ringing: boolean) {
    this.enabled = enabled
    this.ringing = ringing
    if (this.output && this.audio) {
      this.output.gain.setTargetAtTime(enabled ? 0.39 : 0, this.audio.currentTime, 0.04)
    }
  }

  unlock() {
    if (this.audio) {
      if (this.audio.state === 'suspended') void this.audio.resume().catch(() => {})
      return
    }
    if (!window.AudioContext || !this.enabled) return
    try {
      const audio = new AudioContext()
      const output = audio.createGain()
      output.gain.value = this.enabled ? 0.39 : 0
      output.connect(audio.destination)
      this.audio = audio
      this.output = output

      const buffer = audio.createBuffer(1, 3 * audio.sampleRate, audio.sampleRate)
      const samples = buffer.getChannelData(0)
      for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() - 0.5) * 0.75
      const rain = audio.createBufferSource()
      rain.buffer = buffer
      rain.loop = true
      const filter = audio.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 740
      const gain = audio.createGain()
      gain.gain.value = 0.24
      rain.connect(filter).connect(gain).connect(output)
      rain.start()

      let tick = 0
      this.timer = window.setInterval(() => {
        if (!this.enabled) return
        tick++
        this.tone(tick % 2 ? 605 : 440, 0.024, 0.024, 0, 'triangle')
        if (this.ringing && tick % 3 === 0) {
          this.tone(464, 0.18, 0.10, 0, 'triangle')
          this.tone(520, 0.16, 0.075, 0.22, 'triangle')
        }
        if (tick % 12 === 1) {
          const chord = tick % 24 < 12 ? [110, 164.8, 261.63] : [98, 146.83, 220]
          chord.forEach((note, index) => this.tone(note, 4.8, 0.018, index * 0.21, 'sine', 0.7))
        }
      }, 1000)
      void audio.resume().catch(() => {})
    } catch {
      this.dispose()
    }
  }

  private tone(frequency: number, length: number, volume: number, delay = 0, wave: OscillatorType = 'sine', attack = 0.008) {
    if (!this.audio || !this.output) return
    const start = this.audio.currentTime + delay
    const oscillator = this.audio.createOscillator()
    const envelope = this.audio.createGain()
    oscillator.type = wave
    oscillator.frequency.value = frequency
    envelope.gain.setValueAtTime(0.0001, start)
    envelope.gain.exponentialRampToValueAtTime(volume, start + attack)
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + length)
    oscillator.connect(envelope).connect(this.output)
    oscillator.start(start)
    oscillator.stop(start + length + 0.02)
  }

  play(kind: Sound) {
    if (!this.enabled) return
    this.unlock()
    if (kind === 'tap') this.tone(360, 0.07, 0.09, 0, 'triangle')
    if (kind === 'card') {
      this.tone(495, 0.13, 0.12, 0, 'triangle')
      this.tone(660, 0.17, 0.11, 0.065)
    }
    if (kind === 'printer') {
      this.tone(168, .31, .10, 0, 'triangle')
      this.tone(252, .12, .09, .20, 'square')
    }
    if (kind === 'ring') {
      this.tone(464, 0.15, 0.10, 0, 'triangle')
      this.tone(520, 0.12, 0.07, 0.19, 'triangle')
    }
    if (kind === 'clash') {
      this.tone(220, 0.31, 0.17, 0, 'triangle')
      this.tone(310, 0.25, 0.11, 0.075, 'triangle')
    }
  }

  footstep(surface: 'tile' | 'carpet', fast: boolean) {
    if (!this.enabled) return
    const tiled = surface === 'tile'
    this.tone(tiled ? 115 : 77, tiled ? .071 : .102, fast ? .14 : .103, 0, 'triangle')
    if (tiled) this.tone(575, .038, fast ? .06 : .043, .011, 'sine')
  }

  dispose() {
    if (this.timer !== undefined) window.clearInterval(this.timer)
    if (this.audio && this.audio.state !== 'closed') void this.audio.close().catch(() => {})
    this.audio = undefined
    this.output = undefined
  }
}
