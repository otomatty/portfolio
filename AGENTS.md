# AGENTS.md

## Cursor Cloud specific instructions

This is a static portfolio site (Astro + React) with no database or external service dependencies. It is deployed to Cloudflare Workers as static assets via the `@astrojs/cloudflare` adapter.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `bun install` |
| Dev server | `bun run dev` (localhost:4321) |
| Lint | `bun run lint` |
| Type check | `bun run typecheck` |
| Build | `bun run build` (outputs to `./dist/client/`) |
| Preview | `bun run preview` (runs in workerd; stop with `bunx astro preview stop`) |
| Deploy | `bun run deploy` (`astro build && wrangler deploy`, requires Cloudflare login) |

### Notes

- **Bun** is the package manager (lockfile: `bun.lock`). Ensure `~/.bun/bin` is on `PATH`.
- The dev server starts on port **4321** by default. Use `bun run dev --host 0.0.0.0` to expose it externally.
- `bun run typecheck` reports deprecation hints for the `Github` icon from `lucide-react` — these are warnings, not errors.
- There is no automated test suite (no Jest/Vitest/Playwright). CI runs lint, typecheck, and build only.
- `cf` (Cloudflare CLI, beta) is installed, but `cf deploy` does not work yet: it requires the Build Output Specification, which the stable `@astrojs/cloudflare` adapter does not emit. Deploy with `wrangler` until the adapter supports it.
- `wrangler.jsonc` sets `assets.not_found_handling: "404-page"` so unknown paths get the prerendered `404.html` (Workers does not do this by default, unlike Pages). `_redirects` / `_headers` in `public/` work as on Pages.
- Production is served only on the custom domain `saedgewell.com` (`routes` with `custom_domain: true`, `workers_dev: false`); `preview_urls: true` keeps per-version preview URLs on workers.dev.
- Continuous deployment uses **Workers Builds** (Cloudflare dashboard Git integration), not GitHub Actions: build command `bun run build`, deploy command `bunx wrangler deploy`, non-production branch deploy command `bunx wrangler versions upload`.
- Optional env vars `GITHUB_USERNAME` and `GITHUB_TOKEN` enable the GitHub contributions chart on the About page; the site works fully without them. They are read at build time, so in Workers Builds they belong under **Build variables**, not the Worker's runtime variables/secrets.
