# Admin subdomain deployment

One repository, one Coolify application, one database. The portfolio is served at `https://aaryandehade.com` (and `www`); the editor is served at `https://admin.aaryandehade.com/`, with its login page at `/admin/login`. No extra container or VPS is needed.

## Before deploying

1. In the authoritative DNS provider for `aaryandehade.com`, create an **A** record named **admin** with the same VPS IPv4 address used by the portfolio. Only add AAAA if that IPv6 address is configured and reachable. A wildcard record is unnecessary.
2. In the existing Google OAuth web client, add this exact **Authorized redirect URI**: `https://admin.aaryandehade.com/api/auth/callback/google`. The existing client ID and secret can be reused. This server-side flow does not require a new JavaScript-origin entry. Keep the old callback temporarily for rollback.
3. In the existing portfolio application's Coolify **Domains** settings, retain `https://aaryandehade.com` and `https://www.aaryandehade.com`, and add `https://admin.aaryandehade.com`. Keep the same internal application port (3000). Let Coolify provision HTTPS for the new hostname. On newer Coolify versions, use **Add domain** with HTTPS, hostname `admin.aaryandehade.com`, and internal port 3000; older versions accept comma-separated domain URLs.
4. Set the following production environment variables:

   ```env
   AUTH_ORIGIN=https://admin.aaryandehade.com
   PROTOCOL_HEADER=x-forwarded-proto
   HOST_HEADER=x-forwarded-host
   ```

   **Remove `ORIGIN` from both runtime and build variables.** A fixed adapter-node `ORIGIN` would make both hostnames appear to be the same site and break host routing. Remove any conflicting `BETTER_AUTH_URL` setting, or align it with `AUTH_ORIGIN`. Keep the existing `DATABASE_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `ADMIN_EMAIL`.

   Keep port 3000 private to Coolify's proxy, without a public host-port mapping. Forwarded headers are trustworthy only when the proxy controls them. Verify that the proxy passes the original host and HTTPS scheme. If DNS is proxied through a CDN, use end-to-end HTTPS (not a flexible HTTP origin).

5. Deploy this code only after DNS, the OAuth callback, domains, and environment settings are ready. Do not enable cross-subdomain cookies. Existing main-domain sessions do not transfer; sign in again on the admin hostname.

The current Coolify probe (`GET http://127.0.0.1:3000/`) receives a lightweight `200 ok` response directly, before routing or database access, so it keeps working with the hostname guard. You can also set Coolify's Health Check path to `/health` (same port 3000, host `127.0.0.1`, method `GET`, scheme `http`, expected status `200`). That endpoint is available only on loopback, performs no database queries, and does not admit arbitrary hostnames.

In the Coolify application's **Health Check** settings, use path `/health`, port `3000`, host `127.0.0.1`, method `GET`, scheme `http`, and expected status `200`. This endpoint bypasses the hostname guard only on loopback and does not query the database, so it checks that the server responds without using the portfolio's database-backed homepage or admitting arbitrary hostnames.

## Verify after deployment

Before deployment, run `bun run check`, `bun run test:unit --run --project server`, and `bun run test:hosts`. The last command checks both production hostnames directly against the built server using test-only credentials, without needing DNS, a local listening port, or the production database. It does not perform a real Google login.

- The portfolio still works on the main domain and `www`.
- The loopback health probes at `http://127.0.0.1:3000/` and `/health` return `200 ok`.
- The loopback health probe at `http://127.0.0.1:3000/health` returns `200 ok`.
- `/admin` on either public domain redirects to `https://admin.aaryandehade.com/`.
- The admin root redirects signed-out visitors to `/admin/login`; Google login returns to the admin hostname.
- Your authorized account can edit content and sign out. Another account cannot load or mutate admin data.
- Admin HTML/auth responses carry `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow`. Do not add a CDN rule that caches them.
- Browser cookies for authentication are Secure and HttpOnly, and have no parent-domain `Domain=.aaryandehade.com` attribute.
- POST requests to public-domain admin pages are rejected rather than redirected. Public-domain `/api/auth/*` requests return 404. Unknown hosts are rejected.
- Missing paths retain the branded 404. Unknown subdomains still do not need wildcard DNS.

After a successful cutover, remove the old Google callback URI. If an access gateway is added later, cover the entire admin hostname, including `/api/auth/*`; the application authorization checks must remain in place.

## Local development

Use the exact same hostname and port in the browser, `AUTH_ORIGIN`, and the local Google callback. For example:

```sh
AUTH_ORIGIN=http://127.0.0.1:5174 bun run dev --host 127.0.0.1 --port 5174 --strictPort
```

Local editor: `http://127.0.0.1:5174/admin`. Local Google callback: `http://127.0.0.1:5174/api/auth/callback/google` (register it in Google if testing actual OAuth). HTTP loopback development uses non-Secure cookies; production HTTPS uses Secure cookies. The real production hostname is not required locally.

If rollback is necessary, redeploy the previous code together with its previous `ORIGIN`/auth configuration and retained OAuth callback; rolling back only environment variables is insufficient.
