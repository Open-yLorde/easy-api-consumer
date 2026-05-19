export function transformKeys(
    obj: unknown,
    transform: (key: string) => string
): unknown {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj))
        return obj.map((item) => transformKeys(item, transform));
    return Object.fromEntries(
        Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
            transform(k),
            transformKeys(v, transform),
        ])
    );
}