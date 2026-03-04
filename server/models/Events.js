const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: 2000
  },
  category: {
    type: String,
    enum: ['workshop', 'seminar', 'concert', 'conference', 'cultural', 'sports', 'other'],
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add an event date']
  },
  time: {
    type: String,
    required: [true, 'Please add event time']
  },
  location: {
    type: String,
    required: [true, 'Please add a location or virtual link']
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  tickets: [{
    type: {
      type: String,
      enum: ['free', 'paid'],
      required: true
    },
    price: {
      type: Number,
      default: 0,
      min: 0
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0
    },
    sold: {
      type: Number,
      default: 0
    }
  }],
  banner: {
    type: String,           // URL to uploaded image
    default: 'default-event-banner.jpg'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);