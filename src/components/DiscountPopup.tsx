import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Gift, Percent } from 'lucide-react';

interface DiscountPopupProps {
  viewCount: number;
  wishlistCount: number;
  onClaimPoints: (points: number) => void;
}

export default function DiscountPopup({ viewCount, wishlistCount, onClaimPoints }: DiscountPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [claimed, setClaimed] = useState<'none' | 'coupon' | 'points'>('none');

  useEffect(() => {
    // Trigger popup if the user has viewed 3 items or has 2 items in their wishlist, and hasn't triggered yet
    if (!hasTriggered && (viewCount >= 2 || wishlistCount >= 2)) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasTriggered(true);
      }, 1500); // Small natural delay
      return () => clearTimeout(timer);
    }
  }, [viewCount, wishlistCount, hasTriggered]);

  const handleClaimPoints = () => {
    onClaimPoints(200);
    setClaimed('points');
    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  };

  const handleClaimCoupon = () => {
    setClaimed('coupon');
    // Copy discount code to clipboard
    navigator.clipboard.writeText('STYLE15');
    setTimeout(() => {
      setIsOpen(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="discount-popup-overlay" className="fixed inset-0 z-50 flex items-end justify-start p-6 md:p-10 pointer-events-none">
        <motion.div
          id="discount-popup-card"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-white text-neutral-900 border border-neutral-200 rounded-2xl shadow-2xl p-6 max-w-sm w-full pointer-events-auto relative overflow-hidden ring-4 ring-blue-500/10"
        >
          {/* Subtle blue decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-2xl -mr-6 -mt-6 opacity-60" />

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {claimed === 'none' ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">Personalized Offer</span>
              </div>

              <h3 className="text-lg font-bold font-display tracking-tight leading-snug mb-1">
                We noticed your style taste!
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                You've been browsing some of our premium pants and tees. Choose a tailored reward to jumpstart your wardrobe upgrade:
              </p>

              <div className="space-y-3">
                {/* Reward Option 1: 15% Coupon */}
                <button
                  onClick={handleClaimCoupon}
                  className="w-full flex items-center justify-between p-3 border border-neutral-200 hover:border-black rounded-xl text-left hover:bg-neutral-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-neutral-100 text-neutral-800 rounded-lg group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <Percent className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold">15% Off First Order</h4>
                      <p className="text-[10px] text-neutral-400">Copies coupon code "STYLE15"</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-600 group-hover:translate-x-1 transition-transform">Claim</span>
                </button>

                {/* Reward Option 2: 200 Loyalty Points */}
                <button
                  onClick={handleClaimPoints}
                  className="w-full flex items-center justify-between p-3 border border-neutral-200 hover:border-black rounded-xl text-left hover:bg-neutral-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Gift className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold">200 Loyalty Points</h4>
                      <p className="text-[10px] text-neutral-400">Equivalent to $2.00 off future purchases</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-600 group-hover:translate-x-1 transition-transform">Claim</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <Gift className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">Reward Claimed!</h3>
              {claimed === 'coupon' ? (
                <p className="text-xs text-neutral-500">
                  Code <strong className="text-neutral-900">STYLE15</strong> has been copied to your clipboard and is ready at checkout. Enjoy!
                </p>
              ) : (
                <p className="text-xs text-neutral-500">
                  <strong className="text-emerald-600">+200 Loyalty Points</strong> have been added to your account instantly!
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
