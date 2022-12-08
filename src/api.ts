import {
    Configuration,
    ErrorContext,
    Middleware,
    ResponseContext,
    ResponseError,
} from "./api_client";

const backend = (window as any).ENV.backend;

// Mirror of the ApiExceptionResponse class on the backend
export type ApiExceptionResponse = {
    description: string;
    errors?: string[];
};

export class DetailedError extends Error {
    override name: "DetailedError" = "DetailedError";

    constructor(public innerError: ResponseError | null, public help?: React.ReactNode) {
        super();
    }
}

export type Interceptors = {
    onBadRequest: (res: ApiExceptionResponse) => void;
    onUnauthorized: () => void;
    onForbidden: () => void;
    onServerError: (res: ApiExceptionResponse) => void;
};

class ErrorHandlerMiddleware implements Middleware {
    interceptors: Interceptors | undefined;

    async post(context: ResponseContext): Promise<Response | void> {
        if (context.response.status >= 400) {
            switch (context.response.status) {
                case 400: {
                    const res = (await context.response.json()) as ApiExceptionResponse;
                    this.interceptors?.onBadRequest(res);
                    break;
                }
                case 401:
                    this.interceptors?.onUnauthorized();
                    break;
                case 403:
                    this.interceptors?.onForbidden();
                    break;
                case 500: {
                    const res = (await context.response.json()) as ApiExceptionResponse;
                    this.interceptors?.onServerError(res);
                    break;
                }
                default:
                    break;
            }
        }

        return context.response;
    }

    async onError(context: ErrorContext): Promise<Response | void> {
        // At this point, fetch() threw an Error, so this cast is always safe
        const error = context.error as Error;

        const res: ApiExceptionResponse = {
            description: "An error occurred while performing a request.",
            errors: [error.message],
        };

        return new Response(JSON.stringify(res), { status: 400 });
    }
}

const errorHandlerMiddleware = new ErrorHandlerMiddleware();

export function setupInterceptors(interceptors: Interceptors) {
    errorHandlerMiddleware.interceptors = interceptors;
}

export const config = new Configuration({
    basePath: backend,
    middleware: [errorHandlerMiddleware],
});
