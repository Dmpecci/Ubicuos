// models/Location.js
const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  tipo: { type: String, required: true },       // "tipo": "taxi", etc.
  latitude: { type: Number, required: true },   // "latitude": 40.465238553671966
  longitude: { type: Number, required: true },  // "longitude": -3.6236888916373284
  name: { type: String, default: null }         // "name": null, or any string
}, {
  timestamps: true,
});

module.exports = mongoose.model('Location', LocationSchema);
