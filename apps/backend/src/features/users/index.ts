import { Elysia } from "elysia";
import { authPlugin } from "@/plugins/auth";
import { UsersService } from "./users.service";
import { createUserSchema } from "./users.schema";

/**
 * Feature de Gestão de Usuários (Protegida)
 */
export const userRoutes = new Elysia({ prefix: "/users" })
  .use(authPlugin) // Usa o plugin compartilhado
  .get("/", async ({ authorize }) => {
    await authorize(); // Apenas logados
    return await UsersService.listAll();
  })
  .post("/", async ({ body, set, authorize }) => {
    const userPayload = await authorize();
    
    // Opcional: Apenas admin pode criar
    if (userPayload.role !== 'admin') {
        set.status = 403;
        return { message: "Apenas administradores podem criar usuários." };
    }

    const newUser = await UsersService.create(body);

    if (!newUser) {
      set.status = 409;
      return {
        code: "USER_ALREADY_EXISTS",
        message: "Este e-mail já está cadastrado."
      };
    }

    set.status = 201;
    return {
      message: "Usuário criado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username
      }
    };
  }, {
    body: createUserSchema
  });
