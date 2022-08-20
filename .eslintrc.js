module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [`standard-with-typescript`, `prettier`],
	overrides: [],
	rules: {
		'@typescript-eslint/method-signature-style': `off`,
		'@typescript-eslint/explicit-function-return-type': `off`,
		quotes: [`error`, `backtick`],
		'array-callback-return': `off`,
		'prefer-template': `error`,
		'@typescript-eslint/restrict-template-expressions': `off`,
	},
};
