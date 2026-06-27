import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime — always loaded first
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          // Animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // Icon library
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // Heavy PDF/canvas libs — only loaded when certificate page is visited
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas')) {
            return 'vendor-pdf';
          }
        },
      },
    },
  },
})

