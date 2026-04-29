/**
 * MOCK BACKEND SERVER (Node.js + Express + MongoDB)
 * This file is for reference to demonstrate the backend implementation.
 */

/*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// API Route
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ success: true, message: 'Saved to Database' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

mongoose.connect('mongodb://localhost:27017/fsdl_contacts')
    .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
    .catch(err => console.error(err));
*/

console.log("Mock Server Template Ready. Uncomment and install dependencies to use.");
