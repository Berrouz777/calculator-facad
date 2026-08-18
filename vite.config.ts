import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // GitHub Pages: /calculator-facad/ (задаётся в Actions)
  // Netlify и локально: /
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/shared/_variables.scss" as *;
          @use "@styles/shared/_functions.scss" as *;
          @use "@styles/shared/_mixins.scss" as *;
        `,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

