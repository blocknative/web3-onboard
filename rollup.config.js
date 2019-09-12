import svelte from "rollup-plugin-svelte"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import json from "rollup-plugin-json"
import builtins from "rollup-plugin-node-builtins"
// import globals from "rollup-plugin-node-globals"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "src/index.js",
    output: {
      format: "iife",
      name: "onboard",
      file: "dist/iife/bn-onboard.js",
      esModule: false
    },
    plugins: [
      svelte(),
      json(),
      resolve({
        preferBuiltins: true,
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      babel({ exclude: "node_modules/**" }),
      builtins(),
      // globals(),
      terser()
    ]
  },
  {
    input: "src/index.js",
    external: [
      "bowser",
      "bn-sdk",
      "ow",
      "svelte-i18n",
      "svelte",
      "svelte/store",
      "svelte/internal",
      "svelte/transition"
    ],
    plugins: [
      svelte(),
      json(),
      commonjs(),
      babel({ exclude: "node_modules/**" })
    ],
    output: [
      {
        dir: "dist/esm",
        format: "esm"
      },
      {
        dir: "dist/cjs",
        format: "cjs"
      }
    ]
  }
]
