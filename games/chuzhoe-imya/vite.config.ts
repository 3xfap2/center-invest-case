import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const sharedBridge = new URL('../shared/ns-bridge.js', import.meta.url)
const libraries = ['three', 'react', 'react-dom', 'lucide-react', 'zod', '@fontsource-variable/inter']

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glb'],
  plugins: [
    react(),
    {
      name: 'platform-bridge-and-licenses',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          const notices = libraries.map(name =>
            name + '\n' + readFileSync(new URL('./node_modules/' + name + '/LICENSE', import.meta.url), 'utf8').trim())
          return {
            html: html + '\n<!--\n' + notices.join('\n\n').replaceAll('-->', '--&gt;') + '\n-->\n',
            tags: [{ tag: 'script', children: readFileSync(sharedBridge, 'utf8'), injectTo: 'head-prepend' }],
          }
        },
      },
    },
    viteSingleFile(),
  ],
  build: {
    outDir: fileURLToPath(new URL('../../web/public/games/chuzhoe-imya', import.meta.url)),
    emptyOutDir: true,
    reportCompressedSize: true,
  },
})
