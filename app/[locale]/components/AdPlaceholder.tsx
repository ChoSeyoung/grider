'use client';

import { useEffect, useRef, useId } from 'react';

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
  const uniqueId = useId();

  const sizeClasses = {
    banner: 'w-full min-h-[90px]',
    sidebar: 'w-[300px] min-h-[250px]',
    inline: 'w-full min-h-[100px]',
  };

  const adStyles = {
    banner: { display: 'block' },
    sidebar: { display: 'inline-block', width: '300px', height: '250px' },
    inline: { display: 'block' },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (adRef.current && !isAdLoaded.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isAdLoaded.current = true;
        } catch (error) {
          console.error('AdSense error:', error);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`ad-container ${sizeClasses[type]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <ins
        key={uniqueId}
        ref={adRef}
        className="adsbygoogle"
        style={adStyles[type]}
        data-ad-client="ca-pub-4595496614643694"
        data-ad-format={type === 'sidebar' ? 'rectangle' : 'auto'}
        data-full-width-responsive={type !== 'sidebar' ? 'true' : 'false'}
      />
    </div>
  );
}
