'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toPng } from 'html-to-image';

interface DownloadButtonProps {
  targetId: string;
  disabled?: boolean;
}

export default function DownloadButton({
  targetId,
  disabled = false,
}: DownloadButtonProps) {
  const t = useTranslations('editor');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(target, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1a1a2e',
      });

      const link = document.createElement('a');
      link.download = `grider-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      className="btn-gradient btn-download whitespace-nowrap text-sm sm:text-base px-4 sm:px-8"
      onClick={handleDownload}
      disabled={disabled || isDownloading}
    >
      {isDownloading ? t('saving') : t('download')}
    </button>
  );
}
