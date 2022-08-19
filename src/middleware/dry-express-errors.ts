import { ErrorRequestHandler } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { DryError } from '../errors/dry-error';

export const dryExpressErrors: ErrorRequestHandler = (
	err,
	req,
	res,
	next,
) => {
	if (err instanceof DryError) {
		const errors = err.serializeErrors();

		console.error(errors);

		return res.status(err.status).send({ errors });
	}

	console.error(err);

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
		status: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
	});
};
