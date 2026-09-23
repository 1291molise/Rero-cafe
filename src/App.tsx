import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { ReviewModal } from './components/ReviewModal';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';
import { INITIAL_REVIEWS, CAFE_INFO, TRANSLATIONS } from './data/cafeData';
import { Language, Review } from './types';
import { Phone, Calendar, Navigation, Share2 } from 'lucide-react';

export default function App() {
  // Primary language: defaults to Sesotho ('st') honoring the user's prompt, with 1-click toggle to English
  const [lang, setLang] = useState<Language>('st');

  // Bookmarking / Save state persisted in localStorage
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rero_cafe_saved') === 'true';
    } catch {
      return false;
    }
  });

  // Modal open states
  const [isReserveOpen, setIsReserveOpen] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // Reviews collection with dynamic submissions
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'st' ? 'en' : 'st'));
    showToast(
      lang === 'st'
        ? 'Switched to English'
        : 'Puo e fetotsoe ho Sesotho'
    );
  };

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('rero_cafe_saved', String(next));
      } catch {
        // no-op
      }
      showToast(
        next
          ? lang === 'st'
            ? 'Rero Cafe e bolokiloe har\'a libaka tseo u li ratang!'
            : 'Rero Cafe saved to your favorite bookmarks!'
          : lang === 'st'
            ? 'E tlositsoe har\'a libaka tse bolokiloeng'
            : 'Removed from bookmarks'
      );
      return next;
    });
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] selection:bg-[#c28e5d] selection:text-white pb-16 sm:pb-0">
      {/* Primary Sticky Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenReserve={() => setIsReserveOpen(true)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onNavigateTo={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with full Action Ribbon (Letsa, Lipeeletso, Tlhaloso ea litsela, Ngola tlhahlobo, Save, Arolelana) */}
        <Hero
          lang={lang}
          onOpenReserve={() => setIsReserveOpen(true)}
          onOpenReview={() => setIsReviewOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onNavigateTo={scrollToSection}
        />

        {/* Curated Food & Coffee Menu */}
        <MenuSection lang={lang} />

        {/* 5.0 Google Reviews Showcase & Ngola Tlhahlobo */}
        <ReviewsSection
          lang={lang}
          reviews={reviews}
          onOpenWriteReview={() => setIsReviewOpen(true)}
        />

        {/* Location, Directions, Operating Hours & Providers */}
        <LocationHours
          lang={lang}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        lang={lang}
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenReview={() => setIsReviewOpen(true)}
        onNavigateTo={scrollToSection}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <aside
        aria-label="Mobile quick actions"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ded3c5] p-2 flex sm:hidden items-center justify-around shadow-lg"
      >
        <a
          id="mobile-call-btn"
          href={`tel:${CAFE_INFO.phone}`}
          className="flex flex-col items-center justify-center p-1 text-[#1c1917]"
        >
          <Phone className="w-4 h-4 text-[#9a6a38]" />
          <span className="text-[10px] font-semibold mt-0.5">{t.callBtn}</span>
        </a>

        <button
          id="mobile-reserve-btn"
          onClick={() => setIsReserveOpen(true)}
          className="flex flex-col items-center justify-center p-1 text-emerald-800"
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-semibold mt-0.5">{t.reserveBtn}</span>
        </button>

        <a
          id="mobile-directions-btn"
          href={CAFE_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-[#1c1917]"
        >
          <Navigation className="w-4 h-4 text-[#9a6a38]" />
          <span className="text-[10px] font-semibold mt-0.5">{t.directionsBtn}</span>
        </a>

        <button
          id="mobile-share-btn"
          onClick={() => setIsShareOpen(true)}
          className="flex flex-col items-center justify-center p-1 text-[#1c1917]"
        >
          <Share2 className="w-4 h-4 text-[#9a6a38]" />
          <span className="text-[10px] font-semibold mt-0.5">{t.shareBtn}</span>
        </button>
      </aside>

      {/* Modals & Dialogs */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        lang={lang}
        onSuccessToast={showToast}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        lang={lang}
        onAddReview={handleAddReview}
        onSuccessToast={showToast}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        lang={lang}
        onSuccessToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
