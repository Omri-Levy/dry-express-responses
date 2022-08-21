import type { ValidationError } from 'yup';
import { DryError } from '@dry-express-responses/errors';
import { StatusCodes } from 'http-status-codes';

export class YupValidationError extends DryError {
	status = StatusCodes.BAD_REQUEST;

	// eslint-disable-next-line n/handle-callback-err
	constructor(public error: ValidationError) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, YupValidationError.prototype);
	}

	serializeErrors() {
		return this.error.errors.map((err) => {
			return {
				message: err,
				field: this.error.path,
			};
		});
	}
}
