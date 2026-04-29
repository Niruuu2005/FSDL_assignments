const fs = require('fs');
const path = require('path');

const root = process.cwd();
const folders = Array.from({ length: 27 }, (_, i) => String(i + 4).padStart(2, '0'))
  .map((n) => fs.readdirSync(root).find((name) => name.startsWith(`${n}-`)))
  .filter(Boolean);

const pkg = (name) => `{
  "name": "${name}-with-mongodb",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "mongodb": "^6.17.0"
  }
}
`;

const server = (folder) => `const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const port = process.env.PORT || 3000;

async function connectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('${folder.replace(/[^a-zA-Z0-9]/g, '_')}');
    const collection = db.collection('app_data');

    if (!(await collection.countDocuments())) {
      await collection.insertOne({
        app: '${folder}',
        message: 'MongoDB connected version',
        createdAt: new Date().toISOString()
      });
    }

    app.use(express.static(__dirname));

    app.get('/api/app-data', async (_req, res) => {
      res.json(await collection.find({}, { projection: { _id: 0 } }).toArray());
    });

    app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(port, () => console.log(\`http://localhost:\${port}\`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

connectDB();
`;

const mongodbJs = `fetch('/api/app-data')
  .then((res) => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  })
  .then((data) => {
    window.mongodbData = data;
    document.body.dataset.mongodb = 'connected';
  })
  .catch(() => {
    document.body.dataset.mongodb = 'error';
  });
`;

const readme = (folder) => `Use these versions inside \`${folder}\`:

- \`with-mongodb\`: Node.js + Express + MongoDB version. Run \`npm install\` and \`npm start\` in that folder.
- \`without-mongodb\`: Static HTML/CSS/JS version. Open \`index.html\` directly.
`;

for (const folder of folders) {
  const src = path.join(root, folder);
  const withoutDir = path.join(src, 'without-mongodb');
  const withDir = path.join(src, 'with-mongodb');

  fs.mkdirSync(withoutDir, { recursive: true });
  fs.mkdirSync(withDir, { recursive: true });

  const files = fs.readdirSync(src, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  for (const file of files) {
    const from = path.join(src, file);
    fs.copyFileSync(from, path.join(withoutDir, file));
    fs.copyFileSync(from, path.join(withDir, file));
  }

  const withIndexPath = path.join(withDir, 'index.html');
  if (fs.existsSync(withIndexPath)) {
    const html = fs.readFileSync(withIndexPath, 'utf8');
    const updated = html.includes('mongodb.js')
      ? html
      : html.replace('</body>', '    <script src="mongodb.js"></script>\n</body>');
    fs.writeFileSync(withIndexPath, updated, 'utf8');
  }

  fs.writeFileSync(path.join(withDir, 'mongodb.js'), mongodbJs, 'utf8');
  fs.writeFileSync(path.join(withDir, 'server.js'), server(folder), 'utf8');
  fs.writeFileSync(path.join(withDir, 'package.json'), pkg(folder), 'utf8');
  fs.writeFileSync(path.join(src, 'README.md'), readme(folder), 'utf8');
}

console.log(`Generated variants for ${folders.length} folders.`);
