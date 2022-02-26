const tilemapDependencyResolver = require('miaam-assets/deps-resolvers/tilemap');
const tilesetDependencyResolver = require('miaam-assets/deps-resolvers/tileset');

const getMiaamOptions = ({ projectRoot, miaamOptions }) => ({
	...miaamOptions,
	'deps-resolvers': [
		{
			test: /\.(tilemap|tileanimation).json/,
			use: [{ resolver: tilemapDependencyResolver, options: { projectRoot } }],
		},
		{
			test: /\.(tileset).json/,
			use: [{ resolver: tilesetDependencyResolver, options: { projectRoot } }],
		},
	],
});

module.exports = getMiaamOptions;
