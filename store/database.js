// ==========================================
// FILE: store/database.js
// ==========================================
export const products = [
  {
    id: 1,
    name: 'Organic Potting Mix',
    category: 'Soil',
    price: 15.99,
    rating: 4.5,
    reviews: 128,
    description: 'Premium organic soil blend perfect for indoor and outdoor plants.',
    inStock: true
  },
  {
    id: 2,
    name: 'Plant Fertilizer',
    category: 'Fertilizer',
    price: 12.99,
    rating: 4.8,
    reviews: 256,
    description: 'All-purpose liquid fertilizer for healthy plant growth.',
    inStock: true
  },
  {
    id: 3,
    name: 'Ceramic Pot Large',
    category: 'Pots',
    price: 24.99,
    rating: 4.6,
    reviews: 89,
    description: 'Beautiful ceramic pot with drainage hole.',
    inStock: true
  },
  {
    id: 4,
    name: 'Pruning Shears',
    category: 'Tools',
    price: 18.99,
    rating: 4.9,
    reviews: 342,
    description: 'Professional-grade pruning shears for precise cuts.',
    inStock: true
  },
  {
    id: 5,
    name: 'Moisture Meter',
    category: 'Tools',
    price: 9.99,
    rating: 4.4,
    reviews: 167,
    description: 'Digital moisture meter for accurate soil readings.',
    inStock: true
  },
  {
    id: 6,
    name: 'Organic Compost',
    category: 'Soil',
    price: 13.99,
    rating: 4.7,
    reviews: 203,
    description: 'Rich organic compost for nutrient-dense soil.',
    inStock: true
  }
];

export const categories = ['All', 'Soil', 'Fertilizer', 'Pots', 'Tools'];

export default {
  products,
  categories
};