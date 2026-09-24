import React, { useState } from 'react';
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
  Sparkles,
  TreePine,
  Maximize2,
  X,
  ChevronRight,
} from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

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
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* 1. Full-Bleed Background Image (The uploaded garden photo) */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_ASSETS.gardenBgUrl}
          alt="Rero Cafe outdoor garden dining table and thatched lodge in Berea Hills"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-700"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered cinematic gradient overlays for contrast & luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/40" />
      </div>

      {/* 2. Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Identity, Headlines, Quick Actions Ribbon */}
          <div className="lg:col-span-8 space-y-6 text-white">
            
            {/* Badges Pill Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Restaurant category tag */}
              <span
                id="restaurant-badge"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/15 backdrop-blur-md text-[#fcf9f6] border border-white/20 shadow-xs"
              >
                {t.restaurantBadge}
              </span>

              {/* 5.0 Google Rating Badge */}
              <div
                id="google-rating-hero-pill"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-md text-xs font-bold text-[#1c1917]"
              >
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span>5.0</span>
                <span className="text-[#57534e] font-medium">
                  {lang === 'st' ? 'maikutlo a 1 a Google' : 'Google Reviews'}
                </span>
              </div>

              {/* Live Hours Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{CAFE_INFO.hoursDisplay}</span>
              </div>
            </div>

            {/* Official Logo Banner & Brand Slogan */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Official Logo (White frame) */}
                <div className="p-1.5 rounded-2xl bg-white shadow-2xl border-2 border-white/80 shrink-0">
                  <img
                    src={BRAND_ASSETS.logoUrl}
                    alt="Official Rero Cafe Logo"
                    className="h-16 sm:h-20 w-auto object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#8B1E1E] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{lang === 'st' ? BRAND_ASSETS.mottoSesotho : BRAND_ASSETS.motto}</span>
                  </div>
                  <p className="text-sm font-medium text-stone-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Main North 1, Berea Hills 200 · Maseru</span>
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
                {t.tagline}
              </h1>
              <p className="text-sm sm:text-base text-stone-200/90 max-w-2xl leading-relaxed">
                {t.subtagline} {t.directionsNote}
              </p>
            </div>

            {/* Quick Action Ribbon (All requested cafe actions) */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider font-bold text-stone-300/80 mb-3 flex items-center gap-2">
                <span>{lang === 'st' ? 'Litiro tse Potlakileng' : 'Quick Actions'}</span>
                <span className="h-px w-12 bg-white/20" />
              </p>

              <div
                id="hero-actions-ribbon"
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              >
                {/* 1. Reserve on WhatsApp (Official WhatsApp Logo) */}
                <a
                  id="action-whatsapp-reserve-btn"
                  href={CAFE_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg transition-all text-sm font-bold group border border-white/20 transform hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-[#25D366] transition-colors">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold truncate">{t.reserveBtn}</span>
                    <span className="block text-[11px] text-white/90 font-normal">
                      wa.me
                    </span>
                  </div>
                </a>

                {/* 2. Letsa / Call */}
                <a
                  id="action-call-btn"
                  href={`tel:${CAFE_INFO.phone}`}
                  className="flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-md transition-all text-sm font-semibold group transform hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#8B1E1E] flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold">{t.callBtn}</span>
                    <span className="block text-[11px] text-stone-300 font-normal truncate">
                      {CAFE_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* 3. Tlhaloso ea litsela / Directions */}
                <a
                  id="action-directions-btn"
                  href={CAFE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-md transition-all text-sm font-semibold group transform hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold truncate">{t.directionsBtn}</span>
                    <span className="block text-[11px] text-stone-300 font-normal truncate">
                      Main North 1
                    </span>
                  </div>
                </a>

                {/* 4. Ngola tlhahlobo / Write Review */}
                <button
                  id="action-review-btn"
                  onClick={onOpenReview}
                  className="flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-md transition-all text-sm font-semibold group transform hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 shrink-0">
                    <MessageSquarePlus className="w-4 h-4" />
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold truncate">{t.writeReviewBtn}</span>
                    <span className="block text-[11px] text-stone-300 font-normal">
                      5.0★ Google
                    </span>
                  </div>
                </button>

                {/* 5. Arolelana / Share */}
                <button
                  id="action-share-btn"
                  onClick={onOpenShare}
                  className="flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-md transition-all text-sm font-semibold group transform hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-stone-200 shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold">{t.shareBtn}</span>
                    <span className="block text-[11px] text-stone-300 font-normal">
                      Share Cafe
                    </span>
                  </div>
                </button>

                {/* 6. Boloka / Save */}
                <button
                  id="action-save-btn"
                  onClick={onToggleSave}
                  className={`flex items-center justify-center gap-2.5 px-3 py-3 rounded-2xl border shadow-md transition-all text-sm font-semibold group transform hover:-translate-y-0.5 ${
                    isSaved
                      ? 'bg-[#8B1E1E] text-white border-[#8B1E1E]'
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-white/20'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSaved ? 'bg-white/20 text-white' : 'bg-white/15 text-stone-200'
                    }`}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="block font-bold">
                      {isSaved ? t.savedBtn : t.saveBtn}
                    </span>
                    <span className="block text-[11px] text-stone-300 font-normal">
                      {isSaved ? 'In Favorites' : 'Bookmark'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Menu Navigation CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTo('menu-section')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1c1917] hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <span>{lang === 'st' ? 'Sheba Lenane la Lijo' : 'Explore Cafe Menu'}</span>
                <ChevronRight className="w-4 h-4 text-[#8B1E1E]" />
              </button>

              <button
                onClick={() => setShowPhotoModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-stone-200 font-semibold text-xs transition-all border border-white/20"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'st' ? 'Bona Setšoantšo sa Serapa' : 'View Berea Garden Photo'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Glassmorphic Atmosphere Card & Highlights */}
          <div className="lg:col-span-4 space-y-4">
            {/* Real Atmosphere Card */}
            <div className="rounded-3xl bg-stone-900/80 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-4 text-white">
              
              {/* Garden Dining Highlight Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <TreePine className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Berea Garden Dining
                    </h3>
                    <p className="text-[11px] text-stone-300">Outdoor Lawn & Thatched Lodge</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
                  title="Expand photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail of the user's authentic photo */}
              <div
                onClick={() => setShowPhotoModal(true)}
                className="relative rounded-2xl overflow-hidden border border-white/20 cursor-pointer group h-40"
              >
                <img
                  src={BRAND_ASSETS.gardenBgUrl}
                  alt="Rero Cafe lawn dining table"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center justify-between">
                  <span>Main North 1, Berea Hills</span>
                  <span className="text-amber-300 font-mono">5.0★</span>
                </div>
              </div>

              {/* Operating Hours Box */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-stone-400 text-[10px] uppercase font-bold">
                      {t.hoursLabel}
                    </span>
                    <span className="block font-semibold text-white">
                      {CAFE_INFO.hoursDisplay}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Daily
                </span>
              </div>

              {/* WhatsApp Direct Banner */}
              <a
                href={CAFE_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      Chat on WhatsApp
                    </p>
                    <p className="text-[11px] text-stone-300">
                      wa.me/26659822812
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Photo Modal for the uploaded photo */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={BRAND_ASSETS.gardenBgUrl}
              alt="Rero Cafe Full Berea Hills outdoor garden view"
              className="w-full max-h-[75vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />

            <div className="p-4 sm:p-6 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
              <div>
                <h4 className="font-serif text-lg font-bold">
                  Rero Cafe · Berea Hills 200
                </h4>
                <p className="text-xs text-stone-400">
                  Main North 1 · Open until 12:00 AM midnight · {BRAND_ASSETS.motto}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={CAFE_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Reserve on WhatsApp</span>
                </a>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
