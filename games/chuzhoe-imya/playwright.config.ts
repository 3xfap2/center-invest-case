import { defineConfig } from '@playwright/test'

const browser = process.env.CHUZHOE_BROWSER_CHANNEL

export default defineConfig({
  testDir: 'tests',
  testMatch: '*.spec.ts',
  timeout: 360_000,
  expect: { timeout: 8_000 },
  workers: 1,
  use: {
    actionTimeout: 8_000,
    viewport: { width: 1440, height: 900 },
    channel: browser,
    launchOptions: { args: ['--enable-webgl', '--enable-unsafe-swiftshader'] },
  },
})
