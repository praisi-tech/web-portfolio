import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase warning threshold slightly — our per-page chunks are fine
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Vendor: React runtime (always needed first) ──────────────────
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react';
          }
          // ── Vendor: Framer Motion animation library ───────────────────────
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // ── Vendor: Lucide icon library ───────────────────────────────────
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // ── Vendor: jsPDF + html2canvas — only downloaded on cert claim ──
          if (
            id.includes('node_modules/jspdf') ||
            id.includes('node_modules/html2canvas')
          ) {
            return 'vendor-pdf';
          }
          // ── Vendor: DOMPurify (security sanitization) ─────────────────────
          if (id.includes('node_modules/dompurify')) {
            return 'vendor-purify';
          }
        },
      },
    },
  },
})
