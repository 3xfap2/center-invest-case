import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  base: './', // относительные пути: игра открывается и в iframe сайта, и отдельно
  server: {
    host: true, // доступ с телефона по Wi-Fi
    fs: { allow: [here('..')] }, // общий мост лежит в games/shared
  },
  build: {
    target: 'es2020',
    outDir: here('../../web/public/games/glitch'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
  },
});
