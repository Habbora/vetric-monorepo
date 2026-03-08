import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

/**
 * Configuração Base do JWT
 * Use isso em qualquer lugar que precise assinar ou ler tokens (ex: Login)
 */
export const jwtConfig = new Elysia({ name: 'jwt-config' })
  .use(
    jwt({
      name: "jwt",
      secret: "super-secret",
      exp: "7d",
    })
  );

/**
 * Plugin de Autenticação (Proteção)
 * Use isso em rotas que exigem que o usuário esteja logado.
 */
export const authPlugin = new Elysia({ name: 'auth-plugin' })
  .use(jwtConfig)
  .derive({ as: 'global' }, async ({ jwt, headers, set }) => {
    return {
      authorize: async () => {
        const auth = headers['authorization'];
        if (!auth?.startsWith('Bearer ')) {
            set.status = 401;
            throw new Error('Unauthorized');
        }

        const token = auth.slice(7);
        const payload = await jwt.verify(token);

        if (!payload) {
            set.status = 401;
            throw new Error('Unauthorized');
        }

        return payload;
      }
    };
  });
