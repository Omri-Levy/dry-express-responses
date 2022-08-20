import type { FormattedError, ResponseOverloads } from './interfaces';
import type { Response } from 'express';

export type FormattedErrors = FormattedError[];
export type DryResponse = ResponseOverloads & Response;
