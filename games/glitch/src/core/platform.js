// Связь с сайтом команды через ns-bridge.js (контракт: docs/GAME_CONTRACT.md в корне репозитория).
import '../../../shared/ns-bridge.js'; // общий мост команды, не менять

export const GAME_ID = 'glitch';
export const VERSION = '0.1.0';
const MAX_SAVE = 64 * 1024;

const NS = window.NS;
let saveTimer = null;
let lastProgress = -1;

export const platform = {
  standalone: NS.standalone,

  // Сообщить сайту о готовности и дождаться init.
  waitInit() {
    return new Promise((resolve) => {
      NS.onInit = (data) => resolve(data);
      NS.ready(GAME_ID, VERSION);
    });
  },

  // Обработчики команд сайта: pause / resume / mute.
  onCommand({ pause, resume, mute }) {
    NS.pause = () => pause?.();
    NS.resume = () => resume?.();
    NS.mute = (d) => mute?.(!!d?.muted);
  },

  // Сохранение на контрольной точке. Отправка с задержкой, чтобы не слать пачку подряд.
  save(state) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => NS.save(fitSave(state)), 400);
  },
  saveNow(state) {
    clearTimeout(saveTimer);
    NS.save(fitSave(state));
  },

  flag(key, value) {
    NS.flag(key, value);
  },

  // Прогресс отправляем только вперёд.
  progress(step, percent) {
    if (percent <= lastProgress) return;
    lastProgress = percent;
    NS.progress(step, percent);
  },
  resetProgress() {
    lastProgress = -1;
  },

  achievement(id) {
    NS.achievement(id);
  },
  end(result) {
    NS.end(result);
  },
  exit() {
    NS.exit();
  },
};

// Сохранение не больше 64 КБ: при необходимости укорачиваем журнал и чат.
function fitSave(state) {
  let data = JSON.parse(JSON.stringify(state));
  let size = JSON.stringify(data).length;
  while (size > MAX_SAVE && (data.log.length > 5 || data.chat.length > 5)) {
    data.log = data.log.slice(Math.floor(data.log.length / 2));
    data.chat = data.chat.slice(Math.floor(data.chat.length / 2));
    size = JSON.stringify(data).length;
  }
  return data;
}
