const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/users');

const authGuard = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error_msg', 'Please login to checkout');
    return res.redirect('/auth/login');
  }
  next();
};

router.get('/', authGuard, (req, res) => {
  const cart = req.session.cart || [];
  if (!cart.length) return res.redirect('/cart');
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);
  const user = users.find(u => u.id === req.session.user.id);
  res.render('checkout', { title: 'Checkout – ShopEZ', cart, total, user });
});

router.post('/place-order', authGuard, (req, res) => {
  const { fullname, address, city, zip, cardNumber } = req.body;
  const cart = req.session.cart || [];
  if (!cart.length) return res.redirect('/cart');

  const user = users.find(u => u.id === req.session.user.id);
  const orderId = 'ORD-' + uuidv4().slice(0, 8).toUpperCase();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

  const order = {
    id: orderId, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    items: [...cart], total, address: `${fullname}, ${address}, ${city} ${zip}`,
    status: 'Processing', card: `**** **** **** ${cardNumber.slice(-4)}`
  };

  if (user) {
    if (!user.orders) user.orders = [];
    user.orders.unshift(order);
    user.address = `${address}, ${city} ${zip}`;
  }

  req.session.cart = [];
  res.render('order-success', { title: 'Order Confirmed!', order });
});

module.exports = router;
