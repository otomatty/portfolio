import jaCommon from '../../public/locales/ja/common.json';
import enCommon from '../../public/locales/en/common.json';

export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

const dictionaries = {
  ja: { common: jaCommon },
  en: { common: enCommon },
} as const;

type Dictionaries = typeof dictionaries;
type Namespace = keyof Dictionaries[Locale];

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' && (locales as readonly string[]).includes(value)
  );
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getT<NS extends Namespace>(
  locale: string | undefined,
  namespace: NS,
): Dictionaries[Locale][NS] {
  return dictionaries[resolveLocale(locale)][namespace];
}

export function t(
  dict: Record<string, unknown>,
  keyPath: string,
  fallback?: string,
): string {
  const value = keyPath.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : (fallback ?? keyPath);
}

export function localePath(
  path: string,
  locale: string | undefined,
): string {
  const resolved = resolveLocale(locale);
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (resolved === defaultLocale) return normalized;
  return normalized === '/' ? `/${resolved}/` : `/${resolved}${normalized}`;
}

/**
 * Remove a leading locale segment from a pathname.
 * `/en/about` -> `/about`, `/en` -> `/`, `/about` -> `/about`.
 */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/');
  if (isLocale(segments[1])) {
    segments.splice(1, 1);
  }
  const stripped = segments.join('/');
  return stripped === '' ? '/' : stripped;
}

/**
 * Build the equivalent path for `targetLocale` from the current pathname,
 * preserving the page being viewed. Used by the language switcher.
 */
export function switchLocalePath(
  pathname: string,
  targetLocale: string | undefined,
): string {
  return localePath(stripLocalePrefix(pathname), targetLocale);
}
