A small ExpressJS middleware written in TypeScript that wraps around
http-status-codes to send consistent responses, reducing the instances
of
res.status, res.send and having to pass a status code and
its associated message.

### How to use

#### Step 1

Create a file in src called dry-express-responses.d.ts and copy the
following content, this is required for the types to work.

```typescript
import {GenerateResponse} from 'dry-express-responses';

declare global {
	declare namespace Express {
		export interface Response {
			ok(payload: Omit<GenerateResponse, 'errors'>): void;

			created(payload: Omit<GenerateResponse, 'errors'>): void;

			badRequest(payload: GenerateResponse): void;

			unauthorized(payload: GenerateResponse): void;

			forbidden(payload: GenerateResponse): void;

			notFound(payload: GenerateResponse): void;

			internalServerError(payload: GenerateResponse): void;
		}
	}
}
```

#### Step 2

Register the middleware.

```typescript
import {dryExpressResponses} from "./dry-express-responses";
import express from 'express';

const app = express();

app.use(dryExpressResponses);
```

#### Example usage

```typescript
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
```
