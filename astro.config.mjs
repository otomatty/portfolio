// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://saedgewell.com',
  output: 'static',
  // Deployed to Cloudflare Workers via `wrangler deploy` (`bun run deploy`).
  // All pages are prerendered; images are optimized at build time and sessions
  // are unused, so no Images or KV bindings are provisioned.
  adapter: cloudflare({ imageService: 'compile' }),
  session: false,
  // Legacy per-category works pages are consolidated into `/works`.
  // Preserve old URLs by redirecting to the unified list with a kind filter.
  redirects: {
    '/works/company': '/works?kind=professional',
    '/works/freelance': '/works?kind=professional',
    '/works/personal': '/works?kind=personal',
  },
  // Opt-in link prefetching: only `<a data-astro-prefetch>` links are
  // prefetched, on `hover`. `prefetchAll` is pinned to false so prefetching
  // stays opt-in even if a ClientRouter (View Transitions) is added later,
  // where it would otherwise default to true.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['motion'],
    },
  },
});
