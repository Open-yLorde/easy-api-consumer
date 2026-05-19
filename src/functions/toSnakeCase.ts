import { camelToSnake } from "./camelToSnake";
import { transformKeys } from "./transformKeys";

export function toSnakeCase<T = unknown>(obj: T): T {
    return transformKeys(obj, camelToSnake) as T;
}