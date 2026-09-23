import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Share2, Send } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS } from '../data/cafeData';
import { Language } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccessToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccessToast,
}) => {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const shareText = `Check out Rero Cafe in Berea Hills (Main North 1)! 5.0 Google Rating restaurant, artisan coffee & dinner, open until 12 AM midnight:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      onSuccessToast(t.linkCopied);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText} ${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `Experience Rero Cafe in Berea Hills! 5.0 rated coffee & dining, open until 12 AM.`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rero Cafe - Berea Hills',
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // user cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      id="share-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="share-modal-dialog"
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#ded3c5] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#ebdccf] bg-[#faf6f0] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a6a38]">
              {CAFE_INFO.name}
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1c1917]">
              {t.shareModalTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#ebdccf]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-xs sm:text-sm text-[#57534e]">
            {t.shareModalSubtitle}
          </p>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleFacebookShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 font-semibold text-xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>Facebook</span>
            </button>

            <button
              onClick={handleTwitterShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 hover:bg-stone-200 font-semibold text-xs transition-colors"
            >
              <Send className="w-4 h-4 text-stone-700" />
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#f7efe6] border border-[#d6c7b5] text-[#1c1917] hover:bg-[#ebdccf] font-semibold text-xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-[#9a6a38]" />
              <span>{lang === 'st' ? 'Romela Tse Ding' : 'Device Share'}</span>
            </button>
          </div>

          {/* Link Copy Bar */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#44403c]">
              {t.copyLink}
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[#d6c7b5] bg-[#faf6f0]">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full text-xs bg-transparent px-2 text-[#57534e] outline-none select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1917] hover:bg-[#2d2926] text-white text-xs font-semibold shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
