import { request } from "./request";

interface IApiConfig {
    baseURL?: string;
}

export const createApi = (config: IApiConfig = {}) => ({
    get: <T = unknown>(path: string, options?: any) =>
        request<T>("GET", config.baseURL + path, options),

    post: <T = unknown>(path: string, body?: unknown, options?: any) =>
        request<T>("POST", config.baseURL + path, { ...options, body }),

    put: <T = unknown>(path: string, body?: unknown, options?: any) =>
        request<T>("PUT", config.baseURL + path, { ...options, body }),

    patch: <T = unknown>(path: string, body?: unknown, options?: any) =>
        request<T>("PATCH", config.baseURL + path, { ...options, body }),

    delete: <T = unknown>(path: string, options?: any) =>
        request<T>("DELETE", config.baseURL + path, options),
});