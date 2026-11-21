// Простая шина событий. bus.on возвращает функцию отписки.
const handlers = new Map();

export const bus = {
  on(evt, fn) {
    if (!handlers.has(evt)) handlers.set(evt, new Set());
    handlers.get(evt).add(fn);
    return () => handlers.get(evt).delete(fn);
  },
  emit(evt, data) {
    const set = handlers.get(evt);
    if (set) [...set].forEach((fn) => fn(data));
  },
};
