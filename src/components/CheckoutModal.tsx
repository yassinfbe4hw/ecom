import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, CreditCard, Truck, Check, Sparkles, ArrowRight, TreePine, Package } from 'lucide-react';
import { CartItem, ShippingAddress, Order } from '../types';
import { PROMO_CODES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedPromoCode: string;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedPromoCode,
  onOrderComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    address: '742 Evergreen Terrace',
    city: 'Portland',
    postalCode: '97201',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal'>('card');
  const [carbonOffset, setCarbonOffset] = useState(true);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const promoInfo = PROMO_CODES[appliedPromoCode];
  const discountAmount = promoInfo ? (subtotal * promoInfo.discountPercent) / 100 : 0;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const offsetFee = carbonOffset ? 1.50 : 0;
  const total = subtotal - discountAmount + shippingCost + offsetFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Fire celebratory confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      const newOrder: Order = {
        id: `ECO-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost + offsetFee,
        total,
        shippingAddress: address,
        paymentMethod: paymentMethod === 'card' ? 'Visa ending in 4242' : paymentMethod === 'applepay' ? 'Apple Pay' : 'PayPal',
        status: 'Order Placed',
        trackingNumber: `TRK-88${Math.floor(10000 + Math.random() * 90000)}US`,
        estimatedDelivery: '3-5 Business Days (Carbon Neutral)'
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
      setStep(3); // Confirmation step
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-750 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Header */}
        <div className="mb-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-1">
            {step === 3 ? 'Order Confirmed' : `Step ${step} of 2 — Secure Checkout`}
          </span>
          <h2 className="text-2xl font-bold text-stone-100">
            {step === 1 && 'Shipping Details'}
            {step === 2 && 'Payment & Sustainability'}
            {step === 3 && 'Thank You for Shopping Green! 🎉'}
          </h2>
        </div>

        {/* STEP 1: Shipping Address Form */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-stone-800 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full bg-stone-800 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                className="w-full bg-stone-800 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">ZIP / Postal</label>
                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-stone-800">
              <span className="text-xs text-stone-400">Total: <strong className="text-orange-400 text-sm">${total.toFixed(2)}</strong></span>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment & Sustainability Options */}
        {step === 2 && (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300 block">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card' ? 'bg-orange-500/20 text-orange-300 border-orange-500' : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Credit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'applepay' ? 'bg-orange-500/20 text-orange-300 border-orange-500' : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  Apple Pay
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'paypal' ? 'bg-orange-500/20 text-orange-300 border-orange-500' : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  PayPal
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-850 rounded-xl border border-stone-800 space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2 rounded-lg border border-stone-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-400 block mb-1">Expiry</label>
                    <input type="text" defaultValue="08/28" className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2 rounded-lg border border-stone-700" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-400 block mb-1">CVC</label>
                    <input type="text" defaultValue="•••" className="w-full bg-stone-800 text-stone-100 text-xs px-3 py-2 rounded-lg border border-stone-700" />
                  </div>
                </div>
              </div>
            )}

            {/* Tree Planting Offset Option */}
            <label className="p-3 bg-orange-950/60 rounded-xl border border-orange-800 flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={carbonOffset}
                onChange={(e) => setCarbonOffset(e.target.checked)}
                className="w-4 h-4 accent-orange-500 bg-stone-800 rounded"
              />
              <div className="text-xs">
                <span className="font-bold text-orange-300 flex items-center gap-1">
                  <TreePine className="w-4 h-4 text-orange-400" />
                  Plant 2 Trees & Offset Package Footprint (+$1.50)
                </span>
                <span className="text-stone-400 block text-[11px]">Directly funds Eden Reforestation Projects.</span>
              </div>
            </label>

            <div className="pt-4 flex justify-between items-center border-t border-stone-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-stone-400 hover:text-white"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <span>Place Order (${total.toFixed(2)})</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto border border-orange-500/40">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <p className="text-sm font-semibold text-orange-300">Your sustainable order has been placed!</p>
              <p className="text-xs text-stone-400 mt-1">
                We sent a receipt and real-time tracking link to <strong>{address.email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-stone-850 rounded-xl border border-stone-800 text-xs text-left space-y-2">
              <div className="flex justify-between text-stone-300">
                <span>Shipping To:</span>
                <strong className="text-stone-100">{address.fullName}, {address.city}</strong>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Total Paid:</span>
                <strong className="text-orange-400">${total.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>Status:</span>
                <strong className="text-orange-300 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" /> Preparing Carbon-Neutral Package
                </strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
