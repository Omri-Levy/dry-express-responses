import type { ValidationError } from 'yup';
import { DryError } from './dry-error';
import { StatusCodes } from 'http-status-codes';

export class YupValidationError extends DryError {
	status = StatusCodes.BAD_REQUEST;

	constructor(
		public error: ValidationError | Array<ValidationError>,
	) {
		super(`Invalid request parameters.`);

		Object.setPrototypeOf(this, YupValidationError.prototype);
	}

	serializeErrors() {
		if (Array.isArray(this.error)) {
			return this.error.map((err) => {
				return {
					message: err.message,
					field: err.path,
				};
			});
		}

		return [
			{
				message: this.error.message,
				field: this.error.path,
			},
		];
	}
}
