const fs = require('fs');
const stringify = require('json-stringify-pretty-compact');
const createConsumableAssetsIndex = require('./createConsumableAssetsIndex');

const patchLockFile = ({ lockFilePath, assetsIndex, chunksAssetsIndex }) => {
	const lockData = JSON.parse(fs.readFileSync(lockFilePath, 'utf-8'));

	if (assetsIndex) {
		const consumableAssetsIndex = createConsumableAssetsIndex(assetsIndex);
		lockData.assets = consumableAssetsIndex;
	}

	if (chunksAssetsIndex) {
		const consumableChunksAssetsIndex = createConsumableAssetsIndex(chunksAssetsIndex);
		console.log(consumableChunksAssetsIndex);
		lockData.chunks = consumableChunksAssetsIndex;
	}

	const data = stringify(lockData);
	fs.writeFileSync(lockFilePath, data);
};

module.exports = patchLockFile;
