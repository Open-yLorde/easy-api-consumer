import { IRequestOptions } from "./interfaces/IRequestOptions.ts";
import { toSnakeCase } from "./functions/toSnakeCase.ts";
import { clearAuthToken } from "./token/clearAuthToken.ts";
import { getAuthToken } from "./token/getAuthToken.ts";
import { AUTH_EVENTS } from "./constants.ts";
import { ApiError } from "./types/api.ts";

export async function request<T = unknown>(
    method: string,
    path: string,
    options: IRequestOptions = {}
): Promise<T> {
    const {
        body,
        headers = {},
        signal,
        timeout = 30000,
        auth = true,
        silent401 = false,
        camelCase = false,
        bodyAsIs = false,
        skipSlashRetry = false,
    } = options;

    // const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    const url: string = path;

    const isFormData = body instanceof FormData;
    const reqHeaders: Record<string, string> = {
        'ngrok-skip-browser-warning': '1',
        ...headers,
    };
    if (!isFormData) reqHeaders['Content-Type'] = 'application/json';

    if (auth !== false) {
        const token = getAuthToken();
        if (token) reqHeaders['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId =
        timeout > 0
            ? setTimeout(() => controller.abort(), timeout)
            : undefined;
    if (signal) {
        signal.addEventListener('abort', () => controller.abort());
    }
    const combinedSignal = timeout > 0 ? controller.signal : signal;

    const serializedBody =
        body != null && !isFormData
            ? JSON.stringify(
                bodyAsIs ? body : camelCase ? body : toSnakeCase(body)
            )
            : undefined;

    const doFetch = (href: string): Promise<Response> =>
        fetch(href, {
            method,
            credentials: 'include', /* envia cookie de sessão; dupla via com Bearer acima */
            headers: reqHeaders,
            body: isFormData
                ? (body as FormData)
                : serializedBody,
            signal: combinedSignal,
        });

    let response = await doFetch(url);

    if (
        !skipSlashRetry &&
        (response.status === 404 || response.status === 405) &&
        path.startsWith('/')
    ) {
        const altPath = path.endsWith('/') ? path.slice(0, -1) : `${path}/`;
        // const altUrl = path.startsWith('http') ? path : `${API_BASE_URL}${altPath}`;
        response = await doFetch(path);
    }

    if (timeoutId != null) clearTimeout(timeoutId);

    if (response.status === 401 && auth !== false && !silent401) {
        clearAuthToken();
        window.dispatchEvent(
            new CustomEvent(AUTH_EVENTS.UNAUTHORIZED, { detail: response })
        );
    }

    let detail: string | Record<string, unknown> | null = null;
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
        if (contentType?.includes('application/json')) {
            try {
                const data = await response.json();
                detail =
                    data.detail != null
                        ? data.detail
                        : data.message != null
                            ? data.message
                            : data;
                if (typeof detail !== 'string' && typeof detail === 'object')
                    detail = detail as Record<string, unknown>;
            } catch {
                detail = await response.text();
            }
        } else {
            detail = await response.text();
        }

        throw new ApiError(response.status, detail, response);
    }

    if (contentType?.includes('application/json')) {
        const data = await (response.json() as Promise<unknown>);
        return toSnakeCase(data) as T;
    }
    return response.text() as unknown as T;
}