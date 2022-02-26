const chalk = require('chalk');
const { buildWebpackConfig, buildLiveServerConfig, createCompiler, createLiveServer } = require('./webpack');
const { loadMiaamOptions } = require('./utils');
const { createLockFile, watchAssetsIndex, createAssetsWatcher } = require('./lock');

const serve = ({ liveServer }) => {
	liveServer.startCallback(() => {
		console.log(chalk.cyan('Starting the development server...\n'));
	});
};

const start = async ({ projectRoot, miaamrc }) => {
	const miaamOptions = loadMiaamOptions({ projectRoot, miaamrc });

	const lockFilePath = createLockFile({ projectRoot });
	const assetsWatcher = createAssetsWatcher({ miaamOptions });
	watchAssetsIndex({ projectRoot, miaamOptions, lockFilePath, watcher: assetsWatcher });

	const { compileConfig, watchConfig } = buildWebpackConfig({ projectRoot, miaamOptions });
	const liveServerConfig = await buildLiveServerConfig({ projectRoot, miaamOptions });
	const compiler = createCompiler({ projectRoot, webpackOptions: { ...compileConfig, ...watchConfig } });
	const liveServer = createLiveServer({ liveServerConfig, compiler });
	serve({ liveServer });
};

module.exports = start;
