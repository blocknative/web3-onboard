import svelte from "rollup-plugin-svelte"
import resolve from "rollup-plugin-node-resolve"
import json from "@rollup/plugin-json"
import image from "rollup-plugin-img"
import commonjs from "rollup-plugin-commonjs"
import globals from "rollup-plugin-node-globals"
import builtins from "@joseph184/rollup-plugin-node-builtins"
import typescript from "rollup-plugin-typescript2"

import {
  preprocess,
  createEnv,
  readConfigFile
} from "@pyoner/svelte-ts-preprocess"

const env = createEnv()
const compilerOptions = readConfigFile(env)
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
}

export default [
  {
    input: "src/onboard.ts",
    output: {
      format: "umd",
      name: "onboard",
      file: "dist/onboard.umd.js"
    },
    moduleContext: id => {
      const thisAsWindowForModules = [
        "node_modules/intl-messageformat/lib/core.js",
        "node_modules/intl-messageformat/lib/compiler.js"
      ]

      if (thisAsWindowForModules.some(id_ => id.trimRight().endsWith(id_))) {
        return "window"
      }
    },
    plugins: [
      image(),
      json(),
      svelte({
        preprocess: preprocess(opts)
      }),
      resolve({
        browser: true,
        preferBuiltins: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      globals(),
      builtins(),
      typescript()
    ]
  },
  {
    input: "src/onboard.ts",
    output: {
      format: "es",
      file: "dist/onboard.esm.js"
    },
    moduleContext: id => {
      const thisAsWindowForModules = [
        "node_modules/intl-messageformat/lib/core.js",
        "node_modules/intl-messageformat/lib/compiler.js"
      ]

      if (thisAsWindowForModules.some(id_ => id.trimRight().endsWith(id_))) {
        return "window"
      }
    },
    plugins: [
      json(),
      image(),
      svelte({
        preprocess: preprocess(opts)
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      typescript()
    ],
    external: [
      "bowser",
      "bnc-sdk",
      "bignumber.js",
      "promise-cancelable",
      "@portis/web3",
      "@walletconnect/web3-provider",
      "fortmatic",
      "squarelink",
      "authereum"
    ]
  }
]
