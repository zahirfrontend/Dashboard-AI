import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        JWT_SECRET: z.string().min(32),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.url(),
        NEXT_PUBLIC_API_URL: z.url(),
        NEXT_PUBLIC_AUTH_URL: z.url(),
        NEXT_PUBLIC_CLIENT_ID: z.string(),
        NEXT_PUBLIC_CLIENT_SECRET: z.string(),
    },
    runtimeEnv: {
        JWT_SECRET: process.env.JWT_SECRET,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
        NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    },
    skipValidation: false,
    emptyStringAsUndefined: true,
});
