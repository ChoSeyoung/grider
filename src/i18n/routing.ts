import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
});
