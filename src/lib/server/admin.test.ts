import { afterEach, describe, expect, it, vi } from 'vitest';
const { env } = vi.hoisted(() => ({ env: { ADMIN_EMAIL: '' } }));
vi.mock('$env/dynamic/private', () => ({ env }));
import { isAdmin } from './admin';

afterEach(() => {
	env.ADMIN_EMAIL = '';
});
describe('admin authorization', () => {
	it('fails closed without an explicit administrator', () => {
		expect(isAdmin({ email: 'dehadeaaryan@gmail.com', emailVerified: true })).toBe(false);
	});
	it('requires both an exact email match and verification', () => {
		env.ADMIN_EMAIL = ' Admin@example.com ';
		expect(isAdmin({ email: 'admin@example.com', emailVerified: true })).toBe(true);
		expect(isAdmin({ email: 'admin@example.com', emailVerified: false })).toBe(false);
		expect(isAdmin({ email: 'other@example.com', emailVerified: true })).toBe(false);
		expect(isAdmin(null)).toBe(false);
	});
});
