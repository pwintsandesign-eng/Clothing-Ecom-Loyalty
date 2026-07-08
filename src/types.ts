export type Category = 'T-Shirts' | 'Pants' | 'Hoodies' | 'Jackets' | 'Accessories' | 'Dresses';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type Fit = 'Slim' | 'Regular' | 'Relaxed' | 'Athletic';
export type Color = 'Black' | 'White' | 'Navy' | 'Olive' | 'Beige' | 'Gray';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Pre-sale price for discounts
  isOnSale?: boolean; // Promotion/Sale active flag
  isNewArrival?: boolean; // New arrival release badge
  category: Category;
  image: string;
  hoverImage: string;
  galleryImages?: string[]; // Extra product photo gallery
  sizes: Size[];
  fits: Fit[];
  colors: Color[];
  stock: number; // Inventory Management
  isVipEarlyAccess: boolean; // Premium early access
  reviews: ProductReview[];
  fabricMaterial?: string;
  fabricDensity?: string;
  stitchCount?: string;
}

export interface CartItem {
  id: string; // Composite of productId_size_fit_color
  product: Product;
  size: Size;
  fit: Fit;
  color: Color;
  quantity: number;
}

export type MembershipTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface UserProfile {
  name: string;
  email: string;
  totalSpending: number;
  tier: MembershipTier;
  loyaltyPoints: number;
  isPremium: boolean; // VIP Subscription
  role: 'Customer' | 'Administrator'; // Role-based Access Control
  shippingAddress?: string;
  shippingCity?: string;
  shippingZip?: string;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    name: string;
    size: Size;
    fit: Fit;
    color: Color;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
  pointsEarned: number;
  pointsRedeemed: number;
  affiliateCode?: string;
  customerEmail?: string;
  shippingAddress?: string;
  status?: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered';
}

export interface AffiliatePartner {
  id: string;
  name: string;
  code: string;
  clicks: number;
  salesCount: number;
  totalSalesAmount: number;
  commissionEarned: number;
  commissionPaid: number;
  balance: number;
}

export interface ReferredSale {
  id: string;
  orderId: string;
  partnerCode: string;
  amount: number;
  commission: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Paid';
}

export interface BundlePromo {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  condition: (items: CartItem[]) => { applicable: boolean; discountAmount: number; description: string };
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  linkText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userEmail: string;
  details: string;
}

export interface StoreSettings {
  logoText: string;
  logoImage?: string;
  announcementText: string;
  announcementBgColor: string;
  announcementTextColor: string;
  footerStory: string;
  footerCopyright: string;
  menuShopText: string;
  menuLoyaltyText: string;
  menuAffiliateText: string;
  menuGuidesText: string;
  menuAccountText: string;
  menuInventoryText: string;
  brandPromoPhoto1?: string;
  brandPromoPhoto2?: string;
}

