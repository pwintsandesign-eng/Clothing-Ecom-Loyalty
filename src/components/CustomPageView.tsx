import React from 'react';
import { CustomPage, StoreSettings } from '../types';
import { ArrowLeft, Sparkles, Shield, Heart, Compass, Truck, FileText, Layers, Globe, Users, ChevronRight, BookOpen, Clock, BadgeCheck } from 'lucide-react';

interface CustomPageViewProps {
  page: CustomPage;
  storeSettings: StoreSettings;
  onBack: () => void;
}

export default function CustomPageView({ page, storeSettings, onBack }: CustomPageViewProps) {
  // Select rich visual headers and banners based on page slug
  let heroImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200';
  let tagline = 'Premium Tailored Apparel';
  let badge = 'CMS Page';

  if (page.slug === 'about-us') {
    heroImage = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200';
    tagline = 'Our Heritage & Sustainable Craftsmanship';
    badge = 'About Our Atelier';
  } else if (page.slug === 'shipping-policy') {
    heroImage = 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=1200';
    tagline = 'Careful Handling & Expedited Logistical Paths';
    badge = 'Shipping Guidelines';
  } else if (page.slug === 'operations-guide') {
    heroImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
    tagline = 'E-Commerce Protocol & Role Specifications';
    badge = 'Operations Playbook';
  }

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto my-6 text-neutral-900">
      
      {/* Dynamic Navigation Breadcrumb / Go Back */}
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer bg-neutral-100/80 py-1.5 px-4 rounded-xl hover:bg-neutral-200"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Shop Catalog
        </button>
        <span className="text-[10px] font-mono text-neutral-400">
          STUDIO / PAGE / {page.slug.toUpperCase()}
        </span>
      </div>

      {/* Styled High-End Editorial Hero Banner */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-md">
        <img
          src={heroImage}
          alt={page.title}
          className="w-full h-full object-cover filter brightness-75 scale-100 hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/40 to-transparent flex flex-col justify-end p-8 md:p-12 space-y-3">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold tracking-widest uppercase self-start">
            {badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            {page.title}
          </h1>
          <p className="text-white/85 text-xs md:text-sm font-light max-w-xl">
            {tagline}
          </p>
        </div>
      </div>

      {/* Main Content Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Rich Rendered Dynamic Text & Core Stories */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3 text-xs text-neutral-400 border-b border-neutral-100 pb-4">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Published by <strong>RESTYLE CMS</strong></span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>Est. 4 min read</span>
            </div>

            {/* Render dynamic text with premium line-height and typography */}
            <div className="text-neutral-700 leading-relaxed space-y-4 text-sm font-light whitespace-pre-line">
              {page.content}
            </div>
          </div>

          {/* PAGE SPECIFIC MODULES (Beautiful, custom hardcoded graphic layers for native feeling) */}
          {page.slug === 'about-us' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-lg text-neutral-900 tracking-tight font-display border-b border-neutral-200 pb-2">
                Our Sustainable Quality Frameworks
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-neutral-900">100% Organic Pima</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                    Sourced responsibly with strict water conservation standards. Spun for absolute breathability and lasting weave structures.
                  </p>
                </div>

                <div className="p-5 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-neutral-900">Selvedge Integrity</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                    Traditional shuttle looming techniques produce beautiful natural edges that resist fraying and adapt to your unique anatomy.
                  </p>
                </div>

                <div className="p-5 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-neutral-900">Digital Simulations</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                    We combine tailoring craftsmanship with digital weight maps so you can simulate drape, elasticity, and tension before ordering.
                  </p>
                </div>
              </div>

              {/* Atelier Team Image Block */}
              <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200/60 flex flex-col md:flex-row gap-6 items-center">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400"
                  alt="Tailoring atelier workshop"
                  className="w-full md:w-40 h-40 object-cover rounded-2xl shadow-sm border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2 text-left">
                  <span className="text-[9px] font-bold tracking-widest text-purple-600 uppercase font-mono">Behind The Loom</span>
                  <h4 className="font-bold text-sm text-neutral-900 font-display">Crafting the Modern Armor</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    "We do not design clothes for a single season. RESTYLE is about creating enduring everyday staples—tees that retain their structure over hundreds of washes, and raw denim pants that map out the timeline of your life."
                  </p>
                  <span className="block text-[11px] font-bold text-neutral-800">— Marcus Chen, Master Tailor & Founder</span>
                </div>
              </div>
            </div>
          )}

          {page.slug === 'shipping-policy' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-lg text-neutral-900 tracking-tight font-display border-b border-neutral-200 pb-2">
                Logistics & Carrier Metrics
              </h3>
              
              <div className="overflow-hidden border border-neutral-200 rounded-2xl bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold">
                      <th className="p-4">Shipping Method</th>
                      <th className="p-4">Delivery Window</th>
                      <th className="p-4">Pricing</th>
                      <th className="p-4">VIP Benefits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-500 font-light">
                    <tr>
                      <td className="p-4 font-bold text-neutral-900">Standard Delivery</td>
                      <td className="p-4">2 - 4 Business Days</td>
                      <td className="p-4">$6.99 (Free above $100)</td>
                      <td className="p-4">Complimentary for Gold & Platinum</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-neutral-900">Priority Express</td>
                      <td className="p-4">1 - 2 Business Days</td>
                      <td className="p-4">$15.00 flat rate</td>
                      <td className="p-4">Complimentary for Platinum Members</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-neutral-900">Next-Day Courier</td>
                      <td className="p-4">Next Calendar Day</td>
                      <td className="p-4">$25.00 flat rate</td>
                      <td className="p-4">50% off for Gold / Free for Platinum</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Returns card panel */}
              <div className="p-6 bg-purple-50/60 border border-purple-100 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <BadgeCheck className="w-5 h-5 text-purple-600" />
                  <h4>Our 14-Day Guarantee</h4>
                </div>
                <p className="text-xs text-purple-950/80 leading-relaxed font-light">
                  If the fit, denim structure, or cotton feel doesn't meet your expectations, we offer simple prepaid domestic return labels. Garments must remain unworn with their respective studio barcodes intact. Custom fabric simulations do not affect our return policies.
                </p>
              </div>
            </div>
          )}

          {page.slug === 'operations-guide' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-lg text-neutral-900 tracking-tight font-display border-b border-neutral-200 pb-2">
                Operational Workflows
              </h3>

              <div className="space-y-4">
                <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-md uppercase tracking-wider">
                    Tier 1: Customer Guide
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900">VIP Rewards & Points Redemption</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    Every checkout awards 1 loyalty point per $1 spent. Higher membership tiers (Silver, Gold, Platinum) enjoy spending multipliers of up to 2.5x. Points are redeemable directly in the cart drawer at a rate of 100 points = $1.00 cash off.
                  </p>
                </div>

                <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-md uppercase tracking-wider">
                    Tier 2: Affiliate Operations
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900">Custom Code Generation & Revenue Shares</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    Affiliates can customize unique referral codes (e.g. "VIPALEX"). Anyone checking out using this code receives an instant 5% store discount. The host partner earns 10% cash commission of the post-discount subtotal in real-time.
                  </p>
                </div>

                <div className="p-6 bg-white border border-neutral-200 rounded-2xl space-y-3 shadow-xs">
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold rounded-md uppercase tracking-wider">
                    Tier 3: CMS & Core Administration
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900">Role-Based Access Control (RBAC) Switcher</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    To access the administration portal and manage inventory metrics, edit prices, update promotional headers, configure low stock thresholds, publish FAQs, or write custom pages: switch your identity role from "Customer" to "Administrator" inside the User Account tab.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Dynamic Sidebar with Visual Highlights & Brand story */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Studio Heritage Quote Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
              <Compass className="w-40 h-40" />
            </div>
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">RESTYLE Atelier</span>
            </div>
            <h4 className="font-bold text-sm font-display tracking-tight leading-snug">
              "We synthesize tailoring heritage with interactive textile technology."
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Our atelier uses local handcraft principles to sew every single garment. The digital simulation layers give customers the security of bespoke fits without waste.
            </p>
            <div className="border-t border-neutral-800 pt-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs text-neutral-950">
                MC
              </div>
              <div className="text-[10px]">
                <span className="block font-bold text-neutral-200">Marcus Chen</span>
                <span className="block text-neutral-500">Design Lead</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ / Help Accordion Widget in Sidebar */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <span className="block font-bold text-neutral-800 text-xs uppercase tracking-wider font-display">
              Quick Support Resources
            </span>
            <div className="space-y-3 divide-y divide-neutral-100">
              <div className="pt-1.5 space-y-1">
                <span className="block font-bold text-[11px] text-neutral-900">How do I trace my delivery?</span>
                <p className="text-[10px] text-neutral-500 leading-normal font-light">
                  A premium tracking link is dispatched immediately upon warehouse exit. You can monitor courier vehicles in real-time.
                </p>
              </div>
              <div className="pt-3 space-y-1">
                <span className="block font-bold text-[11px] text-neutral-900">Are items pre-shrunk?</span>
                <p className="text-[10px] text-neutral-500 leading-normal font-light">
                  Yes, our organic cotton fabrics undergo an ambient-steam pre-shrinkage cycle in our local workshops.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Campaign Showroom */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <span className="block font-bold text-neutral-800 text-xs uppercase tracking-wider font-display">
              Seasonal Showroom
            </span>
            <div className="space-y-3">
              {storeSettings.brandPromoPhoto1 && (
                <div className="relative group overflow-hidden rounded-2xl h-24 border border-neutral-200">
                  <img
                    src={storeSettings.brandPromoPhoto1}
                    alt="Promo Highlight 1"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-2.5">
                    <span className="text-[9px] font-bold text-white bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Premium Pima Wear
                    </span>
                  </div>
                </div>
              )}
              {storeSettings.brandPromoPhoto2 && (
                <div className="relative group overflow-hidden rounded-2xl h-24 border border-neutral-200">
                  <img
                    src={storeSettings.brandPromoPhoto2}
                    alt="Promo Highlight 2"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-2.5">
                    <span className="text-[9px] font-bold text-white bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Tailored Denim Line
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
