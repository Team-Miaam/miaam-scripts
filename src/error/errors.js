const errors = {
	CONFIGURATION_FILE_NOT_FOUND: {
		code: 1,
		message: 'miaam configuration file not found',
	},
	COMPILER_ERROR: {
		code: 2,
		message: 'error during compiling',
	},
	COMPILER_WARNING: {
		code: 2,
		message: 'warning during compiling',
	},
};

module.exports = errors;
