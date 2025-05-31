// models/ScooterAssignment.js

const mongoose = require('mongoose');

const ScooterAssignmentSchema = new mongoose.Schema({
  // DISTRITO, BARRIO y TOTAL como obligatorios
  distrito: { type: String, required: true },
  barrio: { type: String, required: true },
  ACCIONA: { type: Number, default: 0 },
  Taxify: { type: Number, default: 0 },
  KOKO: { type: Number, default: 0 },
  UFO: { type: Number, default: 0 },
  RIDECONGA: { type: Number, default: 0 },
  FLASH: { type: Number, default: 0 },
  LIME: { type: Number, default: 0 },
  WIND: { type: Number, default: 0 },  // Se elimina el espacio final
  BIRD: { type: Number, default: 0 },
  rebyRides: { type: Number, default: 0 },        // "REBY RIDES"
  MOVO: { type: Number, default: 0 },
  MYGO: { type: Number, default: 0 },
  jumpUber: { type: Number, default: 0 },         // "JUMP UBER"
  sjvConsulting: { type: Number, default: 0 },    // "SJV CONSULTING"
  TOTAL: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ScooterAssignment', ScooterAssignmentSchema);
