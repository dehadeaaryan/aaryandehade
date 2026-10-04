import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

function createDatabase() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) throw new Error('DATABASE_URL must be configured.');
	return drizzle(postgres(databaseUrl, { connect_timeout: 5 }), { schema });
}

type Database = ReturnType<typeof createDatabase>;
let database: Database | undefined;

// SvelteKit imports server modules during build analysis. Initialize only when
// something actually uses the database, including standalone Bun scripts.
export const db = new Proxy({} as Database, {
	get(_target, property) {
		const instance = (database ??= createDatabase());
		const value = Reflect.get(instance, property);
		return typeof value === 'function' ? value.bind(instance) : value;
	}
});
