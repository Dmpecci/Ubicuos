// models/OccupancyRotationalParking.js
const mongoose = require('mongoose');

const OccupancyRotationalParkingSchema = new mongoose.Schema({
  anio: { type: Number, required: true },               // "AÑO"
  mes: { type: Number, required: true },                // "MES"
  nombreAparcamiento: { type: String, required: true }, // "NOMBRE DEL APARCAMIENTO"
  codigoPar: { type: Number },                          // "CÓDIGO PAR"
  tipo: { type: String },                               // "TIPO"
  numPlazas: { type: Number },                          // "NUM PLAZAS"
  codigoDistrito: { type: Number },                     // "CÓDIGO DISTRITO"
  distrito: { type: String },                           // "DISTRITO"
  diasCalculo: { type: Number },                        // "Días Cálculo"
  vehiculosDiaMedia: { type: Number },                  // "Vehículos día (media)"
  ocupacion: { type: String },                          // "Ocupación (%)", e.g. "17,4%"
  ocupacion9h21h: { type: String },                     // "Ocupación 9h-21h (%)", e.g. "26,9%"
}, {
  timestamps: true,
});

module.exports = mongoose.model(
  'OccupancyRotationalParking',
  OccupancyRotationalParkingSchema
);
