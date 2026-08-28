# Easy API Consumer

Uma biblioteca Node.js moderna para facilitar requisições HTTP, autenticação e criação de APIs de forma simples, organizada e reutilizável.

> Repositório oficial: https://github.com/open-ylorde/easy-api-consumer

---

## ✨ Recursos

- 📦 Estrutura modular
- 🌐 Sistema de requests simplificado
- 🔐 Suporte a autenticação via token
- 🧩 Fácil integração com outros projetos
- ⚡ Compatível com ESModules (`import/export`)
- 🛠 Tipagem via `index.d.ts`

## 📥 Instalação

```bash
npm install https://github.com/open-ylorde/easy-api-consumer
```

## 🚀 Uso Básico

```ts
import { EasyAPIConsumer } from "easy-api-consumer";

const easyApi = new EasyAPIConsumer({ baseURL: "https://api.site.com" })

const { api, noAuth, token } = easyApi;
const { getDeviceType, getDeviceIpAddress } = utils;
const { getAuthToken, setAuthToken, clearAuthToken } = token;

export { api, noAuth, getAuthToken, setAuthToken, clearAuthToken, getDeviceType, getDeviceIpAddress };

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }, noAuth),
  register: (data: Record<string, unknown>) => api.post('/auth/register', data, noAuth),
  me: () => api.get('/auth/me', { includesDeviceIpAddress: true }),
  logout: () => api.post('/auth/logout', { includesDeviceIpAddress: true } ),
};
```
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

## 📄 Licença

MIT

## 👑 Autor

Desenvolvido por **yLorde**
