import 'express-async-errors';
import type { ZodError } from 'zod';
import { DryError } from '@dry-express-responses/errors';
import { StatusCodes } from 'http-status-codes';

export class ZodValidationError extends DryError {
	status = StatusCodes.BAD_REQUEST;

	// eslint-disable-next-line n/handle-callback-err
	constructor(public error: ZodError) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, ZodValidationError.prototype);
	}

	serializeErrors() {
		return this.error.issues.map((err) => {
			return {
				message: err.message,
				field: err.path?.join(`.`),
			};
		});
	}
}
