import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: dbUrl },
	verbose: true,
	strict: true
});
