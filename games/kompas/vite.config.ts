import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const shared = new URL('../shared/ns-bridge.js', import.meta.url);
const bridge = existsSync(shared) ? shared : new URL('./bridge/ns-bridge.js', import.meta.url);
const licenses = ['three', 'react', 'react-dom', 'scheduler', 'zod'].map(name =>
  name + '\n' + readFileSync(new URL('./node_modules/' + name + '/LICENSE', import.meta.url), 'utf8')
).join('\n').replaceAll('--', '–');

export default defineConfig({
  base: './',
  plugins: [
    react(),
    { name: 'platform-bridge', transformIndexHtml: { order: 'post', handler(html) {
      return html.replace('<!-- NS bridge -->', '<script>' + readFileSync(bridge, 'utf8') + '</script>\n<!--\n' + licenses + '\n-->');
    }}},
    viteSingleFile(),
  ],
  build: { outDir: '../../web/public/games/kompas', emptyOutDir: true, assetsInlineLimit: 1000000 },
  test: { include: ['tests/**/*.unit.ts'] },
});
