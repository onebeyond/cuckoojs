module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['packages/*/*/tsconfig.json'],
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  ignorePatterns: ['node_modules', 'packages/*/*/dist', 'packages/**/files'],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  }
};
