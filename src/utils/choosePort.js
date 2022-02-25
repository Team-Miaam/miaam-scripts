const detect = require('detect-port-alt');
const isRoot = require('is-root');
const prompts = require('prompts');
const chalk = require('chalk');

const isInteractive = process.stdout.isTTY;

const choosePort = (defaultPort) =>
	detect(defaultPort).then(
		(port) =>
			new Promise((resolve) => {
				if (port === defaultPort) {
					resolve(port);
					return;
				}
				const message =
					process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
						? `Admin permissions are required to run a server on a port below 1024.`
						: `Something is already running on port ${defaultPort}.`;
				if (isInteractive) {
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
				`${chalk.red(`Could not find an open port.`)}\n${`Network error message: ${err.message}` || err}\n`
			);
		}
	);

module.exports = choosePort;
