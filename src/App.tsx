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
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { INITIAL_REVIEWS, CAFE_INFO, TRANSLATIONS } from './data/cafeData';
import { Language, Review } from './types';
import { Phone, Calendar, Navigation, Share2, UtensilsCrossed, Compass } from 'lucide-react';

export default function App() {
  // Primary language: defaults to Sesotho ('st') with toggle to English
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
            ? 'The Valley Guest House e bolokiloe har\'a libaka tseo u li ratang!'
            : 'The Valley Guest House saved to your favorite bookmarks!'
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
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] selection:bg-[#8B1E1E] selection:text-white pb-20 sm:pb-0">
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
        {/* Hero with full Action Ribbon and uploaded garden background */}
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

        {/* Location, Directions, Operating Hours & Berea Hills Map */}
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

      {/* Floating WhatsApp Action Button (Desktop & Tablet) */}
      <div className="hidden sm:block">
        <FloatingWhatsApp onOpenReserve={() => setIsReserveOpen(true)} />
      </div>

      {/* Ready App: Mobile Native Bottom Navigation Bar */}
      <nav
        aria-label="Mobile application navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#ded3c5] px-2 py-2 flex sm:hidden items-center justify-around shadow-2xl safe-area-bottom"
      >
        <button
          id="mobile-nav-home"
          onClick={() => scrollToSection('hero')}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#44403c] hover:text-[#a16207] transition-colors"
        >
          <Compass className="w-5 h-5 text-[#a16207]" />
          <span className="text-[10px] font-bold mt-1">Valley</span>
        </button>

        <button
          id="mobile-nav-menu"
          onClick={() => scrollToSection('menu-section')}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#44403c] hover:text-[#8B1E1E] transition-colors"
        >
          <UtensilsCrossed className="w-5 h-5 text-stone-600" />
          <span className="text-[10px] font-semibold mt-1">
            {lang === 'st' ? 'Lijo' : 'Menu'}
          </span>
        </button>

        {/* Highlighted WhatsApp Tab in Mobile Navigation */}
        <a
          id="mobile-nav-whatsapp"
          href={CAFE_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-4"
          aria-label="WhatsApp Chat"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg border-2 border-white transform active:scale-95 transition-transform">
            <WhatsAppIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-extrabold text-[#25D366] mt-0.5">
            WhatsApp
          </span>
        </a>

        <a
          id="mobile-nav-call"
          href={`tel:${CAFE_INFO.phone}`}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#44403c] hover:text-[#8B1E1E] transition-colors"
        >
          <Phone className="w-5 h-5 text-stone-600" />
          <span className="text-[10px] font-semibold mt-1">{t.callBtn}</span>
        </a>

        <button
          id="mobile-nav-reserve"
          onClick={() => setIsReserveOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#44403c] hover:text-[#8B1E1E] transition-colors"
        >
          <Calendar className="w-5 h-5 text-amber-700" />
          <span className="text-[10px] font-semibold mt-1">{t.reserveBtn}</span>
        </button>
      </nav>

      {/* Global Interactive Modals */}
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

      {/* Feedback Toast Notification */}
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
