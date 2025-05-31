// models/Street.js
const mongoose = require('mongoose');

const StreetSchema = new mongoose.Schema({
  codigoNumero: { type: Number, required: true },      // "Codigo de numero"
  codigoVia: { type: Number, required: true },         // "Codigo de via"
  claseVia: { type: String },                          // "Clase de la via"
  particulaVia: { type: String },                      // "Partícula de la vía"
  nombreVia: { type: String },                         // "Nombre de la vía"
  literalNumeracion: { type: String },                 // "Literal de numeracion"
  codigoDistrito: { type: Number },
  nombreDistrito: { type: String },
  codigoBarrio: { type: Number },
  nombreBarrio: { type: String },
  seccionCensal: { type: Number },
  codigoPostal: { type: Number },
  seccionCarteria: { type: String },
  zonaServicioEstacionamientoRegulado: { type: Number }, // "Zona Servicio Estacionamiento Regulado"
  categoriaFiscal: { type: Number },
  direccionCompleta: { type: String },         // "Direccion completa para el numero"
  coordXGuiaUrbana: { type: Number },          // "Coordenada X (Guia Urbana) cm"
  coordYGuiaUrbana: { type: Number },          // "Coordenada Y (Guia Urbana) cm"
  longitudSR: { type: String },                // "Longitud en S R ETRS89 WGS84"
  latitudSR: { type: String },                 // "Latitud en S R ETRS89 WGS84"
  tipoViaNumero: { type: String },             // "Tipo de la via a la que pertenece el numero"
  situacionViaTerreno: { type: String },       // "Situacion de la via respecto al terreno"
  tipoDenominacionVia: { type: String },       // "Tipo de denominacion de la via"
  parcelaCatastralNumero: { type: String },    // "Parcela catastral del numero"
  tipologiaNumero: { type: String },           // "Tipologia del numero"
  zonaValorNumero: { type: String },           // "Zona de valor del numero"
}, {
  timestamps: true,
});

module.exports = mongoose.model('Street', StreetSchema);
