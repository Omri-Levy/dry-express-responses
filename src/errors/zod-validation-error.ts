import { ZodError } from 'zod';
import { DryError } from './dry-error';
import { StatusCodes } from 'http-status-codes';

export class ZodValidationError extends DryError {
	status = StatusCodes.BAD_REQUEST;

	constructor(public error: ZodError) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, ZodValidationError.prototype);
	}

	serializeErrors() {
		return this.error.issues.map((err) => {
			const [firstErr] = err.path;

			return {
				message: err.message,
				field: firstErr?.toString(),
			};
		});
	}
}
