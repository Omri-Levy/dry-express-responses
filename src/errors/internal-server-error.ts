import { DryError } from './dry-error';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

// 500 Internal Server Error
export class InternalServerError extends DryError {
	status = StatusCodes.INTERNAL_SERVER_ERROR;

	constructor(
		public message: string = getReasonPhrase(
			StatusCodes.INTERNAL_SERVER_ERROR,
		),
	) {
		super(message);

		Object.setPrototypeOf(this, InternalServerError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
