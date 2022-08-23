import type {
	FormattedError,
	ResponseOverloads,
	ResponsePayload,
} from './interfaces';
import type { Response } from 'express';
import type { StatusCodes } from 'http-status-codes';

export type FormattedErrors = FormattedError[];
export type DryResponse = ResponseOverloads & Response;
export type ResponsePayloadNoErrors<TData> = Omit<
	ResponsePayload<TData>,
	`errors`
>;
export type GenerateResponse<
	TStatus extends StatusCodes,
	TData,
> = TStatus extends StatusCodes.OK
	? ResponsePayloadNoErrors<TData>
	: TStatus extends StatusCodes.CREATED
	? ResponsePayloadNoErrors<TData>
	: ResponsePayload<TData>;
