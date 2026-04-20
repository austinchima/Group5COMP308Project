import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: {
          mfe_auth: env.VITE_MFE_AUTH_URL || 'http://localhost:5174/assets/remoteEntry.js',
          mfe_community: env.VITE_MFE_COMMUNITY_URL || 'http://localhost:5175/assets/remoteEntry.js',
          mfe_events: env.VITE_MFE_EVENTS_URL || 'http://localhost:5176/assets/remoteEntry.js',
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
  };
});
