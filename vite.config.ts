import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
    ],
  },
});
