const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount:  { type: Number, required: true },
  payment_method: { type: String, required: true },
  status:  { type: String, default: 'Completed' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);