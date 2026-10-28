import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { PERFUMES, DISCOVERY_SET, Perfume } from '../data/perfumes';
import { formatPKR } from '../types/cart';

interface ScentFinderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onInstantWhatsApp: (perfume: Perfume, size: string, price: number) => void;
}

export const ScentFinder: React.FC<ScentFinderProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onInstantWhatsApp,
}) => {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setProfile('');
    setVibe('');
  };

  // Determine recommendation based on answers
  const getRecommendation = (): Perfume => {
    if (profile === 'oud' || occasion === 'royal') {
      return PERFUMES.find(p => p.id === 'it-oud') || PERFUMES[0];
    }
    if (profile === 'floral' || occasion === 'daily') {
      return PERFUMES.find(p => p.id === 'it-bloom') || PERFUMES[1];
    }
    if (profile === 'dark' || vibe === 'bold') {
      return PERFUMES.find(p => p.id === 'it-noir') || PERFUMES[2];
    }
    if (profile === 'amber' || occasion === 'evening') {
      return PERFUMES.find(p => p.id === 'it-amber') || PERFUMES[3];
    }
    return DISCOVERY_SET;
  };

  const recommendedPerfume = getRecommendation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#121110] border border-[#d4af65]/40 text-white p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#999183] hover:text-[#d4af65] transition-colors cursor-pointer"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {step <= 3 ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af65] uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Scent Consultation · Question {step} of 3</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
              {step === 1 && "When and where do you want your fragrance to speak for you?"}
              {step === 2 && "Which aromatic notes draw your instinctual attraction?"}
              {step === 3 && "What impression do you desire to leave behind?"}
            </h3>

            <p className="text-xs text-[#a49d90] mb-6">
              {step === 1 && "Every fragrance tells a distinct story suited to the hour, climate, and setting."}
              {step === 2 && "Select the scent family that feels natural to your character."}
              {step === 3 && "Choose the aura and sillage strength that best expresses your identity."}
            </p>

            {/* Step 1 Options */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'royal', label: 'Grand Weddings & Regal Gatherings', desc: 'Prestige, nobility, rich projection' },
                  { id: 'daily', label: 'Daytime Freshness & Office Elegance', desc: 'Clean, radiant, inspiring confidence' },
                  { id: 'evening', label: 'Intimate Dinners & Chilly Evenings', desc: 'Warm spices, golden sweetness, cozy' },
                  { id: 'bold', label: 'High-Impact Statement Nightwear', desc: 'Nocturnal, magnetic, unforgettable presence' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setOccasion(opt.id);
                      setStep(2);
                    }}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      occasion === opt.id
                        ? 'border-[#d4af65] bg-[#1f1e1b]'
                        : 'border-[#2d2a25] bg-[#161513] hover:border-[#4a453c]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-[#8e8677] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 Options */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'oud', label: 'Deep Agarwood & Smoky Rose', desc: 'Aged Cambodian Oud, Damask Rose, Ambergris' },
                  { id: 'floral', label: 'Crisp Jasmine, Pear & White Musk', desc: 'Grasse Jasmine, Dewy Pear, Italian Mandarin' },
                  { id: 'dark', label: 'Roasted Coffee, Black Pepper & Leather', desc: 'Tuscan Leather, Bourbon Vanilla, Espresso' },
                  { id: 'amber', label: 'Golden Amber, Benzoin & Cinnamon', desc: 'Honeyed Resin, Ceylon Cinnamon, Madagascar Vanilla' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setProfile(opt.id);
                      setStep(3);
                    }}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      profile === opt.id
                        ? 'border-[#d4af65] bg-[#1f1e1b]'
                        : 'border-[#2d2a25] bg-[#161513] hover:border-[#4a453c]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-[#8e8677] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 Options */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'commanding', label: 'Commanding & Unmistakable', desc: 'Turns heads across the entire room' },
                  { id: 'magnetic', label: 'Magnetic & Alluring', desc: 'Draws people into your personal orbit' },
                  { id: 'refined', label: 'Refined & Harmonious', desc: 'Polished aura of discreet luxury' },
                  { id: 'curious', label: 'I Love Variety & Experimentation', desc: 'A wardrobe of scents for every mood' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setVibe(opt.id);
                      setStep(4);
                    }}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      vibe === opt.id
                        ? 'border-[#d4af65] bg-[#1f1e1b]'
                        : 'border-[#2d2a25] bg-[#161513] hover:border-[#4a453c]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-[#8e8677] mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#262420] text-xs">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-[#968e7f] hover:text-white cursor-pointer"
                >
                  ← Back to Previous
                </button>
              ) : (
                <span className="text-[#656056]">Step 1 of 3</span>
              )}
              <span className="text-[#a49c8f]">Takes 30 seconds</span>
            </div>
          </div>
        ) : (
          /* Step 4: Result Recommendation */
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#d4af65] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Bespoke Match</span>
              </span>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#9c9384] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div className="bg-[#171614] border border-[#d4af65]/30 p-6 flex flex-col sm:flex-row items-center gap-6 mb-6">
              <img
                src={recommendedPerfume.image}
                alt={recommendedPerfume.name}
                className="w-36 h-36 object-cover bg-black border border-[#2b2823] shrink-0"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] uppercase tracking-widest text-[#a8a192]">
                  {recommendedPerfume.family} · {recommendedPerfume.concentration.split(' ')[0]}
                </span>
                <h4 className="font-display text-3xl text-white mt-1">
                  {recommendedPerfume.name}
                </h4>
                <p className="text-xs text-[#efd9a5] uppercase tracking-wider mb-2">
                  {recommendedPerfume.subtitle}
                </p>
                <p className="text-xs text-[#cbc3b5] leading-relaxed mb-3">
                  {recommendedPerfume.description}
                </p>
                <div className="text-lg font-bold font-mono text-[#d4af65]">
                  Rs. {formatPKR(recommendedPerfume.variants[0].price)} ({recommendedPerfume.variants[0].size})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(
                    recommendedPerfume,
                    recommendedPerfume.variants[0].size,
                    recommendedPerfume.variants[0].price
                  );
                  onClose();
                }}
                className="py-3 px-4 bg-[#d4af65] hover:bg-[#efd9a5] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Scent to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onInstantWhatsApp(
                    recommendedPerfume,
                    recommendedPerfume.variants[0].size,
                    recommendedPerfume.variants[0].price
                  );
                  onClose();
                }}
                className="py-3 px-4 bg-[#1a1917] hover:bg-[#252320] border border-[#38d47b]/50 text-[#38d47b] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
