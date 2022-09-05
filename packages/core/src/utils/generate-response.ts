import type {Response} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import {GenerateResponse} from '@dry-express-responses/types';

/**
 * Reduces the use of res.status() and res.send(), standardizes the response with a consistent format in addition to TypeScript typing, while allowing data and a message to be passed in.
 * @param res - The Express response object.
 * @param status - The HTTP status code using http-status-codes.
 */
export const generateResponse =
	<TStatus extends StatusCodes>(res: Response, status: TStatus) =>
		// Only has errors if status is not OK or CREATED.
		<TData, TPayload extends Record<PropertyKey, any>>(
			payload:
				| GenerateResponse<TStatus, TData, TPayload>
				| Record<never, never> = {},
		) =>
			res.status(status).send({
				status: getReasonPhrase(status),
				...payload,
			});
