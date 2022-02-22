import { Command } from 'commander';
// eslint-disable-next-line import/no-unresolved
import chalk from 'chalk';
import packageOptions from '../package.json';
import { start } from '../src';

const program = new Command();

program.version(packageOptions.version);

program
	.command('start')
	.option('--miaamrc [miaamOptions]', 'Path to miaamrc file')
	.action(({ miaamrc }) => {
		console.log(chalk.yellow('start'));
		start({ projectRoot: process.cwd(), miaamrc });
	});

program.parse();
