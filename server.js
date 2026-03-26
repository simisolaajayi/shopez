const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Handlebars setup
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    multiply: (a, b) => (a * b).toFixed(2),
    formatPrice: (p) => parseFloat(p).toFixed(2),
    eq: (a, b) => a === b,
    gt: (a, b) => a > b,
    add: (a, b) => a + b,
    range: (n) => Array.from({ length: n }, (_, i) => i + 1),
    stars: (rating) => {
      const full = Math.floor(rating);
      const half = rating % 1 >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
    },
    json: (ctx) => JSON.stringify(ctx),
    includes: (arr, val) => Array.isArray(arr) && arr.includes(val),
    cartCount: (cart) => {
      if (!cart) return 0;
      return cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartTotal: (cart) => {
      if (!cart) return '0.00';
      return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'shopez-secret-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(flash());

// Global vars middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));
app.use('/auth', require('./routes/auth'));
app.use('/checkout', require('./routes/checkout'));
app.use('/account', require('./routes/account'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🛍️  ShopEZ running at http://localhost:${PORT}`);
});
