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
    includesDeviceType?: boolean;
    includesDeviceIpAddress?: boolean;
}