import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Globe,
  MapPin,
  Menu as MenuIcon,
  X,
  Star,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { ReroLogo } from './ReroLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleNavClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 border-b border-[#e7dfd5] shadow-xs transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              id="logo-brand-btn"
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group"
              aria-label="The Valley Guest House Home"
            >
              {/* Official Logo on Navbar */}
              <div className="p-0.5 rounded-xl bg-white border border-[#b8860b]/40 shadow-xs group-hover:border-[#b8860b] transition-colors">
                <ReroLogo size="md" variant="image" />
              </div>
              <div className="hidden sm:block border-l border-[#ded3c5] pl-3">
                <div className="flex items-center gap-1.5">
                  <span className="block text-[11px] font-extrabold tracking-wider uppercase text-[#a16207]">
                    The Valley · Lesotho
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                    R350 / Night Couple
                  </span>
                </div>
                <span className="block text-[11px] text-[#57534e] font-serif italic">
                  {lang === 'st' ? BRAND_ASSETS.rateCoupleSesotho : BRAND_ASSETS.rateCouple}
                </span>
              </div>
            </button>

            {/* Live Open Status Indicator */}
            <div
              id="header-open-status"
              className="hidden xl:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-semibold text-emerald-800 ml-2"
              title="Open daily until 12:00 AM midnight"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{CAFE_INFO.hoursDisplay}</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#44403c]">
            <button
              id="nav-menu-btn"
              onClick={() => handleNavClick('menu-section')}
              className="hover:text-[#8B1E1E] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B1E1E] hover:after:w-full after:transition-all"
            >
              {lang === 'st' ? 'Lenane la Lijo' : 'Menu'}
            </button>
            <button
              id="nav-reviews-btn"
              onClick={() => handleNavClick('reviews-section')}
              className="hover:text-[#8B1E1E] transition-colors py-1 flex items-center gap-1.5 group"
            >
              <span>{lang === 'st' ? 'Maikutlo' : 'Reviews'}</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-full group-hover:bg-amber-200 transition-colors">
                5.0★
              </span>
            </button>
            <button
              id="nav-location-btn"
              onClick={() => handleNavClick('location-section')}
              className="hover:text-[#8B1E1E] transition-colors py-1"
            >
              {t.directionsBtn}
            </button>
          </nav>

          {/* Right: Actions, WhatsApp Button & CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e2d8cd] text-xs font-semibold text-[#57534e] hover:bg-[#f3ede4] hover:text-[#1c1917] transition-all"
              title="Fetola Puo / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span className="tracking-wide">
                {lang === 'st' ? 'Sesotho' : 'English'}
              </span>
            </button>

            {/* Official WhatsApp Button (Prominent in Navbar) */}
            <a
              id="header-whatsapp-btn"
              href={CAFE_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              title="Chat with The Valley Guest House on WhatsApp (+266 560 383 39)"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="hidden md:inline font-sans">WhatsApp</span>
            </a>

            {/* Direct Call Button (Letsa) */}
            <a
              id="header-call-btn"
              href={`tel:${CAFE_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#d6c8b8] text-xs sm:text-sm font-semibold text-[#292524] hover:border-[#a16207] hover:bg-[#fbf7f4] transition-all"
              title="Call The Valley Guest House: +266 560 383 39"
            >
              <Phone className="w-3.5 h-3.5 text-[#a16207]" />
              <span>{t.callBtn}</span>
            </a>

            {/* Save / Bookmark Button */}
            <button
              id="header-save-btn"
              onClick={onToggleSave}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
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

            {/* Book / Reservations Button (Lipeeletso) */}
            <button
              id="header-reserve-btn"
              onClick={onOpenReserve}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111111] text-[#faf8f5] hover:bg-[#262422] text-xs sm:text-sm font-semibold shadow-xs transition-all transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#e8c092]" />
              <span>{t.reserveBtn}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#ded3c5] text-[#292524] hover:bg-[#f3ede4] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#8B1E1E]" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-white border-b border-[#e7dfd5] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-800">
                {CAFE_INFO.hoursDisplay}
              </span>
            </div>
            <span className="text-xs text-[#8B1E1E] font-serif italic">
              {BRAND_ASSETS.motto}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('menu-section')}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 font-semibold text-sm text-[#1c1917]"
            >
              {lang === 'st' ? 'Lenane la Lijo' : 'Menu & Food'}
            </button>
            <button
              onClick={() => handleNavClick('reviews-section')}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 font-semibold text-sm text-[#1c1917] flex items-center justify-between"
            >
              <span>{lang === 'st' ? 'Maikutlo' : 'Reviews'}</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                5.0★
              </span>
            </button>
            <button
              onClick={() => handleNavClick('location-section')}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 font-semibold text-sm text-[#1c1917]"
            >
              {t.directionsBtn}
            </button>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 font-semibold text-sm text-[#1c1917] flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#8B1E1E]" />
              <span>{CAFE_INFO.phone}</span>
            </a>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={CAFE_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat on WhatsApp (+266 560 383 39)</span>
            </a>

            <button
              onClick={() => {
                onOpenReserve();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111111] text-white font-bold text-sm shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#e8c092]" />
              <span>{t.reserveBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
