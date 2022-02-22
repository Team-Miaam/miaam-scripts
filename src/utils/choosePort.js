const detect = require('detect-port-alt');
const isRoot = require('is-root');
const prompts = require('prompts');
const chalk = require('chalk');

const clearConsole = require('./clearConsole');

const isInteractive = process.stdout.isTTY;

const choosePort = (host, defaultPort) =>
	detect(defaultPort, host).then(
		(port) =>
			new Promise((resolve) => {
				if (port === defaultPort) {
					resolve(port);
				}
				const message =
					process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
						? `Admin permissions are required to run a server on a port below 1024.`
						: `Something is already running on port ${defaultPort}.`;
				if (isInteractive) {
					clearConsole();
					const question = {
						type: 'confirm',
						name: 'shouldChangePort',
						message: `${chalk.yellow(message)}\n\nWould you like to run the app on another port instead?`,
						initial: true,
					};
					prompts(question).then((answer) => {
						if (answer.shouldChangePort) {
							resolve(port);
						} else {
							resolve(null);
						}
					});
				} else {
					console.log(chalk.red(message));
					resolve(null);
				}
			}),
		(err) => {
			throw new Error(
				`${chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)}\n${
					`Network error message: ${err.message}` || err
				}\n`
			);
		}
	);

module.exports = choosePort;
