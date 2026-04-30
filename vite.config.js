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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'router'
            if (id.includes('react-dom') || id.includes('react')) return 'react-vendor'
            return 'vendor'
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})