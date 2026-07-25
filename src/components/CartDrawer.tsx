import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedPromoCode: string;
  onApplyPromoCode: (code: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedPromoCode,
  onApplyPromoCode,
  onProceedToCheckout
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const promoInfo = PROMO_CODES[appliedPromoCode];
  const discountAmount = promoInfo ? (subtotal * promoInfo.discountPercent) / 100 : 0;
  
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.99;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      onApplyPromoCode(cleanCode);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try ECO10 or GREEN20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold">Your Eco Cart</h2>
              <span className="text-xs font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-750 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-stone-850 p-4 border-b border-stone-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-4 h-4 text-emerald-400" />
                {amountNeededForFreeShipping > 0 ? (
                  <>Add <strong className="text-emerald-400">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Carbon-Neutral Shipping</>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> You unlocked FREE Shipping!
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-stone-800/60">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-stone-950 border border-stone-800 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-100 truncate">
                      {item.product.name}
                    </h4>

                    {/* Color/Size Tags */}
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="flex gap-2 text-[10px] text-stone-400 mt-0.5">
                        {item.selectedColor && <span>Color: <strong className="text-stone-300">{item.selectedColor}</strong></span>}
                        {item.selectedSize && <span>Size: <strong className="text-stone-300">{item.selectedSize}</strong></span>}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-extrabold text-stone-200">
                        ${item.product.price.toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-stone-800 rounded-lg border border-stone-700">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-100">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-stone-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-sm font-semibold text-stone-300">Your cart is currently empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse our sustainable goods collection and add zero-waste items to get started!
                </p>
              </div>
            )}
          </div>

          {/* Cart Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-800 bg-stone-900 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (ECO10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-stone-800 text-stone-100 text-xs pl-8 pr-3 py-2 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromoCode && (
                  <div className="flex items-center justify-between text-xs text-orange-400 font-medium bg-orange-950/60 p-2 rounded-lg border border-orange-800">
                    <span>Applied: <strong>{appliedPromoCode}</strong> ({promoInfo?.description})</span>
                    <button type="button" onClick={() => onApplyPromoCode('')} className="text-stone-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-rose-400">{promoError}</p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Subtotal</span>
                  <span className="font-semibold text-stone-200">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-orange-400 font-semibold">
                    <span>Discount ({promoInfo?.discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-stone-400">Carbon-Neutral Shipping</span>
                  <span className="font-semibold text-stone-200">
                    {shippingCost === 0 ? <strong className="text-orange-400 uppercase text-[10px]">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-stone-100 pt-2 border-t border-stone-800">
                  <span>Estimated Total</span>
                  <span className="text-orange-400 text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-sm shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
