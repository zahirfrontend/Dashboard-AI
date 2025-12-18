import { env } from "./env";

export const appConfig = {
    appUrl: env.NEXT_PUBLIC_APP_URL,
    apiUrl: env.NEXT_PUBLIC_API_URL,
    authUrl: env.NEXT_PUBLIC_AUTH_URL,
    get isProduction() {
        return this.appUrl.includes("production");
    },
    app: {
        version: "V1.25.12.8",
        build: "1",
    },
    secret: {
        client_id: env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: env.NEXT_PUBLIC_CLIENT_SECRET,
    },
} as const;

export type AppConfig = typeof appConfig;
