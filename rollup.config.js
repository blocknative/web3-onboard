import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
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
      format: 'esm',
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
        importee === 'svelte' || importee.startsWith('svelte/'),
      preferBuiltins: true
    }),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true
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
    '@toruslabs/torus-embed',
    'regenerator-runtime/runtime',
    'trezor-connect',
    'ethereumjs-tx',
    '@ledgerhq/hw-transport-u2f',
    '@ledgerhq/hw-app-eth',
    'util',
    'assert',
    'buffer',
    'stream',
    'web3-provider-engine',
    'web3-provider-engine/subproviders/hooked-wallet',
    'web3-provider-engine/subproviders/rpc',
    'web3-provider-engine/subproviders/subscriptions',
    'web3-provider-engine/subproviders/filters'
  ]
}
