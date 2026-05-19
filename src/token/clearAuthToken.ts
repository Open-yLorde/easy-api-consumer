import { AUTH_TOKEN_KEY } from "../constants.js";

export function clearAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
};
