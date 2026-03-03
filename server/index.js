// server/index.js
require('dotenv').config(); // loads .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // optional – good for logging


const app = express();


// ─── Middleware ────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // ← optional: see requests in console

// ─── Routes ────────────────────────────────────────────
const authRoutes     = require('./routes/auth');
const eventRoutes    = require('./routes/events');
const paymentRoutes  = require('./routes/payments');
// const userRoutes     = require('./routes/users');
// const ticketRoutes   = require('./routes/tickets');

app.use('/api/auth',    authRoutes);
app.use('/api/events',  eventRoutes);
app.use('/api/payments', paymentRoutes);
// app.use('/api/users',   userRoutes);
// app.use('/api/tickets', ticketRoutes);

// Health check / root route
app.get('/', (req, res) => {
  res.json({
    message: 'Event Management System API',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ─── MongoDB Connection ────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Optionally: process.exit(1);
});