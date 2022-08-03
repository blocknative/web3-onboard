import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: {
    format: 'esm',
    dir: 'dist/',
    sourcemap: true,
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production),
      preventAssignment: true
    }),
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        dev: !production
      },
      emitCss: false
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    production && terser({
      ecma: 2017,
      mangle: { toplevel: true },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: production,
        drop_debugger: production
      },
      output: { quote_style: 1 }
    })
  ],
  external: ['joi', 'rxjs', 'ethers', 'bignumber.js']
}
