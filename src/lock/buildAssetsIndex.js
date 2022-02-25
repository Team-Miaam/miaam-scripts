const fs = require('fs');
const path = require('path');

const { getAllFiles, addDependenciesToIndex, createConsumableAssetsIndex } = require('../utils');

const buildAssetsIndex = ({ projectRoot, miaamOptions }) => {
	const assetsPath = miaamOptions.paths.assets;
	const dependencyResolvers = miaamOptions['deps-resolvers'];
	const files = getAllFiles({ root: '/', directoryPath: assetsPath });

	const assetsIndexSet = {};

	dependencyResolvers.forEach(({ test, use }) => {
		const selectedFiles = files.filter((file) => file.match(test));
		use.forEach(({ resolver, options }) => {
			selectedFiles.forEach((file) => {
				const context = { options, resourcePath: file };
				const content = fs.readFileSync(path.join(projectRoot, file), 'utf-8');
				const dependencies = resolver(content, context);
				addDependenciesToIndex({ assetsIndexSet, file, dependencies });
			});
		});
	});

	const assetsIndex = createConsumableAssetsIndex(assetsIndexSet);
	return assetsIndex;
};

module.exports = buildAssetsIndex;
