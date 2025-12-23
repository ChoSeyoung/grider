'use client';

import { useTranslations } from 'next-intl';
import {
  GridOptions,
  gapOptions,
  borderRadiusOptions,
  backgroundColorOptions,
} from '../utils/gridOptions';

interface GridOptionsPanelProps {
  options: GridOptions;
  onChange: (options: GridOptions) => void;
}

export default function GridOptionsPanel({
  options,
  onChange,
}: GridOptionsPanelProps) {
  const t = useTranslations('options');
  const handleGapChange = (gap: number) => {
    onChange({ ...options, gap });
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    onChange({ ...options, borderRadius });
  };

  const handleBackgroundColorChange = (backgroundColor: string) => {
    onChange({ ...options, backgroundColor });
  };

  return (
    <div className="card w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4 gradient-text">{t('title')}</h3>

      {/* Gap Option */}
      <div className="mb-5">
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('imageGap')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {gapOptions.map((opt) => (
            <button
              key={opt.value}
              className={`option-btn ${options.gap === opt.value ? 'selected' : ''}`}
              onClick={() => handleGapChange(opt.value)}
            >
              {t(`gap.${opt.key}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius Option */}
      <div className="mb-5">
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('cornerStyle')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {borderRadiusOptions.map((opt) => (
            <button
              key={opt.value}
              className={`option-btn ${options.borderRadius === opt.value ? 'selected' : ''}`}
              onClick={() => handleBorderRadiusChange(opt.value)}
            >
              {t(`corner.${opt.key}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Background Color Option */}
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('backgroundColor')}
        </label>
        <div className="flex gap-2 flex-wrap">
          {backgroundColorOptions.map((opt) => (
            <button
              key={opt.value}
              className={`color-btn ${options.backgroundColor === opt.value ? 'selected' : ''}`}
              onClick={() => handleBackgroundColorChange(opt.value)}
              title={opt.label}
            >
              <span
                className="color-preview"
                style={{
                  backgroundColor: opt.value === 'transparent' ? undefined : opt.value,
                  backgroundImage:
                    opt.value === 'transparent'
                      ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                      : undefined,
                  backgroundSize: opt.value === 'transparent' ? '8px 8px' : undefined,
                  backgroundPosition:
                    opt.value === 'transparent' ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
