export interface ProductVariant {
  colors?: { name: string; hex: string }[];
  sizes?: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'Apparel' | 'Home & Living' | 'Wellness' | 'Tech & Accessories';
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  stock: number;
  ecoRating: number; // 1 to 5
  badge?: 'Best Seller' | 'Eco Hero' | 'New Arrival' | 'Sale' | 'Trending';
  sustainabilityTag: string; // e.g. "100% Organic Cotton", "1 Tree Planted", "Net Zero Carbon"
  variants?: ProductVariant;
  specs?: ProductSpec[];
}

export interface CartItem {
  id: string; // unique id combining product.id + variants
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'Order Placed' | 'In Production' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  ecoOnly: boolean;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
