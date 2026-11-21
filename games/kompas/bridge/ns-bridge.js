// ns-bridge.js — the only file a game needs to talk to the site (docs/GAME_CONTRACT.md).
// Both games use this exact file. Do not change it without the team's agreement.
const NS = { onInit: null, standalone: window.parent === window };
const send = (type, p = {}) => !NS.standalone && window.parent.postMessage({ ns: 1, type, ...p }, location.origin);
window.addEventListener('message', (e) => {
  if (e.origin !== location.origin || e.data?.ns !== 1) return;
  if (e.data.type === 'init') NS.onInit?.(e.data);
  else NS[e.data.type]?.(e.data); // pause / resume / mute handlers, if the game sets them
});
NS.ready = (gameId, version) => {
  send('ready', { gameId, version });
  if (NS.standalone) setTimeout(() => NS.onInit?.({ playerId: 'dev', nickname: 'Тест', difficulty: 'normal', save: null, flags: {}, muted: false }), 0);
};
NS.save = (data) => send('save', { data });
NS.flag = (key, value) => send('flag', { key, value });
NS.progress = (step, percent) => send('progress', { step, percent });
NS.achievement = (id) => send('achievement', { id });
NS.end = (r) => send('end', r);
NS.exit = () => send('exit');
window.NS = NS;
