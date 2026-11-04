import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base URL for repository tu-tien-online
  base: process.env.NODE_ENV === 'production' ? '/tu-tien-online/' : '/',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    open: true,
  },
});

