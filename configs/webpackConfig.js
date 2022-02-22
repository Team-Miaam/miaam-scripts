module.exports = {
	mode: 'development',
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
		index: './src/index.js',
	},
	output: {
		path: 'P:/GameDevelopment/MiaamEcosystem/RnD/project-conf/public/js',
	},
	devtool: 'source-map',

	watch: true,
	watchOptions: { ignored: '/node_modules/' },
};
