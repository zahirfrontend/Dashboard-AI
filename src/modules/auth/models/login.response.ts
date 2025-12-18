export interface LoginUser {
    name: string;
    email: string;
}

export interface LoginResponse {
    access_token: string;
    internal_access_token: string;
    refresh_token: string;
    expires_in: number;
    expired_at: string;
    user: LoginUser;
}
