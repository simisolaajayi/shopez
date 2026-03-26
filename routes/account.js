const express = require('express');
const router = express.Router();
const { users } = require('../data/users');

const authGuard = (req, res, next) => {
  if (!req.session.user) { req.flash('error_msg', 'Please login'); return res.redirect('/auth/login'); }
  next();
};

router.get('/', authGuard, (req, res) => {
  const user = users.find(u => u.id === req.session.user.id);
  res.render('account', { title: 'My Account – ShopEZ', user });
});

module.exports = router;
