import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL must be configured.');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: dbUrl },
	verbose: true,
	strict: true
});
