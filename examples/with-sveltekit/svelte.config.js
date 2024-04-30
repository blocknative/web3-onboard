import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

// For further build env configs and troubleshooting
// checkout our official docs [here](https://onboard.blocknative.com/docs/modules/core#sveltekit-vite)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter()
  },

  build: {
    rollupOptions: {
      external: ['buffer']
    }
  }
}

export default config
