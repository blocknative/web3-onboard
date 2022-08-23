import adapter from '@sveltejs/adapter-static'
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
      
      optimizeDeps: {
        include: ['@web3-onboard/core']
      }
    }
  }
}

export default config
