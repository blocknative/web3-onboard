module.exports = {
  files: ["tests/**.test.ts"],
  ignoredByWatcher: ["dist/**/*"],
  cache: true,
  concurrency: 2,
  typescript: {
    rewritePaths: {
      "src/": "dist/",
    },
    compile: false,
  },
  require: ["ts-node/register/transpile-only"],
};
