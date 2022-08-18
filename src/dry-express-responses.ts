import { NextFunction, Request, Response } from 'express';
import { DryResponses } from './interfaces';
import { StatusCodes } from 'http-status-codes';
import { generateResponse } from './generate-response';

export const dryExpressResponses = (
	req: Request,
	res: Response & DryResponses,
	next: NextFunction,
) => {
	// 200 OK
	res.ok = generateResponse(res, StatusCodes.OK);
	// 201 Created
	res.created = generateResponse(res, StatusCodes.CREATED);
	// 302 Found
	res.found = generateResponse(res, StatusCodes.MOVED_TEMPORARILY);
	// 400 Bad Request
	res.badRequest = generateResponse(res, StatusCodes.BAD_REQUEST);
	// 401 Unauthorized
	res.unauthorized = generateResponse(
		res,
		StatusCodes.UNAUTHORIZED,
	);
	// 403 Forbidden
	res.forbidden = generateResponse(res, StatusCodes.FORBIDDEN);
	// 404 Not Found
	res.notFound = generateResponse(res, StatusCodes.NOT_FOUND);
	// 500 Internal Server Error
	res.internalServerError = generateResponse(
		res,
		StatusCodes.INTERNAL_SERVER_ERROR,
	);

	next();
};
