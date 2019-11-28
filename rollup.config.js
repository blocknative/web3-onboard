import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from 'rollup-plugin-img'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

import {
  preprocess,
  createEnv,
  readConfigFile
} from '@pyoner/svelte-ts-preprocess'

const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
}

export default {
  input: 'src/onboard.ts',
  output: [
    {
      format: 'es',
      dir: 'dist/esm/'
    },
    { format: 'cjs', dir: 'dist/cjs/' }
  ],
  plugins: [
    json(),
    image(),
    svelte({
      preprocess: preprocess(opts)
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    typescript({
      clean: true
    })
  ],
  external: [
    'bowser',
    'bnc-sdk',
    'bignumber.js',
    '@portis/web3',
    '@walletconnect/web3-provider',
    'fortmatic',
    'squarelink',
    'authereum',
    'lodash.debounce',
    'regenerator-runtime/runtime'
  ]
}
