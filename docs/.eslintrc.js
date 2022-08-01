module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "project": "./tsconfig.json",
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "ignorePatterns": [
    ".eslintrc.js"
  ],
  "plugins": [
    "svelte3",
    "@typescript-eslint",
    "simple-import-sort",
    "prettier"
  ],
  "overrides": [
    {
      "files": [
        "*.svelte"
      ],
      "processor": "svelte3/svelte3"
    }
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  "rules": {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    },
    "svelte3/typescript": true
  }
};