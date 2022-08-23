import { generateResponse } from './utils';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

export const ok = (res: Response) =>
	generateResponse(res, StatusCodes.OK);

export const created = (res: Response) =>
	generateResponse(res, StatusCodes.CREATED);

export const badRequest = (res: Response) =>
	generateResponse(res, StatusCodes.BAD_REQUEST);

export const unauthorized = (res: Response) =>
	generateResponse(res, StatusCodes.UNAUTHORIZED);

export const forbidden = (res: Response) =>
	generateResponse(res, StatusCodes.FORBIDDEN);

export const notFound = (res: Response) =>
	generateResponse(res, StatusCodes.NOT_FOUND);

export const internalServerError = (res: Response) =>
	generateResponse(res, StatusCodes.INTERNAL_SERVER_ERROR);
