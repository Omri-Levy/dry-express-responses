import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { startToCamelCase } from './start-to-camel-case';
import { ResponseOverloads } from '@dry-express-responses/types';

/**
 * http-status-codes provides Start Case reason phrases, with this utility its possible to convert them to camelCase, to be used for object property keys, or to generate method names.
 * @param status
 */
export const reasonPhraseToCamelCase = (status: StatusCodes) => {
	const reasonPhrase = getReasonPhrase(status);
	const camelReasonPhrase = startToCamelCase(reasonPhrase);

	return camelReasonPhrase as keyof ResponseOverloads;
};
