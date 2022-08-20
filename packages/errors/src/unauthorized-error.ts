import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { DryError } from './dry-error';

// 401 Unauthorized
export class UnauthorizedError extends DryError {
	status = StatusCodes.UNAUTHORIZED;

	constructor(
		public message: string = getReasonPhrase(
			StatusCodes.UNAUTHORIZED,
		),
	) {
		super(message);

		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
