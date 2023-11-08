module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['packages/*/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['node_modules', 'packages/*/*/dist'],
  rules: {
    'no-console': 'error'
  }
};
