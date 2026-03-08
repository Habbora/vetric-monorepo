import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  username: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["admin", "user"]).default("user"),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
