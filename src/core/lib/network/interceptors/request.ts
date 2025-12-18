import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { logger } from "@core/lib/logger";
import { storage } from "@core/lib/storage";

export function setupRequestInterceptor(instance: AxiosInstance): void {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const skipAuth = config.headers?.["X-Skip-Auth"] === "true";
            const skipSlug = config.headers?.["X-Skip-Slug"] === "true";

            if (!skipAuth) {
                const result = storage.get("accessToken");
                if (result.success && result.data) {
                    config.headers.Authorization = `Bearer ${result.data}`;
                }
            }

            if (!skipSlug) {
                const result = storage.get("slug");
                if (result.success && result.data) {
                    config.headers.slug = result.data;
                }
            }

            delete config.headers["X-Skip-Auth"];
            delete config.headers["X-Skip-Slug"];

            logger.debug("HTTP Request", {
                method: config.method?.toUpperCase(),
                url: config.url,
                baseURL: config.baseURL,
            });

            return config;
        },
        (error: AxiosError) => {
            logger.error("HTTP Request Error", { error: error.message });
            return Promise.reject(error);
        }
    );
}
