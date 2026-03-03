const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_type: { type: String, required: true },
  event_address: { type: String, required: true },
  event_date: { type: Date, required: true },
  guest_number: { type: Number, required: true },
  food_type: { type: String, enum: ['Vegetarian','Non-Vegetarian','Both'] },
  sound_system: { type: String, enum: ['None','Basic','Premium'], default: 'None' },
  decoration_description: String,
  total_cost: { type: Number, required: true },
  payment_status: { type: String, enum: ['Pending','Partial','Paid'], default: 'Pending' },
  total_paid: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);