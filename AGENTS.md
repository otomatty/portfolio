# AGENTS.md

## Cursor Cloud specific instructions

This is a static portfolio site (Astro + React) with no database or external service dependencies.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `bun install` |
| Dev server | `bun run dev` (localhost:4321) |
| Lint | `bun run lint` |
| Type check | `bun run typecheck` |
| Build | `bun run build` (outputs to `./dist/`) |

### Notes

- **Bun** is the package manager (lockfile: `bun.lock`). Ensure `~/.bun/bin` is on `PATH`.
- The dev server starts on port **4321** by default. Use `bun run dev --host 0.0.0.0` to expose it externally.
- `bun run typecheck` reports deprecation hints for the `Github` icon from `lucide-react` — these are warnings, not errors.
- There is no automated test suite (no Jest/Vitest/Playwright). CI runs lint, typecheck, and build only.
- Optional env vars `GITHUB_USERNAME` and `GITHUB_TOKEN` enable the GitHub contributions chart on the About page; the site works fully without them.
