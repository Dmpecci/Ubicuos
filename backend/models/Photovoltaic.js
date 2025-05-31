// models/Photovoltaic.js
const mongoose = require('mongoose');

const PhotovoltaicSchema = new mongoose.Schema({
  numero: { type: Number, required: true },       // "Número"
  codigoAyto: { type: Number, required: true },   // "Código Ayto"
  centro: { type: String, required: true },       // "Centro"
  direccion: { type: String },                    // "Dirección"
  coordenadaX: { type: Number },                  // "Coordenada-X"
  coordenadaY: { type: Number },                  // "Coordenada-Y"
  latitud: { type: String },                      // "Latitud" (viene como un string algo extraño)
  longitud: { type: String },                     // "Longitud"
  usoEdificio: { type: String },                  // "Uso del edificio"
  adscripcion: { type: String },                  // "Adscripción"
  distrito: { type: String },                     // "Distrito"
  potenciaKWp: { type: Number },                  // "Potencia KWp"
  empresaInstaladora: { type: String },           // "Empresa instaladora"
  puestaEnServicio: { type: String },             // "Puesta en servicio" (formato dd/mm/aaaa)
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Photovoltaic', PhotovoltaicSchema);
