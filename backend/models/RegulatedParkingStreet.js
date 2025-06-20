// models/RegulatedParkingStreet.js
const mongoose = require('mongoose');

const RegulatedParkingStreetSchema = new mongoose.Schema({
  gisX: { type: String },         // "gis_x": "439592,9100000000"
  gisY: { type: String },         // "gis_y": "4473566,2300000000"
  distrito: { type: String },     // "01  CENTRO"
  barrio: { type: String },       // "01-01 PALACIO"
  calle: { type: String },        // "AGUAS, CALLE, DE LAS"
  numFinca: { type: Number },     // 2
  color: { type: String },        // "Verde"
  bateriaLinea: { type: String }, // "Línea"
  numPlazas: { type: Number },    // 8
}, {
  timestamps: true,
});

module.exports = mongoose.model('RegulatedParkingStreet', RegulatedParkingStreetSchema, 'callesEstacionamientoRegulado');
