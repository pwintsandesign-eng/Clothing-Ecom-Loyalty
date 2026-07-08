import React, { useState } from 'react';
import { CartItem, UserProfile, AffiliatePartner, ReferredSale, Order, Product } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CreditCard, Gift, Percent, Truck, CheckCircle, AlertTriangle } from 'lucide-react';

interface CartDrawerProps {
  cart: CartItem[];
  user: UserProfile;
  partners: AffiliatePartner[];
  products: Product[];
  onUpdateCart: (cart: CartItem[]) => void;
  onUpdateUser: (user: UserProfile) => void;
  onUpdateProducts: (products: Product[]) => void;
  onAddOrder: (order: Order) => void;
  onAddReferredSale: (sale: ReferredSale) => void;
  onUpdatePartners: (partners: AffiliatePartner[]) => void;
  onClose: () => void;
  initialRefCode?: string;
  isLoggedIn?: boolean;
  onSignInClick?: () => void;
}

export default function CartDrawer({
  cart,
  user,
  partners,
  products,
  onUpdateCart,
  onUpdateUser,
  onUpdateProducts,
  onAddOrder,
  onAddReferredSale,
  onUpdatePartners,
  onClose,
  initialRefCode = '',
  isLoggedIn = false,
  onSignInClick
}: CartDrawerProps) {
  // Checkout flow step: 'cart' | 'checkout' | 'success'
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Input states
  const [affiliateCode, setAffiliateCode] = useState(initialRefCode);
  const [redeemPoints, setRedeemPoints] = useState(false);

  // Shipping Form States
  const [shipName, setShipName] = useState(user.name);
  const [shipEmail, setShipEmail] = useState(user.email);
  const [shipAddress, setShipAddress] = useState(user.shippingAddress || '');
  const [shipCity, setShipCity] = useState(user.shippingCity || '');
  const [shipZip, setShipZip] = useState(user.shippingZip || '');

  // Payment States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Generated Order Receipt State
  const [receipt, setReceipt] = useState<Order | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // 1. Calculate base subtotal
  const baseSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // 2. Identify active bundles & calculate bundle discounts
  const hasTee = cart.some(item => item.product.category === 'T-Shirts');
  const hasPants = cart.some(item => item.product.category === 'Pants');
  const totalTeeQty = cart.filter(item => item.product.category === 'T-Shirts').reduce((sum, item) => sum + item.quantity, 0);

  let mixMatchDiscount = 0;
  let tShirtTrioDiscount = 0;
  const appliedBundles: { name: string; saving: number }[] = [];

  // Mix & Match Pack: Buy 1 Tee + 1 Pants and get 20% off those matching pairs
  if (hasTee && hasPants) {
    // Discount 20% on the cheapest matching pairs
    const tees = cart.filter(i => i.product.category === 'T-Shirts').flatMap(i => Array(i.quantity).fill(i.product.price));
    const pantsList = cart.filter(i => i.product.category === 'Pants').flatMap(i => Array(i.quantity).fill(i.product.price));
    
    // Number of pairs is the minimum of tees and pants count
    const pairsCount = Math.min(tees.length, pantsList.length);
    tees.sort((a, b) => a - b);
    pantsList.sort((a, b) => a - b);

    let pairedValue = 0;
    for (let i = 0; i < pairsCount; i++) {
      pairedValue += tees[i] + pantsList[i];
    }
    mixMatchDiscount = pairedValue * 0.20;
    if (mixMatchDiscount > 0) {
      appliedBundles.push({ name: 'Mix & Match 20% Style Discount', saving: mixMatchDiscount });
    }
  }

  // T-Shirt Trio: Buy 3 or more T-shirts total, get $15 off
  if (totalTeeQty >= 3) {
    tShirtTrioDiscount = 15.00;
    appliedBundles.push({ name: '3-Pack T-Shirt Bundle Deal', saving: tShirtTrioDiscount });
  }

  const bundleDiscount = mixMatchDiscount + tShirtTrioDiscount;

  // 3. User Membership Tier automatic discounts (Silver 5%, Gold 10%, Platinum 15%)
  const getTierDiscountRate = (tier: string) => {
    switch (tier) {
      case 'Silver': return 0.05;
      case 'Gold': return 0.10;
      case 'Platinum': return 0.15;
      default: return 0.00;
    }
  };
  const tierDiscountRate = isLoggedIn ? getTierDiscountRate(user.tier) : 0.00;
  const tierDiscount = (baseSubtotal - bundleDiscount) * tierDiscountRate;

  // 4. Loyalty points redemption discount
  // 100 points = $1 cash discount. Cannot exceed the price of the order!
  const maxPointsAvailableToRedeem = isLoggedIn ? user.loyaltyPoints : 0;
  const pointCashValue = maxPointsAvailableToRedeem / 100;
  const currentTotalBeforePoints = Math.max(0, baseSubtotal - bundleDiscount - tierDiscount);
  const pointsRedeemedValue = (isLoggedIn && redeemPoints) ? Math.min(pointCashValue, currentTotalBeforePoints) : 0;
  const actualPointsToDebit = pointsRedeemedValue * 100;

  // Total discounts
  const totalDiscount = bundleDiscount + tierDiscount + pointsRedeemedValue;

  // 5. Shipping logic (Free if user is premium subscriber, or subtotal >= $100, or Platinum tier)
  const isShippingFree = (isLoggedIn && (user.isPremium || user.tier === 'Platinum')) || (baseSubtotal - bundleDiscount) >= 100;
  const shippingCost = isShippingFree ? 0.00 : 5.00;

  // Grand Total
  const grandTotal = Math.max(0, baseSubtotal - totalDiscount + shippingCost);

  // Validate applied affiliate code
  const activePartner = partners.find(p => p.code.toUpperCase() === affiliateCode.trim().toUpperCase());
  const isAffiliateValid = !!activePartner;

  // Handle Cart item updates
  const handleQtyChange = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      onUpdateCart(cart.filter(item => item.id !== itemId));
    } else {
      onUpdateCart(cart.map(item => {
        if (item.id === itemId) {
          // Clamp quantity to product stock
          const clamped = Math.min(item.product.stock, newQty);
          return { ...item, quantity: clamped };
        }
        return item;
      }));
    }
  };

  const handleRemove = (itemId: string) => {
    onUpdateCart(cart.filter(item => item.id !== itemId));
  };

  // Perform Simulated Payment and Record Order
  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setCheckoutError(null);
    if (!shipName || !shipEmail || !shipAddress || !shipCity || !shipZip) {
      setCheckoutError('Please fill out all shipping fields.');
      return;
    }
    if (cardNumber.replace(/\s+/g, '').length !== 16) {
      setCheckoutError('Please provide a valid 16-digit credit card number.');
      return;
    }

    // 1. Generate Order ID
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Calculate Loyalty points earned on this purchase
    // Base tier points: 10 points per dollar spent on the actual final subtotal before shipping
    const spendBeforeShipping = Math.max(0, baseSubtotal - totalDiscount);
    let pointsMultiplier = 1.0;
    if (user.tier === 'Silver') pointsMultiplier = 1.2;
    if (user.tier === 'Gold') pointsMultiplier = 1.5;
    if (user.tier === 'Platinum') pointsMultiplier = 2.0;
    if (user.isPremium) pointsMultiplier = 2.0; // Premium members double points too!

    const earnedPoints = Math.round(spendBeforeShipping * 10 * pointsMultiplier);

    // 3. Decrement Inventory in central products store
    const updatedProducts = products.map(prod => {
      const cartMatch = cart.find(item => item.product.id === prod.id);
      if (cartMatch) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartMatch.quantity)
        };
      }
      return prod;
    });

    // 4. Update User spending, loyalty point balance and evaluate new VIP Membership level
    const newTotalSpending = user.totalSpending + spendBeforeShipping;
    
    let newTier: typeof user.tier = 'Bronze';
    if (newTotalSpending > 600) {
      newTier = 'Platinum';
    } else if (newTotalSpending > 300) {
      newTier = 'Gold';
    } else if (newTotalSpending > 100) {
      newTier = 'Silver';
    }

    const newPointsBalance = Math.max(0, user.loyaltyPoints - actualPointsToDebit + earnedPoints);

    const updatedUser: UserProfile = {
      ...user,
      totalSpending: newTotalSpending,
      tier: newTier,
      loyaltyPoints: newPointsBalance
    };

    // 5. If Affiliate Partner code is applied, update affiliate click rewards & commissions
    if (isAffiliateValid && activePartner) {
      // 10% cash commission on the order value
      const partnerCommission = spendBeforeShipping * 0.10;

      const updatedPartners = partners.map(p => {
        if (p.id === activePartner.id) {
          return {
            ...p,
            salesCount: p.salesCount + 1,
            totalSalesAmount: p.totalSalesAmount + spendBeforeShipping,
            commissionEarned: p.commissionEarned + partnerCommission,
            balance: p.balance + partnerCommission
          };
        }
        return p;
      });

      const newSale: ReferredSale = {
        id: `ref-${Date.now()}`,
        orderId,
        partnerCode: activePartner.code,
        amount: spendBeforeShipping,
        commission: partnerCommission,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };

      onUpdatePartners(updatedPartners);
      onAddReferredSale(newSale);
    }

    const newOrder: Order = {
      id: orderId,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        size: item.size,
        fit: item.fit,
        color: item.color,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal: baseSubtotal,
      discount: totalDiscount,
      shipping: shippingCost,
      total: grandTotal,
      date: new Date().toISOString().split('T')[0],
      pointsEarned: earnedPoints,
      pointsRedeemed: Math.round(actualPointsToDebit),
      affiliateCode: isAffiliateValid ? activePartner?.code : undefined,
      customerEmail: shipEmail,
      shippingAddress: `${shipAddress}, ${shipCity} ${shipZip}`,
      status: 'Processing'
    };

    // Save states
    onUpdateProducts(updatedProducts);
    onUpdateUser(updatedUser);
    onAddOrder(newOrder);
    setReceipt(newOrder);

    // Empty active shopping cart
    onUpdateCart([]);
    setStep('success');
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs">
      <div id="cart-drawer-panel" className="bg-white max-w-md w-full h-full shadow-2xl flex flex-col justify-between overflow-hidden relative border-l border-neutral-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h2 className="text-base font-bold font-display tracking-tight text-neutral-900">
              {step === 'cart' ? 'Shopping Wardrobe' : step === 'checkout' ? 'Simulated Secure Checkout' : 'Order Receipt'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'cart' ? (
          /* ================= STEP 1: CART LIST & OPTIMIZATION ================= */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-400">
                <ShoppingBag className="w-12 h-12 text-neutral-200 mb-3 animate-pulse" />
                <h3 className="text-sm font-bold text-neutral-600 mb-1">Your wardrobe is empty</h3>
                <p className="text-xs text-neutral-400 max-w-[240px]">Browse our premium t-shirts and pants to craft your custom styling looks.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Active Items */}
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover rounded-xl border border-neutral-200"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-neutral-950 font-display line-clamp-1">{item.product.name}</h4>
                          <p className="text-[10px] text-neutral-400 font-medium">
                            Size: {item.size} • Fit: {item.fit} • Color: {item.color}
                          </p>
                        </div>
                        <div className="flex justify-between items-baseline mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-neutral-200 bg-white rounded-lg overflow-hidden h-7">
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                              className="px-2 text-xs font-bold text-neutral-400 hover:text-black transition-colors"
                            >
                              -
                            </button>
                            <span className="text-[11px] font-mono font-bold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="px-2 text-xs font-bold text-neutral-400 hover:text-black transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-neutral-950">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bundle pricing notification box */}
                <div className="p-3.5 bg-neutral-900 text-white rounded-2xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                    <Gift className="w-3 h-3 fill-current" /> Active Multi-Buy Promos
                  </h4>
                  <ul className="text-[10px] space-y-1 text-neutral-300">
                    <li className="flex justify-between">
                      <span>• Mix & Match (1 Tee + 1 Pants)</span>
                      <span className="text-blue-400 font-bold">Save 20%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• T-Shirt Trio (Any 3 T-Shirts)</span>
                      <span className="text-blue-400 font-bold">Save $15.00</span>
                    </li>
                  </ul>
                </div>

                {/* Promotional / Affiliate Entry Code */}
                <div className="p-3.5 border border-neutral-200 rounded-xl space-y-2">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase">Affiliate / Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SARAHSTYLE"
                      value={affiliateCode}
                      onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
                      className="flex-1 text-xs p-2 border border-neutral-200 rounded-lg focus:border-black focus:outline-none font-mono"
                    />
                    <div className="flex items-center">
                      {isAffiliateValid ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Valid</span>
                      ) : affiliateCode ? (
                        <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-md">Inactive</span>
                      ) : null}
                    </div>
                  </div>
                  {isAffiliateValid && (
                    <p className="text-[9px] text-emerald-600 font-semibold">
                      ✓ Affiliate partner linked: 10% commission of purchase price will be rewarded.
                    </p>
                  )}
                </div>

                {/* Loyalty Point Redemption Option */}
                {isLoggedIn && user.loyaltyPoints > 0 ? (
                  <div className="p-3.5 border border-blue-200 bg-blue-50/20 rounded-xl flex items-center justify-between">
                    <div className="flex gap-2 items-start">
                      <Gift className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-800">Redeem loyalty points</h4>
                        <p className="text-[10px] text-neutral-500">
                          Use {user.loyaltyPoints} points to save up to ${(user.loyaltyPoints / 100).toFixed(2)} on this order
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={redeemPoints}
                      onChange={(e) => setRedeemPoints(e.target.checked)}
                      className="w-4.5 h-4.5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>
                ) : !isLoggedIn ? (
                  <div className="p-3.5 border border-purple-100 bg-purple-50/30 rounded-xl space-y-2.5">
                    <div className="flex gap-2 items-start">
                      <Gift className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-800">Unlock VIP Tier Discounts</h4>
                        <p className="text-[10px] text-neutral-500 leading-normal font-sans">
                          Authorize your RESTYLE account to claim tier-based price reductions, redeem loyalty points, and build purchase credit.
                        </p>
                      </div>
                    </div>
                    {onSignInClick && (
                      <button
                        type="button"
                        onClick={onSignInClick}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                      >
                        Sign In / Register Account
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {/* Calculations and Next action */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-100 bg-neutral-50 space-y-3">
                <div className="text-xs space-y-1.5 text-neutral-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono">${baseSubtotal.toFixed(2)}</span>
                  </div>

                  {/* Bundles discount row */}
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Multi-Buy Savings</span>
                      <span className="font-mono">-${bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Tier status discount row */}
                  {tierDiscount > 0 && (
                    <div className="flex justify-between text-blue-600 font-semibold">
                      <span>VIP {user.tier} Discount ({ (tierDiscountRate * 100).toFixed(0) }%)</span>
                      <span className="font-mono">-${tierDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Points discount row */}
                  {pointsRedeemedValue > 0 && (
                    <div className="flex justify-between text-indigo-600 font-semibold">
                      <span>Points Redeemed (-{Math.round(actualPointsToDebit)} pts)</span>
                      <span className="font-mono">-${pointsRedeemedValue.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Shipping costs row */}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono flex items-center gap-1">
                      {isShippingFree ? (
                        <span className="text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 px-1 py-0.5 rounded flex items-center">
                          <Truck className="w-3 h-3 mr-0.5 inline" /> Free VIP
                        </span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200">
                  <span className="text-sm font-bold text-neutral-900 font-display">Grand Total</span>
                  <span className="text-lg font-mono font-bold text-neutral-900">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setStep('checkout')}
                  className="w-full h-11 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : step === 'checkout' ? (
          /* ================= STEP 2: SHIPPING & PAYMENT FORM ================= */
          <form onSubmit={handleProcessCheckout} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Shipping section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-1">1. Shipping Address</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shipEmail}
                      onChange={(e) => setShipEmail(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="128 Fashion Boulevard"
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">City</label>
                    <input
                      type="text"
                      required
                      placeholder="New York"
                      value={shipCity}
                      onChange={(e) => setShipCity(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Postal Zip Code</label>
                    <input
                      type="text"
                      required
                      placeholder="10001"
                      value={shipZip}
                      onChange={(e) => setShipZip(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Secure Payment section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">2. Secure Payment Gate</h3>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> SSL Secured
                  </span>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Credit Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        // Strip whitespace and format
                        const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                        const parts = [];
                        for (let i = 0; i < v.length; i += 4) {
                          parts.push(v.substring(i, i + 4));
                        }
                        setCardNumber(parts.join(' ').substring(0, 19));
                      }}
                      className="w-full text-xs p-2.5 pl-9 border border-neutral-200 rounded-lg focus:border-black focus:outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length >= 2) {
                          setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
                        } else {
                          setCardExpiry(val);
                        }
                      }}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-neutral-500 uppercase mb-0.5">Secure CVC Code</label>
                    <input
                      type="password"
                      required
                      placeholder="***"
                      maxLength={3}
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg focus:border-black focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {checkoutError && (
              <div className="mx-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-fade-in">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {checkoutError}
              </div>
            )}

            {/* Price review and checkout action */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50 space-y-3">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-neutral-600">Total Purchase Amount</span>
                <span className="text-base font-mono font-bold text-neutral-950">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-2.5 border border-neutral-200 hover:bg-white rounded-xl text-xs font-bold text-neutral-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Authorized Checkout
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* ================= STEP 3: TRANSACTION SUCCESS & RECEIPT ================= */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
              <div>
                <h3 className="text-lg font-bold font-display text-neutral-900">Purchase Confirmed!</h3>
                <p className="text-xs text-neutral-500">Your secure transaction cleared successfully. Shipping is being arranged.</p>
              </div>

              {/* Receipt Summary Card */}
              {receipt && (
                <div className="w-full p-4 border border-neutral-200 rounded-2xl bg-neutral-50/50 space-y-3 text-left">
                  <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Receipt</span>
                    <span className="text-[11px] font-mono font-bold text-neutral-800">{receipt.id}</span>
                  </div>

                  <div className="space-y-1">
                    {receipt.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-neutral-600">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-neutral-200 pt-2 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-neutral-500">
                      <span>Order Subtotal</span>
                      <span className="font-mono">${receipt.subtotal.toFixed(2)}</span>
                    </div>
                    {receipt.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discounts Applied</span>
                        <span className="font-mono">-${receipt.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-500">
                      <span>Shipping Fee</span>
                      <span className="font-mono">${receipt.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-neutral-950 text-xs border-t border-neutral-200 pt-1.5">
                      <span>Charged Amount</span>
                      <span className="font-mono">${receipt.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Loyalty Points Gained Display */}
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-blue-800">
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-blue-600" />
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider">Loyalty Rewards</h4>
                        <p className="text-[9px] text-blue-600">Credit added to point balance</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold">+{receipt.pointsEarned} Points</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-neutral-100 bg-neutral-50">
              <button
                onClick={() => {
                  setStep('cart');
                  setRedeemPoints(false);
                  onClose();
                }}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Return to Shop Catalog
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
