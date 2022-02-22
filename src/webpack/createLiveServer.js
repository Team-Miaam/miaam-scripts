const WebpackDevServer = require('webpack-dev-server');

const createLiveServer = ({ liveServerConfig, compiler }) => {
	const liveServer = new WebpackDevServer(liveServerConfig, compiler);
	return liveServer;
};

module.exports = createLiveServer;
