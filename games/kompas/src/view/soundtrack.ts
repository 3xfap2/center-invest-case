const tempo = 82;
const sampleRate = 24000;
const beatSeconds = 60 / tempo;
const beatsPerBar = 4;
const barSeconds = beatSeconds * beatsPerBar;

type Note = readonly [beat: number, midi: number, length: number];
type Bar = { bass: number; plucks: readonly number[]; melody: readonly Note[] };

const score: Bar[] = [
  { bass: 48, plucks: [55, 64, 67, 71, 67, 64], melody: [[0.5, 76, 1.4], [2.25, 74, 0.65], [3, 72, 0.9]] },
  { bass: 47, plucks: [55, 62, 67, 71, 67, 62], melody: [[0.75, 71, 1.1], [2, 74, 1.65]] },
  { bass: 45, plucks: [52, 60, 64, 67, 64, 60], melody: [[0.5, 76, 1.3], [2, 79, 0.95], [3, 76, 0.65]] },
  { bass: 41, plucks: [53, 60, 65, 69, 65, 60], melody: [[0.5, 72, 2.1], [3, 74, 0.6]] },
  { bass: 40, plucks: [55, 60, 64, 67, 64, 60], melody: [[0.5, 76, 1.35], [2, 72, 0.95], [3, 67, 0.8]] },
  { bass: 50, plucks: [57, 60, 65, 69, 65, 60], melody: [[0.75, 69, 1.1], [2, 72, 1.4]] },
  { bass: 41, plucks: [53, 60, 65, 69, 65, 60], melody: [[0.5, 77, 1.45], [2.25, 76, 0.85], [3.25, 72, 0.6]] },
  { bass: 43, plucks: [55, 62, 67, 72, 67, 71], melody: [[0.5, 74, 1.2], [2.25, 71, 1.1]] },
];

const pluckBeats = [0, 0.75, 1.5, 2, 2.75, 3.5];

function frequency(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function waveform(ctx: OfflineAudioContext, partials: number[]) {
  return ctx.createPeriodicWave(new Float32Array(partials.length), Float32Array.from(partials));
}

export async function renderCampMusic() {
  const loopStart = Math.round(barSeconds * sampleRate) / sampleRate;
  const loopEnd = Math.round((score.length + 1) * barSeconds * sampleRate) / sampleRate;
  // A bar on each side lets the reverb and note tails continue through the loop point.
  const ctx = new OfflineAudioContext(2, Math.ceil((loopEnd + barSeconds) * sampleRate), sampleRate);
  const low = waveform(ctx, [0, 1, 0.20, 0.08]);
  const nylon = waveform(ctx, [0, 1, 0.32, 0.14, 0.075, 0.026]);
  const keys = waveform(ctx, [0, 1, 0.18, 0.095, 0.038]);

  const mix = ctx.createGain();
  mix.connect(ctx.destination);
  const echo = ctx.createDelay();
  echo.delayTime.value = 0.22;
  const echoGain = ctx.createGain();
  echoGain.gain.value = 0.14;
  const echoFilter = ctx.createBiquadFilter();
  echoFilter.type = 'lowpass';
  echoFilter.frequency.value = 1800;
  mix.connect(echo).connect(echoFilter).connect(echoGain).connect(ctx.destination);

  const bass = ctx.createStereoPanner();
  const left = ctx.createStereoPanner();
  const right = ctx.createStereoPanner();
  const lead = ctx.createStereoPanner();
  left.pan.value = -0.28;
  right.pan.value = 0.28;
  lead.pan.value = 0.12;
  [bass, left, right, lead].forEach(bus => bus.connect(mix));

  function voice(midi: number, start: number, length: number, peak: number, wave: PeriodicWave, bus: AudioNode) {
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.frequency.value = frequency(midi);
    oscillator.setPeriodicWave(wave);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(peak, start + 0.035);
    envelope.gain.exponentialRampToValueAtTime(peak * 0.27, start + 0.20);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + length);
    oscillator.connect(envelope).connect(bus);
    oscillator.start(start);
    oscillator.stop(start + length + 0.005);
  }

  for (let bar = -1; bar <= score.length; bar++) {
    const { bass: root, plucks, melody } = score[(bar + score.length) % score.length];
    const start = (bar + 1) * barSeconds;
    voice(root, start, 1.6, 0.14, low, bass);
    voice(root + 12, start + 2 * beatSeconds, 1.22, 0.078, low, bass);
    plucks.forEach((midi, index) => {
      const accent = index === 0 || index === 3 ? 0.14 : 0.105;
      voice(midi, start + pluckBeats[index] * beatSeconds, 1.12, accent, nylon, index % 2 ? right : left);
    });
    for (const [beat, midi, length] of melody) {
      voice(midi, start + beat * beatSeconds, length * beatSeconds + 0.3, 0.16, keys, lead);
    }
  }

  return { buffer: await ctx.startRendering(), loopStart, loopEnd };
}
