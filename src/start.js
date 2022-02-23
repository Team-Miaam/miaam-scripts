const chalk = require('chalk');
const { buildWebpackConfig, buildLiveServerConfig, createCompiler, createLiveServer } = require('./webpack');
const { loadMiaamOptions, clearConsole } = require('./utils');

const isInteractive = process.stdout.isTTY;

const serve = ({ liveServer }) => {
	liveServer.startCallback(() => {
		if (isInteractive) {
			clearConsole();
		}
		console.log(chalk.cyan('Starting the development server...\n'));
	});
};

const start = async ({ projectRoot, miaamrc }) => {
	const miaamOptions = loadMiaamOptions({ projectRoot, miaamrc });
	const { compileConfig } = buildWebpackConfig({ projectRoot, miaamOptions });
	const liveServerConfig = await buildLiveServerConfig({ projectRoot, miaamOptions });
	const compiler = createCompiler({ projectRoot, webpackOptions: { ...compileConfig } });
	const liveServer = createLiveServer({ liveServerConfig, compiler });
	serve({ liveServer });
};

module.exports = start;
