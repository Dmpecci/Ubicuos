// models/TaxiStopReservation.js
const mongoose = require('mongoose');

const TaxiStopReservationSchema = new mongoose.Schema({
  numero: { type: Number, required: true },           // "Número": 1.02
  gisX: { type: String },                             // "Gis_X": "441044,0800000000"
  gisY: { type: String },                             // "Gis_Y": "4475402,9205100000"
  fechaAlta: { type: String },                        // "Fecha de Alta": "01-01-2051"
  distrito: { type: String },                         // "Distrito": "01  CENTRO"
  barrio: { type: String },                           // "Barrio": "01-04 JUSTICIA"
  calle: { type: String },                            // "Calle": "GENOVA, CALLE, DE"
  numeroFinca: { type: Number },                      // "Nº Finca": 6
  tipoReserva: { type: String },                      // "Tipo de Reserva": "Taxi"
  lineaBateria: { type: String },                     // "Línea / Batería": "Línea"
  numeroPlazas: { type: Number },                     // "Número de Plazas": 2
  longitudReserva: { type: String },                  // "Longitud Reserva": "13,2" (almacenamos como String por la coma)
  longitud: { type: Number },                         // "Longitud": -3.695023818
  latitud: { type: Number },                          // "Latitud": 40.427172993
}, {
  timestamps: true,
});

module.exports = mongoose.model('TaxiStopReservation', TaxiStopReservationSchema);
