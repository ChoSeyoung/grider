'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  GridOptions,
  basicColorOptions,
  paletteColorOptions,
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
  const [showPalette, setShowPalette] = useState(false);
  const [customColor, setCustomColor] = useState('#9945FF');

  const handleGapChange = (gap: number) => {
    onChange({ ...options, gap });
  };

  const handleCornerModeChange = (cornerMode: 'square' | 'rounded') => {
    onChange({
      ...options,
      cornerMode,
      borderRadius: cornerMode === 'square' ? 0 : (options.borderRadius || 16),
    });
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    onChange({ ...options, borderRadius });
  };

  const handleBackgroundColorChange = (backgroundColor: string) => {
    onChange({ ...options, backgroundColor });
    if (!basicColorOptions.find(c => c.value === backgroundColor) && backgroundColor !== 'rainbow') {
      setShowPalette(false);
    }
  };

  const isBasicColor = basicColorOptions.some(c => c.value === options.backgroundColor);
  const isPaletteColor = !isBasicColor && options.backgroundColor !== 'transparent';

  return (
    <div className="card w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4 gradient-text">{t('title')}</h3>

      {/* Gap Option */}
      <div className="mb-5">
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('imageGap')}
        </label>
        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
          <span>{t('gap.none')}</span>
          <span>{t('gap.large')}</span>
        </div>
        <input
          type="range"
          min={0}
          max={24}
          step={2}
          value={options.gap}
          onChange={(e) => handleGapChange(Number(e.target.value))}
          className="slider w-full"
        />
      </div>

      {/* Corner Style Option */}
      <div className="mb-5">
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('cornerStyle')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`option-btn ${options.cornerMode === 'square' ? 'selected' : ''}`}
            onClick={() => handleCornerModeChange('square')}
          >
            {t('corner.square')}
          </button>
          <button
            className={`option-btn ${options.cornerMode === 'rounded' ? 'selected' : ''}`}
            onClick={() => handleCornerModeChange('rounded')}
          >
            {t('corner.rounded')}
          </button>
        </div>

        {/* Border Radius Slider - only show when rounded is selected */}
        {options.cornerMode === 'rounded' && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
              <span>{t('corner.slight')}</span>
              <span>{t('corner.circle')}</span>
            </div>
            <input
              type="range"
              min={4}
              max={50}
              step={2}
              value={options.borderRadius}
              onChange={(e) => handleBorderRadiusChange(Number(e.target.value))}
              className="slider w-full"
            />
          </div>
        )}
      </div>

      {/* Background Color Option */}
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-2">
          {t('backgroundColor')}
        </label>

        {/* Basic colors + Rainbow button */}
        <div className="flex gap-2 flex-wrap mb-2">
          {basicColorOptions.map((opt) => (
            <button
              key={opt.value}
              className={`color-btn ${options.backgroundColor === opt.value ? 'selected' : ''}`}
              onClick={() => {
                handleBackgroundColorChange(opt.value);
                setShowPalette(false);
              }}
              title={t(`color.${opt.key}`)}
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

          {/* Rainbow button */}
          <button
            className={`color-btn ${isPaletteColor || showPalette ? 'selected' : ''}`}
            onClick={() => setShowPalette(!showPalette)}
            title={t('color.rainbow')}
          >
            <span
              className="color-preview"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD)',
              }}
            />
          </button>
        </div>

        {/* Extended Palette */}
        {showPalette && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
            <div className="grid grid-cols-8 gap-1 mb-3">
              {paletteColorOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`w-7 h-7 rounded-md transition-all ${
                    options.backgroundColor === opt.value
                      ? 'ring-2 ring-[var(--gradient-purple)] scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: opt.value }}
                  onClick={() => handleBackgroundColorChange(opt.value)}
                  title={opt.label}
                />
              ))}
            </div>

            {/* Custom Hex Color */}
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-8 h-8 min-w-[32px] rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={customColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    setCustomColor(val);
                  }
                }}
                className="flex-1 min-w-0 px-2 py-1 text-sm bg-[var(--background)] border border-[var(--card-border)] rounded text-white font-mono"
                placeholder="#000000"
              />
              <button
                className="btn-gradient text-xs py-1 px-3 whitespace-nowrap"
                onClick={() => handleBackgroundColorChange(customColor)}
              >
                {t('apply')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
