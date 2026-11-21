import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'dym-platform',
      transformIndexHtml: {
        order: 'post',
        handler(html, context) {
          const bridge = readFileSync(new URL('../shared/ns-bridge.js', import.meta.url), 'utf8')
          if (!context.bundle) return { html, tags: [{ tag: 'script', children: bridge, injectTo: 'head-prepend' }] }
          const notices = ['three', 'react', 'react-dom', 'zod'].map(name =>
            name + '\n' + readFileSync(new URL('./node_modules/' + name + '/LICENSE', import.meta.url), 'utf8').trim())
          return {
            html: html + '\n<!--\n' + notices.join('\n\n').replaceAll('-->', '--&gt;') + '\n-->\n',
            tags: [{ tag: 'script', children: bridge, injectTo: 'head-prepend' }],
          }
        },
      },
    },
    viteSingleFile(),
  ],
  build: {
    outDir: fileURLToPath(new URL('../../web/public/games/dym', import.meta.url)),
    emptyOutDir: true,
  },
})
