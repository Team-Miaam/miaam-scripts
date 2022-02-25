const fs = require('fs');
const path = require('path');
const { errors, error } = require('../error');

const loadMiaamFile = ({ projectRoot }) => {
	const miaamFilePath = fs.readdirSync(projectRoot).find((file) => file.match(/^(\.miaamrc\.)(.+\.)*((c|m)?js)$/));
	if (!miaamFilePath) {
		error({ error: errors.CONFIGURATION_FILE_NOT_FOUND });
	}

	const miaamFileData = fs.readFileSync(path.join(projectRoot, miaamFilePath), 'utf-8');
	// eslint-disable-next-line no-eval
	const miaamOptions = eval(miaamFileData);

	return miaamOptions;
};

module.exports = loadMiaamFile;
