import { createApi } from "./src/api.ts";
import { request } from "./src/request.ts";
import { noAuth } from "./src/noAuth.ts";

import { getAuthToken } from "./src/token/getAuthToken.ts";
import { setAuthToken } from "./src/token/setAuthToken.ts";
import { clearAuthToken } from "./src/token/clearAuthToken.ts";

import { snakeToCamel } from "./src/functions/snakeToCamel.ts";
import { toCamelCase } from "./src/functions/toCamelCase.ts";
import { toSnakeCase } from "./src/functions/toSnakeCase.ts";
import { ensureArray } from "./src/functions/ensureArray.ts";
import { transformKeys } from "./src/functions/transformKeys.ts";

import { getDeviceType } from "./src/utils/getDeviceType.ts";
import { getDeviceIpAddress } from "./src/utils/getDeviceIpAddress.ts";
import { IApiConfig } from "./src/interfaces/IApiConfig.ts";

export class EasyAPIConsumer {
    api;
    noAuth = noAuth;

    constructor(config: IApiConfig) {
        this.api = createApi(config);
    };

    request = request;

    token = {
        getAuthToken,
        setAuthToken,
        clearAuthToken,
    };

    functions = {
        snakeToCamel,
        toCamelCase,
        toSnakeCase,
        ensureArray,
        transformKeys,
    };

    utils = {
        getDeviceType,
        getDeviceIpAddress,
    };
}