import React, { useState } from 'react';
import { Product, Category, Size, Fit, Color, Banner, FAQItem, CustomPage, AuditLog, Order, StoreSettings } from '../types';
import {
  Package, AlertTriangle, Plus, Check, RefreshCw, Trash2, Edit2, ShieldAlert,
  Image as ImageIcon, HelpCircle, FileText, BarChart3, History, ToggleLeft, ToggleRight,
  TrendingUp, ShoppingBag, DollarSign, Award, ArrowUpRight, Upload, X, Percent, Sparkles, Activity, Settings
} from 'lucide-react';

interface AdminPortalProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  banners: Banner[];
  onUpdateBanners: (banners: Banner[]) => void;
  faqs: FAQItem[];
  onUpdateFaqs: (faqs: FAQItem[]) => void;
  customPages: CustomPage[];
  onUpdateCustomPages: (pages: CustomPage[]) => void;
  auditLogs: AuditLog[];
  onAddAuditLog: (action: string, details: string) => void;
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  storeSettings: StoreSettings;
  onUpdateStoreSettings: (settings: StoreSettings) => void;
}

export default function AdminPortal({
  products,
  onUpdateProducts,
  banners,
  onUpdateBanners,
  faqs,
  onUpdateFaqs,
  customPages,
  onUpdateCustomPages,
  auditLogs,
  onAddAuditLog,
  orders,
  onUpdateOrders,
  storeSettings,
  onUpdateStoreSettings
}: AdminPortalProps) {
  // Navigation within the admin panel
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'banners' | 'faqs' | 'pages' | 'analytics' | 'audit' | 'settings'>('inventory');

  // Local admin notification feedback banner
  const [adminNotification, setAdminNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setAdminNotification({ type, message });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setAdminNotification(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // Inventory editing / creation states
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Add Product Form state (dual-purpose for edit or create)
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<Category>('T-Shirts');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodVip, setProdVip] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(['M', 'L']);
  const [selectedFits, setSelectedFits] = useState<Fit[]>(['Regular']);
  const [selectedColors, setSelectedColors] = useState<Color[]>(['Black']);
  const [prodIsOnSale, setProdIsOnSale] = useState(false);
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodIsNewArrival, setProdIsNewArrival] = useState(false);
  const [prodImage, setProdImage] = useState('');
  const [prodHoverImage, setProdHoverImage] = useState('');
  const [prodGalleryImages, setProdGalleryImages] = useState<string[]>([]);
  const [prodFabricMaterial, setProdFabricMaterial] = useState('');
  const [prodFabricDensity, setProdFabricDensity] = useState('');
  const [prodStitchCount, setProdStitchCount] = useState('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  // Banners CMS Form State
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerLinkText, setBannerLinkText] = useState('Explore Style');

  // FAQs CMS Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('General');

  // Pages CMS Form State
  const [pageTitle, setPageTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Store Settings Form States
  const [logoText, setLogoText] = useState(storeSettings.logoText);
  const [logoImage, setLogoImage] = useState(storeSettings.logoImage || '');
  const [announcementText, setAnnouncementText] = useState(storeSettings.announcementText);
  const [announcementBgColor, setAnnouncementBgColor] = useState(storeSettings.announcementBgColor);
  const [announcementTextColor, setAnnouncementTextColor] = useState(storeSettings.announcementTextColor);
  
  const [menuShopText, setMenuShopText] = useState(storeSettings.menuShopText);
  const [menuLoyaltyText, setMenuLoyaltyText] = useState(storeSettings.menuLoyaltyText);
  const [menuAffiliateText, setMenuAffiliateText] = useState(storeSettings.menuAffiliateText);
  const [menuGuidesText, setMenuGuidesText] = useState(storeSettings.menuGuidesText);
  const [menuAccountText, setMenuAccountText] = useState(storeSettings.menuAccountText);
  const [menuInventoryText, setMenuInventoryText] = useState(storeSettings.menuInventoryText);

  const [footerStory, setFooterStory] = useState(storeSettings.footerStory);
  const [footerCopyright, setFooterCopyright] = useState(storeSettings.footerCopyright);

  const [brandPromoPhoto1, setBrandPromoPhoto1] = useState(storeSettings.brandPromoPhoto1 || '');
  const [brandPromoPhoto2, setBrandPromoPhoto2] = useState(storeSettings.brandPromoPhoto2 || '');

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreSettings = {
      logoText,
      logoImage: logoImage.trim() || undefined,
      announcementText,
      announcementBgColor,
      announcementTextColor,
      menuShopText,
      menuLoyaltyText,
      menuAffiliateText,
      menuGuidesText,
      menuAccountText,
      menuInventoryText,
      footerStory,
      footerCopyright,
      brandPromoPhoto1: brandPromoPhoto1.trim() || undefined,
      brandPromoPhoto2: brandPromoPhoto2.trim() || undefined
    };
    onUpdateStoreSettings(updated);
    onAddAuditLog('CMS Settings Updated', 'Saved new global header, footer, menu translations, and showroom campaign photos.');
    showNotification('success', 'Global Store Settings updated successfully!');
  };

  // Low Stock Config
  const lowStockThreshold = 15;
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold);
  const outOfStockItems = products.filter(p => p.stock === 0);

  // ---------------- INVENTORY CRUD ----------------
  const handleStartEditProduct = (p: Product) => {
    setEditingId(p.id);
    setIsAddingProduct(true); // Open the apparel builder form
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price.toString());
    setProdStock(p.stock.toString());
    setProdDescription(p.description);
    setProdVip(p.isVipEarlyAccess);
    setSelectedSizes(p.sizes);
    setSelectedFits(p.fits);
    setSelectedColors(p.colors);
    setProdIsOnSale(p.isOnSale || false);
    setProdOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setProdIsNewArrival(p.isNewArrival || false);
    setProdImage(p.image || '');
    setProdHoverImage(p.hoverImage || '');
    setProdGalleryImages(p.galleryImages || []);
    setProdFabricMaterial(p.fabricMaterial || '');
    setProdFabricDensity(p.fabricDensity || '');
    setProdStitchCount(p.stitchCount || '');
  };

  const handleResetProductForm = () => {
    setEditingId(null);
    setIsAddingProduct(false);
    setProdName('');
    setProdCategory('T-Shirts');
    setProdPrice('');
    setProdStock('');
    setProdDescription('');
    setProdVip(false);
    setSelectedSizes(['M', 'L']);
    setSelectedFits(['Regular']);
    setSelectedColors(['Black']);
    setProdIsOnSale(false);
    setProdOriginalPrice('');
    setProdIsNewArrival(false);
    setProdImage('');
    setProdHoverImage('');
    setProdGalleryImages([]);
    setProdFabricMaterial('');
    setProdFabricDensity('');
    setProdStitchCount('');
  };

  const handleToggleVip = (id: string) => {
    const orig = products.find(p => p.id === id);
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, isVipEarlyAccess: !p.isVipEarlyAccess };
      }
      return p;
    });
    onUpdateProducts(updated);

    if (orig) {
      onAddAuditLog(
        'Product VIP Toggle',
        `Toggled Early VIP Release on ${orig.name} to ${!orig.isVipEarlyAccess}.`
      );
    }
  };

  const handleDeleteProduct = (id: string) => {
    const orig = products.find(p => p.id === id);
    if (confirmDeleteId === id) {
      onUpdateProducts(products.filter(p => p.id !== id));
      onAddAuditLog(
        'Product Deleted',
        `Removed product: ${orig?.name || id} from core directory.`
      );
      setConfirmDeleteId(null);
      showNotification('success', `Product "${orig?.name || id}" removed successfully.`);
    } else {
      setConfirmDeleteId(id);
      // Automatically reset confirmation after 4 seconds
      setTimeout(() => {
        setConfirmDeleteId(prev => prev === id ? null : prev);
      }, 4000);
    }
  };

  const handleSaveOrAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodStock || !prodDescription) {
      showNotification('warning', 'Please fill out all apparel specifications.');
      return;
    }

    const defaultImage = prodCategory === 'T-Shirts'
      ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800';

    const defaultHover = prodCategory === 'T-Shirts'
      ? 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
      : 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800';

    const finalImage = prodImage.trim() || defaultImage;
    const finalHover = prodHoverImage.trim() || defaultHover;

    if (editingId) {
      // EDIT MODE
      const updated = products.map(p => {
        if (p.id === editingId) {
          return {
            ...p,
            name: prodName,
            description: prodDescription,
            price: parseFloat(prodPrice),
            category: prodCategory,
            image: finalImage,
            hoverImage: finalHover,
            sizes: selectedSizes,
            fits: selectedFits,
            colors: selectedColors,
            stock: parseInt(prodStock),
            isVipEarlyAccess: prodVip,
            isOnSale: prodIsOnSale,
            originalPrice: prodIsOnSale && prodOriginalPrice ? parseFloat(prodOriginalPrice) : undefined,
            isNewArrival: prodIsNewArrival,
            galleryImages: prodGalleryImages,
            fabricMaterial: prodFabricMaterial || undefined,
            fabricDensity: prodFabricDensity || undefined,
            stitchCount: prodStitchCount || undefined
          };
        }
        return p;
      });

      onUpdateProducts(updated);
      onAddAuditLog(
        'Product Updated',
        `Adjusted parameters of garment "${prodName}" via Etsy-Style editor.`
      );
    } else {
      // ADD MODE
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: prodName,
        description: prodDescription,
        price: parseFloat(prodPrice),
        category: prodCategory,
        image: finalImage,
        hoverImage: finalHover,
        sizes: selectedSizes,
        fits: selectedFits,
        colors: selectedColors,
        stock: parseInt(prodStock),
        isVipEarlyAccess: prodVip,
        isOnSale: prodIsOnSale,
        originalPrice: prodIsOnSale && prodOriginalPrice ? parseFloat(prodOriginalPrice) : undefined,
        isNewArrival: prodIsNewArrival,
        galleryImages: prodGalleryImages,
        reviews: [],
        fabricMaterial: prodFabricMaterial || undefined,
        fabricDensity: prodFabricDensity || undefined,
        stitchCount: prodStitchCount || undefined
      };

      onUpdateProducts([...products, newProduct]);
      onAddAuditLog(
        'Product Created',
        `Registered new ${prodCategory} garment: "${prodName}" specified with ${prodStock} units in stock.`
      );
    }

    handleResetProductForm();
  };

  // ---------------- BANNERS CMS ----------------
  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle || !bannerSubtitle) {
      showNotification('warning', 'Please complete banner heading details.');
      return;
    }

    const newBanner: Banner = {
      id: `banner-${Date.now()}`,
      title: bannerTitle,
      subtitle: bannerSubtitle,
      image: bannerImage.trim() || 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200',
      isActive: true,
      linkText: bannerLinkText
    };

    onUpdateBanners([...banners, newBanner]);
    onAddAuditLog('CMS Banner Created', `Registered new promo campaign: "${bannerTitle}"`);

    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImage('');
    setBannerLinkText('Explore Style');
  };

  const handleToggleBannerActive = (id: string) => {
    const updated = banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b);
    onUpdateBanners(updated);
    onAddAuditLog('CMS Banner Toggled', `Toggled banner campaign ID: ${id}`);
  };

  const handleDeleteBanner = (id: string) => {
    onUpdateBanners(banners.filter(b => b.id !== id));
    onAddAuditLog('CMS Banner Deleted', `Removed banner campaign ID: ${id}`);
  };

  // ---------------- FAQs CMS ----------------
  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      showNotification('warning', 'Please complete FAQ question/answer.');
      return;
    }

    if (editingFaqId) {
      const updated = faqs.map(f => {
        if (f.id === editingFaqId) {
          return { ...f, question: faqQuestion, answer: faqAnswer, category: faqCategory };
        }
        return f;
      });
      onUpdateFaqs(updated);
      onAddAuditLog('CMS FAQ Updated', `Updated help topic: "${faqQuestion.slice(0, 30)}..."`);
      setEditingFaqId(null);
    } else {
      const newFAQ: FAQItem = {
        id: `faq-${Date.now()}`,
        question: faqQuestion,
        answer: faqAnswer,
        category: faqCategory
      };
      onUpdateFaqs([...faqs, newFAQ]);
      onAddAuditLog('CMS FAQ Created', `Registered new help topic: "${faqQuestion.slice(0, 30)}..."`);
    }

    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleStartEditFAQ = (f: FAQItem) => {
    setEditingFaqId(f.id);
    setFaqQuestion(f.question);
    setFaqAnswer(f.answer);
    setFaqCategory(f.category);
  };

  const handleDeleteFAQ = (id: string) => {
    if (editingFaqId === id) setEditingFaqId(null);
    onUpdateFaqs(faqs.filter(f => f.id !== id));
    onAddAuditLog('CMS FAQ Deleted', `Removed help topic ID: ${id}`);
  };

  // ---------------- PAGES CMS ----------------
  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageTitle || !pageSlug || !pageContent) {
      showNotification('warning', 'Please complete custom page specifications.');
      return;
    }

    const normalizedSlug = pageSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');

    if (editingPageId) {
      const updated = customPages.map(p => {
        if (p.id === editingPageId) {
          return { ...p, title: pageTitle, slug: normalizedSlug, content: pageContent };
        }
        return p;
      });
      onUpdateCustomPages(updated);
      onAddAuditLog('CMS Custom Page Updated', `Updated custom page: "${pageTitle}" under slug: /page/${normalizedSlug}`);
      setEditingPageId(null);
    } else {
      const newPage: CustomPage = {
        id: `page-${Date.now()}`,
        title: pageTitle,
        slug: normalizedSlug,
        content: pageContent,
        isActive: true
      };
      onUpdateCustomPages([...customPages, newPage]);
      onAddAuditLog('CMS Custom Page Created', `Registered static page: "${pageTitle}" under slug: /page/${normalizedSlug}`);
    }

    setPageTitle('');
    setPageSlug('');
    setPageContent('');
  };

  const handleStartEditPage = (p: CustomPage) => {
    setEditingPageId(p.id);
    setPageTitle(p.title);
    setPageSlug(p.slug);
    setPageContent(p.content);
  };

  const handleDeletePage = (id: string) => {
    if (editingPageId === id) setEditingPageId(null);
    onUpdateCustomPages(customPages.filter(p => p.id !== id));
    onAddAuditLog('CMS Page Deleted', `Removed custom page ID: ${id}`);
  };

  // ---------------- ORDERS FULFILLMENT HANDLERS ----------------
  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered') => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o);
    onUpdateOrders(updated);
    onAddAuditLog(
      'Order Status Updated',
      `Order ${orderId} shipment status set to ${nextStatus}.`
    );
    showNotification('success', `Order ${orderId} status updated to "${nextStatus}" successfully.`);
  };

  const handleGenerateAIDescription = async () => {
    if (!prodName) {
      showNotification('warning', 'Please enter a product name first to let Gemini understand the item.');
      return;
    }
    setIsGeneratingDesc(true);
    try {
      const res = await fetch('/api/gemini/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prodName,
          category: prodCategory,
          price: prodPrice || '0.00',
          sizes: selectedSizes,
          fits: selectedFits,
          colors: selectedColors,
          fabricMaterial: prodFabricMaterial,
          fabricDensity: prodFabricDensity
        })
      });
      const data = await res.json();
      if (data.description) {
        setProdDescription(data.description);
        showNotification('success', 'AI Product description generated successfully using Gemini!');
        if (data.warning) {
          console.warn(data.warning);
        }
      } else {
        showNotification('error', data.error || 'Failed to generate description.');
      }
    } catch (err: any) {
      console.error(err);
      showNotification('error', 'Error calling backend Gemini API.');
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  // ---------------- STATS ANALYTICS CALCULATIONS ----------------
  // Real orders calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const pointsIssuedCount = orders.reduce((sum, o) => sum + Math.floor(o.total), 0);

  // Hardcoded default seed baseline to prevent empty dashboards on initial loads
  const baselineRev = 14350.00;
  const baselineOrders = 112;
  const finalRev = baselineRev + totalRevenue;
  const finalOrders = baselineOrders + totalOrdersCount;
  const finalAvgValue = finalOrders > 0 ? finalRev / finalOrders : 128.00;

  return (
    <div id="admin-portal-wrapper" className="space-y-8 animate-fade-in text-neutral-900">
      
      {/* Dynamic feedback notification banner */}
      {adminNotification && (
        <div className={`p-4 rounded-2xl border flex justify-between items-center text-xs font-bold transition-all animate-fade-in ${
          adminNotification.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
            : adminNotification.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800 shadow-xs'
            : 'bg-amber-50 border-amber-200 text-amber-800 shadow-xs'
        }`}>
          <div className="flex items-center gap-2">
            {adminNotification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            )}
            <span>{adminNotification.message}</span>
          </div>
          <button
            onClick={() => setAdminNotification(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-neutral-400 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      
      {/* Upper Navigation Tabs */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-4 shadow-sm flex flex-wrap gap-2 text-xs font-bold text-neutral-500">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'inventory' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <Package className="w-4 h-4" /> Store Apparel Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-emerald-600 animate-pulse" /> Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'banners' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Hero Banners CMS ({banners.length})
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'faqs' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Store FAQs CMS ({faqs.length})
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'pages' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <FileText className="w-4 h-4" /> Static Pages CMS ({customPages.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'analytics' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Store Revenue Analytics
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'audit' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <History className="w-4 h-4" /> Enterprise Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all ${
            activeTab === 'settings' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 hover:text-black'
          }`}
        >
          <Settings className="w-4 h-4 text-purple-600" /> Header & Footer CMS
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: INVENTORY MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          
          {/* Key Inventory KPI Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Total Directory Items</span>
                <span className="block mt-1 font-mono text-2xl font-bold">{products.length} Designs</span>
              </div>
              <span className="p-3 bg-neutral-100 text-neutral-800 rounded-xl">
                <Package className="w-5 h-5" />
              </span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Low Stock Warnings (≤ 15)</span>
                <span className={`block mt-1 font-mono text-2xl font-bold ${lowStockItems.length > 0 ? 'text-blue-600' : 'text-neutral-500'}`}>
                  {lowStockItems.length} Apparel
                </span>
              </div>
              <span className={`p-3 rounded-xl ${lowStockItems.length > 0 ? 'bg-blue-50 text-blue-600' : 'bg-neutral-50 text-neutral-400'}`}>
                <AlertTriangle className="w-5 h-5" />
              </span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Out of Stock Lines</span>
                <span className={`block mt-1 font-mono text-2xl font-bold ${outOfStockItems.length > 0 ? 'text-red-600' : 'text-neutral-500'}`}>
                  {outOfStockItems.length} Products
                </span>
              </div>
              <span className={`p-3 rounded-xl ${outOfStockItems.length > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-neutral-50 text-neutral-400'}`}>
                <ShieldAlert className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Inline Product Creator Form */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100 mb-6">
              <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
                {editingId ? (
                  <span className="flex items-center gap-2 text-purple-700">
                    <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" /> Etsy Apparel Editor: Edit "{prodName}"
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600" /> Add New Tailored Apparel
                  </span>
                )}
              </h3>
              <button
                onClick={() => {
                  if (isAddingProduct) {
                    handleResetProductForm();
                  } else {
                    setIsAddingProduct(true);
                  }
                }}
                className={`py-1.5 px-4 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  isAddingProduct ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                {isAddingProduct ? 'Close Studio Editor' : 'Open Design Studio'}
              </button>
            </div>

            {isAddingProduct && (
              <form onSubmit={handleSaveOrAddProduct} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Garment Specs & Pricing Studio */}
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-[10px] text-purple-600 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5" /> Garment Specs
                      </h4>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Garment Title</label>
                        <input
                          type="text"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white focus:border-purple-600 focus:outline-none font-medium"
                          placeholder="e.g., Slim Tailored Chino"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Apparel Category</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value as Category)}
                          className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white focus:border-purple-600 focus:outline-none font-medium"
                        >
                          <option value="T-Shirts">T-Shirts</option>
                          <option value="Pants">Pants</option>
                          <option value="Hoodies">Hoodies</option>
                          <option value="Jackets">Jackets</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Dresses">Dresses</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block mb-1 font-semibold text-neutral-700">Retail Price ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white font-mono focus:border-purple-600 focus:outline-none"
                            placeholder="39.00"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 font-semibold text-neutral-700">Stock Count</label>
                          <input
                            type="number"
                            value={prodStock}
                            onChange={(e) => setProdStock(e.target.value)}
                            className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white font-mono focus:border-purple-600 focus:outline-none"
                            placeholder="50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ETSY PRICING STUDIO (SALE & DISCOUNT) */}
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/70 space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-[10px] text-amber-700 flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-amber-600" /> Pricing Promo Studio
                      </h4>
                      <label className="flex items-center gap-2 cursor-pointer select-none py-1 font-semibold text-neutral-700">
                        <input
                          type="checkbox"
                          checked={prodIsOnSale}
                          onChange={(e) => setProdIsOnSale(e.target.checked)}
                          className="rounded border-neutral-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                        />
                        <span>Enable Promo Sale/Discount</span>
                      </label>

                      {prodIsOnSale && (
                        <div className="space-y-3 pt-1 animate-fadeIn">
                          <div>
                            <label className="block mb-1 font-semibold text-amber-900">Original Retail Price ($)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={prodOriginalPrice}
                              onChange={(e) => setProdOriginalPrice(e.target.value)}
                              className="w-full p-2.5 border border-amber-200 rounded-xl bg-white font-mono focus:border-amber-600 focus:outline-none"
                              placeholder="e.g., 55.00"
                            />
                            <p className="text-[10px] text-amber-600 mt-1">The pre-sale retail price used to render discount percentage.</p>
                          </div>

                          {parseFloat(prodPrice) > 0 && parseFloat(prodOriginalPrice) > parseFloat(prodPrice) && (
                            <div className="p-2.5 bg-amber-100 border border-amber-200 rounded-xl text-amber-900 font-bold flex items-center justify-between">
                              <span>Estimated Discount:</span>
                              <span className="font-mono text-xs bg-amber-600 text-white px-2 py-0.5 rounded-md">
                                {Math.round((1 - parseFloat(prodPrice) / parseFloat(prodOriginalPrice)) * 100)}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Cuts, Sizing & Customization */}
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-4">
                      <h4 className="font-bold uppercase tracking-wider text-[10px] text-purple-600 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" /> Tailoring Matrix
                      </h4>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Standard Sizes Available</label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(['XS', 'S', 'M', 'L', 'XL'] as Size[]).map(sz => {
                            const has = selectedSizes.includes(sz);
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setSelectedSizes(prev => prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz])}
                                className={`py-1 px-2.5 border rounded-lg font-bold transition-all ${
                                  has ? 'bg-purple-600 text-white border-purple-600 shadow-xs' : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Tailoring Fits</label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(['Slim', 'Regular', 'Relaxed', 'Athletic'] as Fit[]).map(ft => {
                            const has = selectedFits.includes(ft);
                            return (
                              <button
                                key={ft}
                                type="button"
                                onClick={() => setSelectedFits(prev => prev.includes(ft) ? prev.filter(f => f !== ft) : [...prev, ft])}
                                className={`py-1 px-2 rounded-lg font-bold transition-all ${
                                  has ? 'bg-purple-600 text-white border-purple-600 shadow-xs' : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                }`}
                              >
                                {ft}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Color Palette Tone</label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(['Black', 'White', 'Navy', 'Olive', 'Beige', 'Gray'] as Color[]).map(cl => {
                            const has = selectedColors.includes(cl);
                            return (
                              <button
                                key={cl}
                                type="button"
                                onClick={() => setSelectedColors(prev => prev.includes(cl) ? prev.filter(c => c !== cl) : [...prev, cl])}
                                className={`py-1 px-2 rounded-lg font-bold transition-all ${
                                  has ? 'bg-purple-600 text-white border-purple-600 shadow-xs' : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                }`}
                              >
                                {cl}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-[10px] text-purple-600 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Campaign Badges
                      </h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none font-semibold text-neutral-700">
                          <input
                            type="checkbox"
                            checked={prodVip}
                            onChange={(e) => setProdVip(e.target.checked)}
                            className="rounded border-neutral-300 text-purple-600 focus:ring-purple-500 w-4.5 h-4.5"
                          />
                          <span className="flex items-center gap-1">★ Release as Early VIP Premium Only</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none font-semibold text-neutral-700">
                          <input
                            type="checkbox"
                            checked={prodIsNewArrival}
                            onChange={(e) => setProdIsNewArrival(e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 w-4.5 h-4.5"
                          />
                          <span className="flex items-center gap-1">✨ Release with "New Arrival" Badging</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Description & Photo Studio */}
                  <div className="space-y-4">
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold uppercase tracking-wider text-[10px] text-purple-600 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Etsy Detailed Description & AI Studio
                        </h4>
                        <button
                          type="button"
                          onClick={handleGenerateAIDescription}
                          disabled={isGeneratingDesc}
                          className="text-[10px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 bg-purple-50 hover:bg-purple-100 py-1 px-2.5 border border-purple-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className={`w-3 h-3 ${isGeneratingDesc ? 'animate-spin' : ''}`} />
                          {isGeneratingDesc ? 'Generating...' : 'Wizard AI Copywriter'}
                        </button>
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-neutral-700">Detail Garment Description</label>
                        <textarea
                          value={prodDescription}
                          onChange={(e) => setProdDescription(e.target.value)}
                          rows={4}
                          className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white focus:border-purple-600 focus:outline-none font-medium resize-none text-[11px]"
                          placeholder="Detail the fabric blend ratio, heavy cotton weave density, smart-stitching, care tags, and vintage aesthetic details..."
                        />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-neutral-200/60">
                        <h5 className="font-bold text-[10px] text-neutral-400 uppercase tracking-wider">Garment Technical Spec Sheets</h5>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px]">
                          <div>
                            <label className="block mb-1 font-semibold text-neutral-600">Fabric Material</label>
                            <input
                              type="text"
                              value={prodFabricMaterial}
                              onChange={(e) => setProdFabricMaterial(e.target.value)}
                              placeholder="e.g. 100% Organic Cotton"
                              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-purple-600 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-semibold text-neutral-600">Fabric Density</label>
                            <input
                              type="text"
                              value={prodFabricDensity}
                              onChange={(e) => setProdFabricDensity(e.target.value)}
                              placeholder="e.g. 240 GSM"
                              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-purple-600 bg-white"
                            />
                          </div>
                          <div>
                            <label className="block mb-1 font-semibold text-neutral-600">Stitch Density</label>
                            <input
                              type="text"
                              value={prodStitchCount}
                              onChange={(e) => setProdStitchCount(e.target.value)}
                              placeholder="e.g. 22 Stitches per Inch"
                              className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-purple-600 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCT PHOTO STUDIO */}
                    <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-[10px] text-purple-600 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" /> Product Photo Studio
                      </h4>

                      {/* Primary Photo */}
                      <div className="space-y-1">
                        <label className="block font-semibold text-neutral-700">Primary Product Photo</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={prodImage}
                            onChange={(e) => setProdImage(e.target.value)}
                            placeholder="URL link to primary picture..."
                            className="flex-1 p-2 border border-neutral-200 rounded-xl bg-white text-[10px] focus:outline-none focus:border-purple-600"
                          />
                          <label className="p-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-700 font-bold cursor-pointer transition-colors flex items-center justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onloadend = () => setProdImage(r.result as string);
                                  r.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {prodImage && (
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-neutral-200 mt-1">
                            <img src={prodImage} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setProdImage('')}
                              className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-black text-white rounded-full p-0.5 cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Hover Photo */}
                      <div className="space-y-1">
                        <label className="block font-semibold text-neutral-700">Hover Transition Photo</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={prodHoverImage}
                            onChange={(e) => setProdHoverImage(e.target.value)}
                            placeholder="URL link to hover detail picture..."
                            className="flex-1 p-2 border border-neutral-200 rounded-xl bg-white text-[10px] focus:outline-none focus:border-purple-600"
                          />
                          <label className="p-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-purple-700 font-bold cursor-pointer transition-colors flex items-center justify-center">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onloadend = () => setProdHoverImage(r.result as string);
                                  r.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {prodHoverImage && (
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-neutral-200 mt-1">
                            <img src={prodHoverImage} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setProdHoverImage('')}
                              className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-black text-white rounded-full p-0.5 cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Extra Gallery Photos */}
                      <div className="space-y-1">
                        <label className="block font-semibold text-neutral-700">Etsy Photo Gallery (Add Multiple Additional Photos)</label>
                        <div className="flex items-center gap-2 bg-purple-50/50 p-2 border border-dashed border-purple-200 rounded-xl">
                          <span className="text-[10px] text-neutral-500 flex-1">Pick and upload secondary photos:</span>
                          <label className="py-1 px-3 bg-purple-600 text-white font-bold rounded-lg cursor-pointer hover:bg-purple-700 transition-colors flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" /> Upload File
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files) {
                                  Array.from(files).forEach((f: any) => {
                                    const r = new FileReader();
                                    r.onloadend = () => {
                                      setProdGalleryImages(prev => [...prev, r.result as string]);
                                    };
                                    r.readAsDataURL(f);
                                  });
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {prodGalleryImages.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {prodGalleryImages.map((imgUrl, index) => (
                              <div key={index} className="relative w-11 h-14 rounded-lg overflow-hidden border border-neutral-200 shadow-xs">
                                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setProdGalleryImages(prev => prev.filter((_, i) => i !== index))}
                                  className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5 cursor-pointer shadow"
                                >
                                  <X className="w-2 h-2" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={handleResetProductForm}
                    className="py-2 px-5 bg-neutral-100 hover:bg-neutral-200 rounded-xl font-bold cursor-pointer"
                  >
                    Cancel Design
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-6 bg-purple-600 text-white hover:bg-purple-700 rounded-xl font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" /> {editingId ? 'Save Specs & Update' : 'Publish to Etsy Catalog'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Real-time Inventory Table */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h3 className="font-bold font-display text-base text-neutral-950">Current Collection Directory</h3>
              <span className="text-xs font-mono text-neutral-400">Editable parameters: Stock & Price</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                    <th className="py-3 px-4">Apparel Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-center">Stock Level</th>
                    <th className="py-3 px-4 text-center">VIP Release</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-neutral-700 divide-y divide-neutral-100">
                  {products.map(p => {
                    const isEditing = editingId === p.id;
                    const isLow = p.stock > 0 && p.stock <= lowStockThreshold;
                    const isOut = p.stock === 0;

                    return (
                      <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded-lg border border-neutral-100"
                          />
                          <div>
                            <h4 className="font-bold text-neutral-900 leading-tight">{p.name}</h4>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{p.id}</p>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-medium">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-mono font-bold text-neutral-900">${p.price.toFixed(2)}</span>
                            {p.isOnSale && p.originalPrice && (
                              <div className="flex gap-1 items-center">
                                <span className="font-mono text-[10px] text-neutral-400 line-through">${p.originalPrice.toFixed(2)}</span>
                                <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1 rounded">Sale</span>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className={`font-mono font-bold ${isOut ? 'text-red-600' : isLow ? 'text-blue-600' : 'text-neutral-800'}`}>
                              {p.stock}
                            </span>
                            <span className="text-[9px] mt-0.5 uppercase tracking-wider font-semibold">
                              {isOut ? (
                                <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Out of stock</span>
                              ) : isLow ? (
                                <span className="text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">Low Stock</span>
                              ) : (
                                <span className="text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">Healthy</span>
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleToggleVip(p.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide cursor-pointer transition-all ${
                                p.isVipEarlyAccess
                                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                  : 'bg-neutral-100 text-neutral-400 border border-transparent hover:border-neutral-300'
                              }`}
                            >
                              {p.isVipEarlyAccess ? '★ VIP' : 'Regular'}
                            </button>
                            {p.isNewArrival && (
                              <span className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-extrabold uppercase">✨ New</span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleStartEditProduct(p)}
                              className="p-1.5 text-neutral-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                              title="Edit in Etsy Studio"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                                confirmDeleteId === p.id
                                  ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                                  : 'text-red-500 hover:bg-red-50'
                              }`}
                              title={confirmDeleteId === p.id ? "Click again to confirm delete" : "Delete Product"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: ORDERS FULFILLMENT MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" /> Customer Order Shipment & Fulfillment Hub
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Monitor loyalty transactions, dispatch premium garments, assign real-time transit stages, and inspect affiliate-referred conversion attribution metrics.
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
                <ShoppingBag className="w-12 h-12 text-neutral-200 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-neutral-500">No client orders placed in this session yet</h4>
                <p className="text-[10px] text-neutral-400 mt-1">Simulate shopping in the storefront catalog to record a transaction.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => {
                  const currentStatus = ord.status || 'Processing';
                  return (
                    <div key={ord.id} className="border border-neutral-100 rounded-2xl overflow-hidden hover:border-neutral-200 transition-colors bg-neutral-50/10 animate-fade-in">
                      
                      {/* Order top banner */}
                      <div className="bg-neutral-50/50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-neutral-900 bg-neutral-100 py-1 px-2.5 rounded-lg">{ord.id}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">{ord.date}</span>
                            {ord.affiliateCode && (
                              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono">
                                Ref: {ord.affiliateCode}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 leading-snug">
                            Customer: <strong className="font-mono text-neutral-700">{ord.customerEmail || 'Guest'}</strong>
                          </div>
                        </div>

                        {/* Order status drop-down / action */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-left md:text-right">
                            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-semibold">Change Stage</span>
                            <select
                              value={currentStatus}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                              className="text-xs font-bold p-1.5 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-neutral-900 font-sans cursor-pointer"
                            >
                              <option value="Processing">Processing (ပြင်ဆင်နေဆဲ)</option>
                              <option value="Dispatched">Dispatched (ထွက်ခွာပြီး)</option>
                              <option value="In Transit">In Transit (လမ်းခရီးတွင်)</option>
                              <option value="Delivered">Delivered (ရောက်ရှိပြီး)</option>
                            </select>
                          </div>

                          <div className="h-10 w-px bg-neutral-200 hidden md:block" />

                          <div className="text-right">
                            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-semibold">Grand Total</span>
                            <span className="font-mono font-extrabold text-neutral-900 text-sm block">${ord.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order expanded info */}
                      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                        
                        {/* Column 1: Items list */}
                        <div className="lg:col-span-2 space-y-3">
                          <span className="block font-bold text-neutral-400 text-[10px] uppercase tracking-wider">Purchased Apparel Items ({ord.items.length})</span>
                          <div className="divide-y divide-neutral-100">
                            {ord.items.map((item, idx) => (
                              <div key={idx} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                                <div className="space-y-0.5">
                                  <h5 className="font-bold text-neutral-900 leading-snug">{item.name}</h5>
                                  <div className="flex gap-2 text-[10px] text-neutral-400 font-mono uppercase font-semibold">
                                    <span>Size: {item.size}</span>
                                    <span>•</span>
                                    <span>Fit: {item.fit}</span>
                                    <span>•</span>
                                    <span>Color: {item.color}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono text-neutral-500">{item.quantity} x ${item.price.toFixed(2)}</span>
                                  <span className="font-mono font-bold text-neutral-900 block">${(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Logistics & Points */}
                        <div className="bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 space-y-3 text-[11px] leading-relaxed">
                          <span className="block font-bold text-neutral-400 text-[10px] uppercase tracking-wider">Fulfillment Parameters</span>
                          
                          <div className="space-y-1.5">
                            <span className="block text-neutral-400">Delivery Address:</span>
                            <p className="font-semibold text-neutral-800">{ord.shippingAddress || 'Store Pickup (Yangon HQ)'}</p>
                          </div>

                          <div className="h-px bg-neutral-200/60" />

                          <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                            <div>
                              <span className="text-neutral-400 block">Subtotal:</span>
                              <span className="font-mono font-bold text-neutral-800">${ord.subtotal.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-neutral-400 block">Discount:</span>
                              <span className="font-mono font-bold text-red-600">-${ord.discount.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-neutral-400 block">Shipping fee:</span>
                              <span className="font-mono font-bold text-neutral-800">
                                {ord.shipping === 0 ? 'FREE' : `$${ord.shipping.toFixed(2)}`}
                              </span>
                            </div>
                            <div>
                              <span className="text-neutral-400 block">Points Earned:</span>
                              <span className="font-mono font-bold text-purple-600">+{ord.pointsEarned} Pts</span>
                            </div>
                          </div>

                          {ord.pointsRedeemed > 0 && (
                            <div className="pt-2 border-t border-dashed border-neutral-200 flex justify-between items-center text-[10px] text-amber-800 bg-amber-50/60 p-1.5 rounded">
                              <span className="font-semibold">Points Redeemed:</span>
                              <span className="font-mono font-bold">{ord.pointsRedeemed} Pts (-${(ord.pointsRedeemed / 100).toFixed(2)})</span>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: HERO BANNERS CMS */}
      {/* ========================================================= */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Form */}
          <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Plus className="w-4 h-4 text-blue-600" /> Register Promo Banner
            </h3>
            <form onSubmit={handleAddBanner} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Banner Heading</label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="e.g. Vintage Denim Collection"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Sub-heading Description</label>
                <textarea
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none resize-none"
                  placeholder="Sourced from genuine selvedge loomed shuttle crafts..."
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Campaign Image URL (Unsplash)</label>
                <input
                  type="text"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="Paste URL (leave blank for defaults)"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">CTA Button Text</label>
                <input
                  type="text"
                  value={bannerLinkText}
                  onChange={(e) => setBannerLinkText(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="Explore Style"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Register Banner Campaign
              </button>
            </form>
          </div>

          {/* Directory list */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm">Banner Campaigns Repository</h3>
            <p className="text-[11px] text-neutral-400">Toggle "Active" to switch display banners on the main storefront catalog catalogously.</p>
            
            <div className="space-y-4">
              {banners.map(b => (
                <div key={b.id} className="border border-neutral-100 rounded-2xl overflow-hidden p-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-50/20">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={b.image} alt="" className="w-20 h-14 object-cover rounded-xl border border-neutral-200" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900 leading-snug">{b.title}</h4>
                      <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{b.subtitle}</p>
                      <span className="inline-block mt-2 font-mono text-[9px] font-bold text-blue-600 bg-blue-50 py-0.5 px-1.5 rounded">Button: {b.linkText}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleToggleBannerActive(b.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                        b.isActive
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                      }`}
                    >
                      {b.isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-neutral-400" />}
                      {b.isActive ? 'Active Display' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(b.id)}
                      className="p-2 border border-red-100 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: FAQs CMS */}
      {/* ========================================================= */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Form */}
          <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm flex items-center gap-2 pb-3 border-b border-neutral-100">
              {editingFaqId ? (
                <span className="flex items-center gap-2 text-purple-700">
                  <Edit2 className="w-4 h-4 text-purple-600 animate-pulse" /> Edit FAQ Topic
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" /> Register FAQ Topic
                </span>
              )}
            </h3>
            <form onSubmit={handleAddFAQ} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-medium text-neutral-500">FAQ Question</label>
                <input
                  type="text"
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="e.g. Can I wash raw denim?"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Topic Categorization</label>
                <select
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-white focus:border-black focus:outline-none"
                >
                  <option value="Sizing">Sizing & Cuts</option>
                  <option value="Shipping">Shipping Rates</option>
                  <option value="Returns">Returns & Refunds</option>
                  <option value="Loyalty">Loyalty Club</option>
                  <option value="General">General Inquiries</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Detailed Answer</label>
                <textarea
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  rows={4}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none resize-none"
                  placeholder="Provide precise sizing instructions or delivery windows..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {editingFaqId ? 'Update FAQ Help Topic' : 'Publish FAQ Help Topic'}
                </button>
                {editingFaqId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaqId(null);
                      setFaqQuestion('');
                      setFaqAnswer('');
                    }}
                    className="py-2.5 px-4 border border-neutral-200 text-neutral-600 font-bold rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Directory list */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm">Customer Help FAQs Directory</h3>
            <p className="text-[11px] text-neutral-400">These answers dynamically render inside the FAQ support accordion on the client's shop layout.</p>
            
            <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto pr-2 space-y-3">
              {faqs.map(f => (
                <div key={f.id} className="pt-3 pb-2 flex justify-between gap-4 items-start">
                  <div className="space-y-1 text-xs">
                    <span className="inline-block text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      {f.category}
                    </span>
                    <h4 className="font-bold text-neutral-900">{f.question}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-light">{f.answer}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStartEditFAQ(f)}
                      className="p-1.5 border border-purple-100 bg-white text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer"
                      title="Edit FAQ Topic"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(f.id)}
                      className="p-1.5 border border-red-50 bg-white text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete FAQ Topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: STATIC PAGES CMS */}
      {/* ========================================================= */}
      {activeTab === 'pages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Form */}
          <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm flex items-center gap-2 pb-3 border-b border-neutral-100">
              {editingPageId ? (
                <span className="flex items-center gap-2 text-purple-700">
                  <Edit2 className="w-4 h-4 text-purple-600 animate-pulse" /> Edit Corporate Page
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" /> Register Corporate Page
                </span>
              )}
            </h3>
            <form onSubmit={handleAddPage} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Corporate Page Title</label>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="e.g. Terms of Service"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">URL Route Slug</label>
                <input
                  type="text"
                  value={pageSlug}
                  onChange={(e) => setPageSlug(e.target.value)}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                  placeholder="e.g. terms-of-service"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-neutral-500">Page Markdown / Text Content</label>
                <textarea
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                  rows={6}
                  className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none resize-none font-mono text-[11px]"
                  placeholder="Write your long-form tailoring guides or shipping terms here..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {editingPageId ? 'Update Static Page' : 'Register Static Page'}
                </button>
                {editingPageId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPageId(null);
                      setPageTitle('');
                      setPageSlug('');
                      setPageContent('');
                    }}
                    className="py-2.5 px-4 border border-neutral-200 text-neutral-600 font-bold rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Directory list */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-950 text-sm">Static Corporate Pages</h3>
            <p className="text-[11px] text-neutral-400">These pages are linked in the page footer. Clicking them opens a polished dynamic content modal seamlessly.</p>
            
            <div className="divide-y divide-neutral-100 space-y-3">
              {customPages.map(cp => (
                <div key={cp.id} className="pt-3 pb-2 flex justify-between gap-4 items-start">
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-neutral-900">{cp.title}</h4>
                    <p className="text-[10px] text-neutral-400">Slug: <strong className="font-mono bg-neutral-50 p-1 rounded">/page/{cp.slug}</strong></p>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 pt-1 font-light leading-relaxed">{cp.content}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStartEditPage(cp)}
                      className="p-1.5 border border-purple-100 bg-white text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer"
                      title="Edit Custom Page"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePage(cp.id)}
                      className="p-1.5 border border-red-50 bg-white text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete Custom Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: REVENUE ANALYTICS */}
      {/* ========================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Analytical Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Gross Sales Revenue</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold">${finalRev.toFixed(2)}</span>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +14.2%
                </span>
              </div>
              <span className="text-[9px] text-neutral-400 block">+${totalRevenue.toFixed(2)} in current session</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Total Dispatched Orders</span>
              <span className="text-2xl font-mono font-bold block">{finalOrders} Orders</span>
              <span className="text-[9px] text-neutral-400 block">+{totalOrdersCount} processed since boot</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Average Order Value (AOV)</span>
              <span className="text-2xl font-mono font-bold block">${finalAvgValue.toFixed(2)}</span>
              <span className="text-[9px] text-blue-600 block font-semibold">T-Shirt Bundles boosted +$12.50</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Points Wallet Liability</span>
              <span className="text-2xl font-mono font-bold block">{pointsIssuedCount + 1800} Pts</span>
              <span className="text-[9px] text-amber-600 block">Valued at ${( (pointsIssuedCount + 1800) / 100).toFixed(2)} store credit</span>
            </div>
          </div>

          {/* Analytical SVG Data Visualizers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales trend */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Quarterly Growth Velocity Trend</h4>
                <span className="text-[10px] font-bold text-blue-600">Enterprise Scale</span>
              </div>

              {/* SVG Trend Line */}
              <div className="h-56 w-full flex items-end">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f4f4f5" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#f4f4f5" strokeWidth="1" />
                  
                  {/* Line Graph path */}
                  <path
                    d="M 20,160 Q 100,120 180,140 T 340,70 T 480,30"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  
                  {/* Gradients */}
                  <path
                    d="M 20,160 Q 100,120 180,140 T 340,70 T 480,30 L 480,200 L 20,200 Z"
                    fill="url(#trend-gradient)"
                    opacity="0.08"
                  />
                  
                  <defs>
                    <linearGradient id="trend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>

                  {/* Dot Highlights */}
                  <circle cx="20" cy="160" r="4.5" fill="#18181b" />
                  <circle cx="180" cy="140" r="4.5" fill="#18181b" />
                  <circle cx="340" cy="70" r="4.5" fill="#18181b" />
                  <circle cx="480" cy="30" r="5" fill="#2563eb" />

                  {/* Axis labels */}
                  <text x="20" y="195" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Q1 2026</text>
                  <text x="180" y="195" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Q2 2026</text>
                  <text x="340" y="195" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Q3 2026</text>
                  <text x="440" y="195" fill="#2563eb" fontWeight="bold" fontSize="10" fontFamily="monospace">Q4 (LIVE)</text>
                </svg>
              </div>
            </div>

            {/* Category Performance Bar mockup */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Garment Category Revenue Share</h4>
                <span className="text-[10px] font-bold text-neutral-900">Calculated Volume</span>
              </div>

              <div className="space-y-4 pt-2">
                {/* T-Shirt bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-neutral-700">Premium Cotton T-Shirts</span>
                    <span className="font-mono text-neutral-900">58% Share</span>
                  </div>
                  <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>

                {/* Pants bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-neutral-700">Tailored Chinos & Denim Pants</span>
                    <span className="font-mono text-neutral-900">42% Share</span>
                  </div>
                  <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-neutral-950 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>

                {/* Bundle Boost summary card */}
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 mt-4 text-[11px] leading-relaxed text-neutral-500">
                  <span className="font-bold text-neutral-800 block mb-1">💡 Automated Bundle Strategy Review</span>
                  Our <strong>Mix & Match</strong> and <strong>T-Shirt Trio</strong> promotions are applied on { (finalOrders * 0.35).toFixed(0) } orders, saving clients money while scaling total shop order volume safely.
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: ENTERPRISE AUDIT LOGS */}
      {/* ========================================================= */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
            <h3 className="font-bold font-display text-base text-neutral-950">Store Action Auditing Logs</h3>
            <span className="text-xs font-mono text-neutral-400">{auditLogs.length} total events tracked</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Enterprise integrity log tracking of storefront parameters adjustment, VIP state checks, referral code click attribution, and completed simulated order dispatch.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action Event</th>
                  <th className="py-2.5 px-3">Authorized User</th>
                  <th className="py-2.5 px-3">Operational Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-[11px] text-neutral-700">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-neutral-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white rounded text-[9px] font-bold tracking-wide uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-neutral-500 whitespace-nowrap">
                      {log.userEmail}
                    </td>
                    <td className="py-3 px-3 font-medium text-neutral-800 leading-snug">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: HEADER & FOOTER SETTINGS CMS */}
      {/* ========================================================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveStoreSettings} className="space-y-8 animate-fade-in text-neutral-900">
          
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-bold font-display text-base text-neutral-950 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" /> Storefront Styling & CMS Configurations
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Customize global branding elements, navigation menus ( Burmese translations supported ), footer texts, and aesthetic promo showroom photos.
              </p>
            </div>

            {/* SECTION 1: Brand & Logo Design */}
            <div className="space-y-4">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-purple-600">1. Brand & Header Logo Identity</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Logo Header Text</label>
                  <input
                    type="text"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    placeholder="e.g. RESTYLE"
                    required
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">Displays when no Logo Image URL is provided.</p>
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Logo Image URL (Optional photo logo)</label>
                  <input
                    type="text"
                    value={logoImage}
                    onChange={(e) => setLogoImage(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    placeholder="https://images.unsplash.com/... or blank"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">If set, overrides the logo text with an elegant image logo.</p>
                </div>
              </div>
            </div>

            {/* SECTION 2: Dynamic Navigation Menus */}
            <div className="space-y-4 border-t border-neutral-100 pt-6">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-purple-600">2. Store Navigation Menu Labels</span>
              <p className="text-[11px] text-neutral-400">Specify precise menu names with Burmese translations for your target clientele.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">Shop Catalog Menu</label>
                  <input
                    type="text"
                    value={menuShopText}
                    onChange={(e) => setMenuShopText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">VIP Loyalty Menu</label>
                  <input
                    type="text"
                    value={menuLoyaltyText}
                    onChange={(e) => setMenuLoyaltyText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">Affiliate Link Menu</label>
                  <input
                    type="text"
                    value={menuAffiliateText}
                    onChange={(e) => setMenuAffiliateText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">Guide Portal Menu</label>
                  <input
                    type="text"
                    value={menuGuidesText}
                    onChange={(e) => setMenuGuidesText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">User Account Menu</label>
                  <input
                    type="text"
                    value={menuAccountText}
                    onChange={(e) => setMenuAccountText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-neutral-600">Store Inventory Menu</label>
                  <input
                    type="text"
                    value={menuInventoryText}
                    onChange={(e) => setMenuInventoryText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Announcement Bar */}
            <div className="space-y-4 border-t border-neutral-100 pt-6">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-purple-600">3. Campaign Announcement Bar</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="md:col-span-2">
                  <label className="block mb-1.5 font-bold text-neutral-700">Announcement Banner Message</label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    placeholder="e.g. ⚡ FREE DELIVERY TO YANGON & MANDALAY on orders above $50!"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Banner Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={announcementBgColor}
                      onChange={(e) => setAnnouncementBgColor(e.target.value)}
                      className="w-10 h-10 border border-neutral-200 rounded-lg cursor-pointer bg-neutral-100"
                    />
                    <input
                      type="text"
                      value={announcementBgColor}
                      onChange={(e) => setAnnouncementBgColor(e.target.value)}
                      className="flex-1 p-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none font-mono text-center uppercase"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: Brand Promo Photos CMS */}
            <div className="space-y-4 border-t border-neutral-100 pt-6">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-purple-600">4. Campaign Showroom Lookbook Photos</span>
              <p className="text-[11px] text-neutral-400">These photos dynamically populate the footer lookbook campaign showroom, allowing customized branding campaign layouts.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Campaign Showroom Photo 1 URL</label>
                  <input
                    type="text"
                    value={brandPromoPhoto1}
                    onChange={(e) => setBrandPromoPhoto1(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Campaign Showroom Photo 2 URL</label>
                  <input
                    type="text"
                    value={brandPromoPhoto2}
                    onChange={(e) => setBrandPromoPhoto2(e.target.value)}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: Footer Brand Story & Copyright */}
            <div className="space-y-4 border-t border-neutral-100 pt-6">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-purple-600">5. Footer Brand Story & Copyrights</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Our Story / Footer Description</label>
                  <textarea
                    value={footerStory}
                    onChange={(e) => setFooterStory(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none resize-none"
                    placeholder="Describe your brand ethos and tailoring heritage..."
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-neutral-700">Footer Copyright Notice</label>
                  <textarea
                    value={footerCopyright}
                    onChange={(e) => setFooterCopyright(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 border border-neutral-200 rounded-xl bg-neutral-50 focus:border-black focus:outline-none resize-none"
                    placeholder="© 2026 RESTYLE Studio. All rights reserved."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="border-t border-neutral-100 pt-6 flex justify-end">
              <button
                type="submit"
                className="py-3 px-8 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-colors cursor-pointer text-xs"
              >
                Save All Global Settings
              </button>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
