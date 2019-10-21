import svelte from "rollup-plugin-svelte"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import globals from "rollup-plugin-node-globals"
import json from "rollup-plugin-json"
import image from "rollup-plugin-img"
import builtins from "@joseph184/rollup-plugin-node-builtins"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "src/index.js",
    output: {
      format: "iife",
      name: "onboard",
      file: "dist/iife/onboard.js",
      esModule: false
    },
    plugins: [
      image(),
      json(),
      svelte(),
      resolve({
        preferBuiltins: true,
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      globals(),
      babel({ exclude: "node_modules/**" }),
      builtins(),
      terser()
    ]
  },
  {
    input: "src/index.js",
    external: [
      "bowser",
      "bnc-sdk",
      "bignumber.js",
      "svelte-i18n",
      "svelte",
      "svelte/store",
      "svelte/internal",
      "svelte/transition",
      "promise-cancelable",
      "regenerator-runtime/runtime",
      "@portis/web3",
      "@walletconnect/web3-provider",
      "fortmatic"
    ],
    plugins: [
      svelte(),
      json(),
      image(),
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
