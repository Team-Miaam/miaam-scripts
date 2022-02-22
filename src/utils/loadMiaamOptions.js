const loadMiaamFile = require('./loadMiaamFile');
const getMiaamOptions = require('./getMiaamOptions');

const loadMiaamOptions = ({ projectRoot, miaamrc }) => {
	if (!projectRoot) {
		throw new Error('Project root is undefined');
	}

	let miaamOptions;
	if (miaamrc) {
		miaamOptions = import(miaamrc);
	} else {
		miaamOptions = loadMiaamFile(projectRoot);
	}

	miaamOptions = getMiaamOptions(miaamOptions);
	return miaamOptions;
};

module.exports = loadMiaamOptions;
