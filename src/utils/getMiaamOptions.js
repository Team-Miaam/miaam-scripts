const getMiaamOptions = (configuredOptions) => ({
	...configuredOptions,
	server: { ...configuredOptions.server, host: '0.0.0.0' },
});

module.exports = getMiaamOptions;
