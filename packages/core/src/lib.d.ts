import type { ResponsePayload } from '@dry-express-responses/types';

declare global {
	declare namespace Express {
		export interface Response {
			ok(payload: Omit<ResponsePayload, `errors`>): void;

			created(payload: Omit<ResponsePayload, `errors`>): void;

			badRequest(payload: ResponsePayload): void;

			unauthorized(payload: ResponsePayload): void;

			forbidden(payload: ResponsePayload): void;

			notFound(payload: ResponsePayload): void;

			internalServerError(payload: ResponsePayload): void;
		}
	}
}
