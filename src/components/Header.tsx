import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/perfumes';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenFinder,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-md border-b border-[#262420] text-white">
      {/* Discreet announcement banner for nationwide delivery */}
      <div className="bg-[#171614] border-b border-[#262420] py-1.5 px-4 text-center">
        <p className="text-[11px] tracking-widest uppercase text-[#d4af65] font-medium">
          Free Nationwide Delivery on orders above Rs. 5,000 · Dispatches within 24 Hours
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#home" 
          className="group flex flex-col items-start leading-none shrink-0"
          aria-label="IT Fragrance Home"
        >
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.22em] text-[#d4af65] group-hover:text-[#efd9a5] transition-colors">
            IT FRAGRANCE
          </span>
          <span className="text-[9px] tracking-[0.45em] text-[#9b9487] uppercase font-sans mt-0.5">
            Haute Parfumerie · Pakistan
          </span>
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-[#c8c2b5]">
          <a 
            href="#collection" 
            className="hover:text-[#d4af65] transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>
          <button
            type="button"
            onClick={onOpenFinder}
            className="hover:text-[#d4af65] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Scent Finder
          </button>
          <a 
            href="#story" 
            className="hover:text-[#d4af65] transition-colors whitespace-nowrap shrink-0"
          >
            Our Story
          </a>
          <a 
            href="#reviews" 
            className="hover:text-[#d4af65] transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum IT Fragrance! I have a question about choosing a perfume.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#38d47b] hover:text-[#4ce48d] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag / Cart Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#1a1917] hover:bg-[#252320] border border-[#d4af65]/30 hover:border-[#d4af65] text-[#f8f5ef] text-xs uppercase tracking-wider font-semibold rounded-none transition-all duration-200 cursor-pointer"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#d4af65]" />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold font-mono bg-[#d4af65] text-black">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
