const chalk = require('chalk');
const { error, errors, warning } = require('./error');

const build = ({ compiler, watchConfig }) => {
	compiler.run(watchConfig, (errs, stats) => {
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

		console.log('build generated');
		console.log(`build time: ${chalk.green(info.time / 1000)} sec`);
	});
};

module.exports = build;
