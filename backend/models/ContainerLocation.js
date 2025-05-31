// models/ContainerLocation.js
const mongoose = require('mongoose');

const ContainerLocationSchema = new mongoose.Schema({
  codigoInternoSituado: { type: Number, required: true }, // "Código Interno del Situad"
  tipoContenedor: { type: String, required: true },       // "Tipo Contenedor"
  descripcionModelo: { type: String },                    // "Descripcion Modelo"
  cantidad: { type: Number, default: 0 },                 // "Cantidad"
  lote: { type: Number, default: 0 },                     // "Lote"
  distrito: { type: String },                             // "Distrito"
  tipoVia: { type: String },                              // "Tipo Vía"
  nombre: { type: String },                               // "Nombre"
  numero: { type: Number },                               // "Número"
  coordenadaX: { type: String },                          // "COORDENADA X" (e.g. "441062,99")
  coordenadaY: { type: String },                          // "COORDENADA Y" (e.g. "4475052,45")
  longitud: { type: String },                             // "LONGITUD" (e.g. "-36.947.684")
  latitud: { type: String },                              // "LATITUD"  (e.g. "404.240.174")
  direccion: { type: String },                            // "DIRECCION"
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContainerLocation', ContainerLocationSchema);
