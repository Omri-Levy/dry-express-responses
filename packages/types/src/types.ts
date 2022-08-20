import type { FormattedError, ResponseOverloads } from './interfaces';
import type { Response } from 'express';

export type FormattedErrors = Array<FormattedError>;
export type DryResponse = ResponseOverloads & Response;
