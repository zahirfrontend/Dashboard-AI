import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@core/lib/logger";

export function setupRetryInterceptor(
    instance: AxiosInstance,
    maxRetries: number = 3,
    retryDelay: number = 1000
): void {
    instance.interceptors.response.use(undefined, async (error: AxiosError) => {
        const config = error.config as InternalAxiosRequestConfig & {
            _retryCount?: number;
        };

        if (!config) {
            return Promise.reject(error);
        }

        config._retryCount = config._retryCount ?? 0;

        const shouldRetry =
            config._retryCount < maxRetries &&
            (!error.response || error.response.status >= 500) &&
            config.method &&
            ["get", "head", "options"].includes(config.method.toLowerCase());

        if (!shouldRetry) {
            return Promise.reject(error);
        }

        config._retryCount += 1;

        const delay = retryDelay * Math.pow(2, config._retryCount - 1);

        logger.warn("Retrying request", {
            url: config.url,
            attempt: config._retryCount,
            maxRetries,
            delay,
        });

        await new Promise((resolve) => setTimeout(resolve, delay));

        return instance(config);
    });
}
