import { sveltekit } from '@sveltejs/kit/vite'
import inject from '@rollup/plugin-inject'
import commonjs from '@rollup/plugin-commonjs';

import type { UserConfig } from 'vite'
import nodePolyfills from 'rollup-plugin-polyfill-node'

// yarn add --dev @esbuild-plugins/node-globals-polyfill
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// For further build env configs and troubleshooting
// checkout our official docs [here](https://onboard.blocknative.com/docs/modules/core#sveltekit-vite)

const MODE = process.env.NODE_ENV
const development = MODE === 'development'

/** @type {import('@sveltejs/kit').Config} */

const config: UserConfig = {
  plugins: [
    sveltekit(),
    commonjs({
      include: /node_modules/ // Only transpile CommonJS modules from node_modules
    }),
    development &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js'), 'http', 'crypto', 'buffer']
      })
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      zlib: 'browserify-zlib',
    }
  },
  build: {
    rollupOptions: {
      external: ['@web3-onboard/*'],
      plugins: [
        nodePolyfills({ include: ['crypto', 'http'] }),
        inject({ Buffer: ['Buffer', 'Buffer'] })
      ]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    exclude: ['@ethersproject/hash', 'wrtc', 'http'],
    include: ['@web3-onboard/core', 'js-sha3', '@ethersproject/bignumber'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  define: {
    global: 'window'
  }
}

export default config