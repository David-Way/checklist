import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/checklist',
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
})
