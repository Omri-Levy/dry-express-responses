import { z, ZodError } from 'zod';
import type { Request } from 'express';
import { ZodValidationError } from '@dry-express-responses/zod';
import { BaseRequestSchema } from '@dry-express-responses/types';

/**
 * Makes it possible to pass in the request object with a zod schema for the body, params, or query properties, and returns a typesafe version of body/params/query.
 * Throws ZodValidationError from @dry-express-responses/zod when validation fails.
 * @param zodSchema
 * @param req
 */
export const zParse = async <
	TRequestSchema extends BaseRequestSchema,
>(
	zodSchema: TRequestSchema,
	req: Request,
): Promise<z.infer<TRequestSchema>> => {
	try {
		return zodSchema.parse(req);
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ZodValidationError(err);
		}

		throw err;
	}
};
