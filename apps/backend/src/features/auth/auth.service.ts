import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PasswordUtils } from "@/utils/password";

export const AuthService = {
  /**
   * Valida as credenciais de um usuário usando PasswordUtils
   */
  async validateCredentials(username: string, password: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) return null;

    const isValid = await PasswordUtils.verify(password, user.password);
    
    if (!isValid) return null;

    return user;
  },

  /**
   * Cria um novo usuário com senha hasheada
   */
  async createUser(data: { name: string; username: string; password: string }) {
    // 1. Verificar se o usuário já existe
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, data.username),
    });

    if (existingUser) return null;

    // 2. Hash da senha usando nosso utilitário
    const hashedPassword = await PasswordUtils.hash(data.password);

    // 3. Inserir no banco via Drizzle
    const [newUser] = await db
      .insert(users)
      .values({
        name: data.name,
        username: data.username,
        password: hashedPassword,
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
