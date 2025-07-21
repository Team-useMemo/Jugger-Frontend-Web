import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/Jugger-Frontend-Web/', // ← 여기에 GitHub 저장소 이름!
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: [
      { find: '@ts', replacement: '/src/ts' },
      { find: '@base', replacement: '/src/base' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@router', replacement: '/src/router' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@common', replacement: '/src/common' },
      { find: '@recoils', replacement: '/src/recoils' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@controllers', replacement: '/src/controllers' },
      { find: '@components', replacement: '/src/components' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@stores', replacement: '/src/stores' },
    ],
  },
});
