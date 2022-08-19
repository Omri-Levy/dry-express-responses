import { FormattedError } from '../interfaces';
import { StatusCodes } from 'http-status-codes';

export abstract class DryError extends Error {
	abstract status: StatusCodes;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, DryError.prototype);
	}

	abstract serializeErrors(): Array<Partial<FormattedError>>;
}
