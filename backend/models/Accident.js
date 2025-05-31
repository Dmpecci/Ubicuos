// models/Accident.js
const mongoose = require('mongoose');

// Definimos el esquema para los accidentes
const AccidentSchema = new mongoose.Schema({
  num_expediente: { type: String, required: true },
  fecha: { type: String, required: true },         // "dd/mm/aaaa"
  hora: { type: String, required: true },          // "hh:mm:ss"
  localizacion: { type: String },
  numero: { type: Number },
  cod_distrito: { type: Number },
  distrito: { type: String },
  tipo_accidente: { type: String },
  estado_meteorologico: { type: String },          // podría ser null
  tipo_vehiculo: { type: String },
  tipo_persona: { type: String },
  rango_edad: { type: String },
  sexo: { type: String },
  cod_lesividad: { type: Number },                 // podría ser null
  lesividad: { type: String },
  coordenada_x_utm: { type: String },              // "447894,521" (guardado como String)
  coordenada_y_utm: { type: String },              // "4476691,236"
  positiva_alcohol: { type: String },              // "N" u otro valor
  positiva_droga: { type: String },                // null o "S", "N"
}, {
  timestamps: true,
});

module.exports = mongoose.model('Accident', AccidentSchema, 'accidentalidad');

