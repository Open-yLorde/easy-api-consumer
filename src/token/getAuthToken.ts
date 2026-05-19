import { AUTH_TOKEN_KEY } from "../constants.js";

export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;

    const localStorageToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (localStorageToken) return localStorageToken as string;

    return null;
};