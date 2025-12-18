import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "./api";

export class HttpError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string,
        public errors?: Record<string, string[]>,
        public originalError?: AxiosError
    ) {
        super(message);
        this.name = "HttpError";
    }

    static fromAxiosError(error: AxiosError<ApiErrorResponse>): HttpError {
        const response = error.response;
        const data = response?.data;

        return new HttpError(
            data?.message ?? error.message ?? "An unexpected error occurred",
            response?.status ?? 500,
            data?.code,
            data?.errors,
            error
        );
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isNotFound(): boolean {
        return this.status === 404;
    }

    get isValidationError(): boolean {
        return this.status === 422;
    }

    get isServerError(): boolean {
        return this.status >= 500;
    }

    get isNetworkError(): boolean {
        return this.status === 0 || !this.originalError?.response;
    }
}
