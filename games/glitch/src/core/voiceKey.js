// Ключ файла озвучки: хэш «кто + текст». Один и тот же код в игре и в скрипте генерации,
// поэтому после правки текста реплики старая озвучка просто не найдётся (а npm test это покажет).
export const VOICED = ['irina', 'timur', 'lis'];

export function voiceKey(who, text) {
  let h = 0x811c9dc5; // FNV-1a, 32 бита
  const s = `${who}|${text}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${who}-${h.toString(16).padStart(8, '0')}`;
}
