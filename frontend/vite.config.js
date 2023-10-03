import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // target: 'http://localhost:4000', // dev backend server
        target: 'https://mern-auth-backend-server.onrender.com', // prod backend server
        changeOrigin: true,
      },
    },
  },
})
