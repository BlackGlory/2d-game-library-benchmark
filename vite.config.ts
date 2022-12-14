import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2d-game-library-benchmark/'
, plugins: [
    react()
  , tsconfigPaths()
  , wasm()
  , topLevelAwait()
  ]
, optimizeDeps: {
    exclude: [
      'box2d-wasm'
    , '@dimforge/rapier2d'
    ]
  }
})
