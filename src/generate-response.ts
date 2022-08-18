import type { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

/**
 * Reduces the use of res.status() and res.send(), standardizes the response with a consistent format in addition to TypeScript typing, while allowing data and a message to be passed in.
 * @param res - The Express response object.
 * @param status - The HTTP status code using http-status-codes.
 */
export const generateResponse =
	(res: Response, status: StatusCodes) =>
	(data?: any, message?: string) =>
		res.status(status).send({
			status: getReasonPhrase(status),
			data,
			message,
		});
