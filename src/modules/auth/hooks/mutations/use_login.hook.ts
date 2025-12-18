"use client";

import { useRouter } from "next/navigation";
import { storage } from "@core/lib/storage";
import { useAppMutation } from "@core/lib/query";
import { loginService } from "@modules/auth/services/login.service";
import { LoginCredentials } from "@modules/auth/models/login_credentials";
import ROUTES from "@common/constants/routes";

export function useLogin() {
    const router = useRouter();

    return useAppMutation(
        (credentials: LoginCredentials) => loginService.login(credentials),
        {
            onSuccess: (data) => {
                const result = storage.set("accessToken", data.access_token);
                if (!result.success) {
                    console.error("Failed to save access token:", result.error);
                    return;
                }
                router.push(ROUTES.COMPANY.LIST);
            },
        }
    );
}
