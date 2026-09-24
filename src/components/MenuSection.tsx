import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, Leaf, Coffee, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS, TRANSLATIONS, CAFE_INFO } from '../data/cafeData';
import { Language, MenuItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MenuSectionProps {
  lang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t.allCategories, icon: UtensilsCrossed },
    { id: 'breakfast', label: t.categoryBreakfast, icon: Coffee },
    { id: 'mains', label: t.categoryMains, icon: Flame },
    { id: 'coffee', label: t.categoryCoffee, icon: Coffee },
    { id: 'drinks', label: t.categoryDrinks, icon: Sparkles },
    { id: 'desserts', label: t.categoryDesserts, icon: Sparkles },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.nameSesotho && item.nameSesotho.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        (item.descriptionSesotho && item.descriptionSesotho.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOrderWhatsApp = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello The Valley Guest House! I am viewing your website and would like to inquire/book: ${item.name} (R${item.price}).`
    );
    window.open(`https://wa.me/26656038339?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu-section" className="py-12 sm:py-16 bg-[#f4ede3]/50 border-t border-[#e8ded2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a16207] block mb-2">
            {lang === 'st' ? 'The Valley Guest House · R350 / Couple' : 'The Valley Guest House · R350 Per Night For A Couple'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
            {t.menuTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#57534e]">
            {t.menuSubtitle}
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories Pill Navigation */}
          <div
            id="menu-category-tabs"
            className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#1c1917] text-white shadow-sm'
                      : 'bg-white border border-[#ded3c5] text-[#57534e] hover:bg-[#eae0d4] hover:text-[#1c1917]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c827a]" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'st' ? 'Batla lijo kapa kofi...' : 'Search food or drink...'}
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs sm:text-sm bg-white border border-[#ded3c5] focus:outline-none focus:ring-2 focus:ring-[#9a6a38] text-[#1c1917] placeholder:text-[#8c827a]"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#ded3c5]">
            <p className="text-sm font-medium text-[#78716c]">
              {lang === 'st'
                ? 'Ha ho lijo tse fumanroeng. Leka ho batla ntho e ngoe.'
                : 'No menu items found. Please try a different category or search term.'}
            </p>
          </div>
        ) : (
          <div
            id="menu-items-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => {
              const title = lang === 'st' && item.nameSesotho ? item.nameSesotho : item.name;
              const desc = lang === 'st' && item.descriptionSesotho ? item.descriptionSesotho : item.description;

              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#ded3c5] hover:border-[#9a6a38]/60 shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Item Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.isChefSpecial && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#855627] text-white shadow-xs">
                          <Sparkles className="w-3 h-3" />
                          Chef's Choice
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1c1917] text-white shadow-xs">
                          <Flame className="w-3 h-3 text-amber-400" />
                          Popular
                        </span>
                      )}
                      {item.vegetarian && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-700 text-white shadow-xs">
                          <Leaf className="w-3 h-3" />
                          Vegetarian
                        </span>
                      )}
                    </div>

                    {/* Price Pill */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-md border border-[#e2d8ce]">
                      <span className="text-sm font-bold text-[#1c1917]">
                        M{item.price.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-lg font-bold text-[#1c1917] group-hover:text-[#9a6a38] transition-colors">
                          {title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#57534e] line-clamp-3 leading-relaxed mb-4">
                        {desc}
                      </p>
                    </div>

                    {/* Order via WhatsApp CTA */}
                    <div className="pt-3 border-t border-[#f0e8de] flex items-center justify-between">
                      <span className="text-xs text-[#78716c] font-medium">
                        Rero Berea
                      </span>
                      <button
                        id={`order-btn-${item.id}`}
                        onClick={() => handleOrderWhatsApp(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] px-3 py-1.5 rounded-xl shadow-2xs transition-all transform active:scale-95"
                        title="Order or inquire directly via WhatsApp (+266 5982 2812)"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>WhatsApp (wa.me)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
