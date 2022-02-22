import path from 'path';
import slash from './slash';

const buildWebpackConfig = ({ projectRoot, miaamOptions }) => {
	const config = {};

	config.compileConfig = `
		mode: '${miaamOptions.mode}',
		target: 'web',
		module: {
			rules: [
				{
					test: /\\.js$/,
					enforce: 'pre',
					use: ['source-map-loader', 'babel-loader'],
				},
			],
		},
		entry: {
			index: '${miaamOptions.index}',
		},
		output: {
			path: '${slash(path.join(projectRoot, miaamOptions.paths.public, 'js'))}'
		},
		devtool: 'source-map',
	`;

	config.devServerConfig = `
		devServer: {
			open: true,
			port: ${miaamOptions.server.port},
			static: [
				{
					directory: '${slash(path.join(projectRoot, miaamOptions.paths.public))}',
					publicPath: '/'
				},
				{
					directory: '${slash(path.join(projectRoot, miaamOptions.paths.assets))}',
					publicPath: '/assets'
				},
			],
			watchFiles: ['${slash(path.join(projectRoot, miaamOptions.paths.public))}/**/*'],
		},
	`;

	if (miaamOptions.watch) {
		config.watchConfig = `
			watch: ${miaamOptions.watch},
			watchOptions: ${JSON.stringify(miaamOptions.watchOptions)},
		`;
	}

	return config;
};

export default buildWebpackConfig;
