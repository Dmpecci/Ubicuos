// models/Censo.js
const mongoose = require('mongoose');

const CensoSchema = new mongoose.Schema({
  codDistrito: { type: Number, required: true },          // "COD_DISTRITO"
  descDistrito: { type: String, required: true },         // "DESC_DISTRITO"
  codDistBarrio: { type: Number },                        // "COD_DIST_BARRIO"
  descBarrio: { type: String },
  codBarrio: { type: Number },
  codDistSeccion: { type: Number },                       // "COD_DIST_SECCION"
  codSeccion: { type: Number },
  codEdadInt: { type: Number },                           // "COD_EDAD_INT"
  espanolesHombres: { type: Number, default: 0 },         // "EspanolesHombres"
  espanolesMujeres: { type: Number, default: 0 },         // "EspanolesMujeres"
  extranjerosHombres: { type: Number, default: 0 },       // si tuvieras ese campo
  extranjerosMujeres: { type: Number, default: 0 },       // "ExtranjerosMujeres"
}, {
  timestamps: true,
});

module.exports = mongoose.model('Censo', CensoSchema);
