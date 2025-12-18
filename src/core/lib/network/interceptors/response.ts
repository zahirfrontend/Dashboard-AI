import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@core/lib/logger";
import { storage } from "@core/lib/storage";
import type { ApiErrorResponse } from "../types";
import { HttpError } from "../types";

export function setupResponseInterceptor(instance: AxiosInstance): void {
    instance.interceptors.response.use(
        (response) => {
            logger.debug("HTTP Response", {
                status: response.status,
                url: response.config.url,
            });
            return response;
        },
        async (error: AxiosError<ApiErrorResponse>) => {
            const originalRequest = error.config as InternalAxiosRequestConfig;

            if (!originalRequest) {
                return Promise.reject(HttpError.fromAxiosError(error));
            }

            if (error.response?.status === 401) {
                storage.remove("accessToken");
            }

            logger.error("HTTP Response Error", {
                status: error.response?.status,
                message: error.response?.data?.message ?? error.message,
                url: originalRequest.url,
            });

            return Promise.reject(HttpError.fromAxiosError(error));
        }
    );
}
