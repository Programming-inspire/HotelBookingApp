// models/Hotel.js
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  price: { type: String, required: true },
  highlights: { type: [String], required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
});

module.exports = mongoose.model('Hotel', HotelSchema);
