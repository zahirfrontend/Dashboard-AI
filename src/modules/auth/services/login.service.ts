"use client";

import { appConfig } from "@core/config/app.config";
import { authApiClient } from "@core/lib/network/auth.client";

import { LoginRequest } from "../models/login.request";
import { LoginResponse } from "../models/login.response";
import { LoginCredentials } from "../models/login_credentials";

export const loginService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const requestBody: LoginRequest = {
            grant_type: "internal_access",
            client_id: appConfig.secret.client_id,
            client_secret: appConfig.secret.client_secret,
            email: credentials.email,
            password: credentials.password,
        };

        const response = await authApiClient.post<LoginResponse>(
            "/zahir_id/oauth/internal/token",
            requestBody,
            {
                skipAuth: true,
            }
        );

        return response;
    },
};
