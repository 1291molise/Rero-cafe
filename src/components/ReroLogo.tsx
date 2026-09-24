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
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  if (variant === 'image') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={BRAND_ASSETS.logoUrl}
          alt="Rero Cafe - eat, drink, relax, our mantra"
          className={`${sizeClasses[size]} w-auto object-contain rounded-lg`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Vector / SVG representation of the Rero Cafe logo
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <div className="relative flex items-center">
        {/* Bold Lowercase 'rero' */}
        <span className="font-sans font-black tracking-tight text-[#111111] text-2xl sm:text-3xl leading-none">
          rer
        </span>

        {/* The 'o' with circular elephant emblem & curved motto */}
        <div className="relative inline-flex items-center justify-center mx-0.5">
          {/* Circular badge */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111111] text-white flex items-center justify-center p-1 shadow-xs relative">
            {/* Elephant Silhouette SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white transform -scale-x-100"
            >
              <path d="M19.5 9.5c-.3-.8-.9-1.5-1.7-1.9-1.2-.6-2.6-.4-3.6.4-.3.2-.6.5-.9.8-.7-.6-1.7-.9-2.7-.8-1.5.1-2.9 1-3.6 2.3-.3.6-.4 1.3-.4 2 0 .4.1.8.2 1.2-.5.3-.9.7-1.2 1.2-.5.8-.6 1.8-.4 2.7.2.9.7 1.7 1.5 2.2.4.3.9.4 1.4.4.7 0 1.4-.3 1.9-.8.4-.4.7-.9.8-1.5.8.3 1.7.4 2.6.2 1.2-.3 2.2-1.1 2.7-2.2.3-.6.4-1.3.4-2 0-.3 0-.6-.1-.9 1.1-.3 2-1 2.4-2 .4-.8.5-1.7.2-2.6-.2-.3-.4-.5-.6-.7zm-1.8 1.8c-.3.6-.8 1-1.4 1.2-.2 0-.4.1-.6.1-.2 0-.3-.1-.4-.2-.1-.1-.1-.3-.1-.5 0-.7.3-1.4.8-1.9.4-.4.9-.7 1.5-.7.3 0 .5.1.6.3.2.3.2.7.1 1.1-.1.2-.2.4-.3.6z" />
            </svg>
          </div>

          {/* Curved motto text above */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[9px] font-medium tracking-tight text-[#44403c]">
            eat, drink, relax
          </span>
        </div>

        {/* Flowing cursive red 'Cafe' */}
        <span className="font-serif italic font-black text-[#8B1E1E] text-2xl sm:text-3xl ml-1 -rotate-6 transform translate-y-1">
          Cafe
        </span>
      </div>
    </div>
  );
};
