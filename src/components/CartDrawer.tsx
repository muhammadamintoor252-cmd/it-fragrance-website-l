import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, CustomerOrderDetails, formatPKR, buildWhatsAppMessage } from '../types/cart';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/perfumes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customer, setCustomer] = useState<CustomerOrderDetails>({
    fullName: '',
    phone: '',
    city: 'Lahore',
    deliveryAddress: '',
    specialNotes: '',
    paymentMethod: 'COD',
  });

  const [copied, setCopied] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const itemsSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Free delivery threshold: Rs. 5,000, else Rs. 200 standard courier shipping
  const isFreeDelivery = itemsSubtotal >= 5000 || itemsSubtotal === 0;
  const deliveryFee = itemsSubtotal === 0 ? 0 : isFreeDelivery ? 0 : 200;
  const grandTotal = itemsSubtotal + deliveryFee;

  const orderMessage = buildWhatsAppMessage(cart, customer, deliveryFee);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;
    setOrderSent(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#121110] border-l border-[#2e2b26] text-white flex flex-col h-full shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#282622] flex items-center justify-between bg-[#161513]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d4af65]" />
            <h2 className="font-display text-2xl text-white">Your Shopping Cart</h2>
            <span className="text-xs font-mono text-[#d4af65] font-semibold bg-[#262420] px-2 py-0.5">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#9b9487] hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#191815] px-6 py-2.5 border-b border-[#262420] text-xs">
          {itemsSubtotal >= 5000 ? (
            <p className="text-[#38d47b] flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Congratulations! You have unlocked <strong>FREE Nationwide Delivery</strong>.</span>
            </p>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-[#a1998b] text-[11px]">
                <span>Add Rs. {formatPKR(5000 - itemsSubtotal)} more for Free Shipping</span>
                <span className="font-mono">{Math.round((itemsSubtotal / 5000) * 100)}%</span>
              </div>
              <div className="w-full bg-[#272522] h-1.5 overflow-hidden">
                <div 
                  className="bg-[#d4af65] h-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (itemsSubtotal / 5000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-[#444039] mx-auto mb-3" />
              <p className="font-display text-2xl text-[#d4af65] mb-2">Your cart is empty</p>
              <p className="text-xs text-[#9a9385] max-w-xs mx-auto mb-6">
                Discover our artisanal perfumes and add your signature scent to order directly via WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 bg-[#d4af65] hover:bg-[#efd9a5] text-black font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3.5 divide-y divide-[#24221e]">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3.5 first:pt-0 flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-[#1c1b18] border border-[#2d2a25] shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-lg text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-[#a49d90] uppercase tracking-wider mb-2">
                        Size: <span className="text-[#efd9a5]">{item.size}</span>
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#33302b] bg-[#1a1917]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-[#9b9487] hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-[#9b9487] hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-mono font-semibold text-[#d4af65] tabular-nums">
                          Rs. {formatPKR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-[#857d70] hover:text-[#e05252] transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form for Pre-filled WhatsApp Order */}
              <div className="bg-[#171614] border border-[#2b2823] p-4 text-xs">
                <div className="flex items-center justify-between mb-3 border-b border-[#282622] pb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#d4af65] text-[11px]">
                    Delivery Details (Optional)
                  </span>
                  <span className="text-[10px] text-[#8e8678]">
                    Pre-fills your WhatsApp order
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[#a49c8f] text-[11px] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Amin"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full bg-[#11100f] border border-[#302d27] px-3 py-1.5 text-white placeholder-[#58534b] text-xs focus:outline-none focus:border-[#d4af65]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#a49c8f] text-[11px] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="0312-XXXXXXX"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full bg-[#11100f] border border-[#302d27] px-3 py-1.5 text-white placeholder-[#58534b] text-xs focus:outline-none focus:border-[#d4af65]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#a49c8f] text-[11px] mb-1">City</label>
                      <select
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full bg-[#11100f] border border-[#302d27] px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#d4af65]"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Sialkot">Sialkot</option>
                        <option value="Gujranwala">Gujranwala</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#a49c8f] text-[11px] mb-1">Complete Delivery Address</label>
                    <textarea
                      rows={2}
                      placeholder="House/Plot #, Street, Block, Area, City"
                      value={customer.deliveryAddress}
                      onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                      className="w-full bg-[#11100f] border border-[#302d27] px-3 py-1.5 text-white placeholder-[#58534b] text-xs focus:outline-none focus:border-[#d4af65]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#a49c8f]">Payment Preference:</span>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1 cursor-pointer text-white">
                        <input
                          type="radio"
                          name="payment"
                          checked={customer.paymentMethod === 'COD'}
                          onChange={() => setCustomer({ ...customer, paymentMethod: 'COD' })}
                          className="accent-[#d4af65]"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Sticky Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#161513] border-t border-[#2a2824] space-y-3.5">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#aaa294]">
                <span>Items Subtotal:</span>
                <span className="font-mono tabular-nums text-white">Rs. {formatPKR(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#aaa294]">
                <span>Delivery Charges:</span>
                <span className="font-mono tabular-nums text-white">
                  {deliveryFee === 0 ? (
                    <span className="text-[#38d47b] font-semibold">FREE</span>
                  ) : (
                    `Rs. ${formatPKR(deliveryFee)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-[#262420] text-white">
                <span className="font-display text-lg">Total Amount:</span>
                <span className="font-mono text-lg text-[#d4af65] tabular-nums">
                  Rs. {formatPKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order on WhatsApp (0312-8700031)</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#938a7c] pt-1">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1.5 hover:text-[#d4af65] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#38d47b]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Order Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="hover:text-[#e05252] transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#736c61]">
              You will chat directly with the IT Fragrance sales desk on WhatsApp to confirm delivery details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
