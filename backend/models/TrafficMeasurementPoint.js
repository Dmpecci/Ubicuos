// models/TrafficMeasurementPoint.js
const mongoose = require('mongoose');

const TrafficMeasurementPointSchema = new mongoose.Schema({
  tipoElem: { type: String, required: true }, // "tipo_elem": "URB"
  distrito: { type: Number },                 // "distrito": 4
  pointId: { type: Number, required: true },  // "id": 3840 (renombrado a pointId para evitar confusión con _id)
  codCent: { type: String },                  // "cod_cent": "27/09/1902 0:00" (viene como string de fecha?)
  nombre: { type: String, required: true },   // "nombre": "Jose Ortega y Gasset E-O - Pº Castellana-Serrano"
  utmX: { type: Number },                     // "utm_x": 441615.343346657
  utmY: { type: Number },                     // "utm_y": 4475767.9421385
  longitud: { type: Number },                 // "longitud": -3.6883232754856
  latitud: { type: Number },                  // "latitud": 40.4305018691825
}, {
  timestamps: true,
});

module.exports = mongoose.model('TrafficMeasurementPoint', TrafficMeasurementPointSchema, 'puntoMedidaTrafico');
