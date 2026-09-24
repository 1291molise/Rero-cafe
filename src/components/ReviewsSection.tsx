import React from 'react';
import { Star, MessageSquarePlus, ExternalLink, ShieldCheck } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS } from '../data/cafeData';
import { Language, Review } from '../types';

interface ReviewsSectionProps {
  lang: Language;
  reviews: Review[];
  onOpenWriteReview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  lang,
  reviews,
  onOpenWriteReview,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebe1] text-[#9a6a38] text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#9a6a38] text-[#9a6a38]" />
              <span>{lang === 'st' ? '5.0 maikutlo a 1 a Google' : '5.0 on Google'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
              {t.reviewsTitle}
            </h2>
            <p className="mt-1 text-sm text-[#57534e]">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="reviews-write-cta-btn"
              onClick={onOpenWriteReview}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1917] hover:bg-[#2d2926] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#e8c092]" />
              <span>{t.writeReviewBtn}</span>
            </button>

            <a
              id="reviews-google-link"
              href={CAFE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#ded3c5] hover:bg-white text-xs sm:text-sm font-semibold text-[#44403c] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#9a6a38]" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>

        {/* Aggregate Overview Card */}
        <div className="bg-[#f5ece0]/80 rounded-3xl p-6 sm:p-8 border border-[#e8ded2] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score box */}
            <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start border-b md:border-b-0 md:border-r border-[#ded3c5] pb-6 md:pb-0 md:pr-6">
              <div className="font-serif text-5xl sm:text-6xl font-black text-[#1c1917]">
                5.0
              </div>
              <div className="flex text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#78716c]">
                {lang === 'st'
                  ? 'E lekantsoe ka holimo ho tsohle The Valley, Lesotho'
                  : 'Highest guest satisfaction in The Valley, Lesotho'}
              </p>
            </div>

            {/* Feature bullets */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
                <span className="block font-serif text-lg font-bold text-[#1c1917]">
                  R350
                </span>
                <span className="block text-xs text-[#78716c] font-medium mt-0.5">
                  {lang === 'st' ? 'Boiketlo ba Bobeli (Couples)' : 'Per Night For A Couple'}
                </span>
              </div>

              <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
                <span className="block font-serif text-lg font-bold text-[#1c1917]">
                  24/7
                </span>
                <span className="block text-xs text-[#78716c] font-medium mt-0.5">
                  {lang === 'st' ? 'Kamohelo e Mofuthu' : 'Guest Reception & Stays'}
                </span>
              </div>

              <div className="bg-white/80 rounded-2xl p-4 border border-white/60">
                <span className="block font-serif text-lg font-bold text-[#1c1917]">
                  wa.me
                </span>
                <span className="block text-xs text-[#78716c] font-medium mt-0.5">
                  {lang === 'st' ? 'Lipeeletso tse Bobebe (+266 560 383 39)' : 'WhatsApp Booking (+266 560 383 39)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div
          id="reviews-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((rev) => {
            const commentText =
              lang === 'st' && rev.commentSesotho ? rev.commentSesotho : rev.comment;

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-white rounded-2xl p-6 border border-[#ded3c5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Top Star & Verified Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        Google Verified
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed italic mb-4">
                    "{commentText}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#f0e8de] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#9a6a38] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {rev.avatarText}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1c1917]">
                      {rev.author}
                    </span>
                    <span className="block text-[11px] text-[#78716c]">
                      {rev.relativeTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
