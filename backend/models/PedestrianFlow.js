// models/PedestrianFlow.js
const mongoose = require('mongoose');

const PedestrianFlowSchema = new mongoose.Schema({
  fecha: { type: String, required: true },        // "FECHA": "01/01/2051 0:00"
  hora: { type: String, required: true },         // "HORA": "0:00"
  identificador: { type: String, required: true },// "IDENTIFICADOR": "PERM_PEA02_PM01"
  peatones: { type: Number, default: 0 },         // "PEATONES": 1269
  numeroDistrito: { type: Number },               // "NÚMERO_DISTRITO": 1
  distrito: { type: String },                     // "DISTRITO": "Centro"
  nombreVial: { type: String },                   // "NOMBRE_VIAL": "Calle Fuencarral"
  numero: { type: Number },                       // "NÚMERO": 22
  codigoPostal: { type: Number },                 // "CÓDIGO_POSTAL": 28004
  observacionesDireccion: { type: String },       // "OBSERVACIONES_DIRECCION": "Calle peatonal "
  latitud: { type: String },                      // "LATITUD": "40,42200905" (con coma)
  longitud: { type: String },                     // "LONGITUD": "-3,700891722" (también con coma)
}, {
  timestamps: true,
});

module.exports = mongoose.model('PedestrianFlow', PedestrianFlowSchema);
