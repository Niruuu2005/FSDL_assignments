/**
 * MOCK BACKEND SERVER (Node.js + Express + MongoDB)
 * Event Registration Management
 */

/*
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Attendee Schema
const AttendeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    ticketType: String,
    registrationDate: { type: Date, default: Date.now }
});

const Attendee = mongoose.model('Attendee', AttendeeSchema);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    try {
        const attendee = new Attendee(req.body);
        await attendee.save();
        res.status(201).send({ message: "Registration successful" });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Admin Route: Get all attendees
app.get('/api/attendees', async (req, res) => {
    const list = await Attendee.find();
    res.json(list);
});

mongoose.connect('mongodb://localhost:27017/event_db')
    .then(() => app.listen(5000, () => console.log('Server running on 5000')));
*/

console.log("Event Server Template Ready.");
