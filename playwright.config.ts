import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview --host 127.0.0.1',
		url: 'http://127.0.0.1:4173/admin/login',
		timeout: 120_000,
		env: {
			// Never connect browser tests to production accounts or the production database.
			DATABASE_URL: 'postgresql://test:test@127.0.0.1:1/portfolio_test',
			BETTER_AUTH_SECRET: 'local-browser-tests-only-not-a-production-secret',
			ORIGIN: 'http://127.0.0.1:4173',
			AUTH_ORIGIN: 'http://127.0.0.1:4173',
			ADMIN_EMAIL: 'private-admin@example.test',
			GOOGLE_CLIENT_ID: '',
			GOOGLE_CLIENT_SECRET: ''
		}
	},
	use: { baseURL: 'http://127.0.0.1:4173' },
	testDir: './e2e',
	testMatch: '**/*.e2e.ts'
});
