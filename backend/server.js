// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Hotel = require('./models/Hotel'); // Import the Hotel model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/HotelAuth')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mock Twilio client for development/testing
const sendMockSms = async ({ body, from, to }) => {
  console.log(`Mock SMS sent from ${from} to ${to}: ${body}`);
  return Promise.resolve();
};

app.post('/forgot-password', async (req, res) => {
  const { phone } = req.body;
  try {
    console.log(`Looking for user with phone: ${phone}`);
    const user = await User.findOne({ phone });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendMockSms({
      body: `Your OTP for password reset is ${otp}`,
      from: 'MockTwilioNumber',
      to: user.phone,
    });

    return res.status(200).json('OTP sent to your mobile number');
  } catch (error) {
    console.error('Error in forgot-password route:', error);
    return res.status(500).json({ error: 'Error sending OTP' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    console.log(`Looking for user with phone: ${phone} and OTP: ${otp}`);
    const user = await User.findOne({
      phone,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      console.log('OTP is invalid or has expired');
      return res.status(400).json({ error: 'OTP is invalid or has expired' });
    }

    return res.status(200).json({ message: 'OTP verified', userId: user._id });
  } catch (error) {
    console.error('Error in verify-otp route:', error);
    return res.status(500).json({ error: 'Error verifying OTP' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    console.error('Error in reset-password route:', error);
    return res.status(500).json({ error: 'Error resetting password' });
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, phone });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register route:', error);
    return res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error('Error in login route:', error);
    return res.status(500).json({ error: 'Error logging in' });
  }
});

// Create a booking
app.post('/book', async (req, res) => {
  const { hotelId, userId, startDate, endDate, adults, kids, totalAmount } = req.body;
  try {
    const newBooking = new Booking({
      hotelId: new mongoose.Types.ObjectId(hotelId), // Convert to ObjectId
      userId: new mongoose.Types.ObjectId(userId), // Convert to ObjectId
      startDate,
      endDate,
      adults,
      kids,
      totalAmount,
    });
    await newBooking.save();
    return res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error in book route:', error);
    return res.status(500).json({ error: 'Error creating booking' });
  }
});

// Check availability
app.post('/check-availability', async (req, res) => {
  const { city, startDate, endDate, adults, kids } = req.body;
  try {
    // Fetch hotels in the specified city
    const hotels = await Hotel.find({ location: city });

    // Check availability for each hotel
    const availableHotels = [];
    for (const hotel of hotels) {
      const bookings = await Booking.find({
        hotelId: hotel._id,
        $or: [
          { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        ],
      });

      if (bookings.length === 0) {
        availableHotels.push(hotel);
      }
    }

    return res.status(200).json({ availableHotels });
  } catch (error) {
    console.error('Error in check-availability route:', error);
    return res.status(500).json({ error: 'Error checking availability' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
