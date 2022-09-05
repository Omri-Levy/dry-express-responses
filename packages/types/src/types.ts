import type {ZodObject} from 'zod';
import type {
	FormattedError,
	ResponseOverloads,
	ResponsePayload,
} from './interfaces';
import type {Response} from 'express';
import type {StatusCodes} from 'http-status-codes';

export type AnyRecord = Record<PropertyKey, any>;

export type FormattedErrors = FormattedError[];

export type DryResponse = ResponseOverloads & Response;

export type ResponsePayloadNoErrors<TData> = Omit<ResponsePayload<TData>,
	`errors`>;
export type GenerateResponse<TStatus extends StatusCodes,
	TData,
	TPayload extends AnyRecord> = TStatus extends StatusCodes.OK
	? ResponsePayloadNoErrors<TData> & TPayload
	: TStatus extends StatusCodes.CREATED
		? ResponsePayloadNoErrors<TData> & TPayload
		: ResponsePayload<TData> & TPayload;

export type Ok = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.OK, TData, TPayload>,
) => void;

export type Created = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.CREATED, TData, TPayload>,
) => void;

export type BadRequest = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.BAD_REQUEST, TData, TPayload>,
) => void;

export type Unauthorized = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.UNAUTHORIZED, TData, TPayload>,
) => void;

export type Forbidden = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.FORBIDDEN, TData, TPayload>,
) => void;

export type NotFound = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.NOT_FOUND, TData, TPayload>,
) => void;

export type InternalServerError = <TData, TPayload extends AnyRecord>(
	payload?: GenerateResponse<StatusCodes.INTERNAL_SERVER_ERROR,
		TData,
		TPayload>,
) => void;

export type RequireOneProperty<T,
	U = { [TKey in keyof T]: Pick<T, TKey> },
	> = Partial<T> & U[keyof U];

export type BaseRequestSchema<TBody extends AnyRecord = AnyRecord,
	TParams extends AnyRecord = AnyRecord,
	TQuery extends AnyRecord = AnyRecord,
	> = ZodObject<RequireOneProperty<{
	body: ZodObject<TBody>;
	params: ZodObject<TParams>;
	query: ZodObject<TQuery>;
}>>;
