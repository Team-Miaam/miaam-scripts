const chalk = require('chalk');
const { buildWebpackConfig, createCompiler } = require('./webpack');
const { loadMiaamOptions } = require('./utils');
const { error, errors, warning } = require('./error');
const { buildAssetsIndex, createLockFile, writeLockFile } = require('./lock');

const compile = ({ compiler }) => {
	compiler.run((errs, stats) => {
		if (errs) {
			errs.foreach(({ message, details }) =>
				error({ message: `${message}${details ? `\n${details}` : ''}`, error: errors.COMPILER_ERROR })
			);
			return;
		}

		const info = stats.toJson();

		if (stats.hasErrors()) {
			info.errors.forEach(({ message, details }) =>
				error({ message: `${message}${details ? `\n${details}` : ''}`, error: errors.COMPILER_ERROR, exit: false })
			);
		}

		if (stats.hasWarnings()) {
			info.warnings.forEach(({ message, details }) =>
				warning({ message: `${message}${details ? `\n${details}` : ''}`, warning: errors.COMPILER_WARNING })
			);
		}

		console.log('build generated');
		console.log(`build time: ${chalk.green(info.time / 1000)} sec`);
		compiler.close((closeError) => {
			error({ message: `${closeError}`, error: errors.COMPILER_ERROR });
		});
	});
};

// eslint-disable-next-line no-unused-vars
const packFiles = ({ projectRoot, buildPath }) => {};

const build = async ({ projectRoot, miaamrc }) => {
	const miaamOptions = loadMiaamOptions({ projectRoot, miaamrc });

	const lockFilePath = createLockFile({ projectRoot });
	const assetsIndex = buildAssetsIndex({ projectRoot, miaamOptions });
	writeLockFile({ lockFilePath, assetsIndex });

	const { compileConfig } = buildWebpackConfig({ projectRoot, miaamOptions });
	const compiler = createCompiler({ projectRoot, webpackOptions: { ...compileConfig } });
	compile({ compiler });
	packFiles({ projectRoot, buildPath: miaamOptions.paths.build });
};

module.exports = build;
