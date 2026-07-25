import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AiShoppingAssistant } from './components/AiShoppingAssistant';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data/products';
import { Product, CartItem, Review, Order, FilterState } from './types';

const CATEGORIES = ['All', 'Apparel', 'Home & Living', 'Wellness', 'Tech & Accessories'];

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p-1', 'p-4']);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedPromoCode, setAppliedPromoCode] = useState('ECO10');

  // Drawers & Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 250,
    minRating: 0,
    ecoOnly: false,
    sortBy: 'popular'
  });

  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: 'All',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 250,
      minRating: 0,
      ecoOnly: false,
      sortBy: 'popular'
    });
  };

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      if (filterState.category !== 'All' && prod.category !== filterState.category) {
        return false;
      }
      if (
        filterState.searchQuery &&
        !prod.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) &&
        !prod.description.toLowerCase().includes(filterState.searchQuery.toLowerCase()) &&
        !prod.sustainabilityTag.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (prod.price > filterState.maxPrice) {
        return false;
      }
      if (filterState.minRating > 0 && prod.rating < filterState.minRating) {
        return false;
      }
      if (filterState.ecoOnly && prod.ecoRating < 5) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0);
        default: return b.reviewsCount - a.reviewsCount;
      }
    });
  }, [products, filterState]);

  // Cart Quantities Map
  const cartItemQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((item) => {
      map[item.product.id] = (map[item.product.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  // Wishlisted Products List
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const uniqueId = product.id;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: uniqueId,
            product,
            quantity: 1,
            selectedColor: product.variants?.colors?.[0]?.name,
            selectedSize: product.variants?.sizes?.[0]
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleAddToCartWithDetails = (
    product: Product,
    quantity: number,
    color?: string,
    size?: string,
    buyNow?: boolean
  ) => {
    const uniqueId = `${product.id}-${color || ''}-${size || ''}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: uniqueId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size
          }
        ];
      }
    });

    setSelectedProduct(null);

    if (buyNow) {
      setIsCheckoutOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Review Handler
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: `r-${Date.now()}`,
      date: 'Just now'
    };
    setReviews((prev) => [review, ...prev]);
  };

  // Order Complete Handler
  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-emerald-500 selection:text-stone-950 flex flex-col">
      
      {/* Header Navigation */}
      <Navbar
        categories={CATEGORIES}
        activeCategory={filterState.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        ecoFilter={filterState.ecoOnly}
        onToggleEcoFilter={() => handleFilterChange({ ecoOnly: !filterState.ecoOnly })}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner
          onShopNowClick={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={filteredProducts}
          categories={CATEGORIES}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          wishlistIds={wishlistIds}
          cartItemQuantities={cartItemQuantities}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          reviews={reviews.filter((r) => r.productId === selectedProduct.id)}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCartWithDetails={handleAddToCartWithDetails}
          onAddReview={handleAddReview}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={setAppliedPromoCode}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedPromoCode={appliedPromoCode}
        onOrderComplete={handleOrderComplete}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={(id) => handleToggleWishlist(id)}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* AI Shopping Assistant Modal */}
      <AiShoppingAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Order Tracking & History Modal */}
      <OrderTrackingModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

    </div>
  );
}
