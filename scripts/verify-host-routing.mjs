import assert from 'node:assert/strict';

// Exercise the production request handler without opening a port or using real accounts.
const env = {
	DATABASE_URL: 'postgresql://test:test@127.0.0.1:1/portfolio_test',
	AUTH_ORIGIN: 'https://admin.aaryandehade.com',
	BETTER_AUTH_SECRET: 'local-host-routing-tests-not-a-production-secret',
	ADMIN_EMAIL: 'private-admin@example.test',
	GOOGLE_CLIENT_ID: '',
	GOOGLE_CLIENT_SECRET: ''
};
Object.assign(process.env, env);
const { Server } = await import('../build/server/index.js');
const { manifest } = await import('../build/server/manifest.js');
const server = new Server(manifest);
await server.init({ env });
const publicOrigin = 'https://aaryandehade.com';
const adminOrigin = env.AUTH_ORIGIN;
const request = (origin, path, init) =>
	server.respond(new Request(origin + path, init), { getClientAddress: () => '127.0.0.1' });

for (const origin of [publicOrigin, 'https://www.aaryandehade.com']) {
	const oldAdmin = await request(origin, '/admin');
	assert.equal(oldAdmin.status, 307);
	assert.equal(oldAdmin.headers.get('location'), `${adminOrigin}/`);
	assert.equal((await request(origin, '/api/auth/get-session')).status, 404);
	assert.equal((await request(origin, '/api/auth/callback/google')).status, 404);
	assert.equal((await request(origin, '/admin?/createProject', { method: 'POST' })).status, 403);
}
const admin = await request(adminOrigin, '/');
assert.equal(admin.status, 302);
assert.equal(admin.headers.get('location'), '/admin/login');
assert.equal(admin.headers.get('cache-control'), 'private, no-store');
const login = await request(adminOrigin, '/admin/login?error=unauthorized');
assert.equal(login.status, 200);
assert.equal(login.headers.get('x-robots-tag'), 'noindex, nofollow');
const loginHtml = await login.text();
assert.ok(loginHtml.includes('You are not authorized'));
assert.ok(!loginHtml.includes(env.ADMIN_EMAIL));
assert.ok(loginHtml.includes(`href="${publicOrigin}"`));

const session = await request(adminOrigin, '/api/auth/get-session');
assert.equal(session.status, 200);
assert.equal(await session.json(), null);
for (const path of ['/', '/admin/login']) {
	const crossOrigin = await request(adminOrigin, path, {
		method: 'POST',
		headers: { origin: publicOrigin, 'content-type': 'application/x-www-form-urlencoded' },
		body: ''
	});
	assert.equal(crossOrigin.status, 403);
}
const edit = await request(adminOrigin, '/?/createProject', {
	method: 'POST',
	headers: {
		origin: adminOrigin,
		'content-type': 'application/x-www-form-urlencoded',
		accept: 'application/json'
	},
	body: 'title=ShouldNotSave&description=Unauthorized'
});
const failure = await edit.json();
assert.equal(failure.type, 'failure');
assert.equal(failure.status, 401);
assert.equal((await request('https://xyz.aaryandehade.com', '/admin')).status, 404);
for (const origin of [publicOrigin, adminOrigin]) {
	const missing = await request(origin, '/dne');
	assert.equal(missing.status, 404);
	assert.ok((await missing.text()).includes('Page not found'));
}
const home = await request(publicOrigin, '/');
assert.equal(home.status, 200);
assert.ok((await home.text()).includes('Aaryan Dehade | Software Engineer'));
console.log('PASS production host routing, auth boundary, CSRF, admin denial, metadata, and 404s');
process.exit(0);
