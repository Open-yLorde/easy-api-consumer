# Easy API Consumer - A Node.js library for simplified HTTP requests, authentication, and API communication.

> Repositório oficial: https://github.com/open-ylorde/easy-api-consumer

---

## Resources

- HTTP Client — Simplified interface for making GET, POST, PUT, PATCH and DELETE requests.
- Authentication — Built-in authentication token management with helpers to get, set and clear tokens.
- Authenticated Requests — Easily enable or disable authentication on individual requests.
- Device Information — Utilities for detecting the device type and retrieving the client's IP address.
- Flexible Configuration — Configure a base API URL and customize request behavior according to your application's needs.
- Reusable API Layer — Organize and reuse API endpoints without repeating request configuration.
- TypeScript Support — Fully typed API interface for a better development experience.
- Lightweight & Simple — Designed to provide the features you need without unnecessary complexity.
- Centralized API Management — Keep authentication, API configuration and request handling in one place.

## Installation

```bash
npm install easy-api-consumer
```

## Example Usage

### 1. Define your request interfaces

Create interfaces for the authentication payloads:

```ts
// @/interfaces/ILogin.ts

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}
```

---

### 2. Configure the API client

Initialize `EasyAPIConsumer` with your API's base URL and expose the utilities you need throughout your application:

```ts
// @/lib/api.ts

import { EasyAPIConsumer } from "easy-api-consumer";

const easyApi = new EasyAPIConsumer({
  baseURL: "https://api.site.com",
});

const { api, noAuth, utils, token } = easyApi;

const { getDeviceType, getDeviceIpAddress } = utils;

const {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} = token;

export {
  api,
  noAuth,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  getDeviceType,
  getDeviceIpAddress,
};
```

> `EasyAPIConsumer` handles the API configuration, authentication token management, and device information utilities for you.

---

### 3. Create your API endpoints

You can organize your endpoints by feature. For example, authentication-related requests can be grouped into an `authApi` object:

```ts
// @/lib/endpoints/auth.ts

import { api } from "../api";
import {
  ILoginBody,
  IRegisterBody,
} from "@/interfaces/ILogin";

export const authApi = {
  login: (body: ILoginBody) =>
    api.post(
      "/auth/login",
      body,
      {
        includesDeviceIpAddress: true,
        includesDeviceType: true,
        auth: false,
      }
    ),

  register: (body: IRegisterBody) =>
    api.post(
      "/auth/register",
      body,
      {
        auth: false,
      }
    ),

  me: () =>
    api.get(
      "/auth/me",
      {
        includesDeviceIpAddress: true,
      }
    ),

  logout: () =>
    api.post(
      "/auth/logout",
      {
        includesDeviceIpAddress: true,
      }
    ),
};
```

### 4. Using the endpoints

Once the endpoints are defined, requests can be made directly from your application:

```ts
import { authApi } from "@/lib/endpoints/auth";

const login = async () => {
  const response = await authApi.login({
    email: "user@example.com",
    password: "password",
  });

  console.log(response);
};
```

This approach keeps the API layer organized and makes it easier to maintain and scale as your application grows.

---
### `includesDeviceIpAddress?: boolean`

Whether to include the client's IPv4 address in the request headers. When enabled, the IP address is sent through the `Device-Ip-Address` header.

---
### `includesDeviceType?: boolean`

An optional boolean setting that determines whether the client's device type should be included in the request headers.

When enabled, the device type is added to the `Device-Type` header. The value is an array containing one or more of the following device types:

* `android`
* `ios`
* `windows`
* `macos`
* `linux`
* `unknown`

The supported device types are defined by the `DeviceType` type.
```ts
export type DeviceType = "android" | "ios" | "windows" | "macos" | "linux" | "unknown";
```
---

## License

This project is licensed under the GPL-3.0 License.

## Credits

The implementation of `request.ts` was based on code originally created by [SorPuti](https://github.com/SorPuti).

The code was adapted for this project.

> The original code did not specify a usage license. This credit is provided as attribution to the original author.

## Author

Copyright (c) 2026 Davi de Sousa