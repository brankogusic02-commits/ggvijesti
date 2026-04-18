# Deploying GGVijesti

The site is a **static export** — `npm run build` produces a fully static `./out/` folder that works on any static host.

## Netlify (recommended, one-click)

1. Push this repo to GitHub.
2. On [netlify.com](https://app.netlify.com/) → **Add new site → Import from Git** → pick this repo.
3. Netlify will detect `netlify.toml`. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Node version:** 20 (set via `netlify.toml`)
4. Deploy. Every push to `main` triggers a new build.

### Custom domain

In Netlify: **Site settings → Domain management → Add custom domain** → enter `ggvijesti.com`. Follow their DNS instructions (either nameservers to Netlify, or a CNAME/ALIAS to `<your-site>.netlify.app`).

HTTPS is provisioned automatically via Let's Encrypt once DNS resolves.

## Manual deploy (any static host)

```bash
npm ci
npm run build
# upload ./out/ to your host (S3, Cloudflare Pages, GitHub Pages, etc.)
```

## Local dev

```bash
npm install
npm run dev
```

## Troubleshooting

- **Build fails on a post:** check MDX frontmatter. `category` must match a slug in `lib/categories.ts`.
- **Images missing:** `coverImage` URLs must be absolute (https://…) or live under `public/`.
- **404 on article after adding:** rebuild. Static export snapshots slugs at build time; dev mode re-reads on the fly.
