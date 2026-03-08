import { t } from "elysia";

export const setupSchema = t.Object({
  system: t.Object({
    name: t.String({ minLength: 3, description: "Nome fantasia do sistema" }),
  }),
  user: t.Object({
    name: t.String({ minLength: 3, description: "Nome completo do administrador" }),
    username: t.String({ minLength: 3, description: "Login do administrador" }),
    password: t.String({ minLength: 6, description: "Senha (mínimo 6 caracteres)" }),
  }),
});
