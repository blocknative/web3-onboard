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

  plugins: [...config.plugins, overrides]
}

function overrides(theme) {
  return {
    css: {
      h5: {
        color: '#efefef'
      }
    }
  }
}
