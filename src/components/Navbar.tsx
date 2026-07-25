import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  Leaf, 
  Menu, 
  X, 
  PackageCheck,
  RotateCcw,
  Percent
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAiAssistant: () => void;
  onOpenOrders: () => void;
  ecoFilter: boolean;
  onToggleEcoFilter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartItems,
  wishlistIds,
  onOpenCart,
  onOpenWishlist,
  onOpenAiAssistant,
  onOpenOrders,
  ecoFilter,
  onToggleEcoFilter
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all">
      {/* Top Banner */}
      <div className="bg-orange-950/80 text-orange-100 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-3 border-b border-orange-800/50">
        <span className="inline-flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          100% Carbon Neutral Shipping on all orders
        </span>
        <span className="hidden sm:inline text-orange-400">•</span>
        <span className="hidden sm:inline-flex items-center gap-1">
          <Percent className="w-3.5 h-3.5" />
          Use code <strong className="text-white underline decoration-orange-400">ECO10</strong> for 10% off
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => onSelectCategory('All')} 
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-stone-950 shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform font-black">
                <Leaf className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-stone-100 via-stone-200 to-orange-400 bg-clip-text text-transparent uppercase">
                  SHOPYVIA
                </span>
                <span className="block text-[10px] text-stone-400 tracking-wider uppercase -mt-1 font-semibold">
                  Smart & Sustainable Goods
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search smart watches, organic linen, solar gear..."
                className="w-full bg-stone-800/90 text-stone-100 text-sm pl-10 pr-4 py-2 rounded-xl border border-stone-700/80 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-stone-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white bg-stone-700 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Concierge Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md shadow-orange-950/40 border border-orange-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-stone-950 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">Ask</span> AI Concierge
            </button>

            {/* Eco Filter Toggle */}
            <button
              onClick={onToggleEcoFilter}
              title="Toggle Eco Hero Filter"
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                ecoFilter 
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/50' 
                  : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-200'
              }`}
            >
              <Leaf className={`w-3.5 h-3.5 ${ecoFilter ? 'text-orange-400 fill-orange-400' : ''}`} />
              Eco Hero
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={onOpenOrders}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl transition-colors relative"
              title="Track Orders"
            >
              <PackageCheck className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl transition-colors relative"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-rose-400 fill-rose-400/30' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-100 rounded-xl border border-stone-700 transition-all hover:border-stone-600"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-orange-400" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold">
                ${cartSubtotal.toFixed(2)}
              </span>
            </button>
          </div>

        </div>

        {/* Category Bar for Desktop */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto border-t border-stone-800/80 text-xs font-medium scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/30'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900 px-4 py-4 space-y-4">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search items..."
              className="w-full bg-stone-800 text-stone-100 text-sm pl-10 pr-4 py-2 rounded-xl border border-stone-700"
            />
          </div>

          {/* Categories */}
          <div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">Categories</span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                    activeCategory === cat
                      ? 'bg-orange-500 text-stone-950 font-bold'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
