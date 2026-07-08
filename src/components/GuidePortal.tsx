import React, { useState } from 'react';
import { 
  Compass, User, ShieldAlert, Award, Star, ShoppingBag, 
  Settings, Key, Database, RefreshCw, Layers, Sparkles, CheckCircle2,
  TrendingUp, DollarSign, Share2, ArrowRight, HelpCircle
} from 'lucide-react';

interface GuidePortalProps {
  onNavigateToView: (view: 'shop' | 'loyalty' | 'affiliate' | 'admin' | 'profile') => void;
  userRole: string;
}

export default function GuidePortal({ onNavigateToView, userRole }: GuidePortalProps) {
  const [activeGuideTab, setActiveGuideTab] = useState<'customer' | 'admin' | 'affiliate'>('customer');

  return (
    <div id="guide-portal-root" className="space-y-8 animate-fade-in text-neutral-900 max-w-5xl mx-auto">
      {/* Title Header with Modern Editorial Typography */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-600">
          <Compass className="w-4 h-4 animate-spin-slow text-purple-600" />
          <span>RESTYLE System Directory</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight leading-tight">
          Apparel Store & Loyalty Guide (စနစ်အသုံးပြုပုံ လမ်းညွှန်ချက်)
        </h2>
        <p className="text-xs md:text-sm text-neutral-500 max-w-3xl leading-relaxed">
          Welcome to the RESTYLE Studio operating center. Below are the comprehensive playbooks designed for shoppers, administrative store personnel, and affiliate marketing partners. Use the tabs below to explore system features.
        </p>
      </div>

      {/* Mode Switcher Pills */}
      <div className="flex bg-neutral-200/50 p-1 rounded-2xl max-w-lg">
        <button
          onClick={() => setActiveGuideTab('customer')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeGuideTab === 'customer' 
              ? 'bg-white text-black shadow-xs' 
              : 'text-neutral-500 hover:text-black'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          User Guide (ဝယ်ယူသူ)
        </button>
        <button
          onClick={() => setActiveGuideTab('admin')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeGuideTab === 'admin' 
              ? 'bg-white text-black shadow-xs' 
              : 'text-neutral-500 hover:text-black'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Admin Guide (စီမံခန့်ခွဲသူ)
        </button>
        <button
          onClick={() => setActiveGuideTab('affiliate')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeGuideTab === 'affiliate' 
              ? 'bg-white text-black shadow-xs' 
              : 'text-neutral-500 hover:text-black'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Affiliate Guide (ဆင့်ပွား)
        </button>
      </div>

      {/* Interactive Playbook Panels */}
      {activeGuideTab === 'customer' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Card 1: Shop Catalog & Smart Checkout */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-neutral-950 font-display">1. Premium Shopping & Smart Pricing</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  Explore high-end tailored garments directly from our modern catalog with detailed filters for size, color, and fit parameters.
                </p>
              </div>
              <ul className="text-[11px] text-neutral-600 space-y-2 pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Auto-Bundle Discounts:</strong> Buying 2 or more of any garments triggers an automatic volume discount (10% off).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Live Stock Clamping:</strong> Items in cart are strictly dynamically checked against stock metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Personalized Promo:</strong> Exploring detailed garments triggers automated points gifts.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToView('shop')}
              className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Start Shopping <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: VIP Loyalty Program Tiers */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-neutral-950 font-display">2. Loyalty Club & Tiers</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  Earn points automatically with every order and level up through 4 exclusive customer tiers.
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-100 space-y-2 text-[10px]">
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-neutral-600">🥈 Silver Member</span>
                  <span className="text-neutral-400">Baseline level</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-amber-600">🥇 Gold Member</span>
                  <span className="text-neutral-500">&gt; $200.00 spent</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-purple-600">💎 Platinum VIP</span>
                  <span className="text-neutral-500">&gt; $500.00 spent</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-neutral-950 font-extrabold">👑 Diamond Executive</span>
                  <span className="text-neutral-500">&gt; $1,000.00 spent</span>
                </div>
              </div>
              <ul className="text-[11px] text-neutral-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Rewards Scaling:</strong> Higher tiers receive increased point multipliers up to 2.5x.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToView('loyalty')}
              className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              VIP Loyalty Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Points Wallet & Redemptions */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-amber-500">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-neutral-950 font-display">3. Points Wallet & Discounts</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  Points can be accumulated and redeemed during checkout to receive direct cash discounts.
                </p>
              </div>
              <ul className="text-[11px] text-neutral-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Discount Ratio:</strong> 100 loyalty points is strictly valued at $1.00 cash credit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Earning Ratio:</strong> Receive 1 point for every $1 spent on garments, scaled by tier multiplier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Shipping waiver:</strong> Platinum and Diamond members always receive free shipping unconditionally.</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => onNavigateToView('profile')}
              className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Check My Balance <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {activeGuideTab === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          
          {/* Left Block: Access Control & Operations */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600 animate-pulse" />
              Role-Based Access Control & Simulation
            </h3>
            
            <p className="text-xs text-neutral-500 leading-relaxed">
              RESTYLE utilizes a Role-Based Access Control (RBAC) mechanism. If you navigate to the <strong>Inventory</strong> tab as a customer, you will see an access-denied shield.
            </p>

            <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-2xl space-y-3">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block font-mono">Steps to switch to Admin:</span>
              <ul className="text-xs text-neutral-600 space-y-2 pl-1 list-decimal list-inside">
                <li>Go to the <strong className="text-purple-600 cursor-pointer underline" onClick={() => onNavigateToView('profile')}>User Account</strong> dashboard.</li>
                <li>Scroll to the bottom to find the <strong>Authorized Identity Switcher</strong> widget.</li>
                <li>Select <strong>Marcus Chen (Administrator)</strong> or any administrator profile.</li>
                <li>The system swaps your session token and unlocks the core CMS and Inventory panel!</li>
              </ul>
            </div>

            <h4 className="font-bold font-display text-sm text-neutral-950">Store Management Tools</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <span className="font-bold text-neutral-800 block">Inventory Adjustments</span>
                <p className="text-[11px] text-neutral-500 leading-relaxed">Modify stock counts and adjust prices instantly. If stock drops to 15 or below, warning indicators notify admins automatically.</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-1">
                <span className="font-bold text-neutral-800 block">Product Specification Creation</span>
                <p className="text-[11px] text-neutral-500 leading-relaxed">Design and list new high-end garments, set sizing options, fits, colors, and configure VIP-exclusive collection toggles.</p>
              </div>
            </div>
          </div>

          {/* Right Block: CMS & Security Audit Logs */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              Store CMS & Audit Analytics
            </h3>

            <p className="text-xs text-neutral-500 leading-relaxed">
              RESTYLE includes dynamic Content Management Systems (CMS) to manage user campaigns, frequently asked questions, and static pages easily.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-neutral-800" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Campaign Banners CMS</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">Register new advertising collections. Configure custom images, copy, and CTA buttons. Toggle "Active" to instantly swap the storefront banner.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4 text-neutral-800" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Support FAQ Accordion CMS</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">Edit or add frequently asked questions to help shoppers resolve shipping, sizing, or returns inquiries. The store accordion renders these instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-neutral-800" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Enterprise Audit Log Trail</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">Track security events in real-time, including inventory modifications, checkout operations, and role elevations, to maintain compliance.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => {
                  if (userRole === 'Administrator') {
                    onNavigateToView('admin');
                  } else {
                    onNavigateToView('profile');
                  }
                }}
                className="py-2 px-4 bg-neutral-950 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
              >
                {userRole === 'Administrator' ? 'Manage Inventory & CMS' : 'Switch to Admin Profile'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {activeGuideTab === 'affiliate' && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Playbook Description */}
            <div className="space-y-5">
              <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                The Affiliate Partner Business Model
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                RESTYLE Studio offers a fully functional affiliate program. Registered partners receive a unique tracking identifier and a custom checkout discount code to share.
              </p>

              <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-800">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>How Commissions are Tracked:</span>
                </div>
                <ul className="space-y-2 text-neutral-600 pl-1 list-disc list-inside">
                  <li>When a customer uses your link or checkout code, they receive an automatic <strong>5% checkout discount</strong>.</li>
                  <li>Your affiliate record is dynamically credited with a **10% gross cash commission** on the order total!</li>
                  <li>Instantly track clicks, total referral sales, conversion ratios, and unpaid balance payouts in real-time.</li>
                </ul>
              </div>
            </div>

            {/* Practical Guide */}
            <div className="space-y-5">
              <h3 className="font-bold font-display text-base text-neutral-950">
                How to setup and run an Affiliate campaign:
              </h3>
              
              <ol className="text-xs text-neutral-600 space-y-4 pl-1 list-decimal list-inside leading-relaxed">
                <li>
                  Go to the <strong className="text-purple-600 cursor-pointer underline" onClick={() => onNavigateToView('affiliate')}>Affiliate Tracking</strong> hub.
                </li>
                <li>
                  Choose a baseline partner profile (e.g. <strong>Urban Threads (urb-99)</strong>) or register a new custom profile with your brand name.
                </li>
                <li>
                  Click <strong>"Generate Referral URL"</strong> to copy the custom tracking link.
                </li>
                <li>
                  Simulate a purchase: open the link, add items to your cart, and check out. You'll see the affiliate code is applied automatically.
                </li>
                <li>
                  Return to your Affiliate Portal dashboard to see your stats (clicks, sales, conversion velocity, and commissions) update in real-time!
                </li>
              </ol>

              <div className="pt-2">
                <button 
                  onClick={() => onNavigateToView('affiliate')}
                  className="w-full py-2 bg-neutral-950 text-white hover:bg-neutral-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  Enter Affiliate Hub <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
