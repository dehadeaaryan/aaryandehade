# Aaryan Dehade's portfolio

SvelteKit portfolio with PostgreSQL-backed content and a Google-authenticated admin editor. Projects appear in an animated perspective grid on desktop and horizontal marquees on mobile, with a link to the live apps showcase.

## Development

Use Bun 1.3.11:

```sh
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

Configure `DATABASE_URL`, `ORIGIN`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `ADMIN_EMAIL`. Database configuration is required; there is no embedded credential or remote fallback. URL-encode special characters in database passwords.

```env
DATABASE_URL="postgresql://USER:URL_ENCODED_PASSWORD@HOST:5432/DATABASE"
```

## Content

```sh
bun run db:seed
bun run db:update-projects
```

Seeding inserts missing records inside a transaction and preserves existing records and admin edits. The project update applies the curated descriptions and links to the four live apps and repairs the SuperFrog frontend link. It does not delete historical projects.

`src/lib/portfolio.json` is the public fallback snapshot. Update it when publishing content changes. Each public section is fetched concurrently and cached for 60 seconds per server process. Successful admin changes invalidate the local cache immediately; other replicas refresh within 60 seconds. During database outages each section uses its last successful result, or the bundled snapshot on a fresh process. An intentionally empty section stays empty. Authentication data is never cached here.

## Validation and deployment

```sh
bun run check
bun run test:unit --run --project server
bun run build
```

The Bun Dockerfile is at `src/lib/components/Dockerfile`; build with the repository root as its context. Set the production environment variables, expose port 3000, and run `bun run build/index.js`. Rotate the PostgreSQL password on the database, then update `DATABASE_URL` locally and in the deployment environment and redeploy.
