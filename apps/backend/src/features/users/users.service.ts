import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const UsersService = {
  /**
   * Lista todos os usuários (Apenas para Admin)
   */
  async listAll() {
    return await db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  },

  /**
   * Cria um novo usuário pelo Administrador
   */
  async create(data: { name: string; username: string; password: string; role?: string }) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, data.username),
    });

    if (existingUser) return null;

    const hashedPassword = await Bun.password.hash(data.password);

    const [newUser] = await db
      .insert(users)
      .values({
        name: data.name,
        username: data.username,
        password: hashedPassword,
        role: (data.role as any) || "user",
      })
      .returning();

    return newUser;
  },

  /**
   * Busca um usuário pelo ID
   */
  async findById(id: number) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
};
