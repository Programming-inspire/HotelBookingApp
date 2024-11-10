// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  adults: { type: Number, required: true },
  kids: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
