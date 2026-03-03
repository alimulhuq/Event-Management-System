const express = require('express');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

const router = express.Router();

// GET all bookings for user (protected)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST new booking (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { event_address, event_date, event_type, guest_number, food_type, ...rest } = req.body;

    // Check date conflict (example: no same date for any user)
    const conflict = await Booking.findOne({ event_date: new Date(event_date) });
    if (conflict) return res.status(400).json({ msg: 'Date already booked' });

    // Calculate total_cost (move your JS logic here)
    const basePerGuest = 10; // Example logic from your original
    // ... add food, sound, etc. calculations
    const total_cost = guest_number * basePerGuest; // Placeholder—expand

    const booking = new Booking({
      user: req.user.id,
      user_name: req.user.user_name,
      event_address,
      event_date: new Date(event_date),
      event_type,
      guest_number,
      food_type,
      total_cost,
      ...rest
    });

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT update booking (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Not found' });

    Object.assign(booking, req.body); // Update fields
    // Recalculate total_cost if needed

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE booking (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) return res.status(404).json({ msg: 'Not found' });

    await booking.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

router.get('/:id', auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking || booking.user.toString() !== req.user.id) {
    return res.status(404).json({ msg: 'Not found or unauthorized' });
  }
  res.json(booking);
});