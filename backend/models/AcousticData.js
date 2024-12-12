const mongoose = require('mongoose');

const AcousticDataSchema = new mongoose.Schema({
  NMT: String,
  year: Number,
  month: Number,
  day: Number,
  LAEQ: Number,
  type: String,
});

module.exports = mongoose.model('AcousticData', AcousticDataSchema);
