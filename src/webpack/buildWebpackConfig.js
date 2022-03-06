const { SourceMapDevToolPlugin } = require('webpack');
const path = require('path');
const { slash } = require('../utils');

const buildWebpackConfig = ({ projectRoot, miaamOptions }) => {
	const config = {};
	const publicPath = miaamOptions.paths.dist.substring(1);
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
						'miaam-assets/loaders/create-chunk',
						{
							loader: 'babel-loader',
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											targets: {
												esmodules: true,
											},
										},
									],
								],
								// plugins: [['miaam-assets/plugins/transpiler/dynamic-create-chunk', {}]],
							},
						},
					],
				},
				...miaamOptions['bundler-loaders'],
			],
		},
		plugins: [
			...miaamOptions['bundler-plugins'],
			new SourceMapDevToolPlugin({
				filename: '[file].map[query]',
				publicPath,
			}),
		],
		entry: {
			index: `${miaamOptions.index}`,
		},
		output: {
			filename: '[name].js',
			path: `${slash(path.join(projectRoot, miaamOptions.paths.dist))}`,
			publicPath,
		},
		devtool: 'source-map',
		experiments: {
			topLevelAwait: true,
		},
	};

	if (miaamOptions.watchOptions) {
		config.watchConfig = { watchOptions: miaamOptions.watchOptions };
	}

	return config;
};

module.exports = buildWebpackConfig;
