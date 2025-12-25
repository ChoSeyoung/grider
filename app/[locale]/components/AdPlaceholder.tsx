'use client';

import { useEffect, useRef, useId, useState } from 'react';

// Ad slot IDs for different placements
export const AD_SLOTS = {
  topBanner: '9981418839',
  bottomBanner: '2809629532',
  sidebarLeft: '1805322012',
  sidebarRight: '1496547861',
  mobileInline: '9183466195',
} as const;

type AdSlot = keyof typeof AD_SLOTS;

interface AdPlaceholderProps {
  type: 'banner' | 'sidebar' | 'inline';
  slot: AdSlot;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Fixed ad sizes matching AdSense ad units
const AD_SIZES = {
  banner: { width: '100%', height: '90px', maxWidth: '728px' },
  sidebar: { width: '300px', height: '600px' },
  inline: { width: '100%', height: '100px', maxWidth: '320px' },
} as const;

export default function AdPlaceholder({ type, slot, className = '' }: AdPlaceholderProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);
  const uniqueId = useId();
  const [adFailed, setAdFailed] = useState(false);

  const size = AD_SIZES[type];

  const containerStyle: React.CSSProperties = {
    width: size.width,
    height: size.height,
    maxWidth: 'maxWidth' in size ? size.maxWidth : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px dashed rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    margin: '0 auto',
  };

  const insStyle: React.CSSProperties = {
    display: 'block',
    width: size.width,
    height: size.height,
    maxWidth: 'maxWidth' in size ? size.maxWidth : undefined,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (adRef.current && !isAdLoaded.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isAdLoaded.current = true;
        } catch (error) {
          console.error('AdSense error:', error);
          setAdFailed(true);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`ad-container ${className}`}
      style={containerStyle}
      role="complementary"
      aria-label="Advertisement"
    >
      {adFailed ? (
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>AD</span>
      ) : (
        <ins
          key={uniqueId}
          ref={adRef}
          className="adsbygoogle"
          style={insStyle}
          data-ad-client="ca-pub-4595496614643694"
          data-ad-slot={AD_SLOTS[slot]}
          data-ad-format={type === 'sidebar' ? 'vertical' : 'horizontal'}
          data-full-width-responsive={type !== 'sidebar' ? 'true' : 'false'}
        />
      )}
    </div>
  );
}
