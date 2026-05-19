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

```js
import { EasyAPIConsumer } from "easy-api-consumer";

const easyApi = new EasyAPIConsumer({ baseURL: "https://api.site.com" })

const { api, noAuth, token } = easyApi;
const { getAuthToken, setAuthToken, clearAuthToken } = token;

export { api, noAuth, getAuthToken, setAuthToken, clearAuthToken };

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }, noAuth),
  register: (data: Record<string, unknown>) => api.post('/auth/register', data, noAuth),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};
```

## 📄 Licença

MIT

## 👑 Autor

Desenvolvido por **yLorde**
