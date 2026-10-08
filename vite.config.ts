import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2d-game-library-benchmark/'
, plugins: [
    react()
  , wasm()
  ]
, resolve: {
    tsconfigPaths: true
  }
, optimizeDeps: {
    exclude: [
      'box2d-wasm'
    , '@dimforge/rapier2d'
    ]
  }
})
