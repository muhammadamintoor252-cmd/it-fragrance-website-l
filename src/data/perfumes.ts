export interface FragranceNote {
  top: string[];
  heart: string[];
  base: string[];
}

export interface BottleVariant {
  size: string;
  price: number;
  label: string;
}

export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number; // default price for base size
  image: string;
  badge?: string;
  family: 'Oud & Woody' | 'Floral & Fresh' | 'Dark & Smoky' | 'Amber & Warm' | 'Discovery Set';
  concentration: string;
  longevity: string; // e.g. "12+ Hours"
  sillage: 'Intimate' | 'Moderate' | 'Enchanting & Strong' | 'Beastmode' | 'Curated Palette';
  season: string;
  notes: FragranceNote;
  character: string[];
  variants: BottleVariant[];
}

export const PERFUMES: Perfume[] = [
  {
    id: 'it-oud',
    name: 'IT Oud',
    subtitle: 'Rich · Warm · Sophisticated',
    description: 'An imposing and regal blend of aged Cambodian agarwood, royal damask rose, and velvety ambergris. Designed to leave a stately trail of aristocracy in formal gatherings and evening occasions.',
    price: 3500,
    image: '/images/perfume_it_oud.jpg',
    badge: 'Bestseller',
    family: 'Oud & Woody',
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    longevity: '14+ Hours on Skin · 36h on Fabric',
    sillage: 'Beastmode',
    season: 'Autumn / Winter & Air-Conditioned Evenings',
    notes: {
      top: ['Cardamom', 'Smoked Bergamot', 'Rosewood'],
      heart: ['Royal Damascena Rose', 'Aged Cambodian Agarwood', 'Cashmeran'],
      base: ['Smoked Sandalwood', 'Black Amber', 'Tonka Bean', 'Leather']
    },
    character: ['Majestic', 'Warm Spicy', 'Authoritative', 'Sensual'],
    variants: [
      { size: '50ml', price: 3500, label: '50ml Eau de Parfum' },
      { size: '100ml', price: 5900, label: '100ml Luxury Flacon (Save 15%)' },
      { size: '10ml', price: 950, label: '10ml Travel Pocket Spray' }
    ]
  },
  {
    id: 'it-bloom',
    name: 'IT Bloom',
    subtitle: 'Floral · Fresh · Elegant',
    description: 'A luminous, sun-kissed celebration of white petals, crystalline dewdrops, and soft white musk. Crisp, romantic, and effortlessly charming for daily elegance.',
    price: 2800,
    image: '/images/perfume_it_bloom.jpg',
    badge: 'Trending',
    family: 'Floral & Fresh',
    concentration: 'Eau de Parfum Intense (24% Oil Concentration)',
    longevity: '10+ Hours',
    sillage: 'Enchanting & Strong',
    season: 'Spring / Summer & Daytime Confidence',
    notes: {
      top: ['Dewy Pear', 'Italian Mandarin', 'Pink Pepper'],
      heart: ['Grasse Jasmine', 'Peony Blossom', 'White Lily'],
      base: ['Soft White Musk', 'Virginia Cedarwood', 'Clear Amber']
    },
    character: ['Radiant', 'Crisp Floral', 'Romantic', 'Uplifting'],
    variants: [
      { size: '50ml', price: 2800, label: '50ml Eau de Parfum' },
      { size: '100ml', price: 4700, label: '100ml Luxury Flacon (Save 16%)' },
      { size: '10ml', price: 850, label: '10ml Travel Pocket Spray' }
    ]
  },
  {
    id: 'it-noir',
    name: 'IT Noir',
    subtitle: 'Bold · Deep · Mysterious',
    description: 'A nocturnal symphony of crushed black peppercorn, dark roasted coffee, bourbon vanilla, and rebellious Tuscan leather. A charismatic statement of fearless modern presence.',
    price: 3200,
    image: '/images/perfume_it_noir.jpg',
    badge: 'Signature',
    family: 'Dark & Smoky',
    concentration: 'Extrait de Parfum (28% Oil Concentration)',
    longevity: '12+ Hours',
    sillage: 'Enchanting & Strong',
    season: 'All-Year Nightwear & High-Profile Events',
    notes: {
      top: ['Black Pepper', 'Sicilian Lemon', 'Nutmeg'],
      heart: ['Dark Roasted Espresso', 'Bourbon Vanilla Bean', 'Clary Sage'],
      base: ['Tuscan Leather', 'Smoky Patchouli', 'Haitian Vetiver', 'Incense']
    },
    character: ['Magnetic', 'Nocturnal', 'Smoky Gourmand', 'Intrepid'],
    variants: [
      { size: '50ml', price: 3200, label: '50ml Eau de Parfum' },
      { size: '100ml', price: 5400, label: '100ml Luxury Flacon (Save 15%)' },
      { size: '10ml', price: 900, label: '10ml Travel Pocket Spray' }
    ]
  },
  {
    id: 'it-amber',
    name: 'IT Amber Imperial',
    subtitle: 'Warm · Honeyed · Enigmatic',
    description: 'A captivating journey into liquid gold. Golden frankincense, Madagascar vanilla, sun-drenched benzoin, and toasted cinnamon wrap you in an opulent cocoon of warmth.',
    price: 3400,
    image: '/images/perfume_it_amber.jpg',
    badge: 'New Release',
    family: 'Amber & Warm',
    concentration: 'Extrait de Parfum (28% Oil Concentration)',
    longevity: '14+ Hours',
    sillage: 'Enchanting & Strong',
    season: 'Cool Evenings & Festive Celebrations',
    notes: {
      top: ['Ceylon Cinnamon', 'Bitter Orange Peel', 'Cardamom'],
      heart: ['Honeyed Amber', 'Benzoin Resin', 'Smoked Myrrh'],
      base: ['Madagascar Vanilla', 'Roasted Tonka', 'Cedar', 'Musk']
    },
    character: ['Opulent', 'Comforting', 'Sweet Spicy', 'Royal'],
    variants: [
      { size: '50ml', price: 3400, label: '50ml Eau de Parfum' },
      { size: '100ml', price: 5700, label: '100ml Luxury Flacon (Save 16%)' },
      { size: '10ml', price: 920, label: '10ml Travel Pocket Spray' }
    ]
  }
];

export const DISCOVERY_SET: Perfume = {
  id: 'it-discovery-set',
  name: 'IT Discovery Wardrobe (4 × 10ml)',
  subtitle: 'Experience All 4 Signature Scents',
  description: 'Unsure which scent is your true identity? Sample our complete artisanal line: IT Oud, IT Bloom, IT Noir, and IT Amber Imperial in luxury pocket glass sprays with a complimentary Rs. 1,000 voucher toward your first full bottle.',
  price: 2450,
  image: '/images/hero_it_fragrance.jpg',
  badge: 'Value Discovery',
  family: 'Discovery Set',
  concentration: 'Extrait & EDP Concentrations',
  longevity: 'Full-day performance across all 4',
  sillage: 'Curated Palette',
  season: 'Ideal for gifting & discovering',
  notes: {
    top: ['All 4 Fragrance Openings'],
    heart: ['Floral, Smoked Wood, Roasted Coffee & Honeyed Amber'],
    base: ['Royal Cambodian Agarwood, Leather, Vanilla & Musk']
  },
  character: ['Versatile', 'Complete Wardrobe', 'Risk-Free Trial', 'Gift Ready'],
  variants: [
    { size: '4x10ml Set', price: 2450, label: '4 × 10ml Sampler Coffret' }
  ]
};

export const WHATSAPP_NUMBER = "923128700031"; // Official IT Fragrance WhatsApp
export const WHATSAPP_DISPLAY = "+92 312 8700031";
