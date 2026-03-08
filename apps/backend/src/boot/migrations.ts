import { db } from "@/db";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

export async function runMigrations() {
  console.log("🔄 Verificando e aplicando migrations...");
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Banco de dados atualizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao rodar migrations:", error);
    process.exit(1);
  }
}
