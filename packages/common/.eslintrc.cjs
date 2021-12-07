module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019
  },
  env: {
    browser: true,
    node: true,
    es2017: true
  },
  rules: {
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/no-case-declarations': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-empty-function': 'off'
  }
}
