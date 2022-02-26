const buildAssetsIndex = require('./buildAssetsIndex');
const createLockFile = require('./createLockFile');
const writeLockFile = require('./writeLockFile');
const createAssetsWatcher = require('./createAssetsWatcher');
const watchAssetsIndex = require('./watchAssetsIndex');

module.exports = { buildAssetsIndex, createLockFile, writeLockFile, createAssetsWatcher, watchAssetsIndex };
