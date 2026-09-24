import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Car,
  ShieldCheck,
  Truck,
  Coffee,
  PartyPopper,
  Sparkles,
} from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS, BRAND_ASSETS } from '../data/cafeData';
import { Language } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface LocationHoursProps {
  lang: Language;
  onOpenReserve: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({
  lang,
  onOpenReserve,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section
      id="location-section"
      className="py-12 sm:py-16 bg-[#f4ede3]/40 border-t border-[#e8ded2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f9eceb] text-[#8B1E1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'st' ? BRAND_ASSETS.mottoSesotho : BRAND_ASSETS.motto}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
            {t.directionsBtn} & {t.hoursLabel}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#57534e]">
            {t.directionsNote}
          </p>
        </div>

        {/* 2-Column Layout: Details on left, Interactive Visual Map Card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact, Address, Hours & Providers Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {/* Address & Directions Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ded3c5] shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f4ebe1] text-[#9a6a38] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#78716c]">
                    {t.addressLabel}
                  </span>
                  <p className="font-serif text-lg font-bold text-[#1c1917] mt-0.5">
                    {CAFE_INFO.address}
                  </p>
                  <p className="text-xs text-[#57534e]">
                    {CAFE_INFO.area}, {CAFE_INFO.city}, {CAFE_INFO.country}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  id="location-get-directions-btn"
                  href={CAFE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1c1917] text-white hover:bg-[#2d2926] text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#e8c092]" />
                  <span>{t.directionsBtn}</span>
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#e8ded2] text-xs font-medium text-[#57534e]">
                  <Car className="w-3.5 h-3.5 text-[#9a6a38]" />
                  <span>{lang === 'st' ? 'Sebaka sa ho Paka Makoloi' : 'Secure On-site Parking'}</span>
                </span>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ded3c5] shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#78716c]">
                      {t.hoursLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {CAFE_INFO.hoursDisplay}
                    </span>
                  </div>
                  <p className="font-serif text-base font-bold text-[#1c1917] mt-1">
                    {t.hoursDetailed}
                  </p>
                  <p className="text-xs text-[#57534e] mt-1">
                    {lang === 'st'
                      ? 'Lijo le lino li fanoa letsatsi lohle ho fihlela har\'a bosiu (12:00 AM).'
                      : 'Kitchen and artisan coffee bar active daily until midnight (12:00 AM).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact & Lipeeletso (wa.me & 5982 2812) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone / Letsa */}
              <a
                id="location-phone-btn"
                href={`tel:${CAFE_INFO.phone}`}
                className="bg-white rounded-2xl p-4 border border-[#ded3c5] hover:border-[#9a6a38] shadow-xs transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f4ebe1] text-[#9a6a38] flex items-center justify-center shrink-0 group-hover:bg-[#9a6a38] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c]">
                    {t.phoneLabel}
                  </span>
                  <span className="block text-sm font-bold text-[#1c1917]">
                    {CAFE_INFO.phone}
                  </span>
                  <span className="block text-[10px] text-[#9a6a38] font-medium">
                    {CAFE_INFO.phoneFormatted}
                  </span>
                </div>
              </a>

              {/* Reservations / wa.me */}
              <button
                id="location-whatsapp-btn"
                onClick={onOpenReserve}
                className="bg-white rounded-2xl p-4 border border-[#ded3c5] hover:border-[#25D366] shadow-xs transition-all flex items-center gap-3 text-left group hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c]">
                    {t.reservationsLabel}
                  </span>
                  <span className="block text-sm font-bold text-[#1c1917]">
                    wa.me
                  </span>
                  <span className="block text-[10px] text-[#25D366] font-bold">
                    {lang === 'st' ? 'Tobetsa ho Buka' : 'Book via WhatsApp'}
                  </span>
                </div>
              </button>
            </div>

            {/* Providers Section requested in prompt */}
            <div
              id="providers-container"
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#ded3c5] shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716c]">
                  Providers & Partnerships
                </span>
                <span className="text-[11px] font-semibold text-[#9a6a38] bg-[#f4ebe1] px-2 py-0.5 rounded-full">
                  Verified Local Partners
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-[#faf6f0] border border-[#eee2d5]">
                  <Coffee className="w-4 h-4 text-[#9a6a38] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1c1917]">Artisan Roasters</p>
                  <p className="text-[9px] text-[#78716c]">Mountain Arabica</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf6f0] border border-[#eee2d5]">
                  <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1c1917]">Delivery Partners</p>
                  <p className="text-[9px] text-[#78716c]">Berea Direct</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf6f0] border border-[#eee2d5]">
                  <PartyPopper className="w-4 h-4 text-[#855627] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#1c1917]">Private Events</p>
                  <p className="text-[9px] text-[#78716c]">Bespoke Catering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Map Card with Berea Hills Pin & Venue Photo */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Real Venue Photo Banner */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#ded3c5] h-48 sm:h-52 group">
              <img
                src={BRAND_ASSETS.gardenBgUrl}
                alt="Rero Cafe Berea Hills physical garden grounds and thatched lodge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#e8c092]">
                    Berea Hills Venue
                  </span>
                  <span className="block text-sm font-serif font-bold text-white">
                    Outdoor Garden Table & Thatched Lodge
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-semibold border border-white/20">
                  Main North 1
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#ded3c5] shadow-sm flex-1 flex flex-col justify-between">
              {/* Map Canvas Frame */}
              <div className="relative w-full h-[240px] sm:h-[260px] rounded-2xl overflow-hidden bg-[#e9e4db] border border-[#d6c7b5]">
                {/* Styled Map Graphic Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#c2b5a3_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                
                {/* Decorative Map Roads */}
                <svg className="absolute inset-0 w-full h-full text-[#d6c8b7]" preserveAspectRatio="none">
                  <line x1="0" y1="30%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <line x1="20%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                  <line x1="10%" y1="80%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  {/* Road highlight for Main North 1 */}
                  <line x1="15%" y1="5%" x2="75%" y2="95%" stroke="#8B1E1E" strokeWidth="6" strokeDasharray="8 4" />
                </svg>

                {/* Road Labels */}
                <div className="absolute top-[28%] left-[25%] bg-[#faf8f5]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-[#8B1E1E] border border-[#d6c8b7] shadow-xs rotate-12">
                  Main North 1 Highway
                </div>

                <div className="absolute bottom-[20%] right-[15%] bg-[#faf8f5]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-semibold text-[#57534e] border border-[#d6c8b7]">
                  Berea Hills 200
                </div>

                {/* Pinpoint for Rero Cafe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                  {/* Radar ripple */}
                  <span className="absolute w-12 h-12 rounded-full bg-[#8B1E1E]/30 animate-ping pointer-events-none" />
                  
                  {/* Pin badge */}
                  <div className="relative z-10 bg-[#111111] text-white px-3.5 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <span className="block text-xs font-bold font-serif leading-none">
                        Rero Cafe
                      </span>
                      <span className="block text-[10px] text-[#f0a8a8] leading-none mt-0.5">
                        5.0★ Google (Main North 1)
                      </span>
                    </div>
                  </div>
                  
                  {/* Needle pointer */}
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#111111]" />
                  <div className="w-3 h-1.5 bg-black/30 rounded-full blur-[1px] mt-0.5" />
                </div>

                {/* Direct Map overlay button */}
                <div className="absolute bottom-4 left-4 right-4">
                  <a
                    id="map-canvas-google-link"
                    href={CAFE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/95 hover:bg-white text-[#1c1917] font-semibold text-xs shadow-md border border-[#d6c7b5] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#8B1E1E]" />
                    <span>{lang === 'st' ? 'Bula ho Google Maps' : 'Open in Google Maps Directions'}</span>
                  </a>
                </div>
              </div>

              {/* Quick note under map */}
              <div className="mt-4 pt-3 border-t border-[#f0e8de] flex items-center justify-between text-xs text-[#78716c]">
                <span>Coordinates: Berea Hills 200, Main North 1</span>
                <span className="font-semibold text-emerald-700">Open · Closes 12 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
