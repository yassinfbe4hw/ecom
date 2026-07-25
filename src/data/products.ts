import { Product, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Artisan Bamboo Wireless Charging Stand',
    price: 48,
    originalPrice: 62,
    rating: 4.9,
    reviewsCount: 128,
    category: 'Tech & Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1616410011236-7a42121dd981?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Elevate your desk setup with this sustainable fast-charging dock crafted from ethically harvested natural Moso bamboo and recycled aluminum. Dual-coil Qi technology supports phone charging in both portrait and landscape.',
    features: [
      '15W Fast Qi Wireless Charging',
      '100% Biodegradable Organic Bamboo Surface',
      'Dual Coil Alignment for vertical & horizontal viewing',
      'Over-heat and surge safety protection'
    ],
    stock: 24,
    ecoRating: 5,
    badge: 'Best Seller',
    sustainabilityTag: 'Zero-Plastic & FSC Certified',
    variants: {
      colors: [
        { name: 'Natural Bamboo', hex: '#d4b28c' },
        { name: 'Dark Walnut Stain', hex: '#5c4033' }
      ]
    },
    specs: [
      { label: 'Input', value: 'USB-C 9V/2A' },
      { label: 'Dimensions', value: '110 x 85 x 120 mm' },
      { label: 'Weight', value: '210g' },
      { label: 'Compatibility', value: 'All Qi-enabled Apple & Android devices' }
    ]
  },
  {
    id: 'p-2',
    name: 'Organic Linen & Bamboo Lounge Shirt',
    price: 68,
    originalPrice: 85,
    rating: 4.8,
    reviewsCount: 94,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Unmatched breathable comfort made from an eco-blend of French flax linen and bamboo viscose. Pre-shrunk, hypoallergenic, and colored with botanical non-toxic vegetable dyes.',
    features: [
      '55% French Organic Linen / 45% Bamboo Viscose',
      'Ultra-breathable weave ideal for warm climates',
      'Plastic-free natural coconut shell buttons',
      'Reinforced double-stitched seams'
    ],
    stock: 18,
    ecoRating: 5,
    badge: 'Eco Hero',
    sustainabilityTag: '100% Organic & Non-Toxic Dyes',
    variants: {
      colors: [
        { name: 'Sage Green', hex: '#8a9a86' },
        { name: 'Oatmeal Natural', hex: '#e3d7c5' },
        { name: 'Terracotta', hex: '#c86d51' }
      ],
      sizes: ['S', 'M', 'L', 'XL']
    },
    specs: [
      { label: 'Fit', value: 'Relaxed Unisex Fit' },
      { label: 'Care', value: 'Machine wash cold, air dry line recommended' },
      { label: 'Origin', value: 'Ethically spun in Portugal' }
    ]
  },
  {
    id: 'p-3',
    name: 'Hand-Poured Soy Wax Botanical Candle',
    price: 32,
    rating: 4.9,
    reviewsCount: 210,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Transform your space with pure essential oil aromas of Cedarwood, Bergamot, and Wild Lavender. Hand-poured into a reusable amber glass jar with a crackling wooden wick.',
    features: [
      '100% GMO-Free American Soy Wax',
      'Lead-free natural crackling wooden wick',
      '60+ Hours clean burn time with zero soot',
      'Reusable Amber Vessel after candle burn'
    ],
    stock: 40,
    ecoRating: 5,
    badge: 'Trending',
    sustainabilityTag: 'Clean Air & Handcrafted',
    specs: [
      { label: 'Burn Time', value: '~65 Hours' },
      { label: 'Volume', value: '11 oz / 312g' },
      { label: 'Scent Profile', value: 'Cedarwood, Bergamot, Fresh Eucalyptus' }
    ]
  },
  {
    id: 'p-4',
    name: 'Vacuum Insulated Steel Thermal Water Bottle',
    price: 36,
    originalPrice: 42,
    rating: 4.7,
    reviewsCount: 175,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Keep drinks ice cold for 24 hours or piping hot for 12 hours. Built with food-grade 18/8 pro stainless steel and topped with a bamboo leak-proof loop cap.',
    features: [
      'Double-wall vacuum insulation technology',
      'BPA-Free, Phthalate-Free, Lead-Free',
      'Durable powder coating resistant to scratches',
      'Eliminates over 1,400 single-use plastic bottles per year'
    ],
    stock: 35,
    ecoRating: 5,
    badge: 'Best Seller',
    sustainabilityTag: '1 Bottle = 100 Plastic Bottles Cleared',
    variants: {
      colors: [
        { name: 'Matte Charcoal', hex: '#333333' },
        { name: 'Forest Moss', hex: '#2d4c38' },
        { name: 'Desert Sand', hex: '#d2b48c' }
      ]
    },
    specs: [
      { label: 'Capacity', value: '750ml / 25oz' },
      { label: 'Thermal Tech', value: 'TempShield Triple Insulation' },
      { label: 'Cap Type', value: 'Leakproof Bamboo Flex Cap' }
    ]
  },
  {
    id: 'p-5',
    name: 'Recycled Ocean Plastic Waterproof Backpack',
    price: 110,
    originalPrice: 135,
    rating: 4.9,
    reviewsCount: 88,
    category: 'Tech & Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    description: 'Crafted from 32 recycled plastic bottles retrieved from ocean shorelines. Features a padded 16-inch laptop compartment, hidden security pocket, and ergonomic air-mesh back panel.',
    features: [
      'Made from 100% Repreve recycled ocean plastics',
      'Weatherproof IPX5 sealed zipper closures',
      'Padded sleeve fits laptops up to 16"',
      'Luggage pass-through sleeve for travel ease'
    ],
    stock: 12,
    ecoRating: 5,
    badge: 'Eco Hero',
    sustainabilityTag: 'Removes Ocean Plastic Pollution',
    variants: {
      colors: [
        { name: 'Deep Ocean Navy', hex: '#1b263b' },
        { name: 'Stone Gray', hex: '#778899' }
      ]
    },
    specs: [
      { label: 'Capacity', value: '22 Liters' },
      { label: 'Dimensions', value: '45 x 30 x 16 cm' },
      { label: 'Laptop Sleeve', value: 'Up to 16" MacBook Pro' }
    ]
  },
  {
    id: 'p-6',
    name: 'Zero-Waste Organic Skincare Routine Set',
    price: 54,
    rating: 4.8,
    reviewsCount: 142,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    description: 'Complete 4-piece skin nourishment kit containing Rosehip cleansing bar, Hyaluronic Seaweed serum, Aloe soothing toner mist, and a bamboo gentle face exfoliator pad.',
    features: [
      '100% Certified Organic cold-pressed botanicals',
      'Completely Plastic-Free glass and metal packaging',
      'Cruelty-Free certified Leaping Bunny standard',
      'Refillable pouches available'
    ],
    stock: 28,
    ecoRating: 5,
    badge: 'New Arrival',
    sustainabilityTag: '100% Vegan & Plastic Free',
    specs: [
      { label: 'Set Includes', value: 'Face Cleanser (100g), Mist (100ml), Serum (30ml), Exfoliator Pad' },
      { label: 'Skin Type', value: 'Sensitive, Dry, and Combination skin' }
    ]
  },
  {
    id: 'p-7',
    name: 'Minimalist Handwoven Wool Rug (4x6 ft)',
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 56,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800',
    description: 'Woven by artisan cooperatives using un-dyed pure sheep wool. Soft underfoot, naturally stain-resistant, and completely biodegradable at end of life.',
    features: [
      'Hand-loomed 100% undyed natural New Zealand wool',
      'Fair Trade Certified craftsman production',
      'Reversible design for twice the wear life',
      'Naturally fire-resistant and soil-repellent'
    ],
    stock: 8,
    ecoRating: 4,
    badge: 'Sale',
    sustainabilityTag: 'Fair Trade & Handcrafted',
    specs: [
      { label: 'Dimensions', value: '120 x 180 cm (4 x 6 ft)' },
      { label: 'Pile Height', value: '12 mm Soft Flatweave' }
    ]
  },
  {
    id: 'p-8',
    name: 'Plant-Based Solar Bluetooth Speaker',
    price: 79,
    originalPrice: 95,
    rating: 4.8,
    reviewsCount: 112,
    category: 'Tech & Accessories',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    description: 'High-fidelity 20W acoustic audio powered by high-efficiency integrated solar cells. 10 minutes of direct sunlight provides 30 minutes of playback.',
    features: [
      'Continuous Solar Auto-Charging in daylight',
      'Body made from cornstarch-based bioplastic & hemp fabric',
      'IPX7 Fully Waterproof rating',
      '30-hour internal battery backup via USB-C'
    ],
    stock: 15,
    ecoRating: 5,
    badge: 'Eco Hero',
    sustainabilityTag: 'Self-Powered Solar Energy',
    specs: [
      { label: 'Audio Power', value: '20W Stereo Dual Drivers' },
      { label: 'Battery', value: '5200 mAh with solar top-up' },
      { label: 'Water Rating', value: 'IPX7 Submersible' }
    ]
  },
  {
    id: 'p-9',
    name: 'Recycled Denim Unisex Chore Jacket',
    price: 98,
    rating: 4.9,
    reviewsCount: 82,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
    description: 'Classic workwear silhouette reinvented with 80% recycled post-consumer denim fabric. Saves 1,200 gallons of water compared to traditional denim manufacturing.',
    features: [
      '80% Recycled Cotton Denim / 20% Organic Cotton',
      'Waterless washing process reduces chemical pollution',
      'Spacious double utility chest & side hip pockets',
      'Corozo natural nut buttons'
    ],
    stock: 22,
    ecoRating: 5,
    badge: 'Best Seller',
    sustainabilityTag: '95% Water Saved in Production',
    variants: {
      colors: [
        { name: 'Washed Indigo', hex: '#3b5998' },
        { name: 'Raw Natural Canvas', hex: '#e8e2d5' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    specs: [
      { label: 'Weight', value: '12 oz Durable Canvas Denim' },
      { label: 'Care', value: 'Cold wash, inside out' }
    ]
  },
  {
    id: 'p-10',
    name: 'Artisan Ceramic Pour-Over Coffee Dripper Set',
    price: 45,
    rating: 4.9,
    reviewsCount: 164,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'Engineered for optimal thermal stability and extraction. Includes stoneware cone dripper, heat-resistant borosilicate glass carafe, and 50 unbleached compostable paper filters.',
    features: [
      'Hand-thrown clay ceramic with non-toxic lead-free glaze',
      'Spiral interior ribs for balanced flow rate',
      'Holds up to 600ml (2-4 cups) of fresh drip coffee',
      'Includes stainless steel reusable permanent mesh filter'
    ],
    stock: 30,
    ecoRating: 4,
    badge: 'Trending',
    sustainabilityTag: 'Zero Waste Coffee Ritual',
    specs: [
      { label: 'Carafe Capacity', value: '600 ml / 20 oz' },
      { label: 'Material', value: 'Stoneware & Borosilicate Glass' }
    ]
  },
  {
    id: 'p-11',
    name: 'Natural Cork Ergonomic Yoga Mat',
    price: 64,
    originalPrice: 78,
    rating: 4.8,
    reviewsCount: 99,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800',
    description: 'Sustainably harvested Portuguese cork surface that becomes grippier as you sweat! Backed with natural tree rubber for non-slip cushioning without PVC or toxic glues.',
    features: [
      'Self-sterilizing antibacterial antimicrobial cork',
      'Extra thick 5mm natural tree rubber base cushion',
      'Laser-engraved alignment lines for proper posture',
      'Free cotton carrying strap included'
    ],
    stock: 19,
    ecoRating: 5,
    badge: 'Eco Hero',
    sustainabilityTag: 'Biodegradable & Non-Toxic',
    specs: [
      { label: 'Dimensions', value: '183 x 61 cm (72 x 24 in)' },
      { label: 'Thickness', value: '5.0 mm Cushion' },
      { label: 'Weight', value: '2.4 kg' }
    ]
  },
  {
    id: 'p-12',
    name: 'Biodegradable Plant-Fiber Phone Case',
    price: 28,
    rating: 4.7,
    reviewsCount: 230,
    category: 'Tech & Accessories',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800',
    description: 'Ditch plastic cases! Made from flax straw and biopolymer resin. 100% compostable in backyards within 6 months while providing 6ft drop protection.',
    features: [
      'Tested for 2-meter (6.6ft) drop impact absorption',
      '100% Backyard Compostable material (ASTM D6400)',
      'Raised screen lip bezel prevents camera & glass scratches',
      'Qi wireless charging transparent compatible'
    ],
    stock: 50,
    ecoRating: 5,
    badge: 'Best Seller',
    sustainabilityTag: '100% Backyard Compostable',
    variants: {
      colors: [
        { name: 'Sage Green', hex: '#91a08b' },
        { name: 'Mustard Yellow', hex: '#e2a03f' },
        { name: 'Terracotta Pink', hex: '#d99b82' },
        { name: 'Midnight Black', hex: '#232323' }
      ]
    },
    specs: [
      { label: 'Compatibility', value: 'iPhone 15 / 16 Series & Galaxy S24' },
      { label: 'Material', value: 'Flax straw & PBAT biopolymer' }
    ]
  },
  {
    id: 'p-13',
    name: 'Y68 Big Screen Smart Bracelet',
    price: 29,
    originalPrice: 45,
    rating: 4.9,
    reviewsCount: 184,
    category: 'Tech & Accessories',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The Y68 Smart Watch & Health Bracelet features a large HD touchscreen display, 24/7 real-time heart rate & blood pressure health monitoring, SPO2 oxygen tracking, multi-sport aerobic fitness tracking, and convenient direct-plug USB quick charging.',
    features: [
      '1.44" HD Big Screen Color Touch Display',
      '24/7 Heart Rate, Blood Pressure & SPO2 Oxygen Monitor',
      'Multi-Sport Aerobic Fitness & Step Activity Tracker',
      'Direct USB Quick Charge (No extra cables required)',
      'IP67 Water & Dust Resistance with Smart Phone Notifications'
    ],
    stock: 45,
    ecoRating: 5,
    badge: 'New Arrival',
    sustainabilityTag: 'Energy Efficient & Low Footprint',
    variants: {
      colors: [
        { name: 'Onyx Black', hex: '#111111' },
        { name: 'Silver White', hex: '#e2e8f0' },
        { name: 'Rose Pink', hex: '#f472b6' }
      ]
    },
    specs: [
      { label: 'Screen', value: '1.44" High Definition Color Screen' },
      { label: 'Charging', value: 'Direct USB Quick-Plug Charge' },
      { label: 'Sensors', value: 'Heart Rate, Blood Pressure, SPO2, Motion' },
      { label: 'Battery Life', value: '7-10 Days Standby / 3-5 Days Active' },
      { label: 'Water Rating', value: 'IP67 Waterproof' }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r-1',
    productId: 'p-1',
    userName: 'Elena Rostova',
    rating: 5,
    comment: 'Sublime design! Looks like an art piece on my oak desk and charges my iPhone extremely fast. Love the plastic-free packaging.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'r-2',
    productId: 'p-1',
    userName: 'Marcus Vance',
    rating: 5,
    comment: 'The wood texture feels so premium compared to cheap plastic chargers. Highly recommend natural bamboo stain!',
    date: '1 month ago',
    verified: true
  },
  {
    id: 'r-3',
    productId: 'p-2',
    userName: 'Sophia Chen',
    rating: 5,
    comment: 'The linen fabric feels heavenly during humid summer days. Natural buttons are a gorgeous touch!',
    date: '3 days ago',
    verified: true
  },
  {
    id: 'r-4',
    productId: 'p-4',
    userName: 'David Miller',
    rating: 5,
    comment: 'Brought this on a 3-day camping trip in Death Valley. Water stayed freezing cold the entire duration!',
    date: '5 days ago',
    verified: true
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'ECO10': { discountPercent: 10, description: '10% off your eco order' },
  'GREEN20': { discountPercent: 20, description: '20% off for sustainable champions' },
  'EARTH15': { discountPercent: 15, description: '15% off site-wide' }
};
