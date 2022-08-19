import type {
	FormattedError,
	ResponseOverloads,
	ResponsePayload,
} from '@interfaces';
import { dryExpressErrors, dryExpressResponses } from '@middleware';
import { generateResponse, reasonPhraseToCamelCase } from '@utils';
import {
	BadRequestError,
	DryError,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
	YupValidationError,
	ZodValidationError,
} from '@errors';
import type { DryResponse, FormattedErrors } from '@types';

export {
	dryExpressResponses,
	dryExpressErrors,
	generateResponse,
	reasonPhraseToCamelCase,
	DryError,
	BadRequestError,
	NotFoundError,
	ForbiddenError,
	InternalServerError,
	UnauthorizedError,
	ZodValidationError,
	YupValidationError,
};
export type {
	DryResponse,
	FormattedError,
	FormattedErrors,
	ResponsePayload,
	ResponseOverloads,
};
