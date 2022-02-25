const fs = require('fs');
const path = require('path');

const getAllFiles = ({ root, directoryPath }, arrayOfFiles = []) => {
	const files = fs.readdirSync(directoryPath);
	let newArrayOfFiles = [...arrayOfFiles];

	files.forEach((file) => {
		if (fs.statSync(path.join(directoryPath, file)).isDirectory()) {
			newArrayOfFiles = getAllFiles({ root, directoryPath: path.join(directoryPath, file) }, newArrayOfFiles);
		} else {
			newArrayOfFiles.push(path.join(root, directoryPath, file));
		}
	});

	return newArrayOfFiles;
};

module.exports = getAllFiles;
