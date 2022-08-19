import { DryError } from './dry-error';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

// 403 Forbidden
export class ForbiddenError extends DryError {
	status = StatusCodes.FORBIDDEN;

	constructor(
		public message: string = getReasonPhrase(
			StatusCodes.FORBIDDEN,
		),
	) {
		super(message);

		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
