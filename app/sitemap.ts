import { MetadataRoute } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grider-kappa.vercel.app';

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  }));
}
