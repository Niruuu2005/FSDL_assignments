const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = 3000;

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('digital_glossary');
    const collection = db.collection('tags');

    app.use(express.static(__dirname));

    app.get('/api/glossary', async (_req, res) => {
      res.json(await collection.find({}, { projection: { _id: 0 } }).toArray());
    });

    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
