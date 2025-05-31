// models/BicycleFlow.js
const mongoose = require('mongoose');

const BicycleFlowSchema = new mongoose.Schema({
  fecha: { type: String, required: true },            // "01/01/2051 0:00"
  hora: { type: String, required: true },             // "0:00"
  identificador: { type: String, required: true },    // "PERM_BICI01_PM01"
  bicicletas: { type: Number, default: 0 },           // 1
  numeroDistrito: { type: Number },                   // "NÚMERO_DISTRITO" -> 2
  distrito: { type: String },                         // "Arganzuela"
  nombreVial: { type: String },                       // "Calle Toledo "
  numero: { type: Number },                           // 133
  codigoPostal: { type: Number },                     // 28005
  observacionesDireccion: { type: String },           // "Sentido Gta. Pirámides "
  latitud: { type: String },                          // "40,40547173"
  longitud: { type: String },                         // "-3,711960704"
}, {
  timestamps: true,
});

module.exports = mongoose.model('BicycleFlow', BicycleFlowSchema);
