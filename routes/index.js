const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

router.get('/', (req, res) => {
  const featured = products.filter(p => ['Popular', 'Best Seller'].includes(p.badge)).slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4);
  const onSale = products.filter(p => p.badge === 'Sale').slice(0, 4);
  res.render('index', {
    title: 'ShopEZ – Shop Smart, Live Easy',
    featured, newArrivals, onSale,
    categories: ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports']
  });
});

module.exports = router;
