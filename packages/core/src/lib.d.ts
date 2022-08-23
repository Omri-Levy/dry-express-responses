import {
	BadRequest,
	Created,
	Forbidden,
	InternalServerError,
	NotFound,
	Ok,
	Unauthorized,
} from '@dry-express-responses/types';

declare global {
	declare namespace Express {
		export interface Response {
			ok: Ok;

			created: Created;

			badRequest: BadRequest;

			unauthorized: Unauthorized;

			forbidden: Forbidden;

			notFound: NotFound;

			internalServerError: InternalServerError;
		}
	}
}
