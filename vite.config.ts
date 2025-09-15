import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet l'accès depuis d'autres appareils du réseau
    port: 5173
  },
  preview: {
    host: '0.0.0.0', // Pour le mode preview aussi
    port: 4173
  }
})
