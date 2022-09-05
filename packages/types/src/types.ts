import type {ZodObject} from 'zod';
import type {
	FormattedError,
	ResponseOverloads,
	ResponsePayload,
} from './interfaces';
import type {Response} from 'express';
import type {StatusCodes} from 'http-status-codes';

export type FormattedErrors = FormattedError[];

export type DryResponse = ResponseOverloads & Response;

export type ResponsePayloadNoErrors<TData> = Omit<ResponsePayload<TData>,
	`errors`>;
export type GenerateResponse<TStatus extends StatusCodes,
	TData,
	> = TStatus extends StatusCodes.OK
	? ResponsePayloadNoErrors<TData>
	: TStatus extends StatusCodes.CREATED
		? ResponsePayloadNoErrors<TData>
		: ResponsePayload<TData>;

export type Ok = <TData>(
	payload?: GenerateResponse<StatusCodes.OK, TData>,
) => void;

export type Created = <TData>(
	payload?: GenerateResponse<StatusCodes.CREATED, TData>,
) => void;

export type BadRequest = <TData>(
	payload?: GenerateResponse<StatusCodes.BAD_REQUEST, TData>,
) => void;

export type Unauthorized = <TData>(
	payload?: GenerateResponse<StatusCodes.UNAUTHORIZED, TData>,
) => void;

export type Forbidden = <TData>(
	payload?: GenerateResponse<StatusCodes.FORBIDDEN, TData>,
) => void;

export type NotFound = <TData>(
	payload?: GenerateResponse<StatusCodes.NOT_FOUND, TData>,
) => void;

export type InternalServerError = <TData>(
	payload?: GenerateResponse<StatusCodes.INTERNAL_SERVER_ERROR,
		TData>,
) => void;

export type RequireOneProperty<T,
	U = { [TKey in keyof T]: Pick<T, TKey> },
	> = Partial<T> & U[keyof U];

type AnyRecord = Record<PropertyKey, any>;

export type BaseRequestSchema<TBody extends AnyRecord = AnyRecord,
	TParams extends AnyRecord = AnyRecord,
	TQuery extends AnyRecord = AnyRecord,
	> = ZodObject<RequireOneProperty<{
	body: ZodObject<TBody>;
	params: ZodObject<TParams>;
	query: ZodObject<TQuery>;
}>>;
