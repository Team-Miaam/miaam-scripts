const path = require('path');
const fs = require('fs');

const { addDependenciesToIndex } = require('../utils');
const patchLockFile = require('./patchLockFile');

const watchAssetsIndex = ({ projectRoot, miaamOptions, lockFilePath, watcher }) => {
	const assetsPath = miaamOptions.paths.assets;
	const dependencyResolvers = miaamOptions['deps-resolvers'];
	const assetsIndex = {};

	const updateAssetsIndex = (file) => {
		dependencyResolvers.forEach(({ test, use }) => {
			if (!file.match(test)) {
				return;
			}
			use.forEach(({ resolver, options }) => {
				const context = { options, resourcePath: file };
				const content = fs.readFileSync(path.join(projectRoot, file), 'utf-8');
				const dependencies = resolver(content, context);
				addDependenciesToIndex({ assetsIndexSet: assetsIndex, file, dependencies });
			});
		});
	};

	const removeAssetsIndex = (file) => {
		delete assetsIndex[file];
	};

	const fixedPath = (callback) => (file) => callback(path.join('/', file).replaceAll('\\', '/'));

	watcher
		.on(
			'add',
			fixedPath((resourcePath) => {
				updateAssetsIndex(resourcePath);
				patchLockFile({ lockFilePath, assetsIndex });
			})
		)
		.on(
			'change',
			fixedPath((resourcePath) => {
				removeAssetsIndex(resourcePath);
				updateAssetsIndex(resourcePath);
				patchLockFile({ lockFilePath, assetsIndex });
			})
		)
		.on(
			'unlink',
			fixedPath((resourcePath) => {
				removeAssetsIndex(resourcePath);
				patchLockFile({ lockFilePath, assetsIndex });
			})
		)
		.on(
			'unlinkDir',
			fixedPath((resourcePath) => {
				const directoryPrefix = path.join(assetsPath, path.relative(assetsPath, resourcePath));
				Object.keys(assetsIndex).forEach((file) => {
					if (file.startsWith(directoryPrefix)) {
						removeAssetsIndex(file);
					}
				});
				patchLockFile({ lockFilePath, assetsIndex });
			})
		);
};

module.exports = watchAssetsIndex;
