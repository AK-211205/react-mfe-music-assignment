import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'music_lib',
      filename: 'remoteEntry.js',
      exposes: { './MusicLibrary': './src/MusicLibrary.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
      }
    })
  ],
  server: {
    host: true,            // bind on all interfaces (avoids localhost/IPv6 quirks)
    port: 5174,
    cors: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: true
  }
})
