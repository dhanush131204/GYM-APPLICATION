import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // STRICT REQUIREMENT: Abort build if VITE_API_BASE_URL is missing in production
  if (mode === 'production' && !env.VITE_API_BASE_URL) {
    throw new Error("FATAL ERROR: VITE_API_BASE_URL is undefined. Build aborted.");
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
  }
})






