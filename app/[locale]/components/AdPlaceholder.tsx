'use client';

import { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  type: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  const sizeClasses = {
    banner: 'w-full min-h-[90px]',
    sidebar: 'w-full min-h-[250px]',
    inline: 'w-full min-h-[100px]',
  };

  useEffect(() => {
    if (adRef.current && !isAdLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div
      className={`ad-container ${sizeClasses[type]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4595496614643694"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
