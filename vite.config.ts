import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Для GitHub Pages: так как репозиторий называется "calculator-facad"
  base: '/calculator-facad/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/img'),
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

