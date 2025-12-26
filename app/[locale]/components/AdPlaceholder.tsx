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
  const containerRef = useRef<HTMLDivElement>(null);
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
    const isElementVisible = (el: HTMLElement): boolean => {
      // Check if element is in DOM and has dimensions
      if (!el.offsetParent && el.offsetWidth === 0 && el.offsetHeight === 0) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const loadAd = () => {
      if (!containerRef.current || !adRef.current || isAdLoaded.current) {
        return;
      }

      // Check both container and ad element visibility
      if (!isElementVisible(containerRef.current)) {
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      } catch {
        // Silently fail - ad blockers or other issues
        setAdFailed(true);
      }
    };

    // Delay initial load to ensure DOM is ready
    const timer = setTimeout(loadAd, 300);

    // Use IntersectionObserver for visibility
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isAdLoaded.current) {
          setTimeout(loadAd, 100);
        }
      },
      { threshold: 0.1 }
    );

    // Use ResizeObserver to detect when container gets width
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0 && !isAdLoaded.current) {
        loadAd();
      }
    });

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
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
