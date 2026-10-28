import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  fragrance: string;
  rating: number;
  date: string;
  quote: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Hamza Tariq',
    location: 'DHA Phase 5, Lahore',
    fragrance: 'IT Oud (100ml)',
    rating: 5,
    date: 'March 2026',
    quote: 'I wore IT Oud to a wedding at 7 PM and could still clearly smell the warm Cambodian agarwood and amber the next morning on my sherwani. The projection in cool evening air is beastmode without being cloying.',
  },
  {
    name: 'Ayesha Siddiqui',
    location: 'Clifton, Karachi',
    fragrance: 'IT Bloom (50ml)',
    rating: 5,
    date: 'February 2026',
    quote: 'Karachi humidity usually destroys perfumes in 2 hours, but IT Bloom kept a radiant jasmine and pear trail throughout an entire 8-hour workday. WhatsApp ordering was effortless, arrived in 2 days.',
  },
  {
    name: 'Bilal Khan',
    location: 'F-7/2, Islamabad',
    fragrance: 'IT Noir (50ml)',
    rating: 5,
    date: 'January 2026',
    quote: 'The dark roasted espresso and Tuscan leather notes are on par with 40,000 PKR niche designer bottles. The gold packaging and heavy bottle cap feel genuinely luxury. Definitely making this my signature scent.',
  },
  {
    name: 'Dr. Zeeshan Haider',
    location: 'Canal Road, Faisalabad',
    fragrance: 'IT Discovery Wardrobe (4x10ml)',
    rating: 5,
    date: 'March 2026',
    quote: 'The discovery set is the best purchase I made this year. It allowed me and my brother to test all four perfumes on skin before ordering two 100ml flacons of IT Oud and IT Amber Imperial.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#0f0e0d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#d4af65] mb-2">
            <span>Verified Customer Impressions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">
            Worn by Connoisseurs Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-[#9f978a]">
            Over 2,400+ satisfied perfume enthusiasts across Karachi, Lahore, Islamabad, and nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="p-6 bg-[#161513] border border-[#262420] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#d4af65] mb-3">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#d4af65]" />
                  ))}
                </div>

                <p className="text-xs text-[#cdc5b7] leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="border-t border-[#252320] pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <CheckCircle className="w-3 h-3 text-[#38d47b]" />
                    </h4>
                    <p className="text-[11px] text-[#8e877a]">{review.location}</p>
                  </div>
                  <span className="text-[10px] text-[#716a5f] font-mono">{review.date}</span>
                </div>
                <div className="mt-2 text-[10px] text-[#d4af65] uppercase tracking-wider font-medium">
                  {review.fragrance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
