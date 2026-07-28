import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

const client = postgres(databaseUrl);

export const db = drizzle(client, { schema });
