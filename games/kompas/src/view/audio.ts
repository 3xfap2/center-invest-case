import { renderCampMusic } from './soundtrack';

export class CampAudio {
  private context?: AudioContext;
  private output?: GainNode;
  private paused = false;
  private muted = true;
  private initialized = false;

  configure(muted: boolean, paused: boolean) {
    this.muted = muted;
    this.paused = paused;
    if (this.context && this.output) this.output.gain.setTargetAtTime(muted || paused ? 0 : 0.36, this.context.currentTime, 0.1);
  }

  async unlock() {
    if (this.muted || !window.AudioContext) return;
    try {
      const ctx = this.context ?? (this.context = new AudioContext());
      if (ctx.state === 'suspended') await ctx.resume();
      if (this.initialized) return;
      this.initialized = true;
      const output = this.output = ctx.createGain();
      output.gain.value = 0;
      output.connect(ctx.destination);
      this.configure(this.muted, this.paused);
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let smooth = 0;
      for (let i = 0; i < data.length; i++) {
        smooth = (smooth + (Math.random() * 2 - 1) * 0.025) / 1.025;
        data[i] = smooth * (0.72 + Math.sin(i * Math.PI * 2 / data.length) * 0.21);
      }
      const wash = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const volume = ctx.createGain();
      filter.type = 'lowpass'; filter.frequency.value = 840;
      volume.gain.value = 0.44;
      wash.buffer = buffer; wash.loop = true;
      wash.connect(filter).connect(volume).connect(output);
      wash.start();
      void renderCampMusic().then(({ buffer, loopStart, loopEnd }) => {
        const music = ctx.createBufferSource();
        const level = ctx.createGain();
        level.gain.value = 0.56;
        music.buffer = buffer;
        music.loop = true;
        music.loopStart = loopStart;
        music.loopEnd = loopEnd;
        music.connect(level).connect(output);
        music.start(0, loopStart);
      }).catch(() => {
        // Keep the camp ambience available if offline audio rendering is unavailable.
      });
    } catch {
      // Sound is optional when browser audio is unavailable.
    }
  }

  play(kind: 'drop' | 'note' | 'chime' | 'emote') {
    const ctx = this.context, out = this.output;
    if (!ctx || !out || this.muted || this.paused) return;
    const notes = { drop: [290], note: [392, 523, 659], chime: [329, 392, 523], emote: [610] }[kind];
    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      const start = ctx.currentTime + index * 0.095;
      osc.type = 'sine'; osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(kind === 'emote' ? 0.045 : 0.14, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.29);
      osc.connect(gain).connect(out); osc.start(start); osc.stop(start + 0.30);
    });
  }
}
