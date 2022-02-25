const tilemapDependencyResolver = require('miaam-assets/deps-resolvers/tilemap');

const getMiaamOptions = ({ projectRoot, miaamOptions }) => ({
	...miaamOptions,
	'deps-resolvers': [
		{
			test: /\.(tilemap|tileanimation).json/,
			use: [{ resolver: tilemapDependencyResolver, options: { projectRoot } }],
		},
	],
});

module.exports = getMiaamOptions;
