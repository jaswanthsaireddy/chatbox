import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/chatbox/',
  build: {
    outDir: 'dist', // Specify the output folder as 'dist'
  },
})
