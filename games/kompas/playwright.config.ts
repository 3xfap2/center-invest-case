import { defineConfig } from '@playwright/test';



export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.smoke.ts',
  workers: 1,
  timeout: 90000,
  use: {
    baseURL: 'http://127.0.0.1:4183',
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      executablePath: process.env.KOMPAS_BROWSER || undefined,
      args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4183 --strictPort',
    url: 'http://127.0.0.1:4183',
    timeout: 20000,
    reuseExistingServer: !process.env.CI,
  },
});
