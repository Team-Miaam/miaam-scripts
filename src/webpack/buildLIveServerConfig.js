const path = require('path');

const buildLiveServerConfig = ({ projectRoot, miaamOptions }) => {
	const config = {
		port: miaamOptions.server.port,
		root: path.join(projectRoot, miaamOptions.paths.public),
		open: true,
		file: 'index.html',
		logLevel: 2,
	};

	return config;
};

module.exports = buildLiveServerConfig;
