import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, ShieldCheck, Truck } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/perfumes';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080808] border-t border-[#22201c] text-[#a69e90] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <a href="#home" className="inline-block mb-3">
              <span className="font-display text-2xl font-bold tracking-[0.25em] text-[#d4af65] block">
                IT FRAGRANCE
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#7d7568] uppercase font-sans">
                Haute Parfumerie
              </span>
            </a>
            <p className="text-xs text-[#a49c8f] leading-relaxed mb-4">
              Your Scent. Your Identity. Artisanal Extrait de Parfum handcrafted with French essential oils, tailored for Pakistan's climate with extraordinary longevity.
            </p>
            <div className="flex items-center gap-2 text-[#d4af65]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] font-medium uppercase tracking-wider">
                100% Authentic Quality Guarantee
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Explore Atelier
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#collection" className="hover:text-[#d4af65] transition-colors">
                  Full Fragrance Collection
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#d4af65] transition-colors">
                  Artisanal 60-Day Maceration
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4af65] transition-colors">
                  Customer Testimonials
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum IT Fragrance! I want to inquire about custom orders or wholesale bottles.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af65] transition-colors"
                >
                  Custom & Wedding Favors
                </a>
              </li>
            </ul>
          </div>

          {/* Perfume Care & Sillage Tips */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Scent Longevity Ritual
            </h4>
            <ul className="space-y-2 text-[#989082] text-[11px] leading-relaxed">
              <li>• Apply on warm pulse points: wrists, sides of neck, inner elbows.</li>
              <li>• Moisturize skin lightly with unscented lotion prior to spraying.</li>
              <li>• Store bottles in a cool, shaded sanctuary away from direct sunlight.</li>
              <li>• Never rub wrists together after application to preserve top notes.</li>
            </ul>
          </div>

          {/* Direct WhatsApp & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Direct Orders & Support
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white hover:text-[#38d47b] transition-colors"
              >
                <div className="w-7 h-7 bg-[#1c1b18] border border-[#2b2823] flex items-center justify-center text-[#38d47b]">
                  <MessageCircle className="w-3.5 h-3.5 fill-[#38d47b]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8274] block uppercase tracking-wider">WhatsApp Hotline</span>
                  <span className="font-mono font-semibold text-xs text-white">{WHATSAPP_DISPLAY}</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 bg-[#1c1b18] border border-[#2b2823] flex items-center justify-center text-[#d4af65]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8274] block uppercase tracking-wider">Courier Dispatch</span>
                  <span className="text-xs text-[#cfc7ba]">Lahore, Karachi, Islamabad & Nationwide</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#888174]">
                Official Website:{' '}
                <a href="https://itfragrance.com" className="text-[#d4af65] underline hover:text-[#efd9a5]">
                  itfragrance.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1c1b18] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#716a5e]">
          <p>© 2026 IT Fragrance. All rights reserved. Registered Parfumerie in Pakistan.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#38d47b]">
              <Truck className="w-3 h-3" />
              <span>Nationwide Courier (Trax / Call Courier / TCS)</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
