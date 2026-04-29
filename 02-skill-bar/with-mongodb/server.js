const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = 3000;

const seed = [
  { name: 'Frontend Architecture', value: 90 },
  { name: 'Creative Design', value: 75 }
];

app.use(express.json());

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('skill_bar');
    const collection = db.collection('skills');

    if (!(await collection.countDocuments())) {
      await collection.insertMany(seed);
    }

    app.use(express.static(__dirname));

    app.get('/api/skills', async (_req, res) => {
      res.json(await collection.find({}, { projection: { _id: 0 } }).toArray());
    });

    app.post('/api/skills', async (req, res) => {
      const { name, value } = req.body;
      if (!name || value < 0 || value > 100) return res.status(400).end();
      await collection.insertOne({ name, value: Number(value) });
      res.status(201).end();
    });

    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
