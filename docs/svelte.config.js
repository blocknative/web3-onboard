import adapterStatic from '@sveltejs/adapter-static'
// import adapterVercel from '@sveltejs/adapter-vercel'
import { kitDocsPlugin } from '@svelteness/kit-docs/node'
import Icons from 'unplugin-icons/vite'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess({
      postcss: true
    })
  ],
  kit: {
    adapter: adapterStatic(),
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
      optimizeDeps: {
        exclude: ['@web3-react/*', '@web3-react/core'],
        include: ['@web3-onboard/core', '@uniswap/widgets']
      }
    }
  }
}

export default config
