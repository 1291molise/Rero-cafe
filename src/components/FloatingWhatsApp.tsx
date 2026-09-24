import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenReserve?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenReserve }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 group">
      {/* Floating Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#ded2c3] text-[#1c1917] shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat on WhatsApp · 5982 2812</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-stone-600 ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        id="floating-whatsapp-action"
        href={CAFE_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl hover:shadow-[#25D366]/40 transition-all transform hover:scale-105 active:scale-95 duration-200 border-2 border-white"
        title="Open WhatsApp Chat with Rero Cafe"
        aria-label="Chat with Rero Cafe on WhatsApp"
      >
        <span className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
        </span>
        <span className="font-bold text-sm tracking-wide hidden md:inline">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
