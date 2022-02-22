import fs from 'fs';
import path from 'path';
import errors from './error/errors';
import { error } from './error/error';

const loadMiaamFile = (directoryPath) => {
	const miaamFilePath = fs.readdirSync(directoryPath).find((file) => file.match(/^(\.miaamrc\.)(.+\.)*((c|m)?js)$/));
	if (!miaamFilePath) {
		error({ error: errors.CONFIGURATION_FILE_NOT_FOUND });
	}

	const miaamFileData = fs.readFileSync(path.join(directoryPath, miaamFilePath), 'utf-8');
	// eslint-disable-next-line no-eval
	const miaamOptions = eval(miaamFileData);

	return miaamOptions;
};

export default loadMiaamFile;
