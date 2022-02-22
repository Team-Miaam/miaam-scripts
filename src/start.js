const { buildWebpackConfig, buildLiveServerConfig, createCompiler } = require('./webpack');
const { loadMiaamOptions } = require('./utils');
const { error, errors, warning } = require('./error');

const watch = ({ compiler, watchConfig }) => {
	compiler.watch(watchConfig, (errs, stats) => {
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
				warning({ message: `${message}${details ? `\n${details}` : ''}`, warning: errors.COMPILER_ERROR })
			);
		}
	});
};

// eslint-disable-next-line no-unused-vars
const serve = ({ compiler, liveServerConfig }) => {};

const start = ({ projectRoot, miaamrc }) => {
	const miaamOptions = loadMiaamOptions({ projectRoot, miaamrc });
	const { compileConfig, watchConfig } = buildWebpackConfig({ projectRoot, miaamOptions });
	const { liveServerConfig } = buildLiveServerConfig({ projectRoot, miaamOptions });
	const compiler = createCompiler({ projectRoot, webpackOptions: { ...compileConfig } });
	watch({ compiler, watchConfig });
	serve({ projectRoot, webpackOptions: `{ ${liveServerConfig} }` });
};

module.exports = start;
