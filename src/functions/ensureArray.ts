export function ensureArray<T>(res: T | T[] | null | undefined): T[] {
    if (res == null) return [];
    return Array.isArray(res) ? res : [res];
}