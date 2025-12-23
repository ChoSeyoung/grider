import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const messagesImport: Record<string, () => Promise<any>> = {
  en: () => import('../../messages/en.json'),
  ko: () => import('../../messages/ko.json'),
  ja: () => import('../../messages/ja.json'),
  zh: () => import('../../messages/zh.json'),
  es: () => import('../../messages/es.json'),
  fr: () => import('../../messages/fr.json'),
  de: () => import('../../messages/de.json'),
  pt: () => import('../../messages/pt.json'),
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = (await messagesImport[locale]()).default;

  return {
    locale,
    messages,
  };
});
