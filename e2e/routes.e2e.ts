import { expect, test } from '@playwright/test';

for (const viewport of [
	{ width: 1440, height: 900 },
	{ width: 390, height: 844 }
]) {
	test(`missing pages render an accessible 404 at ${viewport.width}px`, async ({
		page
	}, testInfo) => {
		await page.setViewportSize(viewport);
		await page.route('https://analytics.aaryandehade.com/**', (route) => route.abort());
		const response = await page.goto('/dne');
		expect(response?.status()).toBe(404);
		await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
		await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
			'content',
			'noindex, nofollow'
		);
		await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
		).toBe(true);
		await page.screenshot({ path: testInfo.outputPath('404.png'), fullPage: true });
		await page.getByRole('link', { name: 'Back to portfolio' }).click();
		await expect(page).toHaveURL('/');
		await expect(page).toHaveTitle('Aaryan Dehade | Software Engineer');
		await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://aaryandehade.com/'
		);
	});
}

test('removed demos and nested missing paths return 404', async ({ request }) => {
	for (const path of [
		'/demo',
		'/demo/better-auth',
		'/demo/better-auth/login',
		'/demo/paraglide',
		'/demo/playwright',
		'/admin/dne',
		'/missing/nested/page'
	]) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(404);
	}
});

test('unauthenticated admin requests still redirect to login', async ({ request }) => {
	const response = await request.get('/admin', { maxRedirects: 0 });
	expect(response.status()).toBe(302);
	expect(response.headers().location).toBe('/admin/login');
});

test('login is not indexable and unauthorized errors never disclose the admin email', async ({
	page
}) => {
	await page.route('https://analytics.aaryandehade.com/**', (route) => route.abort());
	await page.goto('/admin/login?error=unauthorized');
	await expect(
		page.getByText('Access denied. You are not authorized to access the admin dashboard.')
	).toBeVisible();
	expect(await page.content()).not.toContain('private-admin@example.test');
	await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
	await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
