export interface CartItem {
  id: string; // unique item id: `${perfumeId}-${size}`
  perfumeId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  city: string;
  deliveryAddress: string;
  specialNotes: string;
  paymentMethod: 'COD' | 'Bank Transfer / JazzCash / EasyPaisa';
}

export function formatPKR(amount: number): string {
  return amount.toLocaleString('en-PK');
}

export function buildWhatsAppMessage(
  cart: CartItem[],
  customer: CustomerOrderDetails,
  deliveryFee: number
): string {
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = itemsSubtotal + deliveryFee;

  let msg = `*Assalam-o-Alaikum IT Fragrance!*\n`;
  msg += `I would like to place an order from your website (itfragrance.com):\n\n`;
  msg += `*ORDER ITEMS:*\n`;

  cart.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}* (${item.size}) × ${item.quantity} = Rs. ${formatPKR(item.price * item.quantity)}\n`;
  });

  msg += `\n*PAYMENT SUMMARY:*\n`;
  msg += `• Subtotal: Rs. ${formatPKR(itemsSubtotal)}\n`;
  msg += `• Delivery Charges: ${deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${formatPKR(deliveryFee)}`}\n`;
  msg += `• *Total Amount Payable:* Rs. ${formatPKR(grandTotal)}\n`;

  if (customer.fullName.trim() || customer.city.trim() || customer.deliveryAddress.trim()) {
    msg += `\n*CUSTOMER DETAILS:*\n`;
    if (customer.fullName.trim()) msg += `• Name: ${customer.fullName.trim()}\n`;
    if (customer.phone.trim()) msg += `• Phone: ${customer.phone.trim()}\n`;
    if (customer.city.trim()) msg += `• City: ${customer.city.trim()}\n`;
    if (customer.deliveryAddress.trim()) msg += `• Delivery Address: ${customer.deliveryAddress.trim()}\n`;
    msg += `• Payment Preference: ${customer.paymentMethod}\n`;
    if (customer.specialNotes.trim()) msg += `• Special Note: ${customer.specialNotes.trim()}\n`;
  }

  msg += `\nPlease confirm order confirmation and estimated delivery date.\n`;
  msg += `Website: https://itfragrance.com`;

  return msg;
}
