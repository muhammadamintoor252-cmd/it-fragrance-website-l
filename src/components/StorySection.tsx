import React from 'react';
import { Sparkles, Shield, Droplets, Feather } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#141312] border-y border-[#262420] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#d4af65] mb-3">
            <span>The World of IT Fragrance</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-normal leading-tight text-white mb-6">
            Crafted to Make Every Moment <br />
            <span className="italic text-[#efd9a5]">Unforgettable.</span>
          </h2>

          <p className="text-base text-[#ccc5b7] leading-relaxed font-light">
            In a world saturated with fleeting scents that disappear within an hour, IT Fragrance was born with a singular obsessive purpose: to create authentic, high-concentration perfume oils that honor Pakistan's rich tradition of oriental elegance while enduring our climate with unwavering longevity.
          </p>
        </div>

        {/* 4 Pillars of Our Craft */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#181715] border border-[#2b2924] hover:border-[#d4af65]/40 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-[#23211d] text-[#d4af65] mb-4">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">25–30% Extrait Concentration</h3>
            <p className="text-xs text-[#a69e90] leading-relaxed font-light">
              Unlike standard commercial colognes diluted with alcohol, our flacons are infused with concentrated perfume essences for 12–14+ hours of genuine longevity.
            </p>
          </div>

          <div className="p-6 bg-[#181715] border border-[#2b2924] hover:border-[#d4af65]/40 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-[#23211d] text-[#d4af65] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">60-Day Dark Chamber Maceration</h3>
            <p className="text-xs text-[#a69e90] leading-relaxed font-light">
              Each small batch is rested in climate-controlled dark rooms for two full months, allowing the oud, vanilla, and resins to mature into a buttery, harmonious drydown.
            </p>
          </div>

          <div className="p-6 bg-[#181715] border border-[#2b2924] hover:border-[#d4af65]/40 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-[#23211d] text-[#d4af65] mb-4">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Artisanal Fine Mist Spray</h3>
            <p className="text-xs text-[#a69e90] leading-relaxed font-light">
              Engineered micro-dispersion nozzles generate a micro-fine aerosol veil that binds evenly to skin and textile fibers without residue or fabric staining.
            </p>
          </div>

          <div className="p-6 bg-[#181715] border border-[#2b2924] hover:border-[#d4af65]/40 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-[#23211d] text-[#d4af65] mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">Pure Ethical Ingredients</h3>
            <p className="text-xs text-[#a69e90] leading-relaxed font-light">
              We source Cambodian agarwood, Grasse jasmine, Italian bergamot, and Ceylon cinnamon from sustainable family distillers. 100% cruelty-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
