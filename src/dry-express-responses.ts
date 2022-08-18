import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateResponse } from './generate-response';
import { GenerateResponse } from './interfaces';

declare module 'express' {
	export interface Response {
		ok(payload: Omit<GenerateResponse, 'errors'>): void;

		created(payload: Omit<GenerateResponse, 'errors'>): void;

		badRequest(payload: GenerateResponse): void;

		unauthorized(payload: GenerateResponse): void;

		forbidden(payload: GenerateResponse): void;

		notFound(payload: GenerateResponse): void;

		internalServerError(payload: GenerateResponse): void;
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
