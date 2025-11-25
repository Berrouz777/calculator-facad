import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Для GitHub Pages: если репозиторий называется не "username.github.io",
  // раскомментируйте и укажите имя репозитория:
  // base: '/calculator/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/img'),
      '@ui': path.resolve(__dirname, '../frontend/common/components/ui'),
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
  server: {
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../frontend'),
      ],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

