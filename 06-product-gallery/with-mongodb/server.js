const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = process.env.PORT || 3000;

const seed = [
  { id: 1, name: 'Minimalist Watch', price: 129, category: 'Accessories', icon: '⌚', tag: 'New' },
  { id: 2, name: 'Premium Backpack', price: 89, category: 'Travel', icon: '🎒', tag: 'Sale' },
  { id: 3, name: 'Noise Cancelling Buds', price: 199, category: 'Tech', icon: '🎧', tag: 'Hot' },
  { id: 4, name: 'Smart Lamp', price: 59, category: 'Home', icon: '💡', tag: 'Limited' },
  { id: 5, name: 'Mechanical Keyboard', price: 149, category: 'Tech', icon: '⌨️', tag: 'New' },
  { id: 6, name: 'Travel Planner', price: 25, category: 'Office', icon: '📔', tag: '' }
];

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('06_product_gallery');
    const collection = db.collection('products');

    if (!(await collection.countDocuments())) {
      await collection.insertMany(seed);
    }

    app.use(express.static(__dirname));

    app.get('/api/products', async (_req, res) => {
      res.json(await collection.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray());
    });

    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
