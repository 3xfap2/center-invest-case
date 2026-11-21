// Состояние прохождения. Сохранениями управляет сайт (через platform), без сайта: localStorage.
import { bus } from './events.js';
import { platform } from './platform.js';
import { ACTION_TEXT } from '../content/actions.js';

const KEY = 'glitch_save_v1';
const LOG_LIMIT = 40;

// Сложность меняет реальные числа: подсказки, время смены, строгость проверки отчётов.
// Глава 1 рассчитана примерно на 8 минут. Подсказки Ирины без ограничений на лёгкой и обычной сложности.
// По контракту команды hard = меньше времени и без подсказок.
export const DIFFICULTY = {
  easy: {
    id: 'easy',
    label: 'Лёгкая',
    note: 'Ромб показывает путь, Ирина подсказывает сама, больше времени',
    hints: Infinity,
    autoHints: true,
    autoHintDelay: 12, // секунд на одном шаге до подсказки в чате
    markers: true, // жёлтый ромб над целью
    strict: false,
    shiftSec: 15 * 60, // время смены: уложился, получил звезду
    shiftSec2: 18 * 60, // то же для главы 2
    rowsNeeded: 4, // сколько строк таблицы сравнения нужно в главе 2
    mistakesForStar: 2, // сколько отчётов можно вернуть без потери звезды
  },
  normal: {
    id: 'normal',
    label: 'Обычная',
    note: 'Ромб показывает путь, подсказки Ирины без ограничений',
    hints: Infinity,
    autoHints: true,
    autoHintDelay: 30,
    markers: true,
    strict: false,
    shiftSec: 10 * 60,
    shiftSec2: 13 * 60,
    rowsNeeded: 4,
    mistakesForStar: 1,
  },
  hard: {
    id: 'hard',
    label: 'Сложная',
    note: 'Без ромба и подсказок, меньше времени, шаги в отчёте без лишнего',
    hints: 0,
    autoHints: false,
    autoHintDelay: 0,
    markers: false,
    strict: true,
    shiftSec: 7 * 60,
    shiftSec2: 9 * 60,
    rowsNeeded: 5,
    mistakesForStar: 0,
  },
};

export const game = { state: null, platformFlags: {}, muted: false };

export function newGame(name, difficulty) {
  game.state = {
    v: 1,
    chapter: 1,
    name,
    difficulty: DIFFICULTY[difficulty] ? difficulty : 'normal',
    scene: 'office',
    pos: null, // {x, z, yaw}
    flags: {}, // завершённые события главы
    decisions: {}, // решения, которые важны для следующих глав (см. docs/FLAGS.md)
    log: [], // {id, text, t, foreign}
    reports: [],
    evidence: {},
    chat: [],
    hintsUsed: 0,
    mistakes: 0, // отчёты, возвращённые на доработку или отклонённые
    playTime: 0, // секунды активной игры
    achievements: {},
    startedAt: Date.now(),
  };
  save();
  return game.state;
}

// Принять сохранение от сайта. Имя и сложность берём из init.
export function restoreGame(data, name, difficulty) {
  if (!data || data.v !== 1 || ![1, 2].includes(data.chapter)) return null;
  game.state = {
    decisions: {},
    mistakes: 0,
    playTime: 0,
    achievements: {},
    hintsUsed: 0,
    ...data,
    name,
    difficulty: DIFFICULTY[difficulty] ? difficulty : data.difficulty || 'normal',
  };
  return game.state;
}

// Переход к главе 2: события главы 1 уходят в prev[1], общая история (решения, улики,
// отчёты, журнал, чат, достижения) остаётся. Время, ошибки и подсказки считаются заново.
export function beginChapter2() {
  const s = game.state;
  s.prev = s.prev || {};
  s.prev[1] = { flags: s.flags, ending: s.ending || null, playTime: s.playTime || 0, mistakes: s.mistakes || 0, hintsUsed: s.hintsUsed || 0 };
  s.chapter = 2;
  s.flags = {};
  s.scene = 'diagnostic';
  s.pos = null;
  s.playTime = 0;
  s.mistakes = 0;
  s.hintsUsed = 0;
  s.ending = null;
  s.ch2 = { build: '0.9.7', obs: {}, hasSwitcher: false };
  save();
  return s;
}

export function diff() {
  return DIFFICULTY[game.state?.difficulty] || DIFFICULTY.normal;
}

// checkpoint: false — только локальная запись позиции, сайту не отправляем.
export function save(checkpoint = true) {
  if (!game.state) return;
  if (platform.standalone) {
    try {
      localStorage.setItem(KEY, JSON.stringify(game.state));
    } catch {
      /* приватный режим браузера: играем без сохранения */
    }
  }
  if (checkpoint) platform.save(game.state);
}

export function loadLocalSave() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.v === 1) return s;
  } catch {
    /* повреждённое сохранение игнорируем */
  }
  return null;
}

export function clearLocalSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function flag(k) {
  return !!game.state?.flags[k];
}

export function setFlag(k, v = true) {
  if (game.state.flags[k] === v) return;
  game.state.flags[k] = v;
  bus.emit('flag', { k, v });
  save();
}

// Решение, важное для следующих глав: пишем в сохранение и отправляем сайту.
export function decide(key, value) {
  if (game.state.decisions[key] === value) return;
  game.state.decisions[key] = value;
  platform.flag(key, value);
  save();
}

export function unlock(id) {
  if (game.state.achievements[id]) return false;
  game.state.achievements[id] = true;
  platform.achievement(id);
  bus.emit('achievement', id);
  save();
  return true;
}

export function logAction(id, { foreign = false, text } = {}) {
  const entry = { id, text: text || ACTION_TEXT[id] || id, t: Date.now(), foreign };
  game.state.log.push(entry);
  if (game.state.log.length > LOG_LIMIT) game.state.log.shift();
  bus.emit('log', entry);
  save(false);
  return entry;
}

export function addEvidence(id) {
  if (game.state.evidence[id]) return false;
  game.state.evidence[id] = true;
  bus.emit('evidence', id);
  save();
  return true;
}

export function pushChat(from, text) {
  const msg = { from, text, t: Date.now() };
  game.state.chat.push(msg);
  if (game.state.chat.length > 60) game.state.chat.shift();
  bus.emit('chat', msg);
  save(false);
  return msg;
}
