import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import copy from '@rollup-extras/plugin-copy'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: {
    format: 'es',
    dir: 'dist/',
    sourcemap: true
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production),
      preventAssignment: true
    }),
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        typescript: {
          tsconfigFile: './tsconfig.json'
        },
        postcss: true
      }),
      compilerOptions: {
        dev: !production
      },
      emitCss: false
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: ['.js', '.ts', '.svelte']
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
      exclude: ['node_modules/**']
    }),
    copy({
      src: 'src/i18n/en.json',
      dest: 'i18n'
    }),
  ],
  external: [
    '@web3-onboard/common',
    'bowser',
    'joi',
    'rxjs',
    'rxjs/operators',
    'svelte-i18n',
    'svelte/store',
    'lodash.merge',
    'lodash.partition',
    'eventemitter3',
    'bnc-sdk',
    'nanoid',
    '@unstoppabledomains/resolution',
    'viem'
  ]
}
