export function buildDatabaseUrl(): string {
  return process.env.DATABASE_URL ?? 'file:./dev.db';
}
