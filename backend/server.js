const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Hotel = require('./models/Hotel');
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

// send mocksms for testing
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
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendMockSms({
      body: `Your OTP for password reset is ${otp}`,
      from: 'easystay.support.com',
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
    console.log(`Attempting to log in user with email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'User not found' });
    }

    console.log('User found, checking password');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Password is correct, generating token');
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    console.log('Token generated, sending response');
    return res.json({ token, user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error in login route:', error);
    return res.status(500).json({ error: 'Error logging in' });
  }
});



app.post('/check-availability', async (req, res) => {
  const { hotelName, location, startDate, endDate } = req.body;
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const existingBookings = await Booking.find({
      hotelName,
      location,
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ error: 'The hotel is already booked for the selected dates. Please choose different dates.' });
    }

    return res.status(200).json({ message: 'The hotel is available for the selected dates.' });
  } catch (error) {
    console.error('Error in check-availability route:', error);
    return res.status(500).json({ error: 'Error checking availability' });
  }
});




app.post('/book', async (req, res) => {
  const { hotelId, hotelName, location, userId, startDate, endDate, adults, kids, totalAmount } = req.body;
  try {
    console.log('Booking request received:', req.body);

    if (!hotelName || !location) {
      console.error('Missing hotelName or location:', { hotelName, location });
      return res.status(400).json({ error: 'hotelName and location are required' });
    }

    const newBooking = new Booking({
      hotelId: new mongoose.Types.ObjectId(hotelId),
      hotelName,
      location,
      userId: new mongoose.Types.ObjectId(userId),
      startDate,
      endDate,
      adults,
      kids,
      totalAmount,
    });

    await newBooking.save();
    console.log('Booking created successfully');
    return res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error in book route:', error);
    return res.status(500).json({ error: 'Error creating booking' });
  }
});



app.delete('/cancel-booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking successfully canceled' });
  } catch (error) {
    console.error('Error in cancel-booking route:', error);
    res.status(500).json({ message: 'Error canceling booking' });
  }
});


app.get('/bookings', async (req, res) => {
  const { userId } = req.query;
  try {
    console.log(`Fetching bookings for user ID: ${userId}`);
    const bookings = await Booking.find({ userId });
    console.log('Fetched bookings:', bookings);
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error in fetching bookings:', error);
    return res.status(500).json({ error: 'Error fetching bookings' });
  }
});


app.post('/filter-hotels', async (req, res) => {
  const { city, startDate, endDate } = req.body;
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(`Filtering hotels for city: ${city}, startDate: ${startDate}, endDate: ${endDate}`);

    const unavailableHotels = await Booking.find({
      location: city,
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
      ],
    }).distinct('hotelName');

    console.log('Unavailable hotels:', unavailableHotels);

    const hotels = await Hotel.find({ location: city });

    console.log('All hotels in city:', hotels);

    const filteredHotels = hotels.map(hotel => ({
      ...hotel.toObject(),
      available: !unavailableHotels.includes(hotel.name),
    }));

    console.log('Filtered hotels:', filteredHotels);

    return res.status(200).json(filteredHotels);
  } catch (error) {
    console.error('Error in filter-hotels route:', error);
    return res.status(500).json({ error: 'Error filtering hotels' });
  }
});






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
