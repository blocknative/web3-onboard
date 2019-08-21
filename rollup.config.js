import svelte from "rollup-plugin-svelte"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import image from "rollup-plugin-img"
import json from "rollup-plugin-json"
import builtins from "rollup-plugin-node-builtins"
import globals from "rollup-plugin-node-globals"
import { terser } from "rollup-plugin-terser"

const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: "src/index.js",
    output: {
      sourcemap: true,
      format: "umd",
      name: "Onboard",
      file: "public/Onboard.js"
    },
    plugins: [
      json({
        include: "package.json",
        exclude: ["node_modules"]
      }),
      image(),
      svelte({
        dev: !production,
        css: css => {
          css.write("public/bundle.css")
        }
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/"),
        preferBuiltins: true
      }),
      commonjs(),
      globals(),
      builtins(),

      !production && livereload("public"),
      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: "public/demo.js",
    output: {
      format: "iife",
      name: "demo",
      file: "public/demo-bundle.js"
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        browser: true
      }),
      commonjs(),
      globals(),
      builtins(),

      production && terser()
    ],
    watch: {
      clearScreen: false
    }
  }
]
