import { Elysia } from "elysia";
import { jwtConfig } from "@/plugins/auth"; // Usa apenas a config base
import { AuthService } from "./auth.service";
import { loginSchema } from "./login.schema";

/**
 * Feature de Autenticação (Pública)
 */
export const authRoutes = new Elysia({ prefix: "/auth" }).use(jwtConfig).post(
  "/login",
  async ({ body, jwt, set }) => {
    const user = await AuthService.validateCredentials(
      body.username,
      body.password
    );

    if (!user) {
      set.status = 401;
      return {
        code: "INVALID_CREDENTIALS",
        message: "Usuário ou senha inválidos.",
      };
    }

    const token = await jwt.sign({
      sub: user.id.toString(),
      email: user.username,
      role: user.role,
    });

    return {
      access_token: token,
    };
  },
  {
    body: loginSchema,
  }
);
