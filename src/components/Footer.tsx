import React, { useState } from 'react';
import { Leaf, TreePine, Heart, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-stone-900 border-t border-stone-800 text-stone-300 text-xs">
      {/* Newsletter Section */}
      <div className="border-b border-stone-800 bg-orange-950/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-stone-100 flex items-center justify-center md:justify-start gap-2">
              <TreePine className="w-5 h-5 text-orange-400" />
              Join SHOPYVIA & get 15% off your first order
            </h3>
            <p className="text-stone-400">
              Subscribe for smart tech releases, eco updates, and instant promo code <strong className="text-orange-300">EARTH15</strong>.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-orange-950 text-orange-300 border border-orange-800 px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-orange-400" />
              Subscribed! Use code <strong className="text-white underline">EARTH15</strong> at checkout.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-800 text-stone-100 text-xs pl-10 pr-3 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-stone-950 font-bold">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-stone-100 uppercase tracking-wider">SHOPYVIA</span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Curating smart devices, sustainable wearables, zero-waste gear, and ethically sourced lifestyle items.
          </p>
          <div className="text-[11px] text-orange-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> B-Corp Certified & Climate Neutral
          </div>
        </div>

        {/* Shop Categories */}
        <div className="space-y-2">
          <h4 className="text-stone-100 font-bold uppercase tracking-wider text-[11px]">Shop Categories</h4>
          <ul className="space-y-1.5 text-stone-400">
            <li className="hover:text-stone-100 cursor-pointer transition-colors">Tech & Smart Accessories</li>
            <li className="hover:text-stone-100 cursor-pointer transition-colors">Organic Apparel & Textiles</li>
            <li className="hover:text-stone-100 cursor-pointer transition-colors">Artisan Home & Living</li>
            <li className="hover:text-stone-100 cursor-pointer transition-colors">Zero-Waste Wellness</li>
          </ul>
        </div>

        {/* Sustainability Impact */}
        <div className="space-y-2">
          <h4 className="text-stone-100 font-bold uppercase tracking-wider text-[11px]">Our Impact Pledge</h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>🌱 1 Tree Planted Per Order</li>
            <li>📦 100% Recyclable Packaging</li>
            <li>⚡ 100% Solar-Powered Warehouse</li>
            <li>🌊 Ocean Clean-Up Partner</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-2">
          <h4 className="text-stone-100 font-bold uppercase tracking-wider text-[11px]">Customer Support</h4>
          <ul className="space-y-1.5 text-stone-400">
            <li>Email: support@shopyvia.com</li>
            <li>30-Day Hassle-Free Returns</li>
            <li>Carbon-Neutral Shipping Tracker</li>
            <li>FAQs & Circular Trade-In Program</li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-800 py-6 text-center text-stone-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 SHOPYVIA Inc. Crafted with care.</span>
          <div className="flex items-center gap-3">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Sustainability Report</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
