// Синтезированный звук на WebAudio: без файлов, без лицензий.
// Браузер разрешает звук только после жеста игрока, поэтому unlock() вызывается по первому клику.
let ctx = null;
let master = null;
let hum = null;
let muted = false;
const VOLUME = 0.6;

export function unlockAudio() {
  if (ctx) {
    if (ctx.state === 'suspended') ctx.resume();
    return;
  }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : VOLUME;
  master.connect(ctx.destination);
}

export function setMuted(m) {
  muted = !!m;
  if (master) master.gain.setTargetAtTime(muted ? 0 : VOLUME, ctx.currentTime, 0.05);
}

export function isMuted() {
  return muted;
}

// Пауза от сайта (вкладка скрыта): останавливаем звук целиком.
export function suspendAudio(on) {
  if (!ctx) return;
  if (on && ctx.state === 'running') ctx.suspend();
  if (!on && ctx.state === 'suspended') ctx.resume();
}

function env(node, t0, a, d, peak) {
  node.gain.setValueAtTime(0.0001, t0);
  node.gain.exponentialRampToValueAtTime(peak, t0 + a);
  node.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d);
}

function tone(freq, dur, type = 'sine', vol = 0.2, delay = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  env(g, t, 0.01, dur, vol);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noise(dur, vol = 0.2, filterFreq = 1200, delay = 0, q = 1) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.value = filterFreq;
  f.Q.value = q;
  const g = ctx.createGain();
  env(g, t, 0.005, dur, vol);
  src.connect(f).connect(g).connect(master);
  src.start(t);
}

export const sfx = {
  click() {
    noise(0.05, 0.5, 2500, 0, 4);
    tone(1800, 0.03, 'square', 0.05);
  },
  ui() {
    tone(880, 0.06, 'triangle', 0.08);
  },
  message() {
    tone(660, 0.08, 'sine', 0.12);
    tone(990, 0.12, 'sine', 0.1, 0.08);
  },
  pickup() {
    tone(520, 0.08, 'triangle', 0.12);
    tone(780, 0.1, 'triangle', 0.1, 0.06);
  },
  door() {
    noise(0.6, 0.25, 300, 0, 2);
    tone(90, 0.5, 'sawtooth', 0.04);
  },
  locked() {
    noise(0.08, 0.4, 800, 0, 3);
    noise(0.08, 0.4, 700, 0.1, 3);
  },
  glitch() {
    if (!ctx) return;
    for (let i = 0; i < 6; i++) tone(200 + Math.random() * 1600, 0.05, 'square', 0.06, i * 0.04);
    noise(0.3, 0.15, 4000, 0, 0.5);
  },
  success() {
    [523, 659, 784].forEach((f, i) => tone(f, 0.18, 'triangle', 0.1, i * 0.09));
  },
  fail() {
    tone(220, 0.25, 'square', 0.06);
    tone(180, 0.3, 'square', 0.06, 0.15);
  },
  // Щелчок за спиной в финале: звук слева-сзади.
  clickBehind() {
    if (!ctx) return;
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    const t = ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * 0.12);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.08));
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.9;
    if (p) {
      p.pan.value = -0.4;
      src.connect(g).connect(p).connect(master);
    } else src.connect(g).connect(master);
    src.start(t);
    noise(1.2, 0.08, 200, 0.15, 1);
  },
};

// Фоновый гул: тихий, разный для офиса и станции.
export function setAmbience(kind) {
  if (!ctx) return;
  if (hum) {
    const old = hum;
    old.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
    setTimeout(() => old.oscs.forEach((o) => o.stop()), 1500);
    hum = null;
  }
  if (!kind) return;
  const g = ctx.createGain();
  g.gain.value = 0.0001;
  g.connect(master);
  const freqs = kind === 'office' ? [60, 120.5] : [48, 72.3, 96.1];
  const oscs = freqs.map((f) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    o.connect(g);
    o.start();
    return o;
  });
  g.gain.setTargetAtTime(kind === 'office' ? 0.025 : 0.04, ctx.currentTime, 1.5);
  hum = { g, oscs };
}

// Спокойная музыка для вступительного ролика: аккорды, бас и тихое арпеджио с эхом.
// Возвращает функцию остановки (плавное затухание). Громкость подчиняется общему выключателю звука.
export function playIntroMusic() {
  if (!ctx) return () => {};
  const now = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, now);
  out.gain.exponentialRampToValueAtTime(0.55, now + 2.5);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 2200;
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.38;
  const fb = ctx.createGain();
  fb.gain.value = 0.3;
  delay.connect(fb).connect(delay);
  lp.connect(out);
  lp.connect(delay);
  delay.connect(out);
  out.connect(master);

  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // Am, F, C, G: спокойная, чуть грустная последовательность
  const chords = [
    [57, 60, 64],
    [53, 57, 60],
    [48, 52, 55],
    [55, 59, 62],
  ];
  const bar = 3.6;
  const oscs = [];
  const voice = (type, freq, t, dur, peak, attack) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(lp);
    o.start(t);
    o.stop(t + dur + 0.05);
    oscs.push(o);
  };
  const t0 = now + 0.1;
  for (let b = 0; b < 10; b++) {
    const ch = chords[b % 4];
    const tb = t0 + b * bar;
    ch.forEach((m) => voice('triangle', hz(m), tb, bar + 0.8, 0.035, 1.2)); // мягкий аккорд
    voice('sine', hz(ch[0] - 12), tb, bar, 0.07, 0.3); // бас
    const arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24];
    arp.forEach((m, i) => voice('sine', hz(m), tb + i * (bar / 6), 0.9, 0.03, 0.02)); // арпеджио
  }

  let stopped = false;
  return function stop() {
    if (stopped) return;
    stopped = true;
    const t = ctx.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setTargetAtTime(0.0001, t, 0.35);
    setTimeout(() => {
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* уже остановлен */
        }
      });
      out.disconnect();
    }, 1800);
  };
}
