const buildWebpackConfig = require('./buildWebpackConfig');
const buildLiveServerConfig = require('./buildLIveServerConfig');
const createCompiler = require('./createCompiler');
const createLiveServer = require('./createLiveServer');

module.exports = {
	buildWebpackConfig,
	buildLiveServerConfig,
	createCompiler,
	createLiveServer,
};
