import { Elysia } from "elysia";
import { setupSchema } from "./setup.schema";
import { SetupService } from "./setup.service";

/**
 * Feature de Setup do Sistema
 * Gerencia a inicialização do primeiro admin e nome do sistema.
 */
export const setupRoutes = new Elysia({ prefix: "/setup" })
  /**
   * GET /setup
   * Verifica o status de inicialização do sistema.
   */
  .get("/", async ({ set }) => {
    const status = await SetupService.getStatus();
    if (!status) {
      set.status = 404;
      return null;
    }
    return status;
  })

  /**
   * POST /setup
   * Realiza a primeira configuração e criação do primeiro usuário admin.
   */
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const result = await SetupService.initialize(body);

        if (!result) {
          set.status = 404;
          return null;
        }

        return result;
      } catch (error: any) {
        set.status = error.status || 400;
        return {
          code: "SETUP_ERROR",
          message: error.message || "Erro durante a inicialização do sistema.",
        };
      }
    },
    {
      body: setupSchema,
    }
  );
