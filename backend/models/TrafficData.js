// models/TrafficData.js
const mongoose = require('mongoose');

const TrafficDataSchema = new mongoose.Schema({
  measureId: { type: Number, required: true },        // "id": 1001
  fecha: { type: String, required: true },           // "fecha": "2051-01-01 00:00:00"
  tipoElem: { type: String, required: true },        // "tipo_elem": "M30"
  intensidad: { type: Number, default: 0 },          // "intensidad": 264
  ocupacion: { type: Number, default: 0 },           // "ocupacion": 0
  carga: { type: Number, default: 0 },               // "carga": 0
  vmed: { type: Number, default: 0 },                // "vmed": 57
  error: { type: String, default: 'N' },             // "error": "N"
  periodoIntegracion: { type: Number, default: 5 },   // "periodo_integracion": 5
}, {
  timestamps: true,
});

module.exports = mongoose.model('TrafficData', TrafficDataSchema, 'trafico');

