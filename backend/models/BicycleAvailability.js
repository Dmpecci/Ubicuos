// models/BicycleAvailability.js
const mongoose = require('mongoose');

const BicycleAvailabilitySchema = new mongoose.Schema({
  dia: { type: String, required: true }, // "01/01/2051"
  horasTotalesUsosBicicletas: { type: String },            // "1.085,25"
  horasTotalesDisponibilidadBicicletasEnAnclajes: { type: String }, // "52.857,86"
  totalHorasServicioBicicletas: { type: String },          // "53.943,11"
  mediaBicicletasDisponibles: { type: String },            // "2.247,63"
  usosAbonadoAnual: { type: Number, default: 0 },          // 3215
  usosAbonadoOcasional: { type: Number, default: 0 },      // 0
  totalUsos: { type: Number, default: 0 },                 // 3215
}, {
  timestamps: true,
});

module.exports = mongoose.model('BicycleAvailability', BicycleAvailabilitySchema, 'bicicletasDisponibilidad');
