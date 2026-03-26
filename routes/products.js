const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

// All products / search / filter
router.get('/', (req, res) => {
  const { q, category, sort, minPrice, maxPrice } = req.query;
  let filtered = [...products];

  if (q) filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase())
  );
  if (category) filtered = filtered.filter(p => p.category === category);
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

  const categories = [...new Set(products.map(p => p.category))];
  res.render('products', {
    title: 'Shop All Products',
    products: filtered,
    categories,
    query: q || '',
    selectedCategory: category || '',
    selectedSort: sort || '',
    count: filtered.length
  });
});

// Single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.redirect('/products');

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.render('product-detail', {
    title: product.name,
    product,
    related
  });
});

module.exports = router;
