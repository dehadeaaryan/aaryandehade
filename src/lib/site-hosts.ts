export const PUBLIC_ORIGIN = 'https://aaryandehade.com';
export const ADMIN_ORIGIN = 'https://admin.aaryandehade.com';

export function isAdminHost(url: URL): boolean {
	return url.origin === ADMIN_ORIGIN;
}

export function isLoopback(url: URL): boolean {
	return ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
}

// Pure routing policy shared with request-handler tests. Never trust arbitrary hosts.
export function hostPolicy(url: URL, routeId: string | null, localOrigin?: string) {
	const local = localOrigin && url.origin === localOrigin && isLoopback(url);
	const adminRoute = routeId === '/admin' || routeId?.startsWith('/admin/');
	const authRoute = url.pathname === '/api/auth' || url.pathname.startsWith('/api/auth/');
	if (local) return { kind: 'serve' as const, authenticate: !!adminRoute || authRoute };
	if (isAdminHost(url)) {
		if (url.pathname === '/admin') return { kind: 'redirect' as const, location: '/' };
		return { kind: 'serve' as const, authenticate: !!adminRoute || authRoute };
	}
	if ([PUBLIC_ORIGIN, 'https://www.aaryandehade.com'].includes(url.origin)) {
		if (authRoute) return { kind: 'reject' as const };
		if (adminRoute) {
			const path = routeId === '/admin' ? '/' : url.pathname;
			return { kind: 'redirect' as const, location: `${ADMIN_ORIGIN}${path}${url.search}` };
		}
		return { kind: 'serve' as const, authenticate: false };
	}
	return { kind: 'reject' as const };
}
