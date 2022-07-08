import { build } from 'esbuild'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { dependencies } = require('./package.json')

const entryFile = 'src/index.ts'
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  platform: 'browser'
}

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js'
})
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1))
