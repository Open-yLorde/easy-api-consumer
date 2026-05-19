// const rawUrl = (process.env.API_URL as string | undefined) ?? '/api';

export const AUTH_TOKEN_KEY = 'access_token';
// export const API_BASE_URL = rawUrl.replace(/\/+$/, '');

export const AUTH_EVENTS = {
    UNAUTHORIZED: 'auth:unauthorized',
} as const;