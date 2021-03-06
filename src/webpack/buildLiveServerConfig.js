const { choosePort } = require('../utils');

const buildLiveServerConfig = async ({ projectRoot, miaamOptions }) => {
	const config = {
		port: await choosePort(miaamOptions.server.port),
		open: true,
		static: {
			directory: projectRoot,
		},
	};

	return config;
};

module.exports = buildLiveServerConfig;
