const choosePort = require('../utils');

const buildLiveServerConfig = ({ projectRoot, miaamOptions }) => {
	const config = {
		port: choosePort(miaamOptions.server.host, miaamOptions.server.port),
		open: true,
		static: {
			directory: projectRoot,
		},
		hot: true,
	};

	return config;
};

module.exports = buildLiveServerConfig;
