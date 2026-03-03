// server/routes/events.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // ← if you have auth, otherwise remove this line

// GET all events (public)
router.get('/', async (req, res) => {
  try {
    // TODO: replace with real DB query later
    // const events = await Event.find().sort({ date: 1 });
    const events = [
      { id: 1, title: "Sample Event", date: "2025-10-15" },
      { id: 2, title: "Workshop", date: "2025-11-05" }
    ];

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    // TODO: real lookup
    res.status(200).json({
      success: true,
      data: { id: req.params.id, title: "Event " + req.params.id }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST – create event (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title and date are required'
      });
    }

    // TODO: save to DB
    // const event = await Event.create({ ...req.body, organizer: req.user.id });

    res.status(201).json({
      success: true,
      message: 'Event created',
      data: { title, date, createdBy: 'current-user' }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// You can add PUT /:id, DELETE /:id later...

module.exports = router;