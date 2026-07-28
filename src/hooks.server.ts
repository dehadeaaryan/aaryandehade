import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

const ALLOWED_ORIGINS = [
	'https://aaryandehade.com',
	'https://www.aaryandehade.com',
	'http://localhost:5173'
];

const handleAllowedOrigins: Handle = async ({ event, resolve }) => {
	const origin = event.request.headers.get('origin');
	if (event.request.method === 'POST' && origin) {
		if (!ALLOWED_ORIGINS.includes(origin)) {
			return new Response('Forbidden: Cross-site POST request rejected.', { status: 403 });
		}
	}
	return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = sequence(handleAllowedOrigins, handleParaglide, handleBetterAuth);
