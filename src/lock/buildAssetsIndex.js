const fs = require('fs');
const path = require('path');

const { getAllFiles, addDependenciesToIndex } = require('../utils');

const buildAssetsIndex = ({ projectRoot, miaamOptions }) => {
	const assetsPath = miaamOptions.paths.assets;
	const dependencyResolvers = miaamOptions['deps-resolvers'];
	const files = getAllFiles({ root: '/', directoryPath: assetsPath });

	const assetsIndex = {};

	dependencyResolvers.forEach(({ test, use }) => {
		const selectedFiles = files.filter((file) => file.match(test));
		use.forEach(({ resolver, options }) => {
			selectedFiles.forEach((file) => {
				const context = { options, resourcePath: file };
				const content = fs.readFileSync(path.join(projectRoot, file), 'utf-8');
				const dependencies = resolver(content, context);
				addDependenciesToIndex({
					assetsIndexSet: assetsIndex,
					file: path.join('/', file).replaceAll('\\', '/'),
					dependencies,
				});
			});
		});
	});

	return assetsIndex;
};

module.exports = buildAssetsIndex;
