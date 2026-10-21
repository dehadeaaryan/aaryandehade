import { sequence } from '@sveltejs/kit/hooks';
import { building, dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { hostPolicy, isLoopback } from '$lib/site-hosts';

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
	if (building) return resolve(event);
	// Coolify's current probe calls GET / on 127.0.0.1. Answer before page loads
	// so health checks neither expose app routes on unknown hosts nor query Postgres.
	if (isLoopback(event.url) && event.url.pathname === '/' && event.request.method === 'GET') {
		return new Response('ok', {
			status: 200,
			headers: { 'cache-control': 'no-store', 'content-type': 'text/plain; charset=utf-8' }
		});
	}
	const localOrigin = dev && isLoopback(event.url) ? event.url.origin : env.AUTH_ORIGIN;
	const policy = hostPolicy(event.url, event.route.id, localOrigin);
	if (policy.kind === 'reject') return new Response('Not found', { status: 404 });
	if (policy.kind === 'redirect') {
		if (!['GET', 'HEAD'].includes(event.request.method)) {
			return new Response('Forbidden', { status: 403 });
		}
		return new Response(null, { status: 307, headers: { location: policy.location } });
	}
	if (!policy.authenticate) return resolve(event);
	const origin = event.request.headers.get('origin');
	if (
		!['GET', 'HEAD', 'OPTIONS'].includes(event.request.method) &&
		origin &&
		origin !== event.url.origin
	) {
		return new Response('Forbidden', { status: 403 });
	}
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	const response = await svelteKitHandler({ event, resolve, auth, building });
	const headers = new Headers(response.headers);
	headers.set('cache-control', 'private, no-store');
	headers.set('x-robots-tag', 'noindex, nofollow');
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};

export const handle: Handle = sequence(handleParaglide, handleBetterAuth);
