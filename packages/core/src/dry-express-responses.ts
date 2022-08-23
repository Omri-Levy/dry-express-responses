import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { reasonPhraseToCamelCase } from './utils';
import {
	badRequest,
	created,
	forbidden,
	internalServerError,
	notFound,
	ok,
	unauthorized,
} from './responses';

/**
 * An ExpressJS middleware that overloads the response object by iterating over the most used status codes using http-status-codes, mapping them to their corresponding method. res.ok = ok(res) etc.
 * @param req
 * @param res
 * @param next
 */
export const dryExpressResponses = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Statuses to overload the response with.
	[
		{ status: StatusCodes.OK, cb: ok },
		{ status: StatusCodes.CREATED, cb: created },
		{ status: StatusCodes.BAD_REQUEST, cb: badRequest },
		{ status: StatusCodes.UNAUTHORIZED, cb: unauthorized },
		{ status: StatusCodes.FORBIDDEN, cb: forbidden },
		{ status: StatusCodes.NOT_FOUND, cb: notFound },
		{
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			cb: internalServerError,
		},
	].forEach(({ status, cb }) => {
		// Use the status code to get the reason phrase and convert
		// it to camelCase. Bad Request -> badRequest
		const method = reasonPhraseToCamelCase(status);

		res[method] = cb(res);
	});

	return next();
};
