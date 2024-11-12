const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  adults: { type: Number, required: true },
  kids: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
