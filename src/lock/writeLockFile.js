const fs = require('fs');
const stringify = require('json-stringify-pretty-compact');
const createConsumableAssetsIndex = require('./createConsumableAssetsIndex');

const writeLockFile = ({ lockFilePath, assetsIndex }) => {
	const consumableAssetsIndex = createConsumableAssetsIndex(assetsIndex);
	const lockData = { assets: { ...consumableAssetsIndex } };
	const data = stringify(lockData);
	fs.writeFileSync(lockFilePath, data);
};

module.exports = writeLockFile;
