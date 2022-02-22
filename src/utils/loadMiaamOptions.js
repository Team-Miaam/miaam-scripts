import loadMiaamFile from './loadMiaamFile';
import getMiaamOptions from './getMiaamOptions';

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

export default loadMiaamOptions;
