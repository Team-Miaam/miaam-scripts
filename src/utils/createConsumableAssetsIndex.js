const createConsumableAssetsIndex = (assetsIndexSet) => {
	const assetsIndex = Object.fromEntries(Object.entries(assetsIndexSet).map(([file, indexes]) => [file, [...indexes]]));
	return assetsIndex;
};

module.exports = createConsumableAssetsIndex;
