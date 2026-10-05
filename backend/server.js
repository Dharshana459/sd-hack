const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;

const initialProducts = [
  {
    name: 'Velocity Urban Runner',
    category: 'Men\'s Running',
    price: 189.99,
    image: '/images/urban_runner_1791192005660.png',
    glowColor: 'rgba(0, 242, 254, 0.4)'
  },
  {
    name: 'Classic Minimalist',
    category: 'Unisex Casual',
    price: 145.00,
    image: '/images/classic_leather_1791192027356.png',
    glowColor: 'rgba(255, 255, 255, 0.3)'
  },
  {
    name: 'Metro High-Top',
    category: 'Streetwear',
    price: 210.50,
    image: '/images/high_top_street_1791192095698.png',
    glowColor: 'rgba(255, 71, 87, 0.3)'
  },
  {
    name: 'Velocity Runner Volt',
    category: 'Women\'s Running',
    price: 189.99,
    image: '/images/urban_runner_1791192005660.png',
    glowColor: 'rgba(123, 237, 159, 0.3)'
  }
];

// Initialize Database
async function initDb() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      glowColor TEXT NOT NULL
    );
  `);

  const countData = await db.get(`SELECT COUNT(*) as count FROM products`);
  
  // Seed data if empty
  if (countData.count === 0) {
    console.log("Seeding initial products into database...");
    const stmt = await db.prepare(
      `INSERT INTO products (name, category, price, image, glowColor) VALUES (?, ?, ?, ?, ?)`
    );
    for (const p of initialProducts) {
      await stmt.run(p.name, p.category, p.price, p.image, p.glowColor);
    }
    await stmt.finalize();
  } else {
    console.log(`Database already seeded with ${countData.count} products.`);
  }
}

// Ensure db initializes before handling requests
initDb().then(() => {
  console.log("Database initialized successfully.");
}).catch(err => {
  console.error("Failed to initialize database:", err);
});

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/checkout (Placeholder)
app.post('/api/checkout', (req, res) => {
  // In a real app this would insert into an Orders table and clear cart etc.
  const { cartItems } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  res.json({ message: 'Order created successfully!', orderId: Math.floor(Math.random() * 1000000) });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
