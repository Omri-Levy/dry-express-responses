import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { DryError } from './dry-error';
import { ErrorRequestHandler } from 'express';
import { DryExpressErrorsOptions } from '@dry-express-responses/types';

export const dryExpressErrors = <
	TPayload extends Record<PropertyKey, any>
>({
	logger = console.error,
	payload,
}: DryExpressErrorsOptions<TPayload> = {}): ErrorRequestHandler => (
	err,
	req,
	res,
	next,
) => {
	if (err instanceof DryError) {
		const errors = err.serializeErrors();

		logger(errors);

		return res.status(err.status).send({
			status: getReasonPhrase(err.status),
			errors,
			...payload,
		});
	}

	logger(err);

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
		status: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		...payload,
	});
};
