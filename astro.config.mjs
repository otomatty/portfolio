// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://saedgewell.com',
  output: 'static',
  // Opt-in link prefetching: only `<a data-astro-prefetch>` links are
  // prefetched (default `hover` strategy), e.g. the LanguageSwitcher links.
  prefetch: true,
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