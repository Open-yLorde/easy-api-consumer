export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly detail: string | Record<string, unknown> | null,
        public readonly response: Response
    ) {
        const message =
            typeof detail === 'string'
                ? detail
                : detail && typeof detail === 'object' && 'message' in detail
                    ? String((detail as { message?: unknown }).message)
                    : `Request failed with status ${status}`;
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }
}