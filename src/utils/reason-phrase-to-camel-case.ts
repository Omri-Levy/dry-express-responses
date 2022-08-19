import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { startToCamelCase } from './start-to-camel-case';
import { ResponseOverloads } from '@interfaces';

export const reasonPhraseToCamelCase = (status: StatusCodes) => {
	const reasonPhrase = getReasonPhrase(status);
	const camelReasonPhrase = startToCamelCase(reasonPhrase);

	return camelReasonPhrase as keyof ResponseOverloads;
};
