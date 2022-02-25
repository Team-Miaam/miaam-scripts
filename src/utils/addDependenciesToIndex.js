const addDependenciesToIndex = ({ assetsIndexSet, file, dependencies }) => {
	if (!assetsIndexSet[file]) {
		// eslint-disable-next-line no-param-reassign
		assetsIndexSet[file] = new Set();
	}
	dependencies.forEach((dependency) => assetsIndexSet[file].add(dependency));
};

module.exports = addDependenciesToIndex;
