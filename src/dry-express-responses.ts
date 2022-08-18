import type { NextFunction, Request, Response } from 'express';
import type { DryResponses } from './interfaces';
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
	// 400 Bad Request
	// 401 Unauthorized
	// 403 Forbidden
	// 404 Not Found
	// 500 Internal Server Error

	next();
};
