import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { dev } from '$app/environment';
import { ADMIN_ORIGIN } from '$lib/site-hosts';

const authOrigin = env.AUTH_ORIGIN || (dev ? 'http://localhost:5173' : ADMIN_ORIGIN);

export const auth = betterAuth({
	baseURL: authOrigin,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	trustedOrigins: [authOrigin],
	advanced: {
		useSecureCookies: new URL(authOrigin).protocol === 'https:'
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID || '',
			clientSecret: env.GOOGLE_CLIENT_SECRET || ''
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
