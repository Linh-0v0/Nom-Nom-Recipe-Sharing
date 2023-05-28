import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    optimizeDeps: {
      include: ['axios', 'lodash'] 
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      main: path.resolve(__dirname, 'src/index.html') 
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://nom-nom-recipe-web-be.herokuapp.com',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': 'https://nomnomrecipe.netlify.app/',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    }
  }
})
