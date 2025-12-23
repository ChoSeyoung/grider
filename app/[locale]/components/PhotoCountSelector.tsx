'use client';

import { useTranslations } from 'next-intl';
import { photoCounts, PhotoCount } from '../utils/layouts';

interface PhotoCountSelectorProps {
  selectedCount: PhotoCount | null;
  onSelect: (count: PhotoCount) => void;
  onStart: () => void;
}

export default function PhotoCountSelector({
  selectedCount,
  onSelect,
  onStart,
}: PhotoCountSelectorProps) {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">{t('title')}</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-xl font-medium">{t('howManyPhotos')}</h2>

        <div className="grid grid-cols-2 gap-4">
          {photoCounts.map((count) => (
            <button
              key={count}
              className={`count-btn ${selectedCount === count ? 'selected' : ''}`}
              onClick={() => onSelect(count)}
            >
              {count}
            </button>
          ))}
        </div>

        <button
          className="btn-gradient mt-4"
          disabled={selectedCount === null}
          onClick={onStart}
        >
          {t('start')}
        </button>
      </div>
    </div>
  );
}
