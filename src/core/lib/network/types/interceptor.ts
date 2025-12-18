import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { ApiErrorResponse } from "./api";

export type RequestInterceptor = (
    config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

export type RequestErrorInterceptor = (error: AxiosError) => Promise<never>;

export type ResponseInterceptor = (
    response: AxiosResponse
) => AxiosResponse | Promise<AxiosResponse>;

export type ResponseErrorInterceptor = (
    error: AxiosError<ApiErrorResponse>
) => Promise<AxiosResponse | never>;

export interface InterceptorHandlers {
    onRequest?: RequestInterceptor;
    onRequestError?: RequestErrorInterceptor;
    onResponse?: ResponseInterceptor;
    onResponseError?: ResponseErrorInterceptor;
}
