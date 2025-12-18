import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import type { HttpClientConfig, RequestOptions } from "../types";
import {
    setupRequestInterceptor,
    setupResponseInterceptor,
    setupRetryInterceptor,
} from "../interceptors";

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_HEADERS: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export function createHttpClient(config: HttpClientConfig): AxiosInstance {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout ?? DEFAULT_TIMEOUT,
        headers: {
            ...DEFAULT_HEADERS,
            ...config.headers,
        },
        withCredentials: config.withCredentials ?? false,
    });

    setupRequestInterceptor(instance);
    setupResponseInterceptor(instance);

    return instance;
}

export function createHttpClientWithRetry(
    config: HttpClientConfig,
    retryConfig?: { maxRetries?: number; retryDelay?: number }
): AxiosInstance {
    const instance = createHttpClient(config);
    setupRetryInterceptor(
        instance,
        retryConfig?.maxRetries,
        retryConfig?.retryDelay
    );
    return instance;
}

export class HttpClient {
    private instance: AxiosInstance;

    constructor(config: HttpClientConfig) {
        this.instance = createHttpClient(config);
    }

    get axiosInstance(): AxiosInstance {
        return this.instance;
    }

    async get<T>(url: string, options?: RequestOptions): Promise<T> {
        const config = this.buildConfig(options);
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    async post<T, D = unknown>(
        url: string,
        data?: D,
        options?: RequestOptions
    ): Promise<T> {
        const config = this.buildConfig(options);
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    async put<T, D = unknown>(
        url: string,
        data?: D,
        options?: RequestOptions
    ): Promise<T> {
        const config = this.buildConfig(options);
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    async patch<T, D = unknown>(
        url: string,
        data?: D,
        options?: RequestOptions
    ): Promise<T> {
        const config = this.buildConfig(options);
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, options?: RequestOptions): Promise<T> {
        const config = this.buildConfig(options);
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }

    async upload<T>(
        url: string,
        formData: FormData,
        options?: RequestOptions & {
            onUploadProgress?: (progress: number) => void;
        }
    ): Promise<T> {
        const config: AxiosRequestConfig = {
            ...this.buildConfig(options),
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: options?.onUploadProgress
                ? (progressEvent) => {
                      const total = progressEvent.total ?? 0;
                      const progress =
                          total > 0
                              ? Math.round((progressEvent.loaded * 100) / total)
                              : 0;
                      options.onUploadProgress?.(progress);
                  }
                : undefined,
        };

        const response = await this.instance.post<T>(url, formData, config);
        return response.data;
    }

    async download(
        url: string,
        options?: RequestOptions & {
            onDownloadProgress?: (progress: number) => void;
        }
    ): Promise<Blob> {
        const config: AxiosRequestConfig = {
            ...this.buildConfig(options),
            responseType: "blob",
            onDownloadProgress: options?.onDownloadProgress
                ? (progressEvent) => {
                      const total = progressEvent.total ?? 0;
                      const progress =
                          total > 0
                              ? Math.round((progressEvent.loaded * 100) / total)
                              : 0;
                      options.onDownloadProgress?.(progress);
                  }
                : undefined,
        };

        const response = await this.instance.get<Blob>(url, config);
        return response.data;
    }

    private buildConfig(options?: RequestOptions): AxiosRequestConfig {
        if (!options) return {};

        const { skipAuth, retry, ...axiosConfig } = options;
        void retry;

        return {
            ...axiosConfig,
            headers: {
                ...axiosConfig.headers,
                ...(skipAuth && { "X-Skip-Auth": "true" }),
            },
        };
    }
}
