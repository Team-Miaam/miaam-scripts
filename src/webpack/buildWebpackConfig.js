const path = require('path');
const { slash } = require('../utils');

const buildWebpackConfig = ({ projectRoot, miaamOptions }) => {
	const config = {};

	config.compileConfig = {
		mode: `${miaamOptions.mode}`,
		target: ['web'],
		module: {
			rules: [
				{
					test: /\.(m)?js$/,
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
				{
					test: /\.tilemap.json/,
					enforce: 'pre',
					use: ['miaam-assets/loaders/tilemap'],
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
		experiments: {
			topLevelAwait: true,
		},
	};

	if (miaamOptions.watch) {
		config.watchConfig = miaamOptions.watchOptions;
	}

	return config;
};

module.exports = buildWebpackConfig;
