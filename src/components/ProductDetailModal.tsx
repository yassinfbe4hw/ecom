import React, { useState } from 'react';
import { X, Star, Leaf, Heart, Plus, Minus, Check, ShieldCheck, Truck, RefreshCcw, Send } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailModalProps {
  product: Product;
  reviews: Review[];
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCartWithDetails: (
    product: Product, 
    quantity: number, 
    color?: string, 
    size?: string,
    buyNow?: boolean
  ) => void;
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  reviews,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCartWithDetails,
  onAddReview
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.sizes?.[0] || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const galleryImages = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    onAddReview({
      productId: product.id,
      userName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      verified: true
    });

    setNewReviewName('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-750 rounded-full backdrop-blur transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-stone-950 text-xs font-extrabold uppercase rounded-lg shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === img ? 'border-emerald-500 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Purchase Column */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-stone-100">{product.rating}</span>
                    <span className="text-stone-400">({reviews.length} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-stone-100 leading-snug">
                  {product.name}
                </h1>

                {/* Eco Tag Banner */}
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <Leaf className="w-4 h-4 text-emerald-400 fill-emerald-400 flex-shrink-0" />
                  <span><strong>Eco Score {product.ecoRating}/5:</strong> {product.sustainabilityTag}</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-stone-100">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-500 line-through font-semibold">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.stock < 10 && (
                    <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                      Only {product.stock} left in stock!
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-300 mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Variants */}
                {product.variants?.colors && product.variants.colors.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <label className="text-xs font-semibold text-stone-300 block">
                      Color: <span className="text-emerald-400 font-bold">{selectedColor}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.variants.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                            selectedColor === c.name ? 'border-emerald-400 scale-110 shadow' : 'border-stone-700 opacity-80'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check className="w-4 h-4 text-white drop-shadow-md" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {product.variants?.sizes && product.variants.sizes.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <label className="text-xs font-semibold text-stone-300 block">
                      Size: <span className="text-emerald-400 font-bold">{selectedSize}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.variants.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedSize === s
                              ? 'bg-emerald-500 text-stone-950 shadow'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="mt-6 space-y-2">
                  <label className="text-xs font-semibold text-stone-300 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-stone-800 rounded-xl border border-stone-700">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-stone-400 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-extrabold text-stone-100">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-2 text-stone-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`p-3 rounded-xl border transition-all ${
                        isWishlisted
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                          : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                      }`}
                      title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-stone-800">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCartWithDetails(product, quantity, selectedColor, selectedSize, false)}
                    className="py-3.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-100 font-bold text-xs sm:text-sm border border-stone-700 transition-all flex items-center justify-center gap-2"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => onAddToCartWithDetails(product, quantity, selectedColor, selectedSize, true)}
                    className="py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 px-1">
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Shipping $50+</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 30-Day Guarantee</span>
                  <span className="flex items-center gap-1"><RefreshCcw className="w-3.5 h-3.5 text-emerald-400" /> Plastic Free</span>
                </div>
              </div>

            </div>

          </div>

          {/* Lower Tabs: Features & Reviews */}
          <div className="pt-6 border-t border-stone-800">
            <div className="flex gap-4 border-b border-stone-800 text-sm font-semibold mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 transition-all ${
                  activeTab === 'details' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Key Features
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 transition-all ${
                  activeTab === 'specs' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-all ${
                  activeTab === 'reviews' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* Features Tab */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-3 bg-stone-850 rounded-xl border border-stone-800 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="bg-stone-850 rounded-xl border border-stone-800 divide-y divide-stone-800 text-xs">
                {product.specs?.map((spec, idx) => (
                  <div key={idx} className="p-3 flex justify-between">
                    <span className="text-stone-400 font-medium">{spec.label}</span>
                    <span className="text-stone-100 font-semibold">{spec.value}</span>
                  </div>
                )) || <div className="p-4 text-stone-400">Standard eco specifications apply.</div>}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Write Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-stone-850 p-4 rounded-xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">Leave a Customer Review</h4>
                  
                  {reviewSubmitted ? (
                    <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-lg text-xs font-semibold">
                      ✓ Thank you! Your review has been submitted.
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          className="bg-stone-800 text-stone-100 text-xs px-3 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-emerald-500"
                        />

                        <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
                          <span className="text-xs text-stone-400 font-medium">Rating:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setNewReviewRating(star)}
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-stone-600'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Write your honest feedback on product quality, packaging, and eco features..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-stone-800 text-stone-100 text-xs p-3 rounded-lg border border-stone-700 focus:outline-none focus:border-emerald-500"
                      />

                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Submit Review
                      </button>
                    </>
                  )}
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-stone-850 rounded-xl border border-stone-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-100">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-stone-500 text-[11px]">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-700'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-stone-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-stone-400 italic">No reviews yet for this item. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
