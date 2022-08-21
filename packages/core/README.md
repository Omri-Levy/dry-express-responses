A small ExpressJS middleware written in TypeScript that wraps around
http-status-codes to send consistent responses, reducing the instances
of
res.status, res.send and having to pass a status code and
its associated message.

### How to use

#### Step 1.1

Install dry-express-responses

```bash
npm install @dry-express-responses/core
yarn add @dry-express-responses/core
pnpm add @dry-express-responses/core
```

#### Step 1.2

In addition to responses, an optional global error handler middleware
with errors, and validation errors using zod or yup is also available.
The zod/yup packages are only required for validation errors,
@dry-express-responses/errors can work on its own, for validation
errors both @dry-express-responses/errors and
@dry-express-responses/zod (or yup) are required.

```bash
npm install @dry-express-responses/errors @dry-express-responses/zod
yarn add @dry-express-responses/errors @dry-express-responses/zod
pnpm add @dry-express-responses/errors @dry-express-responses/zod
```

#### Step 2

Create a file in src called dry-express-responses.d.ts and copy the
following content, this is required for the types to work.

```typescript
import {ResponsePayload} from '@dry-express-responses/core';

declare global {
	declare namespace Express {
		export interface Response {
			ok(payload: Omit<ResponsePayload, 'errors'>): void;

			created(payload: Omit<ResponsePayload, 'errors'>): void;

			badRequest(payload: ResponsePayload): void;

			unauthorized(payload: ResponsePayload): void;

			forbidden(payload: ResponsePayload): void;

			notFound(payload: ResponsePayload): void;

			internalServerError(payload: ResponsePayload): void;
		}
	}
}
```

#### Example usage

```typescript
import {dryExpressResponses} from '@dry-express-responses/core';
import {dryExpressErrors, BadRequestError} from '@dry-express-responses/errors';
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

	const result = schema.safeParse({ kebab: 'wrong type!' });

	if (!result.success) {
		throw new ZodValidationError(result.error);
	};
});

// Has to be placed after all the routes and middleware
app.use(dryExpressErrors);

app.listen(3000, () => console.log('listening on port 3000'));
```