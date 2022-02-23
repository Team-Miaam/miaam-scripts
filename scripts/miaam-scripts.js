#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const { start } = require('../src');

const packageOptions = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program.version(packageOptions.version);

program
	.command('start')
	.option('--miaamrc [miaamOptions]', 'Path to miaamrc file')
	.action(async ({ miaamrc }) => {
		await start({ projectRoot: process.cwd(), miaamrc });
	});

program.parseAsync();
