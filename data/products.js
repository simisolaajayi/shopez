// In-memory product database
const products = [
  {
    id: '1', name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics',
    price: 149.99, originalPrice: 199.99, rating: 4.5, reviews: 128,
    stock: 15, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for work and travel.',
    features: ['Active Noise Cancellation', '30hr Battery', 'Bluetooth 5.0', 'Foldable Design'],
    colors: ['Black', 'White', 'Navy']
  },
  {
    id: '2', name: 'Minimalist Leather Watch', category: 'Fashion',
    price: 89.99, originalPrice: 89.99, rating: 4.8, reviews: 204,
    stock: 8, badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    description: 'Elegant minimalist watch with genuine leather strap, sapphire glass, and Japanese movement. A timeless accessory for every occasion.',
    features: ['Genuine Leather', 'Sapphire Glass', 'Japanese Movement', 'Water Resistant'],
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: '3', name: 'Smart Fitness Tracker', category: 'Electronics',
    price: 59.99, originalPrice: 79.99, rating: 4.3, reviews: 89,
    stock: 22, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80',
    description: 'Track your health goals with heart rate monitoring, sleep tracking, and 7-day battery. Compatible with iOS and Android.',
    features: ['Heart Rate Monitor', 'Sleep Tracking', '7-Day Battery', 'IP67 Waterproof'],
    colors: ['Black', 'Rose Gold', 'Blue']
  },
  {
    id: '4', name: 'Organic Cotton Hoodie', category: 'Fashion',
    price: 49.99, originalPrice: 49.99, rating: 4.6, reviews: 156,
    stock: 30, badge: 'New',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
    description: '100% GOTS certified organic cotton hoodie. Soft, sustainable, and incredibly comfortable. Available in 6 colors.',
    features: ['100% Organic Cotton', 'GOTS Certified', 'Unisex Fit', 'Machine Washable'],
    colors: ['Grey', 'Cream', 'Forest Green', 'Navy', 'Rust', 'Black']
  },
  {
    id: '5', name: 'Portable Bluetooth Speaker', category: 'Electronics',
    price: 79.99, originalPrice: 99.99, rating: 4.4, reviews: 73,
    stock: 18, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    description: 'Waterproof portable speaker with 360° sound, 12-hour playtime, and built-in mic. Take the party anywhere.',
    features: ['360° Sound', '12hr Playtime', 'IPX7 Waterproof', 'Built-in Mic'],
    colors: ['Black', 'Teal', 'Red']
  },
  {
    id: '6', name: 'Ceramic Coffee Mug Set', category: 'Home & Kitchen',
    price: 34.99, originalPrice: 34.99, rating: 4.7, reviews: 212,
    stock: 45, badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    description: 'Handcrafted ceramic mugs with a beautiful matte finish. Set of 4, dishwasher safe, and microwave friendly.',
    features: ['Set of 4', 'Handcrafted', 'Dishwasher Safe', 'Microwave Safe'],
    colors: ['Ivory', 'Sage', 'Terracotta', 'Slate']
  },
  {
    id: '7', name: 'Mechanical Keyboard', category: 'Electronics',
    price: 119.99, originalPrice: 149.99, rating: 4.6, reviews: 94,
    stock: 12, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    description: 'Tactile mechanical keyboard with RGB backlighting, detachable USB-C cable, and aluminum frame. Built for typists and gamers.',
    features: ['Mechanical Switches', 'RGB Backlight', 'USB-C', 'Aluminum Frame'],
    colors: ['Black', 'White']
  },
  {
    id: '8', name: 'Yoga Mat Premium', category: 'Sports',
    price: 44.99, originalPrice: 44.99, rating: 4.5, reviews: 167,
    stock: 25, badge: 'New',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    description: '6mm thick eco-friendly yoga mat with alignment lines, carrying strap included. Non-slip surface for all types of yoga.',
    features: ['6mm Thick', 'Eco-Friendly', 'Alignment Lines', 'Non-Slip'],
    colors: ['Purple', 'Teal', 'Black', 'Pink']
  },
  {
    id: '9', name: 'Stainless Steel Water Bottle', category: 'Sports',
    price: 29.99, originalPrice: 39.99, rating: 4.8, reviews: 341,
    stock: 60, badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    description: 'Double-wall insulated bottle keeps drinks cold 24hrs, hot 12hrs. BPA-free, leak-proof lid.',
    features: ['24hr Cold', '12hr Hot', 'BPA-Free', 'Leak-Proof'],
    colors: ['Silver', 'Black', 'Ocean Blue', 'Forest']
  },
  {
    id: '10', name: 'Linen Throw Pillow Set', category: 'Home & Kitchen',
    price: 39.99, originalPrice: 39.99, rating: 4.4, reviews: 88,
    stock: 35, badge: 'New',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    description: 'Set of 2 premium linen throw pillows with removable covers. Adds texture and warmth to any living space.',
    features: ['Set of 2', 'Premium Linen', 'Removable Covers', 'Hypoallergenic'],
    colors: ['Natural', 'Dusty Pink', 'Slate Blue', 'Olive']
  },
  {
    id: '11', name: 'Running Shoes', category: 'Sports',
    price: 99.99, originalPrice: 129.99, rating: 4.5, reviews: 203,
    stock: 20, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    description: 'Lightweight running shoes with responsive foam cushioning, breathable mesh upper, and durable rubber outsole.',
    features: ['Responsive Foam', 'Breathable Mesh', 'Rubber Outsole', 'Reflective Details'],
    colors: ['White/Red', 'Black/Lime', 'Navy/Orange']
  },
  {
    id: '12', name: 'Scented Soy Candle Collection', category: 'Home & Kitchen',
    price: 27.99, originalPrice: 27.99, rating: 4.9, reviews: 276,
    stock: 50, badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1608181831718-4dac8e1cbb1e?w=400&q=80',
    description: 'Set of 3 hand-poured soy wax candles in amber glass jars. Scents: Vanilla Oak, Sea Salt, Lavender Fields.',
    features: ['Soy Wax', 'Hand-Poured', '45hr Burn Time', 'Set of 3'],
    colors: ['Amber Glass']
  }
];

module.exports = { products };
