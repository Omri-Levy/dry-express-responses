# Credit to packages used in this project
- zod - https://github.com/colinhacks/zod
- yup - https://github.com/jquense/yup
- http-status-codes - https://github.com/prettymuchbryce/http-status-codes
- express - https://github.com/expressjs/express
- express-async-errors - https://github.com/davidbanham/express-async-errors

### Description
A small ExpressJS middleware written in TypeScript that wraps around
http-status-codes to send consistent responses, reducing the instances
of
res.status, res.send and having to pass a status code and
its associated message.

### How to use

#### Step 1.1

Install dry-express-responses

```bash
npm install @dry-express-responses/core @dry-express-responses/types
yarn add @dry-express-responses/core @dry-express-responses/types
pnpm add @dry-express-responses/core @dry-express-responses/types
```

#### Step 1.2

In addition to responses, an optional global error handler middleware
with errors, and validation errors using zod or yup is also available.
The zod/yup packages are only required for validation errors,
@dry-express-responses/errors can work on its own, for validation
errors both @dry-express-responses/errors and
@dry-express-responses/zod (or yup) are required.

```bash
npm install @dry-express-responses/errors @dry-express-responses/zod @dry-express-responses/types
yarn add @dry-express-responses/errors @dry-express-responses/zod @dry-express-responses/types
pnpm add @dry-express-responses/errors @dry-express-responses/zod @dry-express-responses/types
```

#### Step 2

Create a file in src called dry-express-responses.d.ts and copy the
following content, this is required for the types to work.

```typescript
import {
	BadRequest,
	Created,
	Forbidden,
	InternalServerError,
	NotFound,
	Ok,
	Unauthorized,
} from '@dry-express-responses/types';

declare global {
	declare namespace Express {
		export interface Response {
			ok: Ok;

			created: Created;

			badRequest: BadRequest;

			unauthorized: Unauthorized;

			forbidden: Forbidden;

			notFound: NotFound;

			internalServerError: InternalServerError;
		}
	}
}
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
// Can be used with yup instead
import z from 'zod';

const app = express();

// Can use either or both of the middleware
app.use(dryExpressResponses);

app.get('/', (req, res) => {
	res.badRequest({
		data: {
			email: 'foo@bar.com',
		},
		message: 'This is a bad request',
		errors: [
			{
				field: 'email',
				message: 'invalid email',
			},
		],
	});
});

app.post('/oops', (req, res) => {
	throw new BadRequestError();
});

app.put('/validate', (req, res) => {
	const schema = z.object({
		kebab: z.object({}),
	});

	const result = schema.safeParse({kebab: 'wrong type!'});

	if (!result.success) {
		// Uses express-async-errors under the hood
		throw new ZodValidationError(result.error);
	}
	;
});

// Has to be placed after all the routes and middleware
app.use(dryExpressErrors);

app.listen(3000, () => console.log('listening on port 3000'));
```
