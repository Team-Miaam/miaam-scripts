// eslint-disable-next-line import/no-unresolved
import chalk from 'chalk';

const errorColor = chalk.bold.red;
const warningColor = chalk.hex('#FFA500');

const errorFunction = ({ message, error }) => {
	console.log(errorColor(`${error.message} ${message ? `: ${message}` : ''}`));
	process.exit(error.code);
};

const warningFunction = ({ message, warning }) => {
	console.log(warningColor(`${warning.message} ${message ? `: ${message}` : ''}`));
};

export { warningFunction as warning, errorFunction as error };
