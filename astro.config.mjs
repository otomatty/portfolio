// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://saedgewell.com',
  output: 'static',
  // Legacy per-category works pages are consolidated into `/works`.
  // Preserve old URLs by redirecting to the unified list with a kind filter.
  redirects: {
    '/works/company': '/works?kind=professional',
    '/works/freelance': '/works?kind=professional',
    '/works/personal': '/works?kind=personal',
    '/en/works/company': '/en/works?kind=professional',
    '/en/works/freelance': '/en/works?kind=professional',
    '/en/works/personal': '/en/works?kind=personal',
  },
  // Opt-in link prefetching: only `<a data-astro-prefetch>` links are
  // prefetched, on `hover` (e.g. the LanguageSwitcher links). `prefetchAll`
  // is pinned to false so prefetching stays opt-in even if a ClientRouter
  // (View Transitions) is added later, where it would otherwise default to true.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    fallback: {
      en: 'ja',
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'esbuild',
    },
    ssr: {
      noExternal: ['motion'],
    },
  },
});