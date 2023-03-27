import adapterStatic from '@sveltejs/adapter-static'
import adapterVercel from '@sveltejs/adapter-vercel'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

const MODE = process.env.NODE_ENV

const development = MODE === 'development'

const { adapter, adapterName } = process.env.VERCEL
  ? { adapter: adapterVercel, adapterName: 'vercel' }
  : { adapter: adapterStatic, adapterName: 'static' }

console.log(`Using ${adapterName} adapter`)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
      entries: ['*']
    },
    vite: {
      build: {
        rollupOptions: {
          external: ['@web3-onboard/*'],
          plugins: [
            nodePolyfills({
              assert: true,
              buffer: true,
              crypto: true,
              http: true,
              https: true,
              os: true,
              process: true,
              stream: true,
              util: true
            })
          ]
        },
        target: 'es2020',
        commonjsOptions: {
          transformMixedEsModules: true
        }
      },
      resolve: {
        alias: {
          $fonts: resolve(process.cwd(), 'src/lib/fonts'),
          assert: 'assert',
          buffer: 'buffer',
          crypto: 'crypto-browserify',
          http: 'stream-http',
          https: 'https-browserify',
          os: 'os-browserify/browser',
          process: 'process/browser',
          stream: 'stream-browserify',
          util: 'util'
        }
      },
      plugins: [
        Icons({ compiler: 'svelte' }),
        kitDocsPlugin({
          shiki: {
            theme: 'material-ocean'
          }
        }),
        development &&
          nodePolyfills({
            include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
            http: true,
            crypto: true
          })
      ],
      define: {
        'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL)
      },
      optimizeDeps: {
        exclude: ['@ethersproject/hash', 'wrtc', 'http'],
        include: [
          '@web3-onboard/core',
          '@web3-onboard/gas',
          '@web3-onboard/sequence',
          'js-sha3',
          '@ethersproject/bignumber'
        ],
        esbuildOptions: {
          target: 'es2020',
          supported: { bigint: true },
          plugins: [NodeModulesPolyfillPlugin()]
        }
      }
    }
  }
}

export default config
