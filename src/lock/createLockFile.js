const fs = require('fs');
const path = require('path');

const miaamLockFileName = 'miaam-lock.json';
const createLockFile = ({ projectRoot }) => {
	const miaamLockFilePath = path.join(projectRoot, miaamLockFileName);
	const miaamLockFileExists = fs.existsSync(miaamLockFilePath);
	if (miaamLockFileExists) {
		return miaamLockFilePath;
	}
	fs.writeFileSync(miaamLockFilePath, '{}');
	return miaamLockFilePath;
};

module.exports = createLockFile;
