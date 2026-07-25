import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, TreePine } from 'lucide-react';

interface HeroBannerProps {
  onShopNowClick: () => void;
  onOpenAiAssistant: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNowClick, onOpenAiAssistant }) => {
  return (
    <div className="relative overflow-hidden bg-stone-900 border-b border-stone-800">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-teal-950/30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              <TreePine className="w-4 h-4 text-emerald-400" />
              10,000+ Trees Planted This Year
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-100 leading-tight">
              Thoughtfully Crafted <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Sustainable Goods
              </span> for Modern Living
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore ethically sourced apparel, artisan home decor, zero-waste care essentials, and eco-innovative tech designed for a lower footprint and higher quality of life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-emerald-500/50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Ask AI Gift Finder
              </button>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-800/50 group">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=900"
                alt="Eco-friendly bamboo and linen lifestyle items"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Featured Innovation</span>
                  <p className="text-sm font-semibold text-stone-100">Artisan Bamboo Wireless Charger</p>
                  <p className="text-xs text-stone-400">100% Biodegradable & Fast Charging</p>
                </div>
                <span className="text-base font-extrabold text-stone-100 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-600/40">
                  $48
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-800/80 text-stone-300 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">Carbon-Neutral Delivery</span>
              <span className="text-stone-400">Free shipping on orders over $50</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">30-Day Pure Guarantee</span>
              <span className="text-stone-400">Hassle-free returns & zero plastic</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">Circular Trade-In</span>
              <span className="text-stone-400">Recycle old goods for store credits</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
