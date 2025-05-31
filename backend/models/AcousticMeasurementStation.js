// models/AcousticMeasurementStation.js
const mongoose = require('mongoose');

/**
 * Observación:
 * El campo "Alt" en el JSON viene como:
 *   "Alt": { "(m)": 648 }
 * Si siempre viene con la propiedad "(m)", podríamos:
 *   - Guardarlo como un campo 'alt' numérico, asumiendo que req.body pasará alt = 648
 *   - O guardar el objeto completo.
 * En este ejemplo, lo guardamos como un simple "Number" y asumimos que
 * parseas el valor en el controlador, o lo incluyes tal cual si ya lo has procesado.
 */

const AcousticMeasurementStationSchema = new mongoose.Schema({
  numero: { type: Number, required: true },      // "Nº"
  nombre: { type: String, required: true },      // "Nombre"
  codVia: { type: Number },                      // "COD_VIA"
  viaClase: { type: String },                    // "VIA_CLASE"
  viaPar: { type: String },                      // "VIA_PAR"
  viaNombre: { type: String },                   // "VIA_NOMBRE"
  direccion: { type: String },                   // "Dirección"
  longitudGms: { type: String },                 // "Longitud_gms"
  latitudGms: { type: String },                  // "Latitud_gms"
  latitudEd50: { type: String },                 // "LATITUD_ED50"
  longitudEd50: { type: String },                // "LONGITUD_ED50"
  alt: { type: Number },                         // "Alt": {"(m)": 648}, parseado a number
  fechaAlta: { type: String },                   // "Fecha alta": "07/03/2011"
  coordenadaXETRS89: { type: String },           // "Coordenada_X_ETRS89"
  coordenadaYETRS89: { type: String },           // "Coordenada_Y_ETRS89"
  longitudWGS84: { type: String },               // "LONGITUD_WGS84"
  latitudWGS84: { type: String },                // "LATITUD_WGS84"
}, {
  timestamps: true,
});

module.exports = mongoose.model('AcousticMeasurementStation', AcousticMeasurementStationSchema);
