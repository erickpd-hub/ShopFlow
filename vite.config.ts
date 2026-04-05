import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      'next/link': path.resolve(__dirname, './src/shims/next-link.tsx'),
      'next/image': path.resolve(__dirname, './src/shims/next-image.tsx'),
      'next/font/google': path.resolve(__dirname, './src/shims/next-font.tsx'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  }
});
