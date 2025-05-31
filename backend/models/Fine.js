// models/Fine.js
const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
  calificacion: { type: String, required: true }, // "CALIFICACION": "GRAVE"
  lugar: { type: String },                        // "LUGAR"
  mes: { type: Number },                          // "MES": 4
  anio: { type: Number },                         // "ANIO": 2051
  hora: { type: Number },                         // "HORA": 10.57
  impBol: { type: Number },                       // "IMP_BOL": 200
  descuento: { type: String },                    // "DESCUENTO": "SI"
  puntos: { type: Number, default: 0 },           // " PUNTOS": 0
  denunciante: { type: String },                  // "DENUNCIANTE": "POLICIA MUNICIPAL"
  hechoBol: { type: String },                     // "HECHO-BOL": "EFECTUAR UN CAMBIO..."
  velLimite: { type: String },                    // "VEL_LIMITE": "   "
  velCircula: { type: String },                   // "VEL_CIRCULA ": "   "
  coordenadaX: { type: String },                  // "COORDENADA-X": "           "
  coordenadaY: { type: String },                  // "COORDENADA-Y": "           "
}, {
  timestamps: true,
});

module.exports = mongoose.model('Fine', FineSchema);
