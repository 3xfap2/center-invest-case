import { defineConfig } from '@playwright/test';

// Runs against the production build (`vite preview`). The API is mocked per test with page.route.
export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4310', viewport: { width: 1280, height: 800 } },
  webServer: {
    command: 'npx vite preview --port 4310 --strictPort',
    url: 'http://localhost:4310',
    reuseExistingServer: false,
  },
  projects: [{ name: 'desktop', use: { browserName: 'chromium' } }],
});
