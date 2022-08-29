import { generateResponse } from './utils';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import {
	BadRequest,
	Created,
	Forbidden,
	InternalServerError,
	NotFound,
	Ok,
	Unauthorized,
} from '@dry-express-responses/types';

class DryResponses {
	ok: Ok;
	created: Created;
	badRequest: BadRequest;
	unauthorized: Unauthorized;
	forbidden: Forbidden;
	notFound: NotFound;
	internalServerError: InternalServerError;

	constructor(public res: Response) {
		this.ok = generateResponse(res, StatusCodes.OK);

		this.created = generateResponse(res, StatusCodes.CREATED);

		this.badRequest = generateResponse(
			res,
			StatusCodes.BAD_REQUEST,
		);

		this.unauthorized = generateResponse(
			res,
			StatusCodes.UNAUTHORIZED,
		);

		this.forbidden = generateResponse(res, StatusCodes.FORBIDDEN);

		this.notFound = generateResponse(res, StatusCodes.NOT_FOUND);

		this.internalServerError = generateResponse(
			res,
			StatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
}

export const dried = (res: Response) => new DryResponses(res);
