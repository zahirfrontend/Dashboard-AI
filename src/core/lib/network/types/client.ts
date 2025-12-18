import type { AxiosRequestConfig } from "axios";

export interface HttpClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    withCredentials?: boolean;
}

export interface RetryConfig {
    maxRetries: number;
    retryDelay: number;
    retryCondition?: (error: unknown) => boolean;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<AxiosRequestConfig, "url" | "method"> {
    skipAuth?: boolean;
    retry?: boolean | Partial<RetryConfig>;
}
