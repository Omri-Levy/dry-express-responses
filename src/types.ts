import { Response } from 'express';
import { GenerateResponse } from './interfaces';

export type DryResponse = Response & {
	ok(payload: Omit<GenerateResponse, 'errors'>): void;

	created(payload: Omit<GenerateResponse, 'errors'>): void;

	badRequest(payload: GenerateResponse): void;

	unauthorized(payload: GenerateResponse): void;

	forbidden(payload: GenerateResponse): void;

	notFound(payload: GenerateResponse): void;

	internalServerError(payload: GenerateResponse): void;
};
