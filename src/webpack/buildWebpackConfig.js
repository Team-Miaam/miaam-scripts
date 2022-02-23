const path = require('path');
const { slash } = require('../utils');

const buildWebpackConfig = ({ projectRoot, miaamOptions }) => {
	const config = {};

	config.compileConfig = {
		mode: `${miaamOptions.mode}`,
		target: 'web',
		module: {
			rules: [
				{
					test: /\.js$/,
					enforce: 'pre',
					use: [
						'source-map-loader',
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
							},
						},
					],
				},
			],
		},
		entry: {
			index: `${miaamOptions.index}`,
		},
		output: {
			filename: '[name].js',
			path: `${slash(path.join(projectRoot, 'dist'))}`,
			publicPath: '/dist',
		},
		devtool: 'source-map',
	};

	if (miaamOptions.watch) {
		config.watchConfig = miaamOptions.watchOptions;
	}

	return config;
};

module.exports = buildWebpackConfig;
