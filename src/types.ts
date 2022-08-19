import type { FormattedError, ResponseOverloads } from '@interfaces';
import { Response } from 'express';

export type FormattedErrors = Array<FormattedError>;
export type DryResponse = ResponseOverloads & Response;
