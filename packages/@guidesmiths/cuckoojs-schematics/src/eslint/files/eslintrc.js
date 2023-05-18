module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
	],
	overrides: [
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['jest', '@typescript-eslint'],
	rules: {
		indent: [
			'error',
			<%= indentvalue %>,
		],
		'linebreak-style': [
			'error',
			'<%= linebreakStyle %>',
		],
		quotes: [
			'error',
			'<%= quotes %>',
		],
		semi: [
			'error',
			'<%= semicolon %>',
		],
	},
};
