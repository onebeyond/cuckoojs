module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        'jest/globals': true
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['jest'],
    rules: {
    },
};
