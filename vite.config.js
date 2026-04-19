import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), react()
  ],
  server: {
    port: 5173,
    proxy: {
      // All /api/* requests forwarded to backend at localhost:8000
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('❌ Proxy error:', err.message);
          });
          proxy.on('proxyReq', (_, req) => {
            console.log('🔀 Proxying:', req.method, req.url, '→ localhost:8000');
          });
        },
      },
    },
  },
})