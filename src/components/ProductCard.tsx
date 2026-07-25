import React from 'react';
import { Star, Leaf, Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  cartQuantity: number;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  cartQuantity,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group relative bg-stone-850 rounded-2xl overflow-hidden border border-stone-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide shadow-md ${
              product.badge === 'Best Seller'
                ? 'bg-amber-500 text-stone-950'
                : product.badge === 'Eco Hero'
                ? 'bg-emerald-500 text-stone-950'
                : product.badge === 'Sale'
                ? 'bg-rose-500 text-white'
                : 'bg-teal-600 text-white'
            }`}>
              {product.badge}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
            isWishlisted 
              ? 'bg-rose-500 text-white' 
              : 'bg-stone-900/60 text-stone-300 hover:text-white hover:bg-stone-900/90'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Eco Leaf Score Indicator */}
        <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700/60 flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
          <Leaf className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
          <span>Eco {product.ecoRating}/5</span>
        </div>
      </div>

      {/* Product Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span className="font-medium text-emerald-400/90 uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-stone-200">{product.rating}</span>
              <span className="text-stone-500">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-semibold text-stone-100 text-sm line-clamp-2 group-hover:text-emerald-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-stone-400 mt-1 line-clamp-1 italic">
            🌿 {product.sustainabilityTag}
          </p>
        </div>

        {/* Footer Price & Add Button */}
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-stone-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              cartQuantity > 0
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200 border border-stone-700'
            }`}
          >
            {cartQuantity > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{cartQuantity} in cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
