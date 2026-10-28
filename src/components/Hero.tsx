import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Truck, Clock } from 'lucide-react';

interface HeroProps {
  onOpenFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFinder }) => {
  return (
    <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-[#24221e]">
      {/* Background imagery with measured luxury scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_it_fragrance.jpg"
          alt="IT Fragrance Niche Perfumery Flacons in Warm Golden Light"
          className="w-full h-full object-cover object-center scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient overlay ensuring 4.5:1 WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/85 to-[#0c0c0c]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#d4af65] font-semibold mb-4">
            <span>Welcome to IT Fragrance</span>
            <span className="w-8 h-[1px] bg-[#d4af65]/60" />
            <span>Extrait de Parfum</span>
          </div>

          {/* Headline with text-wrap: balance */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-white tracking-tight mb-6 [text-wrap:balance]">
            Your Scent.<br />
            <span className="italic text-[#efd9a5]">Your Identity.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#ded7cb] leading-relaxed mb-8 max-w-xl font-light">
            More than a fragrance. A statement of confidence, elegance, and individuality. 
            Formulated with 25–30% premium aromatic oil concentrations for exceptional all-day sillage 
            and lasting presence across Pakistan.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#collection"
              className="px-7 py-3.5 bg-[#d4af65] hover:bg-[#efd9a5] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-200 shadow-lg shadow-black/40 flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onOpenFinder}
              className="px-7 py-3.5 bg-[#171614]/80 hover:bg-[#22211e] border border-[#d4af65]/50 hover:border-[#d4af65] text-[#f8f5ef] font-semibold text-xs tracking-widest uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af65]" />
              <span>Scent Finder Quiz</span>
            </button>
          </div>

          {/* Three key pillar metrics placed directly adjacent */}
          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-[#312e29] mt-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af65] uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Longevity</span>
              </div>
              <p className="text-white text-sm font-semibold">12–14+ Hours</p>
              <p className="text-xs text-[#9b9487]">Long-lasting projection</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af65] uppercase tracking-wider mb-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </div>
              <p className="text-white text-sm font-semibold">2–3 Days Fast</p>
              <p className="text-xs text-[#9b9487]">Karachi, LHR, ISB & all PK</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af65] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment</span>
              </div>
              <p className="text-white text-sm font-semibold">Cash On Delivery</p>
              <p className="text-xs text-[#9b9487]">WhatsApp confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
