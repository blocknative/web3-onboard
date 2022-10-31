import adapterStatic from '@sveltejs/adapter-static'
import adapterVercel from '@sveltejs/adapter-vercel'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import nodePolyfills from 'rollup-plugin-polyfill-node'
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
          external: [
            '@web3-react/core',
            '@web3-react/eip1193',
            '@web3-react/metamask',
            '@web3-react/network',
            '@web3-react/walletconnect',
            '@web3-react/types',
            '@web3-react/url',
            '@web3-onboard/*',
          ]
        }
      },
      resolve: {
        alias: {
          $fonts: resolve(process.cwd(), 'src/lib/fonts')
        }
      },
      plugins: [
        Icons({ compiler: 'svelte' }),
        kitDocsPlugin({
          shiki: {
            theme: 'material-ocean'
          }
        })
      ],
      define: {
        'import.meta.env.VERCEL': JSON.stringify(process.env.VERCEL)
      },
      optimizeDeps: {
        include: ['@web3-onboard/core']
      }
    }
  }
}

export default config
