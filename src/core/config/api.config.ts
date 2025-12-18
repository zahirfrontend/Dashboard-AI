import { env } from "./env";

export const apiConfig = {
    jwtSecret: env.JWT_SECRET,
    get jwtExpiresIn() {
        return "7d";
    },
} as const;

export type ApiConfig = typeof apiConfig;
