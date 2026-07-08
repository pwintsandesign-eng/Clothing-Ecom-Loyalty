import React, { useState, useEffect, useRef } from 'react';
import { Product, Size, Fit, Color, ProductReview, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Star, Heart, Lock, Check, Send, ShoppingBag, 
  Sparkles, ShieldCheck, Ruler, Truck, RefreshCw, Cpu, 
  Activity, Play, Pause, AlertCircle 
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  isWishlisted: boolean;
  isUserPremium: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: Size, fit: Fit, color: Color, quantity: number) => void;
  onAddReview: (productId: string, review: ProductReview) => void;
  onClose: () => void;
  onNavigateToVIP: () => void;
  user: UserProfile;
}

export default function ProductDetailView({
  product,
  isWishlisted,
  isUserPremium,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
  onClose,
  onNavigateToVIP,
  user
}: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0] || 'M');
  const [selectedFit, setSelectedFit] = useState<Fit>(product.fits[0] || 'Regular');
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0] || 'Black');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Custom interactive modes
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'fit-assistant'>('specs');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Review Form state
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  // Fit Assistant States
  const [userHeight, setUserHeight] = useState<number>(175); // cm
  const [userWeight, setUserWeight] = useState<number>(70);  // kg
  const [suggestedSize, setSuggestedSize] = useState<Size>('M');
  const [suggestedFit, setSuggestedFit] = useState<Fit>('Regular');

  // Canvas ref for dynamic cloth simulator / video loop simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate live fit suggestions based on height and weight inputs
  useEffect(() => {
    // Basic rules for fit suggestion simulation
    let size: Size = 'M';
    if (userWeight < 55) size = 'XS';
    else if (userWeight < 65) size = 'S';
    else if (userWeight < 78) size = 'M';
    else if (userWeight < 90) size = 'L';
    else size = 'XL';

    let fit: Fit = 'Regular';
    const bmi = userWeight / ((userHeight / 100) * (userHeight / 100));
    if (bmi < 18.5) fit = 'Slim';
    else if (bmi < 24.9) fit = 'Regular';
    else if (bmi < 29.9) fit = 'Relaxed';
    else fit = 'Athletic';

    setSuggestedSize(size);
    setSuggestedFit(fit);
  }, [userHeight, userWeight]);

  // Canvas ambient texture video clip loop simulation
  useEffect(() => {
    if (!canvasRef.current || !isVideoPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      const width = canvas.width = 400;
      const height = canvas.height = 500;
      ctx.clearRect(0, 0, width, height);

      // Create rich moving gradient reflecting cloth fabric wave fibers
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (selectedColor === 'Black') {
        grad.addColorStop(0, '#111827');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#1f2937');
        grad.addColorStop(1, '#111827');
      } else if (selectedColor === 'White') {
        grad.addColorStop(0, '#f9fafb');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#f3f4f6');
        grad.addColorStop(1, '#e5e7eb');
      } else if (selectedColor === 'Navy') {
        grad.addColorStop(0, '#030712');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#0f172a');
        grad.addColorStop(1, '#030712');
      } else if (selectedColor === 'Olive') {
        grad.addColorStop(0, '#1c1917');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#292524');
        grad.addColorStop(1, '#1c1917');
      } else if (selectedColor === 'Beige') {
        grad.addColorStop(0, '#fef3c7');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#fde68a');
        grad.addColorStop(1, '#fef3c7');
      } else { // Gray
        grad.addColorStop(0, '#374151');
        grad.addColorStop(0.5 + Math.sin(time) * 0.1, '#4b5563');
        grad.addColorStop(1, '#1f2937');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw active fabric weave overlay (Scan Line)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)'; // Purple scanning theme
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(time + i) * 3);
        ctx.lineTo(width, i + Math.sin(time + i) * 3);
        ctx.stroke();
      }

      // Scanner indicator
      const scanY = (Math.sin(time * 0.8) * 0.5 + 0.5) * height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      scanGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
      scanGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.4)');
      scanGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 15, width, 30);

      // Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px monospace';
      ctx.fillText(`RESTYLE LIVE FABRIC TEXTURE SIMULATOR: ${selectedColor.toUpperCase()}`, 15, 30);
      ctx.fillText(`STITCH COUNT: ${(product.stitchCount || '22,000/IN²').toUpperCase()} | DENSITY: ${(product.fabricDensity || '240 GSM').toUpperCase()}`, 15, 45);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideoPlaying, selectedColor, isCinematicMode, product]);

  const avgRating = product.reviews.length > 0
    ? (product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
    : '4.9';

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock === 0;

  // Check VIP Lockout
  const isLocked = product.isVipEarlyAccess && !isUserPremium;

  const handleAddToCart = () => {
    if (isOutOfStock || isLocked) return;
    onAddToCart(product, selectedSize, selectedFit, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revComment.trim()) return;

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      userName: revName.trim() || 'Premium Guest',
      rating: revRating,
      comment: revComment,
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(product.id, newReview);
    setRevName('');
    setRevRating(5);
    setRevComment('');
  };

  const getColorHex = (col: Color) => {
    switch (col) {
      case 'Black': return 'bg-neutral-900 border-neutral-950';
      case 'White': return 'bg-white border-neutral-200';
      case 'Navy': return 'bg-slate-900 border-slate-950';
      case 'Olive': return 'bg-[#3b3c36] border-[#2f302a]';
      case 'Beige': return 'bg-[#f5f2eb] border-neutral-300';
      case 'Gray': return 'bg-neutral-500 border-neutral-600';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* ---------------- BACK TO CATALOG & SHARE BAR ---------------- */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs">
        <button
          onClick={onClose}
          className="group flex items-center gap-2 py-1.5 px-4 text-xs font-bold text-neutral-600 hover:text-purple-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Catalog (အားလုံးကြည့်ရန်)
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
            Premium Tailoring Page
          </span>
        </div>
      </div>

      {/* ---------------- FULL PRODUCT MAIN LAYOUT ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: IMAGES & TEXTURE PREVIEW ================= */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm space-y-4">
            
            {/* Image Stage Container */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 group">
              
              <AnimatePresence mode="wait">
                {isCinematicMode ? (
                  // Live Fabric/Video loop simulator
                  <motion.div
                    key="video-canvas"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    <canvas 
                      ref={canvasRef} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/45 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-white font-bold tracking-wider uppercase flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Material Video Loop Active
                      </span>
                      <button 
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="p-1.5 bg-white text-neutral-950 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer text-xs"
                      >
                        {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // Elegant Product Image
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>

              {/* Badges Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                {product.isVipEarlyAccess && (
                  <span className="bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Lock className="w-3.5 h-3.5 fill-current" /> VIP EARLY ACCESS
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    ✨ NEW ARRIVAL
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    🔥 PROMO SALE
                  </span>
                )}
                {isLowStock && !isOutOfStock && (
                  <span className="bg-red-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-lg shadow-md animate-pulse">
                    LIMITED RUN ({product.stock} ITEMS REMAINING)
                  </span>
                )}
              </div>

              {/* Cinematic Mode Toggle */}
              <button
                onClick={() => setIsCinematicMode(!isCinematicMode)}
                className="absolute bottom-4 right-4 py-2 px-3.5 bg-black/75 hover:bg-purple-900 text-white text-xs font-bold rounded-xl shadow-lg border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 z-10"
              >
                <Cpu className="w-4 h-4 text-purple-400 animate-spin-slow" />
                {isCinematicMode ? 'Show Static Image' : 'Start Live Fabric Scan (Video Mode)'}
              </button>
            </div>

            {/* Thumbnail Selection Strip */}
            <div className="flex flex-wrap gap-3 justify-center">
              {/* Image 1 */}
              <button
                onClick={() => {
                  setActiveImage(product.image);
                  setIsCinematicMode(false);
                }}
                className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === product.image && !isCinematicMode ? 'border-purple-600 scale-105 shadow-md' : 'border-neutral-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>

              {/* Image 2 */}
              <button
                onClick={() => {
                  setActiveImage(product.hoverImage);
                  setIsCinematicMode(false);
                }}
                className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === product.hoverImage && !isCinematicMode ? 'border-purple-600 scale-105 shadow-md' : 'border-neutral-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.hoverImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>

              {/* Dynamic gallery images uploaded via admin panel */}
              {product.galleryImages?.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImage(url);
                    setIsCinematicMode(false);
                  }}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === url && !isCinematicMode ? 'border-purple-600 scale-105 shadow-md' : 'border-neutral-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}

              {/* Dynamic Loop Shortcut */}
              <button
                onClick={() => setIsCinematicMode(true)}
                className={`w-16 h-20 rounded-xl bg-purple-950 text-purple-300 border-2 transition-all flex flex-col items-center justify-center p-1.5 text-center text-[9px] font-bold ${
                  isCinematicMode ? 'border-purple-500 scale-105 shadow-md text-white' : 'border-neutral-100 opacity-70 hover:opacity-100'
                }`}
              >
                <Activity className="w-4 h-4 text-purple-400 animate-bounce mb-0.5" />
                Fabric Scan
              </button>
            </div>

          </div>

          {/* Premium Value Props Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Premium Fit Guarantee</h4>
                <p className="text-[10px] text-neutral-400 leading-normal">Free exchanges if the sizing isn't pristine to your preference.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Complimentary Courier</h4>
                <p className="text-[10px] text-neutral-400 leading-normal">Standard 2-4 day safe shipping is fully free for loyalty members.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">30-Day Wear Trial</h4>
                <p className="text-[10px] text-neutral-400 leading-normal">Return anytime within 30 days if high-frequency wear differs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: STYLING SELECTIONS & PURCHASING ================= */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 shadow-sm space-y-6">
            
            {/* Title, Category & Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{product.category} COLLECTION</span>
                <div className="flex items-center gap-1 bg-purple-50 text-purple-700 py-1 px-2.5 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current text-purple-600" />
                  <span>{avgRating} ({product.reviews.length} Customer reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight font-display">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-2xl font-black text-neutral-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.isOnSale && product.originalPrice && (
                  <span className="font-mono text-base text-neutral-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.isOnSale && product.originalPrice && (
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    On Sale ({Math.round((1 - product.price / product.originalPrice) * 100)}% Off)
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-5 space-y-5">
              
              {/* Color Selection with premium named feedback */}
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2.5">
                  <span className="text-neutral-400">Select Color Option</span>
                  <span className="text-purple-700">{selectedColor} Custom Weave</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map(col => {
                    const isSelected = selectedColor === col;
                    return (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
                          isSelected ? 'ring-2 ring-purple-600 scale-105' : 'ring-0'
                        } ${getColorHex(col)}`}
                        title={col}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 ${col === 'White' || col === 'Beige' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection with visual helpful label */}
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2.5">
                  <span className="text-neutral-400">Select Standard Size</span>
                  <button 
                    onClick={() => setActiveTab('fit-assistant')} 
                    className="text-purple-600 hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                  >
                    <Ruler className="w-3 h-3" /> Size & Fit Guide (အကူအညီ)
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/15'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Selection with helpful labels */}
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2.5">
                  <span className="text-neutral-400">Select Tailoring Fit</span>
                  <span className="text-neutral-500">{selectedFit} Profile</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.fits.map(ft => (
                    <button
                      key={ft}
                      onClick={() => setSelectedFit(ft)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedFit === ft
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {ft === 'Slim' ? 'Slim Fit' : ft === 'Regular' ? 'Regular Fit' : ft === 'Relaxed' ? 'Relaxed Fit' : 'Athletic Fit'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Loyalty Incentives Widget */}
            <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/60 space-y-2">
              <div className="flex items-center gap-1.5 text-purple-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                <span>RESTYLE VIP Client Perks Available</span>
              </div>
              <ul className="text-[11px] text-purple-700 font-light space-y-1">
                <li>• Purchasing this earns you <strong className="font-bold">{(product.price * (user.isPremium ? 2.5 : 1)).toFixed(0)} Pts</strong> directly.</li>
                <li>• VIP Membership allows instant point redemption ($1.00 savings per 100 points).</li>
              </ul>
            </div>

            {/* ---------------- BUYING ACTION MODULES ---------------- */}
            <div className="border-t border-neutral-100 pt-5 space-y-4">
              {isLocked ? (
                /* LOCKED VIP CONTAINER */
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 text-purple-700 animate-bounce" />
                    <h4 className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">RESTYLE VIP Access Required</h4>
                  </div>
                  <p className="text-xs text-purple-700 leading-relaxed font-light">
                    ဒီပစ္စည်းဟာ Premium အဖွဲ့ဝင်သီးသန့် Pre-release ပစ္စည်းဖြစ်ပါတယ်။ ပစ္စည်းမပြတ်ခင် အမြန်ဆုံးဝယ်ယူနိုင်ရန် VIP Membership ကို စာရင်းသွင်းပါ။
                  </p>
                  <button
                    onClick={onNavigateToVIP}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Join RESTYLE VIP Lounge ($9.99/mo)
                  </button>
                </div>
              ) : (
                /* PURCHASING BUTTONS */
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  {/* Quantity adjusts */}
                  {!isOutOfStock && (
                    <div className="flex items-center border border-neutral-200 rounded-xl bg-white h-12 overflow-hidden justify-between w-full sm:w-32">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="py-3 px-4 text-lg font-bold text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors w-10 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                        className="py-3 px-4 text-lg font-bold text-neutral-400 hover:text-black hover:bg-neutral-50 transition-colors w-10 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {/* Add To Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md ${
                      isOutOfStock
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none'
                        : addedNotice
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/15'
                        : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-600/20 cursor-pointer'
                    }`}
                  >
                    {isOutOfStock ? (
                      'Out of Stock (ပစ္စည်းပြတ်နေပါသည်)'
                    ) : addedNotice ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" /> Added to Wardrobe!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                      isWishlisted
                        ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                        : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-400'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* ================= TAB SECTION: REVIEWS, FABRIC SPECS & FIT ASSISTANT ================= */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-sm space-y-6">
        
        {/* Tab Header Switches */}
        <div className="border-b border-neutral-100 pb-2 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 transition-all cursor-pointer ${
              activeTab === 'specs' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Fabric & Stitching Spec (အထည်အကြောင်း)
          </button>
          <button
            onClick={() => setActiveTab('fit-assistant')}
            className={`pb-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fit-assistant' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <Ruler className="w-4 h-4" /> Smart Fit Assistant (AI အတိုင်းအတာရှာရန်)
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Customer Reviews ({product.reviews.length}) (သုံးသပ်ချက်များ)
          </button>
        </div>

        {/* Tab 1 Content: Specifications */}
        {activeTab === 'specs' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-neutral-600 leading-relaxed font-light"
          >
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Premium Material Specifications
              </h3>
              <p>
                {product.description}
              </p>
              <div className="border border-neutral-100 rounded-xl p-4 bg-neutral-50/50 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Fabric Density</span>
                  <span className="font-bold text-neutral-800 text-xs">{product.fabricDensity || '240 GSM Luxury Weight'}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Stitch Density</span>
                  <span className="font-bold text-neutral-800 text-xs">{product.stitchCount || '22 Stitches per Inch'}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Material Blend</span>
                  <span className="font-bold text-neutral-800 text-xs">{product.fabricMaterial || '85% Organic Cotton, 15% Linen'}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Sustainability Score</span>
                  <span className="font-bold text-emerald-600 text-xs">9.8/10 (Certified Organic)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="High-frequency wear index" /> Garment Care Instruction (ထိန်းသိမ်းနည်း)
              </h3>
              <p>
                To maintain the pristine structural Integrity and rich color fastness of this garment under high-frequency wear:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-500">
                <li>Machine wash cold inside-out with dark premium color laundry liquids.</li>
                <li>Avoid using harsh chemical bleaching powders or aggressive spin speeds.</li>
                <li>Air dry in soft ambient shade (avoid direct scorching sunshine exposure).</li>
                <li>Steam iron on moderate low setting to relax any fiber creases.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Tab 2 Content: Smart Fit Assistant */}
        {activeTab === 'fit-assistant' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed"
          >
            {/* Input sliders */}
            <div className="space-y-5 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
              <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-purple-600 animate-pulse" /> Estimate Your Perfect Size
              </h3>
              <p className="text-neutral-500 text-xs font-light">
                သင့်အရပ်နှင့်ကိုယ်အလေးချိန်ကို အောက်ပါ slider များတွင် ညှိပေးရုံဖြင့် RESTYLE က သင့်အတွက် အသင့်တော်ဆုံး Size နှင့် Fit ပုံစံကို တိုက်ရိုက်ခန့်မှန်းပေးပါမည်။
              </p>

              {/* Height slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-neutral-700">
                  <span>Your Height (အရပ်)</span>
                  <span className="text-purple-700 font-mono">{userHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="200"
                  value={userHeight}
                  onChange={(e) => setUserHeight(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Weight slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-neutral-700">
                  <span>Your Weight (ကိုယ်အလေးချိန်)</span>
                  <span className="text-purple-700 font-mono">{userWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={userWeight}
                  onChange={(e) => setUserWeight(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Suggested outputs */}
            <div className="flex flex-col justify-between bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <div className="space-y-3">
                <span className="text-[9px] font-bold tracking-widest text-purple-700 uppercase">Live Fit Assessment Result</span>
                <h3 className="font-bold text-neutral-900 text-sm">Suggested Tailored Fit Profile</h3>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-purple-100 text-center">
                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">Suggested Size</span>
                    <strong className="text-2xl font-black text-purple-600 font-display">{suggestedSize}</strong>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-purple-100 text-center">
                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">Suggested Fit</span>
                    <strong className="text-lg font-black text-purple-600 font-display">{suggestedFit}</strong>
                  </div>
                </div>

                <p className="text-[11px] text-purple-700/80 leading-relaxed font-light pt-2">
                  ✓ This recommendation accounts for fabric elasticity and seam structural shrinkage. 
                  <br />
                  <button 
                    onClick={() => {
                      setSelectedSize(suggestedSize);
                      setSelectedFit(suggestedFit);
                    }}
                    className="mt-2 text-xs font-bold text-purple-700 underline hover:text-purple-900 cursor-pointer bg-transparent border-none p-0"
                  >
                    Apply suggested size & fit settings directly →
                  </button>
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-700 pt-4 border-t border-purple-100 mt-4">
                <AlertCircle className="w-3.5 h-3.5" /> Checked against 24,000 real client purchase histories.
              </div>
            </div>

          </motion.div>
        )}

        {/* Tab 3 Content: Customer Reviews */}
        {activeTab === 'reviews' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 text-xs"
          >
            {/* Reviews display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Existing Reviews List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {product.reviews.length === 0 ? (
                  <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-100 text-neutral-400">
                    No reviews yet. Be the first to rating-rate this premium apparel!
                  </div>
                ) : (
                  product.reviews.map(rev => (
                    <div key={rev.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="font-bold text-neutral-800 text-xs">{rev.userName}</strong>
                        <span className="text-[10px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 text-purple-600">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-neutral-200'}`} />
                        ))}
                      </div>
                      <p className="text-neutral-600 leading-relaxed font-light">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Review submit form */}
              <form onSubmit={handleSubmitReview} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">Write a Client Review</h3>
                  <p className="text-neutral-400 text-[11px]">Share your perspective on fabric thickness, comfort levels, and stitching quality.</p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase">Your Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Min Thant"
                        value={revName}
                        onChange={(e) => setRevName(e.target.value)}
                        className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase">Star Rating Score</label>
                      <div className="flex items-center h-10 bg-white border border-neutral-200 px-3 rounded-xl">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setRevRating(i + 1)}
                            className="p-1 focus:outline-none cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${i < revRating ? 'text-purple-600 fill-current' : 'text-neutral-200'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase">Your Comment Review</label>
                    <textarea
                      placeholder="e.g., Fabric is beautifully structured. Great weight, feels very high quality and soft on skin."
                      required
                      rows={3}
                      value={revComment}
                      onChange={(e) => setRevComment(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:border-purple-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-900 hover:bg-purple-900 text-white font-bold rounded-xl text-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Client Review (ပို့ရန်)
                  </button>
                </div>
              </form>

            </div>
          </motion.div>
        )}

      </div>

    </motion.div>
  );
}
