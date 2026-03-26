const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/users');

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/account');
  res.render('login', { title: 'Login – ShopEZ' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) { req.flash('error_msg', 'No account found with that email'); return res.redirect('/auth/login'); }

  const match = await bcrypt.compare(password, user.password);
  if (!match) { req.flash('error_msg', 'Incorrect password'); return res.redirect('/auth/login'); }

  req.session.user = { id: user.id, name: user.name, email: user.email };
  req.flash('success_msg', `Welcome back, ${user.name}!`);
  res.redirect('/account');
});

router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/account');
  res.render('register', { title: 'Create Account – ShopEZ' });
});

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) { req.flash('error_msg', 'Passwords do not match'); return res.redirect('/auth/register'); }
  if (users.find(u => u.email === email)) { req.flash('error_msg', 'Email already registered'); return res.redirect('/auth/register'); }

  const hash = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), name, email, password: hash, address: '', orders: [] };
  users.push(newUser);
  req.session.user = { id: newUser.id, name: newUser.name, email: newUser.email };
  req.flash('success_msg', `Account created! Welcome, ${name}!`);
  res.redirect('/account');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
