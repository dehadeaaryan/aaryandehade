Security review performed on November 14, 2026.

The lockfile audit fell from 81 findings (7 critical, 33 high, 31 moderate, 10 low) to 3 low findings. Counts include development dependencies and optional integrations; a dependency advisory does not establish that this application's configuration is exploitable.

Changes made:

- Updated framework, authentication, Storybook, Vitest, and other compatible dependencies. Upgraded Better Auth and the supported `auth` CLI together to 1.7.25, removing the obsolete `@better-auth/cli` package. The existing Google-only core account schema is compatible with this release: https://better-auth.com/docs/guides/1-7-upgrade-guide
- Added explicit overrides for patched transitive packages. The esbuild and minimatch overrides cross major or pre-1.0 minor boundaries; production compilation, server tests, lint, and Drizzle schema export exercise the affected tooling. Revisit overrides as upstream dependencies adopt patched versions.
- Centralized admin authorization. Both the dashboard and every content mutation require a verified email matching the explicitly configured `ADMIN_EMAIL`. An unset administrator now denies access instead of granting access to a hard-coded fallback address.
- Rejected unsafe stored link schemes at every link-writing action. Sanitized existing links when loading public and admin pages, including fallback portfolio snapshots. Tests cover executable schemes, browser-normalized control characters, protocol-relative links, and permitted URLs.
- Bound the Docker PostgreSQL port to loopback and replaced its committed password with a required environment variable.
- Kept authentication initialization usable during build analysis with a build-only placeholder. At runtime Better Auth still requires a real secret.
- Updated the host-routing check to import SvelteKit's compiled server output, since the updated adapter bundles its server entrypoints.

Deployment requirements:

- Set `ADMIN_EMAIL` to the administrator's verified Google email before deploying.
- Set `BETTER_AUTH_SECRET` to a high-entropy secret of at least 32 characters, and configure the Google OAuth credentials and production `AUTH_ORIGIN`.
- Set `POSTGRES_PASSWORD` for local Docker and use the same URL-encoded password in `DATABASE_URL`. Changing this variable does not change credentials in an existing PostgreSQL volume. If the previously committed password was used for an existing database, rotate that database user's password separately and update its clients. No live credentials or databases were changed during this review.

Remaining dependency advisories:

- `@sveltejs/kit`: https://github.com/advisories/GHSA-pfhg-q3qv-9q6r concerns redirects influenced by untrusted form actions. The application's actions use fixed internal destinations; the Google OAuth redirect is supplied by Better Auth. The upstream patch is in SvelteKit 3, which requires a separate framework migration.
- `@sveltejs/kit`: https://github.com/advisories/GHSA-27mw-82g8-phjj requires prerendering a page with an attacker-controlled cache-control value. No such prerender configuration or header source was found. The upstream patch is in SvelteKit 3.
- `deepmerge`: https://github.com/advisories/GHSA-gcqx-w48m-w2h4 has no published patched release. It is pulled in by build tooling; no application code merges attacker-controlled objects through this package. Track upstream remediation.

This review covers the checked-out source and lockfile. Live Google OAuth sign-in, deployed proxy configuration, production database permissions, and infrastructure were not tested.

Verification completed:

- Production build passed.
- Type checking passed with zero errors and zero warnings.
- Server unit tests passed: 26 tests across 5 files.
- Production host-routing checks passed, including public/admin separation, CSRF denial, unauthenticated mutation denial, private cache headers, metadata, and unknown-host rejection.
- ESLint passed for changed source files and the routing verification script.
- Drizzle schema export passed without connecting to a database or modifying one.
- Final `bun audit` reported 3 low findings, with no moderate, high, or critical findings. It continues to exit nonzero for those remaining advisories.
- Browser and live OAuth tests were not run.
