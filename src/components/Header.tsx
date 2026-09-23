import React from 'react';
import { Phone, Calendar, Bookmark, BookmarkCheck, Globe, Clock, MapPin } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { ReroLogo } from './ReroLogo';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenReserve: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenReserve,
  isSaved,
  onToggleSave,
  onNavigateTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f5]/95 border-b border-[#e7dfd5] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <button
              id="logo-brand-btn"
              onClick={() => onNavigateTo('hero')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <ReroLogo size="md" variant="image" />
              <div className="hidden sm:block border-l border-[#ded3c5] pl-3">
                <span className="block text-[11px] font-bold tracking-wider uppercase text-[#8B1E1E]">
                  Berea Hills 200
                </span>
                <span className="block text-[10px] text-[#78716c] italic font-serif">
                  {BRAND_ASSETS.motto}
                </span>
              </div>
            </button>

            {/* Live Open Status Indicator */}
            <div
              id="header-open-status"
              className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-medium text-emerald-800 ml-3"
              title="Open daily until 12:00 AM midnight"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{CAFE_INFO.hoursDisplay}</span>
            </div>
          </div>

          {/* Desktop Navigation Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#44403c]">
            <button
              id="nav-menu-btn"
              onClick={() => onNavigateTo('menu-section')}
              className="hover:text-[#1c1917] transition-colors"
            >
              {lang === 'st' ? 'Lenane la Lijo' : 'Menu'}
            </button>
            <button
              id="nav-reviews-btn"
              onClick={() => onNavigateTo('reviews-section')}
              className="hover:text-[#1c1917] transition-colors flex items-center gap-1.5"
            >
              <span>{lang === 'st' ? 'Maikutlo' : 'Reviews'}</span>
              <span className="text-xs bg-[#c28e5d]/15 text-[#855627] font-bold px-1.5 py-0.5 rounded">
                5.0★
              </span>
            </button>
            <button
              id="nav-location-btn"
              onClick={() => onNavigateTo('location-section')}
              className="hover:text-[#1c1917] transition-colors"
            >
              {t.directionsBtn}
            </button>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e2d8cd] text-xs font-semibold text-[#57534e] hover:bg-[#f3ede4] hover:text-[#1c1917] transition-all"
              title="Fetola Puo / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#9a6a38]" />
              <span className="tracking-wide">
                {lang === 'st' ? 'Sesotho' : 'English'}
              </span>
            </button>

            {/* Save / Bookmark Button */}
            <button
              id="header-save-btn"
              onClick={onToggleSave}
              className={`p-2 rounded-lg border transition-all ${
                isSaved
                  ? 'bg-[#c28e5d] text-white border-[#c28e5d]'
                  : 'border-[#e2d8cd] text-[#57534e] hover:bg-[#f3ede4] hover:text-[#1c1917]'
              }`}
              title={isSaved ? t.savedBtn : t.saveBtn}
              aria-label={isSaved ? t.savedBtn : t.saveBtn}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            {/* Direct Call Button (Letsa) */}
            <a
              id="header-call-btn"
              href={`tel:${CAFE_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d6c8b8] text-xs sm:text-sm font-semibold text-[#292524] hover:bg-[#ebdccf] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#9a6a38]" />
              <span>{t.callBtn}</span>
            </a>

            {/* Book / Reservations Button (Lipeeletso) */}
            <button
              id="header-reserve-btn"
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1c1917] text-[#faf8f5] hover:bg-[#2d2926] text-xs sm:text-sm font-semibold shadow-sm transition-all transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#d8ab7c]" />
              <span>{t.reserveBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
