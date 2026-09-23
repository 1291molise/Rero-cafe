import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { CAFE_INFO, TRANSLATIONS } from '../data/cafeData';
import { Language, ReservationFormData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccessToast: (msg: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccessToast,
}) => {
  const t = TRANSLATIONS[lang];

  // Default values
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    email: '',
    date: today,
    time: '19:00',
    guests: 2,
    seatingPreference: 'terrace',
    specialRequests: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    date: string;
    time: string;
    guests: number;
    name: string;
    seating: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) || 1 : value,
    }));
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(lang === 'st' ? 'Ka kopo kenya lebitso le nomoro ea mohala.' : 'Please enter your name and phone number.');
      return;
    }

    const message = `Hello Rero Cafe! I would like to make a table reservation:
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Guests:* ${formData.guests} person(s)
*Date:* ${formData.date}
*Time:* ${formData.time}
*Seating Area:* ${formData.seatingPreference.toUpperCase()}
${formData.specialRequests ? `*Special Notes:* ${formData.specialRequests}` : ''}
Sent from Rero Cafe Website`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/26659822812?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    const bookingId = `RERO-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      id: bookingId,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.fullName,
      seating: formData.seatingPreference,
    });

    onSuccessToast(
      lang === 'st'
        ? 'Peeletso e rometsoe ho WhatsApp ea Rero Cafe!'
        : 'Reservation request created and opened in WhatsApp!'
    );
  };

  const handleDirectConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(lang === 'st' ? 'Ka kopo kenya lebitso le nomoro ea mohala.' : 'Please enter your name and phone number.');
      return;
    }

    const bookingId = `RERO-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      id: bookingId,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.fullName,
      seating: formData.seatingPreference,
    });

    onSuccessToast(
      lang === 'st'
        ? 'Peeletso ea hau e amohetsoe ka katleho!'
        : 'Your table reservation request was registered successfully!'
    );
  };

  const resetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div
      id="reservation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="reservation-modal-dialog"
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#ded3c5] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#ebdccf] bg-[#faf6f0] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9a6a38]">
              {CAFE_INFO.name} · Berea Hills
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1c1917]">
              {t.bookModalTitle}
            </h3>
          </div>
          <button
            id="modal-close-btn"
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-[#ebdccf]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {confirmedBooking ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#1c1917]">
                  {lang === 'st' ? 'Peeletso e Netefalitsoe!' : 'Table Reserved!'}
                </h4>
                <p className="text-xs text-[#78716c] mt-1">
                  Reference Code: <span className="font-mono font-bold text-[#9a6a38]">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#faf6f0] border border-[#ebdccf] rounded-2xl p-4 text-left text-xs sm:text-sm space-y-2 text-[#44403c]">
                <div className="flex justify-between">
                  <span className="text-[#78716c]">{t.fullName}:</span>
                  <span className="font-semibold">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">{t.date} & {t.time}:</span>
                  <span className="font-semibold">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">{t.guests}:</span>
                  <span className="font-semibold">{confirmedBooking.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716c]">{t.seatingArea}:</span>
                  <span className="font-semibold capitalize">{confirmedBooking.seating}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#ebdccf]">
                  <span className="text-[#78716c]">{t.addressLabel}:</span>
                  <span className="font-semibold text-right">{CAFE_INFO.address}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/26659822812?text=${encodeURIComponent(
                    `Hi Rero Cafe, I just confirmed reservation ${confirmedBooking.id} for ${confirmedBooking.name}. Looking forward to dining with you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'st' ? 'Arolelana ka WhatsApp' : 'Open in WhatsApp (wa.me)'}</span>
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#ded3c5] text-xs font-semibold text-[#57534e] hover:bg-[#faf6f0]"
                >
                  {lang === 'st' ? 'Koala (Done)' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppBooking} className="space-y-4">
              <p className="text-xs text-[#78716c]">
                {t.bookModalSubtitle}
              </p>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Neo Makara"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1">
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 5982 2812"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                  />
                </div>
              </div>

              {/* Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1">
                    {t.date}
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1">
                    {t.time}
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38] bg-white"
                  >
                    <option value="08:00">08:00 AM (Breakfast)</option>
                    <option value="10:00">10:00 AM (Brunch)</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="15:00">03:00 PM (Coffee & Pastry)</option>
                    <option value="18:00">06:00 PM (Early Dinner)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="21:00">09:00 PM (Late Dining)</option>
                    <option value="22:30">10:30 PM (Night Lounge)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1">
                    {t.guests}
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38] bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1">
                  {t.seatingArea}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'indoor', label: t.indoor },
                    { id: 'terrace', label: t.terrace },
                    { id: 'garden', label: t.garden },
                    { id: 'bar', label: t.bar },
                  ].map((seat) => (
                    <label
                      key={seat.id}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        formData.seatingPreference === seat.id
                          ? 'border-[#9a6a38] bg-[#f7efe6] text-[#1c1917] font-semibold'
                          : 'border-[#ded3c5] hover:bg-stone-50 text-[#57534e]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="seatingPreference"
                        value={seat.id}
                        checked={formData.seatingPreference === seat.id}
                        onChange={handleChange}
                        className="text-[#9a6a38] focus:ring-[#9a6a38]"
                      />
                      <span>{seat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1">
                  {t.specialRequests}
                </label>
                <textarea
                  name="specialRequests"
                  rows={2}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="e.g. Anniversary table, high chair, birthday surprise..."
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-[#d6c7b5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38]"
                />
              </div>

              {/* Primary Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.confirmViaWhatsApp} (wa.me)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectConfirm}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#ded3c5] text-xs font-semibold text-[#44403c] hover:bg-[#faf6f0] transition-colors"
                >
                  {t.confirmDirect}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
