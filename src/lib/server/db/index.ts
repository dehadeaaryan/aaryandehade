import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

const databaseUrl =
	process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')
		? process.env.DATABASE_URL
		: 'postgres://postgres:UmRjEXhzSllQFZiPDTJ2EjYRpD6MGLR2aMwzp3eamgy4cHbP9wTT5tAoz5SY1ePu@177.7.50.56:5432/postgres';

const client = postgres(databaseUrl);

export const db = drizzle(client, { schema });
