// Полноэкранный режим для телефона. Работает только по нажатию игрока.
// iPhone (Safari) не даёт сайтам полный экран: там помогает «На экран Домой».
// Внутри сайта команды нужен iframe с allow="fullscreen", иначе браузер запретит.

export function canFullscreen() {
  return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
}

export function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

export async function enterFullscreen() {
  if (!canFullscreen() || isFullscreen()) return false;
  const el = document.documentElement;
  try {
    if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' });
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  } catch {
    return false;
  }
  // Повернуть экран горизонтально, где браузер это разрешает (Android в полном экране).
  try {
    await screen.orientation?.lock?.('landscape');
  } catch {
    /* не поддерживается: подскажет экран «Поверни телефон» */
  }
  return true;
}

export function onFullscreenChange(fn) {
  document.addEventListener('fullscreenchange', fn);
  document.addEventListener('webkitfullscreenchange', fn);
}
