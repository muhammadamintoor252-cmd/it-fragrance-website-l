import React, { useState } from 'react';
import { Eye, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { Perfume, WHATSAPP_NUMBER } from '../data/perfumes';
import { formatPKR } from '../types/cart';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onViewDetails: (perfume: Perfume) => void;
  onInstantWhatsApp: (perfume: Perfume, size: string, price: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onAddToCart,
  onViewDetails,
  onInstantWhatsApp,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = perfume.variants[selectedVariantIndex] || perfume.variants[0];

  return (
    <article className="group bg-[#131211] border border-[#2b2823] hover:border-[#d4af65]/60 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#1a1917] flex items-center justify-center">
        <img
          src={perfume.image}
          alt={`${perfume.name} Luxury Eau de Parfum Flacon`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131211] via-transparent to-black/20 opacity-80" />

        {/* Badge if present - quiet text tag, not a gaudy pill */}
        {perfume.badge && (
          <div className="absolute top-3 left-3 bg-[#0c0c0c]/85 border border-[#d4af65]/40 px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold text-[#efd9a5]">
            {perfume.badge}
          </div>
        )}

        {/* Floating Quick Action overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={() => onViewDetails(perfume)}
            className="flex-1 py-2 px-3 bg-[#0c0c0c]/90 hover:bg-[#0c0c0c] border border-[#d4af65]/40 text-[#f8f5ef] text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af65]" />
            <span>Scent Notes</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Family - clean unboxed metadata with dot */}
          <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#a59d8f] mb-1.5">
            <span>{perfume.family}</span>
            <span aria-hidden="true">·</span>
            <span>{perfume.longevity.split(' ')[0]} Sillage</span>
          </div>

          {/* Perfume Name */}
          <h3 className="font-display text-2xl font-normal text-white group-hover:text-[#efd9a5] transition-colors">
            {perfume.name}
          </h3>

          {/* Subtitle / Olfactory vibe */}
          <p className="text-xs text-[#a39c90] tracking-wide mt-0.5 mb-3">
            {perfume.subtitle}
          </p>

          {/* Short description */}
          <p className="text-xs text-[#c9c2b5] leading-relaxed line-clamp-2 mb-4 font-light">
            {perfume.description}
          </p>

          {/* Key Olfactory Notes Snippet */}
          <div className="border-t border-[#22201c] pt-2.5 pb-3">
            <span className="text-[10px] tracking-widest uppercase text-[#8d8576] block mb-1">
              Primary Notes:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#e6dfd3]">
              {perfume.notes.top.slice(0, 2).map((note, idx) => (
                <span key={idx}>
                  {note}
                  {idx < 1 ? ' ·' : ''}
                </span>
              ))}
              <span>· {perfume.notes.heart[0]}</span>
              <span>· {perfume.notes.base[0]}</span>
            </div>
          </div>
        </div>

        {/* Size Selection Segmented Control */}
        <div className="mt-2 pt-3 border-t border-[#22201c]">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#9f978a] mb-1.5">
            <span>Select Size:</span>
            <span className="text-white font-medium">{activeVariant.size}</span>
          </div>

          <div className="grid grid-cols-3 gap-1 p-1 bg-[#1c1b18] border border-[#2c2924] mb-4">
            {perfume.variants.map((variant, index) => {
              const isSelected = selectedVariantIndex === index;
              return (
                <button
                  key={variant.size}
                  type="button"
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`py-1.5 px-2 text-[11px] font-medium transition-colors text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af65] text-black font-semibold shadow-sm'
                      : 'text-[#bbb3a5] hover:text-white'
                  }`}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>

          {/* Price & Purchase Actions */}
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-[11px] text-[#938b7d] uppercase tracking-wider block">Price</span>
              <span className="text-xl font-bold font-mono text-[#d4af65] tabular-nums">
                Rs. {formatPKR(activeVariant.price)}
              </span>
            </div>
            <span className="text-[11px] text-[#938b7d]">
              In Stock · Express Dispatch
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(perfume, activeVariant.size, activeVariant.price)}
              className="py-2.5 px-3 bg-[#d4af65] hover:bg-[#efd9a5] text-black text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => onInstantWhatsApp(perfume, activeVariant.size, activeVariant.price)}
              className="py-2.5 px-3 bg-[#1d1c19] hover:bg-[#282622] border border-[#38d47b]/40 hover:border-[#38d47b] text-[#38d47b] hover:text-[#4ce48d] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Instant WhatsApp Order"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
