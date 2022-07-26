import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import copy from '@rollup-extras/plugin-copy'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: {
    format: 'es',
    dir: 'dist/',
    sourcemap: true,
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production),
      preventAssignment: true
    }),
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        dev: !production
      },
      emitCss: false
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    copy({
      src: 'src/i18n/en.json',
      dest: 'i18n'
    }),
    production && terser({
      ecma: 2020,
      mangle: { toplevel: true },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: production,
        drop_debugger: production
      },
      output: { quote_style: 1 }
    })
  ],
  external: [
    '@web3-onboard/common',
    'ethers',
    'bowser',
    'joi',
    'rxjs',
    'rxjs/operators',
    'svelte-i18n',
    'svelte/store',
    'lodash.merge',
    'lodash.partition',
    'eventemitter3',
    'bignumber.js',
    'bnc-sdk',
    'nanoid'
  ]
}
