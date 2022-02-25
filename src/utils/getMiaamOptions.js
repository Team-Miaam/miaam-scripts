// const tilemapDependencyResolver = require('miaam-assets/deps-resolvers/tilemap');

const getMiaamOptions = (configuredOptions) => ({
	...configuredOptions,
	'deps-resolvers': [
		{
			test: /\.(tilemap|tileanimation).json/,
			use: [{ resolver: 'miaam-assets/' }],
		},
	],
});

module.exports = getMiaamOptions;
