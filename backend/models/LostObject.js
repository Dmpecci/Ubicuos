// models/LostObject.js
const mongoose = require('mongoose');

const LostObjectSchema = new mongoose.Schema({
  numIncidencia: { type: Number, required: true },         // "Nº incidencia"
  iniciativa: { type: String, required: true },            // "Iniciativa" (e.g. "Viajero app")
  tipoObjeto: { type: String, required: true },            // "Tipo objeto" (e.g. "Cartera / monedero")
  fechaAnotacionIncidencia: { type: String },              // "Fecha anotación incidencia"
  fechaCierreIncidencia: { type: String },                 // "Fecha cierre incidencia"
  taxistaDadoAltaApp: { type: String },                    // "Taxista dado de alta en la app" (S/N)
  taxistaLocalizadoTelefonicamente: { type: String },       // "Taxista localizado telefónicamente" (S/N)
  numIntentosLocalizacion: { type: Number, default: 0 },   // "Nº de  intentos de localización"
  estado: { type: String },                                // "Estado" (e.g. "Cerrada")
  resolucion: { type: String },                            // "Resolución" (e.g. "Desfavorable")
}, {
  timestamps: true,
});

module.exports = mongoose.model('LostObject', LostObjectSchema);
