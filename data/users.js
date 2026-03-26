const bcrypt = require('bcryptjs');

// In-memory user store
const users = [];

// Seed a demo user
(async () => {
  const hash = await bcrypt.hash('demo1234', 10);
  users.push({
    id: 'user-demo',
    name: 'Alex Johnson',
    email: 'demo@shopez.com',
    password: hash,
    address: '123 Main St, Lagos, Nigeria',
    orders: []
  });
})();

module.exports = { users };
