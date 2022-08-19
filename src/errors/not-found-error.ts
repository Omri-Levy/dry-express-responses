import { DryError } from './dry-error';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

// 404 Not Found
export class NotFoundError extends DryError {
	status = StatusCodes.NOT_FOUND;

	constructor(
		public message: string = getReasonPhrase(
			StatusCodes.NOT_FOUND,
		),
	) {
		super(message);

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
