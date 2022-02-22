const chalk = require('chalk');

const errorColor = chalk.bold.red;
const warningColor = chalk.hex('#FFA500');

const errorFunction = ({ message, error, exit }) => {
	console.log(errorColor(`${error.message} ${message ? `: ${message}` : ''}`));
	if (exit) {
		process.exit(error.code);
	}
};

const warningFunction = ({ message, warning }) => {
	console.log(warningColor(`${warning.message} ${message ? `: ${message}` : ''}`));
};

module.exports = {
	warning: warningFunction,
	error: errorFunction,
};
