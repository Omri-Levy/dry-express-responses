import type { NextFunction, Request, Response } from 'express';
import type { DryResponses } from './interfaces';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const dryExpressResponses = (
	req: Request,
	res: Response & DryResponses,
	next: NextFunction,
) => {
	// 200 OK
	res.ok = (data?: any, message?: string) =>
		res.status(StatusCodes.OK).send({
			status: ReasonPhrases.OK,
			data,
			message,
		});
	// 201 Created
	// 302 Found
	// 400 Bad Request
	// 401 Unauthorized
	// 403 Forbidden
	// 404 Not Found
	// 500 Internal Server Error

	next();
};
