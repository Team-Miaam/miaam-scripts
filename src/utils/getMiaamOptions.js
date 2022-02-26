const tilemapDependencyResolver = require('miaam-assets/deps-resolvers/tilemap');
const tilesetDependencyResolver = require('miaam-assets/deps-resolvers/tileset');

const ChunkAssetsCompilerPlugin = require('miaam-assets/plugins/bundler/chunk-assets-compiler');
const createLockFile = require('../lock/createLockFile');
const patchLockFile = require('../lock/patchLockFile');

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
	'bundler-plugins': [
		new ChunkAssetsCompilerPlugin({
			miaamOptions,
			updateChunkIndex: (chunksAssetsIndex) => {
				const lockFilePath = createLockFile({ projectRoot });
				patchLockFile({ lockFilePath, chunksAssetsIndex });
			},
		}),
	],
});

module.exports = getMiaamOptions;
