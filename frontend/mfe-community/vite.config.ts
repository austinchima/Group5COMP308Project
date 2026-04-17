import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfe_community',
      filename: 'remoteEntry.js',
      exposes: {
        './Feed': './src/components/Feed.tsx',
        './Help': './src/components/Help.tsx',
        './Business': './src/components/Business.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5175,
  },
  preview: {
    port: 5175,
  },
});
