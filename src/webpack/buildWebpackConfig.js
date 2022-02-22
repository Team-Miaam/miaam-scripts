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
					use: ['source-map-loader', 'babel-loader'],
				},
			],
		},
		entry: {
			index: `${miaamOptions.index}`,
		},
		output: {
			path: `${slash(path.join(projectRoot, miaamOptions.paths.public, 'js'))}`,
		},
		devtool: 'source-map',
	};

	if (miaamOptions.watch) {
		config.watchConfig = miaamOptions.watchOptions;
	}

	return config;
};

module.exports = buildWebpackConfig;
