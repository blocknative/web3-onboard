import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: {
    format: 'esm',
    dir: 'dist/',
    sourcemap: true
  },
  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production),
      preventAssignment: true
    }),
    resolve({
      browser: true
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    })
  ],
  external: ['joi', 'rxjs', '@ethereumjs/common', 'ethers']
}
