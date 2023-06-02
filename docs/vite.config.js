import { sveltekit } from '@sveltejs/kit/vite'
import icons from 'unplugin-icons/vite'
import kitDocs from '@svelteness/kit-docs/node'
import nodePolyfills from 'rollup-plugin-polyfill-node'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [icons({ compiler: 'svelte' }), kitDocs(), sveltekit()],
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
      plugins: [nodePolyfills({ crypto: true, http: true })]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  define: {
    'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL)
  },
  optimizeDeps: {
    exclude: ['@ethersproject/hash', 'wrtc', 'http', 'react/jsx-runtime'],
    include: [
      '@web3-onboard/core',
      '@web3-onboard/gas',
      '@web3-onboard/sequence',
      'js-sha3',
      '@ethersproject/bignumber'
    ]
  }
}

export default config
