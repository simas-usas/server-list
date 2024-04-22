/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, './src/components/'),
      '#pages': path.resolve(__dirname, './src/pages/'),
      '#api': path.resolve(__dirname, './src/api/'),
      '#contexts': path.resolve(__dirname, './src/contexts/'),
      '#assets': path.resolve(__dirname, './src/assets/'),
      '#vite': path.resolve(__dirname, './src/vite.d.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
  },
});
