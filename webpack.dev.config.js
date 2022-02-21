const path = require('path');

module.exports = {
	mode: 'development',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader', 'babel-loader'],
			},
		],
	},
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.join(__dirname, 'public', 'js'),
	},
	watch: true,
	watchOptions: {
		ignored: '/node_modules/',
	},
	devtool: 'source-map',
};
