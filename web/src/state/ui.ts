import { create } from 'zustand';
import { publicGames } from '../games/catalog';

/** The game picked on the landing page. It sets the scene and the accent colour across the site. */
const first = () => {
  const list = publicGames(false);
  return (list.find((g) => g.available) ?? list[0]).id;
};

export const useUi = create<{ selected: string; select: (id: string) => void }>((set) => ({
  selected: first(),
  select: (id) => set((s) => (s.selected === id ? s : { selected: id })),
}));
