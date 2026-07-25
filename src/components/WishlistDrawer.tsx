import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-lg font-bold">Your Saved Wishlist</h2>
              <span className="text-xs font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
                {wishlistedProducts.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-750 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-stone-800/60">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-stone-950 border border-stone-800 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-100 truncate">
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-stone-400 mt-0.5">
                      🌿 {product.sustainabilityTag}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-stone-200">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => onMoveToCart(product)}
                        className="px-2.5 py-1 rounded-lg bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Cart
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 text-stone-500 hover:text-rose-400 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-sm font-semibold text-stone-300">Your wishlist is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any product card to save your favorite eco-friendly items for later!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
