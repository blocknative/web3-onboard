import { sveltekit } from '@sveltejs/kit/vite'
import icons from 'unplugin-icons/vite'
import kitDocs from '@svelteness/kit-docs/node'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [react(), icons({ compiler: 'svelte' }), kitDocs(), sveltekit(), nodePolyfills()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      zlib: 'browserify-zlib',
      http: 'stream-http'
    }
  },
  build: {
    rollupOptions: {
      external: ['@web3-onboard/*'],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  define: {
    'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL),
    'process.env.NODE_DEBUG': JSON.stringify('')
  },
  optimizeDeps: {
    exclude: ['@ethersproject/hash', 'wrtc', 'http', 'react/jsx-runtime'],
    include: [
      '@web3-onboard/core',
      '@web3-onboard/gas',
      '@web3-onboard/ledger',
      '@web3-onboard/uauth',
      '@web3-onboard/walletconnect',
      '@web3-onboard/sequence',
      'js-sha3',
      '@ethersproject/bignumber'
    ]
  }
}

export default config
