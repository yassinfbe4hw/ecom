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
      <div className="absolute inset-0 bg-gradient-to-r from-orange-950/40 via-stone-900 to-amber-950/30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold tracking-wide uppercase">
              <TreePine className="w-4 h-4 text-orange-400" />
              10,000+ Trees Planted This Year
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-100 leading-tight">
              Smart Tech & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
                Sustainable Living
              </span> Essentials
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore smart bracelets, eco-innovative wearables, organic apparel, artisan home decor, and zero-waste gear designed for lower footprint and peak performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-sm shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:border-orange-500/50"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Ask AI Gift Finder
              </button>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-800/50 group">
              <img
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=900"
                alt="Y68 Smart Watch Bracelet"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">Featured Smart Device</span>
                  <p className="text-sm font-semibold text-stone-100">Y68 Big Screen Smart Bracelet</p>
                  <p className="text-xs text-stone-400">HD Screen • Heart Rate & Blood Pressure</p>
                </div>
                <span className="text-base font-extrabold text-stone-100 bg-orange-950/90 px-2.5 py-1 rounded-lg border border-orange-600/40">
                  $29
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-800/80 text-stone-300 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">Carbon-Neutral Delivery</span>
              <span className="text-stone-400">Free shipping on orders over $50</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">30-Day Guarantee</span>
              <span className="text-stone-400">Hassle-free returns & verified quality</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold block text-stone-100 text-sm">Circular Trade-In</span>
              <span className="text-stone-400">Recycle old electronics & goods for credits</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
