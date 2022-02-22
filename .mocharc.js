'use strict';

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
	package: './package.json',
	ignore: ['./node_modules/'],
	recursive: true,

	// 'allow-uncaught': false,
	// 'async-only': false,
	// bail: false,
	'check-leaks': true,
	// color: true,
	// delay: false,
	// diff: true,
	// exit: false, // could be expressed as "'no-exit': true"
	// extension: ['js'],
	// // fgrep: something, // fgrep and grep are mutually exclusive
	// file: ['/path/to/some/file', '/path/to/some/other/file'],
	// 'forbid-only': false,
	// 'forbid-pending': false,
	// 'full-trace': false,
	// global: ['jQuery', '$'],
	// // grep: something, // fgrep and grep are mutually exclusive
	// growl: false,
	// 'inline-diffs': false,
	// // invert: false, // needs to be used with grep or fgrep
	// jobs: 1,
	// parallel: false,
	reporter: 'spec',
	// 'reporter-option': ['foo=bar', 'baz=quux'],
	// retries: 1,
	// slow: '75',
	// sort: false,
	// spec: ['test/**/*.spec.js'], // the positional arguments!
	// timeout: '2000', // same as "timeout: '2s'"
	// timeout: false, // same as "'no-timeout': true" or "timeout: 0"
	// 'trace-warnings': true, // node flags ok
	// ui: 'bdd',
	// 'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
	watch: false,
	// 'watch-files': ['lib/**/*.js', 'test/**/*.js'],
	'watch-files': ['src/**/*.js', 'test/**/*.js'],
	// 'watch-ignore': ['lib/vendor']
};
