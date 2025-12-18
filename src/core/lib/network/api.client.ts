import { appConfig } from "@core/config/app.config";
import { HttpClient } from "./client";

const DEFAULT_TIMEOUT = 30000;

export const apiClient = new HttpClient({
    baseURL: appConfig.apiUrl,
    timeout: DEFAULT_TIMEOUT,
});
