import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, UserProfile, AffiliatePartner, ReferredSale, Order, Size, Fit, Color, ProductReview, Banner, FAQItem, CustomPage, AuditLog, StoreSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_AFFILIATES, INITIAL_REFERRED_SALES } from './data/initialProducts';

const INITIAL_STORE_SETTINGS: StoreSettings = {
  logoText: 'RESTYLE',
  logoImage: '',
  announcementText: '🎉 Free Standard Delivery on orders above $100! Platinum VIPs receive complimentary Express Courier.',
  announcementBgColor: '#2563eb', // Blue
  announcementTextColor: '#ffffff',
  footerStory: 'Premium tailored garments, local handcraft design, and exclusive VIP member program. Elevating style with digital textile simulations.',
  footerCopyright: '© 2026 RESTYLE Studio. Premium Tailored Apparel & VIP Loyalty Ecosystem. All rights reserved.',
  menuShopText: 'Shop Category',
  menuLoyaltyText: 'VIP Loyalty',
  menuAffiliateText: 'Affiliate Tracking',
  menuGuidesText: 'Guides',
  menuAccountText: 'User Account',
  menuInventoryText: 'Store Inventory',
  brandPromoPhoto1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
  brandPromoPhoto2: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=600'
};
import ProductCard from './components/ProductCard';
import ProductDetailView from './components/ProductDetailView';
import CartDrawer from './components/CartDrawer';
import LoyaltyDashboard from './components/LoyaltyDashboard';
import AdminPortal from './components/AdminPortal';
import AffiliatePortal from './components/AffiliatePortal';
import DiscountPopup from './components/DiscountPopup';
import UserProfileDashboard from './components/UserProfileDashboard';
import GuidePortal from './components/GuidePortal';
import CustomPageView from './components/CustomPageView';
import LoginForm from './components/LoginForm';
import { Search, SlidersHorizontal, RefreshCw, Star, Heart, Lock, LogOut, ShoppingBag, Eye, Award, Sparkles, ChevronRight, Crown, User, Settings, Info, Calendar, HelpCircle, ChevronDown, X, Compass } from 'lucide-react';

const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'High-End Tailored Pants & Tees ဝတ်စုံများ',
    subtitle: 'Organic pima cotton နဲ့ Japanese selvedge denim တို့ကို သုံးပြီး သေသပ်သပ်ရပ်ရပ်ချုပ်လုပ်ထားတဲ့ high-end pants & tees ဝတ်စုံများ။',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200',
    isActive: true,
    linkText: 'Explore Collection'
  },
  {
    id: 'banner-2',
    title: 'Exclusive Japanese Raw Denim',
    subtitle: 'Authentic raw cotton woven on traditional shuttle looms. Made in Okayama, Japan.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1200',
    isActive: false,
    linkText: 'Shop Selvedge'
  }
];

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I choose my tailoring size?',
    answer: 'Our sizing runs true-to-fit with a slight tailored contour. Check out our sizing guidelines or consult support.',
    category: 'Sizing'
  },
  {
    id: 'faq-2',
    question: 'What is the delivery timeline for Vanguard garments?',
    answer: 'We process orders in 24 hours. Normal domestic shipping takes 2-4 business days. Platinum VIPs receive complimentary express delivery.',
    category: 'Shipping'
  },
  {
    id: 'faq-3',
    question: 'Can I return items if the fit profile is incorrect?',
    answer: 'Yes! We accept returns within 14 days of delivery for all unworn garments.',
    category: 'Returns'
  }
];

const INITIAL_PAGES: CustomPage[] = [
  {
    id: 'page-1',
    title: 'Our Heritage (About Us)',
    slug: 'about-us',
    content: 'Vanguard Studio was established in 2024 to bring premium basic clothing to the modern wardrobe. We believe in sourcing authentic materials, ethical production processes, and pristine tailored cuts.',
    isActive: true
  },
  {
    id: 'page-2',
    title: 'Shipping & Tailoring Guidelines',
    slug: 'shipping-policy',
    content: 'We offer standard and express shipping worldwide. Standard shipping is free on orders above $100. Premium and Platinum VIP members enjoy free express shipping on all orders unconditionally. Each garment is packed in a protective dust-bag.',
    isActive: true
  },
  {
    id: 'page-3',
    title: 'System & Operations Guide',
    slug: 'operations-guide',
    content: 'Welcome to Vanguard. This portal includes operational workflows for Customers, Admins, and Affiliates:\n\n1. CUSTOMERS:\nBrowse carefully designed items in the catalog. Filter garments by size, color, and fit parameters. Join the VIP Loyalty Club to earn multipliers on spending. Redeem points in checkout for cash discounts (100 points = $1.00).\n\n2. ADMINISTRATORS:\nSwap your profile role to Administrator in the User Account dashboard. Access the Inventory hub to alter pricing, adjust inventory levels, view revenue reports, edit advertising campaigns, and publish FAQs.\n\n3. AFFILIATES:\nGenerate tracking links. Direct clients to purchase to award them a 5% discount, while earning 10% commission on the gross order value. Track clicks and commissions in real-time.',
    isActive: true
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-07-05T01:10:00-07:00',
    action: 'System Boot',
    userEmail: 'system@vanguard.com',
    details: 'Vanguard Studio enterprise storefront core loaded successfully.'
  }
];

export default function App() {
  // ---------------- STATE AGGREGATION ----------------
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vanguard_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vanguard_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vanguard_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('vanguard_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Carter',
      email: 'alex.carter@modernwear.com',
      totalSpending: 150.00, // Starts as Silver member
      tier: 'Silver',
      loyaltyPoints: 180,
      isPremium: false,
      role: 'Customer',
      shippingAddress: '128 Fashion Blvd',
      shippingCity: 'New York',
      shippingZip: '10001'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('vanguard_is_logged_in');
    return saved ? JSON.parse(saved) : false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [partners, setPartners] = useState<AffiliatePartner[]>(() => {
    const saved = localStorage.getItem('vanguard_partners');
    return saved ? JSON.parse(saved) : INITIAL_AFFILIATES;
  });

  const [sales, setSales] = useState<ReferredSale[]>(() => {
    const saved = localStorage.getItem('vanguard_sales');
    return saved ? JSON.parse(saved) : INITIAL_REFERRED_SALES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vanguard_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('vanguard_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('vanguard_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [customPages, setCustomPages] = useState<CustomPage[]>(() => {
    const saved = localStorage.getItem('vanguard_pages');
    return saved ? JSON.parse(saved) : INITIAL_PAGES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('vanguard_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('vanguard_store_settings');
    return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
  });

  // Navigation: 'shop' | 'loyalty' | 'affiliate' | 'admin' | 'profile' | 'guides' | 'page'
  const [activeView, setActiveView] = useState<'shop' | 'loyalty' | 'affiliate' | 'admin' | 'profile' | 'guides' | 'page'>('shop');

  // Dynamic page modal trigger
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);

  // Active FAQ item tracking
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Enterprise Audit logging helper
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      userEmail: user.email,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };


  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [sizeFilter, setSizeFilter] = useState<Size | null>(null);
  const [fitFilter, setFitFilter] = useState<Fit | null>(null);
  const [colorFilter, setColorFilter] = useState<Color | null>(null);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'newest'>('default');

  // Dialog / Drawer Triggers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewCount, setViewCount] = useState(0); // Tracks item detail views to trigger personalized discount popup

  // Linked Affiliate Referral Trace
  const [initialRefCode, setInitialRefCode] = useState('');

  // ---------------- PERSISTENCE SYNCHRONIZATION ----------------
  useEffect(() => {
    localStorage.setItem('vanguard_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vanguard_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vanguard_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vanguard_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vanguard_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('vanguard_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('vanguard_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('vanguard_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vanguard_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('vanguard_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('vanguard_pages', JSON.stringify(customPages));
  }, [customPages]);

  useEffect(() => {
    localStorage.setItem('vanguard_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('vanguard_store_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // ---------------- REFERRAL CODE URL INTERCEPTION ----------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    const targetProdId = params.get('prod');

    if (refCode) {
      const codeUpper = refCode.toUpperCase();
      setInitialRefCode(codeUpper);

      // Check if partner exists and increment click tracking once per session
      const exists = partners.some(p => p.code === codeUpper);
      if (exists) {
        const hasTrackedClick = sessionStorage.getItem(`tracked_click_${codeUpper}`);
        if (!hasTrackedClick) {
          const updatedPartners = partners.map(p => {
            if (p.code === codeUpper) {
              return { ...p, clicks: p.clicks + 1 };
            }
            return p;
          });
          setPartners(updatedPartners);
          sessionStorage.setItem(`tracked_click_${codeUpper}`, 'true');
        }
      }

      // If there is also a specific target product in the URL query, open it immediately
      if (targetProdId) {
        const prodMatch = products.find(p => p.id === targetProdId);
        if (prodMatch) {
          setSelectedProduct(prodMatch);
        }
      }
    }
  }, []);

  // ---------------- MUTATION HANDLERS ----------------
  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, size: Size, fit: Fit, color: Color, quantity: number) => {
    const compositeId = `${product.id}_${size}_${fit}_${color}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === compositeId);
      if (existing) {
        return prev.map(item =>
          item.id === compositeId
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: compositeId,
          product,
          size,
          fit,
          color,
          quantity
        };
        return [...prev, newItem];
      }
    });
  };

  const handleAddReview = (productId: string, newReview: ProductReview) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: [newReview, ...p.reviews]
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    // If active product modal is open, sync the reviews list inside the modal
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : null);
    }
  };

  const handleClaimPoints = (points: number) => {
    setUser(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + points
    }));
  };

  const handleToggleSubscription = () => {
    setUser(prev => {
      const nextPremium = !prev.isPremium;
      return {
        ...prev,
        isPremium: nextPremium,
        // Premium members automatically behave as Platinum for point multipliers and free shipping!
        tier: nextPremium ? 'Platinum' : prev.tier
      };
    });
  };

  const handleAddDemoSpending = (amount: number) => {
    setUser(prev => {
      const nextSpending = prev.totalSpending + amount;
      let nextTier: typeof prev.tier = 'Bronze';
      if (nextSpending > 600) nextTier = 'Platinum';
      else if (nextSpending > 300) nextTier = 'Gold';
      else if (nextSpending > 100) nextTier = 'Silver';

      return {
        ...prev,
        totalSpending: nextSpending,
        tier: nextTier
      };
    });
  };

  // ---------------- CATALOG FILTERING LOGIC ----------------
  const filteredProducts = products.filter(p => {
    // Category check
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

    // Size check
    if (sizeFilter && !p.sizes.includes(sizeFilter)) return false;

    // Fit check
    if (fitFilter && !p.fits.includes(fitFilter)) return false;

    // Color check
    if (colorFilter && !p.colors.includes(colorFilter)) return false;

    // Wishlist check
    if (showWishlistOnly && !wishlist.includes(p.id)) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesDesc = p.description.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') {
      const aNew = a.isNewArrival ? 1 : 0;
      const bNew = b.isNewArrival ? 1 : 0;
      return bNew - aNew;
    }
    return 0;
  });

  const handleProductSelect = (p: Product) => {
    setSelectedProduct(p);
    setViewCount(c => c + 1); // Triggers the customized reward popup after 2 modal view actions
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSizeFilter(null);
    setFitFilter(null);
    setColorFilter(null);
    setShowWishlistOnly(false);
    setSearchQuery('');
    setSortBy('default');
  };

  const renderSignInRequired = (viewTitle: string, description: string, icon: React.ReactNode) => {
    return (
      <div className="bg-white border border-neutral-100 rounded-[32px] p-8 md:p-12 max-w-xl mx-auto text-center space-y-6 shadow-xl my-12 animate-fade-in font-sans">
        <div className="mx-auto w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-xl text-neutral-900 font-display tracking-tight">{viewTitle} Requires Authentication</h2>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>
        <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 text-left text-xs space-y-2">
          <span className="font-bold text-neutral-700 block">🔒 RBAC & Identity Security:</span>
          <p className="text-neutral-500 leading-relaxed">
            RESTYLE operates separate Customer accounts with customized tier benefits, spending histories, and secure admin interfaces.
          </p>
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-100 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
        >
          <User className="w-4 h-4" /> Authorize Secure Sign In / Register
        </button>
      </div>
    );
  };

  // Find active banner from the CMS, or fallback to first default banner
  const activeBanner = banners.find(b => b.isActive) || banners[0] || INITIAL_BANNERS[0];

  return (
    <div id="restyle-app-root" className="min-h-screen bg-[#FDFDFF] text-neutral-900 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-950">
      
      {/* ---------------- ANNOUNCEMENT BANNER ---------------- */}
      {storeSettings.announcementText && (
        <div
          style={{ backgroundColor: storeSettings.announcementBgColor, color: storeSettings.announcementTextColor }}
          className="text-center py-2 px-4 text-[11px] font-bold tracking-wide transition-all z-50 flex items-center justify-center gap-2"
        >
          <span>{storeSettings.announcementText}</span>
        </div>
      )}

      {/* ---------------- NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          
          {/* Brand Logo - DYNAMIC LOGO / PHOTO */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveView('shop'); setSelectedProduct(null); }}>
            {storeSettings.logoImage ? (
              <img src={storeSettings.logoImage} alt={storeSettings.logoText} className="h-9 max-w-[150px] object-contain rounded" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-2xl font-black tracking-widest text-purple-600 font-display">
                {storeSettings.logoText}
              </span>
            )}
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex gap-6 text-xs font-bold text-neutral-500 uppercase tracking-wider font-display">
            <button
              onClick={() => { setActiveView('shop'); setSelectedProduct(null); }}
              className={`hover:text-purple-700 py-1 transition-colors cursor-pointer ${activeView === 'shop' ? 'text-purple-700 border-b-2 border-purple-600' : ''}`}
            >
              {storeSettings.menuShopText}
            </button>
            <button
              onClick={() => setActiveView('loyalty')}
              className={`hover:text-purple-700 py-1 transition-colors cursor-pointer ${activeView === 'loyalty' ? 'text-purple-700 border-b-2 border-purple-600' : ''}`}
            >
              {storeSettings.menuLoyaltyText}
            </button>
            <button
              onClick={() => setActiveView('affiliate')}
              className={`hover:text-purple-700 py-1 transition-colors cursor-pointer ${activeView === 'affiliate' ? 'text-purple-700 border-b-2 border-purple-600' : ''}`}
            >
              {storeSettings.menuAffiliateText}
            </button>
          </nav>

          {/* Interactive User Perks & Cart Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Quick User Rewards widget - Purple theme */}
            <button
              onClick={() => setActiveView('loyalty')}
              className="hidden sm:flex items-center gap-2 py-1 px-3 bg-purple-50 border border-purple-100 hover:border-purple-300 rounded-xl transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <div className="text-left text-[10px] leading-tight">
                <span className="block font-bold text-purple-800">{user.tier} VIP</span>
                <span className="block text-purple-600 text-[9px] font-mono font-medium">{user.loyaltyPoints} Pts</span>
              </div>
            </button>

            {/* Premium Membership Status Ribbon - Purple */}
            {user.isPremium && (
              <span className="hidden lg:flex items-center gap-1 py-1 px-2.5 bg-neutral-900 text-purple-400 text-[9px] font-bold tracking-widest uppercase rounded-lg">
                <Crown className="w-3 h-3 fill-current text-purple-400" /> Premium VIP
              </span>
            )}

            {/* Guides / FAQ Shortcut - Put as Icon */}
            <button
              onClick={() => setActiveView('guides')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'guides'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
              title={storeSettings.menuGuidesText}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User Account Shortcut - Put as Icon */}
            <button
              onClick={() => setActiveView('profile')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'profile'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
              title={storeSettings.menuAccountText}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Store Inventory / Admin Shortcut - Put as Icon */}
            <button
              onClick={() => setActiveView('admin')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
              title={storeSettings.menuInventoryText}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Wishlist Shortcut - Purple */}
            <button
              onClick={() => {
                setActiveView('shop');
                setShowWishlistOnly(prev => !prev);
              }}
              className={`p-2 rounded-xl transition-all relative cursor-pointer ${
                showWishlistOnly
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
              title="Show Wishlist"
            >
              <Heart className={`w-4 h-4 ${showWishlistOnly ? 'fill-current' : ''}`} />
              {wishlist.length > 0 && !showWishlistOnly && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 hover:text-black rounded-xl transition-all relative cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="bg-neutral-900 text-white px-1.5 py-0.5 rounded-md text-[9px] font-extrabold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Secure Sign In or Sign Out Button */}
            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-100 flex items-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
                title="Sign In / Register"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  addAuditLog('Sign Out', `User ${user.email} signed out from session.`);
                }}
                className="p-2 bg-neutral-50 hover:bg-red-50 text-neutral-600 hover:text-red-600 rounded-xl transition-all cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Submenu bar - Purple active states */}
        <div className="md:hidden border-t border-neutral-100 py-2.5 px-4 flex gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider justify-between items-center overflow-x-auto">
          <button onClick={() => { setActiveView('shop'); setSelectedProduct(null); }} className={`shrink-0 ${activeView === 'shop' ? 'text-purple-600' : ''}`}>{storeSettings.menuShopText}</button>
          <button onClick={() => setActiveView('loyalty')} className={`shrink-0 ${activeView === 'loyalty' ? 'text-purple-600' : ''}`}>{storeSettings.menuLoyaltyText}</button>
          <button onClick={() => setActiveView('affiliate')} className={`shrink-0 ${activeView === 'affiliate' ? 'text-purple-600' : ''}`}>{storeSettings.menuAffiliateText}</button>
          
          <div className="flex items-center gap-2 border-l border-neutral-200 pl-2">
            <button onClick={() => setActiveView('guides')} className={`p-1 shrink-0 ${activeView === 'guides' ? 'text-purple-600' : 'text-neutral-400'}`} title={storeSettings.menuGuidesText}><HelpCircle className="w-4 h-4" /></button>
            <button onClick={() => setActiveView('profile')} className={`p-1 shrink-0 ${activeView === 'profile' ? 'text-purple-600' : 'text-neutral-400'}`} title={storeSettings.menuAccountText}><User className="w-4 h-4" /></button>
            <button onClick={() => setActiveView('admin')} className={`p-1 shrink-0 ${activeView === 'admin' ? 'text-purple-600' : 'text-neutral-400'}`} title={storeSettings.menuInventoryText}><Settings className="w-4 h-4" /></button>
            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-1 shrink-0 text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                title="Sign In"
              >
                <User className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  addAuditLog('Sign Out', `User ${user.email} signed out from session.`);
                }}
                className="p-1 shrink-0 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeView === 'shop' ? (
          /* ================= SHOP CATALOG VIEW ================= */
          selectedProduct ? (
            <ProductDetailView
              product={selectedProduct}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              isUserPremium={user.isPremium}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onAddReview={handleAddReview}
              onClose={() => setSelectedProduct(null)}
              onNavigateToVIP={() => setActiveView('loyalty')}
              user={user}
            />
          ) : (
            <div className="space-y-8">
              
              {/* Minimalist Editorial Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 md:p-12 flex flex-col justify-center min-h-[220px] shadow-sm">
                {/* Artistic background overlay */}
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('${activeBanner.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 to-transparent" />

                <div className="relative space-y-3 z-10 max-w-lg">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current text-purple-400" /> RESTYLE Studio / Curated Campaign
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight leading-tight">
                    {activeBanner.title}
                  </h1>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {activeBanner.subtitle}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block py-1.5 px-4 bg-white text-black font-bold text-[10px] rounded-lg tracking-wider uppercase shadow-xs">
                      {activeBanner.linkText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter Drawer & Search Controls */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Apparel name (သို့) fabric အမျိုးအစားဖြင့် ရှာဖွေရန်..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs pl-9 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:border-purple-600 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  </div>

                  {/* Main Category Switches */}
                  <div className="bg-neutral-100 p-1 rounded-xl flex gap-1 text-xs font-bold self-start md:self-auto overflow-x-auto max-w-full scrollbar-none">
                    {(['All', 'T-Shirts', 'Pants', 'Hoodies', 'Jackets', 'Accessories', 'Dresses'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-1.5 px-3.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                          selectedCategory === cat ? 'bg-purple-600 text-white shadow-xs' : 'text-neutral-500 hover:text-black'
                        }`}
                      >
                        {cat === 'All' ? 'All (အားလုံး)' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters Matrix */}
                <div className="border-t border-neutral-100 pt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                  
                  {/* Sizes dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Size ရွေးချယ်ရန်</label>
                    <select
                      value={sizeFilter || ''}
                      onChange={(e) => setSizeFilter((e.target.value as Size) || null)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="">All Sizes အားလုံး</option>
                      <option value="XS">XS (Extra Small)</option>
                      <option value="S">S (Small)</option>
                      <option value="M">M (Medium)</option>
                      <option value="L">L (Large)</option>
                      <option value="XL">XL (Extra Large)</option>
                    </select>
                  </div>

                  {/* Fits dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Tailoring Fit ရွေးရန်</label>
                    <select
                      value={fitFilter || ''}
                      onChange={(e) => setFitFilter((e.target.value as Fit) || null)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="">All Fits အားလုံး</option>
                      <option value="Slim">Slim Tailored Fit</option>
                      <option value="Regular">Regular Straight Fit</option>
                      <option value="Relaxed">Relaxed Roomy Fit</option>
                      <option value="Athletic">Athletic Tapered Fit</option>
                    </select>
                  </div>

                  {/* Colors dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Color Tone ရွေးရန်</label>
                    <select
                      value={colorFilter || ''}
                      onChange={(e) => setColorFilter((e.target.value as Color) || null)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="">All Colors အားလုံး</option>
                      <option value="Black">Black Obsidian</option>
                      <option value="White">Chalk White</option>
                      <option value="Navy">Deep Navy</option>
                      <option value="Olive">Serrated Olive</option>
                      <option value="Beige">Sandstone Beige</option>
                      <option value="Gray">Slate Gray</option>
                    </select>
                  </div>

                  {/* Sorting dropdown */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Sort Apparel List</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600 font-sans"
                    >
                      <option value="default">Default Catalog (မူလအစီအစဉ်)</option>
                      <option value="price-asc">Price: Low to High (ဈေးနှုန်း အနိမ့်မှ အမြင့်)</option>
                      <option value="price-desc">Price: High to Low (ဈေးနှုန်း အမြင့်မှ အနိမ့်)</option>
                      <option value="newest">Newest Releases (အသစ်ရောက်ရှိသော ပစ္စည်းများ)</option>
                    </select>
                  </div>
                </div>

                {/* Active Filter Clear Tag */}
                {(sizeFilter || fitFilter || colorFilter || showWishlistOnly || searchQuery || sortBy !== 'default') && (
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                    <span className="text-[10px] font-semibold text-neutral-400">
                      Showing {sortedProducts.length} of {products.length} catalog items
                    </span>
                    <button
                      onClick={handleClearFilters}
                      className="text-[10px] font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Clear Active Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Catalog Grid */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-12 bg-white border border-neutral-100 rounded-2xl">
                  <SlidersHorizontal className="w-12 h-12 text-neutral-200 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-neutral-600 mb-1">No items match your styling filters</h3>
                  <button onClick={handleClearFilters} className="text-xs text-purple-600 font-bold hover:underline">Reset search criteria</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedProducts.map(prod => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      isWishlisted={wishlist.includes(prod.id)}
                      isUserPremium={user.isPremium}
                      onToggleWishlist={handleToggleWishlist}
                      onSelectProduct={handleProductSelect}
                    />
                  ))}
                </div>
              )}

              {/* Interactive Support FAQ Accordion */}
              <div id="faq-section" className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 mt-12 shadow-sm space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 animate-pulse text-purple-600" /> Customer Assistance & support
                  </span>
                  <h3 className="font-bold text-lg text-neutral-950 font-display">
                    Frequently Asked Questions (မေးလေ့ရှိသော မေးခွန်းများ)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Select a topic below to view tailoring specs, delivery parameters, and VIP loyalty guidelines.
                  </p>
                </div>

                <div className="divide-y divide-neutral-100">
                  {faqs.map(faq => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div key={faq.id} className="py-3.5 first:pt-0 last:pb-0">
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full flex justify-between items-center text-left text-xs font-bold text-neutral-800 hover:text-neutral-950 cursor-pointer select-none py-1"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded">
                              {faq.category}
                            </span>
                            {faq.question}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="mt-2 pl-2 text-xs text-neutral-500 font-light leading-relaxed animate-fade-in">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )
        ) : activeView === 'loyalty' ? (
          /* ================= VIP LOYALTY VIEW ================= */
          !isLoggedIn ? (
            renderSignInRequired(
              'VIP Loyalty Club',
              'Sign in or register to access your loyalty point balance, view tier multipliers, and claim exclusive point-back checkout coupons.',
              <Crown className="w-8 h-8 text-purple-600" />
            )
          ) : (
            <LoyaltyDashboard
              user={user}
              onToggleSubscription={handleToggleSubscription}
              onAddDemoSpending={handleAddDemoSpending}
            />
          )
        ) : activeView === 'admin' ? (
          /* ================= INVENTORY ADMIN VIEW with RBAC GUARD ================= */
          !isLoggedIn ? (
            renderSignInRequired(
              'Administrator Vault',
              'Authorized personnel only. Authenticate to manage catalog prices, fabric specifications, and marketing campaigns.',
              <Lock className="w-8 h-8 text-blue-600" />
            )
          ) : user.role !== 'Administrator' ? (
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-lg mx-auto text-center space-y-6 shadow-sm my-12 animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-lg text-neutral-900 font-display">Administrator Access Denied</h2>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  This system manages sensitive apparel specifications, pricing metrics, marketing banners CMS, and quarter revenues. Only users with authorized <strong>Administrator</strong> credentials may enter.
                </p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 text-left text-xs space-y-2">
                <span className="font-bold text-neutral-700 block">💡 How to authenticate for simulation:</span>
                <p className="text-neutral-500 leading-relaxed">
                  1. Go to the <strong className="cursor-pointer text-blue-600 underline" onClick={() => setActiveView('profile')}>User Account (အကောင့်)</strong> dashboard view.
                  <br />
                  2. Scroll to the <strong>Authorized Identity (RBAC) Switcher</strong> widget.
                  <br />
                  3. Select the <strong>"Marcus Chen (Administrator)"</strong> preset, which updates your user profile parameters immediately.
                </p>
              </div>
              <button
                onClick={() => setActiveView('profile')}
                className="w-full py-2.5 bg-neutral-950 text-white font-bold rounded-xl text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Go to User Account (အကောင့်)
              </button>
            </div>
          ) : (
            <AdminPortal
              products={products}
              onUpdateProducts={setProducts}
              banners={banners}
              onUpdateBanners={setBanners}
              faqs={faqs}
              onUpdateFaqs={setFaqs}
              customPages={customPages}
              onUpdateCustomPages={setCustomPages}
              auditLogs={auditLogs}
              onAddAuditLog={addAuditLog}
              orders={orders}
              onUpdateOrders={setOrders}
              storeSettings={storeSettings}
              onUpdateStoreSettings={setStoreSettings}
            />
          )
        ) : activeView === 'profile' ? (
          /* ================= USER PROFILE VIEW ================= */
          !isLoggedIn ? (
            renderSignInRequired(
              'User Account Dashboard',
              'View your personalized member profile, track shipping locations, and review transaction receipts in one central hub.',
              <User className="w-8 h-8 text-purple-600" />
            )
          ) : (
            <UserProfileDashboard
              user={user}
              orders={orders}
              auditLogs={auditLogs}
              onUpdateUser={setUser}
              onAddAuditLog={addAuditLog}
              onSignOut={() => {
                setIsLoggedIn(false);
                addAuditLog('Sign Out', `User ${user.email} signed out from session.`);
              }}
            />
          )
        ) : activeView === 'guides' ? (
          /* ================= SYSTEM GUIDE VIEW ================= */
          <GuidePortal
            onNavigateToView={setActiveView}
            userRole={user.role}
          />
        ) : activeView === 'page' ? (
          /* ================= CMS CUSTOM PAGE FULL VIEW ================= */
          <CustomPageView
            page={selectedPage || customPages[0]}
            storeSettings={storeSettings}
            onBack={() => {
              setActiveView('shop');
              setSelectedPage(null);
            }}
          />
        ) : (
          /* ================= AFFILIATE PORTAL VIEW ================= */
          !isLoggedIn ? (
            renderSignInRequired(
              'Affiliate Hub',
              'Create referral link campaigns, share tailored collections, and track click-through commissions with real-time analytics.',
              <Award className="w-8 h-8 text-purple-600" />
            )
          ) : (
            <AffiliatePortal
              products={products}
              partners={partners}
              sales={sales}
              onUpdatePartners={setPartners}
              onUpdateSales={setSales}
            />
          )
        )}
      </main>

      {/* ---------------- SHOPPING CART DRAWER ---------------- */}
      {isCartOpen && (
        <CartDrawer
          cart={cart}
          user={user}
          partners={partners}
          products={products}
          onUpdateCart={setCart}
          onUpdateUser={setUser}
          onUpdateProducts={setProducts}
          onAddOrder={(ord) => setOrders(prev => [ord, ...prev])}
          onAddReferredSale={(sl) => setSales(prev => [sl, ...prev])}
          onUpdatePartners={setPartners}
          onClose={() => setIsCartOpen(false)}
          initialRefCode={initialRefCode}
          isLoggedIn={isLoggedIn}
          onSignInClick={() => {
            setIsCartOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {/* ---------------- PERSONALIZED REWARD POPUP ---------------- */}
      <DiscountPopup
        viewCount={viewCount}
        wishlistCount={wishlist.length}
        onClaimPoints={handleClaimPoints}
      />

      {/* ---------------- BRAND FOOTER ---------------- */}
      <footer className="bg-neutral-950 text-neutral-400 py-10 mt-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-900">
          
          {/* Column 1: Logo & Dynamic Footer Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {storeSettings.logoImage ? (
                <img src={storeSettings.logoImage} alt={storeSettings.logoText} className="h-8 max-w-[150px] object-contain rounded" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-xl font-black tracking-widest text-purple-500 font-display">{storeSettings.logoText}</span>
              )}
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-light">
              {storeSettings.footerStory}
            </p>
          </div>

          {/* Column 2: Interactive Custom Corporate Pages Link Directory */}
          <div className="space-y-3">
            <span className="block font-bold text-neutral-200 text-xs uppercase tracking-wider">Helpful Information</span>
            <div className="space-y-2 flex flex-col items-start">
              {customPages.filter(p => p.isActive).map(page => (
                <button
                  key={page.id}
                  onClick={() => {
                    setSelectedPage(page);
                    setActiveView('page');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-xs text-neutral-400 cursor-pointer bg-transparent border-none p-0 text-left font-light"
                >
                  • {page.title}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Promo / Brand Photos CMS Preview */}
          <div className="space-y-3">
            <span className="block font-bold text-neutral-200 text-xs uppercase tracking-wider">Campaign Showroom</span>
            <div className="grid grid-cols-2 gap-3">
              {storeSettings.brandPromoPhoto1 && (
                <img
                  src={storeSettings.brandPromoPhoto1}
                  alt="Promo Lookbook 1"
                  className="w-full h-16 object-cover rounded-xl border border-neutral-800 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              )}
              {storeSettings.brandPromoPhoto2 && (
                <img
                  src={storeSettings.brandPromoPhoto2}
                  alt="Promo Lookbook 2"
                  className="w-full h-16 object-cover rounded-xl border border-neutral-800 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

        </div>

        {/* Copyright and Links footer bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[11px] text-neutral-500 font-light font-sans text-center md:text-left">
            {storeSettings.footerCopyright}
          </span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider font-display text-neutral-400">
            <button
              onClick={() => { setActiveView('shop'); setSelectedProduct(null); }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Shop Catalog
            </button>
            <button
              onClick={() => setActiveView('loyalty')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              VIP Loyalty
            </button>
            <button
              onClick={() => setActiveView('guides')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Guides
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Account
            </button>
            <button
              onClick={() => {
                setActiveView('shop');
                setTimeout(() => {
                  document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </div>
        </div>
      </footer>

      {/* ---------------- LOGIN DIALOG MODAL POPUP ---------------- */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl">
            {/* Close button inside modal container */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 z-50 p-2.5 bg-white/80 hover:bg-white text-slate-800 hover:text-black rounded-full shadow-lg border border-slate-100 transition-all cursor-pointer hover:scale-105"
              title="Close Authentication"
            >
              <X className="w-5 h-5" />
            </button>
            <LoginForm
              onLoginSuccess={(authenticatedUser) => {
                setUser(authenticatedUser);
                setIsLoggedIn(true);
                setIsLoginModalOpen(false);
                // Log entry
                const newLog = {
                  id: `log-${Date.now()}`,
                  timestamp: new Date().toISOString(),
                  action: 'Sign In',
                  userEmail: authenticatedUser.email,
                  details: `Securely authenticated via separate login popup. Role: ${authenticatedUser.role}.`
                };
                setAuditLogs(prev => [newLog, ...prev]);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
