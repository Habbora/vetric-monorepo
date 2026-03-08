import { db } from "@/db";
import { settings, users } from "@/db/schema";
import { PasswordUtils } from "@/utils/password";
import { count } from "drizzle-orm";

export class SetupService {
  /**
   * Verifica o status do sistema.
   * Se não houver configurações, ou se não estiver inicializado, o setup está liberado.
   */
  static async getStatus() {
    const [config] = await db.select().from(settings).limit(1);

    if (config?.isInitialized) {
      return null;
    }

    return {
      isInitialized: false,
      systemName: null,
      message: "Sistema aguardando inicialização.",
    };
  }

  /**
   * Inicializa o sistema com o primeiro admin e configurações de sistema.
   */
  static async initialize(data: any) {
    // 1. Verificar se já existe um admin (trava de segurança definitiva)
    const [userCount] = await db.select({ value: count() }).from(users);
    if (userCount && userCount.value > 0) {
      return null;
    }

    // 2. Hash da senha do Administrador
    const hashedPassword = await PasswordUtils.hash(data.user.password);

    // 3. Criar o usuário Administrador
    const [admin] = await db
      .insert(users)
      .values({
        name: data.user.name,
        username: data.user.username,
        password: hashedPassword,
        role: "admin",
      })
      .returning();

    // 4. Criar a configuração do sistema
    await db.insert(settings).values({
      systemName: data.system.name,
      isInitialized: true,
    });

    return {
      success: true,
      adminId: admin?.id,
      system: data.system.name,
    };
  }
}
