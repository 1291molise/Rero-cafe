import React from 'react';
import { BRAND_ASSETS } from '../data/cafeData';

interface ReroLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'image' | 'inline' | 'emblem';
}

export const ReroLogo: React.FC<ReroLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'image',
}) => {
  const sizeClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-18',
    xl: 'h-24 sm:h-28',
  };

  if (variant === 'image') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={BRAND_ASSETS.logoUrl}
          alt="The Valley Guest House - +266 560 383 39"
          className={`${sizeClasses[size]} w-auto object-contain rounded-lg shadow-2xs border border-[#b8860b]/30`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Crisp Vector Representation of The Valley Guest House Brand Card
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-white border-2 border-[#b8860b] shadow-xs select-none ${className}`}
    >
      <div className="border border-[#b8860b]/60 px-3 py-1.5 rounded-lg flex flex-col items-center text-center">
        {/* 'The Valley' Script */}
        <span className="font-serif italic text-[#a16207] text-sm sm:text-base font-bold leading-tight">
          The Valley
        </span>

        {/* 'Guest House' Script */}
        <span className="font-serif italic text-[#a16207] text-lg sm:text-xl font-black leading-tight tracking-wide">
          Guest House
        </span>

        {/* Stylized Bed Emblem */}
        <div className="my-1 text-[#a16207]">
          <svg viewBox="0 0 48 24" className="w-9 h-5 fill-current">
            {/* Bed Headboard post */}
            <rect x="2" y="2" width="4" height="20" rx="1" />
            {/* Pillow */}
            <circle cx="12" cy="8" r="3.5" />
            {/* Mattress & base */}
            <rect x="8" y="11" width="36" height="5" rx="1.5" />
            {/* Footboard post */}
            <rect x="42" y="7" width="4" height="15" rx="1" />
          </svg>
        </div>

        {/* Phone number */}
        <div className="flex items-center gap-1 text-[#a16207] text-[10px] sm:text-[11px] font-semibold tracking-wider">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="font-serif italic">+266 560 383 39</span>
        </div>
      </div>
    </div>
  );
};
