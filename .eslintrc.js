module.exports = {
	env: {
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
	},
	plugins: ['import', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-console': 0,
	},
};
