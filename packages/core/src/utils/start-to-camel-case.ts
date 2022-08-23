/**
 * A utility that converts the first word of a string to lower case and removed the spaces.
 * @example Bad Request -> badRequest
 * @param str
 */
export const startToCamelCase = (str: string) =>
	str
		// Lowercase the first word.
		.replace(/^\w+/, (word) => word.toLowerCase())
		// Remove all spaces.
		.replace(/\s/g, ``);
