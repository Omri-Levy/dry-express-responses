import { GenerateResponse } from './interfaces';

declare global {
	declare namespace Express {
		export interface Response {
			ok(payload: Omit<GenerateResponse, 'errors'>): void;

			created(payload: Omit<GenerateResponse, 'errors'>): void;

			badRequest(payload: GenerateResponse): void;

			unauthorized(payload: GenerateResponse): void;

			forbidden(payload: GenerateResponse): void;

			notFound(payload: GenerateResponse): void;

			internalServerError(payload: GenerateResponse): void;
		}
	}
}
