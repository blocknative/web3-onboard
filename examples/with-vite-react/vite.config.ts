import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ['@ethersproject/hash',],
    include: ['js-sha3', '@ethersproject/bignumber']
  }
})
