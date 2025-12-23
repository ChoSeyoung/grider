'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[var(--gradient-purple)] hover:underline mb-8 inline-block">
          &larr; {t('backToHome')}
        </Link>

        <h1 className="text-3xl font-bold gradient-text mb-8">{t('title')}</h1>

        <div className="space-y-6 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section1.title')}</h2>
            <p>{t('section1.content')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section2.title')}</h2>
            <p>{t('section2.content')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section3.title')}</h2>
            <p>{t('section3.content')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section4.title')}</h2>
            <p>{t('section4.content')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section5.title')}</h2>
            <p>{t('section5.content')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">{t('section6.title')}</h2>
            <p>{t('section6.content')}</p>
          </section>

          <p className="text-sm mt-8">{t('lastUpdated')}: 2024-12-24</p>
        </div>
      </div>
    </div>
  );
}
