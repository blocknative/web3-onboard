import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from 'rollup-plugin-img'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import builtins from '@joseph184/rollup-plugin-node-builtins'
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
  moduleContext: id => {
    const thisAsWindowForModules = [
      'node_modules/intl-messageformat/lib/core.js',
      'node_modules/intl-messageformat/lib/compiler.js'
    ]

    if (thisAsWindowForModules.some(id_ => id.trimRight().endsWith(id_))) {
      return 'window'
    }
  },
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
    typescript()
  ],
  external: [
    'bowser',
    'bnc-sdk',
    'bignumber.js',
    'promise-cancelable',
    '@portis/web3',
    '@walletconnect/web3-provider',
    'fortmatic',
    'squarelink',
    'authereum',
    'regenerator-runtime/runtime'
  ]
}
