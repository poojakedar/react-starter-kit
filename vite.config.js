import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-starter-kit/',
  plugins: [react()],
  resolve: {
    // Set up path aliases so imports like '@/components/Button' resolve to src/components/Button
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open the browser on dev server start
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps for production debugging
  },
})
