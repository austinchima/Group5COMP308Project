import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      remotes: {
        mfe_auth: 'http://localhost:5174/assets/remoteEntry.js',
        mfe_community: 'http://localhost:5175/assets/remoteEntry.js',
        mfe_events: 'http://localhost:5176/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
  },
  server: {
    port: 5173,
  },
});
