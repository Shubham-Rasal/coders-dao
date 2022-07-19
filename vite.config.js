import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
  plugins: [react()],
  base: '/coders-dao/',
})
