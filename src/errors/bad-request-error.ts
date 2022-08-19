import { DryError } from './dry-error';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

// 400 Bad Request
export class BadRequestError extends DryError {
	status = StatusCodes.BAD_REQUEST;

	constructor(
		public message: string = getReasonPhrase(
			StatusCodes.BAD_REQUEST,
		),
	) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
