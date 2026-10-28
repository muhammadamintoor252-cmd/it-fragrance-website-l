import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Filter 
} from 'lucide-react';
import { PERFUMES, DISCOVERY_SET, Perfume, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from './data/perfumes';
import { CartItem, formatPKR, buildWhatsAppMessage } from './types/cart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { ScentFinder } from './components/ScentFinder';
import { StorySection } from './components/StorySection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('it_fragrance_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('it_fragrance_cart', JSON.stringify(cart));
    } catch {
      // Ignore localStorage error
    }
  }, [cart]);

  // Modal & Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [selectedPerfumeForModal, setSelectedPerfumeForModal] = useState<Perfume | null>(null);

  // Active filter tab
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart handler
  const handleAddToCart = (perfume: Perfume, size: string, price: number) => {
    const itemId = `${perfume.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          perfumeId: perfume.id,
          name: perfume.name,
          size,
          price,
          quantity: 1,
          image: perfume.image,
        },
      ];
    });

    showToast(`Added ${perfume.name} (${size}) to your cart`);
  };

  // Instant WhatsApp order handler for single item
  const handleInstantWhatsApp = (perfume: Perfume, size: string, price: number) => {
    const singleItem: CartItem = {
      id: `${perfume.id}-${size}`,
      perfumeId: perfume.id,
      name: perfume.name,
      size,
      price,
      quantity: 1,
      image: perfume.image,
    };
    
    // Free shipping if >= 5000, else flat 200
    const deliveryFee = price >= 5000 ? 0 : 200;
    const dummyCustomer = {
      fullName: '',
      phone: '',
      city: '',
      deliveryAddress: '',
      specialNotes: '',
      paymentMethod: 'COD' as const,
    };

    const message = buildWhatsAppMessage([singleItem], dummyCustomer, deliveryFee);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Cart operations
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered perfumes logic
  const filteredPerfumes = PERFUMES.filter((perfume) => {
    const matchesFilter = activeFilter === 'All' || perfume.family === activeFilter;
    const matchesSearch =
      perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perfume.notes.top.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      perfume.notes.heart.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      perfume.notes.base.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f8f5ef] font-sans selection:bg-[#d4af65] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161513] border border-[#d4af65] text-white px-5 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2 h-2 bg-[#d4af65]" />
          <p className="text-xs font-medium tracking-wide">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-xs text-[#d4af65] underline hover:text-[#efd9a5] cursor-pointer ml-2"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFinder={() => setIsFinderOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenFinder={() => setIsFinderOpen(true)} />

        {/* Featured Fragrance Collection */}
        <section id="collection" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#d4af65] mb-2">
              <span>Haute Parfumerie Collection</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
              Find Your Signature
            </h2>
            <p className="text-xs sm:text-sm text-[#a8a192] max-w-lg mx-auto">
              Explore artisanal Extrait de Parfum compounds created for maximum longevity and an unmistakable olfactory aura.
            </p>
          </div>

          {/* Interactive Filter Tabs and Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#24221e]">
            {/* Filter Tabs (Functional segmented buttons per rule 1.A) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141311] border border-[#2b2823] w-full md:w-auto">
              {['All', 'Oud & Woody', 'Floral & Fresh', 'Dark & Smoky', 'Amber & Warm'].map((family) => {
                const isActive = activeFilter === family;
                return (
                  <button
                    key={family}
                    type="button"
                    onClick={() => setActiveFilter(family)}
                    className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#d4af65] text-black font-semibold shadow-sm'
                        : 'text-[#aaa192] hover:text-white'
                    }`}
                  >
                    {family}
                  </button>
                );
              })}
            </div>

            {/* Quick Scent Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search notes (e.g. Oud, Jasmine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141311] border border-[#2b2823] text-white placeholder-[#787165] text-xs px-3.5 py-2 pl-9 focus:outline-none focus:border-[#d4af65] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#787165] absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#787165] hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Product Grid: 4 perfumes */}
          {filteredPerfumes.length === 0 ? (
            <div className="text-center py-16 bg-[#141311] border border-[#262420]">
              <p className="font-display text-2xl text-[#d4af65] mb-2">No Fragrances Found</p>
              <p className="text-xs text-[#8e8779] mb-4">No scents matched "{searchQuery}". Try searching for Oud, Rose, or Jasmine.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#d4af65] text-black text-xs font-semibold uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {filteredPerfumes.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedPerfumeForModal}
                  onInstantWhatsApp={handleInstantWhatsApp}
                />
              ))}
            </div>
          )}

          {/* Discovery Wardrobe Spotlight Box */}
          <div className="relative overflow-hidden bg-[#161513] border border-[#d4af65]/40 p-6 sm:p-10 my-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 relative">
                <img
                  src={DISCOVERY_SET.image}
                  alt="IT Fragrance Discovery Coffret"
                  className="w-full aspect-[4/3] object-cover bg-black border border-[#2a2824]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#d4af65] text-black text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider">
                  Wardrobe Coffret
                </span>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af65] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Risk-Free Olfactory Exploration</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-white">
                  IT Discovery Wardrobe (4 × 10ml)
                </h3>

                <p className="text-xs sm:text-sm text-[#cbc3b5] leading-relaxed font-light">
                  Experience all four signature creations: <strong>IT Oud</strong>, <strong>IT Bloom</strong>, <strong>IT Noir</strong>, and <strong>IT Amber Imperial</strong>. Each coffret contains four 10ml pocket glass atomizers (over 600 total sprays) to let you test each blend on your skin before committing to a full 100ml bottle.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#d4af65] pt-1">
                  <span>• IT Oud</span>
                  <span>• IT Bloom</span>
                  <span>• IT Noir</span>
                  <span>• IT Amber Imperial</span>
                  <span className="text-[#38d47b] font-medium">• Includes Rs. 1,000 Next-Bottle Voucher</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#262420]">
                  <div>
                    <span className="text-[11px] text-[#8e8679] uppercase block tracking-wider">Complete Coffret</span>
                    <span className="text-2xl font-bold font-mono text-[#d4af65] tabular-nums">
                      Rs. {formatPKR(DISCOVERY_SET.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(DISCOVERY_SET, '4x10ml Set', DISCOVERY_SET.price)}
                      className="px-5 py-3 bg-[#d4af65] hover:bg-[#efd9a5] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Discovery Set</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInstantWhatsApp(DISCOVERY_SET, '4x10ml Set', DISCOVERY_SET.price)}
                      className="px-5 py-3 bg-[#1d1c19] hover:bg-[#252320] border border-[#38d47b]/40 text-[#38d47b] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <StorySection />

        {/* Customer Testimonials & Reviews */}
        <Testimonials />

        {/* Direct WhatsApp Concierge CTA Strip */}
        <section className="bg-gradient-to-r from-[#171614] via-[#1f1e1a] to-[#171614] border-t border-[#2c2924] py-14 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] mx-auto mb-4">
              <MessageCircle className="w-6 h-6 fill-[#25D366]" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-white mb-2">
              Need Scent Guidance or Custom Orders?
            </h3>
            <p className="text-xs sm:text-sm text-[#cbc3b5] leading-relaxed mb-6 font-light">
              Chat directly with our perfumer on WhatsApp. We provide personalized fragrance recommendations, corporate gifts, wedding favors, and fast order tracking across Pakistan.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum IT Fragrance! I would like personal guidance selecting my signature perfume.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Customer Support">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Assalam-o-Alaikum IT Fragrance! I am browsing your site and have a question.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-30 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs tracking-wider uppercase shadow-2xl transition-transform hover:scale-105"
          title="Direct WhatsApp Helpline"
          aria-label="Direct WhatsApp Helpline"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </aside>

      {/* Modals & Slide-over Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductDetailModal
        perfume={selectedPerfumeForModal}
        onClose={() => setSelectedPerfumeForModal(null)}
        onAddToCart={handleAddToCart}
        onInstantWhatsApp={handleInstantWhatsApp}
      />

      <ScentFinder
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onAddToCart={handleAddToCart}
        onInstantWhatsApp={handleInstantWhatsApp}
      />
    </div>
  );
}
