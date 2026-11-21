import { defineConfig } from '@playwright/test'

const executablePath = process.env.DYM_BROWSER
const graphics = {
  native: [],
  d3d11: ['--enable-gpu', '--use-angle=d3d11', '--disable-software-rasterizer'],
  software: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
}
const mode = process.env.DYM_GPU as keyof typeof graphics | undefined

export default defineConfig({
  testDir: './tests', testMatch: '*.spec.ts', timeout: 100_000, workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4347', viewport: { width: 1280, height: 720 },
    launchOptions: {
      executablePath,
      args: graphics[mode ?? 'software'] ?? graphics.software,
    },
  },
  webServer: {
    command: 'npm run preview -- --port 4347 --strictPort',
    url: 'http://127.0.0.1:4347',
    reuseExistingServer: !process.env.CI,
  },
})
