# jamesptorres.com

Personal ERP blog. Astro + Markdown, deployed to GitHub Pages by GitHub Actions.

## Write a post

```bash
npm install            # once
npm run new -- "My post title"   # creates src/content/blog/my-post-title.md (draft: true)
npm run dev            # preview at http://localhost:4321 (drafts visible)
```

Set `draft: false`, commit, push to `main`. Live in ~1-2 minutes.

- Images: put them next to the post (e.g. `src/content/blog/images/<post>/`) and reference relatively. Astro optimizes them. Crop, compress, and **redact tenant/customer data** first.
- Tags: lowercase, hyphenated (`d365-fo`, `ai`, `headless-erp`).
- Files starting with `_` in `src/content/blog/` are ignored.

## Headshot

Drop a square photo at `src/assets/headshot.jpg` (or .png/.webp), at least 400x400. It appears on the home page intro, the About page, and the sign-off at the end of each post. Without it, a "JT" monogram shows instead.

## Code blocks

Shiki has no X++ grammar. Use ```` ```csharp ```` for X++ snippets; it highlights well.

## Site settings

`src/consts.ts`: title, tagline, author bio, links, disclaimer, Cloudflare Web Analytics token.

## One-time setup

1. GitHub repo: https://github.com/jamesptorres/jamesptorres
2. Push this folder to `main`.
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. **Settings → Pages → Custom domain:** `jamesptorres.com`, then tick **Enforce HTTPS** once the cert is issued.
5. DNS at the registrar:
   - `A` @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME` www → `jamesptorres.github.io`
6. Optional: verify the domain under your GitHub account (Settings → Pages) to prevent takeover.
7. Analytics: create a Cloudflare Web Analytics site, paste the token into `CF_ANALYTICS_TOKEN`.

## Structure

```
src/content/blog/     posts (Markdown)
src/pages/            about.md, contributions.md, blog/, tags/, rss.xml.js
src/layouts/          Base (SEO/nav/footer), Post, Page
public/               favicon, og-default.png, robots.txt
docs/post-template.md template used by `npm run new`
```
