const fs = require('fs');
const stringify = require('json-stringify-pretty-compact');
const createConsumableAssetsIndex = require('./createConsumableAssetsIndex');

const patchLockFile = ({ lockFilePath, assetsIndex }) => {
	const consumableAssetsIndex = createConsumableAssetsIndex(assetsIndex);

	const previousLockData = JSON.parse(fs.readFileSync(lockFilePath, 'utf-8'));
	const currentLockData = { ...previousLockData, assets: { ...consumableAssetsIndex } };

	const data = stringify(currentLockData);
	fs.writeFileSync(lockFilePath, data);
};

module.exports = patchLockFile;
