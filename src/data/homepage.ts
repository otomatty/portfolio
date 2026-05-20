import { resolveLocale, type Locale } from '@/lib/i18n';
import { homepageJa } from './homepage.ja';
import { homepageEn } from './homepage.en';

export type HomepageCopy = typeof homepageJa;

const map: Record<Locale, HomepageCopy> = {
  ja: homepageJa,
  en: homepageEn,
};

export function getHomepageCopy(locale: string | undefined): HomepageCopy {
  return map[resolveLocale(locale)];
}

export const homepageCopy: HomepageCopy = homepageJa;
