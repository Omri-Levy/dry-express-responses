import {
	generateResponse,
	reasonPhraseToCamelCase,
	startToCamelCase,
} from './utils';
import {
	badRequest,
	created,
	forbidden,
	internalServerError,
	notFound,
	ok,
	unauthorized,
} from './responses';
import type {
	BadRequest,
	Created,
	DryResponse,
	Forbidden,
	FormattedError,
	FormattedErrors,
	GenerateResponse,
	InternalServerError,
	NotFound,
	Ok,
	ResponseOverloads,
	ResponsePayload,
	ResponsePayloadNoErrors,
	Unauthorized,
} from '@dry-express-responses/types';
import { dryExpressResponses } from './dry-express-responses';

export {
	dryExpressResponses,
	generateResponse,
	reasonPhraseToCamelCase,
	startToCamelCase,
	ok,
	created,
	badRequest,
	unauthorized,
	forbidden,
	notFound,
	internalServerError,
};
export type {
	DryResponse,
	FormattedError,
	FormattedErrors,
	ResponsePayload,
	ResponseOverloads,
	GenerateResponse,
	ResponsePayloadNoErrors,
	Ok,
	Created,
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	InternalServerError,
};
