export interface FormattedError {
	field?: string;
	message: string;
}

export interface ResponsePayload<TData> {
	data?: TData;
	message?: string;
	errors?: FormattedError[];
}

export interface ResponseOverloads {
	ok: <TData>(
		payload: Omit<ResponsePayload<TData>, `errors`>,
	) => void;

	created: <TData>(
		payload: Omit<ResponsePayload<TData>, `errors`>,
	) => void;

	badRequest: <TData>(payload: ResponsePayload<TData>) => void;

	unauthorized: <TData>(payload: ResponsePayload<TData>) => void;

	forbidden: <TData>(payload: ResponsePayload<TData>) => void;

	notFound: <TData>(payload: ResponsePayload<TData>) => void;

	internalServerError: <TData>(
		payload: ResponsePayload<TData>,
	) => void;
}
