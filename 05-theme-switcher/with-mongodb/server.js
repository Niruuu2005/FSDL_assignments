const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = process.env.PORT || 3000;

app.use(express.json());

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('05_theme_switcher');
    const collection = db.collection('theme');

    if (!(await collection.countDocuments())) {
      await collection.insertOne({ key: 'main', theme: 'light' });
    }

    app.use(express.static(__dirname));

    app.get('/api/theme', async (_req, res) => {
      const item = await collection.findOne(
        { key: 'main' },
        { projection: { _id: 0, key: 0 } }
      );
      res.json(item || { theme: 'light' });
    });

    app.post('/api/theme', async (req, res) => {
      const { theme = 'light' } = req.body;
      await collection.updateOne(
        { key: 'main' },
        { $set: { key: 'main', theme } },
        { upsert: true }
      );
      res.status(204).end();
    });

    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
