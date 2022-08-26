import { Request } from 'express';
import { BaseRequestSchema } from '@dry-express-responses/types';
import { SafeParseError, z } from 'zod';

/**
 * Makes it possible to pass in the request object with a zod schema for the body, params, or query properties, and returns a typesafe version of body/params/query.
 * Does not throw an error when validation fails.
 * @param zodSchema
 * @param req
 */
export const zSafeParse = <TRequestSchema extends BaseRequestSchema>(
	zodSchema: TRequestSchema,
	req: Request,
):
	| ({ success: true } & z.infer<TRequestSchema>)
	| SafeParseError<z.infer<TRequestSchema>> => {
	const result = zodSchema.safeParse(req);

	if (!result.success) {
		return result;
	}

	const { data, ...rest } = result;

	return {
		...rest,
		...data,
	};
};
