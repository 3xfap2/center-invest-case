export class Sound {
  muted = false
  private context?: AudioContext
  private master?: GainNode
  private water?: GainNode
  private breath?: GainNode

  wake() {
    if (this.context) {
      if (this.context.state === 'suspended') void this.context.resume().catch(() => {})
      return
    }
    try {
      const c = new AudioContext()
      this.context = c
      this.master = c.createGain()
      this.master.gain.value = this.muted ? 0 : .52
      this.master.connect(c.destination)
      this.water = this.noise('highpass', 1450)
      this.breath = this.noise('bandpass', 510)
    } catch { /* Audio is optional in browsers without Web Audio. */ }
  }

  private noise(type: BiquadFilterType, frequency: number) {
    const c = this.context!
    const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate)
    const samples = b.getChannelData(0)
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1
    const source = c.createBufferSource()
    source.buffer = b
    source.loop = true
    const filter = c.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    const gain = c.createGain()
    gain.gain.value = 0
    source.connect(filter).connect(gain).connect(this.master!)
    source.start()
    return gain
  }

  mute(value: boolean) {
    this.muted = value
    if (this.master && this.context) this.master.gain.setTargetAtTime(value ? 0 : .52, this.context.currentTime, .022)
  }

  frame(spraying: boolean, active: boolean, air: number) {
    const c = this.context
    if (!c || !this.water || !this.breath) return
    const t = c.currentTime
    this.water.gain.setTargetAtTime(spraying && active ? .22 : 0, t, .035)
    const cycle = Math.sin(t * (air < .3 ? 9.8 : 3.9))
    this.breath.gain.setTargetAtTime(active ? Math.pow(Math.max(0, cycle), 2) * (air < .3 ? .18 : .093) : 0, t, .04)
  }

  cue(kind: 'radio' | 'round' | 'rescue') {
    const c = this.context
    if (!c || !this.master || this.muted) return
    const notes = kind === 'rescue' ? [392, 510, 660] : kind === 'radio' ? [1050, 690] : [250, 410]
    notes.forEach((frequency, i) => {
      const tone = c.createOscillator()
      const volume = c.createGain()
      const start = c.currentTime + i * .078
      tone.type = kind === 'radio' ? 'square' : 'sine'
      tone.frequency.setValueAtTime(frequency, start)
      tone.connect(volume).connect(this.master!)
      volume.gain.setValueAtTime(.0001, start)
      volume.gain.exponentialRampToValueAtTime(kind === 'radio' ? .032 : .18, start + .016)
      volume.gain.exponentialRampToValueAtTime(.0001, start + .084)
      tone.start(start)
      tone.stop(start + .095)
    })
  }
}
