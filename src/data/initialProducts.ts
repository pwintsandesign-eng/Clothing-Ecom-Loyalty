import { Product, AffiliatePartner, ReferredSale } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Crewneck Tee အင်္ကျီ',
    description: '100% long-staple organic cotton နဲ့ ပြုလုပ်ထားပါတယ်။ Perfectly tailored crewneck မို့ လျှော်ပြီးရင်လည်း ပုံစံမပျက်ဘဲ အမြဲတမ်း clean silhouette စတိုင်ကို ရရှိစေမှာပါ။',
    price: 32.00,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    fits: ['Slim', 'Regular'],
    colors: ['Black', 'White', 'Gray'],
    stock: 45,
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-1-1', userName: 'Marcus V.', rating: 5, comment: 'ဝတ်ရတာ အဆင်ပြေဆုံး basic tee ပါပဲ။ Shoulder fit က ကွက်တိပဲ၊ shrink လည်းမဖြစ်ဘူး။', date: '2026-06-15' },
      { id: 'rev-1-2', userName: 'Juliet K.', rating: 4, comment: 'Cotton သားလေးက အရမ်း soft ဖြစ်ပါတယ်။ ပုခုံးကျယ်တဲ့သူတွေလည်း အဆင်ပြေတယ်။', date: '2026-06-28' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Tailored Chino Pants ဘောင်းဘီ',
    description: 'Modern classic စတိုင်ဖြစ်ပြီး dynamic comfort အတွက် mid-weight stretch twill cotton ကို သုံးထားပါတယ်။ Tailored waist closure နဲ့ flat-front design မို့ အရမ်းသပ်ရပ်ပါတယ်။',
    price: 68.00,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL'],
    fits: ['Slim', 'Regular', 'Athletic'],
    colors: ['Beige', 'Navy', 'Black'],
    stock: 28,
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-2-1', userName: 'Christian L.', rating: 5, comment: 'Fit က အရမ်းကောင်းပါတယ်။ ခါးနေရာမှာ အနေတော်ဖြစ်ပြီး breathable လည်း ဖြစ်တယ်။', date: '2026-05-12' },
      { id: 'rev-2-2', userName: 'Aiden G.', rating: 5, comment: 'Stretch ဖြစ်တာ သဘောကျတယ်။ Office meeting တွေရော casual dinner တွေအတွက်ပါ perfect ပါပဲ။', date: '2026-06-20' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Premium Pima Pocket Tee အိတ်ကပ်ပါတီရှပ်',
    description: 'Supreme softness နဲ့ subtle luster ရှိတဲ့ Peruvian Pima cotton အစစ်နဲ့ knit လုပ်ထားတာမို့ အရမ်း premium ဖြစ်ပြီး dynamic durability ရှိစေပါတယ်။ Chest pocket လှလှလေးလည်း ပါပါတယ်။',
    price: 38.00,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L'],
    fits: ['Slim', 'Regular', 'Relaxed'],
    colors: ['White', 'Navy', 'Olive'],
    stock: 12, // Low stock simulation
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-3-1', userName: 'Emilio S.', rating: 4, comment: 'Fabric quality က အရမ်းမိုက်တယ်၊ neck lining ကိုလည်း ကောင်းကောင်း reinforce လုပ်ထားတယ်။', date: '2026-06-02' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Classic Selvedge Denim Jeans ဂျင်းဘောင်းဘီ',
    description: 'Form နဲ့ function ကို ဟန်ချက်ညီစေမယ့် Selvedge Denim ဘောင်းဘီဖြစ်ပါတယ်။ Authentic shuttle looms နဲ့ ရက်လုပ်ထားတဲ့ raw cotton မို့ ဝတ်လေလေ ကိုယ်ခန္ဓာပုံစံနဲ့အညီ unique fade patterns လှလှလေးတွေ ထွက်လာလေလေပါပဲ။',
    price: 110.00,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    fits: ['Regular', 'Relaxed'],
    colors: ['Navy', 'Black'],
    stock: 15,
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-4-1', userName: 'Nathan D.', rating: 5, comment: 'Authentic stiff denim အစစ်ကြီးပဲ။ ၃ ပတ်လောက်ဝတ်ပြီးတော့ fades စပြီး ပေါ်လာပြီ။ Quality အရမ်းလန်းတယ်။', date: '2026-06-11' },
      { id: 'rev-4-2', userName: 'Sarah H.', rating: 4, comment: 'ဘောင်းဘီသားက တကယ် ကောင်းတယ်၊ raw denim မို့ stretch မဖြစ်လို့ size up ဖို့ မမေ့ပါနဲ့ဦး။', date: '2026-07-01' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Urban Cargo Pants ကာဂိုဘောင်းဘီ',
    description: 'Modern utility နဲ့ urbanwear တို့ ပေါင်းစပ်ထားပါတယ်။ Dual cargo pockets နဲ့ articulated knees ပါဝင်လို့ လှုပ်ရှားရတာ လွတ်လပ်ပေါ့ပါးစေပြီး drawstring ankles နဲ့ fit ကို ချိန်ညှိနိုင်ပါတယ်။',
    price: 84.00,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
    fits: ['Relaxed', 'Athletic'],
    colors: ['Olive', 'Black', 'Beige'],
    stock: 22,
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-5-1', userName: 'Tyler W.', rating: 5, comment: 'Cargo pockets တွေက တကယ် သုံးဝင်တယ်။ Boots တွေ Sneakers တွေနဲ့ ဝတ်ရတာ အရမ်းအဆင်ပြေပါတယ်။', date: '2026-04-30' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Supima Heavyweight Tee တီရှပ်အထူ',
    description: '280GSM dense Supima cotton ကို သုံးထားလို့ ထူထူထဲထဲနဲ့ structured drape ပုံစံမျိုးကို ရရှိစေမှာပါ။ Minimalist layered styling လုပ်ဖို့အတွက် အသင့်တော်ဆုံးပါပဲ။',
    price: 42.00,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    fits: ['Regular', 'Relaxed'],
    colors: ['Black', 'Gray', 'Olive'],
    stock: 31,
    isVipEarlyAccess: false,
    reviews: [
      { id: 'rev-6-1', userName: 'Chloe F.', rating: 5, comment: 'ဘောင်းဘီအင်္ကျီစပ်ဝတ်ရတာ အဆင်ပြေတဲ့ အထူသားလေးပါ။ Boxy look ရစေတယ်။ Olive color က တကယ် လှတယ်။', date: '2026-06-25' }
    ]
  },
  {
    id: 'prod-7',
    name: 'VIP Japanese Selvedge Chinos ဘောင်းဘီ',
    description: '★ VIP CLUB EXCLUSIVE - EARLY ACCESS ★ Okayama ရှိ ရှေးဟောင်း Toyoda loom shuttles နဲ့ ရက်လုပ်ထားပါတယ်။ Natural plant indigo ဆိုးဆေးနဲ့ သေချာဆိုးထားတဲ့ Limited Release ဖြစ်ပါတယ်။',
    price: 145.00,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L'],
    fits: ['Slim', 'Regular'],
    colors: ['Navy', 'Black'],
    stock: 8, // Very low stock!
    isVipEarlyAccess: true, // Requires Premium subscription
    reviews: [
      { id: 'rev-7-1', userName: 'Douglas B. (Platinum VIP)', rating: 5, comment: 'တကယ့် လက်ရာမြောက် Selvedge Denim ပါပဲ။ Coin pocket လေးရဲ့ အသေးစိတ် craftsmanship က တကယ် ထူးခြားတယ်။', date: '2026-06-18' }
    ]
  },
  {
    id: 'prod-8',
    name: 'VIP Luxe Silk-Blend Knit Tee တီရှပ်',
    description: '★ VIP CLUB EXCLUSIVE - EARLY ACCESS ★ 70% long-staple cotton နဲ့ 30% Mulberry silk ကို ပေါင်းစပ်ပြီး knit လုပ်ထားလို့ ultra-soft feel နဲ့ timeless elegance ကို အပြည့်အဝပေးစွမ်းနိုင်ပါတယ်။',
    price: 65.00,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L'],
    fits: ['Slim', 'Regular'],
    colors: ['Gray', 'White', 'Beige'],
    stock: 10,
    isVipEarlyAccess: true, // Requires Premium subscription
    reviews: [
      { id: 'rev-8-1', userName: 'Elena P. (Gold VIP)', rating: 5, comment: 'Liquid metal အလား drape ဖြစ်ပြီး ဝတ်ရတာ အရမ်း soft ဖြစ်တယ်။ လက်နဲ့ လျှော်ရင် အကောင်းဆုံးပါ။', date: '2026-07-02' }
    ]
  }
];

export const INITIAL_AFFILIATES: AffiliatePartner[] = [
  {
    id: 'aff-1',
    name: 'Sarah Jenkins (Fashion Blogger)',
    code: 'SARAHSTYLE',
    clicks: 1420,
    salesCount: 38,
    totalSalesAmount: 2450.00,
    commissionEarned: 245.00,
    commissionPaid: 180.00,
    balance: 65.00
  },
  {
    id: 'aff-2',
    name: 'Alex Carter (Streetwear Hub)',
    code: 'STREETALEX',
    clicks: 3105,
    salesCount: 89,
    totalSalesAmount: 6230.00,
    commissionEarned: 623.00,
    commissionPaid: 500.00,
    balance: 123.00
  },
  {
    id: 'aff-3',
    name: 'Marcus Chen (Tech Wear Critic)',
    code: 'MARCUSCHINOS',
    clicks: 450,
    salesCount: 12,
    totalSalesAmount: 980.00,
    commissionEarned: 98.00,
    commissionPaid: 98.00,
    balance: 0.00
  }
];

export const INITIAL_REFERRED_SALES: ReferredSale[] = [
  {
    id: 'ref-1',
    orderId: 'ORD-9842',
    partnerCode: 'SARAHSTYLE',
    amount: 140.00,
    commission: 14.00,
    date: '2026-06-28',
    status: 'Approved'
  },
  {
    id: 'ref-2',
    orderId: 'ORD-9781',
    partnerCode: 'STREETALEX',
    amount: 218.00,
    commission: 21.80,
    date: '2026-07-01',
    status: 'Pending'
  },
  {
    id: 'ref-3',
    orderId: 'ORD-9721',
    partnerCode: 'SARAHSTYLE',
    amount: 96.00,
    commission: 9.60,
    date: '2026-07-03',
    status: 'Pending'
  },
  {
    id: 'ref-4',
    orderId: 'ORD-9530',
    partnerCode: 'STREETALEX',
    amount: 310.00,
    commission: 31.00,
    date: '2026-06-15',
    status: 'Paid'
  }
];
