import { Response } from 'express';

export interface FormattedError {
	field?: string;
	message: string;
}

export interface GenerateResponse {
	data?: any;
	message?: string;
	errors?: Array<FormattedError> | FormattedError;
}

export interface DryResponse extends Response {
	ok(payload: Omit<GenerateResponse, 'errors'>): void;

	created(payload: Omit<GenerateResponse, 'errors'>): void;

	badRequest(payload: GenerateResponse): void;

	unauthorized(payload: GenerateResponse): void;

	forbidden(payload: GenerateResponse): void;

	notFound(payload: GenerateResponse): void;

	internalServerError(payload: GenerateResponse): void;
}
