const fs = require('fs');
const path = require('path');

const miaamLockFileName = 'miaam-lock.json';
const createLockFile = ({ projectRoot }) => {
	const miaamLockFile = fs.readdirSync(projectRoot).find((file) => file === miaamLockFileName);
	if (miaamLockFile) {
		return;
	}
	fs.writeFileSync(path.join(projectRoot, miaamLockFileName), '{}');
};

module.exports = createLockFile;
