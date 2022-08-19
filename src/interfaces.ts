export interface FormattedError {
	field?: string;
	message: string;
}

export interface ResponsePayload {
	data?: any;
	message?: string;
	errors?: Array<FormattedError>;
}

export interface ResponseOverloads {
	ok(payload: Omit<ResponsePayload, 'errors'>): void;

	created(payload: Omit<ResponsePayload, 'errors'>): void;

	badRequest(payload: ResponsePayload): void;

	unauthorized(payload: ResponsePayload): void;

	forbidden(payload: ResponsePayload): void;

	notFound(payload: ResponsePayload): void;

	internalServerError(payload: ResponsePayload): void;
}
