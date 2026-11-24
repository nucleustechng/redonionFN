# redonion (landing)

The public Redonion landing page at https://redonion.io.

The signed-in app (login, sign-up, dashboard) lives in the separate `app.redonion` project. The landing page links to it through `NEXT_PUBLIC_APP_URL`, and old `/auth/*` and `/dashboard/*` URLs redirect there (see `next.config.mjs`).

## Stack

Next.js 16 (App Router, static export of `/`), React 19, Tailwind CSS 4. No UI library. The page is a server component; only the header's mobile menu runs on the client.

## Links

External URLs (app stores, social, legal pages, support contact) live in `src/lib/links.ts`. An empty value hides that link or badge, so fill them in as they become available.

## Getting started

Requires Node.js 20.9 or newer.

```bash
cp .env.example .env.local   # optional; defaults to https://app.redonion.io
npm install
npm run dev                  # http://localhost:3000
npm run lint
npm run build
```

For local work on both projects, set `NEXT_PUBLIC_APP_URL=http://localhost:3001` and run `app.redonion` with `npm run dev`.

## Deploying (Netlify)

`netlify.toml` holds the build settings: `npm run build`, publish directory `.next`, Node 22.
Netlify adds its Next.js runtime automatically, so no plugin needs installing.

In the Netlify site settings:

- **Branch to deploy:** `main` (the repository's default branch is `master`, which holds older code).
- **Base directory:** leave empty (the project is at the repository root).
- **Environment variables (optional):** `NEXT_PUBLIC_APP_URL` if the app isn't at `https://app.redonion.io`.
