const path = require('path');

module.exports = {
	mode: 'development',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['babel-loader'],
			},
		],
	},
	entry: {
		'miaam-script': './scripts/miaam-scripts.js',
	},
	output: {
		filename: '[name]',
		path: path.join(__dirname, 'bin'),
	},
	watch: true,
	watchOptions: {
		ignored: '/node_modules/',
	},
	devtool: 'source-map',
};
