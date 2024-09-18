import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,  //odstraneni CORS errors
    proxy: {
      "/api": {
        target: "htpp://localhost:5000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
