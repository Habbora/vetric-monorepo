import { runMigrations } from "./migrations";

export async function boot() {
  await runMigrations();
}
