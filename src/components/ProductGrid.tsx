import React from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, Filter } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  wishlistIds: string[];
  cartItemQuantities: Record<string, number>;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  filterState,
  onFilterChange,
  onResetFilters,
  wishlistIds,
  cartItemQuantities,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  const hasActiveFilters = 
    filterState.category !== 'All' ||
    filterState.searchQuery !== '' ||
    filterState.maxPrice < 250 ||
    filterState.ecoOnly ||
    filterState.minRating > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="products">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-1">
            Ethical & Smart Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
            {filterState.category === 'All' ? 'All Featured Products' : filterState.category}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">
            Discover {products.length} thoughtfully crafted items designed for smart, zero-waste living.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-850 px-3 py-2 rounded-xl border border-stone-800 text-xs text-stone-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-medium text-stone-400">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-stone-100 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-stone-900">Most Popular</option>
              <option value="rating" className="bg-stone-900">Highest Rated</option>
              <option value="price-asc" className="bg-stone-900">Price: Low to High</option>
              <option value="price-desc" className="bg-stone-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-stone-850 p-4 rounded-2xl border border-stone-800 mb-8 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = filterState.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange({ category: cat })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-stone-950 font-extrabold shadow-md shadow-orange-950/50'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-750 hover:text-stone-100 border border-stone-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Advanced Filter Sliders & Checkbox */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-stone-800 text-xs">
          {/* Price Range Filter */}
          <div className="space-y-1">
            <div className="flex justify-between text-stone-300">
              <span className="font-semibold text-stone-400">Max Price</span>
              <span className="font-bold text-orange-400">${filterState.maxPrice}</span>
            </div>
            <input
              type="range"
              min="25"
              max="250"
              step="5"
              value={filterState.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
              className="w-full accent-orange-500 bg-stone-750 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-1">
            <div className="flex justify-between text-stone-300">
              <span className="font-semibold text-stone-400">Min Rating</span>
              <span className="font-bold text-amber-400">{filterState.minRating > 0 ? `${filterState.minRating}+ Stars` : 'Any'}</span>
            </div>
            <select
              value={filterState.minRating}
              onChange={(e) => onFilterChange({ minRating: Number(e.target.value) })}
              className="w-full bg-stone-800 text-stone-200 border border-stone-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>
          </div>

          {/* Eco Only Checkbox */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-stone-200 font-medium">
              <input
                type="checkbox"
                checked={filterState.ecoOnly}
                onChange={(e) => onFilterChange({ ecoOnly: e.target.checked })}
                className="w-4 h-4 rounded accent-orange-500 bg-stone-800 border-stone-700 cursor-pointer"
              />
              <span>5/5 Eco Score Only</span>
            </label>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-end">
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-xl transition-colors border border-rose-500/30"
              >
                <X className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/60 text-[11px]">
            <span className="text-stone-400 font-medium">Active:</span>
            {filterState.category !== 'All' && (
              <span className="bg-orange-950 text-orange-300 border border-orange-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                Category: {filterState.category}
                <button onClick={() => onFilterChange({ category: 'All' })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {filterState.searchQuery && (
              <span className="bg-orange-950 text-orange-300 border border-orange-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                "{filterState.searchQuery}"
                <button onClick={() => onFilterChange({ searchQuery: '' })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {filterState.maxPrice < 250 && (
              <span className="bg-orange-950 text-orange-300 border border-orange-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                Under ${filterState.maxPrice}
                <button onClick={() => onFilterChange({ maxPrice: 250 })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {filterState.ecoOnly && (
              <span className="bg-orange-950 text-orange-300 border border-orange-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                Eco Rating 5
                <button onClick={() => onFilterChange({ ecoOnly: false })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Grid Render */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              cartQuantity={cartItemQuantities[product.id] || 0}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-stone-850 rounded-2xl border border-stone-800 max-w-lg mx-auto">
          <Filter className="w-12 h-12 text-stone-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-200">No matching products found</h3>
          <p className="text-stone-400 text-xs mt-1 mb-4 px-6">
            Try adjusting your search terms, price limits, or clearing active filters to view our full collection.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-stone-950 font-extrabold text-xs rounded-xl transition-all shadow-md"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
