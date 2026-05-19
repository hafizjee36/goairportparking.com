import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['7ed5f9104337.ngrok-free.app'],
    host: true,
  },
  build: {

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        // Simpler code splitting
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        }
      }
    },
    cssCodeSplit: true,
    minify: 'esbuild', // Use esbuild instead of terser - faster and safer
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material'],
  },
})
