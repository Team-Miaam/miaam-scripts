const addDependenciesToIndex = ({ assetsIndexSet, file, dependencies }) => {
	const updatedFileName = file.replaceAll('\\', '/');
	if (!assetsIndexSet[updatedFileName]) {
		// eslint-disable-next-line no-param-reassign
		assetsIndexSet[updatedFileName] = new Set();
	}
	dependencies.forEach((dependency) => assetsIndexSet[updatedFileName].add(dependency));
};

module.exports = addDependenciesToIndex;
