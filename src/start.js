import fs from 'fs';
import path from 'path';
import { spawn } from 'cross-spawn';
import { buildWebpackConfig, loadMiaamOptions } from './utils';

const compileAndWatch = ({ projectRoot, webpackOptions }) => {
	console.log(webpackOptions);
	const webpackConfigFilePath = path.join(__dirname, '../configs/webpackConfig.js');
	fs.writeFileSync(webpackConfigFilePath, `module.exports = ${webpackOptions}`);
	const compile = spawn('webpack', ['--config', webpackConfigFilePath], { cwd: projectRoot });
	compile.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	compile.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});
};

const start = ({ projectRoot, miaamrc }) => {
	const miaamOptions = loadMiaamOptions({ projectRoot, miaamrc });
	const { compileConfig, watchConfig } = buildWebpackConfig({ projectRoot, miaamOptions });
	console.log(compileConfig, watchConfig);
	compileAndWatch({ projectRoot, webpackOptions: `{ ${compileConfig} ${watchConfig} }` });
};

export default start;
