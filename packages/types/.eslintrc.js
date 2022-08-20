const config = require(`../../.eslintrc.js`);

module.exports = {
	...config,
	parserOptions: {
		ecmaVersion: `latest`,
		sourceType: `module`,
		project: `./tsconfig.json`,
	},
};
