import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateResponse } from './generate-response';

declare module 'express' {
	export interface Response {
		ok(data: any): void;

		created(data: any): void;

		found(data: any): void;

		badRequest(data: any): void;

		unauthorized(data: any): void;

		forbidden(data: any): void;

		notFound(data: any): void;

		internalServerError(data: any): void;
	}
}

export const dryExpressResponses = (
	req: Request,
	res: Response,
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

	return next();
};
