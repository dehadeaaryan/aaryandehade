import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { env } from '$env/dynamic/private';

const ALLOWED_ADMIN_EMAIL = env.ADMIN_EMAIL || 'dehadeaaryan@gmail.com';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		if (event.locals.user.email?.toLowerCase() === ALLOWED_ADMIN_EMAIL.toLowerCase()) {
			throw redirect(302, '/admin');
		}
	}

	const error = event.url.searchParams.get('error');
	if (error === 'unauthorized') {
		return { error: `Access denied. Only ${ALLOWED_ADMIN_EMAIL} is authorized to access the admin dashboard.` };
	}

	return {};
};

export const actions: Actions = {
	signInGoogle: async (event) => {
		try {
			const res = await auth.api.signInSocial({
				body: {
					provider: 'google',
					callbackURL: '/admin'
				},
				asResponse: true
			});

			const location = res.headers.get('location');
			if (location) {
				throw redirect(302, location);
			}
		} catch (error) {
			if (error instanceof Response || (error && typeof error === 'object' && 'status' in error && error.status === 302)) {
				throw error;
			}
			console.error('Google OAuth error:', error);
			return fail(500, { error: 'Failed to initiate Google authentication.' });
		}

		return fail(500, { error: 'Failed to initiate Google authentication.' });
	}
};
