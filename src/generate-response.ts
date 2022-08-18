import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { GenerateResponse } from './interfaces';

/**
 * Reduces the use of res.status() and res.send(), standardizes the response with a consistent format in addition to TypeScript typing, while allowing data and a message to be passed in.
 * @param res - The Express response object.
 * @param status - The HTTP status code using http-status-codes.
 */
export const generateResponse =
	(res: Response, status: StatusCodes) =>
	({ data, message, errors }: GenerateResponse) =>
		res.status(status).send({
			status: getReasonPhrase(status),
			data,
			message,
			errors,
		});
