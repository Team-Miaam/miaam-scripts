const fs = require('fs');

const getFileContentFromCache = ({ cache, file }) => {
	if (!cache[file]) {
		const fileContent = fs.readFileSync(file, 'utf-8');
		// eslint-disable-next-line no-param-reassign
		cache[file] = fileContent;
	}
	return cache[file];
};

module.exports = getFileContentFromCache;
