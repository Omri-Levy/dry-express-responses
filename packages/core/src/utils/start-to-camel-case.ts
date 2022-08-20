export const startToCamelCase = (str: string) =>
	str
		// Lowercase the first word.
		.replace(/^\w+/, (word) => word.toLowerCase())
		// Remove all spaces.
		.replace(/\s/g, '');
