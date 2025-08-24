import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// Vite Configuration
export default defineConfig({
  plugins: [vue()],

  // Aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },

  // Define environment variables
  define: {
    'process.env': process.env,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  // Local dev server
  server: {
    port: 5173,
    open: true,
  },
})
