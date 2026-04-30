import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],

  server: {
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 5173,
    },
    watch: {
      usePolling: true,
    },
    headers: {},
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})