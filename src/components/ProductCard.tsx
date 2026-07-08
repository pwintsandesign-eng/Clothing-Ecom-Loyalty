import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Star, Lock, Eye } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  isWishlisted: boolean;
  isUserPremium: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({ product, isWishlisted, isUserPremium, onToggleWishlist, onSelectProduct }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate average rating
  const avgRating = product.reviews.length > 0
    ? (product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length).toFixed(1)
    : '4.8'; // high aesthetic default

  const totalReviews = product.reviews.length > 0 ? product.reviews.length : 12;

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock === 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-neutral-200 transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Heart Wishlist Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
            isWishlisted
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-black hover:scale-110'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center gap-1.5 py-2 px-4 bg-white/95 text-neutral-900 text-xs font-bold rounded-xl shadow-lg hover:bg-purple-600 hover:text-white transition-all scale-95 group-hover:scale-100">
            <Eye className="w-3.5 h-3.5" /> Quick Style View (အမြန်ကြည့်ရန်)
          </button>
        </div>

        {/* Badges Overlay Stack */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.isVipEarlyAccess && (
            <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm tracking-wide uppercase">
              <Lock className="w-2.5 h-2.5 fill-current" /> VIP Early
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm tracking-wide uppercase">
              ✨ New
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm tracking-wide uppercase">
              🔥 Sale
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm tracking-wide uppercase animate-pulse">
              Low Stock
            </span>
          )}
        </div>

        {/* Stock Badges */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl tracking-wider uppercase shadow-md">
              Out of stock (ပစ္စည်းပြတ်သွားပါပြီ)
            </span>
          </div>
        )}
      </div>

      {/* Details Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            <span>{product.category}</span>
            <div className="flex items-center gap-0.5 text-purple-600">
              <Star className="w-3 h-3 fill-current" />
              <span>{avgRating} ({totalReviews})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-bold text-neutral-900 font-display line-clamp-1 hover:text-purple-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-1">{product.description}</p>
        </div>

        <div className="flex justify-between items-baseline pt-3 mt-3 border-t border-neutral-50">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-sm font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.isOnSale && product.originalPrice && (
              <span className="font-mono text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-neutral-400">
            {product.isVipEarlyAccess && !isUserPremium ? (
              <span className="text-purple-600 font-bold">VIP Only (VIP သီးသန့်)</span>
            ) : (
              'In Stock (ပစ္စည်းရှိသည်)'
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
