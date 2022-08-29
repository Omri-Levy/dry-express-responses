import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { reasonPhraseToCamelCase } from './utils';
import { dried } from './dry-responses-factory';

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
	const dry = dried(res);

	// Statuses to overload the response with.
	[
		StatusCodes.OK,
		StatusCodes.CREATED,
		StatusCodes.BAD_REQUEST,
		StatusCodes.UNAUTHORIZED,
		StatusCodes.FORBIDDEN,
		StatusCodes.NOT_FOUND,
		StatusCodes.INTERNAL_SERVER_ERROR,
	].forEach((status) => {
		// Use the status code to get the reason phrase and convert
		// it to camelCase. Bad Request -> badRequest
		const method = reasonPhraseToCamelCase(status);

		res[method] = dry[method];
	});

	return next();
};
