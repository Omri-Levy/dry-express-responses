import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { startToCamelCase } from './start-to-camel-case';
import { ResponseOverloads } from '@dry-express-responses/types';

export const reasonPhraseToCamelCase = (status: StatusCodes) => {
	const reasonPhrase = getReasonPhrase(status);
	const camelReasonPhrase = startToCamelCase(reasonPhrase);

	return camelReasonPhrase as keyof ResponseOverloads;
};
