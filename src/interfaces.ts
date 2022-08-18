export interface FormattedError {
	field?: string;
	message: string;
}

export interface GenerateResponse {
	data?: any;
	message?: string;
	errors?: Array<FormattedError> | FormattedError;
}
