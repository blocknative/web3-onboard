// tailwind.config.cjs

const config = require('@svelteness/kit-docs/tailwind.config.cjs')

module.exports = {
  ...config,
  content: [
    'src/**/*.svelte',
    './node_modules/@svelteness/kit-docs/client/kit-docs/**/*.svelte',
    // Add this instead if you're using the default theme.
    "'./node_modules/@svelteness/kit-docs/client/**/*.svelte'"
  ],

  plugins: [...config.plugins, overrides],
  theme: {
    extend: {
      colors: {
        conf: {
          99: '#5aea98',
          95: '#5dea5a',
          90: '#bcea5a',
          80: '#ffe600',
          70: '#eab05a'
        }
      }
    }
  }
}

function overrides() {
  return {
    css: {
      h5: {
        color: '#efefef'
      }
    }
  }
}
