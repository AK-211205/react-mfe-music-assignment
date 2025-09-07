import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        music_lib: 'https://react-mfe-music-assignment.vercel.app/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
      }
    })
  ],
  optimizeDeps: { exclude: ['music_lib/MusicLibrary', 'music_lib'] },
  server: { port: 5173 },
  build: { target: 'esnext', modulePreload: false, minify: false, cssCodeSplit: true }
})
