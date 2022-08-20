import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateResponse, reasonPhraseToCamelCase } from './utils';

export const dryExpressResponses = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const withRes = generateResponse(res);

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

		res[method] = withRes(status);
	});

	return next();
};
