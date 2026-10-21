import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import { isAdminHost } from '$lib/site-hosts';

export const reroute: Reroute = ({ url }) => {
	const path = deLocalizeUrl(url).pathname;
	return isAdminHost(url) && path === '/' ? '/admin' : path;
};
