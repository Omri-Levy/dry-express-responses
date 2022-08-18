export interface DryResponses {
	ok: (data: any) => void;
	created: (data: any) => void;
	found: (data: any) => void;
	badRequest: (data: any) => void;
	unauthorized: (data: any) => void;
	forbidden: (data: any) => void;
	notFound: (data: any) => void;
	internalServerError: (data: any) => void;
}
