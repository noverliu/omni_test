import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseURL = mode === 'production' ? '' : 'http://localhost:8000';
  return {
    define: {
      baseURL: JSON.stringify('http://localhost:8000')
    },
    plugins: [react()]
  };
})
