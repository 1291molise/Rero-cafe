import React from 'react';
import { Phone, MapPin, Clock, Star, Heart } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  lang: Language;
  onOpenReserve: () => void;
  onOpenReview: () => void;
  onNavigateTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenReserve,
  onOpenReview,
  onNavigateTo,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer id="main-footer" className="bg-[#111111] text-[#e7e5e4] pt-14 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-stone-800">
          {/* Col 1: Brand, Official Logo & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_ASSETS.logoUrl}
                alt="Rero Cafe Logo"
                className="h-14 w-auto object-contain rounded-xl p-1 bg-white border border-stone-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  RERO CAFE
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#f08080]">
                  {BRAND_ASSETS.motto}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              {t.subtagline} {t.directionsNote}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#e8c092]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{lang === 'st' ? '5.0 maikutlo a 1 a Google' : '5.0 Google Rating'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c092]">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigateTo('hero')}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'st' ? 'Leqephe la Pele' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('menu-section')}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'st' ? 'Lenane la Lijo' : 'Artisan Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('reviews-section')}
                  className="hover:text-white transition-colors"
                >
                  {t.reviewsTitle}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('location-section')}
                  className="hover:text-white transition-colors"
                >
                  {t.directionsBtn}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReview}
                  className="hover:text-white transition-colors text-[#e8c092]"
                >
                  {t.writeReviewBtn}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c092]">
              {lang === 'st' ? 'Litaba tsa Rona' : 'Contact & Hours'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B1E1E] shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}, {CAFE_INFO.area}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#8B1E1E] shrink-0 mt-0.5" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white">
                  {CAFE_INFO.phone} ({CAFE_INFO.phoneFormatted})
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{CAFE_INFO.hoursDisplay} ({t.hoursDetailed})</span>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <a
                  href={CAFE_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span>wa.me/26659822812</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#25D366]/20 text-[#25D366] font-bold">WhatsApp</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenReserve}
                className="w-full py-2.5 px-4 rounded-xl bg-[#8B1E1E] hover:bg-[#721818] text-white font-semibold text-xs transition-colors shadow-sm"
              >
                {t.reserveBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Berea Hills with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Lesotho</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
