import React, { useState } from 'react';
import { X, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS } from '../data/cafeData';
import { Language, Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddReview: (review: Review) => void;
  onSuccessToast: (msg: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddReview,
  onSuccessToast,
}) => {
  const t = TRANSLATIONS[lang];
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert(lang === 'st' ? 'Ka kopo kenya lebitso le maikutlo a hao.' : 'Please enter your name and review.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: name.trim(),
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      relativeTime: lang === 'st' ? 'Hona joale' : 'Just now',
      comment: comment.trim(),
      verified: true,
      avatarText: name.trim().slice(0, 2).toUpperCase(),
    };

    onAddReview(newReview);
    setIsSubmitted(true);
    onSuccessToast(
      lang === 'st'
        ? 'Re leboha haholo ka tlhahlobo ea hao e mofuthu!'
        : 'Thank you for your review for The Valley Guest House!'
    );
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div
      id="review-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="review-modal-dialog"
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#ded3c5] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#ebdccf] bg-[#faf6f0] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a6a38]">
              5.0 ★ Google Reviews
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1c1917]">
              {t.writeReviewTitle}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#ebdccf]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1c1917]">
                {lang === 'st' ? 'Re Lebohile Haholo!' : 'Thank You!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                {lang === 'st'
                  ? 'Tlhahlobo ea hao e kenyellelitsoe leqepheng la Rero Cafe. O ka arolelana hape ho Google Maps.'
                  : 'Your review has been added to Rero Cafe! You can also post it directly onto Google Reviews to support local Berea dining.'}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={CAFE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1c1917] hover:bg-[#2d2926] text-white font-semibold text-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#e8c092]" />
                  <span>{lang === 'st' ? 'Bula Google Reviews' : 'Open Google Reviews'}</span>
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#ded3c5] text-xs font-semibold text-[#57534e] hover:bg-[#faf6f0]"
                >
                  {lang === 'st' ? 'Koala' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#78716c]">
                {t.writeReviewSubtitle}
              </p>

              {/* Star Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                  {t.ratingLabel}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#9a6a38]">
                    {rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Moliseng T."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1">
                  {t.yourReview} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    lang === 'st'
                      ? 'Lijo, kofi le kamohelo ea Rero Cafe li ne li le joang?...'
                      : 'Tell other guests about the flavors, late hours, atmosphere, or service at Rero Cafe...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#1c1917] hover:bg-[#2d2926] text-white font-semibold text-sm shadow-md transition-colors"
              >
                {t.submitReview}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
