const chokidar = require('chokidar');

const createAssetsWatcher = ({ miaamOptions }) => {
	const assetsPath = miaamOptions.paths.assets;
	const watcher = chokidar.watch(assetsPath);
	return watcher;
};

module.exports = createAssetsWatcher;
