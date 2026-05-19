import { snakeToCamel } from "./snakeToCamel.js";
import { transformKeys } from "./transformKeys.js";

export function toCamelCase<T = unknown>(obj: T): T {
    return transformKeys(obj, snakeToCamel) as T;
}
