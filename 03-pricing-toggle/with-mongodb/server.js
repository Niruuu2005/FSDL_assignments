const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = 3000;

const seed = [
  {
    name: 'Basic',
    monthly: 19,
    yearly: 15,
    features: ['5 Projects', 'Basic Analytics', 'Community Support'],
    popular: false,
    buttonText: 'Get Started',
    buttonClass: ''
  },
  {
    name: 'Pro',
    monthly: 49,
    yearly: 39,
    features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Branding'],
    popular: true,
    buttonText: 'Go Pro',
    buttonClass: 'primary'
  },
  {
    name: 'Enterprise',
    monthly: 99,
    yearly: 79,
    features: ['Dedicated Manager', 'SSO Integration', 'SLA Guarantee', 'Unlimited Users'],
    popular: false,
    buttonText: 'Contact Us',
    buttonClass: ''
  }
];

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('pricing_toggle');
    const collection = db.collection('plans');

    if (!(await collection.countDocuments())) {
      await collection.insertMany(seed);
    }

    app.use(express.static(__dirname));

    app.get('/api/plans', async (_req, res) => {
      res.json(await collection.find({}, { projection: { _id: 0 } }).toArray());
    });

    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
