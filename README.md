# 🛍️ ShopEZ — E-Commerce Web Application

> A full-featured, colorful e-commerce web app built with Node.js, Express, and Handlebars. No database required — runs entirely in-memory out of the box.

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Installation](#-installation)
3. [Running the App](#-running-the-app)
4. [Project Structure](#-project-structure)
5. [Pages & Features](#-pages--features)
6. [Demo Credentials](#-demo-credentials)
7. [How Each Part Works](#-how-each-part-works)
8. [Customization Guide](#-customization-guide)
9. [Tech Stack](#-tech-stack)
10. [Troubleshooting](#-troubleshooting)

---

## ✅ Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool           | Version      | Download Link               |
|----------------|--------------|-----------------------------|
| Node.js        | v16 or above | https://nodejs.org          |
| npm            | v8 or above  | Comes bundled with Node.js  |
| Git (optional) | Any          | https://git-scm.com         |

To check if Node.js and npm are already installed, open your terminal and run:

```bash
node --version
npm --version
```

If you see version numbers printed, you are good to go.

---

## 📦 Installation

### Step 1 — Download or unzip the project

If you downloaded a `.zip` file, extract it to a folder of your choice. Then open your terminal and navigate into the project folder:

```bash
cd shopez
```

### Step 2 — Install dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will read the `package.json` file and automatically install:

| Package              | Purpose                                          |
|----------------------|--------------------------------------------------|
| `express`            | Web framework                                    |
| `express-handlebars` | HTML templating engine                           |
| `express-session`    | Session management for cart and login state      |
| `connect-flash`      | Flash messages (success/error notifications)     |
| `bcryptjs`           | Password hashing for secure authentication       |
| `body-parser`        | Parsing form data from POST requests             |
| `method-override`    | Allows DELETE/PUT methods via HTML forms         |
| `uuid`               | Generates unique order IDs                       |
| `nodemon` *(dev)*    | Auto-restarts server on file changes             |

> ⏳ This may take 30–60 seconds depending on your internet connection.

---

## ▶️ Running the App

### Production mode (standard start)

```bash
npm start
```

### Development mode (auto-restarts on code changes)

```bash
npm run dev
```

Once started, open your browser and go to:

```
http://localhost:3000
```

You should see the ShopEZ homepage. 🎉

To stop the server at any time, press `Ctrl + C` in your terminal.

---

## 📁 Project Structure

```
shopez/
│
├── server.js                    # Main entry point — sets up Express, middleware, routes
├── package.json                 # Project metadata and dependency list
├── README.md                    # This file
│
├── data/                        # In-memory data (acts as a simple database)
│   ├── products.js              # Array of 12 product objects with name, price, images etc.
│   └── users.js                 # Array of users, seeded with one demo account
│
├── routes/                      # Route handlers — define URL paths and logic
│   ├── index.js                 # GET /              → Homepage
│   ├── products.js              # GET /products      → Shop listing
│   │                            # GET /products/:id  → Single product detail
│   ├── cart.js                  # GET  /cart         → View cart
│   │                            # POST /cart/add     → Add item
│   │                            # POST /cart/update  → Change quantity
│   │                            # POST /cart/remove  → Remove item
│   │                            # POST /cart/clear   → Empty cart
│   ├── auth.js                  # GET/POST /auth/login
│   │                            # GET/POST /auth/register
│   │                            # GET      /auth/logout
│   ├── checkout.js              # GET  /checkout            → Checkout form
│   │                            # POST /checkout/place-order → Submit order
│   └── account.js               # GET /account  → User dashboard & order history
│
├── views/                       # Handlebars templates (HTML pages)
│   ├── layouts/
│   │   └── main.hbs             # Root HTML shell — all pages are wrapped in this
│   ├── partials/                # Reusable HTML snippets
│   │   ├── navbar.hbs           # Navigation bar with search, cart icon, user menu
│   │   ├── footer.hbs           # Footer with links and payment badges
│   │   └── product-card.hbs     # Product card reused across multiple pages
│   ├── index.hbs                # Homepage view
│   ├── products.hbs             # Shop listing with sidebar filters
│   ├── product-detail.hbs       # Single product page
│   ├── cart.hbs                 # Shopping cart page
│   ├── checkout.hbs             # Checkout form and order summary
│   ├── order-success.hbs        # Order confirmation receipt
│   ├── login.hbs                # Login form
│   ├── register.hbs             # Registration form
│   ├── account.hbs              # User account dashboard
│   └── 404.hbs                  # Not Found error page
│
└── public/                      # Static files served directly to the browser
    ├── css/
    │   └── style.css            # All styles — layout, colors, animations, responsive
    └── js/
        └── main.js              # Client-side JS — animations, cart UX, mobile menu
```

---

## 🌐 Pages & Features

### 🏠 Homepage (`/`)
- Full-screen hero section with animated floating product cards
- Shop by Category grid (Electronics, Fashion, Home & Kitchen, Sports)
- Featured Products, New Arrivals, and On Sale sections
- Promotional banner with discount highlight
- Trust badges (free shipping, returns, secure payment)

### 🛍️ Shop Page (`/products`)
- Displays all 12 products in a responsive grid
- **Left sidebar filters:**
  - Filter by category (radio buttons)
  - Filter by price range (min/max inputs)
  - Sort by: Default, Price Low→High, Price High→Low, Highest Rated
- Live result count display
- Search via the navbar search bar

### 📦 Product Detail (`/products/:id`)
- Large product image with thumbnail switcher
- Color selector that updates the cart value
- Quantity picker with +/− controls and max-stock enforcement
- Add to Cart button with chosen color and quantity
- Product features list
- Related products from the same category

### 🛒 Cart (`/cart`)
- Lists all items with image, name, color, and price
- Quantity controls that auto-submit on change
- Per-item subtotal calculation
- Remove individual items or clear the entire cart
- Order summary sidebar with 7.5% tax calculation
- Promo code input field (demo only)
- Proceed to Checkout button

### 💳 Checkout (`/checkout`)
- Requires login — redirects to login page if not authenticated
- Shipping information form (name, email, address, city, ZIP)
- Payment details form with live card number formatting
- Order summary showing all cart items
- Demo mode — no real payment is processed

### ✅ Order Confirmation (`/checkout/place-order`)
- Displays a unique Order ID (e.g. `ORD-A1B2C3D4`)
- Shows order date, shipping address, and masked card number
- Lists all ordered items with quantities and prices
- Clears the cart after the order is placed
- Order is saved to the user's account history

### 👤 Authentication
- **Register** (`/auth/register`) — creates a new account, passwords are hashed with bcrypt
- **Login** (`/auth/login`) — verifies credentials and starts a session
- **Logout** (`/auth/logout`) — destroys the session and redirects to the homepage

### 📊 Account Dashboard (`/account`)
- Shows user profile (name, email, saved address)
- Stats: total orders placed, wishlist count, membership tier
- Full order history with items, totals, and shipping address

---

## 🔐 Demo Credentials

A demo account is pre-seeded when the server starts. Use these to log in without registering:

```
Email:    demo@shopez.com
Password: demo1234
```

---

## 🔍 How Each Part Works

### Sessions & Cart

The shopping cart is stored in the user's **server-side session** via `express-session`. Every time an item is added, the session's `cart` array is updated. This means:
- The cart persists across page navigations within the same browser session
- The cart resets when the server restarts (in-memory only)
- No login is required to add items to the cart

### Authentication Flow

```
Register:
  User submits form
    → password hashed with bcryptjs
    → user object saved to users[] array
    → session created → redirect to /account

Login:
  User submits form
    → email looked up in users[]
    → bcrypt.compare() checks password
    → on success: req.session.user set
    → redirect to /account

Logout:
  req.session.destroy() called
    → session cleared → redirect to /
```

Protected routes (checkout, account) check for `req.session.user` and redirect to `/auth/login` if it is absent.

### Templating (Handlebars)

- `views/layouts/main.hbs` wraps every page — it includes the navbar, footer, flash messages, and the `{{{body}}}` placeholder where each page's content is injected
- Partials like `product-card.hbs` are reused with `{{> product-card}}` wherever needed
- Custom helpers defined in `server.js` handle formatting:
  - `{{formatPrice price}}` → formats a number to 2 decimal places
  - `{{stars rating}}` → converts a number like 4.5 into ★★★★½
  - `{{cartCount cart}}` → totals the quantity of all cart items
  - `{{multiply price quantity}}` → calculates line item subtotals

### Flash Messages

`connect-flash` stores one-time messages in the session. After an action like "add to cart" or "login failed", a message is set with `req.flash(...)` and displayed on the next page load, then automatically cleared. The layout reads them via `res.locals` set in the global middleware in `server.js`.

### Request Flow (step by step)

```
Browser sends GET /products
  → server.js receives request
  → matched to routes/products.js
  → products filtered/sorted based on query params
  → res.render('products', { data }) called
  → Handlebars merges data into views/products.hbs
  → Wrapped in views/layouts/main.hbs
  → Final HTML sent back to browser
```

---

## 🎨 Customization Guide

### Change the color theme

Open `public/css/style.css` and edit the CSS variables at the top:

```css
:root {
  --primary:   #ff4f00;   /* Main accent — buttons, prices, badges */
  --secondary: #7c3aed;   /* Purple — category labels, secondary elements */
  --accent:    #06b6d4;   /* Cyan — highlights and info notes */
  --success:   #10b981;   /* Green — in-stock, savings indicators */
}
```

### Add a new product

Open `data/products.js` and add a new object to the `products` array:

```js
{
  id: '13',                    // Unique string ID
  name: 'My New Product',
  category: 'Electronics',     // Must match an existing category string
  price: 49.99,
  originalPrice: 69.99,        // Set equal to price if there is no discount
  rating: 4.2,
  reviews: 34,
  stock: 10,
  badge: 'New',                // Options: 'New', 'Sale', 'Popular', 'Best Seller'
  image: 'https://your-image-url.com/photo.jpg',
  description: 'Describe your product here...',
  features: ['Feature One', 'Feature Two', 'Feature Three'],
  colors: ['Black', 'White']
}
```

### Add a new page

1. Create a new view file, e.g. `views/about.hbs`
2. Create a route file, e.g. `routes/about.js`
3. Register it in `server.js`:

```js
app.use('/about', require('./routes/about'));
```

### Change the server port

By default the app runs on port 3000. To use a different port:

```bash
PORT=8080 npm start
```

---

## 🛠 Tech Stack

| Layer         | Technology                                 |
|---------------|--------------------------------------------|
| Runtime       | Node.js (v16+)                             |
| Web Framework | Express.js 4.x                             |
| Templating    | Handlebars (express-handlebars)            |
| Auth          | express-session + bcryptjs                 |
| Styling       | Custom CSS — Syne & DM Sans (Google Fonts) |
| Data Storage  | In-memory JavaScript arrays (no database)  |
| Dev Tool      | nodemon (auto-restart on file changes)     |

---

## 🐛 Troubleshooting

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Another process is using port 3000. Start ShopEZ on a different port:
```bash
PORT=3001 npm start
```

---

**`Cannot find module` error**

You have not installed dependencies yet. Run:
```bash
npm install
```

---

**Page loads but styles are missing**

Make sure you are running the server from inside the `shopez/` directory, not a parent folder. The static files in `public/` are served relative to where `server.js` lives.

---

**Cart is empty after restarting the server**

This is expected — the cart and all data live in memory. Restarting the server resets everything. To add persistence, replace the in-memory arrays in `data/` with a real database such as MongoDB or SQLite.

---

**Images not loading**

Product images are loaded from the Unsplash CDN. Make sure you have an active internet connection. To use local images instead, place them in `public/images/` and update the `image` field in `data/products.js` to a path like `/images/your-photo.jpg`.

---

*Built with ❤️ using Node.js — ShopEZ, Shop Smart, Live Easy.*
