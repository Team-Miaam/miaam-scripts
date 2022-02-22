const webpack = require('webpack');

const createCompiler = ({ webpackOptions }) => {
	const compiler = webpack(webpackOptions);
	return compiler;
};

module.exports = createCompiler;
