import { appConfig } from "@core/config/app.config";
import { HttpClient } from "./client";

const DEFAULT_TIMEOUT = 30000;

export const authApiClient = new HttpClient({
    baseURL: appConfig.authUrl,
    timeout: DEFAULT_TIMEOUT,
});
