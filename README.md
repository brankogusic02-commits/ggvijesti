# GGVijesti

> Real world. Gaming mindset.

A news blog where real-world events are written in Fortnite/Minecraft/gaming language. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **MDX** articles served from the filesystem. Static-exported for hosting on Netlify, Vercel, GitHub Pages, or any static host.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Adding a new article

1. Create a new `.mdx` file in `content/posts/`. The filename (without extension) becomes the URL slug — e.g. `content/posts/my-article.mdx` → `/posts/my-article/`.
2. Add frontmatter at the top:

```mdx
---
title: "Your headline"
date: "2026-04-18"
category: "world-drop-zone"   # one of the CategorySlug values
tags: ["tag1", "tag2"]
author: "Your name"
excerpt: "Short hook shown on the card and in meta tags."
coverImage: "https://your-image-url.jpg"
featured: false
---

Your MDX content here. Standard markdown plus any MDX features.
```

3. Commit. That's it — no CMS, no DB.

### Available categories

| Slug | Display name |
| --- | --- |
| `world-drop-zone` | World Drop Zone |
| `hr-server` | HR Server |
| `economy-patch` | Economy Patch |
| `politik-boss-fight` | Politik Boss Fight |
| `gg-or-no-gg` | GG or No GG |

Defined in `lib/categories.ts`. Add or rename there if needed.

## Folder structure

```
app/                  Next.js App Router pages
  page.tsx              Homepage (hero + filtered feed)
  posts/[slug]/         Article detail page
  category/[category]/  Category landing page
  layout.tsx            Root layout, fonts, metadata
  globals.css           Tailwind + theme
components/           UI components (Header, ArticleCard, etc.)
content/posts/        MDX articles — just add files
lib/                  Post loader, categories, MDX config
public/               Static assets
netlify.toml          Netlify deploy config
next.config.mjs       Static export config
tailwind.config.ts    Theme tokens (dark, neon)
```

## Build & deploy

```bash
npm run build   # produces ./out (static site)
```

Netlify config is in `netlify.toml`. Connect the repo on Netlify and deploys happen automatically on push to `main`. See [.github/README.md](./.github/README.md) for details.

## Extending

Ideas for later, all easy to add:

- **Newsletter:** drop a client component in `Footer.tsx` that posts to Buttondown / ConvertKit.
- **Comments:** integrate Giscus (GitHub Discussions) by embedding its script in `app/posts/[slug]/page.tsx`.
- **RSS feed:** generate `public/rss.xml` during build inside a custom script.
- **More categories:** add to `lib/categories.ts` and Tailwind will handle the styling automatically.

## License

MIT — do whatever you want.
