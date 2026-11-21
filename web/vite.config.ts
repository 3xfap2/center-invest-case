/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The Go server (server/) serves the API under /api/v1. In development it runs on :8080.
const api = { '/api': { target: 'http://localhost:8080', changeOrigin: false } };

export default defineConfig({
  // Absolute base: the site has real paths like /play/glitch, and games live under /games/<id>/.
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { proxy: api },
  preview: { proxy: api },
  test: { environment: 'node', include: ['tests/**/*.test.ts'] },
});
