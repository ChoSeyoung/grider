'use client';

interface AdPlaceholderProps {
  type: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

export default function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  const sizeClasses = {
    banner: 'w-full h-[90px] md:h-[90px]', // 728x90 or responsive
    sidebar: 'w-full h-[250px] md:w-[300px] md:h-[250px]', // 300x250
    inline: 'w-full h-[100px] md:h-[90px]', // Responsive inline
  };

  return (
    <div
      className={`ad-placeholder ${sizeClasses[type]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <span className="text-xs text-gray-500">AD</span>
    </div>
  );
}
