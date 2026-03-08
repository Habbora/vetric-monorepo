import Elysia from "elysia";
import { authRoutes } from "./features/auth";
import { userRoutes } from "./features/users";
import { setupRoutes } from "./features/setup";
import { boot } from "./boot";

// Inicializa o banco de dados (migrations)
await boot();

const app = new Elysia()
  .use(setupRoutes)
  .use(authRoutes)
  .use(userRoutes)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
