import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dynamic base based on build mode
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  base: mode === 'github' ? '/Portfolio-Ashutosh/' : '/', // Switch automatically
}))
