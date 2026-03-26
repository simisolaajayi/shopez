const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);
  res.render('cart', { title: 'Your Cart – ShopEZ', cart, total });
});

router.post('/add', (req, res) => {
  const { productId, quantity = 1, color } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) { req.flash('error_msg', 'Product not found'); return res.redirect('/products'); }

  if (!req.session.cart) req.session.cart = [];
  const cart = req.session.cart;
  const key = `${productId}-${color || 'default'}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.quantity += parseInt(quantity);
  } else {
    cart.push({
      key, productId, name: product.name, price: product.price,
      image: product.image, color: color || product.colors[0],
      quantity: parseInt(quantity)
    });
  }

  req.flash('success_msg', `${product.name} added to cart!`);
  res.redirect('/cart');
});

router.post('/update', (req, res) => {
  const { key, quantity } = req.body;
  const cart = req.session.cart || [];
  const item = cart.find(i => i.key === key);
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity));
  }
  res.redirect('/cart');
});

router.post('/remove', (req, res) => {
  const { key } = req.body;
  req.session.cart = (req.session.cart || []).filter(i => i.key !== key);
  req.flash('success_msg', 'Item removed from cart');
  res.redirect('/cart');
});

router.post('/clear', (req, res) => {
  req.session.cart = [];
  res.redirect('/cart');
});

module.exports = router;
