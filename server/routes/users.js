const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/profile', auth, async (req, res) => {
  const { email, phone, address, password } = req.body;
  const user = await User.findById(req.user.id);

  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (password) {
    const salt = await require('bcryptjs').genSalt(10);
    user.password = await require('bcryptjs').hash(password, salt);
  }

  await user.save();
  res.json({ message: 'Profile updated successfully' });
});

module.exports = router;