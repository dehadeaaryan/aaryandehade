import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL must be configured.');

const client = postgres(databaseUrl, { connect_timeout: 5 });
export const db = drizzle(client, { schema });
