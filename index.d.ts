declare module "easy-api-consumer" {
    export interface IRequestOptions {
        body?: unknown;
        headers?: Record<string, string>;
        signal?: AbortSignal;
        timeout?: number;
        auth?: boolean;
        silent401?: boolean;
        camelCase?: boolean;
        bodyAsIs?: boolean;
        skipSlashRetry?: boolean;
    }

    export interface IStriderConfig {
        baseURL?: string;
    }

    export interface IApi {
        get<T = unknown>(
            path: string,
            options?: IRequestOptions
        ): Promise<T>;

        post<T = unknown>(
            path: string,
            body?: unknown,
            options?: IRequestOptions
        ): Promise<T>;

        put<T = unknown>(
            path: string,
            body?: unknown,
            options?: IRequestOptions
        ): Promise<T>;

        patch<T = unknown>(
            path: string,
            body?: unknown,
            options?: IRequestOptions
        ): Promise<T>;

        delete<T = unknown>(
            path: string,
            options?: IRequestOptions
        ): Promise<T>;
    }

    export function createApi(config?: IStriderConfig): IApi;

    export const noAuth: {
        auth: false;
    };

    export function request<T = unknown>(
        method: string,
        path: string,
        options?: IRequestOptions
    ): Promise<T>;

    export function getAuthToken(): string | null;
    export function setAuthToken(token: string): void;
    export function clearAuthToken(): void;

    export function snakeToCamel(value: string): string;
    export function toCamelCase<T = unknown>(obj: T): T;
    export function toSnakeCase<T = unknown>(obj: T): T;
    export function ensureArray<T>(
        value: T | T[] | null | undefined
    ): T[];

    export function transformKeys(
        obj: unknown,
        transform: (key: string) => string
    ): unknown;

    export class StriderFramework {
        api: IApi;
        noAuth: typeof noAuth;

        constructor(config?: IStriderConfig);

        request: typeof request;

        token: {
            getAuthToken: typeof getAuthToken;
            setAuthToken: typeof setAuthToken;
            clearAuthToken: typeof clearAuthToken;
        };

        functions: {
            snakeToCamel: typeof snakeToCamel;
            toCamelCase: typeof toCamelCase;
            toSnakeCase: typeof toSnakeCase;
            ensureArray: typeof ensureArray;
            transformKeys: typeof transformKeys;
        };
    }
}