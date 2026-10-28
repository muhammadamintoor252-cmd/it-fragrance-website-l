import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Clock, Wind, Calendar, Check, Sparkles } from 'lucide-react';
import { Perfume } from '../data/perfumes';
import { formatPKR } from '../types/cart';

interface ProductDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onInstantWhatsApp: (perfume: Perfume, size: string, price: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
  onInstantWhatsApp,
}) => {
  if (!perfume) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = perfume.variants[selectedVariantIndex] || perfume.variants[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#121110] border border-[#d4af65]/30 shadow-2xl text-white my-8 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-[#d4af65] border border-[#d4af65]/30 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Fragrance Flacon Presentation */}
          <div className="relative bg-[#171614] p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#262420]">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="max-h-[380px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
            {perfume.badge && (
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-[#0c0c0c] border border-[#d4af65]/40 text-[#efd9a5] px-2.5 py-1">
                {perfume.badge}
              </span>
            )}
          </div>

          {/* Right Column: Olfactory Pyramid & Specifications */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a8a192] mb-1">
                <span>{perfume.family}</span>
                <span>·</span>
                <span>{perfume.concentration}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-white mb-1">
                {perfume.name}
              </h2>
              <p className="text-xs text-[#d4af65] tracking-wider uppercase mb-4">
                {perfume.subtitle}
              </p>

              <p className="text-sm text-[#cdc5b7] leading-relaxed mb-6 font-light">
                {perfume.description}
              </p>

              {/* Olfactory Notes Pyramid */}
              <div className="bg-[#181715] border border-[#2b2924] p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#efd9a5] uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af65]" />
                  <span>Olfactory Architecture</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#968e7f] uppercase tracking-wider font-medium text-[11px] block">
                      Top Notes (Initial 15–30 Mins):
                    </span>
                    <p className="text-white font-medium mt-0.5">
                      {perfume.notes.top.join(' · ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#968e7f] uppercase tracking-wider font-medium text-[11px] block">
                      Heart Notes (The Signature Soul 2–6 Hours):
                    </span>
                    <p className="text-[#f1ece2] font-medium mt-0.5">
                      {perfume.notes.heart.join(' · ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-[#968e7f] uppercase tracking-wider font-medium text-[11px] block">
                      Base Notes (Deep Lasting Drydown 12+ Hours):
                    </span>
                    <p className="text-[#d4af65] font-medium mt-0.5">
                      {perfume.notes.base.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-[#bcb4a6]">
                <div className="bg-[#161513] p-3 border border-[#24221e]">
                  <div className="flex items-center gap-1.5 text-[#d4af65] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Longevity</span>
                  </div>
                  <p className="text-white">{perfume.longevity}</p>
                </div>

                <div className="bg-[#161513] p-3 border border-[#24221e]">
                  <div className="flex items-center gap-1.5 text-[#d4af65] mb-1">
                    <Wind className="w-3.5 h-3.5" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Sillage & Projection</span>
                  </div>
                  <p className="text-white">{perfume.sillage}</p>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-[#9b9487] mb-2">
                  Select Size & Presentation:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {perfume.variants.map((v, i) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`py-2 px-2.5 text-xs text-center border transition-all cursor-pointer ${
                        selectedVariantIndex === i
                          ? 'border-[#d4af65] bg-[#d4af65] text-black font-semibold'
                          : 'border-[#2d2a25] bg-[#1a1917] text-[#c7bfb1] hover:border-[#4d483f]'
                      }`}
                    >
                      <div className="font-bold">{v.size}</div>
                      <div className="text-[10px] mt-0.5">Rs. {formatPKR(v.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-4 border-t border-[#262420]">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#989082]">Total Amount:</span>
                <span className="text-2xl font-bold font-mono text-[#d4af65] tabular-nums">
                  Rs. {formatPKR(activeVariant.price)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(perfume, activeVariant.size, activeVariant.price);
                    onClose();
                  }}
                  className="py-3 px-4 bg-[#d4af65] hover:bg-[#efd9a5] text-black text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onInstantWhatsApp(perfume, activeVariant.size, activeVariant.price);
                    onClose();
                  }}
                  className="py-3 px-4 bg-[#1a1917] hover:bg-[#252320] border border-[#38d47b]/50 text-[#38d47b] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
