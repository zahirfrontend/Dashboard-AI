export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    status: number;
    success: boolean;
}

export interface ApiErrorResponse {
    message: string;
    code?: string;
    errors?: Record<string, string[]>;
    status: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
