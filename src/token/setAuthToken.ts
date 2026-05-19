import { AUTH_TOKEN_KEY } from "../constants.js";

export function setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};