import { FormattedError } from '@dry-express-responses/types';
import { StatusCodes } from 'http-status-codes';

export abstract class DryError extends Error {
	abstract status: StatusCodes;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, DryError.prototype);
	}

	abstract serializeErrors(): Array<
		Pick<FormattedError, `message`>
	>;
}
