const mongoose = require('mongoose');

const AcousticDataSchema = new mongoose.Schema({
  Fecha: {
    type: String,
    required: true,
  },
  NMT: {
    type: Number,
    required: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Ld: String,
  Le: String,
  Ln: String,
  LAeq24: String,
  LAS01: String,
  LAS10: String,
  LAS50: String,
  LAS90: String,
  LAS99: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('AcousticData', AcousticDataSchema, 'contaminacionAcustica');

