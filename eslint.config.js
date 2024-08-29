// eslint.config.js
module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.log',
  ],
};
