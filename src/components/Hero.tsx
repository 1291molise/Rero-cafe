import React from 'react';
import {
  Phone,
  Calendar,
  Navigation,
  Star,
  Share2,
  Bookmark,
  BookmarkCheck,
  MessageSquarePlus,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  Sparkles,
  TreePine,
} from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { ReroLogo } from './ReroLogo';

interface HeroProps {
  lang: Language;
  onOpenReserve: () => void;
  onOpenReview: () => void;
  onOpenShare: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onNavigateTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenReserve,
  onOpenReview,
  onOpenShare,
  isSaved,
  onToggleSave,
  onNavigateTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden">
      {/* Subtle warm background accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#e8dbcc]/50 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#dfceba]/40 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left copy & action bar, Right visual showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand, Rating, Description, Primary Action Ribbon */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Tag & Google Rating Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                id="restaurant-badge"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#111111] text-[#fbf8f5]"
              >
                {t.restaurantBadge}
              </span>

              {/* Google 5.0 Rating Pill requested explicitly */}
              <div
                id="google-rating-hero-pill"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#e2d6c7] rounded-full shadow-xs text-xs font-semibold text-[#1c1917]"
              >
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold">5.0</span>
                <span className="text-[#78716c]">
                  {lang === 'st' ? 'maikutlo a 1 a Google' : '5.0 on Google Reviews'}
                </span>
              </div>

              {/* Live Hours Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{CAFE_INFO.hoursDisplay}</span>
              </div>
            </div>

            {/* Official Logo Display with Mantra */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND_ASSETS.logoUrl}
                  alt="Rero Cafe Logo"
                  className="h-16 sm:h-20 w-auto object-contain rounded-xl p-1 bg-white border border-[#e8ded2] shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E1E]/10 text-[#8B1E1E] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>{lang === 'st' ? BRAND_ASSETS.mottoSesotho : BRAND_ASSETS.motto}</span>
                  </div>
                  <p className="text-xs text-[#78716c] mt-0.5">
                    Main North 1, Berea Hills 200 · Maseru
                  </p>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1c1917] leading-[1.15]">
                {t.tagline}
              </h1>
              <p className="text-sm sm:text-base text-[#57534e] max-w-xl leading-relaxed">
                {t.subtagline} {t.directionsNote}
              </p>
            </div>

            {/* Quick Action Ribbon with all requested operations */}
            <div className="pt-1">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#78716c] mb-2.5">
                {lang === 'st' ? 'Litiro tse Potlakileng (Quick Actions)' : 'Quick Actions'}
              </p>

              <div
                id="hero-actions-ribbon"
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              >
                {/* 1. Letsa / Call */}
                <a
                  id="action-call-btn"
                  href={`tel:${CAFE_INFO.phone}`}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-white border border-[#d6c7b5] text-[#1c1917] hover:border-[#8B1E1E] hover:bg-[#fcfaf7] shadow-xs transition-all text-sm font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f9eceb] flex items-center justify-center text-[#8B1E1E] group-hover:bg-[#8B1E1E] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight">{t.callBtn}</span>
                    <span className="block text-[11px] text-[#78716c] font-normal">
                      {CAFE_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* 2. Lipeeletso / Reserve (WhatsApp & Modal) */}
                <button
                  id="action-reserve-btn"
                  onClick={onOpenReserve}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#111111] text-white hover:bg-[#2b2724] shadow-sm transition-all text-sm font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight">{t.reserveBtn}</span>
                    <span className="block text-[11px] text-stone-300 font-normal">
                      wa.me
                    </span>
                  </div>
                </button>

                {/* 3. Tlhaloso ea litsela / Directions */}
                <a
                  id="action-directions-btn"
                  href={CAFE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-white border border-[#d6c7b5] text-[#1c1917] hover:border-[#8B1E1E] hover:bg-[#fcfaf7] shadow-xs transition-all text-sm font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f4ebe1] flex items-center justify-center text-[#9a6a38] group-hover:bg-[#9a6a38] group-hover:text-white transition-colors">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight truncate">{t.directionsBtn}</span>
                    <span className="block text-[11px] text-[#78716c] font-normal truncate">
                      Main North 1
                    </span>
                  </div>
                </a>

                {/* 4. Ngola tlhahlobo / Write Review */}
                <button
                  id="action-review-btn"
                  onClick={onOpenReview}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-white border border-[#d6c7b5] text-[#1c1917] hover:border-[#8B1E1E] hover:bg-[#fcfaf7] shadow-xs transition-all text-sm font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f4ebe1] flex items-center justify-center text-[#9a6a38] group-hover:bg-[#9a6a38] group-hover:text-white transition-colors">
                    <MessageSquarePlus className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight truncate">{t.writeReviewBtn}</span>
                    <span className="block text-[11px] text-[#78716c] font-normal">
                      5.0★ Google
                    </span>
                  </div>
                </button>

                {/* 5. Arolelana / Share */}
                <button
                  id="action-share-btn"
                  onClick={onOpenShare}
                  className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-white border border-[#d6c7b5] text-[#1c1917] hover:border-[#8B1E1E] hover:bg-[#fcfaf7] shadow-xs transition-all text-sm font-semibold group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f4ebe1] flex items-center justify-center text-[#9a6a38] group-hover:bg-[#9a6a38] group-hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight">{t.shareBtn}</span>
                    <span className="block text-[11px] text-[#78716c] font-normal">
                      Social / Web
                    </span>
                  </div>
                </button>

                {/* 6. Save / Boloka */}
                <button
                  id="action-save-btn"
                  onClick={onToggleSave}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border shadow-xs transition-all text-sm font-semibold group ${
                    isSaved
                      ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
                      : 'bg-white border-[#d6c7b5] text-[#1c1917] hover:border-[#8B1E1E] hover:bg-[#fcfaf7]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSaved
                        ? 'bg-white/20 text-white'
                        : 'bg-[#f4ebe1] text-[#9a6a38] group-hover:bg-[#8B1E1E] group-hover:text-white'
                    }`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block leading-tight">
                      {isSaved ? t.savedBtn : t.saveBtn}
                    </span>
                    <span
                      className={`block text-[11px] font-normal ${
                        isSaved ? 'text-white/80' : 'text-[#78716c]'
                      }`}
                    >
                      {isSaved ? 'In Favorites' : 'Bookmark'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Metadata Pill Strip directly from user's notes */}
            <div
              id="hero-metadata-strip"
              className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#e7ddd1]">
                <MapPin className="w-4 h-4 text-[#8B1E1E] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-[#78716c] uppercase tracking-wider">
                    {t.addressLabel}
                  </span>
                  <span className="block text-sm font-medium text-[#1c1917]">
                    {CAFE_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#e7ddd1]">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-[#78716c] uppercase tracking-wider">
                    {t.hoursLabel}
                  </span>
                  <span className="block text-sm font-medium text-[#1c1917]">
                    {CAFE_INFO.hoursDisplay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Rero Cafe Garden Dining Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#111111]">
              <img
                src={BRAND_ASSETS.gardenBgUrl}
                alt="Rero Cafe outdoor garden dining table and thatched lodge in Berea Hills"
                className="w-full h-[400px] sm:h-[470px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating review highlight card on image */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/40 max-w-[210px]">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#1c1917]">
                  5.0 Google Rating
                </p>
                <p className="text-[11px] text-[#57534e] leading-snug">
                  "Garden table dining, mountain breeze & late night hospitality."
                </p>
              </div>

              {/* Floating Garden Terrace Pill */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/80 backdrop-blur-md text-white text-xs font-semibold border border-emerald-500/30">
                <TreePine className="w-3.5 h-3.5 text-emerald-300" />
                <span>Berea Garden Dining</span>
              </div>

              {/* Floating Bottom Info Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#f0b0b0] uppercase tracking-wide">
                    {BRAND_ASSETS.motto}
                  </p>
                  <p className="text-base font-serif font-bold text-white">
                    {CAFE_INFO.name} · Berea Hills
                  </p>
                </div>
                <a
                  id="hero-whatsapp-direct-btn"
                  href={CAFE_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>wa.me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
