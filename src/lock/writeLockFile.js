const fs = require('fs');
const stringify = require('json-stringify-pretty-compact');

const writeLockFile = ({ lockFilePath, assetsIndex }) => {
	const lockData = { assets: { ...assetsIndex } };
	const data = stringify(lockData);
	fs.writeFileSync(lockFilePath, data);
};

module.exports = writeLockFile;
