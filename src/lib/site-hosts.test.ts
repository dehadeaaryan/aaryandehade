import { describe, expect, it } from 'vitest';
import { ADMIN_ORIGIN, PUBLIC_ORIGIN, hostPolicy } from './site-hosts';

describe('admin host boundary', () => {
	it('redirects old public admin links to the dedicated host', () => {
		for (const origin of [PUBLIC_ORIGIN, 'https://www.aaryandehade.com']) {
			expect(hostPolicy(new URL('/admin', origin), '/admin')).toEqual({
				kind: 'redirect',
				location: `${ADMIN_ORIGIN}/`
			});
			expect(
				hostPolicy(new URL('/admin/login?error=unauthorized', origin), '/admin/login')
			).toEqual({ kind: 'redirect', location: `${ADMIN_ORIGIN}/admin/login?error=unauthorized` });
		}
	});
	it('rejects public auth endpoints and unknown hosts', () => {
		expect(hostPolicy(new URL('/api/auth/callback/google', PUBLIC_ORIGIN), null).kind).toBe(
			'reject'
		);
		for (const origin of [
			'https://xyz.aaryandehade.com',
			'https://admin.aaryandehade.com.evil.test',
			'http://admin.aaryandehade.com'
		]) {
			expect(hostPolicy(new URL('/admin', origin), '/admin').kind).toBe('reject');
		}
	});
	it('authenticates admin pages and endpoints but not public page requests', () => {
		expect(hostPolicy(new URL('/', ADMIN_ORIGIN), '/admin')).toEqual({
			kind: 'serve',
			authenticate: true
		});
		expect(hostPolicy(new URL('/api/auth/get-session', ADMIN_ORIGIN), null)).toEqual({
			kind: 'serve',
			authenticate: true
		});
		expect(hostPolicy(new URL('/', PUBLIC_ORIGIN), '/')).toEqual({
			kind: 'serve',
			authenticate: false
		});
	});
	it('allows explicit loopback previews without opening other production hosts', () => {
		const local = 'http://127.0.0.1:4173';
		expect(hostPolicy(new URL('/admin', local), '/admin', local)).toEqual({
			kind: 'serve',
			authenticate: true
		});
		expect(hostPolicy(new URL('/admin', local), '/admin').kind).toBe('reject');
		expect(
			hostPolicy(new URL('/admin', 'https://evil.test'), '/admin', 'https://evil.test').kind
		).toBe('reject');
	});
	it('allows the isolated health probe on loopback only', () => {
		expect(hostPolicy(new URL('http://127.0.0.1:3000/health'), '/health')).toEqual({
			kind: 'serve',
			authenticate: false
		});
		expect(hostPolicy(new URL('http://127.0.0.1:3000/'), '/').kind).toBe('reject');
		expect(hostPolicy(new URL('https://evil.test/health'), '/health').kind).toBe('reject');
	});
});
