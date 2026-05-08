import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src/frontend-react',
  plugins: [react()],
  server: { port: 5173 }
})