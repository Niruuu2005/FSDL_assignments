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

    const db = client.db('04_profile_previewer');
    const collection = db.collection('profiles');

    if (!(await collection.countDocuments())) {
      await collection.insertOne({
        key: 'main',
        name: '',
        role: '',
        bio: ''
      });
    }

    app.use(express.static(__dirname));

    app.get('/api/profile', async (_req, res) => {
      const profile = await collection.findOne(
        { key: 'main' },
        { projection: { _id: 0, key: 0 } }
      );
      res.json(profile || { name: '', role: '', bio: '' });
    });

    app.post('/api/profile', async (req, res) => {
      const { name = '', role = '', bio = '' } = req.body;
      await collection.updateOne(
        { key: 'main' },
        { $set: { key: 'main', name, role, bio } },
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

