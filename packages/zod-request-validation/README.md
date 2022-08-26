# Credit to packages used in this project

- zod - https://github.com/colinhacks/zod
- yup - https://github.com/jquense/yup
- http-status-codes
  - https://github.com/prettymuchbryce/http-status-codes
- express - https://github.com/expressjs/express
- express-async-errors
  - https://github.com/davidbanham/express-async-errors

### Description

A small wrapper around zod's parse and safe parse to streamline
validating a request's body, params, or query, and returning a
typesafe version of the objects. Works best with
@dry-express-responses/errors and @dry-express-responses/zod.

### How to use

#### Step 1

Install @dry-express-responses/zod-request-validation

```bash
npm install @dry-express-responses/zod-request-validation
yarn add @dry-express-responses/zod-request-validation
pnpm add @dry-express-responses/zod-request-validation
```

#### Step 2 (optional)

In addition to validation using ```zSafeParse```, an optional global
error handler middleware ```dryExpressErrors```
with ```@dry-express-responses/errors```,
and a custom zod validation error ```ZodValidationError```
with ```@dry-express-responses/zod``` are available. The ```zParse```
function throws ```ZodValidationError``` under the hood.

```bash
npm install @dry-express-responses/errors @dry-express-responses/zod
yarn add @dry-express-responses/errors @dry-express-responses/zod
pnpm add @dry-express-responses/errors @dry-express-responses/zod
```

#### Example usage

```typescript
import {dryExpressResponses} from '@dry-express-responses/core';
import {
	dryExpressErrors,
	BadRequestError
} from '@dry-express-responses/errors';
import {ZodValidationError} from '@dry-express-responses/zod';
import express from 'express';
import z from 'zod';
import {
	zParse,
	zSafeParse
} from "@dry-express-responses/zod-request-validation";

const app = express();

app.post('/zod-parse', (req, res) => {
	// Throws ZodValidationError when validation fails.
	const {body} = zParse(
		// Can be one of the properties or all of them (body/params/query).
		z.object({
			body: z.object({
				name: z.string(),
			}),
			params: z.object({
				id: z.string().uuid(),
			}),
			query: z.object({
				// Will always return a string!
				page: z.preprocess((value) => {
					if (typeof value !== 'string') return value;

					try {
						return value ? JSON.parse(value) : value;
					} catch {
						return value;
					}
				}, z.number()),
			}),
		}),
		req
	);

	// Typesafe with autocomplete!
	res.send(body.name);
});

app.post('/zod-safe-parse', (req, res) => {
	const result = zSafeParse(
		// Can be one of the properties or all of them (body/params/query).
		z.object({
			body: z.object({
				name: z.string(),
			}),
			params: z.object({
				id: z.string().uuid(),
			}),
			query: z.object({
				// Will always return a string!
				page: z.preprocess((value) => {
					if (typeof value !== 'string') return value;

					try {
						return value ? JSON.parse(value) : value;
					} catch {
						return value;
					}
				}, z.number()),
			}),
		}),
		req
	);

	// Checking if the result is success asserts that body/query/params are on the result object.
	if (!result.success) {
		// Uses express-async-errors under the hood
		throw new ZodValidationError(result.error);
	}
	;

	// Typesafe with autocomplete!
	res.send(result.body.name);
});

app.listen(3000, () => console.log('listening on port 3000'));
```
