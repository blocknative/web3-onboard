import adapterStatic from '@sveltejs/adapter-static'
import adapterVercel from '@sveltejs/adapter-vercel'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

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
