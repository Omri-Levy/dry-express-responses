export interface FormattedError {
	field?: string;
	message: string;
}

export interface ResponsePayload<TData> {
	data?: TData;
	message?: string;
	errors?: FormattedError[];
};

export interface ResponseOverloads {
	ok: <TData, TPayload>(
		payload: Omit<ResponsePayload<TData>, `errors`> & TPayload,
	) => void;

	created: <TData, TPayload>(
		payload: Omit<ResponsePayload<TData>, `errors`> & TPayload,
	) => void;

	badRequest: <TData, TPayload>(payload: ResponsePayload<TData> & TPayload) => void;

	unauthorized: <TData, TPayload>(payload: ResponsePayload<TData> & TPayload) => void;

	forbidden: <TData, TPayload>(payload: ResponsePayload<TData> & TPayload) => void;

	notFound: <TData, TPayload>(payload: ResponsePayload<TData> & TPayload) => void;

	internalServerError: <TData, TPayload>(
		payload: ResponsePayload<TData> & TPayload,
	) => void;
}

export interface DryExpressErrorsOptions<TPayload> {
	logger?: (messages: Array<Pick<FormattedError, `message`>>) => void;
	payload?: TPayload;
}
